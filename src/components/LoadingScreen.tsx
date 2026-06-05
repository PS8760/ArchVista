"use client";

import { useEffect, useState } from "react";

/**
 * Minimal architectural loading screen.
 * Shows a blueprint-style line drawing and letter-by-letter wordmark reveal,
 * then fades out and unmounts so it never blocks the page.
 */
export default function LoadingScreen() {
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    // Start fade-out after the animation plays (~1.8s)
    const fadeTimer = setTimeout(() => setPhase("fading"), 1800);
    // Unmount after fade completes
    const removeTimer = setTimeout(() => setPhase("gone"), 2500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "gone") return null;

  const letters = ["A", "R", "C", "H", "V", "I", "S", "T", "A"];

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: phase === "fading" ? "none" : "all",
      }}
    >
      {/* Blueprint corner marks */}
      {[
        { top: 24, left: 24 },
        { top: 24, right: 24 },
        { bottom: 24, left: 24 },
        { bottom: 24, right: 24 },
      ].map((pos, i) => (
        <svg
          key={i}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{
            position: "absolute",
            ...pos,
            opacity: 0.25,
          }}
        >
          {i === 0 && (
            <>
              <line x1="0" y1="10" x2="0" y2="0" stroke="#D8C5A3" strokeWidth="1" />
              <line x1="0" y1="0" x2="10" y2="0" stroke="#D8C5A3" strokeWidth="1" />
            </>
          )}
          {i === 1 && (
            <>
              <line x1="20" y1="10" x2="20" y2="0" stroke="#D8C5A3" strokeWidth="1" />
              <line x1="10" y1="0" x2="20" y2="0" stroke="#D8C5A3" strokeWidth="1" />
            </>
          )}
          {i === 2 && (
            <>
              <line x1="0" y1="10" x2="0" y2="20" stroke="#D8C5A3" strokeWidth="1" />
              <line x1="0" y1="20" x2="10" y2="20" stroke="#D8C5A3" strokeWidth="1" />
            </>
          )}
          {i === 3 && (
            <>
              <line x1="20" y1="10" x2="20" y2="20" stroke="#D8C5A3" strokeWidth="1" />
              <line x1="10" y1="20" x2="20" y2="20" stroke="#D8C5A3" strokeWidth="1" />
            </>
          )}
        </svg>
      ))}

      {/* Wordmark letter stagger */}
      <div
        style={{
          display: "flex",
          gap: "0.25em",
          letterSpacing: "0.35em",
        }}
      >
        {letters.map((letter, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              fontWeight: 300,
              color: "#D8C5A3",
              display: "inline-block",
              opacity: 0,
              animation: `loader-letter 0.5s cubic-bezier(0.16,1,0.3,1) forwards`,
              animationDelay: `${i * 0.07}s`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Sub-label */}
      <span
        style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: "rgba(216,197,163,0.35)",
          opacity: 0,
          animation: "loader-letter 0.6s cubic-bezier(0.16,1,0.3,1) 0.7s forwards",
        }}
      >
        Architecture
      </span>

      {/* Progress line */}
      <div
        style={{
          width: "120px",
          height: "1px",
          background: "rgba(216,197,163,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(216,197,163,0.55)",
            transformOrigin: "left center",
            transform: "scaleX(0)",
            animation: "loader-line-grow 1.6s cubic-bezier(0.16,1,0.3,1) 0.2s forwards",
          }}
        />
      </div>

      {/* Three blinking dots */}
      <div style={{ display: "flex", gap: "6px", marginTop: "-0.5rem" }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "rgba(216,197,163,0.5)",
              animation: `loader-dot-blink 1s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
