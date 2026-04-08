"use client";

import { motion, Transition } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: "easeOut" } as Transition,
});

const toolCategories: { label: string; key: string }[] = [
  { label: "Design",       key: "design" },
  { label: "Research",     key: "research" },
  { label: "Development",  key: "development" },
  { label: "Productivity", key: "productivity" },
];

export default function About() {
  const { bio, tools, certifications, location, social } = portfolioData;

  return (
    <section id="about" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      <SectionHeading label="About" title="The designer behind the work" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left — Bio */}
        <div>
          <motion.p {...fadeUp(0)} className="text-base text-white/60 leading-relaxed mb-6">
            {bio}
          </motion.p>
          <motion.p {...fadeUp(0.1)} className="text-base text-white/45 leading-relaxed mb-8">
            With a background in fashion design, I bring a strong sense of aesthetics and
            attention to detail to every digital product I work on. I care deeply about
            accessibility, systems thinking, and making complex things feel simple.
          </motion.p>

          {/* Location + social */}
          <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-4 text-sm">
            <span className="text-white/30">{location}</span>
            <span className="text-white/15">·</span>
            {social.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
              >
                {s.platform}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — Tools & Certifications */}
        <div className="space-y-10">
          {/* Tools */}
          <motion.div {...fadeUp(0.15)}>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-5">Tools & Stack</p>
            <div className="space-y-5">
              {toolCategories.map(({ label, key }) => {
                const items = tools.filter((t) => t.category === key);
                if (!items.length) return null;
                return (
                  <div key={key}>
                    <p className="text-xs text-white/25 mb-2">{label}</p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((t) => (
                        <span
                          key={t.name}
                          className="px-3 py-1 rounded-full border border-white/10 text-xs text-white/60 bg-white/4"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div {...fadeUp(0.25)}>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-5">Certifications</p>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert.title} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/70">{cert.title}</p>
                    <p className="text-xs text-white/30 mt-0.5">{cert.issuer}</p>
                  </div>
                  <span className="text-xs text-white/25 shrink-0 mt-0.5">{cert.date}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
