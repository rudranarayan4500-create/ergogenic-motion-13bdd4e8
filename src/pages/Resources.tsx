import { useState } from "react";
import { ArrowRight, BookOpen, Clock, X } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Article = { c: string; t: string; d: string; time: string; body: string[] };

const articles: Article[] = [
  {
    c: "Supplement Usage", t: "How to time your protein for maximum gains", d: "The science of protein timing, dosage windows, and how to actually structure your daily intake.", time: "6 min read",
    body: [
      "Protein timing matters less than total daily intake, but it isn't irrelevant. Aim for 1.6–2.2 g/kg of bodyweight spread across 3–5 feedings.",
      "Post-workout, a 25–40 g dose of fast-absorbing protein (whey isolate, hydrolysate) raises muscle protein synthesis to its peak.",
      "Casein before bed (30–40 g) sustains amino acid release through the overnight fast.",
      "Plant proteins work too — just combine sources or bump the dose by 25% to match the leucine content of whey.",
    ],
  },
  {
    c: "Training Support", t: "Building a smart pre-workout stack", d: "Caffeine, citrulline, beta-alanine — what works, what doesn't, and how to combine them.", time: "8 min read",
    body: [
      "Caffeine 3–6 mg/kg is the single most validated performance enhancer. Take 30–45 min before training.",
      "L-Citrulline 6–8 g lifts plasma arginine more than arginine itself and improves blood flow + repetitions to failure.",
      "Beta-alanine 3.2–6.4 g/day (split to avoid tingling) buffers muscle pH and extends high-intensity work capacity.",
      "Skip the proprietary blends. A stack with disclosed clinical doses always outperforms a 'megapump explosion' mystery scoop.",
    ],
  },
  {
    c: "Nutrition Basics", t: "Macros made simple: a complete guide", d: "An honest, no-fluff walkthrough of protein, carbs and fats for athletes at any level.", time: "10 min read",
    body: [
      "Set protein first: 1.6–2.2 g/kg. Non-negotiable for muscle, satiety and recomp.",
      "Set fat second: 0.6–1 g/kg as a floor for hormones and absorption.",
      "Fill the rest with carbs. They fuel training quality, recovery and brain function.",
      "Calorie target = goal-dependent: -300 to -500 for fat loss, +200 to +400 for lean gain.",
    ],
  },
  {
    c: "Recovery", t: "Sleep, stress and supplementation", d: "Why recovery is 50% of your results and the supplements that actually help you bounce back.", time: "7 min read",
    body: [
      "Sleep is the single most under-utilised performance tool. 7–9 hours, dark room, cool temperature.",
      "Magnesium glycinate 200–400 mg supports sleep onset and reduces cramping.",
      "Ashwagandha 300–600 mg/day lowers cortisol in high-stress periods.",
      "Creatine and adequate carbs accelerate glycogen replenishment between sessions.",
    ],
  },
  {
    c: "Strength", t: "Creatine: the most misunderstood supplement", d: "Loading phases, hydration myths, brand quality — answered with current research.", time: "9 min read",
    body: [
      "Creatine monohydrate is the gold standard. Other forms cost more without added benefit.",
      "Loading is optional. 3–5 g/day saturates muscles in ~4 weeks vs ~1 week of loading.",
      "It doesn't cause hair loss, kidney damage or 'water bloat' in lean muscle — only intramuscular water rises.",
      "Take it any time of day, with or without food. Consistency > timing.",
    ],
  },
  {
    c: "Fat Loss", t: "Cutting without losing muscle", d: "How to structure a sustainable cut while preserving the strength you've built.", time: "11 min read",
    body: [
      "Modest deficit: 300–500 kcal under maintenance. Aggressive cuts burn muscle.",
      "Protein up to 2.2–2.6 g/kg during a cut to spare lean mass.",
      "Keep training heavy. The stimulus is what tells the body to keep its muscle.",
      "Add a daily 7–10k step floor instead of slashing calories further.",
    ],
  },
];

const Resources = () => {
  const [open, setOpen] = useState<Article | null>(null);
  return (
    <div className="bg-[hsl(var(--ink))] text-white min-h-screen">
      <PageHero eyebrow="Resources" title="Knowledge built for athletes" subtitle="Practical, science-first guides on supplementation, training and nutrition." />
      <section className="py-16">
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <ScrollReveal key={a.t} delay={(i % 3) * 80}>
              <article className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover-lift h-full">
                <button className="w-full text-left" onClick={() => setOpen(a)}>
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary/30 via-black to-black grid place-items-center">
                    <BookOpen className="h-12 w-12 text-white/50 group-hover:text-primary transition-colors group-hover:scale-110 duration-300" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-primary tracking-widest uppercase">{a.c}</p>
                    <h3 className="mt-2 text-lg font-bold text-white group-hover:text-primary transition-colors">{a.t}</h3>
                    <p className="mt-2 text-sm text-white/65">{a.d}</p>
                    <div className="mt-5 flex items-center justify-between text-xs">
                      <span className="text-white/50 inline-flex items-center gap-1"><Clock className="h-3 w-3" />{a.time}</span>
                      <span className="inline-flex items-center text-primary font-semibold gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
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
                <p className="text-xs text-primary tracking-widest uppercase">{open.c}</p>
                <DialogTitle className="text-2xl md:text-3xl">{open.t}</DialogTitle>
                <DialogDescription className="text-white/60 flex items-center gap-2"><Clock className="h-3 w-3" />{open.time}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-white/80 leading-relaxed mt-2">
                {open.body.map((p, i) => (<p key={i} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>{p}</p>))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;
