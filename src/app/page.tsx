"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

// Dynamic imports for sections to enable code-splitting and avoid SSR issues with GSAP
const HeroSection = dynamic(
  () => import("@/components/sections/HeroSection"),
  { ssr: false }
);
const MasterpieceSection = dynamic(
  () => import("@/components/sections/MasterpieceSection"),
  { ssr: false }
);
const StudioProcessSection = dynamic(
  () => import("@/components/sections/StudioProcessSection"),
  { ssr: false }
);
const ExplodedSection = dynamic(
  () => import("@/components/sections/ExplodedSection"),
  { ssr: false }
);
const BlueprintSection = dynamic(
  () => import("@/components/sections/BlueprintSection"),
  { ssr: false }
);
const GallerySection = dynamic(
  () => import("@/components/sections/GallerySection"),
  { ssr: false }
);
const PhilosophySection = dynamic(
  () => import("@/components/sections/PhilosophySection"),
  { ssr: false }
);
const StatsSection = dynamic(
  () => import("@/components/sections/StatsSection"),
  { ssr: false }
);
const CTASection = dynamic(
  () => import("@/components/sections/CTASection"),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <LoadingScreen />
      <Navbar />
      <HeroSection />
      <MasterpieceSection />
      <StudioProcessSection />
      <ExplodedSection />
      <BlueprintSection />
      <GallerySection />
      <PhilosophySection />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
