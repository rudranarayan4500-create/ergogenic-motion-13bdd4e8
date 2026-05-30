import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, Star, SlidersHorizontal, RotateCcw, LayoutGrid, Sliders, CheckSquare, Square } from "lucide-react";
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

  // Advanced Multi-Axis Filtering Engine
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Price Cap Filter
    result = result.filter((p) => p.price <= maxPrice);

    // Stock Visibility Toggle Simulation
    if (!showOutOfStock) {
      result = result.filter((p) => p.reviews > 5); // Simulating stock condition via dummy matrix value
    }

    // Sorting Logics
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [activeCategory, maxPrice, showOutOfStock, sortBy]);

  // Count active filter points
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

  return (
    <div className="bg-black text-white min-h-screen selection:bg-primary selection:text-black overflow-x-hidden antialiased">
      <PageHero
        eyebrow="ERGOGENIC NUTRITION · CULT SYSTEM"
        title="THE COMPLETE ARSENAL"
        subtitle="Fueling the future of human performance with ultra-potent elite formulas designed to deliver legendary physical results."
      />

      {/* CORE MARKETPLACE MATRIX */}
      <section className="py-12 bg-black relative">
        <div className="container max-w-[1600px] mx-auto px-4">
          
          {/* TOP CONTROLS BAR: FILTER COUNTS & SORT ENGINE */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-bold uppercase tracking-wider">
                <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                <span>Filter</span>
                <span className="bg-primary text-black h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-black font-mono">
                  {activeFilterCount}
                </span>
              </div>
              <span className="text-neutral-500 text-xs font-mono font-semibold">
                {filteredProducts.length} PRODUCTS AVAILABLE
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-neutral-500 text-xs uppercase font-bold tracking-wider">Sort By:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-xs rounded-lg px-3 py-1.5 font-bold uppercase tracking-wider text-white focus:outline-none focus:border-primary cursor-pointer transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="grid xl:grid-cols-[300px_1fr] gap-8 items-start">
            
            {/* FULL COMPREHENSIVE FILTER SIDEBAR ASIDE */}
            <aside className="space-y-6 bg-neutral-950/40 border border-neutral-900 rounded-2xl p-5 sticky top-24 max-h-[85vh] overflow-y-auto scrollbar-none hidden xl:block">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
                <span className="text-xs uppercase font-black tracking-widest text-neutral-400 flex items-center gap-2">
                  <Sliders className="h-3.5 w-3.5 text-primary" /> Matrix Parameters
                </span>
                {activeFilterCount > 0 && (
                  <button onClick={resetFilters} className="text-[10px] text-primary font-bold uppercase tracking-wider flex items-center gap-1 hover:underline">
                    <RotateCcw className="h-2.5 w-2.5" /> Clear All
                  </button>
                )}
              </div>

              {/* 1. GENDER SEGMENT */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Gender</h4>
                <div className="grid grid-cols-3 gap-1 bg-black p-1 rounded-lg border border-neutral-900">
                  {["all", "unisex", "custom"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGender(g)}
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

              {/* 2. CATEGORY COMPONENT */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Category</h4>
                <div className="space-y-1 max-h-[160px] overflow-y-auto pr-1 scrollbar-none">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={cn(
                      "w-full text-left text-xs py-1.5 px-2.5 rounded transition-all font-medium flex items-center justify-between",
                      activeCategory === null ? "bg-primary/10 text-primary font-bold border border-primary/20" : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                    )}
                  >
                    <span>All Formulations</span>
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => handleCategoryChange(c.name)}
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

              {/* 3. PRICE RANGE CAP SLIDER */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Price Threshold</h4>
                  <span className="font-mono text-xs text-primary font-bold">₹{maxPrice.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="900" max="7000" step="100" value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary bg-neutral-900 h-1 rounded cursor-pointer"
                />
              </div>

              {/* 4. ACTIVITY FILTER */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Activity Target</h4>
                <div className="flex flex-wrap gap-1">
                  {["all", "bodybuilding", "crossfit", "running"].map((act) => (
                    <button
                      key={act}
                      onClick={() => setSelectedActivity(act)}
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

              {/* 5. SIZE FILTER */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Container Size</h4>
                <div className="grid grid-cols-4 gap-1">
                  {["all", "30 Serv", "60 Serv", "90 Serv"].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
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

              {/* 6. STOCK STATUS TOGGLE VISIBILITY */}
              <div className="pt-2 border-t border-neutral-900 flex items-center justify-between">
                <span className="text-[10px] uppercase font-black tracking-wider text-neutral-500">Out of Stock Compounds</span>
                <button 
                  onClick={() => setShowOutOfStock(!showOutOfStock)}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {showOutOfStock ? (
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-primary">
                      <CheckSquare className="h-4 w-4" /> Show
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-neutral-600">
                      <Square className="h-4 w-4" /> Hide
                    </div>
                  )}
                </button>
              </div>
            </aside>

            {/* HIGH-DENSITY PRECISE 4-COLUMN RESPONSIVE GRID CONFIGURATION */}
            <div className="space-y-6">
              
              {/* Mobile quick swipe-filters fallbacks */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 xl:hidden scrollbar-none">
                <Button 
                  variant={activeCategory === null ? "default" : "outline"} size="sm" 
                  onClick={() => handleCategoryChange(null)} className="rounded-full text-[10px] uppercase font-bold tracking-wider h-7 px-3 shrink-0"
                >
                  All
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
                        {/* High-Contrast Backdrop Glow Circle */}
                        <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-primary/[0.01] group-hover:bg-primary/[0.04] blur-2xl transition-all duration-500 pointer-events-none" />

                        <div>
                          {/* CARD IMAGE LAYER: Dynamic zoom & levitation on hover */}
                          <div className="w-full aspect-square relative flex items-center justify-center bg-black/40 border border-neutral-900/40 rounded-lg mb-4 p-4 overflow-hidden">
                            <img
                              src={p.image}
                              alt={p.name}
                              loading="lazy"
                              className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-2"
                            />
                            
                            {/* Fast-action System tag */}
                            <div className="absolute top-2 left-2">
                              <span className="text-[8px] font-bold tracking-widest font-mono uppercase bg-black/80 text-primary border border-primary/20 px-1.5 py-0.5 rounded">
                                {p.category.split(' ')[0]}
                              </span>
                            </div>
                          </div>

                          {/* TEXT & DETAILS LAYER: Smooth clean canvas presentation */}
                          <div className="space-y-1.5 text-left">
                            <div className="flex items-center justify-between gap-1 text-[10px] text-neutral-500 font-medium">
                              <span className="truncate max-w-[120px] uppercase font-mono tracking-wider">{p.flavours?.[0] || "Unflavored"}</span>
                              <div className="flex items-center gap-0.5 text-neutral-300 shrink-0">
                                <Star className="h-2.5 w-2.5 fill-primary text-primary" />
                                <span className="font-bold">{p.rating}</span>
                              </div>
                            </div>
                            
                            <h3 className="text-sm md:text-base font-black uppercase tracking-tight line-clamp-1 group-hover:text-primary transition-colors duration-300 text-white">
                              {p.name}
                            </h3>
                            
                            <p className="text-[11px] text-neutral-400 line-clamp-2 font-light leading-snug h-8">
                              {p.tagline}
                            </p>
                          </div>
                        </div>

                        {/* TRANSACTION MATRIX CAP */}
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
                              View <ChevronRight className="h-3 w-3 ml-0.5" />
                            </Button>
                          </Link>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-24 border border-dashed border-neutral-900 rounded-2xl bg-neutral-950/10">
                      <p className="text-neutral-500 font-medium text-xs">No compounds matching your exact matrix parameter combination filters.</p>
                      <button onClick={resetFilters} className="text-primary text-[10px] uppercase font-bold tracking-wider mt-3 hover:underline">
                        Reset All Matrix Parameters
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