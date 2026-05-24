import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import BottomNav from "@/components/BottomNav";
import StickyNav from "@/components/StickyNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MusicProvider } from "@/components/MusicProvider";
import FloatingControls from "@/components/FloatingControls";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Moda — Premium Clothing & Shoes",
  description: "Editorial fashion for the discerning. Premium clothing and shoes crafted with intention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full bg-bg text-text-primary antialiased">
        <ThemeProvider>
          <MusicProvider>
            <LenisProvider>
              <StickyNav />
              {children}
              <BottomNav />
              <FloatingControls />
            </LenisProvider>
          </MusicProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
