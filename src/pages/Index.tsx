import { Link } from "react-router-dom";
import {
  Beaker,
  CheckCircle2,
  ChevronRight,
  Dumbbell,
  FlaskConical,
  HeartPulse,
  Leaf,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
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
import { Counter } from "@/components/Counter";
import { CountdownTimer } from "@/components/CountdownTimer";
import { TypewriterText } from "@/components/TypewriterText";
import { ScrollReveal } from "@/components/ScrollReveal";
import { categories, products } from "@/data/products";
import { ProductShowcaseSlider } from "@/components/ProductShowcaseSlider";

const trustItems = [
  "Lab Tested",
  "Ships in 24 Hours",
  "FSSAI Approved",
  "Zero Amino Spiking",
  "Free Delivery",
  "Certified Pure",
  "Athlete Tested",
];

const ingredients = [
  { name: "Whey Protein", icon: Dumbbell, desc: "Premium fast-absorbing protein for lean muscle development and recovery." },
  { name: "Creatine Monohydrate", icon: Zap, desc: "The most studied performance supplement for strength, power and size." },
  { name: "BCAA 2:1:1", icon: Sparkles, desc: "Branched-chain amino acids to fuel intra-workout endurance and reduce fatigue." },
  { name: "L-Glutamine", icon: HeartPulse, desc: "Supports recovery, immunity and gut health after demanding training." },
  { name: "L-Citrulline", icon: FlaskConical, desc: "Boosts nitric oxide for sustained pumps, blood flow and endurance." },
  { name: "Digestive Enzymes", icon: Leaf, desc: "Improves protein absorption and reduces bloating between meals." },
];

const partners = ["IRON REALM", "FORGE GYMS", "ATHLETIC LAB", "PEAK FITNESS", "VOLT TRAINING", "PRO STRENGTH"];

const Index = () => {
  const featured = products.slice(0, 4);

  return (
    <div className="bg-background text-foreground">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-grid-light opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,hsl(var(--primary)/0.18),transparent_60%)]" />
        <div className="container relative z-10 py-32 text-center animate-fade-in">
          <div className="flex justify-center mb-8">
            <Logo className="h-10 md:h-12" />
          </div>
          <p className="text-xs md:text-sm tracking-[0.5em] text-primary mb-5">WHERE PERSONAL TRANSFORMATIONS MET PURPOSE</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
            FUEL{" "}
            <span className="text-gradient-red">
              <TypewriterText text="EVOLVED" speed={120} delay={400} />
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground max-w-2xl mx-auto overflow-hidden">
            <span className="inline-block animate-[fade-in_1.2s_ease-out_0.8s_both]">
              Performance-focused nutrition engineered for athletes who train with intent.
              Lab-tested, transparently dosed, made for evolution.
            </span>
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-[fade-in_1s_ease-out_1s_both]">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-base h-12 px-8 shadow-glow">
              <Link to="/products">Shop Now <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 border-border text-foreground hover:bg-muted bg-transparent">
              <Link to="/ingredients">Explore Science</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE SLIDER */}
      <ProductShowcaseSlider />

      {/* TRUST BAR */}
      <section className="bg-primary text-primary-foreground py-4 overflow-hidden border-y border-border">
        <div className="marquee gap-12 whitespace-nowrap text-sm font-semibold tracking-widest uppercase">
          {[...trustItems, ...trustItems, ...trustItems].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>{t}</span>
              <span className="opacity-50">◆</span>
            </span>
          ))}
        </div>
      </section>

      {/* BRAND HIGHLIGHT: INDIA'S HOME-GROWN PREMIER BRAND */}
      <section className="py-20 relative bg-muted/20 border-b border-border">
        <div className="container text-center max-w-3xl">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-[0.4em] text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">
              The Standard
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-6 leading-tight text-foreground">
              India's Home-Grown Premier <br />
              <span className="text-gradient-red">Supplements Brand</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              We reject cheap imports and second-hand contract formulations. Engineered locally from seed to shaker, we deliver international benchmark standards crafted right here at home.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* THE TASTE BREAKTHROUGH: WORLD'S BEST-TASTING WHEY */}
      <section className="py-24 relative border-b border-border">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">MUST TRY</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 leading-tight">
              The World's Best-Tasting <br />Whey Protein
            </h2>
            <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">
              Most whey protein out there taste like mud: thick, chalky, gritty, and far from delicious. The result? You end up dreading it instead of loving it.
            </p>
            <p className="mt-4 text-foreground font-medium text-base md:text-lg leading-relaxed bg-muted/60 p-4 border-l-2 border-primary rounded-r-xl">
              Fuelled Whey is the most delicious whey out there. So you don't have to chug your whey to reach your goals.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="right" className="flex justify-center">
            <div className="w-full max-w-md aspect-[4/3] bg-gradient-to-br from-card to-muted border border-border rounded-xl flex flex-col justify-center p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-bl">Premium Matrix</div>
              <Dumbbell className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold">Zero Flavor Fatigue</h3>
              <p className="text-sm text-muted-foreground mt-2">Instantized solubility engineered to mix clean under 20 seconds without sediment clumping.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* REPLICATING THE COMPARISON ROW LAYOUT FROM image_9830af.png */}
      <section className="py-24 bg-muted/30 border-b border-border">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Box Component (Table Interface derived from image_9830af.png) */}
            <div className="lg:col-span-7 overflow-x-auto rounded-xl border border-border bg-background shadow-xl">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="p-5 text-sm font-bold uppercase tracking-wider text-muted-foreground"></th>
                    <th className="p-5 text-center text-lg font-bold text-foreground bg-primary/10 border-x border-border/80 relative">
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[9px] px-2 py-0.5 rounded-full uppercase tracking-widest font-black">Active</span>
                      Fuelled
                    </th>
                    <th className="p-5 text-center text-sm font-semibold text-muted-foreground/60">Ordinary Supplements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Premium Ingredients", true],
                    ["Evidence-Based Formulation", true],
                    ["Third-Party Tested", true],
                    ["Seriously Delicious", true],
                    ["No BS", true],
                  ].map(([feature, val], idx) => (
                    <tr key={idx} className="hover:bg-muted/20 transition-colors">
                      <td className="p-5 text-sm font-bold text-foreground">{feature as string}</td>
                      <td className="p-5 text-center bg-primary/15 border-x border-border/80">
                        <div className="h-6 w-6 rounded-full bg-primary/20 text-primary border border-primary/40 flex items-center justify-center mx-auto shadow-sm">
                          ✓
                        </div>
                      </td>
                      <td className="p-5 text-center text-muted-foreground/40 font-light">
                        ✕
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right Text Component (Typography block derived from image_9830af.png) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <ScrollReveal direction="right">
                <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1] uppercase">
                  Stop Using Shady Supplements <br />That Don't Work
                </h2>
                <p className="mt-6 text-muted-foreground text-sm md:text-base leading-relaxed">
                  Most supplements out there are worthless, if not downright ineffective. Ineffective ingredients, ineffective doses, proprietary blends, duplicacy - just some of the things that the supplement industry relies on to maximize profits at the expense of your health, performance and results.
                </p>
                <div className="mt-8">
                  <Link to="/ingredients" className="inline-flex items-center text-xs font-black tracking-widest text-foreground hover:text-primary transition-colors border-b-2 border-foreground hover:border-primary pb-1 uppercase">
                    Learn About Our Evidence-Based Approach
                  </Link>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-grid-light opacity-40" />
        <div className="container relative">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">BUILD YOUR STACK</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">Engineered for every goal</h2>
            <p className="mt-4 text-muted-foreground">Every product is dosed for results, not marketing. Tap a card to explore.</p>
          </ScrollReveal>
        </div>
        <div className="relative overflow-hidden group">
          <div className="marquee gap-6 [animation-duration:60s] group-hover:[animation-play-state:paused]">
            {[...products, ...products].map((p, i) => (
              <Link
                key={`${p.id}-${i}`}
                to={`/products/${p.id}`}
                className="shrink-0 w-[260px] bg-card border border-border rounded-xl overflow-hidden hover-lift block"
              >
                <div className="aspect-[4/5] bg-muted overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                </div>
                <div className="p-4">
                  <p className="text-[10px] tracking-[0.3em] text-primary uppercase">{p.category}</p>
                  <h3 className="mt-1.5 font-bold text-foreground leading-tight line-clamp-1">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.tagline}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-base font-bold text-foreground">₹{p.price.toLocaleString()}</span>
                    <span className="inline-flex items-center text-xs text-primary">Shop <ChevronRight className="h-3.5 w-3.5 ml-0.5" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </section>

     ```jsx
{/* FEATURED PRODUCTS */}
<section className="py-24 bg-muted/40 border-y border-border overflow-hidden">
  <div className="container">
    
    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto mb-24">
      <p className="text-xs tracking-[0.4em] text-primary mb-3 uppercase">
        Featured Lineup
      </p>

      <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tight uppercase leading-tight">
        Top-Rated by Elite Athletes
      </h2>

      <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
        Performance-grade supplementation engineered for strength,
        endurance, recovery, and complete athletic evolution.
      </p>
    </div>

    <div className="space-y-32">

      {/* Showcase 1 */}
      <div className="grid md:grid-cols-12 gap-10 lg:gap-20 items-center">
        
        <ScrollReveal direction="left" className="md:col-span-6">
          <div className="relative bg-card rounded-3xl border border-border overflow-hidden group shadow-2xl max-w-md mx-auto">
            <img
              src="https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//f579410b-7a2a-4db6-a058-59078cc70e1f.png"
              alt="Advanced Iso Whey Blend"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" className="md:col-span-6 space-y-6">
          <span className="inline-flex text-[10px] bg-primary/15 text-primary px-4 py-1.5 rounded-full font-bold uppercase tracking-[0.25em]">
            Premium Whey Line
          </span>

          <h3 className="text-3xl lg:text-5xl font-extrabold text-foreground leading-tight">
            Advanced Iso-Whey Blend
          </h3>

          <p className="text-muted-foreground leading-relaxed text-lg">
            Engineered with continuous cross-flow microfiltration
            technology to maximize recovery, lean muscle synthesis,
            and rapid nutrient absorption.
          </p>

          <Button
            asChild
            size="lg"
            className="shadow-glow bg-primary hover:bg-primary/90 text-white"
          >
            <Link to="/products">
              Buy Now
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>

      {/* Showcase 2 */}
      <div className="grid md:grid-cols-12 gap-10 lg:gap-20 items-center">

        <ScrollReveal
          direction="left"
          className="md:col-span-6 order-2 md:order-1 space-y-6"
        >
          <span className="inline-flex text-[10px] bg-primary/15 text-primary px-4 py-1.5 rounded-full font-bold uppercase tracking-[0.25em]">
            Intra-Workout Performance
          </span>

          <h3 className="text-3xl lg:text-5xl font-extrabold text-foreground leading-tight">
            Anabolic Hydration Recovery
          </h3>

          <p className="text-muted-foreground leading-relaxed text-lg">
            Formulated with targeted amino-performance matrices to
            sustain endurance thresholds, hydration balance, and
            muscular output during intense training cycles.
          </p>

          <Button
            asChild
            size="lg"
            className="shadow-glow bg-primary hover:bg-primary/90 text-white"
          >
            <Link to="/products">
              Explore Stack
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>

        <ScrollReveal
          direction="right"
          className="md:col-span-6 order-1 md:order-2"
        >
          <div className="relative bg-card rounded-3xl border border-border overflow-hidden group shadow-2xl max-w-md mx-auto">
            <img
              src="https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//f4f9f244-d122-42e5-a192-62d4475c6d26.png"
              alt="Anabolic Hydration Recovery"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
          </div>
        </ScrollReveal>
      </div>

      {/* Showcase 3 */}
      <div className="grid md:grid-cols-12 gap-10 lg:gap-20 items-center">

        <ScrollReveal direction="left" className="md:col-span-6">
          <div className="relative bg-card rounded-3xl border border-border overflow-hidden group shadow-2xl max-w-md mx-auto">
            <img
              src="https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//d4210519-9c5a-4101-a064-84b90287c3c6-removebg-preview.png"
              alt="Clean Performance Formula"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" className="md:col-span-6 space-y-6">
          <span className="inline-flex text-[10px] bg-primary/15 text-primary px-4 py-1.5 rounded-full font-bold uppercase tracking-[0.25em]">
            Premium Ingredients
          </span>

          <h3 className="text-3xl lg:text-5xl font-extrabold text-foreground leading-tight">
            Clean Performance Formula
          </h3>

          <p className="text-muted-foreground leading-relaxed text-lg">
            Built with clinically-backed ingredients focused on
            hydration support, muscle retention, recovery speed,
            and optimized physical performance.
          </p>

          <Button
            asChild
            size="lg"
            className="shadow-glow bg-primary hover:bg-primary/90 text-white"
          >
            <Link to="/products">
              View Formula
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>

      {/* Showcase 4 */}
      <div className="grid md:grid-cols-12 gap-10 lg:gap-20 items-center">

        <ScrollReveal
          direction="left"
          className="md:col-span-6 order-2 md:order-1 space-y-6"
        >
          <span className="inline-flex text-[10px] bg-primary/15 text-primary px-4 py-1.5 rounded-full font-bold uppercase tracking-[0.25em]">
            Athlete Approved
          </span>

          <h3 className="text-3xl lg:text-5xl font-extrabold text-foreground leading-tight">
            Trusted by Elite Competitors
          </h3>

          <p className="text-muted-foreground leading-relaxed text-lg">
            Preferred by athletes demanding premium-quality recovery,
            transparent formulations, and elite-level performance
            support without compromise.
          </p>

          <Button
            asChild
            size="lg"
            className="shadow-glow bg-primary hover:bg-primary/90 text-white"
          >
            <Link to="/products">
              Shop Collection
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>

        <ScrollReveal
          direction="right"
          className="md:col-span-6 order-1 md:order-2"
        >
          <div className="relative bg-card rounded-3xl border border-border overflow-hidden group shadow-2xl max-w-md mx-auto">
            <img
              src="https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//d0fed463-4148-42f5-8d2a-594e5b48f021.png"
              alt="Elite Athlete Approved"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
          </div>
        </ScrollReveal>
      </div>

    </div>
  </div>
</section>


      {/* STATS */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.12),transparent_60%)]" />
        <div className="container relative grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { v: 27, s: "g", l: "Protein per serving" },
            { v: 100, s: "%", l: "Label Accuracy" },
            { v: 4.9, s: "/5", l: "Avg. rating", float: true },
            { v: 0, s: "%", l: "Amino spiking" },
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="border border-border rounded-xl p-8 bg-card/50 backdrop-blur">
                <div className="text-4xl md:text-5xl font-bold text-gradient-red">
                  {stat.float ? "4.9" : <Counter to={stat.v} suffix={stat.s} />}
                  {stat.float && stat.s}
                </div>
                <p className="mt-3 text-sm text-muted-foreground uppercase tracking-widest">{stat.l}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* INGREDIENTS WITH PREMIUM WATERMARK ASSET OVERLAYS */}
      <section className="py-24 relative overflow-hidden">
        {/* Layered Content Watermarks derived from exact formula layout guidelines */}
        <div 
          className="absolute -top-12 -left-20 w-80 h-80 opacity-15 pointer-events-none select-none mix-blend-screen bg-contain bg-no-repeat bg-center" 
          style={{ backgroundImage: `url('https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//d4210519-9c5a-4101-a064-84b90287c3c6-removebg-preview.png')` }} 
        />
        <div 
          className="absolute -bottom-16 -right-16 w-96 h-96 opacity-10 pointer-events-none select-none mix-blend-screen bg-contain bg-no-repeat bg-center" 
          style={{ backgroundImage: `url('https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//d0fed463-4148-42f5-8d2a-594e5b48f021.png')` }} 
        />
        
        <div className="container relative z-10">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">TECH ARSENAL</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">The science behind every scoop</h2>
            <p className="mt-4 text-muted-foreground">A closer look at the ingredients powering our formulations.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ingredients.map((ing, i) => (
              <ScrollReveal key={ing.name} delay={i * 80}>
                <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover-lift h-full transition-all duration-300 hover:border-primary/30">
                  <div className="h-12 w-12 rounded-lg bg-primary/15 grid place-items-center text-primary">
                    <ing.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-semibold text-lg text-foreground">{ing.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{ing.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">CERTIFICATIONS</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">Verified at every step</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { i: ShieldCheck, t: "Lab Tested" },
              { i: CheckCircle2, t: "FSSAI Approved" },
              { i: Beaker, t: "Quality Verified" },
              { i: Sparkles, t: "Zero Spiking" },
            ].map(({ i: Icon, t }, idx) => (
              <ScrollReveal key={t} delay={idx * 80}>
                <div className="bg-card border border-border rounded-xl p-8 text-center">
                  <Icon className="h-10 w-10 text-primary mx-auto" />
                  <p className="mt-4 font-semibold text-foreground">{t}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-16">
        <div className="container">
          <p className="text-center text-xs tracking-[0.4em] text-foreground/40 mb-8">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((p) => (
              <div key={p} className="text-center text-foreground/40 font-bold tracking-widest text-sm hover:text-foreground transition-colors">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFER + COUNTDOWN */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-primary/30" />
        <div className="absolute inset-0 bg-grid-light opacity-40" />
        <ScrollReveal className="container relative text-center">
          <p className="text-xs tracking-[0.4em] text-primary mb-3">LIMITED TIME</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Limited batch pricing available</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Save up to 25% on flagship products. Offer ends in:</p>
          <div className="mt-10"><CountdownTimer /></div>
          <Button asChild size="lg" className="mt-10 bg-primary hover:bg-primary/90 h-12 px-8 shadow-glow">
            <Link to="/products">Claim Offer</Link>
          </Button>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted/40 border-y border-border">
        <div className="container max-w-3xl">
          <ScrollReveal className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">Questions, answered</h2>
          </ScrollReveal>
          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: "Are your products safe and tested?", a: "Yes. Every batch is tested at independent third-party labs and is FSSAI approved. We publish lab reports on request." },
              { q: "How should I take my supplements?", a: "Each product has detailed usage instructions on the label and product page. Most proteins are best post-workout with 200ml water or milk." },
              { q: "Can I stack multiple products together?", a: "Absolutely. Our most common stack is Super Whey + Pure Creatine + BCAA Recover. Visit the product pages for personalized stacking guides." },
              { q: "What is your shipping time?", a: "All orders ship within 24 hours. Standard delivery is 2-4 business days across India with free shipping over ₹999." },
              { q: "What's your return policy?", a: "Sealed products can be returned within 7 days of delivery for a full refund. Opened products are non-returnable for hygiene reasons." },
              { q: "Do you offer COD?", a: "Yes — UPI, all major cards, net banking and cash on delivery are supported across India." },
            ].map((f, i) => (
              <AccordionItem key={i} value={`f${i}`} className="bg-card border border-border rounded-xl px-5">
                <AccordionTrigger className="text-left font-semibold text-foreground">{f.q}</AccordionTrigger>
                <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.2),transparent_60%)]" />
        <ScrollReveal className="container relative text-center max-w-3xl">
          <Logo className="h-9 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Train harder. <span className="text-gradient-red">Recover smarter.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Join thousands of elite athletes who trust Ergogenic for transparent, performance-grade nutrition.
          </p>
          <Button asChild size="lg" className="mt-10 bg-primary hover:bg-primary/90 h-12 px-10 shadow-glow">
            <Link to="/products">Explore Products <ChevronRight className="ml-1 h-4 w-4" /></Link>
          </Button>
          <div className="mt-10 flex justify-center gap-8 text-xs text-muted-foreground tracking-widest uppercase flex-wrap">
            <span className="flex items-center gap-2"><Truck className="h-4 w-4" /> Free shipping over ₹999</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Lab tested</span>
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> Zero spiking</span>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Index;