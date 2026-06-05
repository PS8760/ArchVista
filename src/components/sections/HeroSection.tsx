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
      className="relative w-full min-h-[100svh] overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
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
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pb-24 sm:pb-28 pt-24 text-center"
      >
        {/* Animated Logo */}
        <div ref={logoRef} className="mb-8 opacity-0">
          <Logo size={52} showWordmark={false} />
        </div>

        {/* Main Headline */}
        <div className="mb-5">
          <AnimatedText
            text="ArchVista"
            as="h1"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-light leading-[1.02]"
            delay={0.6}
          />
        </div>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="text-text-secondary text-sm sm:text-base max-w-xl leading-relaxed tracking-wide font-light opacity-0 mb-10"
        >
          Private residential architecture shaped through cinematic design,
          intelligent systems, and quietly exacting craft.
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
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 opacity-0 sm:flex"
        aria-label="Scroll down to explore"
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
