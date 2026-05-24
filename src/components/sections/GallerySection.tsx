"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { PRODUCTS } from "@/lib/products";

// Show the 6 best pieces as a preview
const PREVIEW = [
  PRODUCTS.find((p) => p.id === "w01")!,
  PRODUCTS.find((p) => p.id === "w03")!,
  PRODUCTS.find((p) => p.id === "w04")!,
  PRODUCTS.find((p) => p.id === "f01")!,
  PRODUCTS.find((p) => p.id === "f03")!,
  PRODUCTS.find((p) => p.id === "s01")!,
];

export default function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      ref={ref}
      id="shop"
      style={{
        background: "#121414",
        paddingTop: "9rem",
        paddingBottom: "9rem",
        paddingLeft: "5vw",
        paddingRight: "5vw",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          <motion.span
            className="font-body"
            style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E" }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Shop
          </motion.span>
          <motion.h2
            className="font-headline font-light"
            style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.8rem)", color: "#E3E2E2", letterSpacing: "0.03em", lineHeight: 1.05 }}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            All Pieces
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link
            href="/shop"
            className="hidden md:inline-flex font-body items-center gap-2 transition-opacity duration-300 hover:opacity-50"
            style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9E9B97" }}
          >
            Browse All
            <span style={{ color: "#C9A96E" }}>→</span>
          </Link>
        </motion.div>
      </div>

      {/* 3-column preview grid */}
      <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: "2rem 1.5rem" }}>
        {PREVIEW.map((item, i) => (
          <motion.article
            key={item.id}
            className="group cursor-pointer flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
          >
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "3 / 4", background: "#1A1918" }}
            >
              <Image
                src={item.src}
                alt={item.name}
                fill
                quality={100}
                className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 45vw, 30vw"
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(to top, rgba(18,20,20,0.55) 0%, transparent 55%)",
                  outline: "1px solid #C9A96E",
                  outlineOffset: "-1px",
                }}
              />
              {/* Badge */}
              <div
                className="absolute top-3 left-3 font-body"
                style={{
                  fontSize: "0.5rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(227,226,226,0.6)",
                  background: "rgba(18,20,20,0.72)",
                  padding: "3px 8px",
                  backdropFilter: "blur(4px)",
                }}
              >
                {item.category === "wearing" ? "Wearing" : item.category === "flatlay" ? "Flat Lay" : "Shoes"}
              </div>
            </div>

            <div
              className="flex items-start justify-between"
              style={{ paddingTop: "0.85rem" }}
            >
              <h3
                className="font-headline font-light"
                style={{ fontSize: "1.1rem", color: "#E3E2E2", letterSpacing: "0.02em", lineHeight: 1.15, flex: 1, paddingRight: "0.5rem" }}
              >
                {item.name}
              </h3>
              <span
                className="font-body flex-shrink-0"
                style={{ fontSize: "0.68rem", color: "#C9A96E", letterSpacing: "0.05em", paddingTop: "0.15rem" }}
              >
                {item.price}
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      {/* See All button */}
      <motion.div
        className="flex justify-center"
        style={{ marginTop: "4.5rem" }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.65 }}
      >
        <Link
          href="/shop"
          className="font-body inline-flex items-center gap-3 transition-all duration-500 group"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#121414",
            background: "#C9A96E",
            padding: "1rem 3rem",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "transparent";
            el.style.color = "#C9A96E";
            el.style.outline = "1px solid #C9A96E";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "#C9A96E";
            el.style.color = "#121414";
            el.style.outline = "none";
          }}
        >
          See All Pieces
          <span style={{ fontSize: "0.9rem" }}>→</span>
        </Link>
      </motion.div>
    </section>
  );
}
