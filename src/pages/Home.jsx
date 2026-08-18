import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedPlants from "../components/FeaturedPlants";
import AboutSection from "../components/AboutSection";
import WhyChooseUs from "../components/WhyChooseUs";
import PlantCare from "../components/PlantCare";
import Gallery from "../components/Gallery";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQ from "../components/FAQ";
import SEOHead from "../components/SEOHead";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      <SEOHead
        title="GreenLeaf Farms | Buy Plants Online in Sembanarkoil, Mayiladuthurai, Tamil Nadu"
        description="GreenLeaf Farms — Best plant nursery in Sembanarkoil, Mayiladuthurai, Tamil Nadu 609309. Buy fresh indoor, outdoor, herbal, ornamental & fruit plants online. Farm-fresh plants delivered to your doorstep."
        canonicalPath="/"
      />
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
