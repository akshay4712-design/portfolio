import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Mangesh Shinde",
  description: "UX & Product Designer with 3+ years of experience in enterprise SaaS, healthcare, and AI products.",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-16">
      {/* Top bar */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <a
          href="/resume.pdf"
          download="Mangesh_Shinde_Resume.pdf"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
        >
          <Download size={14} />
          Download PDF
        </a>
      </div>

      {/* PDF viewer */}
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#111111]" style={{ height: "85vh" }}>
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
            className="w-full h-full"
            title="Mangesh Shinde Resume"
          />
        </div>

        {/* Fallback download for browsers that can't embed PDFs */}
        <p className="text-center text-xs text-white/25 mt-4">
          Can&apos;t see the PDF?{" "}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/50 transition-colors">
            Open in new tab
          </a>
        </p>
      </div>
    </div>
  );
}
