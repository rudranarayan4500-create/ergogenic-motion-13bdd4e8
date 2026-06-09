// User-supplied product imagery (Supabase storage public URLs)
const U = {
  // Micro-Power Creatine
  creatineFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.34.42 PM.jpeg",
  
  // Hyper-NO Shot
  hyperNoFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.15.53 PM (1).jpeg",
  hyperNoBack1: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 5.12.52 PM.jpeg",
  hyperNoBack2: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 5.06.26 PM.jpeg",
  
  // Caffeine Shot
  caffeineFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 9.44.38 PM.jpeg",
  
  // Viper-3
  viperFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//98737dbc-d1ae-49e4-86bb-ddc9fc9f4565.png",
  viperBack1: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot%202026-06-09%20142302.png",
  viperBack2: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.55.42 PM.jpeg",
  
  // AminoShot
  aminoShotFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.05.26 PM.jpeg",
  aminoShotBack1: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 9.04.52 PM.jpeg",
  aminoShotBack2: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.53.29 PM.jpeg",
  aminoShotNutritional: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-09 153307.png",
  
  // GlutaShot
  glutaShotFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.15.26 PM.jpeg",
  glutaShotBack: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.15.34 PM.jpeg",

  // Lean Shot (NEW)
  leanShotFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 9.38.14 PM (1).jpeg",
  leanShotBack1: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-09 144649.png",
  leanShotBack2: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//61f8ac7f-e71f-4b22-a5e5-3c1451a49775.png",

  // Plasma Mass (NEW)
  plasmaMassFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 1.16.35 PM (1).jpeg",
  plasmaMassBack: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-09 153607.png",

  // Super Whey (NEW)
  superWheyFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-06 at 8.09.24 PM.jpeg",
  superWheyBack1: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-06 at 8.03.59 PM.jpeg",
  superWheyBack2: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-06 at 5.17.38 PM.jpeg"
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
  flavours?: string[]; // Added flavours array specifically for your product variations
}

export const products: Product[] = [
  {
    id: "ergo-aminoshot",
    name: "AminoShot",
    tagline: "BCAA + L-Arginine + L-Glutamine recovery formula",
    price: 1999,
    mrp: 2499,
    category: "Recovery",
    image: U.aminoShotFront, 
    gallery: [U.aminoShotFront, U.aminoShotBack1, U.aminoShotBack2, U.aminoShotNutritional],
    flavours: ["Juicy Fruit Bubblegum"],
    description:
      "AminoShot delivers BCAAs, L-Arginine, L-Glutamine and beetroot powder for muscle recovery, pump support and endurance hydration. Juicy Fruit Bubblegum flavour.",
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
    image: U.glutaShotFront, 
    gallery: [U.glutaShotFront, U.glutaShotBack],
    flavours: ["Tropical Bliss"],
    description:
      "GlutaShot provides clinically dosed L-Glutamine for muscle repair, hydration and overall wellness. Tropical Bliss flavour.",
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
    image: U.viperFront, 
    gallery: [U.viperFront, U.viperBack1, U.viperBack2],
    flavours: ["Blue Berry Ice"],
    description:
      "Viper-3 is a high voltage pre-workout for explosive energy, focus, pumps and endurance. Features our refreshing Blue Berry Ice flavour profile.",
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
    id: "ergo-super-whey",
    name: "Super Whey",
    tagline: "Premium Whey Protein Blend",
    price: 4499,
    mrp: 5499,
    category: "Muscle",
    image: U.superWheyFront,
    gallery: [U.superWheyFront, U.superWheyBack1, U.superWheyBack2],
    flavours: ["Double Rich Chocolate", "Vanilla Cream"],
    description:
      "Super Whey is engineered to provide premium, fast-absorbing protein required to build lean muscle and support advanced recovery frameworks.",
    benefits: ["Builds lean muscle", "Accelerates recovery", "High bio-availability", "Zero added sugar"],
    howToUse: "Mix 1 heaping scoop with 200ml cold water or milk post-workout.",
    ingredients: ["Whey Protein Concentrate", "Whey Protein Isolate", "Digestive Enzymes", "Cocoa Powder"],
    rating: 4.9,
    reviews: 2150,
  },
  {
    id: "ergo-plasma-mass",
    name: "Plasma Mass",
    tagline: "Ultimate Lean Muscle Gainer",
    price: 2499,
    mrp: 3199,
    category: "Muscle",
    image: U.plasmaMassFront,
    gallery: [U.plasmaMassFront, U.plasmaMassBack],
    flavours: ["Chocolate Fudge"],
    description:
      "A high-calorie, clean macro-balanced mass gainer crafted to help hard gainers stack on serious lean mass efficiently and powerfully.",
    benefits: ["Rapid mass gains", "Complex carbohydrates", "Sustained protein release", "Enhanced caloric intake"],
    howToUse: "Mix 2 scoops with 300ml whole milk or water between meals.",
    ingredients: ["Maltodextrin", "Whey Protein Blend", "Creatine Monohydrate", "Vitamins & Minerals"],
    rating: 4.7,
    reviews: 890,
  },
  {
    id: "ergo-lean-shot",
    name: "Lean Shot Thermogenic",
    tagline: "Advanced Thermogenic Fat Burner",
    price: 1299,
    mrp: 1699,
    category: "Performance",
    image: U.leanShotFront,
    gallery: [U.leanShotFront, U.leanShotBack1, U.leanShotBack2],
    description:
      "Lean Shot is a high-potency thermogenic catalyst built to elevate your metabolic rate, increase calorie burn, and maintain focus during deficits.",
    benefits: ["Increases metabolism", "Supports fat oxidation", "Sharpens focus", "Appetite management"],
    howToUse: "Take 1 serving 30 minutes before morning cardio or training.",
    ingredients: ["L-Carnitine", "Green Tea Extract", "Caffeine Anhydrous", "Garcinia Cambogia"],
    rating: 4.6,
    reviews: 512,
  },
  {
    id: "ergo-micropower-creatine",
    name: "Micro-Power Creatine",
    tagline: "Micronized creatine for strength & power",
    price: 1499,
    mrp: 1899,
    category: "Performance",
    image: U.creatineFront,
    gallery: [U.creatineFront],
    flavours: ["Unflavored"],
    description:
      "Power Crea delivers pure micronized creatine monohydrate to support strength, power output and lean muscle.",
    benefits: ["5g micronized creatine", "Strength & power", "Faster recovery", "Lean muscle support"],
    howToUse: "Mix 1 scoop with water or your shake daily.",
    ingredients: ["Creatine Monohydrate (Micronized)"],
    rating: 4.9,
    reviews: 980,
  },
  {
    id: "ergo-caffeine-shot",
    name: "Caffeine Shot Caplets",
    tagline: "Energy caplets — push limits",
    price: 899,
    mrp: 1199,
    category: "Performance",
    image: U.caffeineFront,
    gallery: [U.caffeineFront],
    description:
      "60 caplets of pure Caffeine Anhydrous for instant energy and performance. Push your limits with every dose.",
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
    image: U.hyperNoFront,
    gallery: [U.hyperNoFront, U.hyperNoBack1, U.hyperNoBack2],
    description:
      "60 caplets of L-Citrulline Malate and L-Arginine for nitric oxide pumps, strength and lean muscle building.",
    benefits: ["Bigger pumps", "Lean muscle support", "Strength gains", "60 caplets per bottle"],
    howToUse: "2 caplets 30 minutes before training.",
    ingredients: ["L-Citrulline Malate", "L-Arginine"],
    rating: 4.8,
    reviews: 410,
  },
];

export const categories: { name: Category; description: string }[] = [
  { name: "Muscle", description: "Whey, gainers and lean-muscle support" },
  { name: "Performance", description: "Pre-workouts, creatine and thermogenics" },
  { name: "Recovery", description: "BCAAs, glutamine and intra-workout fuel" },
  { name: "Essentials", description: "Daily vitamins, fish oil and basics" },
];