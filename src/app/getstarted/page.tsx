"use client";

import React, { useState, useEffect, JSX } from "react";
import { motion } from "framer-motion";

// Single-file React component for the Get Started survey (Client component)
// Tailwind CSS assumed. This version fixes the initialization issues and
// safely pre-fills contactEmail from query params.

type FormState = {
  orgName: string;
  website: string;
  size: string;
  industry: string;
  contactName: string;
  contactEmail: string;
  contactNumber: string;
  priorities: string[];
  currentTools: string;
  painPoints: string;
  mustHaves: string;
  timeline: string;
  budget: string;
  additional: string;
  consent: boolean;
};

export default function GetStartedSurvey(): JSX.Element {
  const [form, setForm] = useState<FormState>({
    orgName: "",
    website: "",
    size: "",
    industry: "",
    contactName: "",
    contactEmail: "",
    contactNumber: "",
    priorities: [],
    currentTools: "",
    painPoints: "",
    mustHaves: "",
    timeline: "",
    budget: "",
    additional: "",
    consent: false,
  });

  // Read email from query param (e.g. /getstarted?email=someone%40company.com)
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const e = params.get("email");
      if (e && e.length > 3) {
        const decoded = decodeURIComponent(e);
        setForm((s) => (s.contactEmail === decoded ? s : { ...s, contactEmail: decoded }));
      }
    } catch {
      // ignore malformed params
    }
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  const prioritiesOptions = [
    "HR Tech",
    "HR Operations",
    "Payroll",
    "People Analytics",
    "ESOP Services",
    "Mandatory Trainings",
  ];

  function togglePriority(value: string) {
    setForm((s) => ({
      ...s,
      priorities: s.priorities.includes(value) ? s.priorities.filter((p) => p !== value) : [...s.priorities, value],
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const target = e.target as HTMLInputElement;
    const { name, type } = target;
    let value: string | boolean = (e.target as HTMLInputElement).value as string;
    if (type === "checkbox") {
      // checkbox may be the consent checkbox or others in future
      value = (e.target as HTMLInputElement).checked;
      if (name === "consent") {
        setForm((s) => ({ ...s, consent: value as boolean }));
        return;
      }
    }
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    // Basic validation
      if (!form.contactEmail || !form.contactNumber || !form.orgName) {
      setStatus({
      ok: false,
      msg: "Please provide organization name, contact email, and contact number.",
      });
      return;
    }

    if (!form.consent) {
      setStatus({ ok: false, msg: "Please confirm consent to contact you." });
      return;
    }

    setSubmitting(true);
    try {
      // Replace this URL with your API route (e.g. /api/survey)
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus({ ok: true, msg: "Thanks — we received your requirements. We&apos;ll be in touch!" });
        // reset form
        setForm({
          orgName: "",
          website: "",
          size: "",
          industry: "",
          contactName: "",
          contactEmail: "",
          contactNumber: "",
          priorities: [],
          currentTools: "",
          painPoints: "",
          mustHaves: "",
          timeline: "",
          budget: "",
          additional: "",
          consent: false,
        });
      } else {
        const json = (await res.json().catch(() => ({} as { error?: string }))) as { error?: string };
        setStatus({ ok: false, msg: json.error || "Something went wrong. Try again later." });
      }
    } catch {
      setStatus({ ok: false, msg: "Network error — please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-16 px-6 md:px-12 lg:px-24 bg-black text-gray-100"
    >
      <div className="w-full mx-auto max-w-full">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Tell us about your organisation</h1>
          <p className="mt-3 text-lg text-gray-300">
            Help us understand your priorities — we&apos;ll suggest the right HR product + implementation plan.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* left column - form fields (main form moved to right on large screens via order classes) */}
          <section className="order-2 lg:order-2 lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-gray-300">Organization name *</span>
                <input
                  name="orgName"
                  value={form.orgName}
                  onChange={handleChange}
                  className="mt-2 px-4 py-3 bg-neutral-800 border border-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="ACME Ltd"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm text-gray-300">Company size</span>
                <select
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  className="mt-2 px-4 py-3 bg-neutral-800 border border-gray-800 rounded-full"
                >
                  <option value="">Select</option>
                  <option>1-10</option>
                  <option>11-50</option>
                  <option>51-200</option>
                  <option>201-1000</option>
                  <option>1000+</option>
                </select>
              </label>

              
            </div>

            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-gray-300">Contact person</span>
                <input
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  className="mt-2 px-4 py-3 bg-neutral-800 border border-gray-800 rounded-full"
                  placeholder="Full name"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-gray-300">Contact email *</span>
                <input
                  name="contactEmail"
                  type="email"
                  value={form.contactEmail}
                  onChange={handleChange}
                  className="mt-2 px-4 py-3 bg-neutral-800 border border-gray-800 rounded-full"
                  placeholder="name@company.com"
                />
              </label>
              <label className="flex flex-col md:col-span-1">
                <span className="text-sm text-gray-300">Contact number *</span>
                <input
                  name="contactNumber"
                  type="tel"
                  value={form.contactNumber}
                  onChange={handleChange}
                  className="mt-2 px-4 py-3 bg-neutral-800 border border-gray-800 rounded-full"
                  placeholder="+91 98765 43210"
                />
              </label>
            </div>

            <fieldset className="bg-neutral-800 border border-gray-800 rounded-2xl p-4">
              <legend className="text-sm font-semibold text-amber-300">Top HR priorities (choose all that apply)</legend>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {prioritiesOptions.map((o) => (
                  <label key={o} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={form.priorities.includes(o)}
                      onChange={() => togglePriority(o)}
                      className="w-4 h-4 rounded text-amber-400 bg-gray-800"
                    />
                    <span className="text-sm text-gray-300">{o}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            

            <label className="flex flex-col">
              <span className="text-sm text-gray-300">Biggest HR pain points</span>
              <textarea
                name="painPoints"
                value={form.painPoints}
                onChange={handleChange}
                rows={4}
                className="mt-2 px-4 py-3 bg-neutral-800 border border-gray-800 rounded-2xl"
                placeholder="Describe the main issues your team faces"
              />
            </label>

            

            <div className="flex items-start gap-3">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={form.consent}
                onChange={handleChange}
                className="mt-1 w-4 h-4"
              />
              <label htmlFor="consent" className="text-sm text-gray-400">
                I consent to be contacted about HR solutions and understand my data will be used to contact me. Read our
                <a href="/privacy" className="text-amber-300 underline ml-2">privacy policy</a>.
              </label>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-3 px-6 py-3 bg-amber-400 text-black font-semibold rounded-full shadow-md hover:scale-[1.01] transition-transform"
              >
                {submitting ? "Sending..." : "Get started"}
              </button>

              {status && (
                <p className={`text-sm ${status.ok ? "text-emerald-400" : "text-rose-400"}`}>{status.msg}</p>
              )}
            </div>
          </section>

          {/* right column - summary / tips */}
          <aside className="order-1 lg:order-1 lg:col-span-1 bg-neutral-900/60 border border-gray-800 rounded-2xl p-6 space-y-4 text-left">
            <h3 className="text-2xl font-semibold text-amber-300">How we&apos;ll use this</h3>
            <ul className="list-disc pl-5 text-gray-300 space-y-2 text-sm">
              <li>HR Tech — automating the employee journey with reliable, scalable tools</li>
              <li>HR Operations — onboarding to exits, process automation and accuracy</li>
              <li>Payroll — compliant, on-time payroll processing and benefits handling</li>
              <li>People Analytics — dashboards and insights to drive people decisions</li>
              <li>ESOP Services — design and administration to build ownership culture</li>
              <li>Mandatory Trainings — POSH, AML and other compliance trainings with automated reminders</li>
            </ul>

            <hr className="border-gray-800" />

            <h4 className="text-lg font-medium text-gray-200">Quick tips to get the best answer</h4>
            <ol className="list-decimal pl-5 text-gray-300 text-sm space-y-2">
              <li>Mention any payroll or compliance constraints.</li>
              <li>List the HR tools you currently use (or Excel!).</li>
              
            </ol>

            <div className="mt-3 text-xs text-gray-500">Book a consaltant- Email <a href="mailto:sales@yourdomain.com" className="text-amber-300">info@zarohr.com</a></div>
          </aside>
        </form>
      </div>
    </motion.main>
  );
}
