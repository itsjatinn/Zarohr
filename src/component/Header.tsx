"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Lock scroll when menu open (cleanup returns void)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navItems = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    // Updated: link What We Do to the page route /what-we-do
    { name: "What We Do", href: "/what-we-do", icon: <Briefcase size={20} /> },
    { name: "Blog", href: "/comingsoon", icon: <Newspaper size={20} /> },
    { name: "Contact", href: "/contact", icon: <Phone size={20} /> },
  ];

  // Animations
  const spring: Transition = { type: "spring", stiffness: 260, damping: 28 };

  const drawer: Variants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: spring },
    exit: { x: "100%", transition: { duration: 0.25 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, x: 8 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.05 + i * 0.05 },
    }),
  };

  return (
    <>
      <header className="fixed left-0 top-0 w-full z-[100] bg-black/95 text-white backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="ZaroHR Logo"
              width={44}
              height={44}
              className="h-8 w-8 md:h-11 md:w-11 object-contain"
              priority
            />
            <div className="flex flex-col leading-none">
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Zaro<span className="text-amber-400">HR</span>
              </span>
              <span className="text-[11px] md:text-sm font-medium text-white/70 -mt-[2px]">
                cutting through clutter
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-1.5 text-sm font-medium hover:text-amber-400 transition"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <Link
              href="/comingsoon"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-400 text-black font-semibold hover:bg-white transition"
            >
              <Rocket size={16} /> Get Started
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 border border-white/10 rounded-md"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Drawer via Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />

                {/* Drawer */}
                <motion.div
                  id="mobile-menu"
                  className="fixed right-0 top-0 bottom-0 z-[999] w-[82%] max-w-sm bg-neutral-950 border-l border-white/10 flex flex-col"
                  variants={drawer}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  role="dialog"
                  aria-modal="true"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/90">
                    <span className="text-sm font-medium text-white/90">Menu</span>
                    <button
                      onClick={() => setOpen(false)}
                      className="p-2 border text-white border-white/90 rounded-md"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Links */}
                  <nav className="flex-1 overflow-y-auto">
                    <ul className="px-2 py-2">
                      {navItems.map((nav, i) => (
                        <motion.li
                          key={nav.name}
                          custom={i}
                          variants={item}
                          initial="hidden"
                          animate="visible"
                        >
                          <Link
                            href={nav.href}
                            onClick={() => setOpen(false)}
                            className="group flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:text-amber-300 hover:bg-white/5 active:bg-white/10 transition text-base"
                          >
                            <div className="text-white group-hover:text-amber-300">
                              {nav.icon}
                            </div>
                            <span className="font-medium group-hover:text-amber-300">
                              {nav.name}
                            </span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  {/* CTA */}
                  <div className="border-t border-white/10 p-4">
                    <Link
                      href="/comingsoon"
                      onClick={() => setOpen(false)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold bg-amber-400 text-black hover:bg-white transition"
                    >
                      <Rocket size={18} /> Get Started
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* Spacer */}
      <div className="h-[72px]" />
    </>
  );
}
