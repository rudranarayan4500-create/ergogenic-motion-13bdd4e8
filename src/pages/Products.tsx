import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  ChevronRight, Star, SlidersHorizontal, RotateCcw, 
  ChevronDown, ChevronUp, ArrowDown 
} from "lucide-react";
import { categories, products, type Category } from "@/data/products";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Products = () => {
  const [params, setParams] = useSearchParams();
  
  // Cult Store Interactive Filter States
  const initialCat = (params.get("cat") as Category | null) ?? null;
  const [activeCategory, setActiveCategory] = useState<Category | null>(initialCat);
  const [maxPrice, setMaxPrice] = useState<number>(30000); // Higher limit to accommodate equipment pricing
  const [sortBy, setSortBy] = useState<string>("featured");

  // Accordion Expand/Collapse States for Sidebar
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

  const toggleFilterSection = (section: string) => {
    setExpandedFilters(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (c: Category | null) => {
    setActiveCategory(c);
    if (c) setParams({ cat: c }); else setParams({});
  };

  const resetFilters = () => {
    setActiveCategory(null);
    setMaxPrice(30000);
    setSortBy("featured");
    setParams({});
  };

  // Filter Engine
  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }
    result = result.filter((p) => p.price <= maxPrice);
    
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [activeCategory, maxPrice, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeCategory) count++;
    if (maxPrice < 30000) count++;
    return count;
  }, [activeCategory, maxPrice]);

  return (
    <div className="bg-white text-neutral-900 min-h-screen selection:bg-neutral-900 selection:text-white overflow-x-hidden antialiased font-sans">
      
      {/* ==================== CULT TOP NAVIGATION BAR LINK WRAPPER ==================== */}
      <nav className="w-full bg-white border-b border-neutral-200 sticky top-0 z-50 px-6 py-4 hidden md:block">
        <div className="max-w-[1600px] mx-auto flex items-center justify-center gap-8 text-[13px] font-semibold tracking-wide text-neutral-700">
          <span className="hover:text-black cursor-pointer transition-colors">New Arrivals</span>
          <span className="hover:text-black cursor-pointer transition-colors">Men</span>
          <span className="hover:text-black cursor-pointer transition-colors">Women</span>
          <span className="hover:text-black cursor-pointer text-black font-bold border-b-2 border-black pb-1">Apparel</span>
          <span className="hover:text-black cursor-pointer transition-colors">Footwear</span>
          <span className="hover:text-black cursor-pointer transition-colors">Gym Equipment</span>
          <span className="hover:text-black cursor-pointer transition-colors">Massagers</span>
          <span className="hover:text-black cursor-pointer transition-colors">Accessories</span>
          <span className="hover:text-black cursor-pointer transition-colors">Cycles</span>
          <span className="hover:text-black cursor-pointer transition-colors">Shop by Activity</span>
          <span className="hover:text-black cursor-pointer transition-colors ml-auto text-neutral-500">Store Locator</span>
          <span className="hover:text-black cursor-pointer text-neutral-500">Bulk Orders</span>
        </div>
      </nav>

      {/* BREADCRUMB INDICATOR STRIP */}
      <div className="bg-white px-8 pt-6 pb-2 text-[11px] font-medium tracking-wide text-neutral-400 max-w-[1600px] mx-auto text-left">
        <span>Home</span> <span className="mx-1">›</span> <span>Gym Equipment</span> <span className="mx-1">›</span> <span className="text-neutral-600 font-semibold">Gym Weights</span>
      </div>

      {/* ==================== SECTION 1: SYSTEM EYE CATCHING HERO MODULE ==================== */}
      <header className="py-20 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden flex flex-col items-center justify-center text-center px-4 border-b border-neutral-100">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-mono tracking-[0.25em] text-neutral-500 uppercase block font-bold"
          >
            CULT SPORTLINE PRESET
          </motion.span>

          {/* TYPEWRITER TITLE ANIMATION EFFECT */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-900 uppercase">
            {"THE COMPLETE ARSENAL".split("").map((letter, idx) => (
              <motion.span
                key={`hero-char-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.03, delay: idx * 0.05, ease: "linear" }}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-1 h-8 bg-neutral-900 ml-0.5 translate-y-0.5"
            />
          </h1>

          {/* DYNAMIC SHIMMER GLOW SUBTITLE */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed text-neutral-500 animate-[shimmer_6s_infinite_linear]"
            style={{
              backgroundImage: "linear-gradient(110deg, #666, 45%, #111, 50%, #666)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 100%",
            }}
          >
            Engineered with pharmaceutical rigor. No artificial fillers, full compound disclosures, and peak threshold performance pacing.
          </motion.p>
        </div>
      </header>

      {/* ==================== SPOTLIGHT INTERACTIVE FEATURE ROWS ==================== */}
      <section className="py-16 bg-white max-w-[1600px] mx-auto px-4 border-b border-neutral-100">
        <div className="grid md:grid-cols-2 gap-8">
          {products.slice(0, 2).map((p, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={`spotlight-row-${p.id}`}
                initial="hidden" whileInView="whileInView" viewport={{ once: true }}
                className={cn(
                  "flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-neutral-50 border border-neutral-200/60 group relative overflow-hidden",
                  isEven ? "" : "sm:flex-row-reverse"
                )}
              >
                {/* Floating soft glowing background oval inside spotlight row bounds */}
                <div className="absolute w-48 h-48 rounded-full bg-neutral-200/40 blur-3xl pointer-events-none -z-10 group-hover:scale-125 transition-transform duration-700" />

                {/* TEXT BOUND - FLOWS UP FROM DOWN TO UP */}
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                  className="flex-1 text-left space-y-3"
                >
                  <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-neutral-400 bg-neutral-200/60 px-2 py-0.5 rounded">
                    Spotlight Features
                  </span>
                  <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight group-hover:text-neutral-700 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed line-clamp-3">
                    {p.tagline || "Engineered for elite performers demanding absolute physical output benchmarks safely across target disciplines."}
                  </p>
                  <Link to={`/products/${p.id}`} className="inline-block pt-1">
                    <Button size="sm" className="bg-neutral-900 hover:bg-black text-white text-[11px] font-bold uppercase tracking-wider rounded-lg px-4 h-9">
                      Inspect Compound
                    </Button>
                  </Link>
                </motion.div>

                {/* IMAGE BOUND - INTERACTIVE SCROLL TRIGGERED LINKABLE ZOOM */}
                <motion.div 
                  variants={{ hidden: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1, transition: { duration: 0.7 } } }}
                  className="w-full sm:w-[180px] aspect-square shrink-0 relative flex items-center justify-center bg-white border border-neutral-200 rounded-xl overflow-hidden"
                >
                  <Link to={`/products/${p.id}`} className="w-full h-full p-4 block cursor-pointer">
                    <img 
                      src={p.image} alt={p.name} loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ==================== SECTION 2: CULT ACCORDION STORE MATRICES ==================== */}
      <section className="py-10 bg-white">
        <div className="container max-w-[1600px] mx-auto px-4">
          
          {/* CONTROL STRIP PARITY MATCHING CULT FILTER BAR */}
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 text-neutral-900">
                <SlidersHorizontal className="h-4 w-4 stroke-[2.5]" /> Filter ({activeFilterCount})
              </span>
              <span className="text-neutral-400 font-medium text-xs border-l border-neutral-300 pl-3 ml-1 font-mono">
                {filteredProducts.length} products
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-neutral-400 text-xs font-medium uppercase tracking-wider">Sort by</span>
              <select 
                value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-neutral-800 text-xs font-bold uppercase tracking-wide px-1 py-1 focus:outline-none cursor-pointer border-b border-transparent hover:border-neutral-900"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          <div className="grid lg:grid-cols-[260px_1fr] gap-10 items-start">
            
            {/* STARK ACCORDION FILTER SIDEBAR */}
            <aside className="space-y-1 hidden lg:block border-r border-neutral-100 pr-4 sticky top-24 max-h-[80vh] overflow-y-auto scrollbar-none text-left">
              
              {/* ACCORDION 1: GENDER */}
              <div className="border-b border-neutral-200 py-3.5">
                <button onClick={() => toggleFilterSection("gender")} className="w-full flex items-center justify-between text-sm font-bold text-neutral-800 uppercase tracking-wide">
                  <span>Gender</span>
                  {expandedFilters.gender ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <AnimatePresence initial={false}>
                  {expandedFilters.gender && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-3 space-y-2 text-xs text-neutral-600 font-medium">
                      <label className="flex items-center gap-2 cursor-pointer hover:text-black"><input type="checkbox" defaultChecked className="accent-neutral-950" /> Unisex</label>
                      <label className="flex items-center gap-2 cursor-pointer hover:text-black"><input type="checkbox" className="accent-neutral-950" /> Men</label>
                      <label className="flex items-center gap-2 cursor-pointer hover:text-black"><input type="checkbox" className="accent-neutral-950" /> Women</label>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ACCORDION 2: CATEGORY */}
              <div className="border-b border-neutral-200 py-3.5">
                <button onClick={() => toggleFilterSection("category")} className="w-full flex items-center justify-between text-sm font-bold text-neutral-800 uppercase tracking-wide">
                  <span>Category</span>
                  {expandedFilters.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <AnimatePresence initial={false}>
                  {expandedFilters.category && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-3 max-h-[200px] overflow-y-auto scrollbar-none space-y-1.5 text-xs text-neutral-600 font-medium">
                      <button onClick={() => handleCategoryChange(null)} className={cn("w-full text-left py-1 px-2 rounded", !activeCategory ? "bg-neutral-100 text-black font-bold" : "hover:bg-neutral-50")}>All Categories</button>
                      {categories.map((c) => (
                        <button key={c.name} onClick={() => handleCategoryChange(c.name)} className={cn("w-full text-left py-1 px-2 rounded truncate", activeCategory === c.name ? "bg-neutral-100 text-black font-bold" : "hover:bg-neutral-50")}>
                          {c.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ACCORDION 3: BRAND */}
              <div className="border-b border-neutral-200 py-3.5">
                <button onClick={() => toggleFilterSection("brand")} className="w-full flex items-center justify-between text-sm font-bold text-neutral-800 uppercase tracking-wide">
                  <span>Brand</span>
                  {expandedFilters.brand ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {expandedFilters.brand && <div className="pt-3 text-xs text-neutral-400 font-medium">No external brand overlays loaded.</div>}
              </div>

              {/* ACCORDION 4: PRICE SLIDER */}
              <div className="border-b border-neutral-200 py-3.5">
                <button onClick={() => toggleFilterSection("price")} className="w-full flex items-center justify-between text-sm font-bold text-neutral-800 uppercase tracking-wide">
                  <span>Price</span>
                  {expandedFilters.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <AnimatePresence initial={false}>
                  {expandedFilters.price && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-4 pb-2 space-y-2">
                      <input type="range" min="900" max="30000" step="500" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-neutral-900 bg-neutral-200 h-1 rounded cursor-pointer" />
                      <div className="flex justify-between text-[11px] font-mono font-bold text-neutral-500"><span>Min: ₹900</span><span>Max: ₹{maxPrice.toLocaleString()}</span></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ACCORDION 5: SIZE */}
              <div className="border-b border-neutral-200 py-3.5">
                <button onClick={() => toggleFilterSection("size")} className="w-full flex items-center justify-between text-sm font-bold text-neutral-800 uppercase tracking-wide">
                  <span>Size</span>
                  {expandedFilters.size ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {/* ACCORDION 6: COLOR */}
              <div className="border-b border-neutral-200 py-3.5">
                <button onClick={() => toggleFilterSection("color")} className="w-full flex items-center justify-between text-sm font-bold text-neutral-800 uppercase tracking-wide">
                  <span>Color</span>
                  {expandedFilters.color ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {/* ACCORDION 7: ACTIVITY */}
              <div className="border-b border-neutral-200 py-3.5">
                <button onClick={() => toggleFilterSection("activity")} className="w-full flex items-center justify-between text-sm font-bold text-neutral-800 uppercase tracking-wide">
                  <span>Activity</span>
                  {expandedFilters.activity ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {/* ACCORDION 8: COUNTRY OF ORIGIN */}
              <div className="border-b border-neutral-200 py-3.5">
                <button onClick={() => toggleFilterSection("origin")} className="w-full flex items-center justify-between text-sm font-bold text-neutral-800 uppercase tracking-wide">
                  <span>Country Of Origin</span>
                  {expandedFilters.origin ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
            </aside>

            {/* PRECISE CULT 4-COLUMN HIGH DENSITY GRID PRODUCT VIEWS */}
            <div className="space-y-4">
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((p, index) => {
                    // Alternative badging strategy to recreate image lookups precisely
                    const isNew = index === 0 || index === 3;
                    const isDrop = index === 2;

                    return (
                      <motion.div
                        key={p.id} layout
                        initial={{ opacity: 0, scale: 0.96, y: 15 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-20px" }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="group flex flex-col text-left relative"
                      >
                        {/* SQUARE IMAGE RENDER WITH ATTACHED DIRECT REDIRECT DIRECT LINK ROUTE */}
                        <div className="w-full aspect-square relative bg-[#f7f7f7] rounded-none mb-3 p-6 flex items-center justify-center overflow-hidden">
                          <Link to={`/products/${p.id}`} className="w-full h-full block cursor-pointer">
                            <img 
                              src={p.image} alt={p.name} loading="lazy"
                              className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                            />
                          </Link>

                          {/* REPLICATED CULT FLOATING IMAGE STICKERS */}
                          {isNew && (
                            <div className="absolute top-0 left-0 bg-black text-white font-mono font-black text-[9px] tracking-widest px-2.5 py-1 uppercase">
                              New Arrival
                            </div>
                          )}
                          {isDrop && (
                            <div className="absolute top-0 left-0 bg-sky-950 text-white font-mono font-black text-[9px] tracking-widest px-2.5 py-1 uppercase">
                              Price Drop
                            </div>
                          )}
                        </div>

                        {/* HIGH DENSITY PRODUCT META STACK */}
                        <div className="space-y-1 px-1">
                          <h3 className="text-[13px] font-bold tracking-tight text-neutral-800 group-hover:text-black line-clamp-1">
                            <Link to={`/products/${p.id}`}>{p.name}</Link>
                          </h3>
                          
                          {/* Rating Row block */}
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500">
                            <div className="flex items-center text-amber-500"><Star className="h-3 w-3 fill-current stroke-none" /> <span className="text-neutral-700 ml-0.5">{p.rating || 4.5}</span></div>
                            <span className="text-neutral-300">|</span>
                            <span className="font-medium font-mono text-neutral-400">{p.reviews || 24} Reviews</span>
                          </div>

                          {/* Price Display matching currency structures exactly */}
                          <div className="flex items-center gap-2 pt-0.5 text-xs">
                            <span className="font-extrabold text-neutral-900 text-sm">₹{p.price.toLocaleString()}</span>
                            <span className="text-neutral-400 line-through font-medium">₹{p.mrp.toLocaleString()}</span>
                            <span className="text-orange-600 font-extrabold text-[11px]">
                              {Math.round((1 - p.price / p.mrp) * 100)}% OFF
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
              
              {/* Empty state fallbacks */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-20 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <p className="text-neutral-500 text-sm font-medium">No matching equipment products found matching current active matrix choices.</p>
                  <button onClick={resetFilters} className="mt-3 text-xs text-neutral-900 font-bold underline uppercase tracking-wider">Reset Matrix</button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;