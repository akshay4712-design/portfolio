import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mangesh Shinde — Product & UX Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle gradient orb */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
              <path
                d="M2 20V2L9.5 13L14 7L18.5 13L26 2V20"
                stroke="url(#og-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="og-grad" x1="2" y1="2" x2="26" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C4B5FD" />
                  <stop offset="1" stopColor="#67E8F9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 20, letterSpacing: 2 }}>
            MANGESHUX.IN
          </span>
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 24 }}>
          <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 80, fontWeight: 200, lineHeight: 1, letterSpacing: -2 }}>
            Mangesh
          </span>
          <span
            style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -2,
              color: "#A78BFA",
            }}
          >
            Shinde
          </span>
        </div>

        {/* Divider + role */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.2)" }} />
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, letterSpacing: 4 }}>
            PRODUCT & UX DESIGNER
          </span>
        </div>

        {/* Tagline */}
        <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 24, fontWeight: 300, maxWidth: 600 }}>
          Turning complex workflows into{" "}
          <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 400 }}>
            experiences that feel effortless.
          </span>
        </span>
      </div>
    ),
    { ...size }
  );
}
