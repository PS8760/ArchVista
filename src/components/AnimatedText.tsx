"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  scrollTrigger?: boolean;
  stagger?: number;
}

export default function AnimatedText({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
  scrollTrigger = false,
  stagger = 0.03,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll(".char");

    const tl = gsap.timeline({
      delay,
      scrollTrigger: scrollTrigger
        ? {
            trigger: container,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          }
        : undefined,
    });

    tl.fromTo(
      chars,
      {
        y: 60,
        opacity: 0,
        rotateX: -40,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger,
      }
    );

    return () => {
      tl.kill();
    };
  }, [text, delay, scrollTrigger, stagger]);

  const words = text.split(" ");

  return (
    <div ref={containerRef} style={{ perspective: "1000px" }}>
      <Tag className={className}>
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className="char"
                style={{
                  display: "inline-block",
                  willChange: "transform, opacity",
                }}
              >
                {char}
              </span>
            ))}
            {wordIndex < words.length - 1 && (
              <span style={{ display: "inline-block" }}>&nbsp;</span>
            )}
          </span>
        ))}
      </Tag>
    </div>
  );
}
