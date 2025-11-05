// components/services.tsx
"use client";

import React, { JSX } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu, // HR Tech
  Zap, // HR Operations
  DollarSign, // Payroll
  BarChart2, // People Analytics
  Users2, // ESOP
  ShieldCheck, // Trainings / Compliance
} from "lucide-react";

type Service = {
  id: string;
  title: string;
  short: string;
  href: string;
  Icon: (props: React.ComponentProps<"svg">) => JSX.Element;
};

const SERVICES: Service[] = [
  {
    id: "hr-tech",
    title: "HR Tech",
    short: "Automating your employee journey with tools that just work.",
    href: "/services/hr-tech",
    Icon: Cpu,
  },
  {
    id: "hr-ops",
    title: "HR Operations",
    short: "Fast, accurate, zero chaos — from onboarding to exits.",
    href: "/services/hr-operations",
    Icon: Zap,
  },
  {
    id: "payroll",
    title: "Payroll",
    short: "Compliant, on time, and stress-free. Always.",
    href: "/services/payroll",
    Icon: DollarSign,
  },
  {
    id: "people-analytics",
    title: "People Analytics",
    short: "Turning workforce data into decisions that move the needle.",
    href: "/services/people-analytics",
    Icon: BarChart2,
  },
  {
    id: "esop",
    title: "ESOP Services",
    short: "Build ownership cultures that drive retention and motivation.",
    href: "/services/esop",
    Icon: Users2,
  },
  {
    id: "trainings",
    title: "Mandatory Trainings",
    short: "POSH, AML and more — automated reminders & completion dashboards.",
    href: "/services/trainings",
    Icon: ShieldCheck,
  },
];

export default function WhatWeDo() {
  return (
    <section className="w-full py-16" aria-labelledby="what-we-do-title">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 id="what-we-do-title" className="text-3xl sm:text-4xl font-extrabold text-white">
            What we do
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/75 max-w-2xl mx-auto">
            Smart. Simple. Scalable. Explore the services we offer — click any tile to learn more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ id, title, short, href, Icon }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={href}>
                <a
                  aria-label={title}
                  className="group block rounded-2xl border border-white/8 bg-white/4 p-5 h-full focus:outline-none focus:ring-4 focus:ring-cc-accent/20 transition-shadow hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cc-accent to-amber-300 text-black shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{title}</h3>
                      <p className="mt-1 text-sm text-white/75 leading-relaxed">{short}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-white/60">Learn more</span>
                    <svg
                      className="w-4 h-4 text-white/60 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
