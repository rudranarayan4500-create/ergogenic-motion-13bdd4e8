import { Link } from "react-router-dom";
import {
  ChevronRight,
  Dumbbell,
  FlaskConical,
  HeartPulse,
  Sparkles,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Logo } from "@/components/Logo";
import { TypewriterText } from "@/components/TypewriterText";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProductShowcaseSlider } from "@/components/ProductShowcaseSlider";

import { products } from "@/data/products";
import { useSiteContent } from "@/hooks/useSiteContent";

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
];

const buttonClass =
  "w-full sm:w-auto min-h-[48px] px-6 md:px-8 whitespace-nowrap shadow-glow flex items-center justify-center gap-2";

// FIXED: Changed object-cover to object-contain and added p-4 so the images fit perfectly inside the box
const imageClass =
  "w-full h-full object-contain p-4 transition-transform duration-500 will-change-transform group-hover:scale-105";

const Index = () => {
  const site = useSiteContent();
  return (
    <div className="relative w-full overflow-x-hidden bg-background text-foreground">

      {/* HERO */}
      <section className="relative flex min-h-[85vh] md:min-h-[92vh] items-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-20 pointer-events-none"
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-grid-light opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,hsl(var(--primary)/0.18),transparent_60%)]" />

        <div className="container relative z-10 px-4 py-20 md:py-32 text-center">
          <div className="mb-6 flex justify-center md:mb-8">
            <Logo className="h-8 w-auto object-contain sm:h-10 md:h-12" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] break-words">
            {site.hero.title}{" "}
            <span className="text-gradient-red inline-block">
              <TypewriterText
                text={site.hero.highlight}
                speed={120}
                delay={400}
              />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl px-2 text-sm text-foreground/90 sm:text-base md:text-xl">
            {site.hero.subtitle}
          </p>

          <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 px-4 sm:max-w-none sm:flex-row sm:justify-center sm:px-0">
            <Button
              asChild
              size="lg"
              className={`${buttonClass} bg-primary hover:bg-primary/90`}
            >
              <Link to={site.hero.ctaHref}>
                {site.hero.ctaLabel}
                <ChevronRight className="h-4 w-4 shrink-0" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="relative overflow-hidden bg-background py-10 md:py-16">
        <div className="container relative px-4">
          <div className="relative min-h-[420px] md:min-h-[520px]">
            <ProductShowcaseSlider />
          </div>
        </div>
      </section>

      {/* PRODUCTS MARQUEE */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <div className="absolute inset-0 bg-grid-light opacity-40" />

        <div className="container relative px-4">
          <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-primary sm:text-xs">
              {site.section_products.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-foreground md:text-5xl">
              {site.section_products.title}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              {site.section_products.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Outer scrolling container */}
        <div className="relative flex w-full overflow-x-hidden select-none group/marquee">
          {/* Track wrapper - Splitting into two sibling tracking columns ensures continuous CSS performance without clipping boundaries */}
          <div className="flex flex-nowrap gap-4 md:gap-6 animate-marquee whitespace-nowrap py-2 group-hover/marquee:[animation-play-state:paused]">
            
            {/* Array Track Item Set A */}
            {products.map((p, i) => {
              const routeParam = p.slug || p.id;
              return (
                <Link
                  key={`marquee-a-${routeParam}-${i}`}
                  to={`/products/${routeParam}`}
                  className="group block w-[220px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 md:w-[260px]"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-muted flex items-center justify-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className={imageClass}
                    />
                  </div>

                  <div className="p-4 text-left whitespace-normal">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary">
                      {p.category}
                    </p>
                    <h3 className="mt-2 line-clamp-1 text-base font-bold text-foreground">
                      {p.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {p.tagline}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-base font-bold text-foreground font-mono">
                        ₹{p.price.toLocaleString()}
                      </span>
                      <span className="inline-flex items-center text-xs font-medium text-primary">
                        Shop
                        <ChevronRight className="ml-1 h-3 w-3" />
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
                  className="group block w-[220px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 md:w-[260px]"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-muted flex items-center justify-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className={imageClass}
                    />
                  </div>

                  <div className="p-4 text-left whitespace-normal">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary">
                      {p.category}
                    </p>
                    <h3 className="mt-2 line-clamp-1 text-base font-bold text-foreground">
                      {p.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {p.tagline}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-base font-bold text-foreground font-mono">
                        ₹{p.price.toLocaleString()}
                      </span>
                      <span className="inline-flex items-center text-xs font-medium text-primary">
                        Shop
                        <ChevronRight className="ml-1 h-3 w-3" />
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
      <section className="relative overflow-hidden bg-background py-16 md:py-24">
        <div className="container relative z-10 px-4">
          <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-primary sm:text-xs">
              {site.section_ingredients.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-foreground md:text-5xl">
              {site.section_ingredients.title}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              {site.section_ingredients.subtitle}
            </p>
          </ScrollReveal>

          {/* Adjusted to flex-wrap to beautifully center the 5 boxes */}
          <div className="flex flex-wrap justify-center gap-5">
            {ingredients.map((ing, i) => (
              <div 
                key={ing.name} 
                className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.85rem)] flex"
              >
                <ScrollReveal delay={i * 60} className="w-full">
                  <div className="flex h-full flex-col items-start rounded-xl border border-border bg-card/80 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/15 text-primary">
                      <ing.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-foreground">
                      {ing.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {ing.desc}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;