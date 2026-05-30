import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  ChevronRight, Star, SlidersHorizontal, RotateCcw, Sliders, CheckSquare, 
  Square, Activity, ShieldCheck, ArrowDown, Zap, Dumbbell, Sparkles, HeartPulse, 
  ShieldAlert, ChevronDown, ChevronUp 
} from "lucide-react";
import { categories, products, type Category } from "@/data/products";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Products = () => {
  const [params, setParams] = useSearchParams();
  
  // Advanced Filter Matrix States
  const initialCat = (params.get("cat") as Category | null) ?? null;
  const [activeCategory, setActiveCategory] = useState<Category | null>(initialCat);
  const [maxPrice, setMaxPrice] = useState<number>(7000);
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [selectedActivity, setSelectedActivity] = useState<string>("all");
  const [showOutOfStock, setShowOutOfStock] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Live Logistics Countdown State
  const [timeLeft, setTimeLeft] = useState("24:00:00");

  // Accordion Sidebar Open/Close States
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    gender: true,
    category: true,
    brand: false,
    price: true,
    size: false,
    color: false,
    activity: false,
    origin: false,
  });

  // Calculate Dispatch Timer Loop
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const cutoff = new Date();
      
      // Set daily container lockdown cutoff threshold to 4:00 PM
      cutoff.setHours(16, 0, 0, 0);

      if (now.getTime() > cutoff.getTime()) {
        cutoff.setDate(cutoff.getDate() + 1);
      }

      const difference = cutoff.getTime() - now.getTime();

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFilterSection = (section: string) => {
    setExpandedFilters(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (c: Category | null) => {
    setActiveCategory(c);
    if (c) setParams({ cat: c }); else setParams({});
  };

  const resetFilters = () => {
    setActiveCategory(null);
    setMaxPrice(7000);
    setSelectedGender("all");
    setSelectedSize("all");
    setSelectedActivity("all");
    setShowOutOfStock(true);
    setSortBy("featured");
    setParams({});
  };

  // Advanced Filtering Matrix Logic Engine
  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }
    result = result.filter((p) => p.price <= maxPrice);
    if (!showOutOfStock) {
      result = result.filter((p) => p.reviews > 5); 
    }
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [activeCategory, maxPrice, showOutOfStock, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeCategory) count++;
    if (maxPrice < 7000) count++;
    if (selectedGender !== "all") count++;
    if (selectedSize !== "all") count++;
    if (selectedActivity !== "all") count++;
    if (!showOutOfStock) count++;
    return count;
  }, [activeCategory, maxPrice, selectedGender, selectedSize, selectedActivity, showOutOfStock]);

  const sectionContainerVariants = {
    hidden: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.05 }
    }
  };

  const textGlideUpVariants = {
    hidden: { opacity: 0, y: 60 },
    whileInView: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const imageScrollZoomVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    whileInView: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-primary selection:text-black overflow-x-hidden antialiased">
      
      {/* ==================== SECTION 1: CULT SYSTEM HERO BANNERS ==================== */}
      <header className="py-24 md:py-36 bg-black border-b border-neutral-900 relative overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-xs font-mono tracking-[0.3em] text-primary uppercase block font-bold"
          >
            ERGOGENIC LABS · CULT ECOSYSTEM
          </motion.span>

          {/* TYPEWRITER TITLE ANIMATION EFFECT */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white select-none">
            {"THE COMPLETE ARSENAL".split("").map((letter, idx) => (
              <motion.span
                key={`typewriter-char-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.04, delay: idx * 0.06, ease: "linear" }}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block w-1.5 h-8 sm:h-12 md:h-16 bg-primary ml-1 translate-y-1"
            />
          </h1>

          {/* CONTINUOUS FLOWING GLOW GRADIENT EFFECT SUBTITLE */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              backgroundImage: "linear-gradient(110deg, #737373, 40%, #ffffff, 50%, #ffffff, 60%, #737373)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 100%",
            }}
            className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed font-light animate-[shimmer_5s_infinite_linear]"
          >
            Engineered with pharmaceutical rigor. No artificial fillers, full compound disclosures, and peak threshold performance pacing.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="flex justify-center pt-6"
          >
            <ArrowDown className="animate-bounce text-primary h-5 w-5" />
          </motion.div>
        </div>
      </header>

      {/* ==================== HIGH-URGENCY PERFORMANCE METRICS & COUNTDOWN STRIP ==================== */}
      <div className="bg-neutral-950 border-b border-neutral-900 py-8">
        <div className="container max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="block text-2xl md:text-4xl font-black text-white tracking-tight">500K+</span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500 font-bold block">Athletes Served</span>
          </div>
          <div className="space-y-1">
            <span className="block text-2xl md:text-4xl font-black text-primary tracking-tight">100%</span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500 font-bold block">Label Disclosures</span>
          </div>
          <div className="space-y-1">
            <span className="block text-2xl md:text-4xl font-black text-white tracking-tight">WADA / ISO</span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500 font-bold block">Certified Batches</span>
          </div>
          {/* Real-time Countdown Element */}
          <div className="space-y-1">
            <span className="block text-2xl md:text-4xl font-black font-mono tracking-tighter text-orange-500 tabular-nums">
              {timeLeft}
            </span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-400 font-extrabold block">Fulfillment Dispatch Countdown</span>
          </div>
        </div>
      </div>

      {/* ==================== SECTION 2: HIGH DENSITY INTERACTIVE STORE GRID ==================== */}
      <section className="py-16 bg-black">
        <div className="container max-w-[1600px] mx-auto px-4 font-sans">
          
          {/* CATALOG STRIP CONTROLS */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-bold uppercase tracking-wider text-white">
                <SlidersHorizontal className="h-3.5 w-3.5 text-primary stroke-[2.5]" />
                <span>Filter ({activeFilterCount})</span>
              </div>
              <span className="text-neutral-500 text-xs font-mono border-l border-neutral-800 pl-3">
                {filteredProducts.length} products
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-neutral-500 text-xs font-medium uppercase tracking-wider">Sort by</span>
              <select 
                value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-b border-transparent text-xs font-bold uppercase tracking-wide text-neutral-200 focus:outline-none focus:border-primary cursor-pointer transition-colors px-1 py-0.5"
              >
                <option value="featured" className="bg-black">Featured</option>
                <option value="price-low" className="bg-black">Price: Low to High</option>
                <option value="price-high" className="bg-black">Price: High to Low</option>
                <option value="rating" className="bg-black">Customer Rating</option>
              </select>
            </div>
          </div>

          <div className="grid xl:grid-cols-[260px_1fr] gap-10 items-start">
            
            {/* STARK ACCORDION FILTER SIDEBAR */}
            <aside className="space-y-1 hidden xl:block pr-4  sticky top-24 max-h-[80vh] overflow-y-auto scrollbar-none text-left border-r border-neutral-900">
              
              {/* ACCORDION MODULE 1: GENDER */}
              <div className="border-b border-neutral-900 py-3.5">
                <button onClick={() => toggleFilterSection("gender")} className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-300">
                  <span>Gender</span>
                  {expandedFilters.gender ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <AnimatePresence initial={false}>
                  {expandedFilters.gender && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-3 space-y-2 text-xs text-neutral-400">
                      <label className="flex items-center gap-2 cursor-pointer hover:text-white"><input type="checkbox" defaultChecked className="accent-primary" /> Unisex</label>
                      <label className="flex items-center gap-2 cursor-pointer hover:text-white"><input type="checkbox" className="accent-primary" /> Men</label>
                      <label className="flex items-center gap-2 cursor-pointer hover:text-white"><input type="checkbox" className="accent-primary" /> Women</label>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ACCORDION MODULE 2: CATEGORY */}
              <div className="border-b border-neutral-900 py-3.5">
                <button onClick={() => toggleFilterSection("category")} className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-300">
                  <span>Category</span>
                  {expandedFilters.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <AnimatePresence initial={false}>
                  {expandedFilters.category && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-3 max-h-[200px] overflow-y-auto scrollbar-none space-y-1">
                      <button onClick={() => handleCategoryChange(null)} className={cn("w-full text-left py-1 px-2 rounded text-xs", !activeCategory ? "bg-neutral-900 text-primary font-bold" : "text-neutral-400 hover:bg-neutral-900/40")}>All System Lines</button>
                      {categories.map((c) => (
                        <button key={c.name} onClick={() => handleCategoryChange(c.name)} className={cn("w-full text-left py-1 px-2 rounded text-xs truncate", activeCategory === c.name ? "bg-neutral-900 text-primary font-bold" : "text-neutral-400 hover:bg-neutral-900/40")}>
                          {c.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ACCORDION MODULE 3: BRAND */}
              <div className="border-b border-neutral-900 py-3.5">
                <button onClick={() => toggleFilterSection("brand")} className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-300">
                  <span>Brand</span>
                  {expandedFilters.brand ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {/* ACCORDION MODULE 4: PRICE */}
              <div className="border-b border-neutral-900 py-3.5">
                <button onClick={() => toggleFilterSection("price")} className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-300">
                  <span>Price</span>
                  {expandedFilters.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <AnimatePresence initial={false}>
                  {expandedFilters.price && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-3 pb-1 space-y-2">
                      <input type="range" min="900" max="7000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-primary bg-neutral-800 h-1 rounded cursor-pointer" />
                      <div className="flex justify-between text-[11px] font-mono text-neutral-500 font-bold"><span>₹900</span><span>₹{maxPrice.toLocaleString()}</span></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ACCORDION MODULE 5: SIZE */}
              <div className="border-b border-neutral-900 py-3.5">
                <button onClick={() => toggleFilterSection("size")} className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-300">
                  <span>Size</span>
                  {expandedFilters.size ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {/* ACCORDION MODULE 6: COLOR */}
              <div className="border-b border-neutral-900 py-3.5">
                <button onClick={() => toggleFilterSection("color")} className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-300">
                  <span>Color</span>
                  {expandedFilters.color ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {/* ACCORDION MODULE 7: ACTIVITY */}
              <div className="border-b border-neutral-900 py-3.5">
                <button onClick={() => toggleFilterSection("activity")} className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-300">
                  <span>Activity</span>
                  {expandedFilters.activity ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {/* ACCORDION MODULE 8: COUNTRY OF ORIGIN */}
              <div className="border-b border-neutral-900 py-3.5">
                <button onClick={() => toggleFilterSection("origin")} className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-300">
                  <span>Country Of Origin</span>
                  {expandedFilters.origin ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
            </aside>

            {/* PRECISE CLONE STOREFRONT LAYOUT - IMAGES FILL CONTAINER COMPLETELY */}
            <div className="space-y-6">
              
              {/* Mobile quick swipe horizontal layout fallbacks */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 xl:hidden scrollbar-none">
                <Button 
                  variant={activeCategory === null ? "default" : "outline"} size="sm" 
                  onClick={() => handleCategoryChange(null)} className="rounded-full text-[10px] uppercase font-bold tracking-wider h-7 px-3 shrink-0"
                >
                  All Items
                </Button>
                {categories.map((c) => (
                  <Button
                    key={c.name} variant={activeCategory === c.name ? "default" : "outline"} size="sm"
                    onClick={() => handleCategoryChange(c.name)} className="rounded-full text-[10px] uppercase font-bold tracking-wider h-7 px-3 shrink-0"
                  >
                    {c.name}
                  </Button>
                ))}
              </div>

              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((p, index) => {
                    const isNewArrival = index === 0 || index === 4;
                    const isPriceDrop = index === 2;

                    return (
                      <motion.div
                        key={p.id} layout
                        initial={{ opacity: 0, y: 20, scale: 0.96 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        exit={{ opacity: 0, scale: 0.93 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="group flex flex-col text-left relative"
                      >
                        {/* CULT FULL IMAGE BACKDROP BOX */}
                        <div className="w-full aspect-square relative bg-[#141414] rounded-none mb-3.5 flex items-center justify-center overflow-hidden border border-neutral-900/60">
                          <Link to={`/products/${p.id}`} className="w-full h-full block cursor-pointer">
                            <img
                              src={p.image} alt={p.name} loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          </Link>

                          {/* REPLICATED STICKERS */}
                          {isNewArrival && (
                            <div className="absolute top-0 left-0 bg-white text-black font-mono font-black text-[9px] tracking-widest px-2.5 py-1 uppercase">
                              New Arrival
                            </div>
                          )}
                          {isPriceDrop && (
                            <div className="absolute top-0 left-0 bg-primary text-black font-mono font-black text-[9px] tracking-widest px-2.5 py-1 uppercase">
                              Price Drop
                            </div>
                          )}
                        </div>

                        {/* PRODUCT CONTENT CARD INFO STACK */}
                        <div className="space-y-1 px-0.5">
                          <h3 className="text-[13px] font-bold tracking-tight text-neutral-200 group-hover:text-primary transition-colors line-clamp-1">
                            <Link to={`/products/${p.id}`}>{p.name}</Link>
                          </h3>
                          
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500">
                            <div className="flex items-center text-amber-500">
                              <Star className="h-3 w-3 fill-current stroke-none" /> 
                              <span className="text-neutral-300 ml-0.5 font-sans">{p.rating || 4.5}</span>
                            </div>
                            <span className="text-neutral-800">|</span>
                            <span className="font-medium text-neutral-500 font-mono">{p.reviews || 12} Reviews</span>
                          </div>

                          <div className="flex items-center gap-2 pt-0.5 text-xs">
                            <span className="font-extrabold text-white text-sm">₹{p.price.toLocaleString()}</span>
                            <span className="text-neutral-600 line-through font-medium">₹{p.mrp.toLocaleString()}</span>
                            <span className="text-primary font-black text-[11px]">
                              {Math.round((1 - p.price / p.mrp) * 100)}% OFF
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-24 border border-dashed border-neutral-900 rounded-2xl bg-neutral-950/20">
                  <p className="text-neutral-500 text-xs font-medium">No matching items found within matrix choice bounds.</p>
                  <button onClick={resetFilters} className="text-primary text-[10px] uppercase font-bold tracking-wider mt-3 hover:underline">Reset Parameters</button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: ALTERNATING FEATURE HIGHLIGHT SHUFFLE ==================== */}
      <section className="py-28 bg-neutral-950 border-t border-neutral-900 relative">
        <div className="absolute top-1/2 left-1/2 w-[550px] h-[550px] bg-primary/[0.02] rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container max-w-7xl mx-auto px-4 space-y-40 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono tracking-widest text-primary uppercase block">Deep Performance Architecture</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">INNOVATION HIGHLIGHTS</h2>
            <p className="text-neutral-400 text-xs md:text-sm max-w-lg mx-auto font-light">Explore biological trace configurations designed to secure baseline nutrient absorption spikes efficiently.</p>
          </div>

          {products.slice(0, 3).map((p, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={`feature-row-${p.id}`}
                variants={sectionContainerVariants}
                initial="hidden"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-120px" }}
                className={cn(
                  "flex flex-col gap-16 items-center justify-between w-full p-8 md:p-16 rounded-3xl bg-black border border-neutral-900 relative overflow-hidden group",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                <div className={cn(
                  "absolute w-[360px] h-[360px] rounded-[50%] blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none -z-10",
                  isEven ? "-right-20 -top-20 bg-primary/20" : "-left-20 -bottom-20 bg-primary/20"
                )} />

                {/* TEXT LAYER: RISING TRANSITIONS */}
                <motion.div variants={textGlideUpVariants} className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900/80 border border-neutral-800 rounded-md">
                    <Activity className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[9px] uppercase tracking-widest font-mono text-neutral-300 font-bold">Phase 0{idx + 1} Matrix Deployment</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none group-hover:text-primary transition-colors duration-300">
                    {p.name}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {p.tagline} Engineered cleanly to secure maximum cellular integration, tracking perfectly into elite performance workloads.
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-left">
                    <div className="p-3 bg-neutral-950 border border-neutral-900 rounded-xl">
                      <span className="block text-[8px] font-mono text-neutral-500 uppercase">Rating Index</span>
                      <span className="text-base font-black text-white flex items-center gap-1 mt-0.5">{p.rating} <Star className="h-3 w-3 fill-primary text-primary" /></span>
                    </div>
                    <div className="p-3 bg-neutral-950 border border-neutral-900 rounded-xl">
                      <span className="block text-[8px] font-mono text-neutral-500 uppercase">Purity Core</span>
                      <span className="text-xs font-bold text-primary block mt-0.5 uppercase tracking-wide">99.2% Isolate</span>
                    </div>
                    <div className="p-3 bg-neutral-950 border border-neutral-900 rounded-xl">
                      <span className="block text-[8px] font-mono text-neutral-500 uppercase">Bioavailability</span>
                      <span className="text-xs font-bold text-white block mt-0.5 uppercase">Maximized Stack</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link to={`/products/${p.id}`}>
                      <Button className="bg-primary hover:bg-primary/90 text-black font-extrabold text-xs uppercase tracking-widest rounded-xl px-6 py-5 transition-all group-hover:translate-x-1">
                        Inspect Formulation <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* IMAGE LAYER: SCROLL DRIVEN ENTRANCE ZOOM EFFECT */}
                <motion.div variants={imageScrollZoomVariants} className="w-full lg:w-1/2 flex items-center justify-center relative">
                  <Link to={`/products/${p.id}`} className="relative w-full max-w-[300px] md:max-w-[380px] aspect-square block cursor-pointer">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-[70px] pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                    <img
                      src={p.image} alt={p.name} loading="lazy"
                      className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-4 group-hover:rotate-2"
                    />
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ==================== SECTION 4: SUBSCRIPTION MEMBERSHIP PASSES ==================== */}
      <section className="py-24 bg-black border-t border-neutral-900 relative">
        <div className="container max-w-6xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
              <Zap className="h-3 w-3" /> System Subscriptions Matrix
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">CHOOSE YOUR SUBSCRIPTION PASS</h2>
            <p className="text-neutral-400 text-xs md:text-sm">Unlock automated nutritional drops dispatched straight into continuous priority logistics pipelines.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            
            {/* ELITE COMPUND PASS CARD */}
            <div className="bg-gradient-to-b from-neutral-950 to-neutral-900 border border-primary/20 p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-primary text-black font-black font-mono px-4 py-1 rounded-bl-xl text-[9px] uppercase tracking-widest">
                Recommended Lineup
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-none">CULT-ELITE ACCELERATOR</h3>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mt-1">Full Compound Bundle System</span>
                  </div>
                </div>

                <p className="text-neutral-400 text-xs font-light leading-relaxed">
                  Grants ongoing automated recurring drop-cycles containing core micro-filtered isolates and performance stack configurations safely.
                </p>

                <ul className="space-y-2 text-xs font-medium text-neutral-300">
                  <li className="flex items-center gap-2"><Dumbbell className="h-3.5 w-3.5 text-primary" /> Access rights across Partner Center Gym Networks</li>
                  <li className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-primary" /> Custom 1-on-1 AI Digital Macro Tracker Profiles</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Guaranteed High-Priority Supply Allocation Locking</li>
                </ul>
              </div>

              <div className="pt-8 border-t border-neutral-800 mt-8 flex items-end justify-between">
                <div>
                  <span className="block text-[10px] uppercase font-mono text-neutral-500">Subscription Cost</span>
                  <span className="text-3xl font-black text-white tracking-tight">₹4,499<span className="text-xs font-light text-neutral-500">/mo</span></span>
                </div>
                <Button className="bg-primary text-black font-black uppercase text-xs tracking-wider px-6 rounded-xl h-11">
                  Activate Pass
                </Button>
              </div>
            </div>

            {/* BASE PRO PASS CARD */}
            <div className="bg-neutral-950 border border-neutral-900 p-8 rounded-3xl flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                    <HeartPulse className="h-6 w-6 text-neutral-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-400 leading-none">CULT-PRO BASELINE</h3>
                    <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider block mt-1">Core Micronutrient Foundations</span>
                  </div>
                </div>

                <p className="text-neutral-400 text-xs font-light leading-relaxed">
                  Tailored to automate baseline replenishment supplies across fundamental mineral packs, multivitamin traces, and daily multi-stacks.
                </p>

                <ul className="space-y-2 text-xs font-medium text-neutral-400">
                  <li className="flex items-center gap-2"><Dumbbell className="h-3.5 w-3.5 text-neutral-600" /> Standard Logistics Fulfillment Timelines</li>
                  <li className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-neutral-600" /> Auto-Replenish Courier Tracking Records</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-neutral-600" /> Complete Batch Verification Certification Logs</li>
                </ul>
              </div>

              <div className="pt-8 border-t border-neutral-900 mt-8 flex items-end justify-between">
                <div>
                  <span className="block text-[10px] uppercase font-mono text-neutral-500">Subscription Cost</span>
                  <span className="text-3xl font-black text-white tracking-tight">₹2,199<span className="text-xs font-light text-neutral-500">/mo</span></span>
                </div>
                <Button variant="outline" className="border-neutral-800 text-neutral-300 hover:bg-white hover:text-black font-black uppercase text-xs tracking-wider px-6 rounded-xl h-11">
                  Deploy Pro Pass
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== SECTION 5: CLINICAL VERIFIED LEGAL LEDGER ==================== */}
      <section className="py-24 bg-neutral-950 border-t border-neutral-900">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="bg-black border border-neutral-900 rounded-3xl p-8 md:p-12 grid md:grid-cols-[1fr_2px_1fr] gap-8 items-center">
            
            <div className="space-y-4 text-left">
              <div className="h-8 w-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <ShieldAlert className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">THE TRANSPARENCY ASSURANCES</h3>
              <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
                We believe you have the absolute legal right to evaluate raw structural matrix details completely. Independent third-party clinical testing logs tracking internal purity margins remain completely public within cloud file indexes natively.
              </p>
              <div className="pt-1">
                <span className="text-xs text-primary font-mono font-bold uppercase tracking-wider block hover:underline cursor-pointer">
                  Download Independent Laboratory Verification Sheets (2026 Season) →
                </span>
              </div>
            </div>

            <div className="h-full w-full bg-neutral-900 hidden md:block" />

            <div className="space-y-4 text-left">
              <h4 className="text-xs uppercase font-mono font-black tracking-widest text-neutral-500">Audit Protocol Controls</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-primary font-bold font-mono">01/</span>
                  <p className="text-neutral-300 font-light"><strong className="text-white font-bold">Zero Banned Elements:</strong> Screened against extensive lists of competitive compounds via certified external anti-doping systems.</p>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-primary font-bold font-mono">02/</span>
                  <p className="text-neutral-300 font-light"><strong className="text-white font-bold">Label Accuracy Lock:</strong> Purity measurements printed transparently across our containers match active ingredient contents to the exact decimal.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Products;