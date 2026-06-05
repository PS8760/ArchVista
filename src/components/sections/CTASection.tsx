"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const projectTypes = ["Private Villa", "Penthouse", "Landscape", "Commercial"];
const timelines = ["Discovery", "3-6 Months", "6-12 Months"];

function pseudoRandom(seed: number) {
  const v = Math.sin(seed * 997.13) * 10000;
  return v - Math.floor(v);
}

// ── Deterministic particles (no Math.random → no hydration mismatch) ──────────
function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left:     `${pseudoRandom(i + 1)   * 100}%`,
        delay:    `${pseudoRandom(i + 29)  * 12}s`,
        duration: `${10 + pseudoRandom(i + 57) * 16}s`,
        size:     `${0.8 + pseudoRandom(i + 85) * 1.6}px`,
        opacity:   0.12 + pseudoRandom(i + 113) * 0.22,
      })),
    []
  );

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
            animationDelay: p.duration,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

// ── Form — extracted as its own component so it fully re-mounts on reset ──────
interface FormBodyProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    projectType: string;
    timeline: string;
    message: string;
    company: string;
  };
  submitting: boolean;
  errorMessage: string;
  onUpdate: (field: string, value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

function FormBody({ formData, submitting, errorMessage, onUpdate, onSubmit }: FormBodyProps) {
  // Fade in on every mount (initial load AND after reset)
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="space-y-6 text-left"
      style={{ opacity: 0 }}
    >
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={formData.company}
        onChange={(e) => onUpdate("company", e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="field-shell block">
          <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/42">
            Name
          </span>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => onUpdate("name", e.target.value)}
            className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-text-secondary/35"
            placeholder="Your name"
          />
        </label>

        <label className="field-shell block">
          <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/42">
            Email
          </span>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => onUpdate("email", e.target.value)}
            className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-text-secondary/35"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="field-shell block">
        <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/42">
          Phone
        </span>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => onUpdate("phone", e.target.value)}
          className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-text-secondary/35"
          placeholder="Optional"
        />
      </label>

      {/* Project type chips */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/42">
          Project Type
        </span>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type) => {
            const sel = formData.projectType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => onUpdate("projectType", type)}
                className="border px-3 py-2 text-[10px] uppercase tracking-[0.1em] transition-all duration-300"
                style={{
                  borderRadius: "3px",
                  borderColor:  sel ? "rgba(215,194,154,0.8)"  : "rgba(215,194,154,0.14)",
                  background:   sel ? "rgba(215,194,154,0.12)" : "transparent",
                  color:        sel ? "var(--color-accent)"    : "rgba(168,171,167,0.72)",
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline chips */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/42">
          Timeline
        </span>
        <div className="flex flex-wrap gap-2">
          {timelines.map((tl) => {
            const sel = formData.timeline === tl;
            return (
              <button
                key={tl}
                type="button"
                onClick={() => onUpdate("timeline", tl)}
                className="border px-3 py-2 text-[10px] uppercase tracking-[0.1em] transition-all duration-300"
                style={{
                  borderRadius: "3px",
                  borderColor:  sel ? "rgba(143,183,161,0.85)" : "rgba(215,194,154,0.14)",
                  background:   sel ? "rgba(143,183,161,0.12)" : "transparent",
                  color:        sel ? "#bfe5d0"                : "rgba(168,171,167,0.72)",
                }}
              >
                {tl}
              </button>
            );
          })}
        </div>
      </div>

      <label className="field-shell block">
        <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/42">
          Vision
        </span>
        <textarea
          rows={4}
          required
          value={formData.message}
          onChange={(e) => onUpdate("message", e.target.value)}
          className="w-full max-h-[200px] resize-none overflow-auto bg-transparent py-3 text-sm text-white outline-none placeholder:text-text-secondary/35"
          placeholder="Site, city, scale, mood, constraints, or the rooms that matter most."
        />
      </label>

      <div aria-live="polite" className="min-h-5">
        {errorMessage && (
          <p className="text-xs leading-relaxed text-[#f0a891]">{errorMessage}</p>
        )}
      </div>

      <div className="pt-1">
        <MagneticButton
          variant="primary"
          type="submit"
          disabled={submitting}
          className="w-full px-8 sm:w-auto"
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-full border border-bg/50 border-t-bg"
                style={{ animation: "spin 0.8s linear infinite" }}
              />
              Sending
            </span>
          ) : (
            "Submit Inquiry"
          )}
        </MagneticButton>
      </div>
    </form>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function CTASection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const labelRef     = useRef<HTMLSpanElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);

  const defaultForm = {
    name: "", email: "", phone: "",
    projectType: projectTypes[0],
    timeline: timelines[0],
    message: "", company: "",
  };

  const [formData,     setFormData]     = useState(defaultForm);
  const [submitting,   setSubmitting]   = useState(false);
  const [submitted,    setSubmitted]    = useState(false);
  const [inquiryId,    setInquiryId]    = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // Key increments on reset → forces full unmount/remount of FormBody
  const [formKey, setFormKey] = useState(0);

  // ── Entrance animations (run once when section scrolls into view) ──────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, clipPath: "inset(12% 3% 12% 3%)" },
        {
          opacity: 1, y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2, ease: "power4.out",
          scrollTrigger: {
            trigger: section, start: "top 68%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        labelRef.current,
        { opacity: 0, letterSpacing: "0.14em" },
        {
          opacity: 1, letterSpacing: "0.38em",
          duration: 0.85, ease: "power2.out", delay: 0.35,
          scrollTrigger: {
            trigger: section, start: "top 68%",
            toggleActions: "play none none none",
          },
        }
      );

      const words = headlineRef.current?.querySelectorAll(".cta-word");
      if (words?.length) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 34, rotateX: -18 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.75, ease: "power3.out", stagger: 0.07, delay: 0.45,
            scrollTrigger: {
              trigger: section, start: "top 68%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const leftItems = leftPanelRef.current?.querySelectorAll(".cta-item");
      if (leftItems?.length) {
        gsap.fromTo(
          leftItems,
          { opacity: 0, y: 22 },
          {
            opacity: 1, y: 0,
            duration: 0.72, ease: "power3.out", stagger: 0.08, delay: 0.58,
            scrollTrigger: {
              trigger: section, start: "top 68%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const updateField = (field: string, value: string) => {
    setFormData((cur) => ({ ...cur, [field]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const resetForm = () => {
    setFormData(defaultForm);
    setSubmitted(false);
    setInquiryId("");
    setErrorMessage("");
    setFormKey((k) => k + 1); // remount FormBody → triggers its fade-in
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitting(true);
    setErrorMessage("");

    try {
      const res     = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(payload?.message || "We could not receive the inquiry.");
      }

      setInquiryId(payload?.inquiryId || "");
      setSubmitted(true);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-24"
      style={{ background: "var(--color-bg)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg,rgba(143,183,161,0.035),transparent 34%),linear-gradient(225deg,rgba(185,198,207,0.03),transparent 35%)",
        }}
      />
      <Particles />
      <div className="absolute inset-0 grid-overlay opacity-[0.035]" />

      {/* Card */}
      <div
        ref={cardRef}
        className="glass luxury-shadow relative z-10 mx-auto w-full max-w-5xl opacity-0"
        style={{ borderRadius: "6px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">

          {/* ── Left panel ── */}
          <div
            ref={leftPanelRef}
            className="border-b border-border/70 p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-12"
          >
            <span
              ref={labelRef}
              className="text-[10px] uppercase text-accent/70 opacity-0"
              style={{ letterSpacing: "0.38em" }}
            >
              Private Consultation
            </span>

            <h2
              ref={headlineRef}
              className="mt-5 text-3xl font-light leading-[1.12] text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-heading)", perspective: "600px" }}
            >
              {["Tell","us","what","home","should","feel","like."].map((word, i) => (
                <span
                  key={i}
                  className="cta-word"
                  style={{ display: "inline-block", marginRight: "0.28em", opacity: 0 }}
                >
                  {word}
                </span>
              ))}
            </h2>

            <p className="cta-item mt-5 max-w-md text-sm font-light leading-[1.8] text-text-secondary/72 opacity-0">
              Share a few details and the studio will shape the next step:
              feasibility, concept runway, or a private design session.
            </p>

            <div className="cta-item mt-10 grid grid-cols-3 gap-4 opacity-0">
              {[["01","Review"],["02","Scope"],["03","Session"]].map(([n, l]) => (
                <div key={l} className="border border-border/80 p-3">
                  <div className="font-mono text-[10px] text-accent/60">{n}</div>
                  <div className="mt-3 text-[9px] uppercase tracking-[0.18em] text-text-secondary/48">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right panel ── */}
          <div className="p-7 sm:p-9 lg:p-12">
            {submitted ? (
              // ── Success state ──
              <div className="flex min-h-[470px] flex-col items-start justify-center">
                <div
                  className="flex h-14 w-14 items-center justify-center border border-accent text-xl text-accent"
                  style={{ animation: "pulse-ring 3s ease-in-out infinite" }}
                >
                  ✓
                </div>
                <h3
                  className="mt-7 text-3xl font-light text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Inquiry received.
                </h3>
                <p className="mt-4 max-w-md text-sm font-light leading-[1.8] text-text-secondary/75">
                  Thank you for contacting ArchVista. Our design consulting group
                  will review your project brief and connect within 24 hours to
                  schedule the right next step.
                </p>
                {inquiryId && (
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent/55">
                    Reference {inquiryId}
                  </p>
                )}
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-8 cursor-pointer border-b border-accent/25 pb-1 text-xs uppercase tracking-[0.18em] text-accent transition-colors duration-300 hover:border-accent"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              // ── Form — key prop forces full remount on reset ──
              <FormBody
                key={formKey}
                formData={formData}
                submitting={submitting}
                errorMessage={errorMessage}
                onUpdate={updateField}
                onSubmit={handleSubmit}
              />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
