"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { useMusic } from "@/components/MusicProvider";

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

export default function FloatingControls() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { playing, blocked, toggle: toggleMusic } = useMusic();

  return (
    <>
      {/* ── MOBILE: single horizontal pill top-right ─────────────── */}
      <motion.div
        className="flex md:hidden"
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 60,
          alignItems: "center",
          gap: "0",
          background: "var(--nav-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: blocked ? "1px solid var(--accent)" : "1px solid var(--border)",
          borderRadius: "999px",
          padding: "0 4px",
          height: "36px",
          transition: "border-color 0.4s ease",
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Music play/pause with label */}
        <button
          onClick={toggleMusic}
          className="font-body"
          style={{
            display: "flex", alignItems: "center", gap: "5px",
            background: "none", border: "none", cursor: "pointer",
            color: playing ? "var(--accent)" : blocked ? "var(--accent)" : "var(--text-secondary)",
            fontSize: "0.52rem", letterSpacing: "0.16em", textTransform: "uppercase",
            padding: "0 10px", height: "100%",
          }}
          aria-label={playing ? "Pause" : "Play"}
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
              {playing ? <PauseIcon /> : <PlayIcon />}
            </motion.span>
          </AnimatePresence>
          {playing ? "Pause" : "Music"}
        </button>

        {/* Divider */}
        <span style={{ width: "1px", height: "14px", background: "var(--border)", flexShrink: 0 }} />

        {/* Theme toggle with label */}
        <button
          onClick={toggleTheme}
          className="font-body"
          style={{
            display: "flex", alignItems: "center", gap: "5px",
            background: "none", border: "none", cursor: "pointer",
            color: "var(--text-secondary)",
            fontSize: "0.52rem", letterSpacing: "0.16em", textTransform: "uppercase",
            padding: "0 10px", height: "100%",
          }}
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
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </motion.span>
          </AnimatePresence>
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </motion.div>
    </>
  );
}
