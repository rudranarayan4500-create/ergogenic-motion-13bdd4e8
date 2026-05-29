import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

type Article = {
  id: string; slug: string; title: string; category: string; tags: string[] | null;
  read_time: string | null; excerpt: string | null; cover_url: string | null; body: string;
};

const fallback: Article[] = [
  { id: "f1", slug: "protein-timing", title: "How to time your protein for maximum gains", category: "Supplement Usage", tags: ["protein"], read_time: "6 min read", cover_url: null,
    excerpt: "The science of protein timing, dosage windows, and how to actually structure your daily intake.",
    body: "Protein timing matters less than total daily intake, but it isn't irrelevant. Aim for 1.6–2.2 g/kg of bodyweight spread across 3–5 feedings.\nPost-workout, a 25–40 g dose of fast-absorbing protein raises muscle protein synthesis to its peak.\nCasein before bed (30–40 g) sustains amino acid release through the overnight fast.\nPlant proteins work too — combine sources or bump the dose by 25% to match leucine content of whey." },
  { id: "f2", slug: "pre-workout-stack", title: "Building a smart pre-workout stack", category: "Training Support", tags: ["pre-workout"], read_time: "8 min read", cover_url: null,
    excerpt: "Caffeine, citrulline, beta-alanine — what works, what doesn't, and how to combine them.",
    body: "Caffeine 3–6 mg/kg is the single most validated performance enhancer. Take 30–45 min before training.\nL-Citrulline 6–8 g lifts plasma arginine more than arginine itself and improves blood flow and repetitions to failure.\nBeta-alanine 3.2–6.4 g/day buffers muscle pH and extends high-intensity work capacity.\nSkip proprietary blends. A stack with disclosed clinical doses always outperforms a mystery scoop." },
  { id: "f3", slug: "macros-made-simple", title: "Macros made simple: a complete guide", category: "Nutrition Basics", tags: ["nutrition"], read_time: "10 min read", cover_url: null,
    excerpt: "An honest, no-fluff walkthrough of protein, carbs and fats for athletes at any level.",
    body: "Set protein first: 1.6–2.2 g/kg.\nSet fat second: 0.6–1 g/kg.\nFill the rest with carbs — they fuel training quality and recovery.\nCalorie target: -300 to -500 for fat loss, +200 to +400 for lean gain." },
];

const Resources = () => {
  const [list, setList] = useState<Article[]>([]);
  const [open, setOpen] = useState<Article | null>(null);

  useEffect(() => {
    supabase.from("articles").select("*").eq("published", true).order("created_at", { ascending: false })
      .then(({ data }) => setList((data?.length ? (data as Article[]) : fallback)));
  }, []);

  return (
    <div className="bg-[hsl(var(--ink))] text-white min-h-screen">
      <PageHero eyebrow="Resources" title="Knowledge built for athletes" subtitle="Practical, science-first guides on supplementation, training and nutrition." />
      <section className="py-16">
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((a, i) => (
            <ScrollReveal key={a.id} delay={(i % 3) * 80}>
              <article className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover-lift h-full">
                <button className="w-full text-left" onClick={() => setOpen(a)}>
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary/30 via-black to-black grid place-items-center overflow-hidden">
                    {a.cover_url ? (
                      <img src={a.cover_url} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <BookOpen className="h-12 w-12 text-white/50 group-hover:text-primary transition-colors group-hover:scale-110 duration-300" />
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-primary tracking-widest uppercase">{a.category}</p>
                    <h3 className="mt-2 text-lg font-bold text-white group-hover:text-primary transition-colors">{a.title}</h3>
                    {a.excerpt && <p className="mt-2 text-sm text-white/65">{a.excerpt}</p>}
                    {!!(a.tags?.length) && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {a.tags!.slice(0, 4).map((t) => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
                      </div>
                    )}
                    <div className="mt-5 flex items-center justify-between text-xs">
                      <span className="text-white/50 inline-flex items-center gap-1"><Clock className="h-3 w-3" />{a.read_time || "5 min read"}</span>
                      <span className="inline-flex items-center text-primary font-semibold gap-1 group-hover:gap-2 transition-all">Read <ArrowRight className="h-3 w-3" /></span>
                    </div>
                  </div>
                </button>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="bg-card border-white/10 text-white max-w-2xl max-h-[85vh] overflow-y-auto">
          {open && (
            <>
              <DialogHeader>
                <p className="text-xs text-primary tracking-widest uppercase">{open.category}</p>
                <DialogTitle className="text-2xl md:text-3xl">{open.title}</DialogTitle>
                <DialogDescription className="text-white/60 flex items-center gap-2"><Clock className="h-3 w-3" />{open.read_time || "5 min read"}</DialogDescription>
              </DialogHeader>
              {open.cover_url && <img src={open.cover_url} alt="" className="rounded-lg w-full aspect-[16/9] object-cover mt-2" />}
              <div className="space-y-4 text-white/80 leading-relaxed mt-2">
                {open.body.split(/\n+/).filter(Boolean).map((p, i) => (
                  <p key={i} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>{p}</p>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;
