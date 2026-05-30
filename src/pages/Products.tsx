import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, Star, SlidersHorizontal, RotateCcw, ArrowDown } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { categories, products, type Category } from "@/data/products";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Products = () => {
  const [params, setParams] = useSearchParams();
  
  // E-commerce Filtering State
  const initialCat = (params.get("cat") as Category | null) ?? null;
  const [activeCategory, setActiveCategory] = useState<Category | null>(initialCat);
  const [maxPrice, setMaxPrice] = useState<number>(7000);
  const [formFactor, setFormFactor] = useState<string>("all");

  // Sync Search Params with UI States
  const handleCategoryChange = (c: Category | null) => {
    setActiveCategory(c);
    if (c) setParams({ cat: c }); else setParams({});
  };

  const resetFilters = () => {
    setActiveCategory(null);
    setMaxPrice(7000);
    setFormFactor("all");
    setParams({});
  };

  // Multi-Filter Engine
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory ? p.category === activeCategory : true;
      const matchesPrice = p.price <= maxPrice;
      const matchesForm = 
        formFactor === "all" 
          ? true 
          : formFactor === "caplets" 
            ? p.category.toLowerCase().includes("caplets") 
            : !p.category.toLowerCase().includes("caplets");

      return matchesCategory && matchesPrice && matchesForm;
    });
  }, [activeCategory, maxPrice, formFactor]);

  // Framer Motion Variants for Scroll-Driven Zoom and Glide Ups
  const scrollContainerVariants = {
    hidden: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const textGlideUpVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <div className="bg-black text-white min-h-screen selection:bg-primary selection:text-black overflow-x-hidden">
      {/* 1. HERO BANNER */}
      <PageHero
        eyebrow="ERGOGENIC NUTRITION · 2026 LINEUP"
        title="THE COMPLETE ARSENAL"
        subtitle="Fueling the future of performance with ultra-potent elite formulas designed to deliver legendary results."
      />

      {/* 2. PREMIUM FEATURED SPOTLIGHTS SECTION (Alternating Layouts with Scroll Animations) */}
      <section className="py-20 bg-gradient-to-b from-black to-neutral-950 border-b border-neutral-900">
        <div className="container max-w-7xl mx-auto px-4 space-y-32">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono tracking-widest text-primary uppercase">Elite Formulations</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">Product Spotlights</h2>
            <p className="text-neutral-400 text-sm md:text-base">Discover the science, the power, and the delivery mechanisms making waves across sports science engineering fields.</p>
            <div className="flex justify-center pt-4">
              <ArrowDown className="animate-bounce text-primary h-5 w-5" />
            </div>
          </div>

          {products.slice(0, 2).map((p, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={`spotlight-${p.id}`}
                variants={scrollContainerVariants}
                initial="hidden"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-100px" }}
                className={cn(
                  "flex flex-col gap-12 items-center justify-between w-full",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                {/* TEXT SIDE - GLIDES FROM DOWN TO UP */}
                <motion.div variants={textGlideUpVariants} className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                  <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                    <span className="text-[10px] uppercase tracking-widest font-mono text-primary font-bold">{p.category}</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none">
                    {p.name}
                  </h3>
                  <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {p.tagline || "Engineered for elite performers demanding absolute strength, pure clarity, and maximized recovery thresholds."}
                  </p>
                  <div className="flex items-center justify-center lg:justify-start gap-6 pt-2">
                    <div className="text-left">
                      <span className="block text-xs font-mono text-neutral-500 uppercase">Rating Score</span>
                      <span className="text-xl font-black text-white flex items-center gap-1">
                        {p.rating} <Star className="h-4 w-4 fill-primary text-primary inline" />
                      </span>
                    </div>
                    <div className="h-8 w-px bg-neutral-800" />
                    <div className="text-left">
                      <span className="block text-xs font-mono text-neutral-500 uppercase">System Integrity</span>
                      <span className="text-sm font-bold text-neutral-200">100% Tested Base</span>
                    </div>
                  </div>
                </motion.div>

                {/* IMAGE SIDE - SMOOTH ZOOM IN EFFECT WITH GLOWING OVAL */}
                <motion.div variants={imageZoomVariants} className="w-full lg:w-1/2 flex items-center justify-center relative">
                  {/* Glowing Oval Shape Backdrop Wrapper */}
                  <div className="absolute w-[70%] h-[85%] rounded-[50%] bg-primary/10 blur-[80px] md:blur-[120px] animate-pulse pointer-events-none" />
                  
                  <div className="relative w-full max-w-[320px] md:max-w-[400px] aspect-square group">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-1"
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. MAIN INTERACTIVE STOREFRONT */}
      <section className="py-16 bg-black">
        <div className="container max-w-7xl mx-auto px-4">
          
          <div className="mb-10">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">Browse The Store</h2>
            <p className="text-neutral-500 text-xs md:text-sm">Filter tactical configurations using our advanced filter engine matrix.</p>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
            
            {/* LEFT SIDE: ADVANCED DESKTOP FILTER CONTROLS */}
            <aside className="sticky top-24 space-y-8 bg-neutral-950 border border-neutral-900 rounded-2xl p-6 hidden lg:block">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-900">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  <span>Filters</span>
                </div>
                <button 
                  onClick={resetFilters}
                  className="text-xs text-neutral-500 hover:text-primary transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              </div>

              {/* Category Segment */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-neutral-400">Categories</h4>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={cn(
                      "text-left text-sm py-1.5 px-3 rounded-lg font-medium transition-all",
                      activeCategory === null 
                        ? "bg-primary text-black font-bold" 
                        : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                    )}
                  >
                    All Formulations
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => handleCategoryChange(c.name)}
                      className={cn(
                        "text-left text-sm py-1.5 px-3 rounded-lg font-medium transition-all",
                        activeCategory === c.name 
                          ? "bg-primary text-black font-bold" 
                          : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                      )}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Ranger Segment */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-neutral-400">Max Price</h4>
                  <span className="font-mono text-xs text-primary font-bold">₹{maxPrice.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="900" 
                  max="7000" 
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary bg-neutral-800 h-1 rounded-lg cursor-pointer"
                />
              </div>

              {/* Form Factor Switcher */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-neutral-400">Delivery System</h4>
                <div className="grid grid-cols-3 gap-1 bg-black p-1 rounded-xl border border-neutral-900">
                  {["all", "powders", "caplets"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormFactor(type)}
                      className={cn(
                        "text-[10px] uppercase tracking-wider font-bold py-2 rounded-lg transition-all text-center",
                        formFactor === type ? "bg-neutral-900 text-primary border border-neutral-800" : "text-neutral-500 hover:text-neutral-300"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* RIGHT SIDE: INTERACTIVE GRID LISTINGS */}
            <div className="space-y-4">
              
              {/* Mobile Filter Tabs Horizontal View */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 lg:hidden scrollbar-none">
                <Button 
                  variant={activeCategory === null ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => handleCategoryChange(null)}
                  className="rounded-full shrink-0 text-xs"
                >
                  All
                </Button>
                {categories.map((c) => (
                  <Button
                    key={c.name}
                    variant={activeCategory === c.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryChange(c.name)}
                    className="rounded-full shrink-0 text-xs"
                  >
                    {c.name}
                  </Button>
                ))}
              </div>

              {/* Products Yield List */}
              <motion.div layout className="flex flex-col gap-16 md:gap-24">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p, index) => {
                      const isEven = index % 2 === 0;

                      return (
                        <motion.div
                          key={p.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95, y: 30 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full"
                        >
                          <Link
                            to={`/products/${p.id}`}
                            className={cn(
                              "group flex flex-col gap-8 w-full justify-between items-center transition-all duration-300 pb-12 border-b border-neutral-900 last:border-0",
                              isEven ? "md:flex-row" : "md:flex-row-reverse"
                            )}
                          >
                            {/* TEXT DYNAMICS */}
                            <div className="min-w-0 flex-1 space-y-4 w-full text-left">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold bg-primary/10 px-2.5 py-1 rounded">
                                  {p.category}
                                </span>
                                {p.flavours && p.flavours.length > 0 && (
                                  <span className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">
                                    {p.flavours[0]}
                                  </span>
                                )}
                              </div>
                              
                              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none group-hover:text-primary transition-colors duration-300 text-white">
                                {p.name}
                              </h3>
                              
                              <p className="text-sm md:text-base text-neutral-400 max-w-xl font-light leading-relaxed">
                                {p.tagline}
                              </p>
                              
                              {/* Features row */}
                              <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs font-medium text-neutral-500">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3.5 w-3.5 fill-primary text-primary" /> 
                                  <span className="text-neutral-200 font-bold">{p.rating}</span>
                                </div>
                                <span>·</span>
                                <span>{p.reviews} Reviews</span>
                                {p.mainIngredients && (
                                  <>
                                    <span>·</span>
                                    <span className="text-neutral-400 font-mono">{p.mainIngredients[0]} Base</span>
                                  </>
                                )}
                              </div>
                              
                              <div className="flex items-baseline gap-3 pt-1">
                                <span className="text-2xl font-black text-white tracking-tight">₹{p.price.toLocaleString()}</span>
                                <span className="text-xs text-neutral-600 line-through font-medium">₹{p.mrp.toLocaleString()}</span>
                                <span className="text-[10px] font-extrabold text-primary border border-primary/20 bg-primary/5 px-2 py-0.5 rounded uppercase tracking-wider">
                                  Save {Math.round((1 - p.price / p.mrp) * 100)}%
                                </span>
                              </div>
                              
                              <div className="pt-2">
                                <Button 
                                  size="sm" 
                                  className="bg-primary text-black font-bold uppercase tracking-widest text-[10px] px-6 rounded-xl group-hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/5 group-hover:translate-x-1"
                                >
                                  Explore Formulation <ChevronRight className="h-3 w-3 ml-1" />
                                </Button>
                              </div>
                            </div>

                            {/* HOVER DYNAMIC IMAGE SYSTEM */}
                            <div className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[340px] aspect-square flex items-center justify-center shrink-0">
                              <div className="absolute inset-0 rounded-full bg-primary/[0.02] blur-2xl group-hover:bg-primary/[0.08] transition-all duration-700 ease-out scale-125" />
                              
                              <img
                                src={p.image}
                                alt={p.name}
                                loading="lazy"
                                className="relative h-full w-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-3 group-hover:rotate-2"
                              />
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="text-center py-24 border border-dashed border-neutral-900 rounded-2xl bg-neutral-950/40">
                      <p className="text-neutral-500 font-medium">No tactical supplements match your selected criteria filters.</p>
                      <button onClick={resetFilters} className="text-primary text-xs uppercase font-bold tracking-wider mt-3 hover:underline">
                        Clear Selections
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