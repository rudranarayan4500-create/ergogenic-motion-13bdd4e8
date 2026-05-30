import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
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
        eyebrow="Shop"
        title="The complete arsenal"
        subtitle="Every product is engineered with clinical doses, tested at independent labs, and built to deliver."
      />
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-16 justify-center">
            <button
              onClick={() => set(null)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium border transition-colors",
                active === null ? "bg-primary border-primary text-primary-foreground" : "border-white/15 text-white/80 hover:bg-white/5"
              )}
            >
              All Products
            </button>
            {categories.map((c) => (
              <button
                key={c.name}
                onClick={() => set(c.name)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium border transition-colors",
                  active === c.name ? "bg-primary border-primary text-primary-foreground" : "border-white/15 text-white/80 hover:bg-white/5"
                )}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Smooth container layout transitions */}
          <motion.div layout className="flex flex-col gap-20 md:gap-32">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, index) => {
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full"
                  >
                    <Link
                      to={`/products/${p.id}`}
                      className={cn(
                        "group relative flex flex-col gap-8 w-full justify-between items-center transition-all duration-300 pb-12 border-b border-white/10 last:border-0",
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      )}
                    >
                      {/* Text Content - Completely Open, No Card Box */}
                      <div className="min-w-0 flex-1 space-y-4 w-full">
                        <div>
                          <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold">{p.category}</p>
                          <h3 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-none group-hover:text-primary transition-colors duration-300">
                            {p.name}
                          </h3>
                        </div>
                        
                        <p className="text-base md:text-lg text-muted-foreground max-w-xl font-light leading-relaxed">
                          {p.tagline}
                        </p>
                        
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Star className="h-3.5 w-3.5 fill-primary text-primary" /> 
                          <span className="font-semibold text-white">{p.rating}</span>
                          <span>·</span>
                          <span>{p.reviews} reviews</span>
                        </div>
                        
                        <div className="flex items-baseline gap-3 pt-1">
                          <span className="text-3xl font-black text-white">₹{p.price.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground line-through">₹{p.mrp.toLocaleString()}</span>
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                            Save {Math.round((1 - p.price / p.mrp) * 100)}%
                          </span>
                        </div>
                        
                        <div className="pt-2">
                          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 rounded-xl font-semibold group-hover:translate-x-2 transition-transform duration-300">
                            Enter details <ChevronRight className="h-4 w-4 ml-1.5" />
                          </Button>
                        </div>
                      </div>

                      {/* Image Frame - Large presentation, floating without boxes */}
                      <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 shrink-0 flex items-center justify-center">
                        {/* Ambient under-glow behind the product image */}
                        <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/15 transition-all duration-500 scale-110" />
                        
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="relative h-full w-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-3 group-hover:rotate-2"
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Products;