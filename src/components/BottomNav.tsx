"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const LINKS = [
  {
    label: "Home",
    href: "/home",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    label: "Shop",
    href: "/shop",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    label: "Lookbook",
    href: "/lookbook",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    label: "Story",
    href: "/story",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    label: "Contact",
    href: "/contact",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "var(--nav-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid var(--border)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          height: "62px",
          maxWidth: "600px",
          margin: "0 auto",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
        }}
      >
        {/* Theme toggle */}
        <button
          onClick={toggle}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-secondary)",
            transition: "color 0.25s ease",
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          aria-label="Toggle theme"
        >
          <motion.span
            key={theme}
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex" }}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </motion.span>
          <span className="font-body" style={{ fontSize: "0.45rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>

        {LINKS.map((link) => {
          const active = link.href === "/home"
            ? pathname === "/" || pathname === "/home"
            : pathname.startsWith(link.href);

          return (
            <Link
              key={link.label}
              href={link.href}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                textDecoration: "none",
                color: active ? "var(--accent)" : "var(--text-secondary)",
                transition: "color 0.25s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
              }}
            >
              {/* Active gold dot */}
              {active && (
                <motion.span
                  layoutId="nav-dot"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "20px",
                    height: "1.5px",
                    background: "var(--accent)",
                  }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                />
              )}
              <span style={{ opacity: active ? 1 : 0.7 }}>{link.icon}</span>
              <span
                className="font-body"
                style={{
                  fontSize: "0.45rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
