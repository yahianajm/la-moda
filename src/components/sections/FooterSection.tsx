"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const LINKS = {
  Shop:   ["New Arrivals", "Women", "Men", "Shoes", "Accessories"],
  Studio: ["About Us", "Lookbook", "Press", "Sustainability"],
  Help:   ["Size Guide", "Shipping", "Returns", "Contact"],
};

export default function FooterSection() {
  const ref      = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const [email, setEmail]       = useState("");
  const [sent,  setSent]        = useState(false);

  return (
    <footer
      id="contact"
      ref={ref}
      style={{ scrollMarginTop: "80px", background: "var(--bg-alt)", borderTop: "1px solid var(--border)" }}
    >
      {/* Main */}
      <div
        className="grid grid-cols-1 md:grid-cols-12"
        style={{
          paddingTop: "6rem",
          paddingBottom: "5rem",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          gap: "4rem 3vw",
        }}
      >
        {/* Brand + newsletter */}
        <motion.div
          className="md:col-span-4 flex flex-col"
          style={{ gap: "2rem" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div>
            <h2
              className="font-headline font-light"
              style={{ fontSize: "2.6rem", color: "var(--text-primary)", letterSpacing: "0.12em", lineHeight: 1, marginBottom: "1rem" }}
            >
              La Moda
            </h2>
            <p
              className="font-body"
              style={{ fontSize: "0.78rem", lineHeight: 2, color: "var(--text-secondary)", maxWidth: "280px" }}
            >
              Premium clothing and shoes crafted with intention.
              Designed for those who understand that less is always more.
            </p>
          </div>

          {/* Newsletter */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <span
              className="font-body"
              style={{ fontSize: "0.56rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--accent)" }}
            >
              Join the Circle
            </span>

            {sent ? (
              <motion.p
                className="font-body"
                style={{ fontSize: "0.78rem", color: "var(--accent)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Thank you. You&apos;re in.
              </motion.p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}
                style={{ display: "flex", height: "42px" }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="font-body outline-none transition-all duration-300"
                  style={{
                    flex: 1,
                    fontSize: "0.72rem",
                    letterSpacing: "0.04em",
                    background: "#242220",
                    border: "1px solid #2E2C29",
                    borderRight: "none",
                    color: "var(--text-primary)",
                    padding: "0 1rem",
                  }}
                  onFocus={(e)  => (e.currentTarget.style.borderColor = "#C9A96E")}
                  onBlur={(e)   => (e.currentTarget.style.borderColor = "#2E2C29")}
                />
                <button
                  type="submit"
                  className="font-body transition-all duration-400"
                  style={{
                    fontSize: "0.85rem",
                    padding: "0 1.1rem",
                    background: "#C9A96E",
                    color: "#121414",
                    border: "1px solid #C9A96E",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#F0EBE1"; e.currentTarget.style.borderColor = "#F0EBE1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#C9A96E"; e.currentTarget.style.borderColor = "#C9A96E"; }}
                >
                  →
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Nav columns */}
        {Object.entries(LINKS).map(([section, links], si) => (
          <motion.div
            key={section}
            className="md:col-span-2 flex flex-col"
            style={{ gap: "1.2rem" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 + si * 0.08 }}
          >
            <span
              className="font-body"
              style={{ fontSize: "0.54rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--accent)" }}
            >
              {section}
            </span>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-body transition-colors duration-300"
                    style={{ fontSize: "0.8rem", color: "var(--text-secondary)", letterSpacing: "0.02em" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#E3E2E2")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#9E9B97")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Social */}
        <motion.div
          className="md:col-span-2 flex flex-col"
          style={{ gap: "1.2rem" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.34 }}
        >
          <span
            className="font-body"
            style={{ fontSize: "0.54rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--accent)" }}
          >
            Follow
          </span>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {["Instagram", "Pinterest", "TikTok"].map((s) => (
              <li key={s}>
                <a
                  href="#"
                  className="font-body transition-colors duration-300"
                  style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#E3E2E2")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9E9B97")}
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "1.4rem",
          paddingBottom: "1.4rem",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.8rem",
        }}
      >
        <span className="font-body" style={{ fontSize: "0.62rem", letterSpacing: "0.08em", color: "var(--text-secondary)" }}>
          © 2025 La Moda. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: "1.8rem" }}>
          {["Privacy", "Terms", "Cookies"].map((item) => (
            <a
              key={item}
              href="#"
              className="font-body transition-colors duration-300"
              style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E3E2E2")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9E9B97")}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
