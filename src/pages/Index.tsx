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
  "w-full sm:w-auto min-h-[48px] px-6 md:px-8 whitespace-nowrap flex items-center justify-center gap-2 transition-all duration-300";

const imageClass =
  "w-full h-full object-contain p-4 transition-transform duration-500 will-change-transform group-hover:scale-105 select-none pointer-events-none";

const Index = () => {
  return (
    <div className="relative w-full overflow-x-hidden bg-white text-slate-900 antialiased selection:bg-slate-950 selection:text-white">

      {/* ==================== SECTION 1: HERO CANVAS ==================== */}
      <section className="relative min-h-[85vh] lg:min-h-[calc(100vh-80px)] flex items-center overflow-hidden border-b border-slate-100 bg-white py-12 lg:py-0">
        <div className="absolute inset-0 bg-grid-light opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(219,234,254,0.3),transparent_50%)] pointer-events-none" />
        
        <div className="container max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start order-2 lg:order-1">
              <div className="flex justify-center lg:justify-start">
                <Logo className="h-7 w-auto object-contain sm:h-9 md:h-10" />
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] text-slate-900 uppercase">
                FUEL{" "}
                <span className="text-gradient-red inline-block">
                  <TypewriterText text="EVOLVED" speed={120} delay={400} />
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg max-w-2xl font-medium leading-relaxed text-slate-500">
                Performance-focused nutrition engineered for your fitness goals. 
                Transparently dosed, clear metrics, made for evolution.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2">
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

            {/* Right Media Column */}
            <div className="lg:col-span-5 order-1 lg:order-2 w-full flex justify-center">
              <div className="relative w-full max-w-[440px] aspect-[4/3] lg:aspect-square rounded-3xl border border-slate-200 overflow-hidden bg-slate-50 shadow-inner p-2 group">
                <video
                  className="w-full h-full object-cover rounded-2xl opacity-90 transition-transform duration-700 group-hover:scale-102"
                  src="/videos/hero.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: FIRST LAB GIF PROCESS BANNER ==================== */}
      <section className="w-full bg-slate-50 border-b border-slate-200 overflow-hidden py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-200/50 inline-block">
              LAB ORIENTED FORMULAS
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              PRECISE BATCH DISPENSING
            </h2>
            <p className="text-sm md:text-base font-medium text-slate-500 leading-relaxed">
              Every scoop goes through strict packaging verification intervals. Witness the high-speed deployment track built around clinical purity parameters and micro-filtered consistency benchmarks.
            </p>
          </div>
          
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 overflow-hidden shadow-sm bg-white p-2.5">
            <img 
              src="https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//ezgif-131eb69db341388e (1).gif" 
              alt="Batch Processing workflow animation" 
              className="w-full h-auto max-h-[400px] object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
          
        </div>
      </section>

      {/* ==================== SECTION 3: PRODUCT SLIDER ==================== */}
      <section className="relative overflow-hidden bg-white py-12 md:py-20">
        <div className="container max-w-7xl relative px-4 md:px-8 mx-auto">
          <div className="relative min-h-[440px] lg:min-h-[500px]">
            <ProductShowcaseSlider />
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4: SECOND LAB GIF PROCESS BANNER (CUSTOM PLACEHOLDER) ==================== */}
      <section className="w-full bg-slate-50 border-y border-slate-200 overflow-hidden py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 overflow-hidden shadow-sm bg-white p-2.5">
            {/* REPLACE THIS PLACEHOLDER IMAGE URL ONCE YOUR SECOND COMPLEMENTARY LAB GIF IS READY */}
            <img 
              src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60" 
              alt="Advanced custom synthesis line placeholder" 
              className="w-full h-auto max-h-[400px] object-cover rounded-2xl filter grayscale opacity-90"
              loading="lazy"
            />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-3 py-1 rounded border border-blue-200/50 inline-block">
              INTELLIGENT MANUFACTURE
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              TRANSPARENT SYNTHESIS LINES
            </h2>
            <p className="text-sm md:text-base font-medium text-slate-500 leading-relaxed">
              Our automated system keeps your macro fractions protected from outside ambient vectors. This structural processing loop retains consistency and formula bioavailability benchmarks smoothly.
            </p>
          </div>
          
        </div>
      </section>

      {/* ==================== SECTION 5: HORIZONTAL MARQUEE ==================== */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="container relative px-4 md:px-8 mx-auto max-w-7xl">
          <ScrollReveal className="mx-auto mb-16 max-w-2xl text-center">
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

        {/* Outer scrolling container marquee track grid */}
        <div className="relative flex w-full overflow-x-hidden select-none group/marquee border-y border-slate-100 py-4 bg-slate-50/30">
          <div className="flex flex-nowrap gap-6 animate-marquee whitespace-nowrap py-2 group-hover/marquee:[animation-play-state:paused]">
            
            {/* Array Track Item Set A */}
            {products.map((p, i) => {
              const routeParam = p.slug || p.id;
              return (
                <Link
                  key={`marquee-a-${routeParam}-${i}`}
                  to={`/products/${routeParam}`}
                  className="group block w-[240px] md:w-[280px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-400 hover:shadow-md"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-slate-50 relative flex items-center justify-center border-b border-slate-100">
                    <img src={p.image} alt={p.name} loading="lazy" className={imageClass} />
                  </div>

                  <div className="p-5 text-left whitespace-normal space-y-1.5">
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
                        Shop <ChevronRight className="ml-0.5 h-3 w-3 stroke-[3]" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Array Track Item Set B */}
            {products.map((p, i) => {
              const routeParam = p.slug || p.id;
              return (
                <Link
                  key={`marquee-b-${routeParam}-${i}`}
                  to={`/products/${routeParam}`}
                  className="group block w-[240px] md:w-[280px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-400 hover:shadow-md"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-slate-50 relative flex items-center justify-center border-b border-slate-100">
                    <img src={p.image} alt={p.name} loading="lazy" className={imageClass} />
                  </div>

                  <div className="p-5 text-left whitespace-normal space-y-1.5">
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
                        Shop <ChevronRight className="ml-0.5 h-3 w-3 stroke-[3]" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
            
          </div>

          {/* Vignette Blur Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 md:w-32" />
        </div>
      </section>

      {/* ==================== SECTION 6: INGREDIENTS INDEX ==================== */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28 border-t border-slate-100">
        <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-7xl">
          <ScrollReveal className="mx-auto mb-16 max-w-2xl text-center">
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

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {ingredients.map((ing, i) => (
              <ScrollReveal key={ing.name} delay={i * 60}>
                <div className="flex h-full flex-col items-start rounded-2xl border border-slate-200 bg-slate-50/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 shadow-sm text-left hover:bg-white hover:shadow-md">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-white shadow-sm">
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