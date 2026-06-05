"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: "Sustainability",
    description:
      "Every project is designed with environmental consciousness at its core — from passive cooling to renewable materials.",
    number: "01",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="15" stroke="#D8C5A3" strokeWidth="0.6" strokeDasharray="4 2" />
        <path
          d="M20 10C20 10 15 18 15 23C15 25.8 17.2 28 20 28C22.8 28 25 25.8 25 23C25 18 20 10 20 10Z"
          stroke="#D8C5A3"
          strokeWidth="0.8"
          fill="none"
        />
        <path d="M20 20 L20 28" stroke="#D8C5A3" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description:
      "Pushing the boundaries of what architecture can be — integrating AI, IoT, and parametric design into every build.",
    number: "02",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="10" y="10" width="20" height="20" stroke="#D8C5A3" strokeWidth="0.6" transform="rotate(45 20 20)" />
        <circle cx="20" cy="20" r="5" stroke="#D8C5A3" strokeWidth="0.6" />
        <line x1="20" y1="6" x2="20" y2="12" stroke="#D8C5A3" strokeWidth="0.5" />
        <line x1="20" y1="28" x2="20" y2="34" stroke="#D8C5A3" strokeWidth="0.5" />
        <line x1="6" y1="20" x2="12" y2="20" stroke="#D8C5A3" strokeWidth="0.5" />
        <line x1="28" y1="20" x2="34" y2="20" stroke="#D8C5A3" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    title: "Craftsmanship",
    description:
      "Hand-curated materials and artisan finishes. Every joint, every surface, every detail — meticulously perfected.",
    number: "03",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M10 30L20 10L30 30H10Z" stroke="#D8C5A3" strokeWidth="0.6" fill="none" />
        <line x1="20" y1="20" x2="20" y2="30" stroke="#D8C5A3" strokeWidth="0.5" />
        <line x1="15" y1="25" x2="25" y2="25" stroke="#D8C5A3" strokeWidth="0.4" />
      </svg>
    ),
  },
  {
    title: "Technology",
    description:
      "Smart homes that learn, adapt, and respond. Architecture that isn't just built — it's programmed for life.",
    number: "04",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="7" y="12" width="26" height="16" rx="1" stroke="#D8C5A3" strokeWidth="0.6" />
        <circle cx="20" cy="20" r="4" stroke="#D8C5A3" strokeWidth="0.5" />
        <line x1="20" y1="28" x2="20" y2="33" stroke="#D8C5A3" strokeWidth="0.7" />
        <line x1="14" y1="33" x2="26" y2="33" stroke="#D8C5A3" strokeWidth="0.7" />
        <circle cx="12" cy="16" r="1" fill="#D8C5A3" opacity="0.4" />
      </svg>
    ),
  },
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteLineLeftRef = useRef<HTMLDivElement>(null);
  const quoteLineRightRef = useRef<HTMLDivElement>(null);
  const pillarsContainerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const verticalLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Vertical accent line draws down
      gsap.fromTo(
        verticalLineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.8,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Label fade in
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, letterSpacing: "0.2em" },
        {
          opacity: 1,
          letterSpacing: "0.4em",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: labelRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Quote clip-path reveal
      const quoteWords = quoteRef.current?.querySelectorAll(".quote-word");
      if (quoteWords?.length) {
        gsap.fromTo(
          quoteWords,
          { clipPath: "inset(0 100% 0 0)", opacity: 1 },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Quote attribution lines expand
      gsap.fromTo(
        [quoteLineLeftRef.current, quoteLineRightRef.current],
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.inOut",
          stagger: 0.15,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Pillar cards stagger in with clip-path
      const cards = pillarsContainerRef.current?.querySelectorAll(".pillar-card");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 60,
            clipPath: "inset(0 0 100% 0)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: pillarsContainerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Icon subtle pulse on scroll
      const icons = pillarsContainerRef.current?.querySelectorAll(".pillar-icon");
      if (icons?.length) {
        icons.forEach((icon, i) => {
          gsap.fromTo(
            icon,
            { opacity: 0, scale: 0.6, rotation: -10 },
            {
              opacity: 0.7,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: "back.out(1.4)",
              delay: i * 0.12 + 0.4,
              scrollTrigger: {
                trigger: pillarsContainerRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      // Number labels slide up
      const numbers = pillarsContainerRef.current?.querySelectorAll(".pillar-number");
      if (numbers?.length) {
        gsap.fromTo(
          numbers,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.5,
            scrollTrigger: {
              trigger: pillarsContainerRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Vertical accent line */}
      <div
        ref={verticalLineRef}
        className="absolute left-1/2 top-0 w-px h-full pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(216,197,163,0.06) 30%, rgba(216,197,163,0.06) 70%, transparent)",
          transform: "scaleY(0)",
        }}
      />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(216,197,163,0.03), transparent 70%)",
        }}
      />

      <div className="max-w-[1600px] mx-auto">
        {/* Section Label */}
        <h2
          ref={labelRef}
          className="text-center mb-5 block text-[10px] tracking-[0.4em] uppercase text-accent font-light"
          style={{ opacity: 0 }}
        >
          Design Philosophy
        </h2>

        {/* Large Quote */}
        <div ref={quoteRef} className="text-center mb-12 md:mb-16 lg:mb-20">
          <blockquote className="max-w-3xl mx-auto">
            <p
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-white leading-[1.35]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {`"Architecture is the thoughtful making of space."`.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="quote-word"
                  style={{
                    display: "inline-block",
                    marginRight: "0.28em",
                    clipPath: "inset(0 100% 0 0)",
                  }}
                >
                  {word}
                </span>
              ))}
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <div
                ref={quoteLineLeftRef}
                className="w-10 h-px bg-accent/40"
                style={{ transformOrigin: "right center", transform: "scaleX(0)" }}
              />
              <span className="text-[10px] tracking-[0.3em] uppercase text-accent/60">
                Louis Kahn
              </span>
              <div
                ref={quoteLineRightRef}
                className="w-10 h-px bg-accent/40"
                style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
              />
            </div>
          </blockquote>
        </div>

        {/* Philosophy Pillars */}
        <div
          ref={pillarsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="pillar-card group p-6 border border-border hover:border-border-hover transition-all duration-700 relative overflow-hidden"
              style={{
                opacity: 0,
                background: "rgba(5,5,5,0.5)",
                clipPath: "inset(0 0 100% 0)",
              }}
            >
              {/* Hover corner accent */}
              <div
                className="absolute top-0 right-0 w-0 h-0 border-t border-r border-accent/0 group-hover:border-accent/30 transition-all duration-700"
                style={{ borderWidth: "0 20px 20px 0", borderColor: "transparent" }}
              />
              {/* Top-right corner lines */}
              <div className="absolute top-0 right-0 w-6 h-px bg-accent/0 group-hover:bg-accent/40 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-px h-6 bg-accent/0 group-hover:bg-accent/40 transition-all duration-500" />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(216,197,163,0.05), transparent 70%)",
                }}
              />

              <div className="relative z-10">
                {/* Number */}
                <div className="pillar-number text-[9px] tracking-[0.4em] text-accent/25 font-mono mb-3" style={{ opacity: 0 }}>
                  {pillar.number}
                </div>

                {/* Icon */}
                <div
                  className="pillar-icon mb-4 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ opacity: 0 }}
                >
                  {pillar.icon}
                </div>

                {/* Separator line */}
                <div className="w-8 h-px bg-accent/20 mb-4 group-hover:w-12 group-hover:bg-accent/40 transition-all duration-500" />

                <h3
                  className="text-white text-base font-light mb-2.5 tracking-wide"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-text-secondary/65 text-xs leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
