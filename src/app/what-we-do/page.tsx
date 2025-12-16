"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Mail,
  Cpu,
  Zap,
  DollarSign,
  BarChart2,
  Users2,
  ShieldCheck,
  ArrowRight,
  ClipboardList,
  FileText,
} from "lucide-react";

/* -------------------------
  Small hook: prefers-reduced-motion
--------------------------*/
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

/* -------------------------
   Motion variants (use named easings to satisfy TS)
--------------------------*/
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const externalLink = "#";

/* -------------------------
   Types
--------------------------*/
type Feature = {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  href: string;
  live?: boolean;
};

export default function WhatWeDo(): JSX.Element {
  const reducedMotion = usePrefersReducedMotion();
  const router = useRouter();

  const features: Feature[] = [
    {
      id: "hr-tech",
      title: "HR Tech",
      desc: "Automating the employee journey with reliable, scalable tools.",
      icon: <Cpu className="w-5 h-5 text-black" />,
      href: externalLink,
    },
    {
      id: "hr-ops",
      title: "HR Operations",
      desc: "Fast, accurate, zero chaos — from onboarding to exits.",
      icon: <Zap className="w-5 h-5 text-black" />,
      href: externalLink,
    },
    {
      id: "payroll",
      title: "Payroll",
      desc: "Compliant, on time, and stress-free. Always.",
      icon: <DollarSign className="w-5 h-5 text-black" />,
      href: externalLink,
    },
    {
      id: "analytics",
      title: "People Analytics",
      desc: "Turning workforce data into decisions that move the needle.",
      icon: <BarChart2 className="w-5 h-5 text-black" />,
      href: externalLink,
    },
    {
      id: "esop",
      title: "ESOP Services",
      desc: "Build ownership cultures that drive retention and motivation.",
      icon: <Users2 className="w-5 h-5 text-black" />,
      href: externalLink,
    },
    {
      id: "trainings",
      title: "Mandatory Trainings",
      desc: "POSH, AML and more — with automated reminders & dashboards.",
      icon: <ShieldCheck className="w-5 h-5 text-black" />,
      href: "https://compliance-portal-tau.vercel.app/",
      live: true,
    },
    // NEW: Compensation & Benefits
    {
      id: "comp-benefits",
      title: "Compensation & Benefits",
      desc: "Designing competitive pay structures and benefits packages that attract and retain talent.",
      icon: <ClipboardList className="w-5 h-5 text-black" />,
      href: externalLink,
    },
    // NEW: Audits
    {
      id: "audits",
      title: "Audits",
      desc: "Audit-ready processes and reports to keep you compliant and inspection-proof.",
      icon: <FileText className="w-5 h-5 text-black" />,
      href: externalLink,
    },
  ];

  /* -------------------------
    Paragraph reveal (character mount)
  --------------------------*/
  const paragraph =
    "We help organisations build modern HR operations — from onboarding to exits — with software and services that reduce manual effort, ensure compliance, and surface the insights HR and leadership need to act.";

  const stagger = 0.02;
  const initialDelay = 0.12;

  const totalChars = paragraph.length;
  const [revealedStep, setRevealedStep] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setRevealedStep(totalChars);
      return;
    }

    startRef.current = null;
    setRevealedStep(0);

    function step(ts: number) {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      const effective = Math.max(0, elapsed - initialDelay);
      const index = Math.floor(effective / stagger);
      const next = Math.min(totalChars, index);
      setRevealedStep((prev) => (prev === next ? prev : next));
      if (next < totalChars) rafRef.current = requestAnimationFrame(step);
      else rafRef.current = null;
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  function renderParaCharsMounted(text: string, count: number) {
    return text.split("").slice(0, count).map((ch, i) => {
      return (
        <motion.span
          key={`pchar-${i}-${ch}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="inline"
        >
          {ch}
        </motion.span>
      );
    });
  }

  /* -------------------------
    Email CTA state + behavior (copied/adapted from Hero)
  --------------------------*/
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "idle" | "sent" | "error">(null);

  // inline popup for invalid/missing email
  const [showPopup, setShowPopup] = useState(false);
  const popupTimerRef = useRef<number | null>(null);

  // tooltip on hover / click for the button
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipClick, setShowTooltipClick] = useState(false); // true when triggered by click
  const tooltipTimerRef = useRef<number | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  function dismissPopup() {
    setShowPopup(false);
    setStatus(null);
    if (popupTimerRef.current) {
      window.clearTimeout(popupTimerRef.current);
      popupTimerRef.current = null;
    }
  }

  function showTooltipForClick() {
    if (tooltipTimerRef.current) {
      window.clearTimeout(tooltipTimerRef.current);
    }
    setShowTooltip(true);
    setShowTooltipClick(true);

    tooltipTimerRef.current = window.setTimeout(() => {
      setShowTooltip(false);
      setShowTooltipClick(false);
      tooltipTimerRef.current = null;
    }, 2600);
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = email.trim();
    const validEmail = trimmed && trimmed.includes("@") && trimmed.length >= 3;

    // always show click tooltip when button clicked
    showTooltipForClick();

    if (!validEmail) {
      // hide tooltip immediately so both don't show together
      if (tooltipTimerRef.current) {
        window.clearTimeout(tooltipTimerRef.current);
        tooltipTimerRef.current = null;
      }
      setShowTooltip(false);
      setShowTooltipClick(false);

      // show animated inline popup and focus input
      setShowPopup(true);
      setStatus("error");

      // clear existing popup timer
      if (popupTimerRef.current) {
        window.clearTimeout(popupTimerRef.current);
      }
      popupTimerRef.current = window.setTimeout(() => {
        setShowPopup(false);
        setStatus(null);
        popupTimerRef.current = null;
      }, 2600);

      inputRef.current?.focus();
      return;
    }

    // navigate to the survey page and pass the email as a query param.
    const encoded = encodeURIComponent(trimmed);
    router.push(`/getstarted?email=${encoded}`);

    // show a small transient state
    setStatus("sent");
    setTimeout(() => setStatus(null), 2600);
  }

  // popup + tooltip motion variants
  const popupVariants: Variants = {
    initial: { opacity: 0, y: -6, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 500, damping: 28 } },
    exit: { opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.18 } },
  };

  const tooltipVariants: Variants = {
    initial: { opacity: 0, y: 8 },
    animate: (isClick: boolean) =>
      isClick
        ? { opacity: 1, y: -8, transition: { duration: 0.22, ease: [0.2, 0.9, 0.3, 1] } } // fade up on click
        : { opacity: 1, y: 0, transition: { duration: 0.18, ease: [0.2, 0.9, 0.3, 1] } }, // subtle on hover
    exit: { opacity: 0, y: 8, transition: { duration: 0.12 } },
  };

  // clean up timers on unmount
  useEffect(() => {
    return () => {
      if (popupTimerRef.current) {
        window.clearTimeout(popupTimerRef.current);
        popupTimerRef.current = null;
      }
      if (tooltipTimerRef.current) {
        window.clearTimeout(tooltipTimerRef.current);
        tooltipTimerRef.current = null;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      startRef.current = null;
    };
  }, []);

  return (
    <section className="min-h-screen bg-black text-white">
      {/* HERO */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid gap-8 lg:grid-cols-2 items-start">
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
            What we do
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" className="text-xl font-semibold text-amber-400 mb-6">
            ZaroHR — Because HR should work, not just exist.
          </motion.p>

          {/* Revealing paragraph */}
          <div className="text-lg text-gray-300 max-w-prose mb-6">
            {reducedMotion ? (
              <p>{paragraph}</p>
            ) : (
              <p className="whitespace-normal break-words">{renderParaCharsMounted(paragraph, revealedStep)}</p>
            )}
          </div>

          {/* Email CTA */}
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            variants={itemVariants}
            className="mt-2 w-full max-w-md flex items-center gap-4 bg-white/6 border border-white/12 rounded-full p-2 shadow-sm relative"
            aria-label="Get started with ZaroHR"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-3.5 text-white/70 w-5 h-5" />
              <label htmlFor="whatwe-do-email" className="sr-only">
                Your work email
              </label>
              <input
                id="whatwe-do-email"
                ref={inputRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your work email"
                className="w-full pl-12 pr-4 h-12 rounded-full bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div
              className="relative flex items-center"
              onMouseEnter={() => {
                if (tooltipTimerRef.current) window.clearTimeout(tooltipTimerRef.current);
                tooltipTimerRef.current = window.setTimeout(() => {
                  setShowTooltip(true);
                  setShowTooltipClick(false);
                }, 70);
              }}
              onMouseLeave={() => {
                if (tooltipTimerRef.current) window.clearTimeout(tooltipTimerRef.current);
                tooltipTimerRef.current = window.setTimeout(() => {
                  setShowTooltip(false);
                  setShowTooltipClick(false);
                }, 80);
              }}
            >
              <button
                type="submit"
                onClick={() => {
                  showTooltipForClick();
                }}
                className="h-12 px-6 rounded-full bg-amber-400 text-black font-semibold shadow-sm hover:scale-[1.02] transition-transform focus:outline-none focus:ring-4 focus:ring-amber-400/30 hover:bg-white transition"
                aria-pressed={status === "sent"}
              >
                {status === "sent" ? "Thanks — we'll reach out" : "Get started"}
              </button>

              {/* Hover/Click Tooltip (centered under button). Hide while popup visible */}
              <AnimatePresence>
                {showTooltip && !showPopup && (
                  <motion.div
                    key="hover-tooltip"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={tooltipVariants}
                    custom={showTooltipClick}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 pointer-events-none z-40"
                    aria-hidden={!showTooltip}
                  >
                    <div className="bg-amber-400 text-black font-semibold text-xs px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap">
                      Ready to tidy up HR?
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Inline animated error popup: appears below the button */}
              <AnimatePresence>
                {showPopup && (
                  <motion.div
                    key="email-popup"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={popupVariants}
                    className="absolute right-0 top-full mt-3 w-72 sm:w-80 pointer-events-auto z-50"
                    role="alert"
                    aria-live="assertive"
                  >
                    <div className="bg-rose-600/95 text-white rounded-xl px-4 py-3 shadow-lg border border-rose-500">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">Please enter a valid work email</p>
                          <p className="text-xs opacity-90 mt-1">We need your email to start the conversation</p>
                        </div>
                        <button
                          onClick={() => dismissPopup()}
                          aria-label="Dismiss"
                          className="ml-2 text-white/85 hover:text-white/95 focus:outline-none"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          {/* <motion.p variants={fadeUp} className="text-sm text-white/70 mt-4 max-w-md">
            No spam — just a quick intro and optional product walkthrough.
          </motion.p> */}
        </motion.div>

        {/* Quick Benefits Card (commented out by default) */}
        {/* <aside className="rounded-3xl mt-16 p-9 bg-gradient-to-br from-amber-400/10 to-black border border-amber-400/6">
          <h3 className="text-2xl font-semibold text-amber-400">Why choose us</h3>
          <ul className="mt-4 space-y-3 text-gray-200">
            <li>End-to-end HR coverage — a single source of truth for people data.</li>
            <li>Automations that remove manual work and reduce errors.</li>
            <li>Compliance-first approach with audit-ready reporting.</li>
          </ul>
        </aside> */}
      </div>

      {/* FEATURE GRID */}
      <section id="services" className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Core Services</h2>
            <p className="mt-2 text-sm text-white/70 max-w-2xl mx-auto">
              Smart. Simple. Scalable — core services that remove friction and scale with your team.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <motion.a
                key={f.id}
                href={f.href}
                target={f.href.startsWith("http") ? "_blank" : undefined}
                rel={f.href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ translateY: -6, scale: 1.01 }}
                whileTap={{ scale: 0.995 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="group relative flex h-full w-full items-start gap-6 rounded-2xl bg-white/5 border border-white/10 p-6 shadow-md backdrop-blur-sm hover:shadow-lg hover:border-amber-400/20 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/30"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-400 shadow-sm">{f.icon}</div>
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <h3 className="text-lg font-semibold text-white leading-tight">{f.title}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{f.desc}</p>
                </div>

                <motion.div
                  className={`ml-4 flex items-center justify-center rounded-full w-9 h-9 transition ${f.live ? "bg-emerald-500 text-white hover:bg-emerald-400 shadow-md" : "bg-white/10 text-white/80 group-hover:bg-white/20"}`}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  aria-hidden
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>

                <span className="absolute left-6 right-6 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent rounded-b-xl" />

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

      {/* CTA */}
      <div className="bg-gradient-to-r from-black to-black/90 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">Ready to simplify HR?</h3>
          <p className="mt-3 text-gray-300">Book a demo and we’ll show a tailored walkthrough for your organisation.</p>
          <div className="mt-6">
            {/* Updated: route to /getstarted and pass email if provided */}
            <button
              onClick={() => {
                const trimmed = email.trim();
                if (trimmed && trimmed.includes("@")) {
                  router.push(`/getstarted?email=${encodeURIComponent(trimmed)}`);
                } else {
                  router.push(`/getstarted`);
                }
              }}
              className="inline-block px-6 py-3 rounded-xl bg-amber-400 text-black font-semibold shadow-lg hover:brightness-95 hover:bg-white transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
