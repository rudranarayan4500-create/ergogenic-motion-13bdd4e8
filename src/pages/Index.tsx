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
import { categories, products } from "@/data/products";

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
  { name: "Neha R.", role: "CrossFit Athlete", text: "Lean Shot gave me clean energy without crash. My conditioning has never been better.", img: "https://i.pravatar.cc/120?img=47" },
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
    <div className="bg-[hsl(var(--ink))] text-white">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-grid-dark opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[hsl(var(--ink))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,hsl(var(--primary)/0.25),transparent_60%)]" />
        <div className="container relative z-10 py-32 text-center animate-fade-in">
          <div className="flex justify-center mb-8">
            <Logo className="h-10 md:h-12" />
          </div>
          <p className="text-xs md:text-sm tracking-[0.5em] text-primary mb-5">SCIENCE IN MOTION</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
            FUEL <span className="text-gradient-red">EVOLVED</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/75 max-w-2xl mx-auto">
            Performance-focused nutrition engineered for athletes who train with intent.
            Lab-tested, transparently dosed, made for evolution.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-base h-12 px-8 shadow-glow">
              <Link to="/products">Shop Now <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 border-white/30 text-white hover:bg-white/10 bg-transparent">
              <Link to="/ingredients">Explore Science</Link>
            </Button>
          </div>
          <div className="mt-10 inline-flex items-center gap-3 text-sm text-white/70">
            <div className="flex -space-x-2">
              {[11, 47, 15, 32].map((i) => (
                <img key={i} src={`https://i.pravatar.cc/40?img=${i}`} className="h-8 w-8 rounded-full border-2 border-[hsl(var(--ink))]" alt="" />
              ))}
            </div>
            <span><strong className="text-white">15,000+ Customers</strong> trust Ergogenic</span>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-primary text-primary-foreground py-4 overflow-hidden border-y border-white/10">
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
        <div className="absolute inset-0 bg-grid-dark opacity-40" />
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">BUILD YOUR STACK</p>
            <h2 className="text-3xl md:text-5xl font-bold">Engineered for every goal</h2>
            <p className="mt-4 text-white/65">Choose the category that matches your mission. Every product is dosed for results, not marketing.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((c, i) => {
              const Icon = [Dumbbell, Zap, HeartPulse, Leaf][i];
              return (
                <Link
                  key={c.name}
                  to={`/products?cat=${c.name}`}
                  className="group relative bg-[hsl(var(--card))] border border-white/10 rounded-xl p-7 hover-lift overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/30 transition-colors" />
                  <Icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-5 text-xl font-bold">{c.name}</h3>
                  <p className="mt-2 text-sm text-white/60">{c.description}</p>
                  <div className="mt-6 inline-flex items-center text-sm text-primary">
                    Explore <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 bg-black/40 border-y border-white/10">
        <div className="container">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <p className="text-xs tracking-[0.4em] text-primary mb-3">FEATURED PRODUCTS</p>
              <h2 className="text-3xl md:text-5xl font-bold max-w-xl">Top-rated by 15,000+ athletes</h2>
            </div>
            <Button asChild variant="outline" className="border-white/20 bg-transparent hover:bg-white/10">
              <Link to="/products">View all products <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => <ProductCard key={p.id} p={p} />)}
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
            <div key={i} className="border border-white/10 rounded-xl p-8 bg-card/50 backdrop-blur">
              <div className="text-4xl md:text-5xl font-bold text-gradient-red">
                {stat.float ? "4.9" : <Counter to={stat.v} suffix={stat.s} />}
                {stat.float && stat.s}
              </div>
              <p className="mt-3 text-sm text-white/60 uppercase tracking-widest">{stat.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-24 bg-black/40 border-y border-white/10">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">THE DIFFERENCE</p>
            <h2 className="text-3xl md:text-5xl font-bold">Ergogenic vs. The Rest</h2>
            <p className="mt-4 text-white/65">We built Ergogenic to fix what the supplement industry got wrong.</p>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-5 font-semibold">Feature</th>
                  <th className="p-5 font-semibold text-primary">Ergogenic</th>
                  <th className="p-5 font-semibold text-white/60">Typical brands</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  ["Transparent ingredient panel", true, false],
                  ["Clinical dosing on every active", true, false],
                  ["Zero amino spiking guarantee", true, false],
                  ["Independent third-party lab tested", true, false],
                  ["No proprietary blends", true, false],
                  ["FSSAI Approved", true, true],
                ].map(([feat, a, b], i) => (
                  <tr key={i} className="hover:bg-white/5">
                    <td className="p-5">{feat as string}</td>
                    <td className="p-5">{a ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <X className="h-5 w-5 text-white/40" />}</td>
                    <td className="p-5">{b ? <CheckCircle2 className="h-5 w-5 text-white/40" /> : <X className="h-5 w-5 text-white/40" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* INGREDIENTS */}
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">TECH ARSENAL</p>
            <h2 className="text-3xl md:text-5xl font-bold">The science behind every scoop</h2>
            <p className="mt-4 text-white/65">A closer look at the ingredients powering our formulations.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ingredients.map((ing) => (
              <div key={ing.name} className="bg-card border border-white/10 rounded-xl p-6 hover-lift">
                <div className="h-12 w-12 rounded-lg bg-primary/15 grid place-items-center text-primary">
                  <ing.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-semibold text-lg">{ing.name}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-black/40 border-y border-white/10 overflow-hidden">
        <div className="container mb-12 text-center">
          <p className="text-xs tracking-[0.4em] text-primary mb-3">SUCCESS STORIES</p>
          <h2 className="text-3xl md:text-5xl font-bold">Hear From Our Success Stories</h2>
          <p className="mt-4 text-white/65 max-w-2xl mx-auto">Real people. Real performance. Real transformation.</p>
        </div>
        {[row1, row2].map((row, idx) => (
          <div key={idx} className="overflow-hidden mb-6">
            <div className={`flex gap-5 ${idx === 0 ? "marquee" : "marquee marquee-rev"}`}>
              {[...row, ...row, ...row].map((t, i) => (
                <div key={i} className="w-[340px] shrink-0 bg-card border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <img src={t.img} alt={t.name} className="h-12 w-12 rounded-full" />
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-xs text-white/60">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 my-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed">"{t.text}"</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">CERTIFICATIONS</p>
            <h2 className="text-3xl md:text-5xl font-bold">Verified at every step</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { i: ShieldCheck, t: "Lab Tested" },
              { i: CheckCircle2, t: "FSSAI Approved" },
              { i: Beaker, t: "Quality Verified" },
              { i: Sparkles, t: "Zero Spiking" },
            ].map(({ i: Icon, t }) => (
              <div key={t} className="bg-card border border-white/10 rounded-xl p-8 text-center">
                <Icon className="h-10 w-10 text-primary mx-auto" />
                <p className="mt-4 font-semibold">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTS */}
      <section className="py-24 bg-black/40 border-y border-white/10 overflow-hidden">
        <div className="container mb-10">
          <p className="text-xs tracking-[0.4em] text-primary mb-3">MEET OUR EXPERTS</p>
          <h2 className="text-3xl md:text-5xl font-bold max-w-xl">The minds behind the formulas</h2>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="container flex gap-5 min-w-max">
            {experts.map((e) => (
              <div key={e.name} className="w-[280px] shrink-0 bg-card border border-white/10 rounded-xl p-6 hover-lift">
                <div className="h-12 w-12 rounded-full bg-primary/20 grid place-items-center text-primary font-bold">
                  {e.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
                </div>
                <p className="mt-5 font-semibold">{e.name}</p>
                <p className="text-xs text-primary uppercase tracking-widest mt-1">{e.role}</p>
                <p className="mt-3 text-sm text-white/65">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-16">
        <div className="container">
          <p className="text-center text-xs tracking-[0.4em] text-white/40 mb-8">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((p) => (
              <div key={p} className="text-center text-white/40 font-bold tracking-widest text-sm hover:text-white transition-colors">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFER + COUNTDOWN */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-primary/30" />
        <div className="absolute inset-0 bg-grid-dark opacity-40" />
        <div className="container relative text-center">
          <p className="text-xs tracking-[0.4em] text-primary mb-3">LIMITED TIME</p>
          <h2 className="text-3xl md:text-5xl font-bold">Limited batch pricing available</h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">Save up to 25% on flagship products. Offer ends in:</p>
          <div className="mt-10"><CountdownTimer /></div>
          <Button asChild size="lg" className="mt-10 bg-primary hover:bg-primary/90 h-12 px-8 shadow-glow">
            <Link to="/products">Claim Offer</Link>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-black/40 border-y border-white/10">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-bold">Questions, answered</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: "Are your products safe and tested?", a: "Yes. Every batch is tested at independent third-party labs and is FSSAI approved. We publish lab reports on request." },
              { q: "How should I take my supplements?", a: "Each product has detailed usage instructions on the label and product page. Most proteins are best post-workout with 200ml water or milk." },
              { q: "Can I stack multiple products together?", a: "Absolutely. Our most common stack is Super Whey + Pure Creatine + BCAA Recover. Visit the product pages for personalized stacking guides." },
              { q: "What is your shipping time?", a: "All orders ship within 24 hours. Standard delivery is 2-4 business days across India with free shipping over ₹999." },
              { q: "What's your return policy?", a: "Sealed products can be returned within 7 days of delivery for a full refund. Opened products are non-returnable for hygiene reasons." },
              { q: "Do you offer COD?", a: "Yes — UPI, all major cards, net banking and cash on delivery are supported across India." },
            ].map((f, i) => (
              <AccordionItem key={i} value={`f${i}`} className="bg-card border border-white/10 rounded-xl px-5">
                <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-white/70">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.2),transparent_60%)]" />
        <div className="container relative text-center max-w-3xl">
          <Logo className="h-9 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Train harder. <span className="text-gradient-red">Recover smarter.</span>
          </h2>
          <p className="mt-5 text-white/70 text-lg">
            Join 15,000+ athletes who trust Ergogenic for transparent, performance-grade nutrition.
          </p>
          <Button asChild size="lg" className="mt-10 bg-primary hover:bg-primary/90 h-12 px-10 shadow-glow">
            <Link to="/products">Explore Products <ChevronRight className="ml-1 h-4 w-4" /></Link>
          </Button>
          <div className="mt-10 flex justify-center gap-8 text-xs text-white/50 tracking-widest uppercase flex-wrap">
            <span className="flex items-center gap-2"><Truck className="h-4 w-4" /> Free shipping over ₹999</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Lab tested</span>
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> Zero spiking</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
