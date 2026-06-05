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
  Star,
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
import { ProductCard } from "@/components/ProductCard";
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

const testimonials = [
  { name: "Arjun S.", role: "Powerlifter", text: "Super Whey mixes effortlessly and the gains are real. Best whey I've used in 8 years of training.", img: "https://i.pravatar.cc/120?img=11" },
  { name: "Neha R.", role: "CrossFit Athlete", text: "Lean Shot gave me clean energy without crash. My conditioning has never been better.", img: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-05-31 at 7.38.06 PM.jpeg" },
  { name: "Rohit M.", role: "Bodybuilder", text: "Plasma Mass actually delivers clean calories. Up 6kg in three months without any bloat.", img: "https://i.pravatar.cc/120?img=15" },
  { name: "Kavya P.", role: "Marathon Runner", text: "BCAA Recover is now a non-negotiable in my long runs. Recovery is dramatically better.", img: "https://i.pravatar.cc/120?img=32" },
  { name: "Vikram T.", role: "Strength Coach", text: "Finally a brand that publishes lab reports. I recommend Ergogenic to all my athletes.", img: "https://i.pravatar.cc/120?img=12" },
  { name: "Priya K.", role: "Fitness Coach", text: "The taste, the dosing, the transparency — Ergogenic raised the bar for Indian supplements.", img: "https://i.pravatar.cc/120?img=44" },
  { name: "Sahil D.", role: "Calisthenics Athlete", text: "Pure Creatine works exactly as it should. Strength is up across all my pulls.", img: "https://i.pravatar.cc/120?img=8" },
  { name: "Meera J.", role: "Yoga Instructor", text: "Daily Multi keeps my immunity solid through hectic class schedules. Love it.", img: "https://i.pravatar.cc/120?img=49" },
];

const experts = [
  { name: "Dr. Anand Kapoor", role: "Sports Nutrition Lead", desc: "PhD in Exercise Physiology with 15 years guiding elite athletes." },
  { name: "Dr. Ritika Mehra", role: "Clinical R&D", desc: "Formulator for over 40 ergogenic blends across pro sports teams." },
  { name: "Coach Daniel Roy", role: "Performance Coach", desc: "International strength coach focused on evidence-based protocols." },
  { name: "Sneha Iyer", role: "Quality & Compliance", desc: "Leads our independent third-party lab verification program." },
  { name: "Karan Bhalla", role: "Athlete Programs", desc: "Works directly with national-level athletes on supplementation." },
  { name: "Dr. Maya Sharma", role: "Biochemist", desc: "Designs absorption-optimized matrices for our flagship products." },
];

const partners = ["IRON REALM", "FORGE GYMS", "ATHLETIC LAB", "PEAK FITNESS", "VOLT TRAINING", "PRO STRENGTH"];

const Index = () => {
  const featured = products.slice(0, 4);
  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(4);

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
          <p className="text-xs md:text-sm tracking-[0.5em] text-primary mb-5">SCIENCE IN MOTION</p>
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
          <div className="mt-10 inline-flex items-center gap-3 text-sm text-muted-foreground animate-[fade-in_1s_ease-out_1.2s_both]">
            <div className="flex -space-x-2">
              {[11, 47, 15, 32].map((i) => (
                <img key={i} src={`https://i.pravatar.cc/40?img=${i}`} className="h-8 w-8 rounded-full border-2 border-[hsl(var(--background))]" alt="" />
              ))}
            </div>
            <span><strong className="text-foreground">15,000+ Customers</strong> trust Ergogenic</span>
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

      {/* FEATURED PRODUCTS */}
      <section className="py-24 bg-muted/40 border-y border-border">
        <div className="container">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <ScrollReveal direction="left">
              <p className="text-xs tracking-[0.4em] text-primary mb-3">FEATURED PRODUCTS</p>
              <h2 className="text-3xl md:text-5xl font-bold max-w-xl text-foreground">Top-rated by 15,000+ athletes</h2>
            </ScrollReveal>
            <Button asChild variant="outline" className="border-border bg-transparent hover:bg-muted text-foreground">
              <Link to="/products">View all products <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <ProductCard p={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.12),transparent_60%)]" />
        <div className="container relative grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { v: 27, s: "g", l: "Protein per serving" },
            { v: 15000, s: "+", l: "Happy customers" },
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

      {/* COMPARISON */}
      <section className="py-24 bg-muted/40 border-y border-border">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">THE DIFFERENCE</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">Ergogenic vs. The Rest</h2>
            <p className="mt-4 text-muted-foreground">We built Ergogenic to fix what the supplement industry got wrong.</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-left">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-5 font-semibold text-foreground">Feature</th>
                    <th className="p-5 font-semibold text-primary">Ergogenic</th>
                    <th className="p-5 font-semibold text-muted-foreground">Typical brands</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Transparent ingredient panel", true, false],
                    ["Clinical dosing on every active", true, false],
                    ["Zero amino spiking guarantee", true, false],
                    ["Independent third-party lab tested", true, false],
                    ["No proprietary blends", true, false],
                    ["FSSAI Approved", true, true],
                  ].map(([feat, a, b], i) => (
                    <tr key={i} className="hover:bg-muted/50">
                      <td className="p-5 text-foreground">{feat as string}</td>
                      <td className="p-5">{a ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <X className="h-5 w-5 text-foreground/40" />}</td>
                      <td className="p-5">{b ? <CheckCircle2 className="h-5 w-5 text-foreground/40" /> : <X className="h-5 w-5 text-foreground/40" />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* INGREDIENTS */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">TECH ARSENAL</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">The science behind every scoop</h2>
            <p className="mt-4 text-muted-foreground">A closer look at the ingredients powering our formulations.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ingredients.map((ing, i) => (
              <ScrollReveal key={ing.name} delay={i * 80}>
                <div className="bg-card border border-border rounded-xl p-6 hover-lift h-full">
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

      {/* TESTIMONIALS */}
      <section className="py-24 bg-muted/30 border-y border-border overflow-hidden">
        <ScrollReveal className="container mb-12 text-center">
          <p className="text-xs tracking-[0.4em] text-primary mb-3">SUCCESS STORIES</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Hear From Our Success Stories</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Real people. Real performance. Real transformation.</p>
        </ScrollReveal>
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 [perspective:1200px]">
            {testimonials.map((t, i) => {
              const tilts = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1", "-rotate-3", "rotate-2"];
              const offsets = ["translate-y-0", "translate-y-6", "-translate-y-2", "translate-y-4", "translate-y-1", "-translate-y-3", "translate-y-2", "translate-y-5"];
              return (
                <ScrollReveal key={i} delay={i * 70}>
                  <div className={`group ${tilts[i]} ${offsets[i]} transition-all duration-500 hover:rotate-0 hover:translate-y-0`}>
                    <div className="relative bg-card border border-border rounded-2xl p-6 shadow-[0_10px_30px_-15px_hsl(217_91%_50%/0.25)] hover:shadow-[0_20px_50px_-10px_hsl(217_91%_50%/0.35)] hover:border-primary/40 transition-all">
                      <div className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-primary grid place-items-center text-primary-foreground text-xl font-serif shadow-lg">"</div>
                      <div className="flex items-center gap-3">
                        <img src={t.img} alt={t.name} className="h-12 w-12 rounded-full ring-2 ring-primary/40" />
                        <div>
                          <p className="font-semibold text-foreground flex items-center gap-1.5">
                            {t.name}
                            <span className="text-[10px] uppercase tracking-wider bg-primary/20 text-primary px-1.5 py-0.5 rounded">Verified</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{t.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 my-3">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed">"{t.text}"</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
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

      {/* EXPERTS — infinite marquee */}
      <section className="py-24 bg-muted/40 border-y border-border overflow-hidden">
        <ScrollReveal className="container mb-10 text-center">
          <p className="text-xs tracking-[0.4em] text-primary mb-3">MEET OUR EXPERTS</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">The minds behind the formulas</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Scientists, coaches and athletes who shape every Ergogenic blend.</p>
        </ScrollReveal>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[hsl(var(--background))] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[hsl(var(--background))] to-transparent z-10 pointer-events-none" />
          <div className="marquee gap-5">
            {[...experts, ...experts].map((e, i) => (
              <div key={i} className="w-[300px] shrink-0 bg-card border border-border rounded-xl p-6 hover-lift">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/120?img=${[12, 47, 8, 32, 15, 44][i % 6]}`}
                    alt={e.name}
                    className="h-14 w-14 rounded-full ring-2 ring-primary/40 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{e.name}</p>
                    <p className="text-[10px] text-primary uppercase tracking-widest mt-0.5">{e.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
              </div>
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
            Join 15,000+ athletes who trust Ergogenic for transparent, performance-grade nutrition.
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
          <div className="mt-10 inline-flex items-center gap-3 text-sm text-muted-foreground animate-[fade-in_1s_ease-out_1.2s_both]">
            <div className="flex -space-x-2">
              {[11, 47, 15, 32].map((i) => (
                <img key={i} src={`https://i.pravatar.cc/40?img=${i}`} className="h-8 w-8 rounded-full border-2 border-[hsl(var(--background))]" alt="" />
              ))}
            </div>
            <span><strong className="text-foreground">15,000+ Customers</strong> trust Ergogenic</span>
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

      {/* FEATURED PRODUCTS */}
      <section className="py-24 bg-muted/40 border-y border-border">
        <div className="container">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <ScrollReveal direction="left">
              <p className="text-xs tracking-[0.4em] text-primary mb-3">FEATURED PRODUCTS</p>
              <h2 className="text-3xl md:text-5xl font-bold max-w-xl text-foreground">Top-rated by 15,000+ athletes</h2>
            </ScrollReveal>
            <Button asChild variant="outline" className="border-border bg-transparent hover:bg-muted text-foreground">
              <Link to="/products">View all products <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 80}>
                <ProductCard p={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.12),transparent_60%)]" />
        <div className="container relative grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { v: 27, s: "g", l: "Protein per serving" },
            { v: 15000, s: "+", l: "Happy customers" },
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

      {/* COMPARISON */}
      <section className="py-24 bg-muted/40 border-y border-border">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">THE DIFFERENCE</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">Ergogenic vs. The Rest</h2>
            <p className="mt-4 text-muted-foreground">We built Ergogenic to fix what the supplement industry got wrong.</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-left">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-5 font-semibold text-foreground">Feature</th>
                    <th className="p-5 font-semibold text-primary">Ergogenic</th>
                    <th className="p-5 font-semibold text-muted-foreground">Typical brands</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Transparent ingredient panel", true, false],
                    ["Clinical dosing on every active", true, false],
                    ["Zero amino spiking guarantee", true, false],
                    ["Independent third-party lab tested", true, false],
                    ["No proprietary blends", true, false],
                    ["FSSAI Approved", true, true],
                  ].map(([feat, a, b], i) => (
                    <tr key={i} className="hover:bg-muted/50">
                      <td className="p-5 text-foreground">{feat as string}</td>
                      <td className="p-5">{a ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <X className="h-5 w-5 text-foreground/40" />}</td>
                      <td className="p-5">{b ? <CheckCircle2 className="h-5 w-5 text-foreground/40" /> : <X className="h-5 w-5 text-foreground/40" />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* INGREDIENTS */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">TECH ARSENAL</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">The science behind every scoop</h2>
            <p className="mt-4 text-muted-foreground">A closer look at the ingredients powering our formulations.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ingredients.map((ing, i) => (
              <ScrollReveal key={ing.name} delay={i * 80}>
                <div className="bg-card border border-border rounded-xl p-6 hover-lift h-full">
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

      {/* TESTIMONIALS */}
      <section className="py-24 bg-muted/30 border-y border-border overflow-hidden">
        <ScrollReveal className="container mb-12 text-center">
          <p className="text-xs tracking-[0.4em] text-primary mb-3">SUCCESS STORIES</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Hear From Our Success Stories</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Real people. Real performance. Real transformation.</p>
        </ScrollReveal>
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 [perspective:1200px]">
            {testimonials.map((t, i) => {
              const tilts = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1", "-rotate-3", "rotate-2"];
              const offsets = ["translate-y-0", "translate-y-6", "-translate-y-2", "translate-y-4", "translate-y-1", "-translate-y-3", "translate-y-2", "translate-y-5"];
              return (
                <ScrollReveal key={i} delay={i * 70}>
                  <div className={`group ${tilts[i]} ${offsets[i]} transition-all duration-500 hover:rotate-0 hover:translate-y-0`}>
                    <div className="relative bg-card border border-border rounded-2xl p-6 shadow-[0_10px_30px_-15px_hsl(217_91%_50%/0.25)] hover:shadow-[0_20px_50px_-10px_hsl(217_91%_50%/0.35)] hover:border-primary/40 transition-all">
                      <div className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-primary grid place-items-center text-primary-foreground text-xl font-serif shadow-lg">"</div>
                      <div className="flex items-center gap-3">
                        <img src={t.img} alt={t.name} className="h-12 w-12 rounded-full ring-2 ring-primary/40" />
                        <div>
                          <p className="font-semibold text-foreground flex items-center gap-1.5">
                            {t.name}
                            <span className="text-[10px] uppercase tracking-wider bg-primary/20 text-primary px-1.5 py-0.5 rounded">Verified</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{t.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 my-3">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed">"{t.text}"</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
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

      {/* EXPERTS — infinite marquee */}
      <section className="py-24 bg-muted/40 border-y border-border overflow-hidden">
        <ScrollReveal className="container mb-10 text-center">
          <p className="text-xs tracking-[0.4em] text-primary mb-3">MEET OUR EXPERTS</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">The minds behind the formulas</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Scientists, coaches and athletes who shape every Ergogenic blend.</p>
        </ScrollReveal>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[hsl(var(--background))] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[hsl(var(--background))] to-transparent z-10 pointer-events-none" />
          <div className="marquee gap-5">
            {[...experts, ...experts].map((e, i) => (
              <div key={i} className="w-[300px] shrink-0 bg-card border border-border rounded-xl p-6 hover-lift">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/120?img=${[12, 47, 8, 32, 15, 44][i % 6]}`}
                    alt={e.name}
                    className="h-14 w-14 rounded-full ring-2 ring-primary/40 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{e.name}</p>
                    <p className="text-[10px] text-primary uppercase tracking-widest mt-0.5">{e.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
              </div>
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
            Join 15,000+ athletes who trust Ergogenic for transparent, performance-grade nutrition.
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
