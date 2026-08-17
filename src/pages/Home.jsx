import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedPlants from "../components/FeaturedPlants";
import AboutSection from "../components/AboutSection";
import WhyChooseUs from "../components/WhyChooseUs";
import PlantCare from "../components/PlantCare";
import Gallery from "../components/Gallery";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQ from "../components/FAQ";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      <Hero />
      <CategorySection />
      <FeaturedPlants />
      <AboutSection />
      <WhyChooseUs />
      <PlantCare />
      <Gallery />
      <FAQ />
      <TestimonialsSection />
    </div>
  );
}
