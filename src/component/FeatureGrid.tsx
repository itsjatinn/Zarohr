"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Zap,
  DollarSign,
  BarChart2,
  Users2,
  ShieldCheck,
  ArrowRight,
  FileText,
  ClipboardList,
} from "lucide-react";

export default function FeatureGrid() {
  const features = [
    {
      title: "HR Tech",
      desc: "Automating your employee journey with tools that just work.",
      icon: <Cpu className="w-5 h-5 text-black" />,
      href: "/comingsoon",
    },
    {
      title: "HR Operations",
      desc: "Fast, accurate, zero chaos — from onboarding to exits.",
      icon: <Zap className="w-5 h-5 text-black" />,
      href: "/comingsoon",
    },
    {
      title: "Payroll",
      desc: "Compliant, on time, and stress-free. Always.",
      icon: <DollarSign className="w-5 h-5 text-black" />,
      href: "/comingsoon",
    },
    {
      title: "People Analytics",
      desc: "Turning workforce data into decisions that move the needle.",
      icon: <BarChart2 className="w-5 h-5 text-black" />,
      href: "/comingsoon",
    },
    {
      title: "ESOP Services",
      desc: "Build ownership cultures that drive retention and motivation.",
      icon: <Users2 className="w-5 h-5 text-black" />,
      href: "/comingsoon",
    },
    {
      title: "Mandatory Trainings",
      desc: "POSH, AML and more — with automated reminders & dashboards.",
      icon: <ShieldCheck className="w-5 h-5 text-black" />,
      href: "https://lms.zarohr.com/",
      live: true, // mark as live
    },
    // NEW: Compensation & Benefits
    {
      id: "comp-benefits",
      title: "Compensation & Benefits",
      desc: "Designing competitive pay structures and benefits packages that attract and retain talent.",
      icon: <ClipboardList className="w-5 h-5 text-black" />,
      href: "/comingsoon",
    },
    // NEW: Audits
    {
      id: "audits",
      title: "Audits",
      desc: "Audit-ready processes and reports to keep you compliant and inspection-proof.",
      icon: <FileText className="w-5 h-5 text-black" />,
      href: "/comingsoon",
    },
  ];

  return (
    <section id="services" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            What We Do
          </h2>
          <p className="mt-2 text-sm text-white/70 max-w-2xl mx-auto">
            Smart. Simple. Scalable — core services that remove friction and scale with your team.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <motion.a
              key={f.title}
              href={f.href}
              target={f.href.startsWith("http") ? "_blank" : undefined}
              rel={f.href.startsWith("http") ? "noopener noreferrer" : undefined}
              whileHover={{ translateY: -6, scale: 1.01 }}
              whileTap={{ scale: 0.995 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="group relative flex h-full w-full items-start gap-6 rounded-2xl bg-white/5 border border-white/10 p-6 shadow-md backdrop-blur-sm hover:shadow-lg hover:border-amber-400/20 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/30"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-400 shadow-sm">
                  {f.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0 text-left">
                <h3 className="text-lg font-semibold text-white leading-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  {f.desc}
                </p>
              </div>

              {/* Arrow CTA (green for live tiles only) */}
              <motion.div
                className={`ml-4 flex items-center justify-center rounded-full w-9 h-9 transition ${
                  f.live
                    ? "bg-emerald-500 text-white hover:bg-emerald-400 shadow-md"
                    : "bg-white/10 text-white/80 group-hover:bg-white/20"
                }`}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                aria-hidden
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>

              {/* Accent line */}
              <span className="absolute left-6 right-6 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent rounded-b-xl" />

              {/* Optional: tiny live badge indicator */}
              {f.live && (
                <span className="absolute bottom-3 right-4 inline-flex items-center gap-1 text-emerald-400 text-xs font-medium">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Live
                </span>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
