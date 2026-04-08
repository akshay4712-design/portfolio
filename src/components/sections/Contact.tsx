"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Contact() {
  const { email, location, social } = portfolioData;

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      <div className="h-px w-full bg-white/6 mb-12 md:mb-20" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400" />
            <p className="text-xs font-semibold tracking-widest uppercase text-gradient">Contact</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight mb-6">
            Let&apos;s work<br />
            <span className="text-gradient">together.</span>
          </h2>
          <p className="text-base text-white/45 max-w-sm leading-relaxed mb-10">
            Open to full-time roles, freelance projects, and collaborations. Drop a message — I usually reply within 24 hours.
          </p>

          {/* Contact info */}
          <div className="space-y-4">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
            >
              <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-xs">@</span>
              {email}
            </a>
            <div className="flex items-center gap-3 text-sm text-white/40">
              {location}
            </div>
          </div>

          {/* Social */}
          <div className="flex gap-4 mt-8">
            {social.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/35 hover:text-white/80 transition-colors"
              >
                {s.platform}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle size={40} className="text-green-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Message sent!</h3>
              <p className="text-sm text-white/50">Thanks for reaching out. I'll get back to you within 24 hours.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm text-white/40 hover:text-white transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">Name *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">Email *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/40 mb-1.5">Message *</label>
                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What are you building? What problem are you trying to solve? I'd love to hear about it…"
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-xs">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
