import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Counter } from "@/components/Counter";

const About = () => (
  <>
    <PageHero
      eyebrow="About Ergogenic"
      title="Built by athletes. Verified by science."
      subtitle="Ergogenic Nutrients exists to fix what the supplement industry got wrong — opaque labels, under-dosed actives, and marketing over substance."
    />
    <section className="py-20">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs tracking-[0.4em] text-primary mb-3">OUR MISSION</p>
          <h2 className="text-3xl md:text-5xl font-bold">Performance you can verify</h2>
          <p className="mt-5 text-white/75 leading-relaxed">
            We started Ergogenic with one question — why do athletes have to guess what's actually in their supplements?
            Today we publish lab reports, ingredient sourcing and clinical doses for every single product. No proprietary
            blends. No marketing fluff. Just performance you can verify.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Independent third-party lab testing on every batch",
              "Clinical dosing on every active ingredient",
              "Transparent sourcing and full label disclosure",
              "Built in collaboration with athletes and clinicians",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3 text-white/85">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { v: 15000, s: "+", l: "Athletes served" },
            { v: 200, s: "+", l: "Lab tests / year" },
            { v: 24, s: "h", l: "Order to dispatch" },
            { v: 100, s: "%", l: "Label transparency" },
          ].map((s) => (
            <div key={s.l} className="p-6 border border-white/10 rounded-xl bg-card text-center">
              <p className="text-3xl font-bold text-gradient-red"><Counter to={s.v} suffix={s.s} /></p>
              <p className="mt-2 text-xs uppercase tracking-widest text-white/60">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="py-20 bg-black/40 border-y border-white/10">
      <div className="container max-w-3xl text-center">
        <p className="text-xs tracking-[0.4em] text-primary mb-3">OUR APPROACH</p>
        <h2 className="text-3xl md:text-5xl font-bold">Three pillars. Zero compromise.</h2>
        <div className="grid md:grid-cols-3 gap-5 mt-12 text-left">
          {[
            { t: "Quality", d: "We source premium raw materials and reject anything that doesn't meet our certificate of analysis standard." },
            { t: "Transparency", d: "Every label discloses every active and its dose. No hiding behind proprietary blends." },
            { t: "Performance", d: "Formulas are dosed for results, not margins. Built around what actually works in the gym." },
          ].map((p) => (
            <div key={p.t} className="p-6 bg-card border border-white/10 rounded-xl">
              <h3 className="text-xl font-bold text-primary">{p.t}</h3>
              <p className="mt-3 text-white/70">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;