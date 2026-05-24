"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const PHOTOS = [
  { src: "/images/702064008_830981863419597_1155654940877813141_n.jpg",   label: "Look 01", tall: false },
  { src: "/images/698639568_1305574924337957_7351959678660499013_n.jpg",   label: "Look 02", tall: true  },
  { src: "/images/701612665_18588883660033212_4680677445315284883_n.jpg",  label: "Look 03", tall: false },
  { src: "/images/695098929_18587811499033212_1390188276583443312_n.jpg",  label: "Look 04", tall: true  },
  { src: "/images/696706540_18587760511033212_2380630625827816040_n.jpg",  label: "Look 05", tall: false },
  { src: "/images/687668578_1396381345869557_3855729272072998756_n.jpg",   label: "Look 06", tall: true  },
];

const NAV_HEIGHT = 80;

export default function LookbookSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-8%" });

  useEffect(() => {
    // Desktop only — mobile uses native scroll
    if (window.innerWidth < 768) return;

    let cleanup: (() => void) | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!trackRef.current || !sectionRef.current) return;

      const track = trackRef.current;
      const tw    = window.innerWidth;
      const dist  = track.scrollWidth - tw + tw * 0.10;

      const tween = gsap.to(track, {
        x: -dist,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          // offset by nav height so the section content isn't hidden behind it
          start: `top ${NAV_HEIGHT}px`,
          end: `+=${dist * 1.1}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 0,
        },
      });
      cleanup = () => tween.scrollTrigger?.kill();
    })();
    return () => cleanup?.();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lookbook"
      style={{
        background: "var(--bg)",
        overflow: "hidden",
        // So anchor-scroll lands below the fixed nav
        scrollMarginTop: `${NAV_HEIGHT}px`,
      }}
    >
      {/* Header */}
      <div
        style={{
          paddingTop: "5rem",
          paddingBottom: "3rem",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          <motion.span
            className="font-body"
            style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Lookbook
          </motion.span>
          <motion.h2
            className="font-headline font-light"
            style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.8rem)", color: "var(--text-primary)", letterSpacing: "0.03em", lineHeight: 1.05 }}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.08 }}
          >
            The Editorial
          </motion.h2>
        </div>
        <motion.span
          className="hidden md:block font-body"
          style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-secondary)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          ← Scroll to explore →
        </motion.span>
      </div>

      {/* ── DESKTOP: GSAP horizontal pin track ── */}
      <div
        ref={trackRef}
        className="hidden md:flex"
        style={{
          alignItems: "flex-end",
          gap: "1.2rem",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          paddingBottom: "5rem",
          width: "max-content",
        }}
      >
        {PHOTOS.map((photo, i) => (
          <motion.div
            key={photo.label}
            className="group relative flex-shrink-0 overflow-hidden cursor-pointer"
            style={{
              width: photo.tall ? "26vw" : "20vw",
              height: photo.tall ? "68vh" : "55vh",
              background: "var(--bg-card)",
              minWidth: photo.tall ? "220px" : "180px",
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 + i * 0.07 }}
          >
            <Image src={photo.src} alt={photo.label} fill quality={100}
              className="object-cover object-center transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
              sizes="28vw"
            />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(18,20,20,0.65) 0%, transparent 55%)" }}
            />
            <div style={{ position: "absolute", bottom: "1.4rem", left: "1.4rem", display: "flex", flexDirection: "column", gap: "0.28rem" }}>
              <span className="font-body" style={{ fontSize: "0.5rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--accent)" }}>AW 25</span>
              <span className="font-headline font-light" style={{ fontSize: "0.95rem", color: "var(--text-primary)", letterSpacing: "0.05em" }}>{photo.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── MOBILE: native horizontal scroll ── */}
      <div
        className="flex md:hidden"
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch" as never,
          scrollSnapType: "x mandatory",
          gap: "0.75rem",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          paddingBottom: "2.5rem",
          scrollbarWidth: "none",
        }}
      >
        {PHOTOS.map((photo, i) => (
          <div
            key={photo.label}
            className="relative flex-shrink-0 overflow-hidden"
            style={{
              width: "72vw",
              height: "58vh",
              background: "var(--bg-card)",
              scrollSnapAlign: "start",
            }}
          >
            <Image src={photo.src} alt={photo.label} fill quality={90}
              className="object-cover object-center"
              sizes="72vw"
            />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(18,20,20,0.65) 0%, transparent 55%)" }}
            />
            <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem", display: "flex", flexDirection: "column", gap: "0.28rem" }}>
              <span className="font-body" style={{ fontSize: "0.5rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--accent)" }}>AW 25</span>
              <span className="font-headline font-light" style={{ fontSize: "0.9rem", color: "var(--text-primary)", letterSpacing: "0.05em" }}>{photo.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
