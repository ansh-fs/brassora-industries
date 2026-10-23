import raw from "@/data/products.json";
import agarbatti from "@/assets/cat-agarbatti.jpg";
import diyas from "@/assets/cat-diyas.jpg";
import thali from "@/assets/cat-thali.jpg";
import plates from "@/assets/cat-plates.jpg";
import accessories from "@/assets/cat-accessories.jpg";

export type Product = {
  sku: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  dimensions: string;
  weight: string;
  material: string;
  finish: string;
  summary: string;
  description: string;
  moq: string;
  thumbs: string[];
};

export type Category = { slug: string; name: string; short: string; image: string };

export const CATEGORIES: Category[] = [
  { slug: "diyas-lamps", name: "Diyas & Oil Lamps", short: "Pedestal diyas, Kamal deep, Akhand jyot and Kuthu vilakku.", image: diyas },
  { slug: "agarbatti-stands", name: "Agarbatti Stands", short: "Lattice and tower incense holders in solid brass.", image: agarbatti },
  { slug: "pooja-thali-sets", name: "Pooja Thali Sets", short: "Complete 7-piece sets and individual thali components.", image: thali },
  { slug: "pooja-plates", name: "Pooja Plates", short: "Plain, engraved and Vastu kachhua plates.", image: plates },
  { slug: "pooja-bells", name: "Pooja Bells", short: "Hand ghantis with a clear, lasting tone.", image: accessories },
  { slug: "pooja-accessories", name: "Pooja Accessories", short: "Kumkum boxes, shankh stands and altar essentials.", image: accessories },
];

export const PRODUCTS = raw as Product[];

export const categoryBySlug = (s: string) => CATEGORIES.find((c) => c.slug === s);
export const productBySlug = (s: string) => PRODUCTS.find((p) => p.slug === s);
export const productsIn = (cat: string) => PRODUCTS.filter((p) => p.category === cat);
export const shortName = (name: string) => name.replace(/\s*\(.*?\)\s*/g, " ").trim();
export const moqNumber = (moq: string) => parseInt(moq, 10) || 0;
