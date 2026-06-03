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

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=150%",
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
      id="exploded"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-50" />

      {/* Content */}
      <div className="relative z-10 h-screen flex flex-col lg:flex-row items-center justify-start lg:justify-center pt-28 pb-8 px-6 md:px-10 gap-6 lg:gap-16">
        {/* Left — Building Visualization */}
        <div className="flex-1 flex items-center justify-center w-full lg:w-auto h-[32vh] sm:h-[38vh] lg:h-[600px] min-h-[220px]">
          <ExplodedCanvas progress={progress} />
        </div>

        {/* Right — Feature Cards */}
        <div ref={cardsRef} className="flex-1 max-w-xl w-full">
          <div className="mb-6 lg:mb-8">
            <span className="text-xs tracking-[0.4em] uppercase text-accent block mb-2 sm:mb-4">
              Exploded View
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white">
              Every Layer,{" "}
              <span className="text-gradient">Perfected</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-4 sm:p-6 border border-border hover:border-border-hover transition-all duration-500 hover-lift"
                style={{
                  opacity: cardsInView ? 1 : 0,
                  transform: cardsInView ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s, border-color 0.5s, box-shadow 0.5s`,
                  background: "rgba(13,13,13,0.5)",
                }}
              >
                <span className="text-xl sm:text-2xl text-accent/60 group-hover:text-accent transition-colors duration-500">
                  {feature.icon}
                </span>
                <h3 className="text-white text-xs sm:text-sm tracking-[0.1em] mt-2 sm:mt-3 mb-1 sm:mb-2 font-medium">
                  {feature.title}
                </h3>
                <p className="text-text-secondary/70 text-[10px] sm:text-xs leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-px bg-border">
        <div
          className="h-full bg-accent transition-none"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </section>
  );
}
