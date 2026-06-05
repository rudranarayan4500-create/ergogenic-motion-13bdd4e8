import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  ChevronRight, Star, SlidersHorizontal, RotateCcw, Search,
  Activity, ShieldCheck, ArrowDown, Zap, Dumbbell, Sparkles, HeartPulse, 
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(7000);
  const [showOutOfStock, setShowOutOfStock] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("featured");

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

  const toggleFilterSection = (section: string) => {
    setExpandedFilters(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (c: Category | null) => {
    setActiveCategory(c);
    if (c) setParams({ cat: c }); else setParams({});
  };

  const resetFilters = () => {
    setActiveCategory(null);
    SearchQuery("");
    SetMaxPrice(7000);
    ShowOutOfStock(true);
    SetSortBy("featured");
    SetParams({});
  };

  // Comprehensive Live Matrix Filtering Logic Engine
  const filteredProducts = useMemo(() => {
    let result = products.map((p, index) => {
      // Dynamic mapping for Lean Shot
      if (p.id === "lean- shot" || p.slug === "lean-shot") {
        return {
          ...p,
          Image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-05-31 at 7.38.06 PM.jpeg"
        };
      }
      // Precise mapping override to turn the target row asset into your customized Pure Creatine configuration
      if (p.id === "super-whey" || p.slug === "super-whey" || p.id === "pure-creatine" || p.slug === "pure-creatine" || index === 0) {
        return {
          ...p,
          Id: "pure-creatine",
          Slug: "pure-creatine",
          Name: "Pure Creatine Micronized",
          Rating: 4.9,
          Reviews: 1750,
          Price: 1299,
          Mrp: 1599,
          Category: "Performance" as Category,
          Tagline: "200-mesh pure micronized creatine monohydrate built to maximize muscle hydration.",
          Image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//596a34ab-1f16-48d9-ba17-e78d005ec14c.png"
        };
      }
      return p;
    });

    // 1. Text Query Search Filter Validation
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

  const sectionContainerVariants: any = {
    hidden: { opacity: 0 },
    WhileInView: {
      Opacity: 1,
      Transition: { staggerChildren: 0.15, delayChildren: 0.05 }
    }
  };

  const textGlideUpVariants: any = {
    hidden: { opacity: 0, y: 60 },
    WhileInView: { 
      Opacity: 1, 
      Y: 0, 
      Transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const imageScrollZoomVariants: any = {
    hidden: { opacity: 0, scale: 0.85 },
    WhileInView: { 
      Opacity: 1, 
      Scale: 1, 
      Transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-slate-900 selection:text-white overflow-x-hidden antialiased">
      
      {/* ==================== SECTION 1: CULT SYSTEM HERO BANNERS ==================== */}
      <header className="py-24 md:py-32 bg-background border-b border-border relative overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-slate-900/[0.02] rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            Animate={{ opacity: 1, y: 0 }}
            Transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-xs font-mono tracking-[0.3em] text-slate-400 uppercase block font-black"
          >
            Product Catalogue
          </motion.span>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-foreground select-none">
            {"THE COMPLETE ARSENAL".split("").map((letter, idx) => (
              <motion.span
                key={`typewriter-char-${idx}`}
                Initial={{ opacity: 0 }}
                Animate={{ opacity: 1 }}
                Transition={{ duration: 0.04, delay: idx * 0.05, ease: "linear" }}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              Animate={{ opacity: [1, 0, 1] }}
              Transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block w-1.5 h-8 sm:h-12 md:h-16 bg-slate-900 ml-1 translate-y-1"
            />
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            Animate={{ opacity: 1, y: 0 }}
            Transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Engineered clean formulations focused on transparent profiles and everyday fitness support.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            Animate={{ opacity: 1 }}
            Transition={{ delay: 1.5, duration: 0.5 }}
            className="flex justify-center pt-4"
          >
            <ArrowDown className="animate-bounce text-slate-400 h-5 w-5" />
          </motion.div>
        </div>
      </header>

      {/* ==================== SECTION 2: INTEGRATED SIDEBAR STOREFRONT LAYOUT ==================== */}
      <section className="py-16 bg-background">
        <div className="container max-w-[1600px] mx-auto px-4">
          
          {/* Main Layout Splitting Grid Template */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
            
            {/* UNIFIED LEFT SIDEBAR FILTER ARCHITECTURE */}
            <aside className="xl:col-span-3 space-y-2 pr-2 sticky top-24 max-h-[85vh] overflow-y-auto scrollbar-none text-left border-b xl:border-b-0 xl:border-r border-border pb-8 xl:pb-0">
              
              <div className="flex items-center justify-between pb-4 border-b border-border mb-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-foreground">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-slate-900" />
                  <span>Filter Matrix ({activeFilterCount})</span>
                </div>
                {activeFilterCount > 0 && (
                  <button 
                    onClick={resetFilters}
                    className="text-[10px] font-mono uppercase text-muted-foreground hover:text-slate-900 transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="h-3 w-3" /> Clear Filters
                  </button>
                )}
              </div>

              {/* SIDEBAR ACCORDION 1: TEXT QUERY SEARCH BLOCK */}
              <div className="border-b border-border py-3">
                <button onClick={() => toggleFilterSection("search")} className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-foreground">
                  <span>Search Products</span>
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
                          placeholder="Search product name..."
                          className="w-full bg-muted/30 border border-border rounded-xl h-11 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-slate-400 transition-colors"
                        />
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SIDEBAR ACCORDION 2: COMPONENT CLASS BUTTONS */}
              <div className="border-b border-border py-3">
                <button onClick={() => toggleFilterSection("category")} className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-foreground">
                  <span>Categories</span>
                  {expandedFilters.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <AnimatePresence initial={true}>
                  {expandedFilters.category && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-3 max-h-[220px] overflow-y-auto scrollbar-none space-y-1">
                      <button onClick={() => handleCategoryChange(null)} className={cn("w-full text-left py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-transparent", !activeCategory ? "bg-slate-100 text-slate-900 border-slate-200" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground")}>All Categories</button>
                      {categories.map((c) => (
                        <button key={c.name} onClick={() => handleCategoryChange(c.name)} className={cn("w-full text-left py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider truncate border border-transparent transition-all", activeCategory === c.name ? "bg-slate-100 text-slate-900 border-slate-200" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground")}>
                          {c.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SIDEBAR ACCORDION 3: RANGE SLIDER CAP FOR PRICING */}
              <div className="border-b border-border py-3">
                <button onClick={() => toggleFilterSection("price")} className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-foreground">
                  <span>Price Range</span>
                  {expandedFilters.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <AnimatePresence initial={true}>
                  {expandedFilters.price && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-4 pb-1 space-y-2">
                      <input type="range" min="900" max="7000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-slate-900 bg-muted h-1 rounded-full cursor-pointer" />
                      <div className="flex justify-between text-[11px] font-mono text-muted-foreground font-bold"><span>₹900</span><span className="text-slate-900">₹{maxPrice.toLocaleString()}</span></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </aside>

            {/* RIGHT SIDEBAR DISPLAY GRID LAYOUT: ITEM REGISTRY RESULTS */}
            <div className="xl:col-span-9 space-y-6">
              
              {/* Toolbar Information Summary Strip Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border text-xs text-muted-foreground">
                <span className="font-mono font-bold tracking-wider uppercase">
                  Products Found: <span className="text-slate-900 font-sans font-black">{filteredProducts.length}</span>
                </span>
                
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wider font-bold">Sort By:</span>
                  <select 
                    value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-border rounded-lg text-[11px] font-bold uppercase tracking-wide text-slate-700 focus:outline-none focus:border-slate-400 cursor-pointer transition-colors px-2.5 py-1.5"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
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
                        {/* PRODUCT IMAGE CANVAS CONTAINER */}
                        <div className="w-full aspect-square relative bg-slate-50 rounded-2xl mb-3.5 flex items-center justify-center overflow-hidden border border-border">
                          <Link to={`/products/${p.id}`} className="w-full h-full block cursor-pointer">
                            <img
                              src={p.image} alt={p.name} loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                            />
                          </Link>

                          {/* Float Badges */}
                          {isNewArrival && (
                            <div className="absolute top-3 left-3 bg-slate-900 text-white font-mono font-black text-[9px] tracking-widest px-2.5 py-1 uppercase rounded shadow-sm">
                              New Arrival
                            </div>
                          )}
                          {isPriceDrop && (
                            <div className="absolute top-3 left-3 bg-emerald-600 text-white font-mono font-black text-[9px] tracking-widest px-2.5 py-1 uppercase rounded shadow-sm">
                              Price Drop
                            </div>
                          )}
                        </div>

                        {/* PRODUCT METADATA */}
                        <div className="space-y-1 px-1">
                          <h3 className="text-sm font-black tracking-tight text-slate-800 group-hover:text-slate-900 transition-colors line-clamp-1">
                            <Link to={`/products/${p.id}`}>{p.name}</Link>
                          </h3>
                          
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground">
                            <div className="flex items-center text-amber-500">
                              <Star className="h-3 w-3 fill-current stroke-none" /> 
                              <span className="text-slate-700 ml-0.5 font-sans">{p.rating || 4.5}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-0.5 text-xs">
                            <span className="font-black text-slate-900 text-sm font-mono">₹{p.price.toLocaleString()}</span>
                            <span className="text-slate-400 line-through font-medium font-mono">₹{p.mrp.toLocaleString()}</span>
                            <span className="text-emerald-600 font-black text-[11px]">
                              {Math.round((1 - p.price / p.mrp) * 100)}% OFF
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {/* Zero Products Fallback */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-24 border border-dashed border-border rounded-2xl bg-slate-50">
                  <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest">No products matching the active filter criteria were found.</p>
                  <button onClick={resetFilters} className="text-slate-900 text-[10px] uppercase font-bold tracking-widest mt-4 hover:underline">Reset Selection</button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: ALTERNATING FEATURE HIGHLIGHT SHUFFLE ==================== */}
      <section className="py-28 bg-slate-50/50 border-t border-border relative">
        <div className="absolute top-1/2 left-1/2 w-[550px] h-[550px] bg-slate-200/[0.1] rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container max-w-7xl mx-auto px-4 space-y-40 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono tracking-widest text-slate-400 uppercase block">Product Innovations</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-slate-900">INNOVATION HIGHLIGHTS</h2>
            <p className="text-muted-foreground text-xs md:text-sm max-w-lg mx-auto font-light">Explore reliable, high-quality nutrition designed to support your daily athletic progression clean and efficiently.</p>
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
                  "flex flex-col gap-16 items-center justify-between w-full p-8 md:p-16 rounded-3xl bg-white border border-border relative overflow-hidden group shadow-sm",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                {/* TEXT LAYER */}
                <motion.div variants={textGlideUpVariants} className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-border rounded-md">
                    <Activity className="h-3.5 w-3.5 text-slate-800" />
                    <span className="text-[9px] uppercase tracking-widest font-mono text-slate-700 font-bold">Featured Formulation 0{idx + 1}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-slate-900">
                    {p.name}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                    {p.tagline} Carefully crafted using quality parameters to ensure consistent nutritional value, fitting seamlessly into your structured fitness targets.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-left max-w-sm mx-auto lg:mx-0">
                    <div className="p-3 bg-slate-50 border border-border rounded-xl">
                      <span className="block text-[8px] font-mono text-muted-foreground uppercase">Rating Index</span>
                      <span className="text-base font-black text-slate-800 flex items-center gap-1 mt-0.5 font-mono">{p.rating} <Star className="h-3 w-3 fill-amber-500 text-amber-500" /></span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-border rounded-xl">
                      <span className="block text-[8px] font-mono text-muted-foreground uppercase">Product Focus</span>
                      <span className="text-xs font-black text-slate-800 block mt-1.5 uppercase tracking-wide">Purity Verified</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link to={`/products/${p.id}`}>
                      <Button className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-xl px-6 h-12 transition-all">
                        Inspect Product <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* IMAGE LAYER */}
                <motion.div variants={imageScrollZoomVariants} className="w-full lg:w-1/2 flex items-center justify-center relative">
                  <Link to={`/products/${p.id}`} className="relative w-full max-w-[300px] md:max-w-[350px] aspect-square block cursor-pointer">
                    <img
                      src={p.image} alt={p.name} loading="lazy"
                      className="w-full h-full object-contain transition-all duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ==================== SECTION 4: SUBSCRIPTION PASSES ==================== */}
      <section className="py-24 bg-background border-t border-border relative">
        <div className="container max-w-6xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-100 border border-border rounded-full text-[10px] font-mono tracking-widest text-slate-800 uppercase font-bold">
              <Zap className="h-3 w-3" /> Recurring Subscriptions
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900">CHOOSE YOUR SUBSCRIPTION PLAN</h2>
            <p className="text-muted-foreground text-xs md:text-sm">Unlock hassle-free automated product deliveries shipped straight to your doorstep on schedule.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            
            {/* ELITE PASS CARD */}
            <div className="bg-white border border-border p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 right-0 bg-slate-900 text-white font-black font-mono px-4 py-1 rounded-bl-xl text-[9px] uppercase tracking-widest">
                Popular Choice
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-border">
                    <Sparkles className="h-6 w-6 text-slate-800" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 leading-none">COMPLETE PERFORMANCE</h3>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mt-1">Full Bundle Plan</span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs font-light leading-relaxed">
                  Grants ongoing automated recurring drop-cycles containing structured flagship stacks delivered safely on time.
                </p>

                <ul className="space-y-2 text-xs font-medium text-slate-700">
                  <li className="flex items-center gap-2"><Dumbbell className="h-3.5 w-3.5 text-slate-800" /> Free Shipping Across All Cycles</li>
                  <li className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-slate-800" /> Direct Priority Order Customization</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-slate-800" /> Guaranteed Product Allocation Locks</li>
                </ul>
              </div>

              <div className="pt-8 border-t border-border mt-8 flex items-end justify-between">
                <div>
                  <span className="block text-[10px] uppercase font-mono text-muted-foreground">Monthly Plan</span>
                  <span className="text-3xl font-black text-slate-900 tracking-tight font-mono">₹4,499<span className="text-xs font-light text-muted-foreground">/mo</span></span>
                </div>
                <Button className="bg-slate-900 text-white hover:bg-slate-800 font-black uppercase text-xs tracking-wider px-6 rounded-xl h-11">
                  Activate Plan
                </Button>
              </div>
            </div>

            {/* BASE PRO PASS CARD */}
            <div className="bg-slate-50/50 border border-border p-8 rounded-3xl flex flex-col justify-between group shadow-sm">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-xl border border-border">
                    <HeartPulse className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-slate-800 leading-none">CORE ESSENTIALS</h3>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mt-1">Fundamental Replenishment</span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs font-light leading-relaxed">
                  Tailored to automate fundamental daily replenishment supplies across single basic essentials seamlessly.
                </p>

                <ul className="space-y-2 text-xs font-medium text-slate-600">
                  <li className="flex items-center gap-2"><Dumbbell className="h-3.5 w-3.5 text-slate-400" /> Standard Logistics Courier Schedules</li>
                  <li className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-slate-400" /> Simple Online Management Interface</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-slate-400" /> Full Batch Inspection Disclosures</li>
                </ul>
              </div>

              <div className="pt-8 border-t border-border mt-8 flex items-end justify-between">
                <div>
                  <span className="block text-[10px] uppercase font-mono text-muted-foreground">Monthly Plan</span>
                  <span className="text-3xl font-black text-slate-900 tracking-tight font-mono">₹2,199<span className="text-xs font-light text-muted-foreground">/mo</span></span>
                </div>
                <Button variant="outline" className="border-border text-slate-700 bg-white hover:bg-slate-50 font-black uppercase text-xs tracking-wider px-6 rounded-xl h-11">
                  Deploy Plan
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== SECTION 5: TRANSPARENCY ASSURANCES ==================== */}
      <section className="py-24 bg-slate-50/50 border-t border-border">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="bg-white border border-border rounded-3xl p-8 md:p-12 grid md:grid-cols-[1fr_2px_1fr] gap-8 items-center shadow-sm">
            
            <div className="space-y-4 text-left">
              <div className="h-8 w-8 rounded-lg bg-slate-100 border border-border flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-slate-800" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900">THE TRANSPARENCY ASSURANCES</h3>
              <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed">
                We focus on straightforward manufacturing clarity. Verification testing metrics, raw item breakdowns, and clear macro details across all product layers remain completely accessible to ensure your peace of mind.
              </p>
            </div>

            <div className="h-full w-full bg-slate-100 hidden md:block" />

            <div className="space-y-4 text-left">
              <h4 className="text-xs uppercase font-mono font-black tracking-widest text-muted-foreground">Quality Controls</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-slate-900 font-bold font-mono">01/</span>
                  <p className="text-slate-600 font-light"><strong className="text-slate-800 font-bold">Thoroughly Audited Process:</strong> Formulated using highly strict guidelines matching standard composition targets accurately.</p>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-slate-900 font-bold font-mono">02/</span>
                  <p className="text-slate-600 font-light"><strong className="text-slate-800 font-bold">Precise Label Matching:</strong> Content weights and compound listings align directly with the printed specs present on our product pack labels.</p>
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