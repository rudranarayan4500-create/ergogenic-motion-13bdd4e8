import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, Star, SlidersHorizontal, RotateCcw, Flame, Sparkles } from "lucide-react";
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

  // Highly Targeted Multi-Filter Engine
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

  return (
    <div className="bg-black text-white min-h-screen selection:bg-primary selection:text-black">
      <PageHero
        eyebrow="ERGOGENIC NUTRITION · 2026 LINEUP"
        title="THE COMPLETE ARSENAL"
        subtitle="Fueling the future of performance with ultra-potent elite formulas designed to deliver legendary results."
      />

      <section className="py-12 border-t border-neutral-900">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
            
            {/* LEFT SIDE: ADVANCED E-COMMERCE FILTER CONTROLS */}
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

            {/* RIGHT SIDE: PREMIUM NO-BOX ALTERNATING IMAGE LISTINGS */}
            <div className="space-y-4">
              
              {/* Mobile Filter Tabs Quick View (Fallbacks for smaller screens) */}
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

              {/* Products Yield Grid */}
              <motion.div layout className="flex flex-col gap-24 md:gap-40">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p, index) => {
                      const isEven = index % 2 === 0;

                      return (
                        <motion.div
                          key={p.id}
                          layout
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full"
                        >
                          <Link
                            to={`/products/${p.id}`}
                            className={cn(
                              "group flex flex-col gap-10 w-full justify-between items-center transition-all duration-300 pb-16 border-b border-neutral-900 last:border-0",
                              isEven ? "md:flex-row" : "md:flex-row-reverse"
                            )}
                          >
                            {/* TEXT SECTION (Clean Canvas Typography) */}
                            <div className="min-w-0 flex-1 space-y-5 w-full">
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
                              
                              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none group-hover:text-primary transition-colors duration-300 text-white">
                                {p.name}
                              </h3>
                              
                              <p className="text-base md:text-lg text-neutral-400 max-w-xl font-light leading-relaxed">
                                {p.tagline}
                              </p>
                              
                              {/* Core Matrix / Features row */}
                              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-neutral-500">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3.5 w-3.5 fill-primary text-primary" /> 
                                  <span className="text-neutral-200 font-bold">{p.rating}</span>
                                </div>
                                <span>·</span>
                                <span>{p.reviews} Verified Reviews</span>
                                {p.mainIngredients && (
                                  <>
                                    <span>·</span>
                                    <span className="text-neutral-400 font-mono">{p.mainIngredients[0]} Base</span>
                                  </>
                                )}
                              </div>
                              
                              <div className="flex items-baseline gap-3 pt-2">
                                <span className="text-3xl font-black text-white tracking-tight">₹{p.price.toLocaleString()}</span>
                                <span className="text-sm text-neutral-600 line-through font-medium">₹{p.mrp.toLocaleString()}</span>
                                <span className="text-[11px] font-extrabold text-primary border border-primary/20 bg-primary/5 px-2 py-0.5 rounded uppercase tracking-wider">
                                  Save {Math.round((1 - p.price / p.mrp) * 100)}%
                                </span>
                              </div>
                              
                              <div className="pt-2">
                                <Button 
                                  size="lg" 
                                  className="bg-primary text-black font-bold uppercase tracking-widest text-xs px-7 rounded-xl group-hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/5 group-hover:translate-x-2"
                                >
                                  Explore Formulation <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                              </div>
                            </div>

                            {/* EXTRA LARGE BACKGROUND-REMOVED FLOATING IMAGE CONFIGURATION */}
                            <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] aspect-square flex items-center justify-center shrink-0">
                              {/* Ambient soft glow mapping under product image profile */}
                              <div className="absolute inset-0 rounded-full bg-primary/[0.03] blur-3xl group-hover:bg-primary/[0.12] transition-all duration-700 ease-out scale-125" />
                              
                              <img
                                src={p.image}
                                alt={p.name}
                                loading="lazy"
                                className="relative h-full w-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)] drop-shadow-[0_10px_30px_hsl(var(--primary)/0.2)] transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-4 group-hover:rotate-3"
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