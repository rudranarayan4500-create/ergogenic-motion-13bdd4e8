import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/PageHero";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ScrollReveal";

type Item = { id: string; url: string; name: string; category: string; kind: "image" | "video" };

// Fallback curated gallery (used until admin uploads media)
const fallback: Item[] = [
  { id: "1", url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900", name: "Training Floor", category: "Athletes", kind: "image" },
  { id: "2", url: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=900", name: "Whey Lineup", category: "Products", kind: "image" },
  { id: "3", url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900", name: "Pre-Workout Energy", category: "Athletes", kind: "image" },
  { id: "4", url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900", name: "Lab Verification", category: "Behind the Scenes", kind: "image" },
  { id: "5", url: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=900", name: "Strength Lab", category: "Athletes", kind: "image" },
  { id: "6", url: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=900", name: "Track Session", category: "Events", kind: "image" },
  { id: "7", url: "https://images.unsplash.com/photo-1583500178690-f7eb89d6cbfb?w=900", name: "Plasma Mass", category: "Products", kind: "image" },
  { id: "8", url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=900", name: "Nutrition Bar", category: "Products", kind: "image" },
  { id: "9", url: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=900", name: "Pro Athlete", category: "Athletes", kind: "image" },
  { id: "10", url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900", name: "Recovery Set", category: "Behind the Scenes", kind: "image" },
  { id: "11", url: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=900", name: "Team Meet-Up", category: "Events", kind: "image" },
  { id: "12", url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=900", name: "Marathon Day", category: "Events", kind: "image" },
];

const Gallery = () => {
  const [items, setItems] = useState<Item[]>(fallback);
  const [cat, setCat] = useState<string>("All");

  useEffect(() => {
    supabase.from("media_assets").select("id, url, name, kind").limit(60).then(({ data }) => {
      if (data && data.length) {
        const mapped: Item[] = data.map((d: any) => ({
          id: d.id,
          url: d.url,
          name: d.name?.replace(/\.[a-z0-9]+$/i, "") ?? "Untitled",
          category: d.kind === "video" ? "Behind the Scenes" : "Products",
          kind: (d.kind ?? "image") as "image" | "video",
        }));
        setItems([...mapped, ...fallback]);
      }
    });
  }, []);

  const cats = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const filtered = cat === "All" ? items : items.filter((i) => i.category === cat);
  const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-3", "-rotate-3"];

  return (
    <>
      <PageHero eyebrow="Gallery" title="The Gallery" subtitle="A visual journey through our athletes, products, lab and community." />
      <section className="py-12">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium border transition-all",
                  cat === c
                    ? "bg-foreground text-background border-foreground shadow-lg scale-105"
                    : "border-border bg-card text-foreground/80 hover:border-foreground/40"
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((it, i) => (
              <ScrollReveal key={it.id} delay={(i % 4) * 60}>
                <figure
                  className={cn(
                    "relative bg-card pt-7 pb-5 px-3 rounded-sm shadow-[0_10px_30px_-12px_hsl(0_0%_0%/0.45)] hover:shadow-[0_25px_60px_-15px_hsl(0_0%_0%/0.65)] transition-all duration-500 hover:scale-[1.03] hover:rotate-0 cursor-zoom-in",
                    tilts[i % tilts.length]
                  )}
                >
                  {/* tape */}
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-20 bg-yellow-100/80 dark:bg-yellow-200/30 rotate-[-2deg] shadow-sm pointer-events-none" />
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    {it.kind === "video" ? (
                      <video src={it.url} muted loop autoPlay playsInline className="h-full w-full object-cover" />
                    ) : (
                      <img src={it.url} alt={it.name} loading="lazy" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <figcaption className="pt-4 text-center">
                    <p className="font-semibold text-sm">{it.name}</p>
                    <p className="mt-1 text-[10px] tracking-[0.25em] uppercase text-primary">{it.category}</p>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
          {!filtered.length && (
            <p className="text-center text-foreground/50 py-20">No items in this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Gallery;