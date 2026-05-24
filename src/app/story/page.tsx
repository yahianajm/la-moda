import BrandStorySection from "@/components/sections/BrandStorySection";
import FooterSection from "@/components/sections/FooterSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story — La Moda",
  description: "The story behind La Moda.",
};

export default function StoryPage() {
  return (
    <main style={{ background: "var(--bg)", paddingBottom: "62px" }}>
      <BrandStorySection />
      <FooterSection />
    </main>
  );
}
