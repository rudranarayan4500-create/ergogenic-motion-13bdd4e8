
// User-supplied product imagery (Supabase storage public URLs)
const U = {
  creatineFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 2.40.35 PM.jpeg",
  creatineBack: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-05-31 at 9.30.47 PM.jpeg",
  leanShotFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-06 at 8.03.59 PM.jpeg",
  superWheyFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-05-31 at 8.13.03 PM.jpeg",
  superWheyBack: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-05-31 at 8.15.32 PM.jpeg",
};

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
  gallery?: string[];
}

export const products: Product[] = [
  {
    id: "ergo-aminoshot",
    name: "AminoShot",
    tagline: "BCAA + L-Arginine + L-Glutamine recovery formula",
    price: 1999,
    mrp: 2499,
    category: "Recovery",
    image: "/public/placeholder.svg",
    gallery: [],
    description:
      "AminoShot delivers BCAAs, L-Arginine, L-Glutamine and beetroot powder for muscle recovery, pump support and endurance hydration. Juicy Fruit Bubblegum flavour. Coming soon!",
    benefits: [
      "Muscle recovery",
      "Pump support",
      "Endurance & hydration",
      "Refreshing bubblegum flavour",
    ],
    howToUse: "Mix 1 scoop (10g) with 250ml water, intra or post-workout.",
    ingredients: ["BCAA", "L-Arginine", "L-Glutamine", "Beetroot Powder", "Sweetener (INS 955)"],
    rating: 4.8,
    reviews: 612,
  },
  {
    id: "ergo-glutashot",
    name: "GlutaShot",
    tagline: "Pure L-Glutamine for repair and immunity",
    price: 1699,
    mrp: 2099,
    category: "Recovery",
    image: "/public/placeholder.svg",
    gallery: [],
    description:
      "GlutaShot provides clinically dosed L-Glutamine for muscle repair, hydration and overall wellness. Tropical Bliss flavour. Coming soon!",
    benefits: ["Muscle repair", "Hydration & wellness", "Immunity support", "Easy mixing"],
    howToUse: "Mix 1 scoop with 200ml water, post-workout or before bed.",
    ingredients: ["L-Glutamine", "Acidity Regulator (INS 296)", "Sweetener (INS 955)", "Tropical Bliss Flavour"],
    rating: 4.8,
    reviews: 488,
  },
  {
    id: "ergo-viper-3",
    name: "Viper-3 Pre-Workout",
    tagline: "High voltage performance pre-workout",
    price: 2299,
    mrp: 2799,
    category: "Performance",
    image: "/public/placeholder.svg",
    gallery: [],
    description:
      "Viper-3 is a high voltage pre-workout for explosive energy, focus, pumps and endurance. Blue Raspberry Ice flavour. Coming soon!",
    benefits: [
      "Energy & focus",
      "Muscle pump support",
      "Endurance & performance",
      "Speed and vascularity",
    ],
    howToUse: "Mix 1 scoop (7.5g) with 250ml water 20 minutes before training.",
    ingredients: ["L-Citrulline", "Beta Alanine", "Caffeine Anhydrous", "Taurine", "L-Tyrosine", "L-Theanine"],
    rating: 4.9,
    reviews: 1342,
  },
  {
    id: "ergo-micropower-creatine",
    name: "Micro-Power Creatine",
    tagline: "Micronized creatine for strength & power",
    price: 1499,
    mrp: 1899,
    category: "Performance",
    image: U.creatineFront,
    gallery: [U.creatineFront, U.creatineFront, U.creatineBack],
    description:
      "Power Crea delivers pure micronized creatine monohydrate to support strength, power output and lean muscle.",
    benefits: ["5g micronized creatine", "Strength & power", "Faster recovery", "Lean muscle support"],
    howToUse: "Mix 1 scoop with water or your shake daily.",
    ingredients: ["Creatine Monohydrate (Micronized)"],
    rating: 4.9,
    reviews: 980,
  },
  {
    id: "ergo-lean-shot",
    name: "Lean Shot Thermogenic",
    tagline: "Ultra potent fat burning formula",
    price: 1899,
    mrp: 2399,
    category: "Performance",
    image: U.leanShotFront,
    gallery: [U.leanShotFront, U.leanShotFront, U.leanShotFront],
    description:
      "Lean Shot supports fat metabolism, energy, focus and vitality. Tropical Mango flavour.",
    benefits: ["Fat loss support", "Energy & endurance", "Focus & clarity", "Overall vitality"],
    howToUse: "1 scoop with 200ml water 20 minutes before training or fasted cardio.",
    ingredients: ["L-Carnitine L-Tartrate", "CLA", "Green Coffee Bean Extract", "Caffeine Anhydrous"],
    rating: 4.7,
    reviews: 870,
  },
  {
    id: "super-whey",
    name: "Super Whey",
    tagline: "27g premium whey protein blend",
    price: 4499,
    mrp: 5499,
    category: "Muscle",
    image: U.superWheyFront,
    gallery: [U.superWheyFront, U.superWheyFront, U.superWheyBack],
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
    image: "/public/placeholder.svg",
    gallery: [],
    description:
      "Plasma Mass is engineered for hard gainers who need clean calories. Each serving packs 60g of complex carbs and 30g of protein with zero junk fillers. Built for strength, recovery and serious size. Coming soon!",
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
    id: "ergo-caffeine-shot",
    name: "Caffeine Shot Caplets",
    tagline: "Energy caplets — push limits",
    price: 899,
    mrp: 1199,
    category: "Performance",
    image: "/public/placeholder.svg",
    gallery: [],
    description:
      "60 caplets of pure Caffeine Anhydrous for instant energy and performance. Push your limits with every dose. Coming soon!",
    benefits: ["Instant energy", "Sharper focus", "Performance boost", "60 caplets per bottle"],
    howToUse: "1 caplet 30 minutes before training. Do not exceed 2 per day.",
    ingredients: ["Caffeine Anhydrous"],
    rating: 4.7,
    reviews: 320,
  },
  {
    id: "ergo-hyperno-shot",
    name: "Hyper-NO Caplets",
    tagline: "Strength & muscle pump caplets",
    price: 999,
    mrp: 1299,
    category: "Performance",
    image: "/public/placeholder.svg",
    gallery: [],
    description:
      "60 caplets of L-Citrulline Malate and L-Arginine for nitric oxide pumps, strength and lean muscle building. Coming soon!",
    benefits: ["Bigger pumps", "Lean muscle support", "Strength gains", "60 caplets per bottle"],
    howToUse: "2 caplets 30 minutes before training.",
    ingredients: ["L-Citrulline Malate", "L-Arginine"],
    rating: 4.8,
    reviews: 410,
  },
  {
    id: "ergo-ginseng",
    name: "Ginseng Energy Caplets",
    tagline: "Korean Red Ginseng for daily fuel",
    price: 1299,
    mrp: 1599,
    category: "Essentials",
    image: "/public/placeholder.svg",
    gallery: [],
    description:
      "60 caplets of Korean Red Ginseng Extract to fuel your day with sustained energy and vitality. Coming soon!",
    benefits: ["Fuel your day", "Sustained energy", "Daily vitality", "60 caplets per bottle"],
    howToUse: "1 caplet daily with food.",
    ingredients: ["Korean Red Ginseng Extract"],
    rating: 4.8,
    reviews: 240,
  },
];

export const categories: { name: Category; description: string }[] = [
  { name: "Muscle", description: "Whey, gainers and lean-muscle support" },
  { name: "Performance", description: "Pre-workouts, creatine and thermogenics" },
  { name: "Recovery", description: "BCAAs, glutamine and intra-workout fuel" },
  { name: "Essentials", description: "Daily vitamins, fish oil and basics" },
];