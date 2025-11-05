"use client";

import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="mt-14 py-10 bg-gradient-to-r from-cc-primary/8 via-white to-transparent rounded-2xl shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: text */}
          <div className="text-center md:text-left">
            <p className="inline-block text-xs font-medium bg-cc-primary/10 text-cc-primary px-3 py-1 rounded-full mb-3">
              Free 30-minute assessment
            </p>

            <h3 id="cta-heading" className="text-2xl sm:text-3xl font-bold text-slate-900">
              Ready to transform your HR?
            </h3>

            <p className="mt-2 text-slate-600 max-w-xl">
              Talk to a specialist and get a complimentary assessment to identify quick wins
              for hiring, performance and compliance.
            </p>
          </div>

          {/* Right: actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-cc-primary text-white font-semibold shadow-md hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-4 focus:ring-cc-primary/20"
              aria-label="Book a call"
            >
              Book a call
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-slate-200"
              aria-label="Request demo"
            >
              Request demo
            </a>
          </div>
        </div>

        {/* subtle divider + small legal/comfort text */}
        <div className="mt-6 text-center md:text-left text-xs text-slate-500">
          No credit card required · Cancel anytime · We'll follow up with a short checklist before the call.
        </div>
      </div>
    </section>
  );
}
