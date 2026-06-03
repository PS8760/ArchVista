"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "../AnimatedText";

gsap.registerPlugin(ScrollTrigger);

function BlueprintSVG({ progress }: { progress: number }) {
  const dashOffset = 1000 - progress * 1000;

  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-3xl mx-auto"
      style={{ filter: `drop-shadow(0 0 ${10 + progress * 20}px rgba(216,197,163,0.1))` }}
    >
      {/* Main building outline */}
      <g
        stroke="#D8C5A3"
        strokeWidth="1"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: dashOffset,
          transition: "stroke-dashoffset 0.05s linear",
        }}
      >
        {/* Foundation */}
        <line x1="150" y1="480" x2="650" y2="480" opacity="0.8" />
        <line x1="140" y1="490" x2="660" y2="490" opacity="0.4" />

        {/* Left wall */}
        <line x1="180" y1="480" x2="180" y2="200" opacity="0.8" />
        {/* Right wall */}
        <line x1="620" y1="480" x2="620" y2="200" opacity="0.8" />

        {/* Floor lines */}
        <line x1="180" y1="400" x2="620" y2="400" opacity="0.5" />
        <line x1="180" y1="320" x2="620" y2="320" opacity="0.5" />
        <line x1="180" y1="240" x2="620" y2="240" opacity="0.5" />

        {/* Roof */}
        <line x1="150" y1="200" x2="400" y2="100" opacity="0.8" />
        <line x1="650" y1="200" x2="400" y2="100" opacity="0.8" />
        <line x1="180" y1="200" x2="620" y2="200" opacity="0.6" />

        {/* Windows */}
        <rect x="220" y="250" width="60" height="50" opacity="0.4" />
        <rect x="320" y="250" width="60" height="50" opacity="0.4" />
        <rect x="420" y="250" width="60" height="50" opacity="0.4" />
        <rect x="520" y="250" width="60" height="50" opacity="0.4" />

        <rect x="220" y="330" width="60" height="50" opacity="0.4" />
        <rect x="320" y="330" width="60" height="50" opacity="0.4" />
        <rect x="420" y="330" width="60" height="50" opacity="0.4" />
        <rect x="520" y="330" width="60" height="50" opacity="0.4" />

        {/* Door */}
        <rect x="370" y="420" width="60" height="60" opacity="0.6" />
        <line x1="400" y1="420" x2="400" y2="480" opacity="0.3" />

        {/* Internal structure */}
        <line x1="400" y1="200" x2="400" y2="480" opacity="0.2" />
        <line x1="300" y1="200" x2="300" y2="480" opacity="0.15" />
        <line x1="500" y1="200" x2="500" y2="480" opacity="0.15" />
      </g>

      {/* Measurement annotations — appear with progress */}
      <g
        style={{
          opacity: progress > 0.4 ? (progress - 0.4) * 2.5 : 0,
          transition: "opacity 0.3s",
        }}
      >
        {/* Horizontal measurement */}
        <line x1="180" y1="520" x2="620" y2="520" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.5" />
        <line x1="180" y1="515" x2="180" y2="525" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.5" />
        <line x1="620" y1="515" x2="620" y2="525" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.5" />
        <text x="400" y="540" textAnchor="middle" fill="#D8C5A3" fontSize="10" opacity="0.6"
          fontFamily="monospace">
          24.00 m
        </text>

        {/* Vertical measurement */}
        <line x1="680" y1="200" x2="680" y2="480" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.5" />
        <line x1="675" y1="200" x2="685" y2="200" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.5" />
        <line x1="675" y1="480" x2="685" y2="480" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.5" />
        <text x="700" y="345" textAnchor="middle" fill="#D8C5A3" fontSize="10" opacity="0.6"
          fontFamily="monospace" transform="rotate(90, 700, 345)">
          12.50 m
        </text>

        {/* Height to peak */}
        <line x1="120" y1="100" x2="120" y2="480" stroke="#D8C5A3" strokeWidth="0.3" opacity="0.3"
          strokeDasharray="4,4" />
        <text x="110" y="290" textAnchor="middle" fill="#D8C5A3" fontSize="9" opacity="0.4"
          fontFamily="monospace" transform="rotate(-90, 110, 290)">
          16.20 m (peak)
        </text>
      </g>

      {/* Holographic UI elements */}
      <g
        style={{
          opacity: progress > 0.6 ? (progress - 0.6) * 2.5 : 0,
          transition: "opacity 0.3s",
        }}
      >
        {/* Corner brackets */}
        <path d="M165 185 L150 185 L150 200" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.4" />
        <path d="M635 185 L650 185 L650 200" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.4" />
        <path d="M165 495 L150 495 L150 480" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.4" />
        <path d="M635 495 L650 495 L650 480" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.4" />

        {/* Data labels */}
        <text x="220" y="280" fill="#D8C5A3" fontSize="8" opacity="0.4" fontFamily="monospace">
          ZONE A
        </text>
        <text x="420" y="360" fill="#D8C5A3" fontSize="8" opacity="0.4" fontFamily="monospace">
          ZONE B
        </text>

        {/* Cross-hair on peak */}
        <circle cx="400" cy="100" r="8" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.3" />
        <line x1="392" y1="100" x2="408" y2="100" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.3" />
        <line x1="400" y1="92" x2="400" y2="108" stroke="#D8C5A3" strokeWidth="0.5" opacity="0.3" />
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

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });
    }, section);

    return () => ctx.revert();
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

      <div className="relative z-10 h-screen flex flex-col items-center justify-start pt-28 pb-8 px-6 gap-4 md:gap-6">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs tracking-[0.4em] uppercase text-accent/60 block mb-3">
            Technical Blueprint
          </span>
          <AnimatedText
            text="Precision Engineered"
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light"
            scrollTrigger
          />
          <p
            className="text-text-secondary text-sm md:text-base mt-3 max-w-lg mx-auto font-light"
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
        <div className="w-full max-w-3xl mx-auto h-[42vh] max-h-[400px] min-h-[250px] flex items-center justify-center">
          <BlueprintSVG progress={progress} />
        </div>

        {/* Technical stats bar */}
        <div
          className="flex gap-8 md:gap-16 mt-8"
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
              <div className="text-accent text-sm font-mono">{stat.value}</div>
              <div className="text-text-secondary/50 text-[10px] tracking-[0.2em] uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
