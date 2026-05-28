import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import creatine from "@/assets/ingredient-creatine.png";
import whey from "@/assets/ingredient-whey.png";
import citrulline from "@/assets/ingredient-citrulline.png";
import caffeine from "@/assets/ingredient-caffeine.png";
import bcaa from "@/assets/ingredient-bcaa.png";
import glutamine from "@/assets/ingredient-glutamine.png";

type Usage = { product: string; percent: number; per: string };
type Ingredient = {
  name: string;
  img: string;
  short: string;
  body: string;
  dose: string;
  usage: Usage[];
};

const items: Ingredient[] = [
  {
    name: "Creatine Monohydrate",
    img: creatine,
    short: "The single most studied performance compound in sports science.",
    body: "Saturates muscle phosphocreatine stores to regenerate ATP faster — translating directly into more reps, more power output and accelerated lean-mass gains. Micronised for instant solubility.",
    dose: "3–5 g daily",
    usage: [
      { product: "Pure Creatine", percent: 100, per: "5 g per scoop" },
      { product: "Plasma Mass", percent: 12, per: "3 g per 2-scoop serving" },
    ],
  },
  {
    name: "Whey Protein",
    img: whey,
    short: "Cold-processed isolate + concentrate with a complete amino profile.",
    body: "Fast-absorbing, instantised and lab-verified. Drives muscle protein synthesis post-training and fills any daily protein gap with ~80% purity.",
    dose: "20–30 g per serving",
    usage: [
      { product: "Super Whey", percent: 82, per: "27 g per 33 g scoop" },
      { product: "Myogenetix Concentrate", percent: 72, per: "24 g per 33 g scoop" },
      { product: "Plasma Mass", percent: 30, per: "30 g per 100 g serving" },
    ],
  },
  {
    name: "L-Citrulline",
    img: citrulline,
    short: "Boosts plasma arginine and nitric-oxide more efficiently than arginine itself.",
    body: "Drives bigger pumps, sustained blood flow, and measurable endurance improvements. The flagship pre-workout ingredient.",
    dose: "6–8 g pre-workout",
    usage: [
      { product: "Lean Shot", percent: 18, per: "1.2 g per serving" },
    ],
  },
  {
    name: "Caffeine Anhydrous",
    img: caffeine,
    short: "Pharmaceutical-grade caffeine for clean, dialled-in energy.",
    body: "Reduces perceived effort, sharpens focus and improves high-intensity output. Sourced for purity — no jitter, no crash.",
    dose: "150–250 mg pre-workout",
    usage: [
      { product: "Lean Shot", percent: 100, per: "200 mg per serving" },
    ],
  },
  {
    name: "BCAAs 2:1:1",
    img: bcaa,
    short: "Leucine, isoleucine and valine in the validated 2:1:1 ratio.",
    body: "Reduces exercise-induced fatigue and supports recovery between hard sessions when intra-workout amino availability matters.",
    dose: "5–10 g intra-workout",
    usage: [
      { product: "BCAA Recover", percent: 100, per: "7 g per scoop" },
      { product: "Super Whey", percent: 23, per: "6.2 g per scoop" },
    ],
  },
  {
    name: "L-Glutamine",
    img: glutamine,
    short: "Conditionally essential amino acid that spikes during heavy training.",
    body: "Supports recovery, immunity and gut-barrier integrity during periods of high training load or caloric restriction.",
    dose: "5 g post-workout",
    usage: [
      { product: "Glutamine X", percent: 100, per: "5 g per scoop" },
      { product: "Super Whey", percent: 15, per: "5 g per scoop" },
    ],
  },
];

const Ingredients = () => (
  <>
    <PageHero
      eyebrow="Tech Arsenal"
      title="Every ingredient. Every dose. Verified."
      subtitle="We publish what's inside, why it's there, and how much you're getting. No proprietary blends. Ever."
    />
    <section className="py-16">
      <div className="container space-y-10">
        {items.map((it, idx) => (
          <ScrollReveal key={it.name} delay={(idx % 3) * 60}>
            <div className={`grid lg:grid-cols-12 gap-8 items-center bg-card border border-white/10 rounded-2xl p-6 md:p-10 hover-lift ${idx % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}>
              <div className="lg:col-span-4 grid place-items-center">
                <div className="relative w-56 h-56 md:w-72 md:h-72 grid place-items-center">
                  <div className="absolute inset-0 rounded-full blur-2xl" style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.25), transparent 65%)" }} />
                  <div className="absolute inset-4 rounded-full border border-primary/20" />
                  <div className="absolute inset-10 rounded-full border border-white/10" />
                  <img
                    src={it.img}
                    alt={it.name}
                    loading="lazy"
                    width={288}
                    height={288}
                    className="relative z-10 w-full h-full object-contain spin-360 drop-shadow-[0_20px_30px_rgba(229,9,20,0.25)]"
                  />
                </div>
              </div>
              <div className="lg:col-span-1 hidden lg:grid place-items-center text-primary">
                <ArrowRight className="h-10 w-10 animate-pulse" />
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary">{it.dose}</p>
                  <h3 className="mt-1 text-2xl md:text-3xl font-bold">{it.name}</h3>
                  <p className="mt-1 text-white/60">{it.short}</p>
                </div>
                <p className="text-white/75 leading-relaxed">{it.body}</p>

                <div className="pt-2">
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-3">Used in our formulas</p>
                  <div className="space-y-3">
                    {it.usage.map((u) => (
                      <div key={u.product} className="bg-background/40 border border-white/10 rounded-lg p-3">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="font-semibold inline-flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            {u.product}
                          </span>
                          <span className="text-white/60 text-xs">{u.per}</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-700"
                            style={{ width: `${u.percent}%` }}
                          />
                        </div>
                        <div className="mt-1 text-right text-xs text-primary font-semibold">{u.percent}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  </>
);

export default Ingredients;