import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#0A0A0A",
          border: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path
            d="M1 15V1L7.5 10L10 6L12.5 10L19 1V15"
            stroke="url(#g)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="g" x1="1" y1="1" x2="19" y2="15" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C4B5FD" />
              <stop offset="1" stopColor="#67E8F9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
    { ...size }
  );
}
