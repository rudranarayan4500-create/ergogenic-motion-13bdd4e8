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
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
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

          {/* Animating container layout shifts */}
          <motion.div layout className="flex flex-col gap-8 md:gap-12">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, index) => {
                // Determine whether the image should go left or right
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full"
                  >
                    <Link
                      to={`/products/${p.id}`}
                      className={cn(
                        "group relative flex flex-col gap-6 bg-card border border-border rounded-2xl p-6 md:p-10 hover:border-primary/50 hover:shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.45)] transition-all duration-300 w-full justify-between items-center",
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      )}
                    >
                      {/* Text Content - Expands across remaining row container space */}
                      <div className="min-w-0 flex-1 space-y-3">
                        <div>
                          <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold">{p.category}</p>
                          <h3 className="mt-1.5 text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight group-hover:text-primary transition-colors">
                            {p.name}
                          </h3>
                        </div>
                        
                        <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                          {p.tagline}
                        </p>
                        
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-primary text-primary" /> {p.rating}
                          <span>·</span>
                          <span>{p.reviews} reviews</span>
                        </div>
                        
                        <div className="flex items-baseline gap-2 pt-1">
                          <span className="text-2xl md:text-3xl font-bold">₹{p.price.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground line-through">₹{p.mrp.toLocaleString()}</span>
                          <span className="text-xs font-semibold text-primary ml-1">
                            Save {Math.round((1 - p.price / p.mrp) * 100)}%
                          </span>
                        </div>
                        
                        <div className="pt-2">
                          <Button size="default" className="bg-primary hover:bg-primary/90 group-hover:translate-x-1 transition-transform">
                            Enter details <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>

                      {/* Large Product Image Section */}
                      <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 shrink-0 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-3xl group-hover:from-primary/25 transition-all duration-500" />
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="relative h-full w-full object-contain drop-shadow-[0_15px_35px_hsl(var(--primary)/0.25)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-2"
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