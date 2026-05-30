import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { categories, products, type Category } from "@/data/products";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-10">
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
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="group relative grid grid-cols-[1fr_auto] items-center gap-6 bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.45)] transition-all duration-300"
              >
                <div className="min-w-0 order-1">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-primary">{p.category}</p>
                  <h3 className="mt-1.5 text-xl md:text-2xl font-bold leading-tight group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.tagline}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-primary text-primary" /> {p.rating}
                    <span>·</span>
                    <span>{p.reviews} reviews</span>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold">₹{p.price.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground line-through">₹{p.mrp.toLocaleString()}</span>
                    <span className="text-xs font-semibold text-primary ml-1">Save {Math.round((1 - p.price / p.mrp) * 100)}%</span>
                  </div>
                  <Button size="sm" className="mt-5 bg-primary hover:bg-primary/90 group-hover:translate-x-1 transition-transform">
                    Enter <ChevronRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
                <div className="order-2 relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent blur-2xl group-hover:from-primary/40 transition-all" />
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="relative h-full w-full object-contain drop-shadow-[0_10px_30px_hsl(var(--primary)/0.35)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;