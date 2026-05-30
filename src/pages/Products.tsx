import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  ChevronRight, Star, SlidersHorizontal, RotateCcw, Sliders, CheckSquare, 
  Square, Activity, ShieldCheck, ArrowDown, Zap, Dumbbell, Sparkles, HeartPulse, ShieldAlert 
} from "lucide-react";
import { categories, products, type Category } from "@/data/products";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Products = () => {
  const [params, setParams] = useSearchParams();
  
  // Advanced Cult-Inspired Filter Matrix States
  const initialCat = (params.get("cat") as Category | null) ?? null;
  const [activeCategory, setActiveCategory] = useState<Category | null>(initialCat);
  const [maxPrice, setMaxPrice] = useState<number>(7000);
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [selectedActivity, setSelectedActivity] = useState<string>("all");
  const [showOutOfStock, setShowOutOfStock] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("featured");

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

  // Framer Motion Parent Animation Protocol
  const sectionContainerVariants = {
    hidden: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.05 }
    }
  };

  // Text Glides smoothly up from downstream onto active view frame
  const textGlideUpVariants = {
    hidden: { opacity: 0, y: 60 },
    whileInView: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  // Zoom In / Zoom Out Core Scroll Initializer Variants
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
        {/* Deep ambient blur backdrop accent glowing node mapping */}
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
                transition={{
                  duration: 0.04,
                  delay: idx * 0.06,
                  ease: "linear"
                }}
              >
                {letter}
              </motion.span>
            ))}
            {/* Blinking Character Cursor Element */}
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
            className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed font-light"
            style={{
              backgroundImage: "linear-gradient(110deg, #737373, 40%, #ffffff, 50%, #ffffff, 60%, #737373)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 100%",
            }}
            className="animate-[shimmer_5s_infinite_linear]"
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

      {/* RAPID PERFORMANCE METRICS BANNER STRIP */}
      <div className="bg-neutral-950 border-b border-neutral-900 py-6">
        <div className="container max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block text-xl md:text-3xl font-black text-white">500K+</span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500">Athletes Served</span>
          </div>
          <div>
            <span className="block text-xl md:text-3xl font-black text-primary">100%</span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500">Label Disclosures</span>
          </div>
          <div>
            <span className="block text-xl md:text-3xl font-black text-white">WADA / ISO</span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500">Certified Batches</span>
          </div>
          <div>
            <span className="block text-xl md:text-3xl font-black text-white">24 Hour</span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500">Logistics Fulfillment</span>
          </div>
        </div>
      </div>

      {/* ==================== SECTION 2: HIGH DENSITY INTERACTIVE STORE GRID ==================== */}
      <section className="py-16 bg-black">
        <div className="container max-w-[1600px] mx-auto px-4">
          
          {/* CATALOG STRIP CONTROLS */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-bold uppercase tracking-wider">
                <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                <span>Filters Engine Matrix</span>
                <span className="bg-primary text-black h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-black font-mono">
                  {activeFilterCount}
                </span>
              </div>
              <span className="text-neutral-500 text-xs font-mono font-semibold">
                {filteredProducts.length} PRODUCTS SKU AVAILABLE
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-neutral-500 text-xs uppercase font-bold tracking-wider">Sort Matrix:</span>
              <select 
                value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-xs rounded-lg px-3 py-1.5 font-bold uppercase tracking-wider text-white focus:outline-none focus:border-primary cursor-pointer transition-colors"
              >
                <option value="featured">Featured Configurations</option>
                <option value="price-low">Price: Escalating Low to High</option>
                <option value="price-high">Price: Descending High to Low</option>
                <option value="rating">Top Biological Bioavailability</option>
              </select>
            </div>
          </div>

          <div className="grid xl:grid-cols-[300px_1fr] gap-8 items-start">
            
            {/* FULL RESPONSIVE ADVANCED FILTER PANEL ASIDE */}
            <aside className="space-y-6 bg-neutral-950/40 border border-neutral-900 rounded-2xl p-5 sticky top-24 max-h-[85vh] overflow-y-auto scrollbar-none hidden xl:block shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
                <span className="text-xs uppercase font-black tracking-widest text-neutral-400 flex items-center gap-2">
                  <Sliders className="h-3.5 w-3.5 text-primary" /> Parameter Tuning
                </span>
                {activeFilterCount > 0 && (
                  <button onClick={resetFilters} className="text-[10px] text-primary font-bold uppercase tracking-wider flex items-center gap-1 hover:underline">
                    <RotateCcw className="h-2.5 w-2.5" /> Clear Filters
                  </button>
                )}
              </div>

              {/* GENDER MATRIX */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Biological Target</h4>
                <div className="grid grid-cols-3 gap-1 bg-black p-1 rounded-lg border border-neutral-900">
                  {["all", "unisex", "custom"].map((g) => (
                    <button
                      key={g} onClick={() => setSelectedGender(g)}
                      className={cn(
                        "text-[9px] uppercase tracking-wider font-bold py-1.5 rounded transition-all text-center",
                        selectedGender === g ? "bg-neutral-900 text-primary border border-neutral-800" : "text-neutral-500 hover:text-neutral-300"
                      )}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* DYNAMIC FORMULATION CATEGORIES LIST */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">System Family</h4>
                <div className="space-y-1 max-h-[160px] overflow-y-auto pr-1 scrollbar-none">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={cn(
                      "w-full text-left text-xs py-1.5 px-2.5 rounded transition-all font-medium flex items-center justify-between",
                      activeCategory === null ? "bg-primary/10 text-primary font-bold border border-primary/20" : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                    )}
                  >
                    <span>All System Operations</span>
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.name} onClick={() => handleCategoryChange(c.name)}
                      className={cn(
                        "w-full text-left text-xs py-1.5 px-2.5 rounded transition-all font-medium flex items-center justify-between",
                        activeCategory === c.name ? "bg-primary/10 text-primary font-bold border border-primary/20" : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                      )}
                    >
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* MAXIMUM BUDGET CELING SLIDER */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Max Budget Cap</h4>
                  <span className="font-mono text-xs text-primary font-bold">₹{maxPrice.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="900" max="7000" step="100" value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary bg-neutral-800 h-1 rounded cursor-pointer"
                />
              </div>

              {/* TARGET METABOLIC VECTOR ACTIVITY */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Activity Targets</h4>
                <div className="flex flex-wrap gap-1">
                  {["all", "bodybuilding", "crossfit", "running"].map((act) => (
                    <button
                      key={act} onClick={() => setSelectedActivity(act)}
                      className={cn(
                        "text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border transition-all",
                        selectedActivity === act ? "bg-white text-black border-white" : "bg-black text-neutral-400 border-neutral-900 hover:border-neutral-700"
                      )}
                    >
                      {act}
                    </button>
                  ))}
                </div>
              </div>

              {/* CONTAINER CAP MATRIX SPECIFICATIONS */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Size Volume Matrix</h4>
                <div className="grid grid-cols-4 gap-1">
                  {["all", "30 Serv", "60 Serv", "90 Serv"].map((sz) => (
                    <button
                      key={sz} onClick={() => setSelectedSize(sz)}
                      className={cn(
                        "text-[9px] font-bold py-1.5 rounded border text-center transition-all",
                        selectedSize === sz ? "border-primary text-primary bg-primary/5" : "border-neutral-900 text-neutral-500 hover:text-neutral-300"
                      )}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* OUT OF STOCK TOGGLER */}
              <div className="pt-2 border-t border-neutral-900 flex items-center justify-between">
                <span className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Unavailable Compounds</span>
                <button 
                  onClick={() => setShowOutOfStock(!showOutOfStock)}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {showOutOfStock ? (
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-primary">
                      <CheckSquare className="h-4 w-4" /> Visible
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-neutral-600">
                      <Square className="h-4 w-4" /> Masked
                    </div>
                  )}
                </button>
              </div>
            </aside>

            {/* PRECISE 4-COLUMN STORE PACKAGED GRID CONTENT BLOCK */}
            <div className="space-y-6">
              
              {/* Mobile Quick Horizontal Filters Row */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 xl:hidden scrollbar-none">
                <Button 
                  variant={activeCategory === null ? "default" : "outline"} size="sm" 
                  onClick={() => handleCategoryChange(null)} className="rounded-full text-[10px] uppercase font-bold tracking-wider h-7 px-3 shrink-0"
                >
                  All Catalog
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

              {/* Active Products Canvas View */}
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.slice(0, 8).map((p) => (
                    <motion.div
                      key={p.id} layout
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      className="group flex flex-col justify-between rounded-2xl bg-neutral-950/50 border border-neutral-900 p-4 hover:border-neutral-800 hover:bg-neutral-950 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* High-Contrast Backdrop Glow Vector circle behind frame */}
                      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/[0.01] group-hover:bg-primary/[0.04] blur-2xl transition-all duration-500 pointer-events-none" />

                      <div>
                        {/* ITEM IMAGE CONTAINER: PARENT LINK TRIGGERED HIGHSPEED ZOOM-IN/ZOOM-OUT HOVER EFFECT */}
                        <Link to={`/products/${p.id}`} className="w-full aspect-square relative flex items-center justify-center bg-black border border-neutral-900 rounded-xl mb-4 p-4 overflow-hidden block cursor-pointer">
                          <img
                            src={p.image} alt={p.name} loading="lazy"
                            className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-1"
                          />
                        </Link>

                          {/* TYPOGRAPHY MATRIX LABELS */}
                        <div className="space-y-1.5 text-left">
                          <span className="text-[8px] font-mono tracking-widest font-bold text-primary uppercase bg-primary/10 px-1.5 py-0.5 rounded">
                            {p.category}
                          </span>
                          <h3 className="text-sm font-black uppercase tracking-tight text-white line-clamp-1 group-hover:text-primary transition-colors duration-300">
                            <Link to={`/products/${p.id}`}>{p.name}</Link>
                          </h3>
                          <p className="text-[11px] text-neutral-400 line-clamp-2 font-light leading-snug h-8">
                            {p.tagline}
                          </p>
                        </div>
                      </div>

                      {/* TRANSACTION BOUND MODULE */}
                      <div className="pt-3 border-t border-neutral-900 mt-4 flex items-center justify-between gap-2">
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-mono text-neutral-600 line-through leading-none mb-0.5">₹{p.mrp.toLocaleString()}</span>
                          <span className="text-sm font-black text-white tracking-tight leading-none">₹{p.price.toLocaleString()}</span>
                        </div>
                        <Link to={`/products/${p.id}`}>
                          <Button size="sm" className="h-8 bg-neutral-900 text-neutral-200 hover:bg-primary hover:text-black border border-neutral-800 text-[10px] uppercase font-bold tracking-wider px-3 rounded-lg transition-all duration-300">
                            Deploy
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
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
                {/* Custom glowing oval shape backdrop framing elements within container boundaries */}
                <div className={cn(
                  "absolute w-[360px] h-[360px] rounded-[50%] blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none -z-10",
                  isEven ? "-right-20 -top-20 bg-primary/20" : "-left-20 -bottom-20 bg-primary/20"
                )} />

                {/* TEXT DYNAMICS BLOCK: GLIDES SEAMLESSLY FROM DOWN SIDE UP TO UPSIDE VIA SCROLL INTERSECTION */}
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

                {/* IMAGE DYNAMICS BLOCK: LINKABLE DIRECT REDIRECT REDIRECT WITH IMMERSIVE ZOOM SCALING EFFECTS ON SCREEN ENTRY */}
                <motion.div variants={imageScrollZoomVariants} className="w-full lg:w-1/2 flex items-center justify-center relative">
                  <Link to={`/products/${p.id}`} className="relative w-full max-w-[300px] md:max-w-[380px] aspect-square block cursor-pointer">
                    {/* Glowing oval radial profile framing backing container */}
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

      {/* ==================== SECTION 4: THE SUBSCRIPTION PASS TIERS (Cultpass Monopolies) ==================== */}
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
            
            {/* CARD 1: ELITE PASS */}
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
                <Button className="bg-primary hover:bg-primary/90 text-black font-black uppercase text-xs tracking-wider px-6 rounded-xl h-11">
                  Activate Pass
                </Button>
              </div>
            </div>

            {/* CARD 2: PRO PASS */}
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