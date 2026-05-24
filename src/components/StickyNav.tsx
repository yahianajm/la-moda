"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useMusic } from "@/components/MusicProvider";
import { useTheme } from "@/components/ThemeProvider";

const NAV_LINKS = [
  { label: "Collections", href: "/#collections" },
  { label: "Lookbook",    href: "/#lookbook"    },
  { label: "Story",       href: "/#story"       },
  { label: "Contact",     href: "/#contact"     },
];

function ThemeToggleBtn() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="font-body transition-opacity duration-300 hover:opacity-50"
      style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", display: "flex", alignItems: "center", gap: "5px", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 30, opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ display: "flex" }}
        >
          {theme === "dark" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" />
              <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
              <line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
              <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { playing, blocked, trackTitle, toggle: toggleMusic } = useMusic();
  const isShop = pathname.startsWith("/shop");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If already on home page, smooth-scroll instead of navigating
    if (href.startsWith("/#") && (pathname === "/" || pathname === "/home")) {
      e.preventDefault();
      const id = href.slice(2);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between"
      style={{
        padding: "1.6rem 5vw",
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "background 0.4s ease, border-color 0.4s ease",
        color: "var(--text-primary)",
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Wordmark */}
      <Link
        href="/"
        className="font-headline tracking-[0.28em] uppercase select-none transition-opacity duration-300 hover:opacity-60"
        style={{ fontSize: "1.05rem", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "0.28em", textDecoration: "none" }}
      >
        La Moda
      </Link>

      {/* Section links */}
      <div className="flex items-center gap-9">
        {NAV_LINKS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="font-body transition-opacity duration-300 hover:opacity-40"
            style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-primary)", textDecoration: "none" }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Shop Now CTA */}
      {!isShop && (
        <Link
          href="/shop"
          className="hidden md:inline-flex font-body transition-opacity duration-300 hover:opacity-60"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent)",
            borderBottom: "1px solid var(--accent)",
            paddingBottom: "2px",
            textDecoration: "none",
          }}
        >
          Shop Now
        </Link>
      )}

      {/* Music + Theme — far right */}
      <div className="flex items-center gap-4">
        <AnimatePresence>
          {playing && (
            <motion.span
              key={trackTitle}
              className="font-body"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: "0.5rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)" }}
            >
              {trackTitle}
            </motion.span>
          )}
        </AnimatePresence>

        <button
          onClick={toggleMusic}
          className="font-body transition-opacity duration-300 hover:opacity-50"
          style={{ background: "none", border: "none", cursor: "pointer", color: playing || blocked ? "var(--accent)" : "var(--text-primary)", display: "flex", alignItems: "center", gap: "5px", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
          aria-label={playing ? "Pause music" : "Play music"}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={playing ? "pause" : "play"}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex" }}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </motion.span>
          </AnimatePresence>
          {playing ? "Pause" : "Music"}
        </button>

        <span style={{ width: "1px", height: "14px", background: "rgba(130,130,130,0.3)", display: "block" }} />

        <ThemeToggleBtn />
      </div>
    </motion.nav>
  );
}
