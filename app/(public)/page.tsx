// app/page.tsx
import React from "react";
import HeroSection from "@/components/pages/heroSection";
import AboutSection from "@/components/pages/AboutSection";
import ServicesSection from "@/components/pages/ServicesSection";
import WorksSection from "@/components/pages/WorksSetion";
import BlogSection from "@/components/pages/BlogSetion";

export default function HomePage() {
  return (
    <div id="content" className="no-bottom no-top">
      <div id="top" />

      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WorksSection />
      <BlogSection />
    </div>
  );
}
