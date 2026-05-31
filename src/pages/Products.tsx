import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  ChevronRight, Star, SlidersHorizontal, RotateCcw, Search,
  Activity, ShieldCheck, ArrowDown, Zap, Dumbbell, Sparkles, HeartPulse, 
  ShieldAlert, ChevronDown, ChevronUp, Tag
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(7000);
  const [showOutOfStock, setShowOutOfStock] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Live Logistics Countdown State
  const [timeLeft, setTimeLeft] = useState("24:00:00");

  // Accordion Sidebar Open/Close States
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    search: true,
    category: true,
    price: true,
    gender: false,
    brand: false,
    size: false,
    color: false,
    activity: false,
    origin: false,
  });

  // Calculate Daily 4:00 PM Container Lockdown Dispatch Cutoff Timer Loop
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const cutoff = new Date();
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
    setSearchQuery("");
    setMaxPrice(7000);
    setShowOutOfStock(true);
    setSortBy("featured");
    setParams({});
  };

  // Comprehensive Live Matrix Filtering Logic Engine
  const filteredProducts = useMemo(() => {
    // Inject the uploaded high-fidelity assets and specific parameters into the client data matrix loop
    let result = products.map((p, index) => {
      // Dynamic mapping for Lean Shot
      if (p.id === "lean- shot" || p.slug === "lean-shot") {
        return {
          ...p,
          image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-05-31 at 7.38.06 PM.jpeg"
        };
      }
      // Precise mapping override to turn the target row asset into your customized Pure Creatine configuration
      if (p.id === "super-whey" || p.slug === "super-whey" || p.id === "pure-creatine" || p.slug === "pure-creatine" || index === 0) {
        return {
          ...p,
          id: "pure-creatine",
          slug: "pure-creatine",
          name: "Pure Creatine Micronized",
          rating: 4.9,
          reviews: 1750,
          price: 1299,
          mrp: 1599,
          category: "Performance" as Category,
          tagline: "200-mesh pure micronized athletic phosphagen compound built to maximize systemic muscular cell hydration thresholds.",
          image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp%20Image%202026-05-31%20at%207.38.06%20PM.jpeg"
        };
      }
      return p;
    });

    // 1. Text Query Title & Tagline Search Filter Validation
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) => 
          p.name.toLowerCase().includes(query) || 
          p.tagline?.toLowerCase().includes(query)
      );
    }

    // 2. Active Category Routing Match Filter
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 3. Quantitative Price Cap Bounds Filter
    result = result.filter((p) => p.price <= maxPrice);

    // 4. Availability Simulation Threshold Filter
    if (!showOutOfStock) {
      result = result.filter((p) => p.reviews > 5); 
    }

    // 5. Multi-Mode Sorting Execution Layer
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    
    return result;
  }, [activeCategory, searchQuery, maxPrice, showOutOfStock, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeCategory) count++;
    if (searchQuery.trim() !== "") count++;
    if (maxPrice < 7000) count++;
    if (!showOutOfStock) count++;
    return count;
  }, [activeCategory, searchQuery, maxPrice, showOutOfStock]);

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
    <div className="bg-[#030303] text-white min-h-screen selection:bg-primary selection:text-black overflow-x-hidden antialiased">
      
      {/* ==================== SECTION 1: CULT SYSTEM HERO BANNERS ==================== */}
      <header className="py-24 md:py-32 bg-black border-b border-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-xs font-mono tracking-[0.3em] text-primary uppercase block font-black"
          >
            Ergogenic Labs · Technical Inventory
          </motion.span>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white select-none">
            {"THE COMPLETE ARSENAL".split("").map((letter, idx) => (
              <motion.span
                key={`typewriter-char-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.04, delay: idx * 0.05, ease: "linear" }}
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

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              backgroundImage: "linear-gradient(110deg, #737373, 40%, #ffffff, 50%, #ffffff, 60%, #737373)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 100%",
            }}
            className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed animate-[shimmer_5s_infinite_linear]"
          >
            Engineered with pharmaceutical rigor. No artificial fillers, full compound disclosures, and peak threshold performance pacing.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex justify-center pt-4"
          >
            <ArrowDown className="animate-bounce text-primary h-5 w-5" />
          </motion.div>
        </div>
      </header>

      {/* ==================== LOGISTICS COUNTDOWN STRIP ==================== */}
      <div className="bg-neutral-950 border-b border-white/5 py-8">
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
          <div className="space-y-1">
            <span className="block text-2xl md:text-4xl font-black font-mono tracking-tighter text-orange-500 tabular-nums">
              {timeLeft}
            </span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-400 font-extrabold block">Fulfillment Dispatch Countdown</span>
          </div>
        </div>
      </div>

      {/* ==================== SECTION 2: INTEGRATED SIDEBAR STOREFRONT LAYOUT ==================== */}
      <section className="py-16 bg-black">
        <div className="container max-w-[1600px] mx-auto px-4">
          
          {/* Main Layout Splitting Grid Template */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
            
            {/* ========================================================================= */}
            {/* UNIFIED LEFT SIDEBAR FILTER ARCHITECTURE */}
            {/* ========================================================================= */}
            <aside className="xl:col-span-3 space-y-2 pr-2 sticky top-24 max-h-[85vh] overflow-y-auto scrollbar-none text-left border-b xl:border-b-0 xl:border-r border-white/5 pb-8 xl:pb-0">
              
              {/* Filter Module Matrix Metadata Info Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                  <span>Filter Matrix ({activeFilterCount})</span>
                </div>
                {activeFilterCount > 0 && (
                  <button 
                    onClick={resetFilters}
                    className="text-[10px] font-mono uppercase text-neutral-500 hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="h-3 w-3" /> Clear Matrix
                  </button>
                )}
              </div>

              {/* SIDEBAR ACCORDION 1: TEXT QUERY SEARCH BLOCK */}
              <div className="border-b border-white/5 py-3">
                <button onClick={() => toggleFilterSection("search")} className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-neutral-300">
                  <span>Search Arsenal</span>
                  {expandedFilters.search ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <AnimatePresence initial={true}>
                  {expandedFilters.search && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-3">
                      <div className="relative w-full">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Query formulation name..."
                          className="w-full bg-neutral-950 border border-white/5 rounded-xl h-11 pl-10 pr-4 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-primary/40 transition-colors"
                        />
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-600" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SIDEBAR ACCORDION 2: COMPONENT CLASS BUTTONS */}
              <div className="border-b border-white/5 py-3">
                <button onClick={() => toggleFilterSection("category")} className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-neutral-300">
                  <span>System Class Lines</span>
                  {expandedFilters.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <AnimatePresence initial={true}>
                  {expandedFilters.category && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-3 max-h-[220px] overflow-y-auto scrollbar-none space-y-1">
                      <button onClick={() => handleCategoryChange(null)} className={cn("w-full text-left py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-transparent", !activeCategory ? "bg-neutral-900 text-primary border-primary/10" : "text-neutral-500 hover:bg-neutral-955 hover:text-neutral-300")}>All Core Lines</button>
                      {categories.map((c) => (
                        <button key={c.name} onClick={() => handleCategoryChange(c.name)} className={cn("w-full text-left py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider truncate border border-transparent transition-all", activeCategory === c.name ? "bg-neutral-900 text-primary border-primary/10" : "text-neutral-500 hover:bg-neutral-955 hover:text-neutral-300")}>
                          {c.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SIDEBAR ACCORDION 3: RANGE SLIDER CAP FOR PRICING */}
              <div className="border-b border-white/5 py-3">
                <button onClick={() => toggleFilterSection("price")} className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-neutral-300">
                  <span>Price Cap Bounds</span>
                  {expandedFilters.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <AnimatePresence initial={true}>
                  {expandedFilters.price && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-4 pb-1 space-y-2">
                      <input type="range" min="900" max="7000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-primary bg-neutral-900 h-1 rounded-full cursor-pointer" />
                      <div className="flex justify-between text-[11px] font-mono text-neutral-600 font-bold"><span>₹900</span><span className="text-primary">₹{maxPrice.toLocaleString()}</span></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SIDEBAR ACCORDION 4: TARGET RECIPIENT BALANCES */}
              <div className="border-b border-white/5 py-3">
                <button onClick={() => toggleFilterSection("gender")} className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-400 transition-colors">
                  <span>Target Demographics</span>
                  {expandedFilters.gender ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <AnimatePresence>
                  {expandedFilters.gender && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-3 space-y-2 text-xs text-neutral-500 font-medium font-mono uppercase">
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="accent-primary rounded bg-neutral-950 border-white/10" /> Unisex Core</label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-primary rounded bg-neutral-950 border-white/10" /> Men Allocation</label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-primary rounded bg-neutral-955 border-white/10" /> Women Allocation</label>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SIDEBAR ACCORDION 5: BRAND TRACE MANUFACTURES */}
              <div className="border-b border-white/5 py-3">
                <button onClick={() => toggleFilterSection("brand")} className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500">
                  <span>Manufacturing Brand</span>
                  {expandedFilters.brand ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {/* SIDEBAR ACCORDION 6: WEIGHT CONTAINMENT VOLUMES */}
              <div className="border-b border-white/5 py-3">
                <button onClick={() => toggleFilterSection("size")} className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500">
                  <span>Container Weight Vol</span>
                  {expandedFilters.size ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

            </aside>

            {/* ========================================================================= */}
            {/* RIGHT SIDEBAR DISPLAY GRID LAYOUT: ITEM REGISTRY RESULTS */}
            {/* ========================================================================= */}
            <div className="xl:col-span-9 space-y-6">
              
              {/* Toolbar Information Summary Strip Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 text-xs text-neutral-500">
                <span className="font-mono font-bold tracking-wider uppercase">
                  Active Catalogue Index Allocation: <span className="text-neutral-200 font-sans font-black">{filteredProducts.length}</span> Products Loaded
                </span>
                
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wider font-bold">Sort System:</span>
                  <select 
                    value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                    className="bg-neutral-950 border border-white/5 rounded-lg text-[11px] font-bold uppercase tracking-wide text-neutral-200 focus:outline-none focus:border-primary/40 cursor-pointer transition-colors px-2.5 py-1.5"
                  >
                    <option value="featured">Featured Setup</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Assay Rating Score</option>
                  </select>
                </div>
              </div>

              {/* Master Products Cards Grid Map Layout */}
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((p, index) => {
                    const isNewArrival = p.id === "pure-creatine" || index === 4;
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
                        {/* CULT FULL-IMAGE FULL-BLEED BACKDROP WINDOW FRAME */}
                        <div className="w-full aspect-square relative bg-[#0d0d0d] rounded-2xl mb-3.5 flex items-center justify-center overflow-hidden border border-white/5">
                          <Link to={`/products/${p.id}`} className="w-full h-full block cursor-pointer">
                            <img
                              src={p.image} alt={p.name} loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                            />
                          </Link>

                          {/* Top floating absolute indicator badges */}
                          {isNewArrival && (
                            <div className="absolute top-3 left-3 bg-white text-black font-mono font-black text-[9px] tracking-widest px-2.5 py-1 uppercase rounded shadow-lg">
                              New Arrival
                            </div>
                          )}
                          {isPriceDrop && (
                            <div className="absolute top-3 left-3 bg-primary text-black font-mono font-black text-[9px] tracking-widest px-2.5 py-1 uppercase rounded shadow-lg">
                              Price Drop
                            </div>
                          )}
                        </div>

                        {/* PRODUCT METADATA INFO FRAME STACK */}
                        <div className="space-y-1 px-1">
                          <h3 className="text-sm font-black tracking-tight text-neutral-200 group-hover:text-primary transition-colors line-clamp-1">
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
                            <span className="font-black text-white text-sm font-mono">₹{p.price.toLocaleString()}</span>
                            <span className="text-neutral-600 line-through font-medium font-mono">₹{p.mrp.toLocaleString()}</span>
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

              {/* Void Filtering Query Exception Fallback */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-24 border border-dashed border-white/5 rounded-2xl bg-neutral-950/20">
                  <p className="text-neutral-500 text-xs font-medium uppercase tracking-widest animate-pulse">No matching compound lines found inside active query boundaries.</p>
                  <button onClick={resetFilters} className="text-primary text-[10px] uppercase font-bold tracking-widest mt-4 hover:underline">Reset Choice Matrix</button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: ALTERNATING FEATURE HIGHLIGHT SHUFFLE ==================== */}
      <section className="py-28 bg-neutral-950 border-t border-white/5 relative">
        <div className="absolute top-1/2 left-1/2 w-[550px] h-[550px] bg-primary/[0.02] rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container max-w-7xl mx-auto px-4 space-y-40 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono tracking-widest text-primary uppercase block">Deep Performance Architecture</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">INNOVATION HIGHLIGHTS</h2>
            <p className="text-neutral-400 text-xs md:text-sm max-w-lg mx-auto font-light">Explore biological trace configurations designed to secure baseline nutrient absorption spikes efficiently.</p>
          </div>

          {filteredProducts.slice(0, 3).map((p, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={`feature-row-${p.id}`}
                variants={sectionContainerVariants}
                initial="hidden"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-120px" }}
                className={cn(
                  "flex flex-col gap-16 items-center justify-between w-full p-8 md:p-16 rounded-3xl bg-black border border-white/5 relative overflow-hidden group",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                <div className={cn(
                  "absolute w-[360px] h-[360px] rounded-[50%] blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none -z-10",
                  isEven ? "-right-20 -top-20 bg-primary/20" : "-left-20 -bottom-20 bg-primary/20"
                )} />

                {/* TEXT LAYER: RISING TRANSITIONS */}
                <motion.div variants={textGlideUpVariants} className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900/80 border border-white/5 rounded-md">
                    <Activity className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[9px] uppercase tracking-widest font-mono text-neutral-300 font-bold">Phase 0{idx + 1} Matrix Deployment</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white leading-none group-hover:text-primary transition-colors duration-300">
                    {p.name}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                    {p.tagline} Engineered cleanly to secure maximum cellular integration, tracking perfectly into elite performance workloads.
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-left">
                    <div className="p-3 bg-neutral-950 border border-white/5 rounded-xl">
                      <span className="block text-[8px] font-mono text-neutral-500 uppercase">Rating Index</span>
                      <span className="text-base font-black text-white flex items-center gap-1 mt-0.5 font-mono">{p.rating} <Star className="h-3 w-3 fill-primary text-primary" /></span>
                    </div>
                    <div className="p-3 bg-neutral-950 border border-white/5 rounded-xl">
                      <span className="block text-[8px] font-mono text-neutral-500 uppercase">Purity Core</span>
                      <span className="text-xs font-black text-primary block mt-0.5 uppercase tracking-wide">99.2% Iso</span>
                    </div>
                    <div className="p-3 bg-neutral-950 border border-white/5 rounded-xl">
                      <span className="block text-[8px] font-mono text-neutral-500 uppercase">Bioavailability</span>
                      <span className="text-xs font-black text-white block mt-0.5 uppercase">Max Stack</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link to={`/products/${p.id}`}>
                      <Button className="bg-primary hover:bg-primary/90 text-black font-black text-xs uppercase tracking-widest rounded-xl px-6 h-12 transition-all group-hover:translate-x-1">
                        Inspect Formulation <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* IMAGE LAYER: SCROLL DRIVEN ENTRANCE ZOOM EFFECT */}
                <motion.div variants={imageScrollZoomVariants} className="w-full lg:w-1/2 flex items-center justify-center relative">
                  <Link to={`/products/${p.id}`} className="relative w-full max-w-[300px] md:max-w-[350px] aspect-square block cursor-pointer">
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

      {/* ==================== SECTION 4: SUBSCRIPTION PASSES ==================== */}
      <section className="py-24 bg-black border-t border-white/5 relative">
        <div className="container max-w-6xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
              <Zap className="h-3 w-3" /> System Subscriptions Matrix
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">CHOOSE YOUR SUBSCRIPTION PASS</h2>
            <p className="text-neutral-400 text-xs md:text-sm">Unlock automated nutritional drops dispatched straight into continuous priority logistics pipelines.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            
            {/* ELITE PASS CARD */}
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

              <div className="pt-8 border-t border-white/5 mt-8 flex items-end justify-between">
                <div>
                  <span className="block text-[10px] uppercase font-mono text-neutral-500">Subscription Cost</span>
                  <span className="text-3xl font-black text-white tracking-tight font-mono">₹4,499<span className="text-xs font-light text-neutral-500">/mo</span></span>
                </div>
                <Button className="bg-primary text-black font-black uppercase text-xs tracking-wider px-6 rounded-xl h-11">
                  Activate Pass
                </Button>
              </div>
            </div>

            {/* BASE PRO PASS CARD */}
            <div className="bg-neutral-950 border border-white/5 p-8 rounded-3xl flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-neutral-900 rounded-xl border border-white/5">
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

              <div className="pt-8 border-t border-white/5 mt-8 flex items-end justify-between">
                <div>
                  <span className="block text-[10px] uppercase font-mono text-neutral-500">Subscription Cost</span>
                  <span className="text-3xl font-black text-white tracking-tight font-mono">₹2,199<span className="text-xs font-light text-neutral-500">/mo</span></span>
                </div>
                <Button variant="outline" className="border-white/10 text-neutral-300 hover:bg-white hover:text-black font-black uppercase text-xs tracking-wider px-6 rounded-xl h-11">
                  Deploy Pro Pass
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== SECTION 5: CLINICAL VERIFIED LEGAL LEDGER ==================== */}
      <section className="py-24 bg-neutral-950 border-t border-white/5">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="bg-black border border-white/5 rounded-3xl p-8 md:p-12 grid md:grid-cols-[1fr_2px_1fr] gap-8 items-center">
            
            <div className="space-y-4 text-left">
              <div className="h-8 w-8 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center">
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