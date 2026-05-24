"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const COLLECTIONS = [
  {
    id: 1,
    name: "The Quiet Form",
    category: "Outerwear",
    price: "2 400 MAD",
    image: "/images/702948155_18590045389033212_5745133479113546683_n.jpg",
  },
  {
    id: 2,
    name: "Shadow Drape",
    category: "Ready-to-Wear",
    price: "1 800 MAD",
    image: "/images/704672403_18590666788033212_1178635294394816246_n.jpg",
  },
  {
    id: 3,
    name: "Raw Linen Edit",
    category: "Essentials",
    price: "950 MAD",
    image: "/images/705381654_18590566591033212_2275328105217831004_n.jpg",
  },
];

function Card({ item, index, isInView }: {
  item: typeof COLLECTIONS[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.article
      className="group flex flex-col"
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: index * 0.14 }}
    >
      {/* Image wrapper — NO border at rest, thin gold on hover */}
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{ aspectRatio: "3 / 4", background: "var(--bg-card)" }}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          quality={100}
          className="object-cover object-top transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 90vw, 33vw"
        />

        {/* Hover: bottom gradient + gold frame */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(18,20,20,0.52) 0%, transparent 55%)",
            outline: "1px solid #C9A96E",
            outlineOffset: "-1px",
          }}
        />

        {/* Number badge */}
        <span
          className="absolute top-5 left-5 font-body"
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(227,226,226,0.45)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Below-image info */}
      <div
        className="flex items-start justify-between"
        style={{ paddingTop: "1.1rem", paddingLeft: "0.15rem" }}
      >
        <div className="flex flex-col gap-[0.35rem]">
          <span
            className="font-body"
            style={{
              fontSize: "0.58rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
            }}
          >
            {item.category}
          </span>
          <h3
            className="font-headline font-light"
            style={{ fontSize: "1.35rem", color: "var(--text-primary)", letterSpacing: "0.03em", lineHeight: 1.1 }}
          >
            {item.name}
          </h3>
        </div>
        <span
          className="font-body"
          style={{ fontSize: "0.72rem", color: "var(--accent)", letterSpacing: "0.06em", paddingTop: "0.15rem" }}
        >
          {item.price}
        </span>
      </div>
    </motion.article>
  );
}

export default function CollectionsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      ref={ref}
      id="collections"
      style={{ background: "var(--bg)", paddingTop: "9rem", paddingBottom: "9rem", paddingLeft: "5vw", paddingRight: "5vw" }}
    >
      {/* Header row */}
      <div
        className="flex items-end justify-between"
        style={{ marginBottom: "4.5rem" }}
      >
        <div className="flex flex-col" style={{ gap: "0.8rem" }}>
          <motion.span
            className="font-body"
            style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Collections
          </motion.span>
          <motion.h2
            className="font-headline font-light"
            style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.8rem)", color: "var(--text-primary)", letterSpacing: "0.03em", lineHeight: 1.05 }}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Autumn / Winter 2025
          </motion.h2>
        </div>

        <motion.a
          href="#"
          className="hidden md:flex items-center font-body transition-opacity duration-300 hover:opacity-40"
          style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-secondary)", gap: "0.6rem" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          All Pieces
          <span style={{ color: "var(--accent)" }}>→</span>
        </motion.a>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-14">
        {COLLECTIONS.map((item, i) => (
          <Card key={item.id} item={item} index={i} isInView={isInView} />
        ))}
      </div>

      {/* Rule */}
      <motion.div
        style={{ height: "1px", background: "#2E2C29", marginTop: "5.5rem", transformOrigin: "left", scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </section>
  );
}
