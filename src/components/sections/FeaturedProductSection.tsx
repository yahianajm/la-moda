"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const SPECS = [
  { label: "Material", value: "Virgin Wool" },
  { label: "Origin",   value: "Fes, Morocco" },
  { label: "Season",   value: "AW 2025" },
  { label: "Price",    value: "4 800 MAD" },
];

export default function FeaturedProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef  = useRef<HTMLDivElement>(null);
  const isInView  = useInView(sectionRef, { once: true, margin: "-18%" });

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!imageRef.current || !sectionRef.current) return;
      const tween = gsap.to(imageRef.current, {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
      cleanup = () => tween.scrollTrigger?.kill();
    })();
    return () => cleanup?.();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: "var(--bg)", position: "relative", overflow: "hidden", minHeight: "90vh" }}
    >
      {/* Full-bleed background image with scrub zoom */}
      <div ref={imageRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
        <Image
          src="/images/671252230_1654612599091901_3047021429507142494_n.jpg"
          alt="The Obsidian Coat — fabric detail"
          fill
          quality={100}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Strong left vignette for text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(100deg, rgba(18,20,20,0.92) 0%, rgba(18,20,20,0.62) 38%, rgba(18,20,20,0.12) 72%, rgba(18,20,20,0.04) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          paddingTop: "7rem",
          paddingBottom: "7rem",
        }}
      >
        <div style={{ maxWidth: "480px", display: "flex", flexDirection: "column", gap: "2rem" }}>
          <motion.span
            className="font-body"
            style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Featured Piece
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              className="font-headline font-light"
              style={{
                fontSize: "clamp(3.5rem, 6vw, 6.5rem)",
                color: "var(--text-primary)",
                lineHeight: 1.0,
                letterSpacing: "0.03em",
              }}
              initial={{ y: "105%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            >
              The
              <br />
              Obsidian
              <br />
              <em>Coat</em>
            </motion.h2>
          </div>

          <motion.p
            className="font-body"
            style={{ fontSize: "0.82rem", lineHeight: 2, color: "var(--text-secondary)", maxWidth: "320px" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            Hand-cut from 100% Moroccan virgin wool.
            Single-seam construction.
            A coat that wears its silence.
          </motion.p>

          {/* Specs grid */}
          <motion.div
            className="grid grid-cols-2"
            style={{ gap: "1.2rem 2rem", marginTop: "0.4rem" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.42 }}
          >
            {SPECS.map((s) => (
              <div key={s.label} className="flex flex-col" style={{ gap: "0.3rem" }}>
                <span className="font-body" style={{ fontSize: "0.52rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
                  {s.label}
                </span>
                <span className="font-body" style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}>
                  {s.value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex items-center"
            style={{ gap: "1.6rem", marginTop: "0.6rem" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.54 }}
          >
            <button
              className="font-body transition-all duration-500"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                background: "#C9A96E",
                color: "#121414",
                padding: "0.85rem 2.2rem",
                border: "1px solid #C9A96E",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C9A96E"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#C9A96E"; e.currentTarget.style.color = "#121414"; }}
            >
              Add to Cart
            </button>
            <button
              className="font-body transition-colors duration-300"
              style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-secondary)", background: "none", border: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E3E2E2")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9E9B97")}
            >
              View Details →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
