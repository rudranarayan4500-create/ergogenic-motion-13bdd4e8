import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Dumbbell,
  Flame,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { Counter } from "@/components/Counter";
import { CheckCircle2 } from "lucide-react";

const athletes = [
  {
    name: "Arjun Mehta",
    role: "IFBB Athlete",
    level: "Professional Bodybuilder",
    img: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp%20Image%202026-05-31%20at%208.15.32%20PM.jpeg",
    desc: "Arjun uses Ergogenic Whey Isolate, Creatine and Pre-X before every heavy push session.",
    stats: [
      "Bench Press: 180KG",
      "Stage Weight: 92KG",
      "8 Years Training",
    ],
  },
  {
    name: "Ritika Sharma",
    role: "CrossFit Elite",
    level: "National Athlete",
    img: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp%20Image%202026-05-31%20at%209.28.42%20PM.jpeg",
    desc: "Focuses on endurance, recovery and explosive performance with BCAA Recover.",
    stats: [
      "VO2 Max Focus",
      "Recovery Specialist",
      "5x National Finalist",
    ],
  },
  {
    name: "Karan Singh",
    role: "Powerlifter",
    level: "Strength Athlete",
    img: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp%20Image%202026-05-31%20at%208.13.03%20PM.jpeg",
    desc: "Uses Creatine X and Mass Gainer during heavy off-season power blocks.",
    stats: [
      "Deadlift: 320KG",
      "Squat: 280KG",
      "Strength Coach",
    ],
  },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Lab Tested",
    desc: "Every batch goes through independent third-party testing for purity and performance.",
  },
  {
    icon: Sparkles,
    title: "Zero Amino Spiking",
    desc: "No cheap fillers. No hidden blends. Pure transparent formulations only.",
  },
  {
    icon: Zap,
    title: "Performance Driven",
    desc: "Clinical dosages engineered for real gym performance and athletic recovery.",
  },
];

const supplements = [
  {
    icon: Dumbbell,
    title: "Whey Isolate",
    desc: "Ultra-filtered whey isolate for lean muscle recovery and rapid absorption.",
  },
  {
    icon: Flame,
    title: "Fat Burner",
    desc: "Thermogenic support with clean energy and metabolism optimization.",
  },
  {
    icon: HeartPulse,
    title: "Recovery Formula",
    desc: "Supports muscle repair, joint health and reduced soreness post training.",
  },
  {
    icon: Trophy,
    title: "Mass Gainer",
    desc: "High-calorie clean bulking formula designed for lean growth phases.",
  },
];

const About = () => {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((prev) => (prev + 1) % athletes.length);
  };

  const prev = () => {
    setActive((prev) => (prev - 1 + athletes.length) % athletes.length);
  };

  return (
    <div className="bg-[hsl(var(--ink))] text-white overflow-hidden">
      <PageHero
        eyebrow="About Ergogenic"
        title="Built by athletes. Verified by science."
        subtitle="Premium sports nutrition engineered for serious athletes who demand transparency, performance and recovery."
      />

      {/* HERO SHOWCASE */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15),transparent_60%)]" />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary tracking-[0.4em] text-xs uppercase mb-4">
                Elite Nutrition
              </p>

              <h2 className="text-5xl md:text-6xl font-black leading-tight">
                SUPPLEMENTS
                <span className="block text-gradient-red">
                  BUILT FOR WAR
                </span>
              </h2>

              <p className="mt-6 text-white/70 leading-relaxed text-lg">
                Ergogenic is not another flashy supplement brand.
                Every scoop is formulated with clinical dosing,
                premium imported ingredients and athlete-first transparency.
              </p>

              <div className="mt-8 grid gap-4">
                {[
                  "Third-party tested ingredients",
                  "Performance-focused formulas",
                  "Transparent labels",
                  "Built with athletes & scientists",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FLIP CARD SLIDER */}
            <div className="relative flex items-center justify-center">
              <button
                onClick={prev}
                className="absolute left-0 z-20 bg-primary/20 hover:bg-primary/40 border border-primary/30 p-3 rounded-full transition-all"
              >
                <ArrowLeft />
              </button>

              <button
                onClick={next}
                className="absolute right-0 z-20 bg-primary/20 hover:bg-primary/40 border border-primary/30 p-3 rounded-full transition-all"
              >
                <ArrowRight />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -200 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-md"
                >
                  <div className="group perspective">
                    <div className="relative h-[560px] w-full transition-all duration-700 preserve-3d group-hover:rotate-y-180">
                      
                      {/* FRONT */}
                      <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_80px_rgba(255,0,0,0.2)]">
                        <img
                          src={athletes[active].img}
                          alt={athletes[active].name}
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        <div className="absolute bottom-0 p-8">
                          <div className="flex gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-primary text-primary"
                              />
                            ))}
                          </div>

                          <h3 className="text-3xl font-black">
                            {athletes[active].name}
                          </h3>

                          <p className="text-primary font-semibold mt-1">
                            {athletes[active].role}
                          </p>

                          <p className="text-white/60 mt-2">
                            Hover to view details
                          </p>
                        </div>
                      </div>

                      {/* BACK */}
                      <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-3xl bg-gradient-to-br from-black via-zinc-900 to-red-950 border border-primary/20 p-8 flex flex-col justify-center">
                        <h3 className="text-3xl font-black">
                          {athletes[active].name}
                        </h3>

                        <p className="text-primary mt-2 font-semibold">
                          {athletes[active].level}
                        </p>

                        <p className="mt-6 text-white/70 leading-relaxed">
                          {athletes[active].desc}
                        </p>

                        <div className="mt-8 space-y-3">
                          {athletes[active].stats.map((s) => (
                            <div
                              key={s}
                              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                            >
                              {s}
                            </div>
                          ))}
                        </div>

                        <div className="mt-8 flex items-center gap-2 text-primary">
                          <Sparkles className="h-5 w-5" />
                          Verified Ergogenic Athlete
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 border-y border-white/10 bg-black/40">
        <div className="container grid md:grid-cols-4 gap-6">
          {[
            { value: 15000, suffix: "+", label: "Athletes Served" },
            { value: 250, suffix: "+", label: "Gym Partners" },
            { value: 100, suffix: "%", label: "Transparent Labels" },
            { value: 24, suffix: "h", label: "Shipping Dispatch" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-card border border-white/10 rounded-2xl p-8 text-center hover:-translate-y-2 transition-all duration-500"
            >
              <div className="text-5xl font-black text-gradient-red">
                <Counter to={item.value} suffix={item.suffix} />
              </div>

              <p className="mt-3 text-white/60 uppercase tracking-widest text-xs">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-primary tracking-[0.4em] text-xs uppercase mb-4">
              Why Ergogenic
            </p>

            <h2 className="text-5xl font-black">
              Science. Purity. Results.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {pillars.map((item) => (
              <div
                key={item.title}
                className="group bg-card border border-white/10 rounded-3xl p-8 hover:border-primary/30 transition-all duration-500 hover:-translate-y-3"
              >
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 text-white/65 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPLEMENTS */}
      <section className="py-24 bg-black/40 border-y border-white/10">
        <div className="container">
          <div className="text-center">
            <p className="text-primary tracking-[0.4em] text-xs uppercase mb-4">
              Product Range
            </p>

            <h2 className="text-5xl font-black">
              Engineered Supplement Stack
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {supplements.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card p-8 hover:border-primary/40 transition-all duration-500 hover:-translate-y-3"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-primary/15 flex items-center justify-center">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-white/65 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.2),transparent_60%)]" />

        <div className="container text-center relative">
          <h2 className="text-5xl md:text-7xl font-black leading-tight">
            BUILT FOR
            <span className="block text-gradient-red">
              ELITE PERFORMANCE
            </span>
          </h2>

          <p className="mt-6 text-white/70 max-w-2xl mx-auto text-lg">
            Join thousands of athletes transforming their recovery,
            performance and physique with Ergogenic supplements.
          </p>

          <button className="mt-10 bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-[0_10px_40px_rgba(255,0,0,0.4)]">
            Start Your Transformation
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;