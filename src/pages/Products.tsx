import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, Star, Layers, Flame } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { categories, products, type Category } from "@/data/products";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Products = () => {
  const [params, setParams] = useSearchParams();
  const initial = (params.get("cat") as Category | null) ?? null;
  const [active, setActive] = useState<Category | null>(initial);

  const filtered = useMemo(
    () => (active ? products.filter((p) => p.category === active) : products),
    [active]
  );

  const set = (c: Category | null) => {
    setActive(c);
    if (c) setParams({ cat: c }); else setParams({});
  };

  return (
    <>
      <PageHero
        eyebrow="ERGOGENIC NUTRITION · 2026 CATALOGUE"
        title="FUELING THE FUTURE OF PERFORMANCE"
        subtitle="Engineered for performance with ultra-potent elite formulas. Tested independently to yield legendary results."
      />
      
      <section className="py-16 bg-black text-white selection:bg-primary selection:text-black overflow-hidden">
        <div className="container max-w-6xl mx-auto px-4">
          
          {/* Custom Brochure Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-16 justify-center">
            <button
              onClick={() => set(null)}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold border transition-all duration-300",
                active === null 
                  ? "bg-primary border-primary text-black shadow-lg shadow-primary/20" 
                  : "border-white/10 text-white/60 hover:border-white/30 hover:bg-white/5"
              )}
            >
              All Arsenal
            </button>
            {categories.map((c) => (
              <button
                key={c.name}
                onClick={() => set(c.name)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold border transition-all duration-300",
                  active === c.name 
                    ? "bg-primary border-primary text-black shadow-lg shadow-primary/20" 
                    : "border-white/10 text-white/60 hover:border-white/30 hover:bg-white/5"
                )}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Large Full-Width Alternating Rows With Motion Smooth-Layout */}
          <motion.div layout className="flex flex-col gap-16 md:gap-24">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, index) => {
                // Alternation layout engine flag based on product index
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={`/products/${p.id}`}
                      className={cn(
                        "group relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 bg-gradient-to-b from-neutral-900/50 to-neutral-950 border border-neutral-800/60 rounded-3xl p-8 md:p-14 w-full transition-all duration-500 hover:border-primary/40 hover:shadow-[0_40px_80px_-20px_hsl(var(--primary)/0.15)]",
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      )}
                    >
                      {/* Left/Right Text Section (Takes maximum card area) */}
                      <div className="flex-1 min-w-0 space-y-5 w-full">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-bold bg-primary/10 px-3 py-1 rounded">
                            {p.category}
                          </span>
                          {p.flavours && (
                            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
                              {p.flavours[0]}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none group-hover:text-primary transition-colors duration-300">
                          {p.name}
                        </h3>
                        
                        <p className="text-base md:text-lg text-neutral-400 max-w-2xl font-normal leading-relaxed">
                          {p.tagline}
                        </p>

                        {/* Brochure Specific Ingredients & Badges */}
                        <div className="grid grid-cols-2 gap-4 py-2 max-w-md">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">Core Ingredients:</span>
                            <p className="text-xs text-neutral-300 truncate font-mono">
                              {p.mainIngredients.join(" · ")}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">Target Matrix:</span>
                            <p className="text-xs text-neutral-300 truncate">
                              {p.keyBenefits[0]}
                            </p>
                          </div>
                        </div>

                        {/* Ratings & Reviews Breakdown */}
                        <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
                          <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/5">
                            <Star className="h-3 w-3 fill-primary text-primary" /> 
                            <span className="font-semibold text-neutral-200">{p.rating}</span>
                          </div>
                          <span>·</span>
                          <span>{p.reviews} verified elite reviews</span>
                        </div>

                        {/* Dynamic Pricing Layout */}
                        <div className="flex items-center gap-3 pt-3">
                          <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                            ₹{p.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-neutral-500 line-through">
                            ₹{p.mrp.toLocaleString()}
                          </span>
                          <span className="text-xs font-bold text-primary border border-primary/20 bg-primary/5 px-2.5 py-0.5 rounded-full">
                            SAVE {Math.round((1 - p.price / p.mrp) * 100)}%
                          </span>
                        </div>

                        {/* Detail Enter Action */}
                        <div className="pt-4">
                          <Button 
                            size="lg" 
                            className="bg-primary text-black font-bold uppercase tracking-wider text-xs hover:bg-primary/90 px-6 py-6 rounded-xl shadow-xl shadow-primary/10 group-hover:translate-x-2 transition-all duration-300"
                          >
                            Enter Details <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                          </Button>
                        </div>
                      </div>

                      {/* Alternate Right/Left Framed Massive Image Presentation */}
                      <div className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[360px] aspect-square flex items-center justify-center shrink-0 py-4">
                        {/* Smooth localized structural lighting effects */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-3xl group-hover:from-primary/25 group-hover:scale-125 transition-all duration-700 ease-out" />
                        
                        {/* Dynamic hover transformation & subtle rotation tilt */}
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="relative h-full w-full object-contain filter drop-shadow-[0_25px_45px_hsl(var(--primary)/0.25)] transition-all duration-700 cubic-bezier(0.16,1,0.3,1) group-hover:scale-105 group-hover:-translate-y-3 group-hover:rotate-3"
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
          
          {/* Footer Contact Info from Brochure */}
          <div className="mt-24 pt-8 border-t border-neutral-900 text-center text-xs text-neutral-500 space-y-1">
            <p className="uppercase tracking-widest font-mono">For Trade Queries & Orders Contact:</p>
            <p className="text-primary font-bold text-sm tracking-wider">+91 82880 01279</p>
          </div>

        </div>
      </section>
    </>
  );
};

export default Products;