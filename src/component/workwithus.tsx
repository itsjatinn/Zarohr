"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Section = { id: string; title: string; summary?: string; content: React.ReactNode };

const sections: Section[] = [
  {
    id: "hire",
    title: "Hire the right people",
    summary: "Structured hiring playbooks, role briefs, and interview scorecards.",
    content: (
      <div className="prose prose-sm sm:prose-base text-slate-700">
        <p>
          Shortlist faster with role templates, curated question banks, and scorecards that
          prioritize fit and impact. Integrations with major ATS let you manage everything from one dashboard.
        </p>
        <ul>
          <li>Role templates</li>
          <li>Interview scorecards</li>
          <li>ATS & calendar integrations</li>
        </ul>
      </div>
    ),
  },
  {
    id: "perform",
    title: "Performance & development",
    summary: "Continuous feedback, OKRs, and growth conversations.",
    content: (
      <div className="prose prose-sm sm:prose-base text-slate-700">
        <p>Move beyond annual reviews — run continuous check-ins, set team OKRs, and conduct data-driven calibration.</p>
      </div>
    ),
  },
  {
    id: "comp",
    title: "Compensation & benefits",
    summary: "Market mapping, payroll integrations & benefits advisory.",
    content: (
      <div className="prose prose-sm sm:prose-base text-slate-700">
        <p>Build competitive packages using market benchmarks and automate payroll. Offer flexible benefits that matter.</p>
      </div>
    ),
  },
  {
    id: "compliance",
    title: "Compliance & policies",
    summary: "Local labour law guidance, contracts, and handbooks.",
    content: (
      <div className="prose prose-sm sm:prose-base text-slate-700">
        <p>Keep your organisation protected with up-to-date local policies and role-specific contracts.</p>
      </div>
    ),
  },
];

export default function WorkWithUsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // open first by default

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
    // scroll into view after state change — small timeout ensures DOM expanded
    setTimeout(() => {
      const el = document.getElementById(`section-panel-${sections[index].id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }, 220);
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Work with us</h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        Pick an area to explore. Click a tile to open details — only one section stays open at a time to keep the page compact and focused.
      </p>

      <div className="space-y-4">
        {sections.map((s, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={s.id}
              className={`rounded-2xl overflow-hidden border transition-shadow duration-200 ${
                isOpen ? "bg-white shadow-md border-slate-200" : "bg-white border-slate-100 shadow-sm"
              }`}
            >
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`section-panel-${s.id}`}
                className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-cc-accent/30"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 hidden sm:block">{s.summary}</p>
                  <p className="text-sm text-slate-500 mt-1 sm:hidden">{s.summary}</p>
                </div>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="text-slate-500"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`section-panel-${s.id}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                    className="px-6 pb-6"
                  >
                    <div className="pt-2">{s.content}</div>

                    <div className="mt-6 flex gap-3">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cc-primary text-white text-sm font-semibold shadow-sm hover:shadow"
                      >
                        Talk to expert
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        View case study
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
