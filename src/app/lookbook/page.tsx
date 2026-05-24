import LookbookSection from "@/components/sections/LookbookSection";
import FooterSection from "@/components/sections/FooterSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lookbook — La Moda",
  description: "Browse the La Moda lookbook collection.",
};

export default function LookbookPage() {
  return (
    <main style={{ background: "var(--bg)", paddingBottom: "62px" }}>
      <LookbookSection />
      <FooterSection />
    </main>
  );
}
