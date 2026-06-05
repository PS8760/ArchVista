"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "../AnimatedText";

gsap.registerPlugin(ScrollTrigger);

function BlueprintSVG({ progress }: { progress: number }) {
  // Map progress through a mild ease-in curve so the drawing
  // starts quickly and slows as it completes — feels intentional.
  const eased = progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  // Total approximate path length for all strokes in this SVG
  const TOTAL = 3200;
  const dashOffset = TOTAL * (1 - eased);

  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-3xl mx-auto"
      style={{
        filter: `drop-shadow(0 0 ${8 + eased * 18}px rgba(216,197,163,0.12))`,
      }}
    >
      {/* ── All strokes share one dash animation driven by eased progress ── */}
      <g
        stroke="#D8C5A3"
        strokeWidth="0.9"
        strokeDasharray={TOTAL}
        strokeDashoffset={dashOffset}
        style={{ transition: "stroke-dashoffset 0.03s linear" }}
      >
        {/* Foundation */}
        <line x1="150" y1="480" x2="650" y2="480" opacity="0.85" />
        <line x1="140" y1="490" x2="660" y2="490" opacity="0.4" />

        {/* Walls */}
        <line x1="180" y1="480" x2="180" y2="200" opacity="0.85" />
        <line x1="620" y1="480" x2="620" y2="200" opacity="0.85" />

        {/* Floor lines */}
        <line x1="180" y1="400" x2="620" y2="400" opacity="0.5" />
        <line x1="180" y1="320" x2="620" y2="320" opacity="0.5" />
        <line x1="180" y1="240" x2="620" y2="240" opacity="0.5" />

        {/* Roof */}
        <line x1="150" y1="200" x2="400" y2="100" opacity="0.85" />
        <line x1="650" y1="200" x2="400" y2="100" opacity="0.85" />
        <line x1="180" y1="200" x2="620" y2="200" opacity="0.6" />

        {/* Windows — row 1 */}
        <rect x="220" y="250" width="60" height="50" opacity="0.4" />
        <rect x="320" y="250" width="60" height="50" opacity="0.4" />
        <rect x="420" y="250" width="60" height="50" opacity="0.4" />
        <rect x="520" y="250" width="60" height="50" opacity="0.4" />

        {/* Windows — row 2 */}
        <rect x="220" y="330" width="60" height="50" opacity="0.4" />
        <rect x="320" y="330" width="60" height="50" opacity="0.4" />
        <rect x="420" y="330" width="60" height="50" opacity="0.4" />
        <rect x="520" y="330" width="60" height="50" opacity="0.4" />

        {/* Door */}
        <rect x="370" y="420" width="60" height="60" opacity="0.65" />
        <line x1="400" y1="420" x2="400" y2="480" opacity="0.3" />

        {/* Internal verticals */}
        <line x1="400" y1="200" x2="400" y2="480" opacity="0.18" />
        <line x1="300" y1="200" x2="300" y2="480" opacity="0.14" />
        <line x1="500" y1="200" x2="500" y2="480" opacity="0.14" />
      </g>

      {/* Measurement annotations — fade in after 45% scroll */}
      <g
        style={{
          opacity: eased > 0.45 ? Math.min((eased - 0.45) * 3.5, 1) : 0,
          transition: "opacity 0.25s",
        }}
      >
        <line x1="180" y1="520" x2="620" y2="520" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.5" />
        <line x1="180" y1="515" x2="180" y2="525" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.5" />
        <line x1="620" y1="515" x2="620" y2="525" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.5" />
        <text x="400" y="540" textAnchor="middle" fill="#D8C5A3" fontSize="10" opacity="0.6" fontFamily="monospace">
          24.00 m
        </text>
        <line x1="680" y1="200" x2="680" y2="480" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.5" />
        <line x1="675" y1="200" x2="685" y2="200" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.5" />
        <line x1="675" y1="480" x2="685" y2="480" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.5" />
        <text x="700" y="345" textAnchor="middle" fill="#D8C5A3" fontSize="10" opacity="0.6" fontFamily="monospace" transform="rotate(90,700,345)">
          12.50 m
        </text>
        <line x1="120" y1="100" x2="120" y2="480" stroke="#D8C5A3" strokeWidth="0.3" opacity="0.28" strokeDasharray="4,4" />
        <text x="110" y="290" textAnchor="middle" fill="#D8C5A3" fontSize="9" opacity="0.38" fontFamily="monospace" transform="rotate(-90,110,290)">
          16.20 m (peak)
        </text>
      </g>

      {/* HUD elements — fade in after 65% scroll */}
      <g
        style={{
          opacity: eased > 0.65 ? Math.min((eased - 0.65) * 4, 1) : 0,
          transition: "opacity 0.25s",
        }}
      >
        <path d="M165 185 L150 185 L150 200" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.4" />
        <path d="M635 185 L650 185 L650 200" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.4" />
        <path d="M165 495 L150 495 L150 480" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.4" />
        <path d="M635 495 L650 495 L650 480" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.4" />
        <text x="220" y="280" fill="#D8C5A3" fontSize="8" opacity="0.38" fontFamily="monospace">ZONE A</text>
        <text x="420" y="360" fill="#D8C5A3" fontSize="8" opacity="0.38" fontFamily="monospace">ZONE B</text>
        <circle cx="400" cy="100" r="8" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.28" />
        <line x1="392" y1="100" x2="408" y2="100" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.28" />
        <line x1="400" y1="92" x2="400" y2="108" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.28" />
      </g>
    </svg>
  );
}

export default function BlueprintSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=90%",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => setProgress(self.progress),
      });

      return () => trigger.kill();
    });

    mm.add("(max-width: 1023px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.6,
        onUpdate: (self) => setProgress(self.progress),
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blueprint"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(216,197,163,${0.02 + progress * 0.04}) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-5 px-5 py-24 sm:px-6 lg:h-screen lg:py-20">
        {/* Header */}
        <div className="text-center">
          <span className="text-[10px] tracking-[0.4em] uppercase text-accent/60 block mb-2">
            Technical Blueprint
          </span>
          <AnimatedText
            text="Precision Engineered"
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light"
            scrollTrigger
          />
          <p
            className="text-text-secondary text-xs md:text-sm mt-4 max-w-md mx-auto font-light leading-relaxed"
            style={{
              opacity: progress > 0.2 ? 1 : 0,
              transition: "opacity 0.5s",
            }}
          >
            Every detail designed with absolute precision. From structural
            integrity to aesthetic harmony, nothing is left to chance.
          </p>
        </div>

        {/* Blueprint Visualization */}
        <div className="mx-auto flex h-[40vh] min-h-[240px] w-full max-w-3xl items-center justify-center sm:min-h-[300px] lg:max-h-[430px]">
          <BlueprintSVG progress={progress} />
        </div>

        {/* Technical stats bar */}
        <div
          className="mt-6 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12"
          style={{
            opacity: progress > 0.5 ? 1 : 0,
            transition: "opacity 0.5s",
          }}
        >
          {[
            { label: "Precision", value: "0.01mm" },
            { label: "Scale", value: "1:200" },
            { label: "Material", value: "Grade A" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-accent text-xs font-mono">{stat.value}</div>
              <div className="text-text-secondary/50 text-[9px] tracking-[0.2em] uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
