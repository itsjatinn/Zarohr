// app/contact/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  // Added company + phone; kept subject for backend compatibility
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((s) => ({ ...s, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ ok: false, msg: "Please fill your name, work mail and message." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({ ok: true, msg: data?.message ?? "Message sent — thank you!" });
        setForm({ name: "", company: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus({ ok: false, msg: data?.error ?? "Failed to send message." });
      }
    } catch {
      setStatus({ ok: false, msg: "Network error — try again later." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* HERO */}
      <section className="relative w-full">
        {/* Background block with fixed height */}
        <div className="relative h-[460px] md:h-[520px]">
          <Image
            src="/images/contacthero.jpg" // ensure this exact file exists in /public/images
            alt="Mumbai skyline"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
          {/* Overlay (kept from your version) */}
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Foreground content over the hero */}
        <div className="absolute inset-0">
          <div className="max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
            <h1 className="text-center text-white text-5xl md:text-6xl font-extrabold drop-shadow-lg">
              Contact Us
            </h1>

            {/* ---------- CONTACT ITEMS ---------- */}

            {/* Mobile: triangle layout */}
            <div className="relative mt-6 md:hidden h-[320px]">
              {/* Top (Address) */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center text-white">
                <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center mb-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-white">
                    <path d="M12 2v20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>
                <div className="text-base font-semibold">ZaroHR Solutions</div>
                <div className="mt-0.5 text-xs text-white/90">OneDegree Co-Working, 2nd Floor, Jainam Compound,Bhandup (W)</div>
                <div className="text-xs relative justify-center text-white/90">  Mumbai — 400078</div>
              </div>

              {/* Bottom-left (Phone) */}
              <div className="absolute bottom-6 left-4 flex flex-col items-center text-white">
                <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center mb-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-white">
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12 1.05.37 2.08.73 3.05a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.03-1.03a2 2 0 0 1 2.11-.45c.97.36 2 .61 3.05.73A2 2 0 0 1 22 16.92z"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="text-base font-semibold">Sales Enquiry</div>
                <a href="tel:+9118002336504" className="mt-0.5 text-xs font-medium text-white hover:underline">
                  +91 98335 76742
                </a>
              </div>

              {/* Bottom-right (Email) */}
              <div className="absolute bottom-6 right-4 flex flex-col items-center text-white">
                <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center mb-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-white">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>
                <div className="text-base font-semibold">Just drop a line</div>
                <a href="mailto:info@zarohr.com" className="mt-0.5 text-xs text-white hover:underline">
                  info@zarohr.com
                </a>
              </div>
            </div>

            {/* Tablet / Desktop: 3-column layout (unchanged concept, corrected spacing) */}
            <div className="hidden md:grid mt-25 grid-cols-1 md:grid-cols-3 gap-8 items-start text-center text-white">
              
              {/* Phone */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-2 border-white/80 flex items-center justify-center mb-4">
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" className="stroke-white">
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12 1.05.37 2.08.73 3.05a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.03-1.03a2 2 0 0 1 2.11-.45c.97.36 2 .61 3.05.73A2 2 0 0 1 22 16.92z"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-lg font-semibold">Sales Enquiry</div>
                <a href="tel:+9118002336504" className="mt-1 text-sm md:text-m font-medium text-white hover:underline">
                  +91 98335 76742
                </a>
              </div>

              {/* Address */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-2 border-white/80 flex items-center justify-center mb-4">
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" className="stroke-white">
                    <path d="M12 2v20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-lg font-semibold">ZaroHR Solutions</div>
                <div className="mt-1 text-sm">OneDegree Co-Working, 2nd Floor, Jainam Compound,</div>
                <div className="text-sm">Bhandup (W), Mumbai-400078</div>
              </div>

              {/* Email */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-2 border-white/80 flex items-center justify-center mb-4">
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" className="stroke-white">
                    <path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-lg font-semibold">Just drop a line</div>
                <a href="mailto:info@zarohr.com" className="mt-1 text-sm text-white hover:underline">
                  info@zarohr.com
                </a>
              </div>
            </div>
            {/* ---------- /CONTACT ITEMS ---------- */}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="relative -mt-12 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white shadow-xl ring-1 ring-neutral-200">
            {/* Header */}
            <div className="px-6 sm:px-8 pt-8 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Send us a message</h2>
              <p className="mt-1 text-sm text-neutral-600">We typically reply within 1 business day.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 sm:px-8 pb-8 pt-6 space-y-5">
              {status && (
                <div
                  role="status"
                  className={`rounded-lg border px-3 py-2 text-sm ${
                    status.ok ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {status.msg}
                </div>
              )}

              {/* Row 1: Name / Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-1 text-sm font-medium text-neutral-800">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className="h-11 rounded-xl border border-neutral-300 bg-white px-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="company" className="mb-1 text-sm font-medium text-neutral-800">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="Your company"
                    autoComplete="organization"
                    className="h-11 rounded-xl border border-neutral-300 bg-white px-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
              </div>

              {/* Row 2: Work mail / Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="email" className="mb-1 text-sm font-medium text-neutral-800">
                    Work mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="h-11 rounded-xl border border-neutral-300 bg-white px-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phone" className="mb-1 text-sm font-medium text-neutral-800">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className="h-11 rounded-xl border border-neutral-300 bg-white px-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label htmlFor="message" className="mb-1 text-sm font-medium text-neutral-800">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us a little about your HR goals..."
                  rows={6}
                  className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-neutral-500">We’ll never share your information.</p>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-amber-400 px-5 text-sm font-semibold text-black transition hover:bg-black hover:text-white disabled:opacity-60"
                >
                  {loading ? "Sending…" : "Send message"}
                </button>
              </div>
            </form>
          </div>

          {/* Company info (unchanged) */}
          <div className="text-center mt-8 text-sm text-neutral-400">
            <div>ZaroHR Solutions — OneDegree Co-Working, 2nd Floor, Jainam Compound, Bhandup (W), Mumbai-400078</div>
            <div className="mt-1">
              Phone:{" "}
              <a className="text-amber-400 hover:underline" href="tel:+9118002336504">
                +91 98335 76742
              </a>{" "}
              — Email:{" "}
              <a className="text-amber-400 hover:underline" href="mailto:info@zarohr.com">
                info@zarohr.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
