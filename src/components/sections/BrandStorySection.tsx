"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const WORDS =
  "Born from a belief that fashion should feel like a second skin — La Moda blends the precision of Milanese tailoring with the raw editorial spirit of Moroccan artisanship. Every stitch carries intention. Every silhouette holds silence.".split(
    " "
  );

export default function BrandStorySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-18%" });

  return (
    <section
      ref={ref}
      id="story"
      style={{
        background: "var(--bg)",
        paddingTop: "10rem",
        paddingBottom: "10rem",
        paddingLeft: "5vw",
        paddingRight: "5vw",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center" style={{ gap: "8vw" }}>

        {/* ── LEFT: text ── */}
        <div className="flex flex-col order-2 md:order-1" style={{ gap: "2rem" }}>
          <motion.span
            className="font-body"
            style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Our Story
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              className="font-headline font-light"
              style={{
                fontSize: "clamp(2.6rem, 4.2vw, 4.4rem)",
                color: "var(--text-primary)",
                lineHeight: 1.05,
                letterSpacing: "0.03em",
              }}
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Silence is the
              <br />
              <em>loudest luxury.</em>
            </motion.h2>
          </div>

          {/* Word-by-word reveal */}
          <p
            className="font-body"
            style={{ lineHeight: 2, fontSize: "0.85rem", display: "flex", flexWrap: "wrap", gap: "0 0.32em" }}
          >
            {WORDS.map((word, i) => (
              <motion.span
                key={i}
                style={{ color: "var(--text-secondary)", display: "inline-block" }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 + i * 0.028 }}
              >
                {word}
              </motion.span>
            ))}
          </p>

          <motion.a
            href="#collections"
            className="font-body inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-50"
            style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", width: "fit-content" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span style={{ display: "block", height: "1px", width: "28px", background: "#C9A96E" }} />
            View Collections
          </motion.a>
        </div>

        {/* ── RIGHT: image ── */}
        <motion.div
          className="relative order-1 md:order-2 overflow-hidden"
          style={{ aspectRatio: "3 / 4" }}
          initial={{ opacity: 0, x: 55 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <Image
            src="/images/702846540_18590021812033212_9065402843694498123_n.jpg"
            alt="La Moda editorial"
            fill
            quality={100}
            className="object-cover object-center"
            sizes="(max-width: 768px) 90vw, 45vw"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(18,20,20,0.45) 0%, transparent 55%)" }}
          />

          {/* Tag */}
          <motion.div
            className="absolute flex flex-col"
            style={{ bottom: "1.8rem", left: "1.8rem", gap: "0.3rem" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <span className="font-body" style={{ fontSize: "0.52rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--accent)" }}>
              AW 2025
            </span>
            <span className="font-headline font-light" style={{ fontSize: "1.1rem", color: "var(--text-primary)", letterSpacing: "0.04em" }}>
              The Quiet Form
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
