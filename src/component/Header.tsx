"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Briefcase,
  Newspaper,
  Phone,
  Rocket,
  Menu,
  X,
} from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Work With Us", href: "/comingsoon", icon: <Briefcase size={18} /> },
    { name: "Blog", href: "/comingsoon", icon: <Newspaper size={18} /> },
    { name: "Contact", href: "/contact", icon: <Phone size={18} /> },
  ];

  return (
    <>
      <header className="fixed left-0 top-0 w-full z-50 bg-black/95 text-white backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
          {/* Logo + Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <Link href="/" className="group">
              <div className="flex items-center gap-1 md:gap-1">
                {/* Logo icon */}
                <Image
                  src="/images/logo.png"
                  alt="ZaroHR Logo"
                  width={44}
                  height={44}
                  className="h-10 w-10 md:h-11 md:w-11 object-contain transition-transform group-hover:scale-[1.03]"
                  priority
                />

                {/* Text + Tagline */}
                <div className="flex flex-col leading-none">
                  {/* Brand text */}
                  <span className="text-2xl md:text-3xl font-extrabold tracking-tight transition text-white">
                    Zaro<span className="text-amber-400">HR</span>
                  </span>

                  {/* Original tagline */}
                  <span className="text-xs md:text-sm font-medium text-white/70 tracking-wide -mt-1">
                    cutting through clutter
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 text-sm font-medium hover:text-amber-400 transition"
                >
                  {item.icon}
                  {item.name}
                </Link>
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/comingsoon"
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-400 text-black font-semibold hover:bg-white transition"
              >
                <Rocket size={16} /> Get Started
              </Link>
            </motion.div>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-white/10"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-black/95 border-t border-white/5 px-6 py-4 flex flex-col gap-3 text-white"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 hover:text-amber-400 transition"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <Link
                href="/comingsoon"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2 mt-3 rounded-md bg-amber-400 text-black font-semibold hover:bg-white transition"
              >
                <Rocket size={16} /> Get Started
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-[72px]" aria-hidden />
    </>
  );
}
