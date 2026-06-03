"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const navLinks = [
  { label: "About", href: "#masterpiece" },
  { label: "Projects", href: "#exploded" },
  { label: "Gallery", href: "#gallery" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Contact", href: "#cta" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 border-b ${
        scrolled
          ? "bg-surface/90 backdrop-blur-xl border-accent/15 py-4 shadow-lg"
          : "bg-bg/40 backdrop-blur-md border-accent/5 py-5"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Logo size={36} />

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs tracking-[0.25em] uppercase text-text-secondary hover:text-accent transition-colors duration-500 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#cta"
          onClick={(e) => handleNavClick(e, "#cta")}
          className="hidden lg:inline-flex items-center px-6 py-3 text-xs tracking-[0.2em] uppercase border border-accent/30 text-accent hover:border-accent hover:bg-accent/5 transition-all duration-500"
        >
          Get in Touch
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-px bg-accent transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[4px]" : ""
            }`}
          />
          <span
            className={`w-6 h-px bg-accent transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-px bg-accent transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 glass-strong overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-96 py-6" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 px-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm tracking-[0.25em] uppercase text-text-secondary hover:text-accent transition-colors duration-500"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
