"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function ComingSoonPage() {
  // Palette and tone intentionally aligned with your hero component:
  // accent: amber-300, backgrounds: slate-900 -> slate-950 -> black, text: white

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100">
      {/* subtle animated stars layer */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.02),transparent 20%),radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.02),transparent 20%)]"
      />

      <main className="relative z-10 max-w-6xl w-full px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero content */}
          <section>
            <motion.h1
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-white"
            >
              We’re preparing to launch something exceptional soon — <span className="text-amber-400">ZaroHR</span>
            </motion.h1>

            <motion.p
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.06 }}
              className="mt-6 text-slate-300 max-w-xl"
            >
              A modern HR experience that cuts through the clutter — cleaner workflows,
              smarter automations, and delightful onboarding. We’re polishing the final
              details and will be live soon.
            </motion.p>

            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-8"
            >
              
            </motion.div>
          </section>

          {/* Right: Animated preview / blob */}
          <aside className="hidden lg:flex items-center justify-center">
            <div className="relative w-[520px] h-[360px]">
              <FloatingDevice />
            </div>
          </aside>
        </div>

        <footer className="mt-12 text-center text-sm text-slate-500">
          cutting through clutter • &copy; {new Date().getFullYear()} ZaroHR
        </footer>
      </main>

      {/* soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70" />
    </div>
  );
}

function SocialPill({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      onClick={(e) => e.preventDefault()}
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-white/6 text-xs text-slate-200 hover:bg-white/8 transition"
    >
      {label}
    </a>
  );
}

function FloatingDevice() {
  return (
    <motion.div
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: [18, -6, 8, 18], opacity: 1 }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full h-full"
    >
      {/* animated morphing blob */}
      <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="g1" x1="0%" x2="100%">
  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.95" />  {/* amber-400 */}
  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.95" /> {/* amber-500 */}
</linearGradient>
          <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="18" result="b" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0" />
            <feBlend in="SourceGraphic" in2="b" />
          </filter>
        </defs>

        <motion.path
          d="M 440 120 C 500 40 700 60 720 170 C 740 280 620 320 560 380 C 480 460 320 520 220 430 C 120 340 140 180 220 130 C 300 80 380 120 440 120 Z"
          fill="url(#g1)"
          filter="url(#f1)"
          initial={{ d: "M 440 120 C 500 40 700 60 720 170 C 740 280 620 320 560 380 C 480 460 320 520 220 430 C 120 340 140 180 220 130 C 300 80 380 120 440 120 Z" }}
          animate={{
            d: [
              "M 440 120 C 500 40 700 60 720 170 C 740 280 620 320 560 380 C 480 460 320 520 220 430 C 120 340 140 180 220 130 C 300 80 380 120 440 120 Z",
              "M 460 100 C 580 20 680 80 720 180 C 760 280 640 340 560 360 C 480 420 320 520 200 420 C 100 320 120 180 220 130 C 320 80 360 120 460 100 Z",
              "M 420 140 C 520 60 740 90 730 200 C 720 310 600 310 540 360 C 480 410 340 500 240 420 C 140 340 160 180 240 120 C 320 60 380 120 420 140 Z",
              "M 440 120 C 500 40 700 60 720 170 C 740 280 620 320 560 380 C 480 460 320 520 220 430 C 120 340 140 180 220 130 C 300 80 380 120 440 120 Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* faux device screen */}
        <g transform="translate(180,120)">
          <rect x="0" y="0" rx="18" ry="18" width="440" height="260" fill="#0b1220" opacity="0.25" />
          <rect x="8" y="8" rx="12" ry="12" width="424" height="244" fill="#071025" stroke="#ffffff12" />

          {/* small animated UI cards inside the device */}
          <motion.rect
            x="20"
            y="20"
            width="140"
            height="20"
            rx="6"
            fill="#ffffff10"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: [0, 6, 0], opacity: [0, 1, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.rect
            x="20"
            y="52"
            width="320"
            height="12"
            rx="6"
            fill="#ffffff08"
            initial={{ x: -8, opacity: 0 }}
            animate={{ x: [0, -6, 0], opacity: [0, 1, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: 0.8 }}
          />

          <motion.rect
            x="20"
            y="84"
            width="120"
            height="72"
            rx="10"
            fill="#ffffff06"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: [8, -6, 8], opacity: [0, 1, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
          />

          <motion.rect
            x="160"
            y="84"
            width="180"
            height="72"
            rx="10"
            fill="#ffffff05"
            initial={{ y: -2, opacity: 0 }}
            animate={{ y: [0, 6, 0], opacity: [0, 1, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: 1.6 }}
          />
        </g>
      </svg>

      {/* slight overlay glow */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen" />
    </motion.div>
  );
}
