import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, Star, SlidersHorizontal, RotateCcw, Sliders, CheckSquare, Square, Activity, ShieldCheck, ArrowDown } from "lucide-react";
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

  // Advanced Filtering Engine
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

  // Scroll Animations Config
  const sectionContainerVariants = {
    hidden: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
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

  const imageZoomVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    whileInView: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-primary selection:text-black overflow-x-hidden antialiased">
      {/* 1. HERO HEADER BANNER */}
      <PageHero
        eyebrow="ERGOGENIC NUTRITION · CULT SYSTEM"
        title="THE COMPLETE ARSENAL"
        subtitle="Fueling the future of human performance with ultra-potent elite formulas designed to deliver legendary physical results."
      />

      {/* 2. CULT-STYLE DYNAMIC FEATURE ROW SPOTLIGHTS */}
      <section className="py-24 bg-black relative border-b border-neutral-900">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="container max-w-7xl mx-auto px-4 space-y-36 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full">
              <Activity className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-400 font-bold">Elite Formulations Matrix</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">Product Spotlights</h2>
            <p className="text-neutral-400 text-sm md:text-base">Experience reactive visual fields highlighting our core compound breakthroughs.</p>
            <div className="flex justify-center pt-2">
              <ArrowDown className="animate-bounce text-primary h-5 w-5" />
            </div>
          </div>

          {products.slice(0, 2).map((p, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={`spotlight-${p.id}`}
                variants={sectionContainerVariants}
                initial="hidden"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-100px" }}
                className={cn(
                  "flex flex-col gap-12 items-center justify-between w-full p-8 md:p-12 rounded-3xl bg-neutral-950/40 border border-neutral-900/60 backdrop-blur-sm relative overflow-hidden group",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                {/* Ambient glowing oval profile inside container bounding box */}
                <div className={cn(
                  "absolute w-[300px] h-[300px] rounded-[50%] blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none -z-10",
                  isEven ? "-right-10 -top-10 bg-primary/20" : "-left-10 -bottom-10 bg-primary/20"
                )} />

                {/* FLOWING TEXT LAYER - RISES UP FROM DOWN SIDE TO UPSIDE */}
                <motion.div variants={textGlideUpVariants} className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black border border-neutral-800 rounded-md">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[10px] uppercase tracking-wider font-mono text-neutral-300 font-semibold">{p.category}</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none">
                    {p.name}
                  </h3>
                  <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {p.tagline || "Engineered to reshape performance threshold response matrix baselines cleanly without standard formula filler compounds."}
                  </p>
                  <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
                    <Link to={`/products/${p.id}`}>
                      <Button className="bg-primary text-black font-extrabold text-xs uppercase tracking-wider rounded-xl px-6 py-5 group-hover:bg-primary/90 transition-all shadow-lg shadow-primary/5">
                        Configure Compound <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* IMAGES TARGET LAYER - LINKED ZOOM IN TRIPPED BY SCREEN SCROLL */}
                <motion.div variants={imageZoomVariants} className="w-full lg:w-1/2 flex items-center justify-center relative">
                  <Link to={`/products/${p.id}`} className="relative w-full max-w-[280px] md:max-w-[360px] aspect-square block cursor-pointer">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-[60px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-3 group-hover:rotate-2"
                    />
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. CORE INTERACTIVE STORE & FILTER MATRIX */}
      <section className="py-16 bg-neutral-950/20">
        <div className="container max-w-[1600px] mx-auto px-4">
          
          {/* CONTROL STRIP */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-bold uppercase tracking-wider">
                <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                <span>Filter Engine Matrix</span>
                <span className="bg-primary text-black h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-black font-mono">
                  {activeFilterCount}
                </span>
              </div>
              <span className="text-neutral-500 text-xs font-mono font-semibold">
                {filteredProducts.length} SYSTEM SKU MATCHES
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-neutral-500 text-xs uppercase font-bold tracking-wider">Sort Matrix:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-xs rounded-lg px-3 py-1.5 font-bold uppercase tracking-wider text-white focus:outline-none focus:border-primary cursor-pointer transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated System</option>
              </select>
            </div>
          </div>

          <div className="grid xl:grid-cols-[300px_1fr] gap-8 items-start">
            
            {/* COMPLETE FULL MULTI-AXIS SIDEBAR */}
            <aside className="space-y-6 bg-neutral-950/60 border border-neutral-900 rounded-2xl p-5 sticky top-24 max-h-[85vh] overflow-y-auto scrollbar-none hidden xl:block shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
                <span className="text-xs uppercase font-black tracking-widest text-neutral-400 flex items-center gap-2">
                  <Sliders className="h-3.5 w-3.5 text-primary" /> Parameters Matrix
                </span>
                {activeFilterCount > 0 && (
                  <button onClick={resetFilters} className="text-[10px] text-primary font-bold uppercase tracking-wider flex items-center gap-1 hover:underline">
                    <RotateCcw className="h-2.5 w-2.5" /> Reset Matrix
                  </button>
                )}
              </div>

              {/* GENDER */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Gender Allocation</h4>
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

              {/* CATEGORY */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Formulation Category</h4>
                <div className="space-y-1 max-h-[160px] overflow-y-auto pr-1 scrollbar-none">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={cn(
                      "w-full text-left text-xs py-1.5 px-2.5 rounded transition-all font-medium flex items-center justify-between",
                      activeCategory === null ? "bg-primary/10 text-primary font-bold border border-primary/20" : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                    )}
                  >
                    <span>All System Lines</span>
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

              {/* PRICE SLIDER */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Price Ceiling Cap</h4>
                  <span className="font-mono text-xs text-primary font-bold">₹{maxPrice.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="900" max="7000" step="100" value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary bg-neutral-900 h-1 rounded cursor-pointer"
                />
              </div>

              {/* ACTIVITY */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Target Activity</h4>
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

              {/* SIZE CONTAINER */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Compound Size Matrix</h4>
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

              {/* STOCK VISIBILITY MATRIX */}
              <div className="pt-2 border-t border-neutral-900 flex items-center justify-between">
                <span className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Out of Stock SKU Matrix</span>
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
                      <Square className="h-4 w-4" /> Filtered
                    </div>
                  )}
                </button>
              </div>
            </aside>

            {/* HIGH-DENSITY PRECISE 4-COLUMN RESPONSIVE WEB STORE GRID */}
            <div className="space-y-6">
              
              {/* Mobile quick swipe fallback buttons */}
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
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="group flex flex-col justify-between rounded-xl bg-neutral-950/20 border border-neutral-900/60 p-4 hover:border-neutral-800 hover:bg-neutral-950/60 transition-all duration-300 relative overflow-hidden"
                      >
                        {/* High-Contrast Dynamic Backdrop Glow */}
                        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/[0.01] group-hover:bg-primary/[0.04] blur-2xl transition-all duration-500 pointer-events-none" />

                        <div>
                          {/* PRODUCT CARD IMAGE LAYERING - HOVER ZOOMING WITH DIRECT ROUTING REDIRECT */}
                          <Link to={`/products/${p.id}`} className="w-full aspect-square relative flex items-center justify-center bg-black/40 border border-neutral-900/40 rounded-lg mb-4 p-4 overflow-hidden block cursor-pointer">
                            <img
                              src={p.image}
                              alt={p.name}
                              loading="lazy"
                              className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-2"
                            />
                            
                            <div className="absolute top-2 left-2">
                              <span className="text-[8px] font-bold tracking-widest font-mono uppercase bg-black/80 text-primary border border-primary/20 px-1.5 py-0.5 rounded">
                                {p.category.split(' ')[0]}
                              </span>
                            </div>
                          </Link>

                          {/* DETAILS PROFILE MATRICES */}
                          <div className="space-y-1.5 text-left">
                            <div className="flex items-center justify-between gap-1 text-[10px] text-neutral-500 font-medium">
                              <span className="truncate max-w-[120px] uppercase font-mono tracking-wider">{p.flavours?.[0] || "Standard"}</span>
                              <div className="flex items-center gap-0.5 text-neutral-300 shrink-0">
                                <Star className="h-2.5 w-2.5 fill-primary text-primary" />
                                <span className="font-bold">{p.rating}</span>
                              </div>
                            </div>
                            
                            <h3 className="text-sm md:text-base font-black uppercase tracking-tight line-clamp-1 group-hover:text-primary transition-colors duration-300 text-white">
                              <Link to={`/products/${p.id}`}>{p.name}</Link>
                            </h3>
                            
                            <p className="text-[11px] text-neutral-400 line-clamp-2 font-light leading-snug h-8">
                              {p.tagline}
                            </p>
                          </div>
                        </div>

                        {/* PRICE CONTROL CAP FRAME */}
                        <div className="pt-3 border-t border-neutral-900/80 mt-4 flex items-center justify-between gap-2">
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-mono text-neutral-600 line-through leading-none mb-0.5">₹{p.mrp.toLocaleString()}</span>
                            <span className="text-sm font-black text-white tracking-tight leading-none">₹{p.price.toLocaleString()}</span>
                          </div>
                          
                          <Link to={`/products/${p.id}`}>
                            <Button 
                              size="sm" 
                              className="h-8 bg-neutral-900 text-neutral-200 hover:bg-primary hover:text-black border border-neutral-800 text-[10px] uppercase font-bold tracking-wider px-3 rounded-lg transition-all duration-300"
                            >
                              Deploy <ChevronRight className="h-3 w-3 ml-0.5" />
                            </Button>
                          </Link>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-24 border border-dashed border-neutral-900 rounded-2xl bg-neutral-950/10">
                      <p className="text-neutral-500 font-medium text-xs">No tactical compounds match this matrix parameter filter combo layout.</p>
                      <button onClick={resetFilters} className="text-primary text-[10px] uppercase font-bold tracking-wider mt-3 hover:underline">
                        Re-initialize Parameters Matrix
                      </button>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;