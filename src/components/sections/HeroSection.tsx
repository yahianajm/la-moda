"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHONE_VIDEOS = ["/images/phone1.webm", "/images/phone2.webm", "/images/phone3.webm"];

export default function HeroSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const [phoneIdx, setPhoneIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onEnded = () => setPhoneIdx((i) => (i + 1) % PHONE_VIDEOS.length);
    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, [phoneIdx]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!imgRef.current) return;
      const tween = gsap.to(imgRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });
      cleanup = () => tween.scrollTrigger?.kill();
    })();
    return () => cleanup?.();
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#121414]">
      {/* Full-bleed background — video on desktop, image on mobile */}
      <div ref={imgRef} className="absolute inset-0 scale-[1.08] will-change-transform">
        {/* Desktop video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          style={{ zIndex: 0 }}
        >
          <source src="/images/hero.webm" type="video/webm" />
        </video>
        {/* Mobile cycling videos */}
        <div className="absolute inset-0 md:hidden" style={{ zIndex: 0 }}>
          <AnimatePresence mode="sync">
            <motion.video
              key={phoneIdx}
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <source src={PHONE_VIDEOS[phoneIdx]} type="video/webm" />
            </motion.video>
          </AnimatePresence>
        </div>
        {/* Very subtle gradient — only bottom darkening */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background:
              "linear-gradient(to bottom, rgba(18,20,20,0.18) 0%, rgba(18,20,20,0.08) 35%, rgba(18,20,20,0.55) 75%, rgba(18,20,20,0.96) 100%)",
          }}
        />
        {/* Left-side scrim for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background:
              "linear-gradient(to right, rgba(18,20,20,0.55) 0%, rgba(18,20,20,0.1) 55%, transparent 100%)",
          }}
        />
      </div>

      {/* ── NAV ── */}
      <motion.nav
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between"
        style={{ padding: "2rem 5vw" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Wordmark */}
        <span
          className="font-headline tracking-[0.28em] uppercase select-none"
          style={{ fontSize: "1.05rem", fontWeight: 300, color: "#E3E2E2", letterSpacing: "0.28em" }}
        >
          La Moda
        </span>

        {/* Links */}
        <div className="hidden md:flex items-center gap-9">
          {["Collections", "Lookbook", "Story", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-body transition-opacity duration-300 hover:opacity-40"
              style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#E3E2E2" }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#collections"
          className="hidden md:inline-flex font-body transition-all duration-400"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C9A96E",
            borderBottom: "1px solid #C9A96E",
            paddingBottom: "2px",
          }}
        >
          Shop Now
        </a>
      </motion.nav>

      {/* ── HEADLINE ── */}
      <div
        className="absolute z-20 flex flex-col"
        style={{ bottom: "11vh", left: "5vw", maxWidth: "640px" }}
      >
        {/* Eyebrow */}
        <motion.p
          className="font-body"
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#C9A96E",
            marginBottom: "1.4rem",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.55 }}
        >
          Autumn / Winter 2025
        </motion.p>

        {/* Big headline — word stagger */}
        <h1
          className="font-headline overflow-hidden"
          style={{ fontWeight: 300, lineHeight: 1.02, letterSpacing: "0.04em" }}
        >
          {[["Crafted"], ["for the"], ["Exceptional."]].map((line, li) => (
            <div key={li} className="overflow-hidden">
              <motion.span
                className="block"
                style={{
                  fontSize: "clamp(3.4rem, 7.5vw, 7.2rem)",
                  color: "#E3E2E2",
                }}
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.05,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.7 + li * 0.13,
                }}
              >
                {line[0]}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Sub-copy */}
        <motion.p
          className="font-body"
          style={{
            fontSize: "0.78rem",
            lineHeight: 1.95,
            letterSpacing: "0.04em",
            color: "#9E9B97",
            marginTop: "1.6rem",
            maxWidth: "360px",
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.15 }}
        >
          Where minimalism meets precision.
          <br />
          Each piece a statement in restraint.
        </motion.p>

        {/* Actions */}
        <motion.div
          className="flex items-center gap-5"
          style={{ marginTop: "2.4rem" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.3 }}
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
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#C9A96E";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#C9A96E";
              e.currentTarget.style.color = "#121414";
            }}
          >
            Explore Collection
          </button>
          <button
            className="font-body transition-all duration-400"
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#E3E2E2",
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderBottomColor: "rgba(227,226,226,0.4)",
              paddingBottom: "2px",
              background: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#E3E2E2")}
          >
            View Lookbook →
          </button>
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        className="hidden md:flex absolute z-20 flex-col items-center gap-2"
        style={{ bottom: "3rem", right: "5vw" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <div
          className="relative overflow-hidden"
          style={{ width: "1px", height: "56px", background: "rgba(227,226,226,0.18)" }}
        >
          <motion.div
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "50%", background: "#C9A96E" }}
            animate={{ y: ["0%", "210%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span
          className="font-body"
          style={{ fontSize: "0.52rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#9E9B97" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
