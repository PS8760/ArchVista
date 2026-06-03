"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import AnimatedText from "../AnimatedText";

gsap.registerPlugin(ScrollTrigger);

export default function MasterpieceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Label tracking-letter expand
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, letterSpacing: "0.1em" },
        {
          opacity: 1,
          letterSpacing: "0.4em",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Left content fade up
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Description
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Accent line width expand
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          delay: 0.5,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Image 1 clip-path reveal
      gsap.fromTo(
        img1Ref.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        }
      );

      // Image 2 clip-path reveal (delayed)
      gsap.fromTo(
        img2Ref.current,
        { clipPath: "inset(100% 0 0 0)", opacity: 1 },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.4,
          delay: 0.2,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        }
      );

      // Image 1 parallax scroll
      gsap.to(img1Ref.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Image 2 parallax scroll
      gsap.to(img2Ref.current, {
        y: -90,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      // Tag slide in
      gsap.fromTo(
        tagRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="masterpiece"
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Subtle gradient accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.025] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 70% 30%, #D8C5A3, transparent 70%)",
        }}
      />

      {/* Fine grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-[0.015] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left — Typography */}
        <div ref={leftRef} className="space-y-8" style={{ opacity: 0 }}>
          <span
            ref={labelRef}
            className="text-xs tracking-[0.4em] uppercase text-accent"
            style={{ opacity: 0 }}
          >
            The Masterpiece
          </span>

          <AnimatedText
            text="The Future of Living"
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light"
            scrollTrigger
          />

          <div ref={descRef} className="space-y-6" style={{ opacity: 0 }}>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light max-w-lg">
              Where intelligent architecture meets modern luxury. Every space is
              crafted to respond to your lifestyle — a seamless fusion of
              technology, sustainability, and timeless design.
            </p>
            <p className="text-text-secondary/60 text-sm leading-relaxed max-w-lg">
              Our residences are more than structures. They are living
              ecosystems that adapt, evolve, and inspire. From climate-responsive
              facades to AI-driven interiors, we engineer environments that
              elevate the human experience.
            </p>

            {/* Expandable gold accent line */}
            <div
              ref={lineRef}
              className="w-16 h-px bg-accent/40"
              style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
            />

            {/* Feature tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["Smart Home", "AI Interior", "Passive Energy", "Artisan Finish"].map(
                (tag, i) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[0.15em] uppercase text-accent/50 border border-accent/10 px-3 py-1.5"
                    style={{
                      borderRadius: "1px",
                      animationDelay: `${i * 0.1 + 0.8}s`,
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right — Floating Images */}
        <div className="relative h-[500px] md:h-[650px] lg:h-[700px]">
          {/* Primary Image */}
          <div
            ref={img1Ref}
            className="absolute top-0 right-0 w-[75%] h-[65%] hover-lift group"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/images/villa-exterior.png"
                alt="Luxury villa exterior with infinity pool at golden hour"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(216,197,163,0.05) 0%, transparent 60%)",
                }}
              />
              <div className="absolute inset-0 border border-accent/8 group-hover:border-accent/20 transition-colors duration-700" />
            </div>
            {/* Image label */}
            <div className="absolute -top-5 right-0 text-[9px] tracking-[0.3em] uppercase text-accent/40">
              Exterior Design
            </div>
          </div>

          {/* Secondary Image */}
          <div
            ref={img2Ref}
            className="absolute bottom-0 left-0 w-[60%] h-[50%] hover-lift z-10 group"
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/images/villa-interior.png"
                alt="Luxury interior with ambient lighting and designer furniture"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={90}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(216,197,163,0.05) 0%, transparent 60%)",
                }}
              />
              <div className="absolute inset-0 border border-accent/8 group-hover:border-accent/20 transition-colors duration-700" />
            </div>

            {/* Caption tag */}
            <div
              ref={tagRef}
              className="absolute -bottom-7 left-0 flex items-center gap-2"
              style={{ opacity: 0 }}
            >
              <div className="w-4 h-px bg-accent/40" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-accent/50">
                Interior Details
              </span>
            </div>
          </div>

          {/* Floating accent square */}
          <div
            className="absolute top-[30%] left-[15%] w-16 h-16 border border-accent/8 pointer-events-none"
            style={{
              animation: "float 6s ease-in-out infinite",
              animationDelay: "1s",
            }}
          />
        </div>
      </div>
    </section>
  );
}
