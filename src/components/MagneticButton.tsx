"use client";

import { useRef } from "react";
import type { MouseEvent, ReactNode, Ref } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "glass";
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  variant = "primary",
  onClick,
  href,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0, 0)";
  };

  const baseClasses =
    "relative inline-flex items-center justify-center px-8 py-4 text-sm tracking-[0.2em] uppercase font-light transition-all duration-500 cursor-pointer disabled:pointer-events-none disabled:opacity-55";

  const variantClasses = {
    primary:
      "bg-accent text-bg hover:bg-accent-dark",
    outline:
      "border border-accent/30 text-accent hover:border-accent hover:bg-accent/5",
    glass:
      "glass text-white hover:bg-white/10",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const motionStyle = {
    transition:
      "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.5s, border-color 0.5s",
  };

  if (href) {
    return (
      <a
        ref={buttonRef as Ref<HTMLAnchorElement>}
        href={href}
        className={combinedClasses}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={motionStyle}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as Ref<HTMLButtonElement>}
      className={combinedClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={motionStyle}
    >
      {children}
    </button>
  );
}
