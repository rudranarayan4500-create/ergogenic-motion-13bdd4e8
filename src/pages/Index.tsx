import { Link } from "react-router-dom";
import {
  ChevronRight,
  Dumbbell,
  FlaskConical,
  HeartPulse,
  Leaf,
  Sparkles,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { TypewriterText } from "@/components/TypewriterText";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProductShowcaseSlider } from "@/components/ProductShowcaseSlider";
import { products } from "@/data/products";

const ingredients = [
  {
    name: "Whey Protein",
    icon: Dumbbell,
    desc: "Premium protein for muscle development and recovery.",
  },
  {
    name: "Creatine Monohydrate",
    icon: Zap,
    desc: "Pure creatine monohydrate to support strength and power.",
  },
  {
    name: "BCAA 2:1:1",
    icon: Sparkles,
    desc: "Branched-chain amino acids to support endurance and recovery.",
  },
  {
    name: "L-Glutamine",
    icon: HeartPulse,
    desc: "Supports recovery and overall muscle health after training.",
  },
  {
    name: "L-Citrulline",
    icon: FlaskConical,
    desc: "Supports blood flow and training endurance.",
  },
  {
    name: "Digestive Enzymes",
    icon: Leaf,
    desc: "Helps support nutrient absorption.",
  },
];

const buttonClass =
  "w-full sm:w-auto min-h-[48px] px-6 md:px-8 whitespace-nowrap shadow-glow flex items-center justify-center gap-2";

const imageClass =
  "w-full h-full object-contain p-4 transition-transform duration-500 will-change-transform group-hover:scale-105 select-none pointer-events-none";

const Index = () => {
  return (
    <div className="relative w-full overflow-x-hidden bg-background text-foreground">

      {/* HERO */}
      <section className="relative flex min-h-[85vh] md:min-h-[92vh] items-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-10 pointer-events-none"
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-grid-light opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="container relative z-10 px-4 py-20 md:py-32 text-center mx-auto">
          <div className="mb-6 flex justify-center md:mb-8">
            <Logo className="h-8 w-auto object-contain sm:h-10 md:h-12" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] break-words text-slate-900 uppercase">
            FUEL{" "}
            <span className="text-gradient-red inline-block">
              <TypewriterText
                text="EVOLVED"
                speed={120}
                delay={400}
              />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl px-2 text-sm text-slate-600 sm:text-base md:text-lg font-medium leading-relaxed">
            Performance-focused nutrition engineered for your fitness goals.
            Transparently dosed, made for evolution.
          </p>

          <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 px-4 sm:max-w-none sm:flex-row sm:justify-center sm:px-0">
            <Button
              asChild
              size="lg"
              className={`${buttonClass} bg-slate-900 text-white hover:bg-slate-800 font-black uppercase text-xs tracking-wider rounded-xl shadow-md h-12`}
            >
              <Link to="/products">
                Shop Now
                <ChevronRight className="h-4 w-4 shrink-0 stroke-[3]" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className={`${buttonClass} border-slate-900 text-slate-900 bg-transparent hover:bg-slate-50 font-black uppercase text-xs tracking-wider rounded-xl h-12`}
            >
              <Link to="/ingredients">
                Explore Science
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="relative overflow-hidden bg-background py-10 md:py-16">
        <div className="container relative px-4 mx-auto">
          <div className="relative min-h-[420px] md:min-h-[520px]">
            <ProductShowcaseSlider />
          </div>
        </div>
      </section>

      {/* DYNAMIC GIF PROCESS BANNER ROW */}
      <section className="w-full bg-slate-50 border-y border-slate-200 overflow-hidden py-12 md:py-16 relative">
        <div className="container max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
          <div className="md:col-span-5 space-y-4">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-200/50 inline-block">LAB ORIENTED FORMULAS</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">PRECISE BATCH DISPENSING</h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              Every scoop goes through strict packaging verification intervals. Witness the high-speed deployment track built around clinical purity parameters and micro-filtered consistency benchmarks.
            </p>
          </div>
          <div className="md:col-span-7 rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white p-2">
            <img 
              src="https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//ezgif-131eb69db341388e (1).gif" 
              alt="Batch Processing workflow animation" 
              className="w-full h-auto object-cover rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS MARQUEE */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <div className="absolute inset-0 bg-grid-light opacity-20" />

        <div className="container relative px-4 mx-auto">
          <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black sm:text-xs">
              BUILD YOUR STACK
            </p>
            <h2 className="text-3xl font-black text-slate-900 md:text-5xl uppercase tracking-tight">
              Engineered for every goal
            </h2>
            <p className="mt-4 text-sm text-slate-500 font-medium">
              Every product is formulated for real results. Explore our collection.
            </p>
          </ScrollReveal>
        </div>

        {/* Outer scrolling container */}
        <div className="relative flex w-full overflow-x-hidden select-none group/marquee">
          <div className="flex flex-nowrap gap-4 md:gap-6 animate-marquee whitespace-nowrap py-2 group-hover/marquee:[animation-play-state:paused]">
            
            {/* Array Track Item Set A */}
            {products.map((p, i) => {
              const routeParam = p.slug || p.id;
              return (
                <Link
                  key={`marquee-a-${routeParam}-${i}`}
                  to={`/products/${routeParam}`}
                  className="group block w-[220px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 md:w-[260px]"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-slate-50 relative flex items-center justify-center border-b border-slate-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className={imageClass}
                    />
                  </div>

                  <div className="p-4 text-left whitespace-normal space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-blue-600">
                      {p.category}
                    </p>
                    <h3 className="line-clamp-1 text-base font-black tracking-tight text-slate-800 group-hover:text-slate-900">
                      {p.name}
                    </h3>
                    <p className="line-clamp-2 text-xs text-slate-400 font-medium leading-relaxed h-8">
                      {p.tagline}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-base font-black text-slate-900 font-mono">
                        ₹{p.price.toLocaleString()}
                      </span>
                      <span className="inline-flex items-center text-xs font-black uppercase tracking-wider text-slate-800">
                        Shop
                        <ChevronRight className="ml-0.5 h-3 w-3 stroke-[3]" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Array Track Item Set B (Perfect Duplicate Loop Segment) */}
            {products.map((p, i) => {
              const routeParam = p.slug || p.id;
              return (
                <Link
                  key={`marquee-b-${routeParam}-${i}`}
                  to={`/products/${routeParam}`}
                  className="group block w-[220px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 md:w-[260px]"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-slate-50 relative flex items-center justify-center border-b border-slate-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className={imageClass}
                    />
                  </div>

                  <div className="p-4 text-left whitespace-normal space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-blue-600">
                      {p.category}
                    </p>
                    <h3 className="line-clamp-1 text-base font-black tracking-tight text-slate-800 group-hover:text-slate-900">
                      {p.name}
                    </h3>
                    <p className="line-clamp-2 text-xs text-slate-400 font-medium leading-relaxed h-8">
                      {p.tagline}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-base font-black text-slate-900 font-mono">
                        ₹{p.price.toLocaleString()}
                      </span>
                      <span className="inline-flex items-center text-xs font-black uppercase tracking-wider text-slate-800">
                        Shop
                        <ChevronRight className="ml-0.5 h-3 w-3 stroke-[3]" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
            
          </div>

          {/* Vignette Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-10 md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-10 md:w-24" />
        </div>
      </section>

      {/* INGREDIENTS */}
      <section className="relative overflow-hidden bg-background py-16 md:py-24 border-t border-slate-200">
        <div className="container relative z-10 px-4 mx-auto">
          <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black sm:text-xs">
              TECH ARSENAL
            </p>
            <h2 className="text-3xl font-black text-slate-900 md:text-5xl uppercase tracking-tight">
              The science behind every scoop
            </h2>
            <p className="mt-4 text-sm text-slate-500 font-medium">
              A closer look at the key ingredients powering our formulations.
            </p>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ingredients.map((ing, i) => (
              <ScrollReveal key={ing.name} delay={i * 60}>
                <div className="flex h-full flex-col items-start rounded-2xl border border-slate-200 bg-slate-50/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 shadow-sm text-left">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-900 text-white shadow-sm">
                    <ing.icon className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <h3 className="mt-5 text-lg font-black tracking-tight text-slate-900 uppercase">
                    {ing.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 font-medium">
                    {ing.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;