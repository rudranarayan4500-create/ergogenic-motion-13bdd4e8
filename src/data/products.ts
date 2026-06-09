// User-supplied product imagery (Supabase storage public URLs)
const U = {
  // Hyper-NO Shot
  hyperNoFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.15.53 PM (1).jpeg",
  hyperNoBack1: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 5.12.52 PM.jpeg",
  hyperNoBack2: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 5.06.26 PM.jpeg",
  // Caffeine Shot
  caffeineFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-09 at 2.27.46 PM.jpeg",
  // Viper 3
  viperFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//98737dbc-d1ae-49e4-86bb-ddc9fc9f4565.png",
  viperFront2: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot%202026-06-09%20142302.png",
  viperBack: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.55.42 PM.jpeg",
  // Plasma Mass
  plasmaMassFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 1.16.35 PM (1).jpeg",
  plasmaMassBack: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-09 153607.png",
  // Super Whey
  superWheyFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-06 at 8.09.24 PM.jpeg",
  superWheyBack1: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-06 at 8.03.59 PM.jpeg",
  superWheyBack2: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-06 at 5.17.38 PM.jpeg",
  // Lean Shot
  leanShotFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 9.38.14 PM (1).jpeg",
  leanShotFront2: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-09 144649.png",
  leanShotFront3: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//61f8ac7f-e71f-4b22-a5e5-3c1451a49775.png",
  // AminoShot
  aminoShotFront: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.05.26 PM.jpeg",
  aminoShotBack1: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 9.04.52 PM.jpeg",
  aminoShotBack2: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.53.29 PM.jpeg",
  aminoShotDetail: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-09 153307.png",
  // GlutaShot
  glutaShotBack: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.15.34 PM.jpeg"
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
  flavours?: string[];
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
    gallery: [U.aminoShotFront, U.aminoShotBack1, U.aminoShotBack2, U.aminoShotDetail],
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
    flavours: ["Juicy Fruit Bubblegum"],
  },
  {
    id: "ergo-glutashot",
    name: "GlutaShot",
    tagline: "Pure L-Glutamine for repair and immunity",
    price: 1699,
    mrp: 2099,
    category: "Recovery",
    image: U.aminoShotFront, 
    gallery: [U.aminoShotFront, U.glutaShotBack],
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
    gallery: [U.viperFront, U.viperFront2, U.viperBack],
    description:
      "Viper-3 is a high voltage pre-workout for explosive energy, focus, pumps and endurance. Blue Raspberry Ice flavour.",
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
    flavours: ["Blue Raspberry Ice"],
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
  {
    id: "ergo-lean-shot",
    name: "Lean Shot",
    tagline: "Thermogenic fat burner for clean energy & focus",
    price: 1799,
    mrp: 2199,
    category: "Performance",
    image: U.leanShotFront,
    gallery: [U.leanShotFront, U.leanShotFront2, U.leanShotFront3],
    description:
      "Lean Shot is a powerful thermogenic formula designed to accelerate fat metabolism, boost energy and sharpen mental focus. Engineered for athletes who train with intensity.",
    benefits: ["Fat metabolism support", "Sustained clean energy", "Mental focus & clarity", "Thermogenic activation"],
    howToUse: "1 capsule 30 minutes before training. Do not exceed 2 per day.",
    ingredients: ["Caffeine Anhydrous", "Green Tea Extract", "L-Carnitine", "Cayenne Pepper Extract", "Black Pepper Extract"],
    rating: 4.7,
    reviews: 520,
  },
  {
    id: "ergo-plasma-mass",
    name: "Plasma Mass",
    tagline: "High-calorie mass builder for serious size",
    price: 3499,
    mrp: 3999,
    category: "Muscle",
    image: U.plasmaMassFront,
    gallery: [U.plasmaMassFront, U.plasmaMassBack],
    description:
      "Plasma Mass is a calorie-dense mass gainer formulated for athletes who need serious size and strength. Packed with protein, complex carbs and essential fats for maximum growth.",
    benefits: ["Rapid mass gains", "High protein & carbs", "Recovery support", "Dense caloric formula"],
    howToUse: "Mix 2 scoops (100g) with 400ml milk or water, post-workout or between meals.",
    ingredients: ["Whey Protein Concentrate", "Maltodextrin", "Creatine Monohydrate", "MCT Oil", "Vitamin & Mineral Blend"],
    rating: 4.8,
    reviews: 680,
  },
  {
    id: "ergo-super-whey",
    name: "Super Whey",
    tagline: "Premium cold-processed whey for lean muscle",
    price: 4499,
    mrp: 4999,
    category: "Muscle",
    image: U.superWheyFront,
    gallery: [U.superWheyFront, U.superWheyBack1, U.superWheyBack2],
    description:
      "Super Whey delivers 27g of cold-processed, micro-filtered whey protein isolate and concentrate per scoop. Zero amino spiking, lab-tested purity for serious athletes.",
    benefits: ["27g protein per scoop", "Cold-processed & micro-filtered", "Zero amino spiking", "Fast absorption"],
    howToUse: "Mix 1 scoop (33g) with 250ml water or milk, post-workout or anytime.",
    ingredients: ["Whey Protein Isolate", "Whey Protein Concentrate", "Cocoa Powder", "Natural Flavour", "Sweetener (Sucralose)"],
    rating: 4.9,
    reviews: 1240,
  },
];

export const categories: { name: Category; description: string }[] = [
  { name: "Muscle", description: "Whey, gainers and lean-muscle support" },
  { name: "Performance", description: "Pre-workouts, creatine and thermogenics" },
  { name: "Recovery", description: "BCAAs, glutamine and intra-workout fuel" },
  { name: "Essentials", description: "Daily vitamins, fish oil and basics" },
];