"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const QUOTES = [
  {
    quote:
      "La Moda doesn't follow trends — it sets a standard of restraint that most luxury brands have forgotten.",
    author: "Yasmine Kadiri",
    title:  "Fashion Editor, Vogue Arabia",
  },
  {
    quote:
      "The Obsidian Coat is the only piece I've worn every day this winter. Nothing competes with the silence of the fabric.",
    author: "Mehdi Alaoui",
    title:  "Creative Director",
  },
  {
    quote:
      "Precision without performance. That's the rarest thing in fashion today — and La Moda has mastered it.",
    author: "Sofia El Amrani",
    title:  "Stylist & Founder, Studio Drift",
  },
];

function Quote({ item, index, isInView }: {
  item: typeof QUOTES[number];
  index: number;
  isInView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <motion.div
      ref={ref}
      style={{
        borderBottom: "1px solid var(--border)",
        paddingTop: "3.5rem",
        paddingBottom: "3.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.8rem",
      }}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: index * 0.13 }}
    >
      <motion.p
        className="font-headline font-light"
        style={{
          fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)",
          color: "var(--text-primary)",
          lineHeight: 1.55,
          letterSpacing: "0.025em",
          fontStyle: "italic",
          y,
        }}
      >
        &ldquo;{item.quote}&rdquo;
      </motion.p>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ display: "block", height: "1px", width: "24px", background: "#C9A96E", flexShrink: 0 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <span className="font-body" style={{ fontSize: "0.8rem", color: "var(--text-primary)", letterSpacing: "0.04em" }}>
            {item.author}
          </span>
          <span className="font-body" style={{ fontSize: "0.6rem", letterSpacing: "0.14em", color: "var(--text-secondary)", textTransform: "uppercase" }}>
            {item.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const ref      = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-14%" });

  return (
    <section
      ref={ref}
      style={{
        background: "var(--bg)",
        paddingTop: "9rem",
        paddingBottom: "9rem",
        paddingLeft: "5vw",
        paddingRight: "5vw",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12" style={{ gap: "5vw" }}>
        {/* Label */}
        <div className="md:col-span-3 flex flex-col" style={{ gap: "1.2rem" }}>
          <motion.span
            className="font-body"
            style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Voices
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              className="font-headline font-light"
              style={{ fontSize: "clamp(2rem, 3.2vw, 3.2rem)", color: "var(--text-primary)", lineHeight: 1.08, letterSpacing: "0.03em" }}
              initial={{ y: "108%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Worn &amp;
              <br />
              Heard
            </motion.h2>
          </div>
        </div>

        {/* Quotes */}
        <div className="md:col-span-9" style={{ borderTop: "1px solid var(--border)" }}>
          {QUOTES.map((q, i) => (
            <Quote key={q.author} item={q} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
