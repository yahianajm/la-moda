import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const KNOWN: Record<string, { name: string; category: string; price: string }> = {
  "702780233_3395843740575747_1028976443546796364_n.jpg":  { name: "Black Crop Shirt",            category: "wearing", price: "1 200 MAD" },
  "700581478_1955875785042290_1902865097294014226_n.jpg":  { name: "Knit Polo + Wide Trousers",   category: "wearing", price: "1 800 MAD" },
  "684192576_2104508113677945_7878910510946660489_n.jpg":  { name: "Mock-Neck Tee + Trousers",    category: "wearing", price: "1 650 MAD" },
  "671252230_1654612599091901_3047021429507142494_n.jpg":  { name: "Linen Shirt + Pleated Pants", category: "wearing", price: "2 100 MAD" },
  "703055096_1889915825310417_4224885554982403597_n.jpg":  { name: "Ribbed Tank + Wide Pants",    category: "wearing", price: "1 400 MAD" },
  "684667081_1639207860481573_929658805915271814_n.jpg":   { name: "Crochet Vest Set",            category: "wearing", price: "1 550 MAD" },
  "687668578_1396381345869557_3855729272072998756_n.jpg":  { name: "Checked Shirt + Wide Pants",  category: "wearing", price: "1 350 MAD" },
  "686503572_18585866071033212_6539585935229097022_n.jpg": { name: "Graphic Tee + Tie-Dye Jeans", category: "wearing", price: "1 100 MAD" },
  "684908179_1771249434001333_5711389189589686556_n.jpg":  { name: "Crochet Patchwork Shirt",     category: "wearing", price: "1 750 MAD" },
  "683034471_2112907099560345_1972469239639080396_n.jpg":  { name: "Striped Crop Jacket",         category: "wearing", price: "1 950 MAD" },
  "681860677_1727613381732540_7702144394475940781_n.jpg":  { name: "Check Overshirt Set",         category: "wearing", price: "1 450 MAD" },
  "696706540_18587760511033212_2380630625827816040_n.jpg": { name: "Oversized Linen Shirt",       category: "wearing", price: "980 MAD"  },
  "703498946_2747018965674047_1915637443150480175_n.jpg":  { name: "Graphic Oversized Tee",       category: "wearing", price: "850 MAD"  },
  "701385229_2146872822757863_8314674444887025237_n.jpg":  { name: "Floral Print Shirt",          category: "wearing", price: "1 300 MAD" },
  "704732207_18590870455033212_5698071722312755381_n.jpg": { name: "Red Linen Shirt Set",         category: "flatlay", price: "1 500 MAD" },
  "702948155_18590045389033212_5745133479113546683_n.jpg": { name: "Crop Top + Wide Shorts",      category: "flatlay", price: "980 MAD"  },
  "705381654_18590566591033212_2275328105217831004_n.jpg": { name: "Blue Linen Shirt Set",        category: "flatlay", price: "1 350 MAD" },
  "702590116_18590304844033212_7733792212863927414_n.jpg": { name: "Graphic Tee + Shorts",        category: "flatlay", price: "1 050 MAD" },
  "700944861_18589220842033212_3149199650033653308_n.jpg": { name: "Yellow Linen Shirt Set",      category: "flatlay", price: "1 250 MAD" },
  "672375168_18589468792033212_7464540656393021575_n.jpg": { name: "Navy Graphic Tee Set",        category: "flatlay", price: "890 MAD"  },
  "700944859_18589302400033212_6338671487729718503_n.jpg": { name: "Cream Wide-Leg Trousers",     category: "flatlay", price: "1 100 MAD" },
  "704672403_18590666788033212_1178635294394816246_n.jpg": { name: "Burgundy Polo Set",           category: "flatlay", price: "1 400 MAD" },
  "702846540_18590021812033212_9065402843694498123_n.jpg": { name: "Embroidered Shirt Set",       category: "flatlay", price: "1 650 MAD" },
  "702201018_1985368892348801_8440083293025715864_n.jpg":  { name: "Suede Espadrille Mules",      category: "shoes",   price: "1 800 MAD" },
};

const NAMES = [
  "Linen Open Shirt", "Relaxed Trousers", "Oversized Blazer", "Knit Cardigan",
  "Wide-Leg Pants", "Cropped Jacket", "Striped Tee", "Pleated Shorts",
  "Silk Slip Top", "Cotton Overshirt", "Ribbed Tank Set", "Tailored Trousers",
  "Printed Tee", "Washed Denim", "Polo Shirt", "Crochet Top",
  "Linen Set", "Mock-Neck Top", "Graphic Tee", "Cargo Pants",
  "Slim Trousers", "Patchwork Shirt", "Floral Shirt", "Wrap Trousers",
  "Boxy Tee", "Draped Top", "Utility Jacket", "Relaxed Shorts",
];

const PRICES = [
  "750 MAD", "850 MAD", "950 MAD", "1 050 MAD", "1 100 MAD",
  "1 200 MAD", "1 300 MAD", "1 350 MAD", "1 450 MAD", "1 500 MAD",
  "1 650 MAD", "1 750 MAD", "1 800 MAD", "1 950 MAD", "2 100 MAD",
];

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function getAllImages(): string[] {
  const dir = path.join(process.cwd(), "public", "images");
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
    .sort()
    .reverse();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page     = Math.max(1, parseInt(searchParams.get("page")     ?? "1",  10));
  const limit    = Math.min(48, Math.max(1, parseInt(searchParams.get("limit") ?? "24", 10)));
  const category = searchParams.get("category") ?? "all";

  const files = getAllImages();

  const products = files.map((file, i) => {
    const known = KNOWN[file];
    return {
      id:       `img-${i}`,
      src:      `/images/${file}`,
      name:     known?.name     ?? NAMES[i % NAMES.length],
      category: known?.category ?? "wearing",
      price:    known?.price    ?? PRICES[i % PRICES.length],
    };
  });

  const filtered =
    category === "all" ? products : products.filter((p) => p.category === category);

  const total   = filtered.length;
  const start   = (page - 1) * limit;
  const slice   = filtered.slice(start, start + limit);
  const hasMore = start + limit < total;

  return NextResponse.json({ products: slice, total, hasMore, page });
}
