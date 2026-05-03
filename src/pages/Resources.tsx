import { ArrowRight, BookOpen } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";

const articles = [
  { c: "Supplement Usage", t: "How to time your protein for maximum gains", d: "The science of protein timing, dosage windows, and how to actually structure your daily intake.", time: "6 min read" },
  { c: "Training Support", t: "Building a smart pre-workout stack", d: "Caffeine, citrulline, beta-alanine — what works, what doesn't, and how to combine them.", time: "8 min read" },
  { c: "Nutrition Basics", t: "Macros made simple: a complete guide", d: "An honest, no-fluff walkthrough of protein, carbs and fats for athletes at any level.", time: "10 min read" },
  { c: "Recovery", t: "Sleep, stress and supplementation", d: "Why recovery is 50% of your results and the supplements that actually help you bounce back.", time: "7 min read" },
  { c: "Strength", t: "Creatine: the most misunderstood supplement", d: "Loading phases, hydration myths, brand quality — answered with current research.", time: "9 min read" },
  { c: "Fat Loss", t: "Cutting without losing muscle", d: "How to structure a sustainable cut while preserving the strength you've built.", time: "11 min read" },
];

const Resources = () => (
  <div className="bg-[hsl(var(--ink))] text-white min-h-screen">
    <PageHero eyebrow="Resources" title="Knowledge built for athletes" subtitle="Practical, science-first guides on supplementation, training and nutrition." />
    <section className="py-16">
      <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a, i) => (
          <ScrollReveal key={a.t} delay={(i % 3) * 80}>
            <article className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover-lift cursor-pointer h-full">
              <button className="w-full text-left" onClick={() => {}}>
                <div className="aspect-[16/9] bg-gradient-to-br from-primary/30 via-black to-black grid place-items-center">
                  <BookOpen className="h-12 w-12 text-white/50 group-hover:text-primary transition-colors" />
                </div>
                <div className="p-6">
                  <p className="text-xs text-primary tracking-widest uppercase">{a.c}</p>
                  <h3 className="mt-2 text-lg font-bold text-white group-hover:text-primary transition-colors">{a.t}</h3>
                  <p className="mt-2 text-sm text-white/65">{a.d}</p>
                  <div className="mt-5 flex items-center justify-between text-xs">
                    <span className="text-white/50">{a.time}</span>
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
  </div>
);

export default Resources;
