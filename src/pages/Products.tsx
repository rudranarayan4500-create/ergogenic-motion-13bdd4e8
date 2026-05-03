import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, type Category } from "@/data/products";
import { cn } from "@/lib/utils";

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;