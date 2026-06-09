import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
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
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  
  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .then(({ data }) => setDbProducts(data ?? []));
  }, []);
  
  const initialCat = (params.get("cat") as Category | null) ?? null;
  const [activeCategory, setActiveCategory] = useState<Category | null>(initialCat);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(7000);
  const [showOutOfStock, setShowOutOfStock] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("featured");

  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    search: true, category: true, price: true, gender: false
  });

  const toggleFilterSection = (section: string) => {
    setExpandedFilters(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (c: Category | null) => {
    setActiveCategory(c);
    c ? setParams({ cat: c }) : setParams({});
  };

  const resetFilters = () => {
    setActiveCategory(null);
    setSearchQuery("");
    setMaxPrice(7000);
    setShowOutOfStock(true);
    setSortBy("featured");
    setParams({});
  };

  const filteredProducts = useMemo(() => {
    const uniqueProductMatrix = new Map<string, any>();

    // 1. Seed static catalogue
    products.forEach((p: any) => {
      const key = String(p.name).toLowerCase().trim();
      uniqueProductMatrix.set(key, { ...p });
    });

    // 2. Overwrite with DB products
    dbProducts.forEach((d) => {
      if (!d?.name) return;
      const key = String(d.name).toLowerCase().trim();
      
      // Image override logic
      let productFeaturedImage = d.image || "";
      // ... (Keep your existing if/else image override logic here)

      uniqueProductMatrix.set(key, {
        ...d,
        id: d.id || d.slug,
        slug: d.slug,
        name: d.name,
        price: Number(d.price) || 0,
        mrp: Number(d.mrp) || Number(d.price) || 0,
        image: productFeaturedImage || uniqueProductMatrix.get(key)?.image,
        rating: Number(d.rating) || 4.8,
        reviews: Number(d.reviews) || 0,
      });
    });

    let result = Array.from(uniqueProductMatrix.values());

    // 3. Exclusions
    const excluded = ["pure creatin", "pure creatine", "micro-power creatine", "bcaa recover", "glutamine x", "lean shot thermogenic", "v-shot multivitamin", "daily multi", "myogenetix concentrate", "ginseng extract", "amino shot caplets"];
    result = result.filter(p => !excluded.includes(String(p?.name).toLowerCase().trim()));

    // 4. Filtering
    if (searchQuery) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeCategory) result = result.filter(p => p.category === activeCategory);
    result = result.filter(p => p.price <= maxPrice);

    // 5. Sorting
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    
    return result;
  }, [activeCategory, searchQuery, maxPrice, sortBy, dbProducts]);

  return (
    <div className="bg-background min-h-screen antialiased">
      {/* ... Hero Section Remains Same ... */}

      <section className="py-16">
        <div className="container max-w-[1600px] mx-auto px-4 grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Sidebar ... */}
          
          <div className="xl:col-span-9">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((p) => (
                  <motion.div key={`card-${p.name}`} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group">
                    {/* FIXED: Uniform Aspect Ratio & Cover */}
                    <div className="w-full aspect-[4/5] bg-slate-50 rounded-2xl mb-4 overflow-hidden border border-slate-200 relative">
                      <Link to={`/products/${p.slug || p.id}`} className="block w-full h-full">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </Link>
                    </div>
                    
                    <div className="space-y-1 px-1">
                      <h3 className="text-sm font-black text-slate-900 line-clamp-1">
                        <Link to={`/products/${p.slug || p.id}`}>{p.name}</Link>
                      </h3>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="font-black text-slate-900 font-mono">₹{p.price.toLocaleString()}</span>
                        <span className="text-slate-400 line-through text-xs font-mono">₹{p.mrp.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;