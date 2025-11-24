// app/api/contact/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL,
} = process.env;

// Local image (you uploaded). The platform will transform this local path to a URL when sending.
// If you don't want an image, remove IMAGE_URL and the <img> tag in htmlBody.
const IMAGE_URL = "/mnt/data/c6c71ded-c3b7-405b-8751-8da5f7309073.png";

function validateEmail(e: unknown) {
  return typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function validatePhone(p: unknown) {
  return typeof p === "string" && /^[0-9+\-()\s]{7,20}$/.test(p.trim());
}

function escapeHtml(unsafe: string) {
  return String(unsafe || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function nl2br(s: string) {
  return escapeHtml(s).replace(/\r?\n/g, "<br/>");
}

export async function POST(req: NextRequest) {
  try {
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
      console.error("Missing SMTP or contact env vars");
      return NextResponse.json({ error: "Server not configured." }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const { name, company = "", email, phone = "", message } = body ?? {};

    // Basic validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    if (!validatePhone(phone)) {
      return NextResponse.json({ error: "A valid phone number is required." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    // Create transporter (Hostinger uses SSL on port 465 typically)
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true for 465 (SSL)
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Owner/Team email (plain + html)
    const plainText = `
Contact form submission

Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}
Message:
${message}
    `.trim();

    const htmlBody = `
      <div style="font-family:system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111;">
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${nl2br(message)}</p>
        <hr/>
        <p style="font-size:12px;color:#666">Sent from your website contact form</p>
      </div>
    `;

    // Send email to site owner / team
    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      subject: `[Contact] New inquiry — ${name}`,
      text: plainText,
      html: htmlBody,
      replyTo: email,
    });

    // Compose an instant auto-reply to the sender
    const autoReplyPlain = `
Hi ${name},

Thanks for reaching out to ZaroHR Solutions. We have received your message and will get back to you within 1 business day.

For reference, here is a copy of your message:
---------------------------------------------
${message}
---------------------------------------------

If this is urgent, you can call us at +91 98335 76742.

Best,
ZaroHR Solutions
    `.trim();

    const autoReplyHtml = `
      <div style="font-family:system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111;">
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for reaching out to <strong>ZaroHR Solutions</strong>. We have received your message and will get back to you within <strong>1 business day</strong>.</p>
        <hr/>
        <p><strong>Your message (copy):</strong></p>
        <div style="padding:12px;border-radius:8px;background:#f7f7f7;border:1px solid #eee;">
          <p style="white-space:pre-wrap; margin:0;">${escapeHtml(message)}</p>
        </div>
        <hr/>
        <p>If this is urgent, you can call us at <a href="tel:+919833576742">+91 98335 76742</a>.</p>
        <p>Best,<br/>ZaroHR Solutions</p>
        <p style="font-size:12px;color:#666">This is an automated acknowledgement — please do not reply to this message. We will reply personally within 1 business day.</p>
      </div>
    `;

    // Attempt to send auto-reply. Log errors but do not fail the request if auto-reply fails.
    try {
      await transporter.sendMail({
        from: CONTACT_FROM_EMAIL,
        to: email,
        subject: `We received your message — ZaroHR Solutions`,
        text: autoReplyPlain,
        html: autoReplyHtml,
        replyTo: CONTACT_FROM_EMAIL,
      });
    } catch (autoErr) {
      console.error("Failed to send auto-reply to sender:", autoErr);
      // do not return error — owner mail already sent successfully
    }

    return NextResponse.json({ message: "Message sent — thank you!" });
  } catch (err: any) {
    console.error("contact API error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
