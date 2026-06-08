import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { 
  ChevronRight, Star, SlidersHorizontal, RotateCcw, Search,
  Activity, ShieldCheck, ArrowDown, ChevronDown, ChevronUp 
} from "lucide-react";
import { categories, products, type Category } from "@/data/products";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const Products = () => {
  const [params, setParams] = useSearchParams();

  // Admin-controlled products from DB (merged with the static catalog)
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  
  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .then(({ data }) => setDbProducts(data ?? []));
  }, []);
  
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
    setSearchQuery("");
    setMaxPrice(7000);
    setShowOutOfStock(true);
    setSortBy("featured");
    setParams({});
  };

  // Comprehensive Live Matrix Filtering Logic Engine
  const filteredProducts = useMemo(() => {
    const uniqueProductMatrix = new Map<string, any>();

    // 1. Seed static hardcoded catalogue elements 
    products.forEach((p: any) => {
      const primaryKey = p.slug || p.id;
      uniqueProductMatrix.set(primaryKey, { ...p });
    });

    // 2. Overwrite / Append with live admin DB lines cleanly matching unique slugs
    dbProducts.forEach((d) => {
      const liveKey = d.slug || d.id;
      const normalName = d.name?.toLowerCase().trim() || "";
      
      // Setup base variables
      let productFeaturedImage = d.image;
      let structuredGallery: string[] = Array.isArray(d.media)
        ? d.media.map((m: any) => m?.url).filter(Boolean)
        : [];

      // STRICT OVERRIDE: Prioritize your review photos directly based on string matching
      if (normalName.includes("hyper no short") || normalName.includes("hyper-no")) {
        productFeaturedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.15.53 PM (1).jpeg";
        structuredGallery = [
          "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.15.53 PM (1).jpeg",
          "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 5.12.52 PM.jpeg",
          "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 5.06.26 PM.jpeg"
        ];
      } else if (normalName.includes("micro power") || normalName.includes("creatin")) {
        productFeaturedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.34.42 PM.jpeg";
        structuredGallery = ["https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.34.42 PM.jpeg"];
      } else if (normalName.includes("caffeine")) {
        productFeaturedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 9.44.38 PM.jpeg";
        structuredGallery = ["https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 9.44.38 PM.jpeg"];
      } else if (normalName.includes("super whey")) {
        productFeaturedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 2.05.49 PM.jpeg";
        structuredGallery = [
          "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 2.05.49 PM.jpeg",
          "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 7.37.43 PM.jpeg",
          "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 5.27.30 PM.jpeg"
        ];
      } else if (normalName.includes("viper 3") || normalName.includes("viper-3")) {
        productFeaturedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.55.42 PM.jpeg";
        structuredGallery = ["https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.55.42 PM.jpeg"];
      } else if (normalName.includes("aminoshot")) {
        productFeaturedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 5.12.52 PM.jpeg";
      } else if (normalName.includes("glutashot")) {
        productFeaturedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 5.06.26 PM.jpeg";
      } else if (normalName.includes("plasma")) {
        productFeaturedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 1.16.35 PM.jpeg";
        structuredGallery = ["https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 1.16.35 PM.jpeg"];
      }

      // Final fallback checker if the db string contains an empty placeholder string
      if (!productFeaturedImage || productFeaturedImage === "/placeholder.svg") {
        const fallbackObj = uniqueProductMatrix.get(liveKey);
        productFeaturedImage = fallbackObj?.image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80";
      }

      uniqueProductMatrix.set(liveKey, {
        id: d.id || d.slug, 
        slug: d.slug,
        name: d.name,
        tagline: d.tagline ?? "",
        price: Number(d.price) || 0,
        mrp: Number(d.mrp) || Number(d.price) || 0,
        category: (d.category as Category) || "Essentials",
        image: productFeaturedImage,
        description: d.description ?? "",
        benefits: d.benefits ?? [],
        howToUse: d.how_to_use ?? "",
        ingredients: d.ingredients ?? [],
        rating: Number(d.rating) || 4.8,
        reviews: Number(d.reviews) || 0,
        gallery: structuredGallery.length > 0 ? structuredGallery : undefined,
      });
    });

    let result = Array.from(uniqueProductMatrix.values());

    // 3. EXCLUSION FILTER: Drop structural clones while maintaining deep system accessibility maps
    const excludedProductNames = [
      "pure creatin", 
      "bcaa recover", 
      "glutamine x", 
      "lean shot thermogenic", 
      "v-shot multivitamin", 
      "daily multi", 
      "myogenetix concentrate", 
      "ginseng extract"
    ];
    
    result = result.filter(p => !excludedProductNames.includes(p.name?.toLowerCase().trim()));

    // 4. Text Query Search Filter Validation
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) => 
          p.name.toLowerCase().includes(query) || 
          p.tagline?.toLowerCase().includes(query)
      );
    }

    // 5. Active Category Routing Match Filter
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 6. Quantitative Price Cap Bounds Filter
    result = result.filter((p) => p.price <= maxPrice);

    // 7. Availability Simulation Threshold Filter
    if (!showOutOfStock) {
      result = result.filter((p) => p.reviews > 5); 
    }

    // 8. Multi-Mode Sorting Execution Layer
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    
    return result;
  }, [activeCategory, searchQuery, maxPrice, showOutOfStock, sortBy, dbProducts]);

  // Display specific visibility grids while preserving general navigation maps
  const visibleDisplayProducts = useMemo(() => {
    const layoutDisplayExclusions = ["super whey", "plasma mass", "amino shot caplets"];
    return filteredProducts.filter(p => !layoutDisplayExclusions.includes(p.name?.toLowerCase().trim()));
  }, [filteredProducts]);

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
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.05 }
    }
  };

  const textGlideUpVariants: any = {
    hidden: { opacity: 0, y: 60 },
    whileInView: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const imageScrollZoomVariants: any = {
    hidden: { opacity: 0, scale: 0.85 },
    whileInView: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const bannerHeadingCharacters = "THE COMPLETE PRODUCTS".split("");

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-slate-950 selection:text-white overflow-x-hidden antialiased">
      
      {/* ==================== SECTION 1: HERO BANNER ==================== */}
      <header className="py-24 md:py-32 bg-background border-b border-border relative overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-slate-100 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-xs font-mono tracking-[0.3em] text-slate-500 uppercase block font-black"
          >
            Product Lines
          </motion.span>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-slate-900 select-none">
            {bannerHeadingCharacters.map((letter, idx) => (
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
              className="inline-block w-1.5 h-8 sm:h-12 md:h-16 bg-slate-900 ml-1 translate-y-1"
            />
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed text-slate-600"
          >
            Engineered clean formulations focused on transparent profiles and everyday fitness support.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex justify-center pt-4"
          >
            <ArrowDown className="animate-bounce text-slate-400 h-5 w-5" />
          </motion.div>
        </div>
      </header>

      {/* ==================== SECTION 2: SIDEBAR LAYOUT ==================== */}
      <section className="py-16 bg-background">
        <div className="container max-w-[1600px] mx-auto px-4">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
            
            {/* UNIFIED LEFT SIDEBAR FILTER ARCHITECTURE */}
            <aside className="xl:col-span-3 space-y-2 pr-2 sticky top-24 max-h-[85vh] overflow-y-auto scrollbar-none text-left border-b xl:border-b-0 xl:border-r border-slate-200 pb-8 xl:pb-0">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-slate-900" />
                  <span>Filter Matrix ({activeFilterCount})</span>
                </div>
                {activeFilterCount > 0 && (
                  <button 
                    onClick={resetFilters}
                    className="text-[10px] font-mono uppercase text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="h-3 w-3" /> Clear Matrix
                  </button>
                )}
              </div>

              {/* SIDEBAR ACCORDION 1: SEARCH BLOCK */}
              <div className="border-b border-slate-200 py-3">
                <button onClick={() => toggleFilterSection("search")} className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900">
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
                          placeholder="Search products..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl h-11 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
                        />
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SIDEBAR ACCORDION 2: COMPONENT CLASS BUTTONS */}
              <div className="border-b border-slate-200 py-3">
                <button onClick={() => toggleFilterSection("category")} className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900">
                  <span>Product Lines</span>
                  {expandedFilters.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <AnimatePresence initial={true}>
                  {expandedFilters.category && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-3 max-h-[220px] overflow-y-auto scrollbar-none space-y-1">
                      <button onClick={() => handleCategoryChange(null)} className={cn("w-full text-left py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-transparent", !activeCategory ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900")}>All Lines</button>
                      {categories.map((c) => (
                        <button key={c.name} onClick={() => handleCategoryChange(c.name)} className={cn("w-full text-left py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider truncate border border-transparent transition-all", activeCategory === c.name ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900")}>
                          {c.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SIDEBAR ACCORDION 3: RANGE SLIDER FOR PRICING */}
              <div className="border-b border-slate-200 py-3">
                <button onClick={() => toggleFilterSection("price")} className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900">
                  <span>Price Ranges</span>
                  {expandedFilters.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <AnimatePresence initial={true}>
                  {expandedFilters.price && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-4 pb-1 space-y-2">
                      <input type="range" min="900" max="7000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-slate-900 bg-slate-100 h-1 rounded-full cursor-pointer" />
                      <div className="flex justify-between text-[11px] font-mono text-slate-500 font-bold"><span>₹900</span><span className="text-slate-900">₹{maxPrice.toLocaleString()}</span></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SIDEBAR ACCORDION 4: DEMOGRAPHICS */}
              <div className="border-b border-slate-200 py-3">
                <button onClick={() => toggleFilterSection("gender")} className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors">
                  <span>Target Demographics</span>
                  {expandedFilters.gender ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <AnimatePresence>
                  {expandedFilters.gender && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-3 space-y-2 text-xs text-slate-600 font-medium font-mono uppercase">
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="accent-slate-900 rounded bg-slate-50 border-slate-200" /> Unisex Core</label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-slate-900 rounded bg-slate-50 border-slate-200" /> Men Allocation</label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-slate-900 rounded bg-slate-50 border-slate-200" /> Women Allocation</label>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </aside>

            {/* RIGHT DISPLAY GRID: RESULTS */}
            <div className="xl:col-span-9 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 text-xs text-slate-500">
                <span className="font-mono font-bold tracking-wider uppercase">
                  Products Found: <span className="text-slate-900 font-sans font-black">{visibleDisplayProducts.length}</span>
                </span>
                
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wider font-bold">Sort By:</span>
                  <select 
                    value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold uppercase tracking-wide text-slate-700 focus:outline-none focus:border-slate-400 cursor-pointer transition-colors px-2.5 py-1.5"
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
                  {visibleDisplayProducts.map((p, index) => {
                    const dynamicSlugRoute = p.slug || p.id;
                    const isNewArrival = index === 0;
                    const isPriceDrop = index === 2;

                    return (
                      <motion.div
                        key={`product-card-${dynamicSlugRoute}`} 
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.96 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        exit={{ opacity: 0, scale: 0.93 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="group flex flex-col text-left relative"
                      >
                        <div className="w-full aspect-square relative bg-slate-50 rounded-2xl mb-3.5 flex items-center justify-center overflow-hidden border border-slate-200">
                          <Link to={`/products/${dynamicSlugRoute}`} className="w-full h-full block cursor-pointer">
                            <img
                              src={p.image}
                              alt={p.name} 
                              loading="lazy"
                              className="w-full h-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80";
                              }}
                            />
                          </Link>

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

                        <div className="space-y-1 px-1">
                          <h3 className="text-sm font-black tracking-tight text-slate-800 group-hover:text-slate-900 transition-colors line-clamp-1">
                            <Link to={`/products/${dynamicSlugRoute}`}>{p.name}</Link>
                          </h3>
                          
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                            <div className="flex items-center text-amber-500">
                              <Star className="h-3 w-3 fill-amber-500 stroke-none" /> 
                              <span className="text-slate-700 ml-0.5 font-sans">{p.rating || 4.5}</span>
                            </div>
                            <span className="text-slate-300">|</span>
                            <span className="font-medium text-slate-500 font-mono">{p.reviews || 12} Reviews</span>
                          </div>

                          <div className="flex items-center gap-2 pt-0.5 text-xs">
                            <span className="font-black text-slate-900 text-sm font-mono">₹{p.price.toLocaleString()}</span>
                            <span className="text-slate-400 line-through font-medium font-mono">₹{p.mrp.toLocaleString()}</span>
                            <span className="text-emerald-600 font-black text-[11px]">
                              {p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0}% OFF
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {visibleDisplayProducts.length === 0 && (
                <div className="text-center py-24 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">No matching product lines found inside active filter parameters.</p>
                  <button onClick={resetFilters} className="text-slate-900 text-[10px] uppercase font-bold tracking-widest mt-4 hover:underline">Reset Selection</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: FEATURE HIGHLIGHTS ==================== */}
      <section className="py-28 bg-slate-50/50 border-t border-slate-200 relative">
        <div className="absolute top-1/2 left-1/2 w-[550px] h-[550px] bg-slate-100 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container max-w-7xl mx-auto px-4 space-y-40 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono tracking-widest text-slate-400 uppercase block">Product Innovations</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-slate-900">INNOVATION HIGHLIGHTS</h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-lg mx-auto font-light">Explore structured compound profiles designed to support workout progression clean and efficiently.</p>
          </div>

          {visibleDisplayProducts.slice(0, 3).map((p, idx) => {
            const isEven = idx % 2 === 0;
            const dynamicSlugRoute = p.slug || p.id;
            return (
              <motion.div 
                key={`feature-row-${dynamicSlugRoute}`}
                variants={sectionContainerVariants}
                initial="hidden"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-120px" }}
                className={cn(
                  "flex flex-col gap-16 items-center justify-between w-full p-8 md:p-16 rounded-3xl bg-white border border-slate-200 relative overflow-hidden group shadow-sm",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >