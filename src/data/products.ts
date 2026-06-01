import leanShot from "@/assets/product-leanshot.png";
import plasmaMass from "@/assets/product-plasmamass.png";
import superWhey from "@/assets/product-superwhey.png";
import myogenetix from "@/assets/product-myogenetix.png";

export type Category = "Muscle" | "Performance" | "Recovery" | "Essentials";

export interface Product {
  id: string;
  slug?: string;
  name: string;
  tagline: string;
  price: number;
  mrp: number;
  category: Category;
  image: string;
  description: string;
  benefits: string[];
  howToUse: string;
  ingredients: string[];
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "super-whey",
    name: "Super Whey",
    tagline: "27g premium whey protein blend",
    price: 4499,
    mrp: 5499,
    category: "Muscle",
    image: superWhey,
    description:
      "Super Whey delivers a clinically dosed 27g of fast-absorbing whey protein per scoop, engineered for serious lean-muscle development, post-training recovery and daily protein intake. Cold-processed, instantized, and lab-verified for purity.",
    benefits: [
      "27g protein per serving",
      "6.2g BCAAs, 5g Glutamic acid",
      "Cold-processed, instantized blend",
      "Zero amino spiking guarantee",
    ],
    howToUse:
      "Mix 1 scoop (33g) with 200ml chilled water or milk. Consume post-workout or anytime to meet daily protein needs.",
    ingredients: ["Whey Protein Isolate", "Whey Concentrate", "Digestive Enzymes", "Cocoa", "Natural Flavour"],
    rating: 4.9,
    reviews: 2841,
  },
  {
    id: "plasma-mass",
    name: "Plasma Mass",
    tagline: "High-calorie advanced gainer formula",
    price: 3899,
    mrp: 4699,
    category: "Muscle",
    image: plasmaMass,
    description:
      "Plasma Mass is engineered for hard gainers who need clean calories. Each serving packs 60g of complex carbs and 30g of protein with zero junk fillers. Built for strength, recovery and serious size.",
    benefits: [
      "30g protein + 60g complex carbs",
      "Added MCTs and digestive enzymes",
      "No added sugar fillers",
      "Lab-verified purity",
    ],
    howToUse: "Mix 2 scoops with 300ml milk. Consume post-workout or between meals for surplus calories.",
    ingredients: ["Maltodextrin", "Whey Concentrate", "Oat Flour", "MCT Oil", "Creatine Monohydrate"],
    rating: 4.8,
    reviews: 1620,
  },
  {
    id: "lean-shot",
    name: "Lean Shot",
    tagline: "Ultra potent fat burning formula",
    price: 1899,
    mrp: 2399,
    category: "Performance",
    image: leanShot,
    description:
      "Lean Shot is a research-backed thermogenic that supports fat metabolism, energy and focus. Formulated with L-Carnitine, Green Tea Extract and clinically dosed caffeine.",
    benefits: [
      "Supports fat metabolism",
      "Sharper focus & energy",
      "Clinically dosed caffeine",
      "No banned stimulants",
    ],
    howToUse: "1 scoop with 200ml water 20 minutes before training or fasted cardio.",
    ingredients: ["L-Carnitine", "Green Tea Extract", "Caffeine Anhydrous", "Cayenne", "Chromium"],
    rating: 4.7,
    reviews: 980,
  },
  {
    id: "myogenetix-whey",
    name: "Myogenetix Concentrate",
    tagline: "Daily whey protein concentrate",
    price: 2499,
    mrp: 2999,
    category: "Essentials",
    image: myogenetix,
    description:
      "An everyday whey protein concentrate built for athletes who want consistent quality at an accessible price. Smooth mixability, great taste, lab-verified.",
    benefits: [
      "24g protein per scoop",
      "Smooth mixability",
      "Lab-verified quality",
      "Affordable daily nutrition",
    ],
    howToUse: "1 scoop with 200ml water or milk, anytime in the day.",
    ingredients: ["Whey Concentrate", "Cocoa", "Natural Flavour", "Sucralose", "Lecithin"],
    rating: 4.8,
    reviews: 1340,
  },
  {
    id: "creatine-mono",
    name: "Pure Creatine",
    tagline: "Micronized creatine monohydrate",
    price: 1299,
    mrp: 1599,
    category: "Performance",
    image: leanShot,
    description:
      "100% pure micronized creatine monohydrate. The most studied performance supplement in the world for strength, power and lean mass.",
    benefits: ["5g per scoop", "Micronized for solubility", "Unflavoured", "Third-party tested"],
    howToUse: "1 scoop daily mixed with water or your shake.",
    ingredients: ["Creatine Monohydrate (Micronized)"],
    rating: 4.9,
    reviews: 1750,
  },
  {
    id: "bcaa-recover",
    name: "BCAA Recover",
    tagline: "Intra-workout amino fuel",
    price: 1599,
    mrp: 1999,
    category: "Recovery",
    image: plasmaMass,
    description:
      "An intra-workout amino blend with 7g BCAAs in the proven 2:1:1 ratio plus electrolytes for hydration and endurance.",
    benefits: ["7g BCAAs (2:1:1)", "Added electrolytes", "Sugar free", "Refreshing taste"],
    howToUse: "1 scoop in 500ml water during training.",
    ingredients: ["L-Leucine", "L-Isoleucine", "L-Valine", "Sodium", "Potassium"],
    rating: 4.7,
    reviews: 870,
  },
  {
    id: "glutamine",
    name: "Glutamine X",
    tagline: "Pure L-Glutamine for recovery",
    price: 1399,
    mrp: 1799,
    category: "Recovery",
    image: superWhey,
    description:
      "5g of pure L-Glutamine per serving to support post-training recovery, immunity and gut health.",
    benefits: ["5g L-Glutamine", "Supports recovery", "Unflavoured", "Easy mixing"],
    howToUse: "1 scoop post-workout or before bed.",
    ingredients: ["L-Glutamine"],
    rating: 4.8,
    reviews: 540,
  },
  {
    id: "multi-vit",
    name: "Daily Multi",
    tagline: "Athlete multivitamin & minerals",
    price: 899,
    mrp: 1199,
    category: "Essentials",
    image: myogenetix,
    description:
      "A complete daily multivitamin formulated for the demands of training. 23 essential vitamins and minerals.",
    benefits: ["23 vitamins & minerals", "Supports immunity", "Athlete formula", "Once daily"],
    howToUse: "1 tablet daily with food.",
    ingredients: ["Vitamin A–K", "Zinc", "Magnesium", "Iron", "Selenium"],
    rating: 4.6,
    reviews: 410,
  },
];

export const categories: { name: Category; description: string }[] = [
  { name: "Muscle", description: "Whey, gainers and lean-muscle support" },
  { name: "Performance", description: "Pre-workouts, creatine and thermogenics" },
  { name: "Recovery", description: "BCAAs, glutamine and intra-workout fuel" },
  { name: "Essentials", description: "Daily vitamins, fish oil and basics" },
];