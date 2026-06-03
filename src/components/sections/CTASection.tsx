"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../MagneticButton";

gsap.registerPlugin(ScrollTrigger);

function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 12}s`,
      duration: `${8 + Math.random() * 14}s`,
      size: `${0.8 + Math.random() * 2}px`,
      opacity: 0.15 + Math.random() * 0.35,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

// Animated orb background element
function AmbientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          top: "10%",
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(216,197,163,0.025) 0%, transparent 70%)",
          animation: "float 12s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          bottom: "5%",
          right: "-5%",
          background:
            "radial-gradient(circle, rgba(216,197,163,0.02) 0%, transparent 70%)",
          animation: "float 15s ease-in-out infinite",
          animationDelay: "-5s",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Residential",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Card entrance with clip-path
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 80, clipPath: "inset(20% 5% 20% 5%)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );

      // Label letter-spacing expand
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, letterSpacing: "0.1em" },
        {
          opacity: 1,
          letterSpacing: "0.4em",
          duration: 1,
          ease: "power2.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );

      // Headline word stagger
      const words = headlineRef.current?.querySelectorAll(".cta-word");
      if (words?.length) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 40, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.6,
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Content stagger
      const elements = contentRef.current?.querySelectorAll(".cta-item");
      if (elements?.length) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.7,
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
        );
      }
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(216,197,163,0.05) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(216,197,163,0.025) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(216,197,163,0.025) 0%, transparent 40%)",
        }}
      />

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(216,197,163,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <AmbientOrbs />
      <Particles />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-20" />

      {/* CTA Card */}
      <div
        ref={cardRef}
        className="relative z-10 glass luxury-shadow max-w-3xl w-full mx-6 p-8 md:p-14 lg:p-16 text-center opacity-0"
        style={{ borderRadius: "2px" }}
      >
        {/* Card inner glow on hover */}
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none rounded-[2px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(216,197,163,0.04), transparent 60%)",
          }}
        />

        <div ref={contentRef}>
          {submitted ? (
            /* Success State */
            <div className="py-8 flex flex-col items-center justify-center space-y-6">
              <div
                className="w-16 h-16 border border-accent flex items-center justify-center text-accent text-2xl font-light"
                style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
              >
                ✓
              </div>
              <h3
                className="text-2xl md:text-3xl text-white font-light"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Inquiry Received
              </h3>
              <p className="text-text-secondary text-sm font-light max-w-md mx-auto leading-relaxed">
                Thank you for contacting ArchVista. Our design consulting group
                will review your project brief and connect with you within 24
                hours to schedule your private design session.
              </p>
              <button
                onClick={() => {
                  setFormData({
                    name: "",
                    email: "",
                    projectType: "Residential",
                    message: "",
                  });
                  setSubmitted(false);
                }}
                className="text-xs tracking-[0.2em] uppercase text-accent hover:text-accent-dark border-b border-accent/20 hover:border-accent pb-1 transition-all duration-300 cursor-pointer"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <>
              {/* Label */}
              <span
                ref={labelRef}
                className="cta-item text-[10px] tracking-[0.4em] uppercase text-accent/60 block mb-4"
                style={{ opacity: 0 }}
              >
                Begin Your Journey
              </span>

              {/* Headline with word stagger */}
              <h2
                ref={headlineRef}
                className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-3 leading-[1.15]"
                style={{ fontFamily: "var(--font-heading)", perspective: "600px" }}
              >
                {["The", "Future", "Is", "Built", "Today."].map((word, i) => (
                  <span
                    key={i}
                    className="cta-word"
                    style={{
                      display: "inline-block",
                      marginRight: "0.28em",
                      opacity: 0,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h2>

              {/* Subheadline */}
              <p className="cta-item text-text-secondary text-xs sm:text-sm font-light max-w-lg mx-auto leading-relaxed" style={{ opacity: 0 }}>
                Experience architecture without limits. Let us craft a space
                that transcends imagination and defines your legacy.
              </p>

              {/* Thin separator */}
              <div className="cta-item flex items-center justify-center gap-4 my-6" style={{ opacity: 0 }}>
                <div className="flex-1 max-w-[80px] h-px bg-accent/10" />
                <div className="w-1 h-1 bg-accent/30 rounded-full" />
                <div className="flex-1 max-w-[80px] h-px bg-accent/10" />
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="cta-item mt-2 space-y-5 text-left max-w-xl mx-auto"
                style={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="relative group/input border-b border-accent/15 focus-within:border-accent/50 transition-colors duration-400">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-transparent py-3 text-white text-xs sm:text-sm focus:outline-none placeholder-text-secondary/40 font-light"
                      placeholder="Your Name"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-accent group-focus-within/input:w-full transition-all duration-500" />
                  </div>

                  {/* Email Input */}
                  <div className="relative group/input border-b border-accent/15 focus-within:border-accent/50 transition-colors duration-400">
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-transparent py-3 text-white text-xs sm:text-sm focus:outline-none placeholder-text-secondary/40 font-light"
                      placeholder="Your Email"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-accent group-focus-within/input:w-full transition-all duration-500" />
                  </div>
                </div>

                {/* Project Type Chips */}
                <div className="space-y-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-text-secondary/40 block font-light">
                    Project Type
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Residential", "Commercial", "Landscape", "Private Gallery"].map(
                      (type) => {
                        const isSelected = formData.projectType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, projectType: type })
                            }
                            className={`px-3 py-1.5 text-[10px] tracking-[0.1em] border transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? "bg-accent border-accent text-bg font-medium"
                                : "border-accent/12 text-text-secondary hover:border-accent/35 hover:text-white"
                            }`}
                            style={{ borderRadius: "1px" }}
                          >
                            {type}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Message Input */}
                <div className="relative group/input border-b border-accent/15 focus-within:border-accent/50 transition-colors duration-400">
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-transparent py-3 text-white text-xs sm:text-sm focus:outline-none placeholder-text-secondary/40 font-light resize-none"
                    placeholder="Tell us about your architectural vision..."
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-accent group-focus-within/input:w-full transition-all duration-500" />
                </div>

                {/* Submit Button */}
                <div className="pt-4 text-center">
                  <MagneticButton variant="primary" className="w-full sm:w-auto px-10">
                    {submitting ? (
                      <span className="flex items-center gap-2 justify-center">
                        <span
                          className="w-3 h-3 border border-bg/60 border-t-bg rounded-full inline-block"
                          style={{ animation: "spin 0.8s linear infinite" }}
                        />
                        Sending...
                      </span>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </MagneticButton>
                </div>
              </form>
            </>
          )}

          {/* Bottom accent */}
          <div className="cta-item mt-8 flex items-center justify-center gap-4" style={{ opacity: 0 }}>
            <div className="w-12 h-px bg-accent/15" />
            <span className="text-[9px] tracking-[0.3em] uppercase text-accent/35 font-mono">
              ArchVista
            </span>
            <div className="w-12 h-px bg-accent/15" />
          </div>
        </div>
      </div>
    </section>
  );
}
