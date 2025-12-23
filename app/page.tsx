import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WorksSection from "@/components/WorksSection";
import MarqueeSection from "@/components/MarqueeSection";
import BlogSection from "@/components/BlogSection";

export default function Home() {
  return (
    <main id="content">
      {/* Hero / Top Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Works Section */}
      <WorksSection />

      {/* Marquee / Skills Section */}
      <MarqueeSection />

      {/* Blog Section */}
      <BlogSection />
    </main>
  );
}
