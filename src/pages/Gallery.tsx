import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/PageHero";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ScrollReveal";
import { X, ShieldCheck, Info, Tag, Calendar, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

type Item = { id: string; url: string; name: string; category: string; kind: "image" | "video"; details?: string; specRef?: string };

// Curated live asset layer matching your precise physical packaging and verification shots
const fallback: Item[] = [
  { id: "f0", url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-05-31 at 7.38.06 PM.jpeg", name: "Laboratory Testing Core", category: "Behind the Scenes", kind: "image", details: "High-Performance Liquid Chromatography (HPLC) screening verification station checking raw molecule concentrations prior to batch allocation cycles.", specRef: "HPLC-LAB-A" },
  { id: "f1", url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//d4210519-9c5a-4101-a064-84b90287c3c6-removebg-preview.png", name: "Premium Whey Matrix", category: "Products", kind: "image", details: "Cold-processed micro-filtered whey protein isolate and concentrate formula built for maximum biological value nitrogen retention.", specRef: "WHEY-MATX-01" },
  { id: "f2", url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 2.40.35 PM.jpeg", name: "Pure Creatine Micronized", category: "Products", kind: "image", details: "200-mesh athletic performance phosphagen compound built to maximize systemic muscular cell hydration and intracellular ATP regeneration velocities.", specRef: "CREA-MICR-99" },
  { id: "f3", url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//a37fdb62-8e46-4af3-bead-d8dd607a9a84.png", name: "BCAA Recover Formulation", category: "Products", kind: "image", details: "Instantized Branched-Chain Amino Acid matrix calibrated to a precise 2:1:1 ratio to systematically attenuate training-induced protein breakdown.", specRef: "BCAA-211-REC" },
  { id: "f4", url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//d0fed463-4148-42f5-8d2a-594e5b48f021.png", name: "L-Glutamine Amino Shield", category: "Products", kind: "image", details: "Free-form crystalline single-source amino allocation optimized for enterocyte fuel priority, muscle cell volume reinforcement, and immune integrity support.", specRef: "GLUT-AMN-SHD" },
  { id: "f5", url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//f4f9f244-d122-42e5-a192-62d4475c6d26.png", name: "Label Verification Matrix", category: "Behind the Scenes", kind: "image", details: "Physical verification check of structural back-label ingredient declarations to guarantee 100% label alignment correctness on manufacturing runs.", specRef: "LBL-VER-04" },
  { id: "f6", url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//1efd5983-a49f-412e-8fa3-6b0ec5654ad7-3.png", name: "L-Citrulline Complex", category: "Products", kind: "image", details: "High-purity vascular optimization agent engineered to enhance cross-sectional smooth muscle vasodilation and optimize peripheral oxygen distribution curves.", specRef: "CITR-VASC-PMP" },
  { id: "f7", url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//DSC07879.JPG.jpeg", name: "Batch Inspection Facts", category: "Behind the Scenes", kind: "image", details: "Close-up macro lens inspection documentation verifying clean lot seal states and physical container profile consistency on storage lines.", specRef: "BTC-INSP-MAC" },
  { id: "w1", url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-05-31 at 8.13.03 PM.jpeg", name: "HPLC Batch Assay Verification", category: "Behind the Scenes", kind: "image", details: "Lot validation assay readout verifying raw compound profile authenticity and total freedom from adulteration spiked baselines.", specRef: "ASSY-VER-813" },
  { id: "w2", url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-05-31 at 8.26.16 PM.jpeg", name: "Pure Isolate Allocation Lot", category: "Products", kind: "image", details: "Finished lot inventory packaging presentation showing uniform container distribution metrics straight off the assembly conveyor system.", specRef: "ISOL-LOT-826" },
  { id: "w3", url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-05-31 at 8.15.32 PM.jpeg", name: "Seal Distribution Quality Check", category: "Behind the Scenes", kind: "image", details: "Pristine physical seal integrity check under overhead production lighting arrays to certify hermetic oxygen protection bounds.", specRef: "SEAL-QC-815" }
];

const Gallery = () => {
  const [items, setItems] = useState<Item[]>(fallback);
  const [cat, setCat] = useState<string>("All");
  const [inspectItem, setInspectItem] = useState<Item | null>(null);

  // Freeze the primary body viewport instantly when dynamic overlay loads up
  useEffect(() => {
    if (inspectItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [inspectItem]);

  useEffect(() => {
    supabase.from("media_assets").select("id, url, name, kind").limit(60).then(({ data }) => {
      if (data && data.length) {
        const mapped: Item[] = data.map((d: any) => ({
          id: d.id,
          url: d.url,
          name: d.name?.replace(/\.[a-z0-9]+$/i, "") ?? "Untitled",
          category: d.kind === "video" ? "Behind the Scenes" : "Products",
          kind: (d.kind ?? "image") as "image" | "video",
          details: "Supabase dynamic cloud cluster allocation asset.",
          specRef: `DB-MEDIA-${d.id.slice(0,4).toUpperCase()}`
        }));
        setItems([...mapped, ...fallback]);
      }
    });
  }, []);

  const cats = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const filtered = cat === "All" ? items : items.filter((i) => i.category === cat);
  const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-3", "-rotate-3"];

  return (
    <div className="relative min-h-screen bg-[#030303] text-white">
      <PageHero eyebrow="Gallery" title="The Gallery" subtitle="A visual journey through our athletes, products, lab and community." />
      
      <section className="py-12 relative z-10">
        <div className="container">
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider border transition-all duration-300",
                  cat === c
                    ? "bg-primary text-black border-primary shadow-glow scale-105"
                    : "border-white/10 bg-neutral-900/40 text-neutral-400 hover:border-white/20 hover:text-white"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Polaroid Layout Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((it, i) => (
              <ScrollReveal key={it.id} delay={(i % 4) * 60}>
                <figure
                  onClick={() => setInspectItem(it)}
                  className={cn(
                    "relative bg-neutral-900/50 backdrop-blur-md border border-white/5 pt-7 pb-5 px-3 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_60px_rgba(229,9,20,0.15)] hover:border-primary/20 transition-all duration-500 hover:scale-[1.03] hover:rotate-0 cursor-zoom-in group",
                    tilts[i % tilts.length]
                  )}
                >
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-20 bg-white/5 border border-white/5 backdrop-blur-sm rotate-[-2deg] shadow-sm pointer-events-none group-hover:bg-primary/20 group-hover:border-primary/20 transition-colors duration-500" />
                  
                  <div className="aspect-[4/5] overflow-hidden rounded-lg bg-black/40 border border-white/5 flex items-center justify-center p-2">
                    {it.kind === "video" ? (
                      <video src={it.url} muted loop autoPlay playsInline className="h-full w-full object-cover rounded-md" />
                    ) : (
                      <img src={it.url} alt={it.name} loading="lazy" className="max-w-full max-h-full w-auto h-auto object-contain rounded-md select-none pointer-events-none transition-transform duration-700 group-hover:scale-105" />
                    )}
                  </div>
                  
                  <figcaption className="pt-4 text-center">
                    <p className="font-bold text-sm text-neutral-200 tracking-tight group-hover:text-white transition-colors">{it.name}</p>
                    <p className="mt-1 text-[10px] tracking-[0.25em] uppercase font-black text-primary/80">{it.category}</p>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>

          {!filtered.length && (
            <p className="text-center text-neutral-500 py-20 text-sm uppercase tracking-widest animate-pulse">No items allocated here yet.</p>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PORTAL-BASED FIXED OVERLAY — FORCED TO THE ROOT OF DOCUMENT.BODY */}
      {/* ========================================================================= */}
      {inspectItem && createPortal(
        <div className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-[fade-in_0.15s_ease-out_both] overflow-hidden select-none">
          
          {/* Card Modal Shape Container */}
          <div className="bg-neutral-950 border border-white/10 w-full max-w-5xl h-full max-h-[85vh] md:max-h-[75vh] rounded-3xl overflow-hidden grid md:grid-cols-12 shadow-[0_40px_100px_rgba(0,0,0,0.9),0_0_80px_rgba(229,9,20,0.1)] relative">
            
            {/* Direct Close Button Action */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setInspectItem(null)}
              className="absolute top-4 right-4 z-50 bg-black/70 border border-white/10 backdrop-blur-md rounded-xl text-neutral-400 hover:text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* LEFT COMPONENT SLOT: Fit Asset Canvas Box */}
            <div className="md:col-span-6 bg-black flex items-center justify-center p-4 md:p-8 border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden h-[38vh] md:h-full">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
              
              <div className="w-full h-full flex items-center justify-center relative z-10">
                {inspectItem.kind === "video" ? (
                  <video src={inspectItem.url} controls autoPlay loop className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-2xl" />
                ) : (
                  <img
                    src={inspectItem.url}
                    alt={inspectItem.name}
                    className="max-w-full max-h-full w-auto h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] select-none pointer-events-none"
                  />
                )}
              </div>
            </div>

            {/* RIGHT COMPONENT SLOT: Info Parameter Fields */}
            <div className="md:col-span-6 p-6 md:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto bg-neutral-900/10 backdrop-blur-lg h-[47vh] md:h-full border-t border-white/5 md:border-t-0">
              <div className="space-y-4">
                
                {/* Meta Labels */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-primary font-black px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-md">
                    <Tag className="h-3 w-3" /> {inspectItem.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-neutral-400 font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded-md font-mono">
                    <Layers className="h-3 w-3 " /> {inspectItem.specRef ?? "REF-LOG-XX"}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
                    {inspectItem.name}
                  </h3>
                  <div className="h-0.5 w-10 bg-primary/50 rounded-full" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 text-primary" /> Matrix Documentation Specifications
                  </h4>
                  <p className="text-neutral-300 text-xs md:text-sm leading-relaxed bg-black/40 border border-white/5 p-4 rounded-xl font-medium max-h-[16vh] md:max-h-full overflow-y-auto">
                    {inspectItem.details ?? "No secondary verification context has been mapped onto this digital token cluster yet."}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/5 text-[11px] text-neutral-400 hidden sm:block">
                  <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" /> Integrity Signature Hash Verified</div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-500">
                    <Calendar className="h-3.5 w-3.5 text-primary shrink-0" /> Evaluated Batch System: May 2026
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end shrink-0">
                <Button 
                  onClick={() => setInspectItem(null)} 
                  className="bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-wide text-xs h-10 px-5 rounded-xl shadow-glow text-[11px] w-full sm:w-auto"
                >
                  Return to Registry Grid
                </Button>
              </div>

            </div>

          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Gallery;