export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mangesh Shinde"
    >
      {/* Rounded square background */}
      <rect width="32" height="32" rx="8" fill="white" fillOpacity="0.06" />
      <rect width="32" height="32" rx="8" stroke="white" strokeOpacity="0.12" strokeWidth="0.75" />

      {/* M letterform */}
      <path
        d="M7 22V10L12.5 18L16 13L19.5 18L25 10V22"
        stroke="url(#logo-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <defs>
        <linearGradient id="logo-grad" x1="7" y1="10" x2="25" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4B5FD" />
          <stop offset="1" stopColor="#67E8F9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
