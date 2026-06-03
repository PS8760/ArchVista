"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    src: "/images/villa-exterior.png",
    alt: "Luxury villa exterior at golden hour with infinity pool",
    category: "Exterior",
    title: "Villa Solara",
    year: "2024",
  },
  {
    src: "/images/villa-interior.png",
    alt: "Minimalist luxury interior with ambient lighting",
    category: "Interior",
    title: "The Living Room",
    year: "2024",
  },
  {
    src: "/images/gallery-landscape.png",
    alt: "Architecture integrated with Mediterranean landscape",
    category: "Landscape",
    title: "Coastal Retreat",
    year: "2023",
  },
  {
    src: "/images/gallery-private.png",
    alt: "Private master suite with panoramic city views",
    category: "Private Spaces",
    title: "The Master Suite",
    year: "2023",
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Header line-by-line reveal
      const label = headerRef.current?.querySelector(".gallery-label");
      const title = headerRef.current?.querySelector(".gallery-title");
      const desc = headerRef.current?.querySelector(".gallery-desc");
      const hint = headerRef.current?.querySelector(".gallery-hint");

      if (label) {
        gsap.fromTo(
          label,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (title) {
        const words = (title as HTMLElement).querySelectorAll(".gallery-title-word");
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
            delay: 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const descAndHint = [desc, hint].filter(Boolean);
      if (descAndHint.length) {
        gsap.fromTo(
          descAndHint,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.3,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Horizontal scroll
      const totalWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth;

      const horizontalTween = gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      // Progress bar
      if (progressRef.current) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Smooth cursor follow
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let cx = 0, cy = 0;
    let tx = 0, ty = 0;
    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      cx = lerp(cx, tx, 0.1);
      cy = lerp(cy, ty, 0.1);
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const section = sectionRef.current;
    const onEnter = () => setCursorVisible(true);
    const onLeave = () => setCursorVisible(false);

    section?.addEventListener("mouseenter", onEnter);
    section?.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      section?.removeEventListener("mouseenter", onEnter);
      section?.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
        style={{
          opacity: cursorVisible ? 1 : 0,
          transition: "opacity 0.3s",
          willChange: "transform",
        }}
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: "72px",
            height: "72px",
            border: "1px solid rgba(216,197,163,0.6)",
            background: "rgba(216,197,163,0.08)",
          }}
        >
          <span className="text-[9px] tracking-[0.25em] uppercase text-accent/80">
            Drag
          </span>
        </div>
      </div>

      {/* Header */}
      <div ref={headerRef} className="pt-24 pb-12 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <span className="gallery-label text-xs tracking-[0.4em] uppercase text-accent block mb-5" style={{ opacity: 0 }}>
              Immersive Gallery
            </span>
            <h2
              className="gallery-title text-3xl md:text-4xl lg:text-5xl font-light text-white"
              style={{ perspective: "600px" }}
            >
              {["A", "Visual", "Journey"].map((word, i) => (
                <span
                  key={i}
                  className="gallery-title-word"
                  style={{
                    display: "inline-block",
                    marginRight: "0.3em",
                    opacity: 0,
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="gallery-desc text-text-secondary text-sm font-light max-w-sm" style={{ opacity: 0 }}>
              Explore our portfolio of architectural masterpieces through an
              immersive cinematic experience.
            </p>
            <span className="gallery-hint text-[10px] tracking-[0.3em] uppercase text-accent/40" style={{ opacity: 0 }}>
              Scroll to explore →
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-[1600px] mx-auto mt-6">
          <div className="w-full h-px bg-border overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-accent/60"
              style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal Track */}
      <div ref={trackRef} className="gallery-track pl-6 md:pl-10 pr-[20vw] pb-24">
        {galleryItems.map((item, i) => (
          <div
            key={i}
            className="gallery-item flex-shrink-0 relative group cursor-none"
            style={{ width: "75vw", maxWidth: "1200px" }}
          >
            <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
              {/* Clip-path reveal animation driven by scroll via CSS */}
              <div className="gallery-image w-full h-full relative overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="75vw"
                  quality={90}
                />

                {/* Multi-layer gradient overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.85) 100%)",
                    opacity: 0,
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.opacity = "1")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.opacity = "0")
                  }
                />

                {/* Side vignette */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.85) 100%)",
                  }}
                />

                {/* Corner accent (top left) */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-6 h-px bg-accent/60" />
                  <div className="w-px h-6 bg-accent/60" />
                </div>

                {/* Corner accent (bottom right) */}
                <div className="absolute bottom-16 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                  <div className="w-6 h-px bg-accent/60 ml-auto" />
                  <div className="w-px h-6 bg-accent/60 ml-auto" />
                </div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] tracking-[0.4em] uppercase text-accent">
                      {item.category}
                    </span>
                    <h3 className="text-xl md:text-2xl text-white font-light mt-2" style={{ fontFamily: "var(--font-heading)" }}>
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[10px] tracking-[0.2em] text-accent/50 font-mono mb-1">
                    {item.year}
                  </span>
                </div>
              </div>
            </div>

            {/* Index + thin line below */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-accent/25 text-sm font-mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 h-px bg-border group-hover:bg-accent/20 transition-colors duration-500" />
              <span className="text-text-secondary/30 text-[10px] tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
