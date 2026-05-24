import FooterSection from "@/components/sections/FooterSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — La Moda",
  description: "Get in touch with La Moda.",
};

export default function ContactPage() {
  return (
    <main style={{ background: "var(--bg)", paddingBottom: "62px" }}>
      <FooterSection />
    </main>
  );
}
