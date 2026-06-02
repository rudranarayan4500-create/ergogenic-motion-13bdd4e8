import leanShot from "@/assets/product-leanshot.png";
import plasmaMass from "@/assets/product-plasmamass.png";
import superWhey from "@/assets/product-superwhey.png";
import myogenetix from "@/assets/product-myogenetix.png";
import ergo11 from "@/assets/brand/ergo-11.png.asset.json";
import ergo12 from "@/assets/brand/ergo-12.png.asset.json";
import ergo13 from "@/assets/brand/ergo-13.png.asset.json";
import ergo14 from "@/assets/brand/ergo-14.png.asset.json";
import ergo15 from "@/assets/brand/ergo-15.png.asset.json";
import ergo16 from "@/assets/brand/ergo-16.png.asset.json";
import ergo17 from "@/assets/brand/ergo-17.png.asset.json";

const B = {
  aminoshot: ergo11.url,
  aminoshotAlt: ergo13.url,
  glutashot: ergo12.url,
  vitalshock: ergo14.url,
  leanshot: ergo15.url,
  superwhey: ergo16.url,
  plasmamass: ergo17.url,
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
    image: B.aminoshot,
    gallery: [B.aminoshot, B.aminoshotAlt, B.glutashot],
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
    image: B.glutashot,
    gallery: [B.glutashot, B.aminoshotAlt, B.vitalshock],
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
    image: B.leanshot,
    gallery: [B.leanshot, B.aminoshot, B.plasmamass],
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
  },
  {
    id: "ergo-micropower-creatine",
    name: "Micro-Power Creatine",
    tagline: "Micronized creatine for strength & power",
    price: 1499,
    mrp: 1899,
    category: "Performance",
    image: B.leanshot,
    gallery: [B.leanshot, B.plasmamass, B.superwhey],
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
    image: B.leanshot,
    gallery: [B.leanshot, B.aminoshot, B.vitalshock],
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
    image: B.superwhey,
    gallery: [B.superwhey, B.plasmamass, B.leanshot],
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
    image: B.plasmamass,
    gallery: [B.plasmamass, B.superwhey, B.leanshot],
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
    id: "ergo-caffeine-shot",
    name: "Caffeine Shot Caplets",
    tagline: "Energy caplets — push limits",
    price: 899,
    mrp: 1199,
    category: "Performance",
    image: B.vitalshock,
    gallery: [B.vitalshock, B.leanshot, B.aminoshot],
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
    image: B.vitalshock,
    gallery: [B.vitalshock, B.leanshot, B.aminoshot],
    description:
      "60 caplets of L-Citrulline Malate and L-Arginine for nitric oxide pumps, strength and lean muscle building.",
    benefits: ["Bigger pumps", "Lean muscle support", "Strength gains", "60 caplets per bottle"],
    howToUse: "2 caplets 30 minutes before training.",
    ingredients: ["L-Citrulline Malate", "L-Arginine"],
    rating: 4.8,
    reviews: 410,
  },
  {
    id: "ergo-amino-shot-caplets",
    name: "Amino Shot Caplets",
    tagline: "BCAA endurance caplets",
    price: 1099,
    mrp: 1399,
    category: "Recovery",
    image: B.aminoshotAlt,
    gallery: [B.aminoshotAlt, B.aminoshot, B.glutashot],
    description:
      "60 caplets of BCAAs to support endurance, reduce fatigue and accelerate recovery.",
    benefits: ["Go further", "Reduced fatigue", "Faster recovery", "60 caplets per bottle"],
    howToUse: "2 caplets pre or intra-workout.",
    ingredients: ["BCAAs (Leucine, Isoleucine, Valine)"],
    rating: 4.7,
    reviews: 280,
  },
  {
    id: "ergo-v-shot",
    name: "V-Shot Multivitamin",
    tagline: "Focus & recovery multivitamin caplets",
    price: 1199,
    mrp: 1499,
    category: "Essentials",
    image: B.vitalshock,
    gallery: [B.vitalshock, B.glutashot, B.aminoshot],
    description:
      "60 multivitamin caplets with the complete B-complex, vitamins A, C, D, E, K and essential minerals to stay sharp and rebuild faster.",
    benefits: ["Stay sharp", "Rebuild faster", "Complete vitamins & minerals", "Athlete formula"],
    howToUse: "1 caplet daily with food.",
    ingredients: ["Vitamins A, B-Complex, C, D, E, K", "Calcium", "Iron", "Magnesium", "Zinc", "Biotin", "Folic Acid"],
    rating: 4.7,
    reviews: 360,
  },
  {
    id: "ergo-ginseng",
    name: "Ginseng Energy Caplets",
    tagline: "Korean Red Ginseng for daily fuel",
    price: 1299,
    mrp: 1599,
    category: "Essentials",
    image: B.vitalshock,
    gallery: [B.vitalshock, B.leanshot, B.glutashot],
    description:
      "60 caplets of Korean Red Ginseng Extract to fuel your day with sustained energy and vitality.",
    benefits: ["Fuel your day", "Sustained energy", "Daily vitality", "60 caplets per bottle"],
    howToUse: "1 caplet daily with food.",
    ingredients: ["Korean Red Ginseng Extract"],
    rating: 4.8,
    reviews: 240,
  },
  {
    id: "myogenetix-whey",
    name: "Myogenetix Concentrate",
    tagline: "Daily whey protein concentrate",
    price: 2499,
    mrp: 2999,
    category: "Essentials",
    image: B.superwhey,
    gallery: [B.superwhey, B.plasmamass, B.leanshot],
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
    image: B.leanshot,
    gallery: [B.leanshot, B.plasmamass, B.superwhey],
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
    image: B.aminoshot,
    gallery: [B.aminoshot, B.aminoshotAlt, B.glutashot],
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
    image: B.glutashot,
    gallery: [B.glutashot, B.aminoshotAlt, B.vitalshock],
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
    image: B.vitalshock,
    gallery: [B.vitalshock, B.glutashot, B.aminoshot],
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