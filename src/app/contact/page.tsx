// app/contact/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (k: string, v: string) => setForm(s => ({ ...s, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    if (!form.name || !form.email || !form.message) {
      setStatus({ ok: false, msg: "Please fill name, email and message." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ ok: true, msg: data?.message ?? "Message sent — thank you!" });
        setForm({ name: "", email: "", subject: "", message: "" });
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
<section className="w-full relative">
  {/* background wrapper: positioned + min-height so Next/Image fill has space */}
  <div className="absolute inset-0 -z-10 min-h-[420px]">
    <Image
      src="/images/contact-hero.jpg"
      alt="Mumbai skyline"
      fill
      style={{ objectFit: "cover" }}
      quality={80}
      priority
    />
    {/* dark overlay (semi-opaque) — makes white text visible */}
    
  </div>

  {/* content container should be relative so it sits above the background wrapper */}
  <div className="max-w-7xl mx-auto px-6 py-28 relative">
    <h1 className="text-center text-white text-5xl md:text-6xl font-extrabold drop-shadow-lg">
      Contact Us
    </h1>

          {/* contact cards aligned across the hero */}
          <div className="mt-30 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
            {/* card 1: address */}
            <div className="flex flex-col items-center text-white">
              <div className="w-20 h-20 rounded-full border-2 border-white/80 flex items-center justify-center mb-4">
                {/* globe / address svg */}
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" className="stroke-white">
                  <path d="M12 2v20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-lg font-semibold">ZaroHR Pvt. Ltd.</div>
              <div className="mt-1 text-sm">Floor 10, Tower B, Business Bay</div>
              <div className="text-sm">Andheri East, Mumbai — 400093</div>
            </div>

            {/* card 2: phone */}
            <div className="flex flex-col items-center text-white">
              <div className="w-20 h-20 rounded-full border-2 border-white/80 flex items-center justify-center mb-4">
                {/* phone svg */}
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" className="stroke-white">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12 1.05.37 2.08.73 3.05a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.03-1.03a2 2 0 0 1 2.11-.45c.97.36 2 .61 3.05.73A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-lg font-semibold">Sales Enquiry</div>
              <a href="tel:+9118002336504" className="mt-1 text-xl md:text-2xl font-medium text-white hover:underline">1800-233-6504</a>
            </div>

            {/* card 3: email */}
            <div className="flex flex-col items-center text-white">
              <div className="w-20 h-20 rounded-full border-2 border-white/80 flex items-center justify-center mb-4">
                {/* chat / mail svg */}
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" className="stroke-white">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-lg font-semibold">Just drop a line</div>
              <a href="mailto:info@zarohr.com" className="mt-1 text-sm text-white hover:underline">info@zarohr.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* CENTERED FORM (below hero) */}
      <section className="bg-white -mt- pb-20">
        <div className="max-w-3xl mx-auto px-10">
          {/* card floating on top of hero (centered) */}
          <div className="bg-white rounded-2xl shadow-xl  mt-10 p-8">
            <h2 className="text-center text-2xl font-semibold mb-3">Send us a message</h2>
            <p className="text-center text-sm text-gray-600 mb-6">We typically reply within 1 business day.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={form.name}
                  onChange={e => update("name", e.target.value)}
                  placeholder="Full name"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
                <input
                  value={form.email}
                  onChange={e => update("email", e.target.value)}
                  placeholder="Email address"
                  type="email"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <input
                value={form.subject}
                onChange={e => update("subject", e.target.value)}
                placeholder="Subject (optional)"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <textarea
                value={form.message}
                onChange={e => update("message", e.target.value)}
                placeholder="Your message..."
                rows={6}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />

              <div className="flex items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-5 py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send message"}
                </button>

                {status && (
                  <p className={`text-sm ${status.ok ? "text-green-600" : "text-red-600"}`}>{status.msg}</p>
                )}
              </div>
            </form>
          </div>

          {/* small company info row under the form - center aligned */}
          <div className="text-center mt-8 text-sm text-gray-600">
            <div>ZaroHR Pvt. Ltd. — Floor 10, Tower B, Business Bay, Andheri East, Mumbai</div>
            <div className="mt-1">Phone: <a className="text-indigo-600" href="tel:+9118002336504">1800-233-6504</a> — Email: <a className="text-indigo-600" href="mailto:info@zarohr.com">info@zarohr.com</a></div>
          </div>
        </div>
      </section>
    </div>
  );
}
