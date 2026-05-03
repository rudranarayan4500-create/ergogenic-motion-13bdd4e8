import { Beaker, Dumbbell, FlaskConical, HeartPulse, Leaf, Sparkles, Zap } from "lucide-react";
import { PageHero } from "@/components/PageHero";

const items = [
  { i: Dumbbell, n: "Whey Protein", d: "Cold-processed whey isolate and concentrate provide a complete amino profile and rapid absorption to support muscle protein synthesis after training.", dose: "20–30g per serving" },
  { i: Zap, n: "Creatine Monohydrate", d: "The most studied performance ingredient in sports science. Supports ATP regeneration, strength, power output and lean mass gains.", dose: "3–5g daily" },
  { i: Sparkles, n: "BCAAs (2:1:1)", d: "Leucine, isoleucine and valine in the proven ratio to reduce exercise-induced fatigue and support recovery between sessions.", dose: "5–10g intra-workout" },
  { i: HeartPulse, n: "L-Glutamine", d: "Conditionally essential amino acid that supports recovery, immunity and gut barrier health, especially during high training loads.", dose: "5g post-workout" },
  { i: FlaskConical, n: "L-Citrulline", d: "Boosts plasma arginine and nitric oxide for improved blood flow, sustained pumps and endurance during training.", dose: "6–8g pre-workout" },
  { i: Leaf, n: "Digestive Enzymes", d: "Protease, lactase and amylase improve protein utilisation and reduce GI discomfort from large protein meals.", dose: "Included in formulas" },
  { i: Beaker, n: "Caffeine Anhydrous", d: "Clinically dosed for sharper focus, lower perceived effort and improved high-intensity output. Sourced for purity.", dose: "150–250mg pre-workout" },
  { i: Sparkles, n: "L-Carnitine L-Tartrate", d: "Supports fatty-acid transport and post-exercise recovery markers. Often paired with thermogenic stacks.", dose: "1–2g daily" },
];

const Ingredients = () => (
  <>
    <PageHero
      eyebrow="Tech Arsenal"
      title="Every ingredient. Every dose. Verified."
      subtitle="We publish what's inside, why it's there, and how much you're getting. No proprietary blends. Ever."
    />
    <section className="py-20">
      <div className="container grid md:grid-cols-2 gap-6">
        {items.map(({ i: Icon, n, d, dose }) => (
          <div key={n} className="p-7 bg-card border border-white/10 rounded-xl hover-lift">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/15 grid place-items-center text-primary shrink-0">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{n}</h3>
                <p className="mt-2 text-white/70 leading-relaxed">{d}</p>
                <p className="mt-3 text-xs uppercase tracking-widest text-primary">Typical dose: {dose}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default Ingredients;