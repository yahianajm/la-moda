"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, type Category } from "@/lib/products";

interface Product {
  id: string;
  src: string;
  name: string;
  category: string;
  price: string;
}

const LIMIT = 24;

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function Card({ item }: { item: Product }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="group cursor-pointer flex flex-col"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 4", background: "var(--bg-card)" }}>
        <Image
          src={item.src}
          alt={item.name}
          fill
          quality={85}
          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(to top, rgba(18,20,20,0.55) 0%, transparent 55%)",
            outline: "1px solid #C9A96E",
            outlineOffset: "-1px",
          }}
        />
        <div
          className="absolute top-3 left-3 font-body"
          style={{
            fontSize: "0.48rem",
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
      <div className="flex items-start justify-between" style={{ paddingTop: "0.8rem" }}>
        <h3
          className="font-headline font-light"
          style={{ fontSize: "1rem", color: "var(--text-primary)", letterSpacing: "0.02em", lineHeight: 1.15, flex: 1, paddingRight: "0.5rem" }}
        >
          {item.name}
        </h3>
        <span
          className="font-body flex-shrink-0"
          style={{ fontSize: "0.65rem", color: "var(--accent)", letterSpacing: "0.05em", paddingTop: "0.12rem" }}
        >
          {item.price}
        </span>
      </div>
    </motion.article>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({
  active,
  setActive,
  total,
}: {
  active: Category;
  setActive: (c: Category) => void;
  total: number;
}) {
  return (
    <aside
      className="hidden md:flex flex-col flex-shrink-0"
      style={{
        width: "240px",
        borderRight: "1px solid var(--border)",
        paddingTop: "3rem",
        paddingBottom: "3rem",
        paddingLeft: "2.5rem",
        paddingRight: "2rem",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Link
        href="/"
        className="font-body inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-50"
        style={{
          fontSize: "0.55rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
          textDecoration: "none",
          marginBottom: "2.5rem",
        }}
      >
        ← La Moda
      </Link>

      <h1
        className="font-headline font-light"
        style={{ fontSize: "1.5rem", color: "var(--text-primary)", letterSpacing: "0.12em", marginBottom: "2.5rem" }}
      >
        Shop
      </h1>

      <span
        className="font-body"
        style={{
          fontSize: "0.5rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
          display: "block",
          marginBottom: "1rem",
        }}
      >
        Category
      </span>

      <nav style={{ display: "flex", flexDirection: "column" }}>
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className="font-body transition-colors duration-300"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "0.8rem",
                paddingBottom: "0.8rem",
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: "var(--border)",
                background: "none",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  letterSpacing: "0.03em",
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  fontWeight: isActive ? 500 : 400,
                  transition: "color 0.3s",
                }}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
        <span
          className="font-body"
          style={{ fontSize: "0.5rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-secondary)", display: "block", marginBottom: "0.6rem" }}
        >
          Showing
        </span>
        <motion.span
          key={active}
          className="font-headline font-light"
          style={{ fontSize: "1.2rem", color: "var(--accent)", letterSpacing: "0.04em", display: "block" }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {CATEGORIES.find((c) => c.key === active)?.label}
        </motion.span>
        <span
          className="font-body"
          style={{ fontSize: "0.6rem", color: "var(--text-secondary)", letterSpacing: "0.06em", marginTop: "0.3rem", display: "block" }}
        >
          {total} pieces
        </span>
      </div>
    </aside>
  );
}

// ─── MAIN SHOP PAGE ───────────────────────────────────────────────────────────
export default function ShopClient() {
  const [active, setActive] = useState<Category>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchProducts = useCallback(async (category: Category, pageNum: number, append = false) => {
    if (pageNum === 1) setLoading(true); else setLoadingMore(true);
    try {
      const res = await fetch(`/api/products?category=${category}&page=${pageNum}&limit=${LIMIT}`);
      const data = await res.json();
      setProducts((prev) => append ? [...prev, ...data.products] : data.products);
      setHasMore(data.hasMore);
      setTotal(data.total);
      setPage(pageNum);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(active, 1, false);
  }, [active, fetchProducts]);

  const handleCategoryChange = (cat: Category) => {
    setActive(cat);
  };

  const handleLoadMore = () => {
    fetchProducts(active, page + 1, true);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", paddingBottom: "62px" }}>
      <Sidebar active={active} setActive={handleCategoryChange} total={total} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>

        {/* Top bar */}
        <div
          style={{
            borderBottom: "1px solid var(--border)",
            paddingLeft: "3rem",
            paddingRight: "5vw",
            paddingTop: "3rem",
            paddingBottom: "1.5rem",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
            flexShrink: 0,
          }}
        >
          <div>
            <span
              className="font-body"
              style={{ fontSize: "0.56rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: "0.45rem" }}
            >
              La Moda
            </span>
            <h2
              className="font-headline font-light"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "var(--text-primary)", letterSpacing: "0.03em", lineHeight: 1 }}
            >
              {CATEGORIES.find((c) => c.key === active)?.label === "All"
                ? "All Pieces"
                : CATEGORIES.find((c) => c.key === active)?.label}
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {/* Mobile filters */}
            <div className="flex md:hidden items-center gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
                  className="font-body transition-colors duration-300"
                  style={{
                    fontSize: "0.56rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: active === cat.key ? "#C9A96E" : "#9E9B97",
                    background: "none",
                    borderWidth: 0,
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <motion.span
              key={`count-${active}`}
              className="font-body"
              style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--text-secondary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              {products.length} / {total} pieces
            </motion.span>
          </div>
        </div>

        {/* Grid */}
        <div style={{ padding: "3rem 5vw 5rem 3rem", flex: 1 }}>
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "40vh" }}>
              <motion.span
                className="font-body"
                style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-secondary)" }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                Loading
              </motion.span>
            </div>
          ) : (
            <>
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                style={{ gap: "2.5rem 1.5rem" }}
              >
                <AnimatePresence mode="popLayout">
                  {products.map((item) => (
                    <Card key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {products.length === 0 && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "40vh" }}>
                  <p className="font-headline font-light" style={{ fontSize: "1.5rem", color: "var(--text-secondary)", letterSpacing: "0.04em" }}>
                    No pieces found.
                  </p>
                </div>
              )}

              {/* Load More */}
              {hasMore && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "4rem" }}>
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="font-body transition-all duration-500"
                    style={{
                      fontSize: "0.62rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: loadingMore ? "#9E9B97" : "#121414",
                      background: loadingMore ? "transparent" : "#C9A96E",
                      padding: "1rem 3rem",
                      borderTopWidth: "1px",
                      borderLeftWidth: "1px",
                      borderRightWidth: "1px",
                      borderBottomWidth: "1px",
                      borderStyle: "solid",
                      borderColor: "#C9A96E",
                      cursor: loadingMore ? "default" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (loadingMore) return;
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#C9A96E";
                    }}
                    onMouseLeave={(e) => {
                      if (loadingMore) return;
                      e.currentTarget.style.background = "#C9A96E";
                      e.currentTarget.style.color = "#121414";
                    }}
                  >
                    {loadingMore
                      ? "Loading…"
                      : `Load More — ${Math.min(LIMIT, total - products.length)} pieces`}
                  </button>
                </div>
              )}

              {!hasMore && products.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "4rem" }}>
                  <span
                    className="font-body"
                    style={{ fontSize: "0.52rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--border-color)" }}
                  >
                    All {total} pieces shown
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
