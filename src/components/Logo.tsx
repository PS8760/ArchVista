"use client";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}

export default function Logo({
  className = "",
  showWordmark = true,
  size = 40,
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon — Abstract architectural "A" apex */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Outer apex lines */}
        <path
          d="M24 4L4 40"
          stroke="#D8C5A3"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="logo-line"
        />
        <path
          d="M24 4L44 40"
          stroke="#D8C5A3"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="logo-line"
        />
        {/* Crossbar */}
        <path
          d="M12 28H36"
          stroke="#D8C5A3"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="logo-line"
        />
        {/* Inner detail — smaller triangle */}
        <path
          d="M24 14L17 30"
          stroke="rgba(216,197,163,0.3)"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <path
          d="M24 14L31 30"
          stroke="rgba(216,197,163,0.3)"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        {/* Apex dot */}
        <circle cx="24" cy="4" r="2" fill="#D8C5A3" />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className="text-lg tracking-[0.35em] font-light"
            style={{
              fontFamily: "var(--font-heading)",
              color: "#D8C5A3",
            }}
          >
            ARCHVISTA
          </span>
          <span
            className="text-[9px] tracking-[0.5em] mt-1"
            style={{ color: "rgba(216,197,163,0.5)" }}
          >
            ARCHITECTURE
          </span>
        </div>
      )}
    </div>
  );
}
