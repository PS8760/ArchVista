"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AnimatedText from "../AnimatedText";
import MagneticButton from "../MagneticButton";
import Logo from "../Logo";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Fade in logo
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Subtitle
    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.3"
    );

    // CTA
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    // Scroll indicator
    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.5)" }}
      >
        <source src="/landing_page_video.mp4" type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.3) 40%, rgba(5,5,5,0.5) 70%, rgba(5,5,5,0.95) 100%)",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        {/* Animated Logo */}
        <div ref={logoRef} className="mb-12 opacity-0">
          <Logo size={56} showWordmark={false} />
        </div>

        {/* Main Headline */}
        <div className="mb-6">
          <AnimatedText
            text="Architecture Beyond Imagination"
            as="h1"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-light leading-[1.05] tracking-tight"
            delay={0.6}
          />
        </div>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="text-text-secondary text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed tracking-wide font-light opacity-0 mb-12"
        >
          A new era of luxury living crafted through technology, design, and
          vision.
        </p>

        {/* CTA Button */}
        <div ref={ctaRef} className="opacity-0">
          <MagneticButton
            variant="outline"
            onClick={() => {
              document.querySelector("#masterpiece")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore the Villa
          </MagneticButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-text-secondary/60">
          Scroll
        </span>
        <div className="w-px h-12 relative overflow-hidden">
          <div
            className="w-full h-full bg-accent/40"
            style={{ animation: "scroll-indicator 2s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
