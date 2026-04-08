import { portfolioData } from "@/data/portfolio";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Clock, Users, Wrench, Building2 } from "lucide-react";
import Badge from "@/components/ui/Badge";

/** Renders a string with \n\n as paragraph breaks */
function RichText({ text }: { text: string }) {
  return (
    <div className="space-y-4">
      {text.split("\n\n").map((para, i) => (
        <p key={i} className="text-base text-white/60 leading-relaxed">
          {para}
        </p>
      ))}
    </div>
  );
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioData.caseStudies
    .filter((s) => !s.isPasswordProtected)
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = portfolioData.caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: `${study.title} — ${portfolioData.name}`,
    description: study.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = portfolioData.caseStudies.find((s) => s.slug === slug);

  if (!study || study.isPasswordProtected) notFound();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero */}
      <div
        className="w-full h-[50vh] min-h-[320px] relative flex items-end"
        style={{ background: study.heroGradient ?? study.color }}
      >
        {study.image && (
          <Image
            src={study.image}
            alt={study.title}
            fill
            priority
            className="object-cover object-top"
          />
        )}
        {/* Gradient overlay so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 pb-12 w-full">
          <p className="text-xs text-white/50 uppercase tracking-widest mb-3">{study.category}</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">{study.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16">
        {/* Back */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          Back to Work
        </Link>

        {/* Meta grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-6 rounded-2xl border border-white/8 bg-[#111111]">
          {study.role && (
            <div>
              <p className="text-xs text-white/30 mb-1 flex items-center gap-1.5">
                <Building2 size={11} /> Role
              </p>
              <p className="text-sm text-white/80">{study.role}</p>
            </div>
          )}
          {study.company && (
            <div>
              <p className="text-xs text-white/30 mb-1">Company</p>
              <p className="text-sm text-white/80">{study.company}</p>
            </div>
          )}
          {study.timeline && (
            <div>
              <p className="text-xs text-white/30 mb-1 flex items-center gap-1.5">
                <Clock size={11} /> Timeline
              </p>
              <p className="text-sm text-white/80">{study.timeline}</p>
            </div>
          )}
          {study.team && (
            <div>
              <p className="text-xs text-white/30 mb-1 flex items-center gap-1.5">
                <Users size={11} /> Team
              </p>
              <p className="text-sm text-white/80">{study.team}</p>
            </div>
          )}
        </div>

        {/* Tags + Tools */}
        <div className="flex flex-wrap gap-2 mb-4">
          {study.tags.map((tag) => (
            <Badge key={tag} variant="default">{tag}</Badge>
          ))}
        </div>
        {study.tools && (
          <div className="flex items-center gap-2 flex-wrap mb-16">
            <Wrench size={13} className="text-white/25" />
            {study.tools.map((t) => (
              <span key={t} className="text-xs text-white/40">{t}</span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="space-y-12">
          {study.fullDescription && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Overview</h2>
              <RichText text={study.fullDescription} />
            </div>
          )}

          {study.challenge && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">The Challenge</h2>
              <RichText text={study.challenge} />
            </div>
          )}

          {study.solution && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">The Solution</h2>
              <RichText text={study.solution} />
            </div>
          )}

          {study.outcome && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Outcome</h2>
              <RichText text={study.outcome} />
            </div>
          )}
        </div>

        {/* Live link */}
        {study.liveUrl && (
          <div className="mt-16 pt-8 border-t border-white/8">
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
            >
              View Live Project
              <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
