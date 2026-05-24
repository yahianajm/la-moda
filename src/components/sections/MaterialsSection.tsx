"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MATERIALS = [
  { name: "Virgin Wool",     origin: "Fes, Morocco",       desc: "Hand-loomed on 19th-century frames" },
  { name: "Raw Linen",       origin: "Normandy, France",   desc: "Stonewashed for tactile weight" },
  { name: "Calfskin",        origin: "Córdoba, Spain",     desc: "Full-grain, vegetable tanned" },
  { name: "Silk Charmeuse",  origin: "Lyon, France",       desc: "22mm weight, luminous drape" },
];

export default function MaterialsSection() {
  const ref      = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-14%" });

  return (
    <section
      ref={ref}
      style={{
        background: "var(--bg-alt)",
        paddingTop: "9rem",
        paddingBottom: "9rem",
        paddingLeft: "5vw",
        paddingRight: "5vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle noise texture via CSS */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
          opacity: 0.45,
          pointerEvents: "none",
        }}
      />

      <div
        className="relative grid grid-cols-1 md:grid-cols-2 items-start"
        style={{ gap: "7vw" }}
      >
        {/* Sticky heading */}
        <div className="flex flex-col md:sticky md:top-32" style={{ gap: "1.8rem" }}>
          <motion.span
            className="font-body"
            style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Philosophy
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              className="font-headline font-light"
              style={{
                fontSize: "clamp(2.6rem, 4.2vw, 4.6rem)",
                color: "var(--text-primary)",
                lineHeight: 1.04,
                letterSpacing: "0.03em",
              }}
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Material
              <br />
              <em>Honesty</em>
            </motion.h2>
          </div>

          <motion.p
            className="font-body"
            style={{ fontSize: "0.82rem", lineHeight: 2, color: "var(--text-secondary)", maxWidth: "320px" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.28 }}
          >
            We source before we sketch. Each material dictates the silhouette,
            not the other way around.
            The fabric leads; we follow.
          </motion.p>

          <motion.div
            style={{ height: "1px", width: "40px", background: "#C9A96E", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.44 }}
          />
        </div>

        {/* Material rows */}
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {MATERIALS.map((m, i) => (
            <motion.div
              key={m.name}
              className="group cursor-pointer"
              style={{
                borderBottom: "1px solid var(--border)",
                padding: "2rem 0",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                transition: "border-color 0.4s ease",
              }}
              initial={{ opacity: 0, x: 36 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.18 + i * 0.1 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderBottomColor = "#C9A96E")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderBottomColor = "#2E2C29")}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <h3
                  className="font-headline font-light transition-colors duration-300 group-hover:text-[#C9A96E]"
                  style={{ fontSize: "clamp(1.4rem, 2vw, 2rem)", color: "var(--text-primary)", letterSpacing: "0.03em" }}
                >
                  {m.name}
                </h3>
                <span className="font-body" style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  {m.desc}
                </span>
              </div>
              <span
                className="font-body"
                style={{ fontSize: "0.56rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-secondary)", paddingTop: "0.25rem", flexShrink: 0, marginLeft: "1.5rem", textAlign: "right" }}
              >
                {m.origin}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
