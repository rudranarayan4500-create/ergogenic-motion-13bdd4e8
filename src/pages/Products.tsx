import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  ChevronRight, Star, SlidersHorizontal, RotateCcw, Sliders, CheckSquare, 
  Square, Activity, ShieldCheck, ArrowDown, Zap, Dumbbell, Sparkles, HeartPulse, ShieldAlert 
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
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

  // Advanced Multi-Axis Filtering Matrix Logic Engine
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

  // Framer Motion Animation Protocols
  const sectionContainerVariants = {
    hidden: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.05 }
    }
  };

  const textGlideUpVariants = {
    hidden: { opacity: 0, y: 50 },
    whileInView: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const imageZoomVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    whileInView: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-primary selection:text-black overflow-x-hidden antialiased">
      {/* SECTION 1: SYSTEM EYE CATCHING HERO MODULE */}
      <PageHero
        eyebrow="ERGOGENIC LABS · CULT ECOSYSTEM"
        title="THE COMPLETE ARSENAL"
        subtitle="Engineered with pharmaceutical rigor. No artificial fillers, full compound disclosures, and peak threshold performance pacing."
      />

      {/* METRIC BANNER (Cult Quick-Stats Layout Pattern) */}
      <div className="bg-neutral-950 border-y border-neutral-900 py-6">
        <div className="container max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block text-xl md:text-3xl font-black text-white">500K+</span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500">Athletes Coached</span>
          </div>
          <div>
            <span className="block text-xl md:text-3xl font-black text-primary">100%</span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500">Label Transparency</span>
          </div>
          <div>
            <span className="block text-xl md:text-3xl font-black text-white">FSSAI / WADA</span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500">Compliant Testing</span>
          </div>
          <div>
            <span className="block text-xl md:text-3xl font-black text-white">24 Hr</span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500">Dispatch Threshold</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: THE ECOSYSTEM STORE FRONTPAGE (HIGH DENSITY GRID MIX) */}
      <section className="py-16 bg-black">
        <div className="container max-w-[1600px] mx-auto px-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-bold uppercase tracking-wider">
                <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                <span>Filters Matrix</span>
                <span className="bg-primary text-black h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-black font-mono">
                  {activeFilterCount}
                </span>
              </div>
              <span className="text-neutral-500 text-xs font-mono font-semibold">
                {filteredProducts.length} COMPOUND FORMULAS
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-neutral-500 text-xs uppercase font-bold tracking-wider">Order Pacing:</span>
              <select 
                value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-xs rounded-lg px-3 py-1.5 font-bold uppercase tracking-wider text-white focus:outline-none focus:border-primary cursor-pointer transition-colors"
              >
                <option value="featured">Featured Compounds</option>
                <option value="price-low">Price: Escalating</option>
                <option value="price-high">Price: Descending</option>
                <option value="rating">Top Biological Bioavailability</option>
              </select>
            </div>
          </div>

          <div className="grid xl:grid-cols-[300px_1fr] gap-8 items-start">
            
            {/* FULL RESPONSIVE INTEGRATED FILTER CONTROL PANEL */}
            <aside className="space-y-6 bg-neutral-950/50 border border-neutral-900 rounded-2xl p-5 sticky top-24 max-h-[85vh] overflow-y-auto scrollbar-none hidden xl:block shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
                <span className="text-xs uppercase font-black tracking-widest text-neutral-400 flex items-center gap-2">
                  <Sliders className="h-3.5 w-3.5 text-primary" /> Core Tuning
                </span>
                {activeFilterCount > 0 && (
                  <button onClick={resetFilters} className="text-[10px] text-primary font-bold uppercase tracking-wider flex items-center gap-1 hover:underline">
                    <RotateCcw className="h-2.5 w-2.5" /> Purge Selection
                  </button>
                )}
              </div>

              {/* GENDER ALLOCATION */}
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

              {/* DYNAMIC CATEGORY ASSIGNMENTS */}
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

              {/* MAX BUDGET RANGE FRAME */}
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

              {/* TARGET PHYSIOLOGICAL ACTIVITY */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Activity Vectors</h4>
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

              {/* OUT OF STOCK SWITCHER */}
              <div className="pt-2 border-t border-neutral-900 flex items-center justify-between">
                <span className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Unavailable Inventory</span>
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
                      <Square className="h-4 w-4" /> Suppressed
                    </div>
                  )}
                </button>
              </div>
            </aside>

            {/* 4-COLUMN DENSE GRID SYSTEM */}
            <div className="space-y-6">
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.slice(0, 8).map((p) => (
                    <motion.div
                      key={p.id} layout
                      initial={{ opacity: 0, y: 25, scale: 0.97 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-20px" }}
                      exit={{ opacity: 0, scale: 0.93 }}
                      className="group flex flex-col justify-between rounded-2xl bg-neutral-950/60 border border-neutral-900 p-4 hover:border-neutral-800 hover:bg-neutral-950 transition-all duration-300 relative overflow-hidden"
                    >
                      <div>
                        <Link to={`/products/${p.id}`} className="w-full aspect-square relative flex items-center justify-center bg-black border border-neutral-900 rounded-xl mb-4 p-4 overflow-hidden block cursor-pointer">
                          <img
                            src={p.image} alt={p.name} loading="lazy"
                            className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-1"
                          />
                        </Link>

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

      {/* SECTION 3: CULT-STYLE ALTERNATING PRODUCT SPOTLIGHT FEATURES AREA */}
      <section className="py-28 bg-neutral-950 border-t border-neutral-900 relative">
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[160px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container max-w-7xl mx-auto px-4 space-y-40 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono tracking-widest text-primary uppercase block">Deep Formulation Architecture</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">INNOVATION HIGHLIGHTS</h2>
            <p className="text-neutral-400 text-xs md:text-sm max-w-lg mx-auto font-light">Explore targeted multi-phase release systems designed to bypass normal digestive absorption degradation completely.</p>
          </div>

          {products.slice(0, 3).map((p, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={`deep-spotlight-${p.id}`}
                variants={sectionContainerVariants}
                initial="hidden"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-120px" }}
                className={cn(
                  "flex flex-col gap-16 items-center justify-between w-full p-8 md:p-16 rounded-3xl bg-black border border-neutral-900 relative overflow-hidden group",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                {/* Glowing Core Backdrop Layer Element */}
                <div className={cn(
                  "absolute w-[350px] h-[350px] rounded-[50%] blur-[130px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none -z-10",
                  isEven ? "-right-20 -top-20 bg-primary/20" : "-left-20 -bottom-20 bg-primary/20"
                )} />

                {/* TEXT LAYER: Sinks up smoothly on row interaction */}
                <motion.div variants={textGlideUpVariants} className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900/80 border border-neutral-800 rounded-md">
                    <Activity className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[9px] uppercase tracking-widest font-mono text-neutral-300 font-bold">Phase {idx + 1} System Deployment</span>
                  </div>
                  
                  <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none group-hover:text-primary transition-colors duration-300">
                    {p.name}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {p.tagline} This premium iteration packs micro-filtered trace isolates designed to target rapid blood plasma amino spikes within standard physical workout parameters.
                  </p>

                  {/* Core Attribute Grid Matrix */}
                  <div className="grid grid-cols-3 gap-3 pt-2 text-left">
                    <div className="p-3 bg-neutral-950 border border-neutral-900 rounded-xl">
                      <span className="block text-[8px] font-mono text-neutral-500 uppercase">Rating matrix</span>
                      <span className="text-base font-black text-white flex items-center gap-1 mt-0.5">{p.rating} <Star className="h-3 w-3 fill-primary text-primary" /></span>
                    </div>
                    <div className="p-3 bg-neutral-950 border border-neutral-900 rounded-xl">
                      <span className="block text-[8px] font-mono text-neutral-500 uppercase">Purity Score</span>
                      <span className="text-sm font-bold text-primary block mt-0.5 uppercase tracking-wide">99.4% Pure</span>
                    </div>
                    <div className="p-3 bg-neutral-950 border border-neutral-900 rounded-xl">
                      <span className="block text-[8px] font-mono text-neutral-500 uppercase">Bioavailability</span>
                      <span className="text-sm font-bold text-white block mt-0.5 uppercase">Maximized</span>
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

                {/* IMAGES LAYER: Direct Routing Trigger Link with Immersive Scaling Bounds */}
                <motion.div variants={imageZoomVariants} className="w-full lg:w-1/2 flex items-center justify-center relative">
                  <Link to={`/products/${p.id}`} className="relative w-full max-w-[300px] md:max-w-[380px] aspect-square block cursor-pointer">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-[80px] pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                    <img
                      src={p.image} alt={p.name} loading="lazy"
                      className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-4 group-hover:rotate-2"
                    />
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: THE MONETIZATION PASS TIERS (Cultpass Elite/Pro Parity Interface Modules) */}
      <section className="py-24 bg-black border-t border-neutral-900 relative">
        <div className="container max-w-6xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
              <Zap className="h-3 w-3" /> System Subscriptions Matrix
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">CHOOSE YOUR PASS</h2>
            <p className="text-neutral-400 text-xs md:text-sm">Unlock absolute consistent nutritional support tracking directly into cross-country automated logistics queues.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            
            {/* ELITE COMPUND PASS CARD */}
            <div className="bg-gradient-to-b from-neutral-950 to-neutral-900 border border-primary/30 p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-primary text-black font-black font-mono px-4 py-1 rounded-bl-xl text-[9px] uppercase tracking-widest">
                Most Deployed
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-none">ERGOMAX ELITE</h3>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mt-1">Unlimited Pro Compounds Tier</span>
                  </div>
                </div>

                <p className="text-neutral-400 text-xs font-light leading-relaxed">
                  Grants standard automated ongoing monthly drops of core protein isolates, mass factors, and intra-workout amino matrix sets natively.
                </p>

                <ul className="space-y-2 text-xs font-medium text-neutral-300">
                  <li className="flex items-center gap-2"><Dumbbell className="h-3.5 w-3.5 text-primary" /> Free Access to Cult Partner Gym Channels</li>
                  <li className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-primary" /> Custom 1-on-1 AI Digital Diet Matrix Tracking</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Guaranteed Priority First-Batch Allocation</li>
                </ul>
              </div>

              <div className="pt-8 border-t border-neutral-800 mt-8 flex items-end justify-between">
                <div>
                  <span className="block text-[10px] uppercase font-mono text-neutral-500">Subscription Matrix</span>
                  <span className="text-3xl font-black text-white tracking-tight">₹4,499<span className="text-xs font-light text-neutral-500">/mo</span></span>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-black font-black uppercase text-xs tracking-wider px-6 rounded-xl h-11">
                  Activate Pass
                </Button>
              </div>
            </div>

            {/* BASE PRO COMPUND PASS CARD */}
            <div className="bg-neutral-950 border border-neutral-900 p-8 rounded-3xl flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                    <HeartPulse className="h-6 w-6 text-neutral-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-400 leading-none">ERGOMAX PRO</h3>
                    <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider block mt-1">Core Micronutrient Baseline</span>
                  </div>
                </div>

                <p className="text-neutral-400 text-xs font-light leading-relaxed">
                  Tailored specifically to supply standard multi-vitamin packs, baseline test stacks, and ongoing omega matrices directly to domestic addresses.
                </p>

                <ul className="space-y-2 text-xs font-medium text-neutral-400">
                  <li className="flex items-center gap-2"><Dumbbell className="h-3.5 w-3.5 text-neutral-600" /> Standard Courier Delivery Intervals</li>
                  <li className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-neutral-600" /> Automated Baseline Refill Logs</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-neutral-600" /> Lab-Verified Compound Assurances</li>
                </ul>
              </div>

              <div className="pt-8 border-t border-neutral-900 mt-8 flex items-end justify-between">
                <div>
                  <span className="block text-[10px] uppercase font-mono text-neutral-500">Subscription Matrix</span>
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

      {/* SECTION 5: CLINICAL INTEGRITY LOG MATRIX (The .fit Way Content Block Overlap) */}
      <section className="py-24 bg-neutral-950 border-t border-neutral-900">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="bg-black border border-neutral-900 rounded-3xl p-8 md:p-12 grid md:grid-cols-[1fr_2px_1fr] gap-8 items-center">
            
            <div className="space-y-4 text-left">
              <div className="h-8 w-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <ShieldAlert className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">THE NUTRITIONAL DISCLOSURE CODE</h3>
              <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
                We believe that performance architecture requires zero concealment parameters. Every raw batch report sheet tracking sequence parameters remains indexed inside open cloud buckets accessible to verification entities universally.
              </p>
              <div className="pt-2">
                <span className="text-xs text-primary font-mono font-bold uppercase tracking-wider block hover:underline cursor-pointer">
                  Download Verified Batch Logs (2026 Season) →
                </span>
              </div>
            </div>

            <div className="h-full w-full bg-neutral-900 hidden md:block" />

            <div className="space-y-4 text-left">
              <h4 className="text-xs uppercase font-mono font-black tracking-widest text-neutral-500">Clinical Audit Benchmarks</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-primary font-bold font-mono">01/</span>
                  <p className="text-neutral-300 font-light"><strong className="text-white font-bold">Zero Contamination Policy:</strong> Screened stringently against banned compounds via independent anti-doping verification labs.</p>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-primary font-bold font-mono">02/</span>
                  <p className="text-neutral-300 font-light"><strong className="text-white font-bold">Absolute Raw Accuracy:</strong> What appears on our technical label matrix matches the clinical dosing balance inside the container precisely.</p>
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