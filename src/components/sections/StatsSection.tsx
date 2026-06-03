"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "@/hooks/useInView";

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  { value: 50, suffix: "+", label: "Architectural Awards", description: "International recognition" },
  { value: 200, suffix: "+", label: "Luxury Residences", description: "Across six continents" },
  { value: 15, suffix: "+", label: "Countries", description: "Global presence" },
  { value: 98, suffix: "%", label: "Client Satisfaction", description: "Return client rate" },
];

function AnimatedCounter({
  target,
  suffix,
  isActive,
}: {
  target: number;
  suffix: string;
  isActive: boolean;
}) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) return;

    let start = 0;
    const duration = 2200;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, target]);

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      const headingWords = headingRef.current?.querySelectorAll(".stat-word");
      if (headingWords?.length) {
        gsap.fromTo(
          headingWords,
          { y: 50, opacity: 0, rotateX: -30 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Animate progress bars when in view
  useEffect(() => {
    if (!isInView) return;
    progressRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: stats[i].value / 100,
          duration: 1.8,
          ease: "power3.out",
          delay: i * 0.15 + 0.3,
        }
      );
    });
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(216,197,163,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal marquee line */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden h-px">
        <div
          className="h-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(216,197,163,0.2) 50%, transparent)",
          }}
        />
      </div>

      <div ref={ref} className="max-w-[1600px] mx-auto">
        {/* Section Label + Heading */}
        <div ref={headingRef} className="text-center mb-20 md:mb-28" style={{ perspective: "800px" }}>
          <span
            className="stat-word text-xs tracking-[0.4em] uppercase text-accent block mb-6"
            style={{ opacity: 0 }}
          >
            By The Numbers
          </span>
          {["Our", "Impact"].map((word, i) => (
            <span
              key={i}
              className="stat-word"
              style={{
                display: "inline-block",
                marginRight: i === 0 ? "0.3em" : 0,
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 300,
                color: "white",
                opacity: 0,
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center relative px-4 lg:px-8 group"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.9s ${i * 0.15}s cubic-bezier(0.16,1,0.3,1), transform 0.9s ${i * 0.15}s cubic-bezier(0.16,1,0.3,1)`,
              }}
            >
              {/* Divider line */}
              {i > 0 && (
                <div
                  className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-20 bg-border"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transition: `opacity 0.6s ${i * 0.15 + 0.3}s`,
                  }}
                />
              )}

              {/* Large number */}
              <div
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-accent mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isActive={isInView}
                />
              </div>

              {/* Animated progress bar */}
              <div className="w-16 h-px bg-border mx-auto mb-4 overflow-hidden">
                <div
                  ref={(el) => { progressRefs.current[i] = el; }}
                  className="h-full bg-accent"
                  style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
                />
              </div>

              <div className="text-text-secondary text-xs md:text-sm tracking-[0.15em] uppercase mb-1">
                {stat.label}
              </div>
              <div
                className="text-text-secondary/40 text-[10px] tracking-[0.1em]"
                style={{
                  opacity: isInView ? 1 : 0,
                  transition: `opacity 0.6s ${i * 0.15 + 0.6}s`,
                }}
              >
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
