"use client";

import { motion, Transition } from "framer-motion";
import dynamic from "next/dynamic";
import { portfolioData } from "@/data/portfolio";
import { ArrowDown } from "lucide-react";

const HeroCanvas = dynamic(() => import("@/components/sections/HeroCanvas"), { ssr: false });

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" } as Transition,
});

export default function Hero() {
  const { name, title, bio } = portfolioData;
  const [firstName, lastName] = name.split(" ");

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">

      {/* ── 3D gem — desktop only ─────────────────────── */}
      <div className="hidden md:block">
        <HeroCanvas />
      </div>

      {/* ── Mobile background gradient ────────────────── */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0d0d1a] to-[#0A0A0A]" />

      {/* ── Bottom fade ───────────────────────────────── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />

      {/* ── Mobile layout: stacked, top-aligned ───────── */}
      <div className="md:hidden relative z-20 flex flex-col justify-center min-h-screen px-6 pt-24 pb-20">
        <motion.h1
          {...fadeUp(0.05)}
          className="text-[clamp(52px,14vw,80px)] tracking-tight leading-[0.9] mb-6"
        >
          <span className="block text-white/80 font-extralight">{firstName}</span>
          <span className="block text-gradient font-bold">{lastName}</span>
        </motion.h1>

        <motion.div {...fadeUp(0.15)} className="flex items-center gap-3 mb-5">
          <div className="w-8 h-px bg-white/20" />
          <p className="text-xs text-white/35 uppercase tracking-[0.2em]">{title}</p>
        </motion.div>

        <motion.p {...fadeUp(0.22)} className="text-base font-light leading-relaxed text-white/50 mb-10 max-w-xs">
          Turning complex workflows into{" "}
          <span className="text-white font-normal">experiences that feel effortless.</span>
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex flex-col gap-3">
          <a
            href="#work"
            className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-all"
          >
            View Work
          </a>
          <a
            href="mailto:hey@mangeshux.in"
            className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium rounded-full border border-white/12 text-white/70 hover:border-violet-400/40 hover:text-white transition-all"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* ── Desktop layout: centered, left-aligned with gem ── */}
      <div className="hidden md:flex absolute inset-0 z-20 items-center">
        <div className="w-full max-w-6xl mx-auto px-10 pt-20">
          <motion.h1
            {...fadeUp(0.05)}
            className="text-[clamp(56px,10vw,104px)] tracking-tight leading-[0.92] mb-6"
          >
            <span className="block text-white/80 font-extralight">{firstName}</span>
            <span className="block text-gradient font-bold">{lastName}</span>
          </motion.h1>

          <motion.div {...fadeUp(0.15)} className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-white/20" />
            <p className="text-xs text-white/35 uppercase tracking-[0.2em]">{title}</p>
          </motion.div>

          <motion.p {...fadeUp(0.23)} className="text-lg md:text-xl font-light leading-relaxed max-w-sm text-white/50 mb-3">
            Turning complex workflows into{" "}
            <span className="text-white font-normal">experiences that feel effortless.</span>
          </motion.p>

          <motion.p {...fadeUp(0.3)} className="text-sm text-white/25 max-w-md leading-6 mb-10">
            {bio}
          </motion.p>

          <motion.div {...fadeUp(0.38)} className="flex flex-row gap-3">
            <a
              href="#work"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-all duration-200"
            >
              View Work
            </a>
            <a
              href="mailto:hey@mangeshux.in"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-full border border-white/12 text-white/70 hover:border-violet-400/40 hover:text-white hover:bg-violet-500/5 transition-all duration-200"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll hint ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute bottom-8 left-6 md:left-10 z-20 flex items-center gap-2 text-white/20"
      >
        <ArrowDown size={13} />
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
