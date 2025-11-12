"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

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

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();

  const [showSplash, setShowSplash] = useState(true);
  // contentVisible controls rendering of the main content. If reducedMotion is true,
  // show content immediately.
  const [contentVisible, setContentVisible] = useState<boolean>(reducedMotion);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "idle" | "sent" | "error">(null);

  useEffect(() => {
    if (reducedMotion) {
      // if user prefers reduced motion, skip splash entirely and show content
      setShowSplash(false);
      setContentVisible(true);
      return;
    }
    const t = setTimeout(() => setShowSplash(false), 1400);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setTimeout(() => setStatus(null), 2400);
      return;
    }
    // Replace with your API call
    setStatus("sent");
    setEmail("");
    setTimeout(() => setStatus(null), 2600);
  }

  /* -------------------------
    Motion variants (unchanged)
  --------------------------*/
  const splashVariants: Variants = {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  };

  /* -------------------------
    Reveal config (mount letters over time)
  --------------------------*/
  const stagger = 0.02; // seconds per character
  const initialDelay = 0.12; // seconds before first character
  const interParagraphGap = 0.12; // seconds between para1 end and para2 start

  const para1 =
    "We’re not your typical HR firm. ZaroHR helps you streamline, automate, and elevate your people operations — from offer to exit — so you can focus on growth, not grunt work.";
  const para2 =
    "With the right blend of technology, data, and human insight, we turn HR from a process problem into a measurable performance advantage.";

  // compute gap steps and totals
  const gapSteps = Math.round(interParagraphGap / stagger);
  const totalSteps = para1.length + gapSteps + para2.length;

  // revealedStep increments over time; we mount characters only up to revealedStep
  const [revealedStep, setRevealedStep] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!contentVisible) return;
    if (reducedMotion) {
      setRevealedStep(totalSteps);
      return;
    }

    startTimeRef.current = null;
    setRevealedStep(0);

    function step(ts: number) {
      if (startTimeRef.current == null) startTimeRef.current = ts;
      const elapsed = (ts - startTimeRef.current) / 1000; // seconds
      const effective = Math.max(0, elapsed - initialDelay);
      const index = Math.floor(effective / stagger);
      const next = Math.min(totalSteps, index);
      if (next !== revealedStep) setRevealedStep(next);
      if (next < totalSteps) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startTimeRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentVisible]); // start when contentVisible becomes true

  // compute how many chars from each paragraph to show
  const para1Count = Math.min(para1.length, revealedStep);
  const afterPara1 = Math.max(0, revealedStep - para1.length);
  const para2Count = Math.max(0, Math.min(para2.length, afterPara1 - gapSteps));

  const showPara1Count = reducedMotion ? para1.length : para1Count;
  const showPara2Count = reducedMotion ? para2.length : para2Count;

  // render only mounted characters (so paragraph height grows as chars mount)
  function renderParaCharsMounted(text: string, count: number) {
    return text
      .split("")
      .slice(0, count)
      .map((ch, i) => {
        // render normally (spaces intact) and allow wrapping
        return (
          <motion.span
            key={`char-${i}-${ch}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="inline"
          >
            {ch}
          </motion.span>
        );
      });
  }

  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden" aria-label="ZaroHR hero">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover opacity-90"
          src="/videos/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),
            linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 4px 4px, 4px 4px",
          backgroundBlendMode: "overlay",
        }}
      />

      {/* Splash: use AnimatePresence and reveal main content only after exit completes */}
      <AnimatePresence onExitComplete={() => setContentVisible(true)}>
        {showSplash && !reducedMotion && (
          <motion.div
            key="splash"
            variants={splashVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
            aria-hidden={!showSplash}
          >
            <div className="text-center px-6">
              <motion.p
                className="text-base sm:text-xl font-semibold text-white/95 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                transition={{ duration: 0.28 }}
              >
                Welcome to
              </motion.p>

              <motion.h2
                className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-lg"
                initial={{ scale: 0.995 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.45 }}
              >
                Zaro<span className=" text-amber-400 bg-clip-text">HR</span>
              </motion.h2>

              <motion.p
                className="text-lg sm:text-2xl font-semibold text-white/95 mt-3 -tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                Cut Through the Clutter. <span className="hidden sm:inline">Power What’s Next.</span>
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content: render only when contentVisible */}
      {contentVisible && (
        <motion.div
          className="relative z-20 w-full px-6 md:px-12 lg:px-20"
          variants={containerVariants}
          initial="hidden"
          animate={showSplash ? "hidden" : "show"}
          aria-hidden={!contentVisible}
        >
          <div className="max-w-3xl">
            {/* Headline */}
            <motion.header variants={itemVariants} className="mb-6">
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-5xl font-extrabold text-white leading-tight"
              >
                Zaro
                <span className="text-amber-400 bg-clip-text">HR</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-2xl md:text-2xl font-semibold text-white/95 mt-3 -tracking-wide"
              >
                Cut Through the Clutter. <span className="hidden sm:inline">Power What’s Next.</span>
              </motion.p>
            </motion.header>


            {/* Description: two paragraphs — mounted characters grow the paragraph */}
            <motion.div
              variants={itemVariants}
              className="mb-4 text-white/90 leading-relaxed prose prose-invert max-w-prose"
              style={{ textAlign: "left" }}
            >
              {reducedMotion ? (
                <>
                  <p className="text-base md:text-lg leading-relaxed mb-4">{para1}</p>
                  <p className="text-base md:text-lg leading-relaxed">{para2}</p>
                </>
              ) : (
                <>
                  <p className="text-base md:text-lg leading-relaxed mb-4 whitespace-normal break-words">
                    {renderParaCharsMounted(para1, showPara1Count)}
                  </p>
                  <p className="text-base md:text-lg leading-relaxed whitespace-normal break-words">
                    {renderParaCharsMounted(para2, showPara2Count)}
                  </p>
                </>
              )}
            </motion.div>

            {/* Email CTA (starts flush underneath heading; will be pushed down naturally) */}
            <motion.form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              variants={itemVariants}
              className="w-full max-w-md flex items-center gap-4 bg-white/6 border border-white/12 rounded-full p-2 shadow-sm"
              aria-label="Get started with ZaroHR"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-3.5 text-white/70 w-5 h-5" />
                <label htmlFor="hero-email" className="sr-only">
                  Your work email
                </label>
                <input
                  id="hero-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Your work email"
                  className="w-full pl-12 pr-4 h-12 rounded-full bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cc-accent"
                />
              </div>

              <button
                type="submit"
                className="h-12 px-6 rounded-full bg-amber-400 text-black font-semibold shadow-sm hover:scale-[1.02] transition-transform focus:outline-none focus:ring-4 focus:ring-cc-accent/30"
                aria-pressed={status === "sent"}
              >
                {status === "sent" ? "Thanks — we'll reach out" : "Get started"}
              </button>
            </motion.form>

            <motion.p variants={itemVariants} className="text-sm text-white/70 mt-4 max-w-md">
              No spam — just a quick intro and optional product walkthrough.
            </motion.p>
          </div>
        </motion.div>
      )}
    </section>
  );
}
