import HeroSection from "@/components/sections/HeroSection";
import BrandStorySection from "@/components/sections/BrandStorySection";
import CollectionsSection from "@/components/sections/CollectionsSection";
import GallerySection from "@/components/sections/GallerySection";
import FeaturedProductSection from "@/components/sections/FeaturedProductSection";
import LookbookSection from "@/components/sections/LookbookSection";
import MaterialsSection from "@/components/sections/MaterialsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main style={{ background: "#121414", paddingBottom: "62px" }}>
      <HeroSection />
      <BrandStorySection />
      <CollectionsSection />
      <GallerySection />
      <FeaturedProductSection />
      <LookbookSection />
      <MaterialsSection />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
