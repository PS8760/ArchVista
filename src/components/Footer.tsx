"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "./Logo";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "About", href: "#masterpiece" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#exploded" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#cta" },
];
const socials: Array<{ label: string; href: string }> = [];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Track scroll progress for the back-to-top ring
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const progress =
        el.scrollTop / (el.scrollHeight - el.clientHeight);
      setScrollProgress(Math.min(progress, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Top accent line expands from center
      gsap.fromTo(
        topLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Columns stagger in
      const validCols = colRefs.current.filter(Boolean);
      gsap.fromTo(
        validCols,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: footer,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Bottom bar slide up
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  // Circumference of the progress ring circle
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - scrollProgress);

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-border overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Top gold accent line — expands from center */}
      <div
        ref={topLineRef}
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(216,197,163,0.35) 30%, rgba(216,197,163,0.6) 50%, rgba(216,197,163,0.35) 70%, transparent)",
          transformOrigin: "center",
          transform: "scaleX(0)",
        }}
      />

      {/* Subtle radial glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(216,197,163,0.025) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-12">
          {/* Logo & Description — col 1-4 */}
          <div
            ref={(el) => { colRefs.current[0] = el; }}
            className="md:col-span-4 space-y-6"
            style={{ opacity: 0 }}
          >
            <Logo size={32} />
            <p className="text-text-secondary text-xs leading-relaxed max-w-[220px]">
              Redefining architectural excellence with intelligent design,
              modern luxury, and a commitment to craftsmanship.
            </p>

            {/* Small award badges */}
            <div className="flex gap-2 pt-1">
              {["AIA Design Honor", "Dezeen Studio Index"].map((badge) => (
                <span
                  key={badge}
                  className="text-[8px] tracking-[0.1em] uppercase text-accent/35 border border-accent/10 px-2 py-1"
                  style={{ borderRadius: "1px" }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Quick Links — col 6-8 */}
          <div
            ref={(el) => { colRefs.current[1] = el; }}
            className="md:col-span-3 space-y-6"
            style={{ opacity: 0 }}
          >
            <h4 className="text-[10px] tracking-[0.35em] uppercase text-accent/70">
              Explore
            </h4>
            <div className="flex flex-col gap-2.5">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group relative text-xs text-text-secondary hover:text-accent transition-colors duration-300 w-fit"
                >
                  {link.label}
                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-accent/50 group-hover:w-full transition-all duration-400 ease-out" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact — col 9-12 */}
          <div
            ref={(el) => { colRefs.current[2] = el; }}
            className="md:col-span-4 space-y-6"
            style={{ opacity: 0 }}
          >
            <h4 className="text-[10px] tracking-[0.35em] uppercase text-accent/70">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Email", value: "spranav0812@gmail.com" },
                { label: "Phone", value: "+91 9004677177" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="text-[9px] tracking-[0.15em] uppercase text-accent/30">
                    {item.label}
                  </span>
                  <span className="text-xs text-text-secondary/75 hover:text-accent transition-colors duration-300 cursor-default">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-4 pt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="group relative text-[11px] tracking-[0.15em] text-text-secondary/50 hover:text-accent transition-colors duration-300"
                >
                  {s.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-accent/40 group-hover:w-full transition-all duration-400 ease-out" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          ref={bottomRef}
          className="pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-6">
            <p className="text-xs text-text-secondary/40">
              © {new Date().getFullYear()} ArchVista. All rights reserved.
            </p>
          </div>

          {/* Back to top with scroll progress ring */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group relative flex items-center gap-3 cursor-pointer"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-accent/50 group-hover:text-accent transition-colors duration-300">
              Back to Top
            </span>

            {/* SVG progress ring */}
            <div className="relative w-10 h-10 flex-shrink-0">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                className="rotate-[-90deg]"
              >
                {/* Track circle */}
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  fill="none"
                  stroke="rgba(216,197,163,0.12)"
                  strokeWidth="1"
                />
                {/* Progress circle */}
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  fill="none"
                  stroke="rgba(216,197,163,0.6)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: "stroke-dashoffset 0.1s linear" }}
                />
              </svg>
              {/* Arrow icon */}
              <div className="absolute inset-0 flex items-center justify-center text-accent/50 group-hover:text-accent group-hover:-translate-y-0.5 transition-all duration-300">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M5 8V2M2 5L5 2L8 5"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
