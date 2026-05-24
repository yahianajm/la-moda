export type Category = "all" | "wearing" | "flatlay" | "shoes";

export interface Product {
  id: string;
  src: string;
  name: string;
  category: Exclude<Category, "all">;
  price: string;
}

export const PRODUCTS: Product[] = [
  // ── WEARING ──
  { id: "w01", src: "/images/702780233_3395843740575747_1028976443546796364_n.jpg",  name: "Black Crop Shirt",            category: "wearing", price: "1 200 MAD" },
  { id: "w02", src: "/images/700581478_1955875785042290_1902865097294014226_n.jpg",  name: "Knit Polo + Wide Trousers",   category: "wearing", price: "1 800 MAD" },
  { id: "w03", src: "/images/684192576_2104508113677945_7878910510946660489_n.jpg",  name: "Mock-Neck Tee + Trousers",    category: "wearing", price: "1 650 MAD" },
  { id: "w04", src: "/images/671252230_1654612599091901_3047021429507142494_n.jpg",  name: "Linen Shirt + Pleated Pants", category: "wearing", price: "2 100 MAD" },
  { id: "w05", src: "/images/703055096_1889915825310417_4224885554982403597_n.jpg",  name: "Ribbed Tank + Wide Pants",    category: "wearing", price: "1 400 MAD" },
  { id: "w06", src: "/images/684667081_1639207860481573_929658805915271814_n.jpg",   name: "Crochet Vest Set",            category: "wearing", price: "1 550 MAD" },
  { id: "w07", src: "/images/687668578_1396381345869557_3855729272072998756_n.jpg",  name: "Checked Shirt + Wide Pants",  category: "wearing", price: "1 350 MAD" },
  { id: "w08", src: "/images/686503572_18585866071033212_6539585935229097022_n.jpg", name: "Graphic Tee + Tie-Dye Jeans", category: "wearing", price: "1 100 MAD" },
  { id: "w09", src: "/images/684908179_1771249434001333_5711389189589686556_n.jpg",  name: "Crochet Patchwork Shirt",     category: "wearing", price: "1 750 MAD" },
  { id: "w10", src: "/images/683034471_2112907099560345_1972469239639080396_n.jpg",  name: "Striped Crop Jacket",         category: "wearing", price: "1 950 MAD" },
  { id: "w11", src: "/images/681860677_1727613381732540_7702144394475940781_n.jpg",  name: "Check Overshirt Set",         category: "wearing", price: "1 450 MAD" },
  { id: "w12", src: "/images/696706540_18587760511033212_2380630625827816040_n.jpg", name: "Oversized Linen Shirt",       category: "wearing", price: "980 MAD"  },
  { id: "w13", src: "/images/703498946_2747018965674047_1915637443150480175_n.jpg",  name: "Graphic Oversized Tee",       category: "wearing", price: "850 MAD"  },
  { id: "w14", src: "/images/701385229_2146872822757863_8314674444887025237_n.jpg",  name: "Floral Print Shirt",          category: "wearing", price: "1 300 MAD" },

  // ── FLAT LAY ──
  { id: "f01", src: "/images/704732207_18590870455033212_5698071722312755381_n.jpg", name: "Red Linen Shirt Set",         category: "flatlay", price: "1 500 MAD" },
  { id: "f02", src: "/images/702948155_18590045389033212_5745133479113546683_n.jpg", name: "Crop Top + Wide Shorts",      category: "flatlay", price: "980 MAD"  },
  { id: "f03", src: "/images/705381654_18590566591033212_2275328105217831004_n.jpg", name: "Blue Linen Shirt Set",        category: "flatlay", price: "1 350 MAD" },
  { id: "f04", src: "/images/702590116_18590304844033212_7733792212863927414_n.jpg", name: "Graphic Tee + Shorts",        category: "flatlay", price: "1 050 MAD" },
  { id: "f05", src: "/images/700944861_18589220842033212_3149199650033653308_n.jpg", name: "Yellow Linen Shirt Set",      category: "flatlay", price: "1 250 MAD" },
  { id: "f06", src: "/images/672375168_18589468792033212_7464540656393021575_n.jpg", name: "Navy Graphic Tee Set",        category: "flatlay", price: "890 MAD"  },
  { id: "f07", src: "/images/700944859_18589302400033212_6338671487729718503_n.jpg", name: "Cream Wide-Leg Trousers",     category: "flatlay", price: "1 100 MAD" },
  { id: "f08", src: "/images/704672403_18590666788033212_1178635294394816246_n.jpg", name: "Burgundy Polo Set",           category: "flatlay", price: "1 400 MAD" },
  { id: "f09", src: "/images/702846540_18590021812033212_9065402843694498123_n.jpg", name: "Embroidered Shirt Set",       category: "flatlay", price: "1 650 MAD" },

  // ── SHOES ──
  { id: "s01", src: "/images/702201018_1985368892348801_8440083293025715864_n.jpg",  name: "Suede Espadrille Mules",      category: "shoes",   price: "1 800 MAD" },
];

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all",     label: "All"      },
  { key: "wearing", label: "Wearing"  },
  { key: "flatlay", label: "Flat Lay" },
  { key: "shoes",   label: "Shoes"    },
];
