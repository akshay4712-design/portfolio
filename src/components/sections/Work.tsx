"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { CaseStudy } from "@/types";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import RequestAccessModal from "@/components/ui/RequestAccessModal";

/* ─── Featured card (existing style) ─────────────────────────────────── */
function FeaturedCard({
  study,
  index,
  onRequestAccess,
}: {
  study: CaseStudy;
  index: number;
  onRequestAccess: (title: string) => void;
}) {
  const isProtected = study.isPasswordProtected;

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="card-glow group relative rounded-2xl border border-white/8 bg-[#111111] overflow-hidden transition-all duration-300 cursor-pointer h-full"
    >
      {/* Preview image or color band */}
      <div
        className="h-44 w-full relative overflow-hidden flex items-end p-4"
        style={{ backgroundColor: study.color }}
      >
        {study.image && (
          <Image
            src={study.image}
            alt={study.title}
            fill
            className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
          />
        )}
        {/* Overlay so text stays readable over image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {isProtected && (
          <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/70 text-xs border border-white/10">
            <Lock size={10} /> Protected
          </span>
        )}
        <span className="relative z-10 text-xs text-white/60 font-medium tracking-wide uppercase">
          {study.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base font-semibold text-white group-hover:text-white/90 transition-colors">
            {study.title}
          </h3>
          {isProtected
            ? <Lock size={14} className="text-white/20 group-hover:text-white/50 transition-colors mt-0.5 shrink-0" />
            : <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors mt-0.5 shrink-0" />
          }
        </div>
        <p className="text-sm text-white/45 leading-relaxed mb-4">{study.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {study.tags.map((tag) => (
            <Badge key={tag} variant="muted">{tag}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );

  if (isProtected) {
    return <div onClick={() => onRequestAccess(study.title)} className="h-full">{inner}</div>;
  }

  return <Link href={`/work/${study.slug}`} className="h-full block">{inner}</Link>;
}

/* ─── Supporting project row (expanded, all info visible) ─────────────── */
function SupportingCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      className="card-glow group rounded-2xl border border-white/8 bg-[#111111] p-6 transition-all duration-300"
    >
      {/* Top row: category + company + link */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium tracking-widest uppercase text-white/30">
            {study.category}
          </span>
          {study.company && (
            <>
              <span className="text-white/15">·</span>
              <span className="text-[10px] text-white/25">{study.company}</span>
            </>
          )}
        </div>
        {study.liveUrl && (
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs text-white/30 hover:text-white/70 transition-colors"
          >
            Live <ArrowUpRight size={11} />
          </a>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-white/90 transition-colors">
        {study.title}
      </h3>

      {/* Role + timeline */}
      <p className="text-xs text-white/35 mb-3">
        {study.role}{study.timeline ? ` · ${study.timeline}` : ""}
      </p>

      {/* Description */}
      <p className="text-sm text-white/50 leading-relaxed mb-4">
        {study.description}
      </p>

      {/* Outcome */}
      {study.outcome && (
        <div className="border-t border-white/6 pt-4 mb-4">
          <p className="text-xs text-white/30 uppercase tracking-wider mb-1">Outcome</p>
          <p className="text-sm text-white/45 italic leading-relaxed">{study.outcome}</p>
        </div>
      )}

      {/* Tools + tags */}
      <div className="flex flex-wrap gap-1.5">
        {study.tags.map((tag) => (
          <Badge key={tag} variant="muted">{tag}</Badge>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────────────────────── */
export default function Work() {
  const { caseStudies } = portfolioData;
  const [accessProject, setAccessProject] = useState<string | null>(null);

  const featured   = caseStudies.filter((s) => s.featured);
  const supporting = caseStudies.filter((s) => !s.featured);

  return (
    <section id="work" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      <SectionHeading
        label="Work"
        title="Selected Case Studies"
        subtitle="A mix of enterprise SaaS, healthcare, finance, and AI product work."
      />

      {/* Featured — 2×2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {featured.map((study, i) => (
          <FeaturedCard
            key={study.slug}
            study={study}
            index={i}
            onRequestAccess={setAccessProject}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-10">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />
        <span className="text-xs tracking-widest uppercase text-gradient font-semibold">Other Projects</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />
      </div>

      {/* Supporting — expanded info cards, 2-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {supporting.map((study, i) => (
          <SupportingCard key={study.slug} study={study} index={i} />
        ))}
      </div>

      {/* Access Modal */}
      {accessProject && (
        <RequestAccessModal
          project={accessProject}
          onClose={() => setAccessProject(null)}
        />
      )}
    </section>
  );
}
