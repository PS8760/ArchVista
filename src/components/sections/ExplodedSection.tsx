"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "@/hooks/useInView";
import dynamic from "next/dynamic";

const ExplodedCanvas = dynamic(() => import("./ExplodedCanvas"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Living Spaces",
    description: "Open-plan environments designed for modern living with intelligent climate control and adaptive lighting.",
    icon: "◇",
  },
  {
    title: "Structural Engineering",
    description: "Precision-engineered frameworks using advanced materials for maximum resilience and minimal footprint.",
    icon: "△",
  },
  {
    title: "Smart Automation",
    description: "Integrated AI systems that learn your preferences and optimize comfort, energy, and security in real-time.",
    icon: "○",
  },
  {
    title: "Luxury Materials",
    description: "Hand-selected natural stone, custom millwork, and artisan finishes that define true craftsmanship.",
    icon: "□",
  },
];

export default function ExplodedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [cardsRef, cardsInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => setProgress(self.progress),
      });

      return () => trigger.kill();
    });

    mm.add("(max-width: 1023px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        end: "bottom 20%",
        scrub: 1,
        onUpdate: (self) => setProgress(self.progress),
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="exploded"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-50" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-start gap-7 px-5 pb-12 pt-24 sm:px-6 md:px-10 lg:h-screen lg:flex-row lg:justify-center lg:gap-14 lg:py-20">
        {/* Left — Building Visualization */}
        <div className="flex h-[34vh] min-h-[260px] w-full flex-1 items-center justify-center sm:h-[40vh] lg:h-[600px] lg:w-auto">
          <ExplodedCanvas progress={progress} />
        </div>

        {/* Right — Feature Cards */}
        <div ref={cardsRef} className="flex-1 max-w-xl w-full">
          <div className="mb-5">
            <span className="text-[9px] tracking-[0.45em] uppercase text-accent block mb-3">
              Exploded View
            </span>
            <h2 className="text-xl sm:text-2xl md:text-[1.75rem] lg:text-[2rem] font-light text-white leading-[1.15]">
              Every Layer,{" "}
              <span className="text-gradient">Perfected</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-5 border border-border hover:border-border-hover transition-all duration-500"
                style={{
                  opacity: cardsInView ? 1 : 0,
                  transform: cardsInView ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s, border-color 0.4s`,
                  background: "rgba(13,13,13,0.6)",
                }}
              >
                <span className="text-base text-accent/55 group-hover:text-accent/80 transition-colors duration-400 block">
                  {feature.icon}
                </span>
                <h3 className="text-white text-[11px] tracking-[0.08em] mt-2 mb-1 font-medium leading-tight">
                  {feature.title}
                </h3>
                <p className="text-text-secondary/55 text-[11px] leading-[1.6]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-px bg-border">
        <div
          className="h-full bg-accent transition-none"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </section>
  );
}
