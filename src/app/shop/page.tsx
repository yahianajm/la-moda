import ShopClient from "@/components/shop/ShopClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Pieces — La Moda",
  description: "Browse the full La Moda collection. Filter by Wearing, Flat Lay and Shoes.",
};

export default function ShopPage() {
  return <ShopClient />;
}
