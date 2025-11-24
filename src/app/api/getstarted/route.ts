// app/api/survey/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SURVEY_TO_EMAIL,
  SURVEY_FROM_EMAIL,
} = process.env;

function validateEmail(e: unknown) {
  return typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}
function validatePhone(p: unknown) {
  return typeof p === "string" && /^[0-9+\-()\s]{7,20}$/.test((p || "").trim());
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
  return escapeHtml(String(s || "")).replace(/\r?\n/g, "<br/>");
}

export async function POST(req: NextRequest) {
  try {
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SURVEY_TO_EMAIL || !SURVEY_FROM_EMAIL) {
      console.error("Missing SMTP or survey email environment variables");
      return NextResponse.json({ error: "Server not configured." }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    // expected shape similar to your FormState
    const {
      orgName = "",
      
      size = "",
      
      contactName = "",
      contactEmail = "",
      contactNumber = "",
      priorities = [],
      painPoints = "",
      consent = false,
    } = body ?? {};

    // Validation
    if (!orgName || typeof orgName !== "string" || !orgName.trim()) {
      return NextResponse.json({ error: "Organization name is required." }, { status: 400 });
    }
    if (!validateEmail(contactEmail)) {
      return NextResponse.json({ error: "A valid contact email is required." }, { status: 400 });
    }
    if (!validatePhone(contactNumber)) {
      return NextResponse.json({ error: "A valid contact number is required." }, { status: 400 });
    }
    if (consent !== true) {
      return NextResponse.json({ error: "Consent is required to contact the submitter." }, { status: 400 });
    }

    // create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Plain text for owner
    const ownerPlain = `
New Get Started survey submission

Organization: ${orgName}

Size: ${size}


Contact person: ${contactName}
Contact email: ${contactEmail}
Contact number: ${contactNumber}

Priorities: ${Array.isArray(priorities) ? priorities.join(", ") : String(priorities)}

Pain points: ${painPoints}




Consent to contact: ${consent ? "Yes" : "No"}
`.trim();

    // HTML for owner
    const ownerHtml = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
        <h2>New Get Started submission</h2>
        <p><strong>Organization:</strong> ${escapeHtml(orgName)}</p>
        
        <p><strong>Size:</strong> ${escapeHtml(size)}</p>
       
        <hr/>
        <p><strong>Contact person:</strong> ${escapeHtml(contactName)}</p>
        <p><strong>Contact email:</strong> ${escapeHtml(contactEmail)}</p>
        <p><strong>Contact number:</strong> ${escapeHtml(contactNumber)}</p>
        <p><strong>Priorities:</strong> ${escapeHtml(Array.isArray(priorities) ? priorities.join(", ") : String(priorities))}</p>
    
        <p><strong>Pain points:</strong><br/>${nl2br(painPoints)}</p>
       
        <hr/>
        <p><em>Consent to contact:</em> ${consent ? "Yes" : "No"}</p>
        <p style="font-size:12px;color:#666">Submitted from ZaroHR GetStarted form</p>
      </div>
    `;

    // send to your inbox
    await transporter.sendMail({
      from: SURVEY_FROM_EMAIL,
      to: SURVEY_TO_EMAIL,
      subject: `[Get Started] ${orgName} — survey submission`,
      text: ownerPlain,
      html: ownerHtml,
      replyTo: contactEmail,
    });

    // Auto-reply to submitter (non-blocking)
    const autoPlain = `
Hi ${contactName || ""},

Thanks for sharing details about ${orgName}. We received your submission and will get back to you within 1 business day.

Reference:
${painPoints ? painPoints : "(no pain points provided)"}

If this is urgent, call us at +91 98335 76742.

Best,
ZaroHR Solutions
`.trim();

    const autoHtml = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color:#111;">
        <p>Hi ${escapeHtml(contactName || "")},</p>
        <p>Thanks for sharing details about <strong>${escapeHtml(orgName)}</strong>. We have received your submission and will get back to you within <strong>1 business day</strong>.</p>
        <hr/>
        <p><strong>Your notes (copy):</strong></p>
        <div style="padding:12px;border-radius:8px;background:#f7f7f7;border:1px solid #eee;">
          <p style="white-space:pre-wrap;margin:0;">${escapeHtml(painPoints || "—")}</p>
        </div>
        <hr/>
        <p>If this is urgent, you can call us at <a href="tel:+919833576742">+91 98335 76742</a>.</p>
        <p>Best,<br/>ZaroHR Solutions</p>
        <p style="font-size:12px;color:#666">This is an automated acknowledgement — please do not reply to this message. We will reply personally within 1 business day.</p>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: SURVEY_FROM_EMAIL,
        to: contactEmail,
        subject: `We received your request — ${orgName}`,
        text: autoPlain,
        html: autoHtml,
        replyTo: SURVEY_FROM_EMAIL,
      });
    } catch (autoErr) {
      console.error("Auto-reply failed:", autoErr);
      // don't fail the whole request if auto-reply fails
    }

    return NextResponse.json({ message: "Submission received. Thank you!" });
  } catch (err: any) {
    console.error("survey API error:", err);
    return NextResponse.json({ error: "Failed to submit form." }, { status: 500 });
  }
}
