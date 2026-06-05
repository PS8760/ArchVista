"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import Logo from "./Logo";

const navLinks = [
  { label: "About", href: "#masterpiece" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#exploded" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#cta" },
];

type NavState = "top" | "scrolled";

export default function Navbar() {
  const [state, setState] = useState<NavState>("top");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState(y > 40 ? "scrolled" : "top");
      setScrollProgress(max > 0 ? Math.min(y / max, 1) : 0);
      setIsCollapsed(y > window.innerHeight - 100);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", ...navLinks.map((link) => link.href.replace("#", ""))];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.12, 0.3, 0.55] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (overlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const id = href.replace("#", "");
    const pinnedIds = ["hero", "exploded", "blueprint", "gallery"];

    if (pinnedIds.includes(id)) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: "smooth" });
    }

    setMobileOpen(false);
    setOverlayOpen(false);
  };

  const isTop = state === "top";

  return (
    <>
      {/* Primary Desktop Horizontal Navbar */}
      <nav
        aria-label="Primary navigation"
        className="hidden lg:flex fixed left-1/2 z-[9997] -translate-x-1/2"
        style={{
          top: isCollapsed ? "-100px" : (isTop ? "18px" : "12px"),
          width: isTop
            ? "min(1120px, calc(100vw - 48px))"
            : "min(960px, calc(100vw - 48px))",
          opacity: isCollapsed ? 0 : 1,
          pointerEvents: isCollapsed ? "none" : "auto",
          transition:
            "top 500ms cubic-bezier(0.16,1,0.3,1), width 500ms cubic-bezier(0.16,1,0.3,1), opacity 500ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          className="relative w-full overflow-hidden border border-white/10"
          style={{
            height: isTop ? "64px" : "54px",
            borderRadius: isTop ? "16px" : "12px",
            background: isTop
              ? "rgba(7,7,7,0.58)"
              : "rgba(7,7,7,0.88)",
            backdropFilter: "blur(28px) saturate(150%)",
            WebkitBackdropFilter: "blur(28px) saturate(150%)",
            boxShadow: isTop
              ? "0 16px 50px rgba(0,0,0,0.28)"
              : "0 10px 38px rgba(0,0,0,0.48), 0 1px 0 rgba(255,255,255,0.06) inset",
            transition:
              "height 420ms cubic-bezier(0.16,1,0.3,1), border-radius 420ms ease, background 420ms ease, box-shadow 420ms ease",
          }}
        >
          <div className="relative z-10 flex h-full items-center justify-between px-4 xl:px-5">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="group flex items-center"
              aria-label="ArchVista home"
            >
              <Logo size={isTop ? 30 : 26} />
            </a>

            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const active = activeSection === id;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative rounded-md px-3.5 py-2 text-[10px] uppercase tracking-[0.14em] transition-colors duration-300 hover:bg-white/[0.045] hover:text-white"
                    style={{
                      color: active
                        ? "var(--color-accent)"
                        : "rgba(212,212,212,0.68)",
                    }}
                  >
                    {link.label}
                    <span
                      className="absolute bottom-1.5 left-1/2 h-px -translate-x-1/2 bg-accent transition-all duration-300"
                      style={{ width: active ? "18px" : "0px", opacity: active ? 0.75 : 0 }}
                    />
                  </a>
                );
              })}
            </div>

            <a
              href="#cta"
              onClick={(e) => handleNavClick(e, "#cta")}
              className="group hidden items-center gap-3 rounded-md border border-accent/25 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-accent transition-all duration-300 hover:border-accent/55 hover:bg-accent/10 xl:flex"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#8fb7a1] shadow-[0_0_14px_rgba(143,183,161,0.5)]" />
              Private Consultation
            </a>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-accent via-[#8fb7a1] to-[#b9c6cf]"
              style={{
                transform: `scaleX(${scrollProgress})`,
                transformOrigin: "left center",
              }}
            />
          </div>
        </div>
      </nav>

      {/* Floating circular icon (visible past hero section) */}
      <button
        onClick={() => setOverlayOpen((prev) => !prev)}
        className={`hidden lg:flex fixed right-8 top-8 z-[9999] h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#070707]/90 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/40 hover:scale-105 ${
          isCollapsed || overlayOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label={overlayOpen ? "Close menu" : "Open menu"}
        aria-expanded={overlayOpen}
      >
        {/* Scroll progress ring */}
        <svg className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="transparent"
            stroke="rgba(216, 197, 163, 0.1)"
            strokeWidth="1.5"
          />
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="transparent"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeDasharray={2 * Math.PI * 24}
            strokeDashoffset={(1 - scrollProgress) * (2 * Math.PI * 24)}
            className="transition-all duration-75"
          />
        </svg>

        {/* Dynamic Menu/Close Icon */}
        <span className="relative z-10 flex h-6 w-6 items-center justify-center">
          {overlayOpen ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-accent transition-transform duration-500 rotate-90"
            >
              <path
                d="M2 2L14 14M2 14L14 2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4L8 40M24 4L40 40M14 28H34"
                stroke="#D8C5A3"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="24" cy="4" r="3.5" fill="#D8C5A3" />
            </svg>
          )}
        </span>
      </button>

      {/* Desktop Fullscreen Overlay Menu */}
      <div className={`nav-overlay ${overlayOpen ? "open" : ""}`}>
        <div className="flex h-full flex-col justify-between px-8 py-16 md:px-16 md:py-24 lg:px-24">
          <div className="flex items-center justify-between">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="group flex items-center"
              aria-label="ArchVista home"
            >
              <Logo size={36} />
            </a>
          </div>

          <div className="flex flex-col items-start gap-6 md:gap-8 my-auto max-w-lg">
            <span className="eyebrow text-accent/50 mb-2">Navigation</span>
            {navLinks.map((link, idx) => {
              const id = link.href.replace("#", "");
              const active = activeSection === id;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="nav-overlay-link group relative block text-4xl md:text-5xl lg:text-6xl font-light tracking-wide transition-all duration-300"
                  style={{
                    color: active ? "var(--color-accent)" : "rgba(255,255,255,0.6)",
                    transitionDelay: overlayOpen ? `${idx * 60}ms` : "0ms",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  <span className="relative z-10 hover:text-white transition-colors duration-300">
                    {link.label}
                  </span>
                  <span className="absolute -left-6 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2" />
                </a>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-white/5 pt-8">
            <div className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.2em] text-text-secondary/60">
              <span>© {new Date().getFullYear()} ARCHVISTA</span>
              <span>Private Residential Architecture</span>
            </div>
            <a
              href="#cta"
              onClick={(e) => handleNavClick(e, "#cta")}
              className="group flex items-center gap-3 rounded-md border border-accent/25 px-5 py-3 text-[10px] uppercase tracking-[0.14em] text-accent transition-all duration-300 hover:border-accent/55 hover:bg-accent/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#8fb7a1] shadow-[0_0_14px_rgba(143,183,161,0.5)]" />
              Private Consultation
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav
        aria-label="Mobile navigation"
        className="fixed left-4 right-4 top-3 z-[9997] lg:hidden"
      >
        <div className="glass-strong flex h-[52px] items-center justify-between rounded-xl px-4">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            aria-label="ArchVista home"
          >
            <Logo size={24} />
          </a>

          <button
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/15 text-accent transition-colors duration-300 hover:bg-accent/10"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="relative h-4 w-5">
              <span
                className="absolute left-0 top-1 block h-px w-5 bg-current transition-transform duration-300"
                style={{
                  transform: mobileOpen
                    ? "translateY(5px) rotate(45deg)"
                    : "translateY(0) rotate(0)",
                }}
              />
              <span
                className="absolute left-0 top-1/2 block h-px w-5 bg-current transition-opacity duration-300"
                style={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <span
                className="absolute bottom-1 left-0 block h-px w-5 bg-current transition-transform duration-300"
                style={{
                  transform: mobileOpen
                    ? "translateY(-5px) rotate(-45deg)"
                    : "translateY(0) rotate(0)",
                }}
              />
            </span>
          </button>
        </div>

        <div
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: mobileOpen ? "420px" : "0px",
            marginTop: mobileOpen ? "8px" : "0px",
          }}
        >
          <div className="glass-strong rounded-xl p-2">
            {navLinks.map((link) => {
              const active = activeSection === link.href.replace("#", "");

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-[11px] uppercase tracking-[0.14em] transition-colors duration-300"
                  style={{
                    color: active
                      ? "var(--color-accent)"
                      : "rgba(212,212,212,0.68)",
                    background: active ? "rgba(216,197,163,0.07)" : "transparent",
                  }}
                >
                  <span>{link.label}</span>
                  <span className="h-px w-6 bg-current opacity-35" />
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
