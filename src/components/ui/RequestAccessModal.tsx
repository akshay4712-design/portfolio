"use client";

import { useState } from "react";
import { X, Lock, CheckCircle } from "lucide-react";

interface Props {
  project: string;
  onClose: () => void;
}

type Step = "verify" | "request" | "sent" | "success";

export default function RequestAccessModal({ project, onClose }: Props) {
  const [step, setStep] = useState<Step>("verify");

  // Password step
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Request step
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [requestError, setRequestError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError("");

    try {
      const res = await fetch("/api/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.valid) {
        setStep("success");
      } else {
        setPasswordError("Incorrect password. Try requesting access below.");
      }
    } catch {
      setPasswordError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setLoading(true);
    setRequestError("");

    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, project, consent }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("sent");
      } else {
        setRequestError(data.error ?? "Something went wrong.");
      }
    } catch {
      setRequestError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Step 1 — Password entry */}
        {step === "verify" && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Lock size={16} className="text-white/50" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">Protected Case Study</h2>
                <p className="text-xs text-white/40">{project}</p>
              </div>
            </div>

            <p className="text-sm text-white/50 mb-6 leading-relaxed">
              This case study is password protected. Enter the password if you already have it, or request access below.
            </p>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="Enter password"
                />
              </div>

              {passwordError && (
                <p className="text-red-400 text-xs">{passwordError}</p>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying…" : "View Case Study"}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-white/8 text-center">
              <p className="text-xs text-white/35 mb-2">Don&apos;t have the password?</p>
              <button
                onClick={() => setStep("request")}
                className="text-sm text-white/60 hover:text-white underline underline-offset-4 transition-colors"
              >
                Request access
              </button>
            </div>
          </>
        )}

        {/* Step 2 — Request access form */}
        {step === "request" && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Lock size={16} className="text-white/50" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">Request Access</h2>
                <p className="text-xs text-white/40">{project}</p>
              </div>
            </div>

            <p className="text-sm text-white/50 mb-6 leading-relaxed">
              Share your details and agree to the NDA below. Mangesh will review and send you the password within 24 hours.
            </p>

            <form onSubmit={handleRequest} className="space-y-4">
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="you@company.com"
                />
              </div>

              {/* NDA Consent */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    consent ? "bg-white border-white" : "border-white/30 group-hover:border-white/50"
                  }`}
                  onClick={() => setConsent(!consent)}
                >
                  {consent && <span className="text-black text-[10px] font-bold">✓</span>}
                </div>
                <p className="text-xs text-white/45 leading-relaxed">
                  I agree that this case study contains confidential information and I will not disclose, share, or reproduce any part of it without explicit written permission.
                </p>
              </label>

              {requestError && <p className="text-red-400 text-xs">{requestError}</p>}

              <button
                type="submit"
                disabled={!consent || loading}
                className="w-full py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Sending request…" : "Request Access"}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-white/8 text-center">
              <button
                onClick={() => setStep("verify")}
                className="text-xs text-white/35 hover:text-white/60 transition-colors"
              >
                ← Back to password entry
              </button>
            </div>
          </>
        )}

        {/* Step 3 — Request sent confirmation */}
        {step === "sent" && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Lock size={16} className="text-white/50" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">Request Sent</h2>
                <p className="text-xs text-white/40">{project}</p>
              </div>
            </div>

            <p className="text-sm text-white/50 mb-6 leading-relaxed">
              ✅ Mangesh has been notified and will email you the password at{" "}
              <strong className="text-white/70">{email}</strong> within 24 hours. Once you have it, enter it below.
            </p>

            <div>
              <label className="block text-xs text-white/40 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Paste password when received"
              />
            </div>

            {passwordError && <p className="text-red-400 text-xs mt-2">{passwordError}</p>}

            <button
              onClick={handleVerify as unknown as React.MouseEventHandler}
              disabled={loading || !password}
              className="w-full mt-4 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying…" : "View Case Study"}
            </button>
          </>
        )}

        {/* Step 4 — Success */}
        {step === "success" && (
          <div className="text-center py-4">
            <CheckCircle size={40} className="text-green-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-white mb-2">Access Granted</h2>
            <p className="text-sm text-white/50 mb-6">
              You now have access to the {project} case study. Please remember your NDA agreement.
            </p>
            <p className="text-sm text-white/40 italic">
              Full case study coming soon — contact Mangesh directly for a walkthrough.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 border border-white/20 text-sm text-white rounded-full hover:border-white/40 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
