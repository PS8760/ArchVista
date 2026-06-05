"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Site Listening",
    summary:
      "We map light, wind, views, access, rituals, privacy needs, and the parts of daily life that should feel effortless.",
    deliverable: "Spatial brief + climate notes",
    timing: "Week 1",
    accent: "#8fb7a1",
  },
  {
    number: "02",
    title: "Concept Dossier",
    summary:
      "A compact design book aligns massing, material mood, core rooms, budget ranges, and the first cinematic walkthrough.",
    deliverable: "Concept deck + 3D narrative",
    timing: "Weeks 2-4",
    accent: "#d7c29a",
  },
  {
    number: "03",
    title: "Material Room",
    summary:
      "Stone, timber, lighting temperature, metal patina, acoustic fabric, and landscape texture are curated together.",
    deliverable: "Finish palette + sample matrix",
    timing: "Weeks 5-8",
    accent: "#b98268",
  },
  {
    number: "04",
    title: "Handover System",
    summary:
      "Every residence receives a maintenance map, smart-home scenes, vendor contacts, and a post-occupancy tuning plan.",
    deliverable: "Living manual + tuning schedule",
    timing: "Final phase",
    accent: "#b9c6cf",
  },
];

export default function StudioProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headerItems = headerRef.current?.querySelectorAll(".process-reveal");
      if (headerItems?.length) {
        gsap.fromTo(
          headerItems,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const cards = stepsRef.current?.querySelectorAll(".process-step");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: 28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const activeStep = steps[active];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="absolute inset-x-0 top-0 architectural-rule opacity-80" />
      <div className="absolute inset-0 grid-overlay opacity-[0.02]" />

      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-24">
        <div ref={headerRef} className="flex flex-col justify-between gap-10">
          <div>
            <span className="process-reveal eyebrow block opacity-0">
              Client Journey
            </span>
            <h2 className="process-reveal mt-5 max-w-xl text-3xl font-light leading-[1.12] text-white opacity-0 sm:text-4xl lg:text-5xl">
              A precise path from first conversation to lived-in calm.
            </h2>
            <p className="process-reveal mt-5 max-w-md text-sm font-light leading-[1.8] text-text-secondary/75 opacity-0">
              The work feels cinematic on screen, but the client experience is
              intentionally quiet: fewer surprises, sharper decisions, better
              rooms.
            </p>
          </div>

          <div className="process-reveal grid grid-cols-3 gap-3 opacity-0 sm:max-w-md">
            {[
              ["12 wk", "concept runway"],
              ["1:1", "principal review"],
              ["24 hr", "brief response"],
            ].map(([value, label]) => (
              <div key={label} className="border border-border/80 p-4 text-center sm:text-left">
                <div className="text-lg font-light text-accent">{value}</div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-text-secondary/45">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_0.78fr]">
          <div ref={stepsRef} className="grid gap-3">
            {steps.map((step, index) => {
              const selected = active === index;

              return (
                <button
                  key={step.number}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className="process-step group relative overflow-hidden border p-5 text-left opacity-0 transition-all duration-500"
                  style={{
                    borderRadius: "4px",
                    borderColor: selected
                      ? "rgba(215,194,154,0.34)"
                      : "rgba(215,194,154,0.12)",
                    background: selected
                      ? "rgba(255,255,255,0.045)"
                      : "rgba(255,255,255,0.018)",
                  }}
                >
                  <div
                    className="absolute bottom-0 left-0 top-0 w-px transition-opacity duration-500"
                    style={{
                      background: step.accent,
                      opacity: selected ? 1 : 0.22,
                    }}
                  />
                  <div className="relative z-10 flex items-start gap-4">
                    <span className="font-mono text-[10px] text-accent/55">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-base font-light text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-xs leading-[1.7] text-text-secondary/62">
                        {step.summary}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <aside
            ref={panelRef}
            className="border border-border p-6 lg:p-8 opacity-0 xl:sticky xl:top-28 xl:self-start"
            style={{ borderRadius: "4px", background: "rgba(11,12,12,0.78)" }}
          >
            <div className="flex items-center justify-between gap-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-text-secondary/45">
                Active Phase
              </span>
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: activeStep.accent }}
              />
            </div>

            <div className="my-5 h-px bg-border/70" />

            <p className="text-[10px] uppercase tracking-[0.3em] text-accent/70">
              {activeStep.timing}
            </p>
            <h3 className="mt-3 text-2xl font-light text-white">
              {activeStep.title}
            </h3>
            <p className="mt-4 text-sm leading-[1.75] text-text-secondary/70">
              {activeStep.summary}
            </p>

            <div className="mt-8 border-t border-border/70 pt-5">
              <span className="text-[9px] uppercase tracking-[0.26em] text-text-secondary/40">
                Client Receives
              </span>
              <p className="mt-2 text-sm text-accent/85">
                {activeStep.deliverable}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
