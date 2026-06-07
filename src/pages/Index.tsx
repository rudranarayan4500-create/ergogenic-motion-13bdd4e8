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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Logo } from "@/components/Logo";
import { TypewriterText } from "@/components/TypewriterText";
import { ScrollReveal } from "@/components/ScrollReveal";
import { products } from "@/data/products";
import { ProductShowcaseSlider } from "@/components/ProductShowcaseSlider";

const ingredients = [
  { name: "Whey Protein", icon: Dumbbell, desc: "Premium protein for muscle development and recovery." },
  { name: "Creatine Monohydrate", icon: Zap, desc: "Pure creatine monohydrate to support strength and power." },
  { name: "BCAA 2:1:1", icon: Sparkles, desc: "Branched-chain amino acids to support endurance and recovery." },
  { name: "L-Glutamine", icon: HeartPulse, desc: "Supports recovery and overall muscle health after training." },
  { name: "L-Citrulline", icon: FlaskConical, desc: "Supports blood flow and training endurance." },
  { name: "Digestive Enzymes", icon: Leaf, desc: "Helps support nutrient absorption." },
];

const Index = () => {
  return (
    <div className="bg-background text-foreground overflow-x-hidden w-full">
      {/* HERO SECTION — Fully Responsive Typography & Fixed Spacing */}
      <section className="relative min-h-[85vh] md:min-h-[92vh] flex items-center overflow-hidden w-full">
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
        
        <div className="container relative z-10 px-4 py-20 md:py-32 text-center animate-fade-in w-full">
          <div className="flex justify-center mb-6 md:mb-8">
            <Logo className="h-8 sm:h-10 md:h-12 w-auto object-contain" />
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] md:leading-[1.05] break-words">
            FUEL{" "}
            <span className="text-gradient-red inline-block">
              <TypewriterText text="EVOLVED" speed={120} delay={400} />
            </span>
          </h1>
          <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-xl text-foreground/90 max-w-2xl mx-auto px-2 md:px-0">
            <span className="inline-block animate-[fade-in_1.2s_ease-out_0.8s_both]">
              Performance-focused nutrition engineered for your fitness goals.
              Transparently dosed, made for evolution.
            </span>
          </p>
          {/* Mobile UI Fix: Stacked buttons on small viewports with flex-shrink prevention */}
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4 sm:px-0 max-w-sm sm:max-w-none mx-auto">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-sm sm:text-base h-12 px-6 sm:px-8 shadow-glow flex items-center justify-center gap-2 shrink-0">
              <Link to="/products">
                <span>Shop Now</span>
                <ChevronRight className="h-4 w-4 shrink-0" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 sm:px-8 border-border text-foreground hover:bg-muted bg-transparent text-sm sm:text-base flex items-center justify-center shrink-0">
              <Link to="/ingredients">Explore Science</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE SLIDER */}
      <div className="w-full overflow-hidden">
        <ProductShowcaseSlider />
      </div>

      {/* CATEGORIES / PRODUCTS MARQUEE */}
      <section className="py-16 md:py-24 relative w-full">
        <div className="absolute inset-0 bg-grid-light opacity-40" />
        <div className="container relative px-4">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-primary mb-2 md:mb-3">BUILD YOUR STACK</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground">Engineered for every goal</h2>
            <p className="mt-2 md:mt-4 text-sm md:text-base text-muted-foreground">Every product is formulated for real results. Explore our collection.</p>
          </ScrollReveal>
        </div>
        <div className="relative overflow-hidden group w-full">
          <div className="marquee gap-4 md:gap-6 [animation-duration:40s] md:animation-duration-[60s] group-hover:[animation-play-state:paused]">
            {[...products, ...products].map((p, i) => (
              <Link
                key={`${p.id}-${i}`}
                to={`/products/${p.id}`}
                className="shrink-0 w-[220px] md:w-[260px] bg-card border border-border rounded-xl overflow-hidden hover-lift block"
              >
                <div className="aspect-[4/5] bg-muted overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                </div>
                <div className="p-3 md:p-4">
                  <p className="text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] text-primary uppercase">{p.category}</p>
                  <h3 className="mt-1 font-bold text-sm md:text-base text-foreground leading-tight line-clamp-1">{p.name}</h3>
                  <p className="mt-0.5 md:mt-1 text-xs text-muted-foreground line-clamp-2">{p.tagline}</p>
                  <div className="mt-2 md:mt-3 flex items-center justify-between">
                    <span className="text-sm md:text-base font-bold text-foreground">₹{p.price.toLocaleString()}</span>
                    <span className="inline-flex items-center text-xs text-primary font-medium">Shop <ChevronRight className="h-3 w-3 ml-0.5" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </section>

      {/* FEATURED PRODUCTS LINEUP */}
      <section className="py-16 md:py-24 bg-muted/40 border-y border-border overflow-hidden w-full">
        <div className="container px-4 w-full">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-primary mb-2 md:mb-3 uppercase">Featured Lineup</p>
            <h2 className="text-3xl md:text-6xl font-black text-foreground tracking-tight uppercase leading-tight">
              Top-Rated Products
            </h2>
            <p className="mt-4 md:mt-6 text-sm md:text-lg text-muted-foreground leading-relaxed">
              Performance-grade supplementation engineered for strength, endurance, and recovery.
            </p>
          </div>

          <div className="space-y-20 md:space-y-32 max-w-md md:max-w-none mx-auto w-full">
            {/* Showcase 1 */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-20 items-center">
              <ScrollReveal direction="left" className="md:col-span-6 w-full">
                <div className="relative bg-card rounded-2xl md:rounded-3xl border border-border overflow-hidden group shadow-xl md:shadow-2xl max-w-sm md:max-w-md mx-auto">
                  <img
                    src="https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//f579410b-7a2a-4db6-a058-59078cc70e1f.png"
                    alt="Advanced Iso Whey Blend"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right" className="md:col-span-6 space-y-4 md:space-y-6 text-center md:text-left px-2 sm:px-0">
                <span className="inline-flex text-[9px] md:text-[10px] bg-primary/15 text-primary px-3 py-1 md:px-4 md:py-1.5 rounded-full font-bold uppercase tracking-[0.2em] md:tracking-[0.25em]">
                  Whey Protein
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-foreground leading-tight">
                  Advanced Iso-Whey Blend
                </h3>
                <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                  Formulated to help support recovery, lean muscle development, and nutrient absorption.
                </p>
                <Button asChild size="lg" className="w-full sm:w-auto shadow-glow bg-primary hover:bg-primary/90 text-white gap-2 justify-center">
                  <Link to="/products">Buy Now <ChevronRight className="h-4 w-4 shrink-0" /></Link>
                </Button>
              </ScrollReveal>
            </div>

            {/* Showcase 2 */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-20 items-center">
              <ScrollReveal direction="left" className="md:col-span-6 order-2 md:order-1 space-y-4 md:space-y-6 text-center md:text-left px-2 sm:px-0">
                <span className="inline-flex text-[9px] md:text-[10px] bg-primary/15 text-primary px-3 py-1 md:px-4 md:py-1.5 rounded-full font-bold uppercase tracking-[0.2em] md:tracking-[0.25em]">
                  Performance
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-foreground leading-tight">
                  Anabolic Hydration Recovery
                </h3>
                <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                  Formulated to support endurance, hydration balance, and performance during training cycles.
                </p>
                <Button asChild size="lg" className="w-full sm:w-auto shadow-glow bg-primary hover:bg-primary/90 text-white gap-2 justify-center">
                  <Link to="/products">Explore Stack <ChevronRight className="h-4 w-4 shrink-0" /></Link>
                </Button>
              </ScrollReveal>
              <ScrollReveal direction="right" className="md:col-span-6 order-1 md:order-2 w-full">
                <div className="relative bg-card rounded-2xl md:rounded-3xl border border-border overflow-hidden group shadow-xl md:shadow-2xl max-w-sm md:max-w-md mx-auto">
                  <img
                    src="https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//f4f9f244-d122-42e5-a192-62d4475c6d26.png"
                    alt="Anabolic Hydration Recovery"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Showcase 3 */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-20 items-center">
              <ScrollReveal direction="left" className="md:col-span-6 w-full">
                <div className="relative bg-card rounded-2xl md:rounded-3xl border border-border overflow-hidden group shadow-xl md:shadow-2xl max-w-sm md:max-w-md mx-auto">
                  <img
                    src="https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//d4210519-9c5a-4101-a064-84b90287c3c6-removebg-preview.png"
                    alt="Clean Performance Formula"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right" className="md:col-span-6 space-y-4 md:space-y-6 text-center md:text-left px-2 sm:px-0">
                <span className="inline-flex text-[9px] md:text-[10px] bg-primary/15 text-primary px-3 py-1 md:px-4 md:py-1.5 rounded-full font-bold uppercase tracking-[0.2em] md:tracking-[0.25em]">
                  Ingredients
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-foreground leading-tight">
                  Clean Performance Formula
                </h3>
                <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                  Crafted to support overall daily recovery, hydration, and exercise output targets.
                </p>
                <Button asChild size="lg" className="w-full sm:w-auto shadow-glow bg-primary hover:bg-primary/90 text-white gap-2 justify-center">
                  <Link to="/products">View Formula <ChevronRight className="h-4 w-4 shrink-0" /></Link>
                </Button>
              </ScrollReveal>
            </div>

            {/* Showcase 4 */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-20 items-center">
              <ScrollReveal direction="left" className="md:col-span-6 order-2 md:order-1 space-y-4 md:space-y-6 text-center md:text-left px-2 sm:px-0">
                <span className="inline-flex text-[9px] md:text-[10px] bg-primary/15 text-primary px-3 py-1 md:px-4 md:py-1.5 rounded-full font-bold uppercase tracking-[0.2em] md:tracking-[0.25em]">
                  Ergogenic
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-foreground leading-tight">
                  Trusted Formulations
                </h3>
                <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                  Designed for individuals demanding quality ingredients, clean recovery, and straightforward performance support.
                </p>
                <Button asChild size="lg" className="w-full sm:w-auto shadow-glow bg-primary hover:bg-primary/90 text-white gap-2 justify-center">
                  <Link to="/products">Shop Collection <ChevronRight className="h-4 w-4 shrink-0" /></Link>
                </Button>
              </ScrollReveal>
              <ScrollReveal direction="right" className="md:col-span-6 order-1 md:order-2 w-full">
                <div className="relative bg-card rounded-2xl md:rounded-3xl border border-border overflow-hidden group shadow-xl md:shadow-2xl max-w-sm md:max-w-md mx-auto">
                  <img
                    src="https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//d0fed463-4148-42f5-8d2a-594e5b48f021.png"
                    alt="Ergogenic Nutrition"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* INGREDIENTS ARSENAL */}
      <section className="py-16 md:py-24 relative overflow-hidden w-full">
        <div className="container relative z-10 px-4 w-full">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-primary mb-2 md:mb-3">TECH ARSENAL</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground">The science behind every scoop</h2>
            <p className="mt-2 md:mt-4 text-sm md:text-base text-muted-foreground">A closer look at the key ingredients powering our formulations.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {ingredients.map((ing, i) => (
              <ScrollReveal key={ing.name} delay={i * 60}>
                <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 md:p-6 hover-lift h-full transition-all duration-300 hover:border-primary/30 flex flex-col items-start">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-primary/15 grid place-items-center text-primary shrink-0">
                    <ing.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h3 className="mt-4 md:mt-5 font-semibold text-base md:text-lg text-foreground">{ing.name}</h3>
                  <p className="mt-1.5 md:mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">{ing.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-muted/40 border-y border-border w-full">
        <div className="container max-w-3xl px-4 w-full">
          <ScrollReveal className="text-center mb-8 md:mb-12">
            <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-primary mb-2 md:mb-3">FAQ</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground">Questions, answered</h2>
          </ScrollReveal>
          <Accordion type="single" collapsible className="space-y-3 w-full">
            {[
              { q: "Are your products safe?", a: "Yes. Every batch is manufactured using thoroughly evaluated and compliant processes. We provide clear nutrition profiles for all products." },
              { q: "How should I take my supplements?", a: "Each product has straightforward instructions directly on the package label and product description workspace fields." },
              { q: "Can I stack multiple products together?", a: "Yes. Our standard line components can be successfully combined depending on your nutrition targets." },
              { q: "What is your shipping setup?", a: "Orders are processed and packed promptly. Standard transit guidelines vary based on your relative cross-region logistics network locations." },
              { q: "What's your return framework?", a: "Unopened containers can be processed for adjustments inside our standard valid window. Opened goods remain ineligible due to hygiene rules." },
              { q: "Do you support multiple payment options?", a: "Yes — multiple digital methods, standard gateway processors, and cash selection options are fully functional." },
            ].map((f, i) => (
              <AccordionItem key={i} value={`f${i}`} className="bg-card border border-border rounded-xl px-4 md:px-5 w-full">
                <AccordionTrigger className="text-left font-semibold text-sm md:text-base text-foreground py-4 hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-xs md:text-sm text-foreground/80 pb-4 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.2),transparent_60%)]" />
        <ScrollReveal className="container relative text-center max-w-3xl px-4 w-full">
          <Logo className="h-8 md:h-9 mx-auto mb-4 md:mb-6 opacity-90" />
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Train harder. <span className="text-gradient-red block sm:inline">Recover smarter.</span>
          </h2>
          <p className="mt-4 md:mt-5 text-sm md:text-lg text-muted-foreground max-w-md mx-auto">
            Join thousands who trust Ergogenic for clean, quality nutrition.
          </p>
          <Button asChild size="lg" className="mt-8 md:mt-10 w-full sm:w-auto bg-primary hover:bg-primary/90 h-12 px-8 md:px-10 shadow-glow gap-2 justify-center">
            <Link to="/products">Explore Products <ChevronRight className="h-4 w-4 shrink-0" /></Link>
          </Button>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Index;