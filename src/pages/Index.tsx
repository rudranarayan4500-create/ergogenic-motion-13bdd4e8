import { useRef } from "react";
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
import { CountdownTimer } from "@/components/CountdownTimer";
import { TypewriterText } from "@/components/TypewriterText";

// GSAP Core & Plugins
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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
];

const experts = [
  { name: "Dr. Anand Kapoor", role: "Sports Nutrition Lead", desc: "PhD in Exercise Physiology with 15 years guiding elite athletes." },
  { name: "Dr. Ritika Mehra", role: "Clinical R&D", desc: "Formulator for over 40 ergogenic blends across pro sports teams." },
  { name: "Coach Daniel Roy", role: "Performance Coach", desc: "International strength coach focused on evidence-based protocols." },
];

const partners = ["IRON REALM", "FORGE GYMS", "ATHLETIC LAB", "PEAK FITNESS", "VOLT TRAINING", "PRO STRENGTH"];

export const Index = () => {
  const featured = products.slice(0, 4);
  const mainViewportRef = useRef<HTMLDivElement>(null);

  // Structural DOM Refs for 3D Pinning/Interpolation
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  // Stat Numeric Target Hooks
  const proteinCountRef = useRef<HTMLSpanElement>(null);
  const customerCountRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // ----------------------------------------------------
    // 1. HARDWARE ACCELERATED COUNTER TIMELINES
    // ----------------------------------------------------
    const counterMetrics = { protein: 0, customers: 0 };
    gsap.to(counterMetrics, {
      protein: 27,
      customers: 15000,
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 85%",
      },
      onUpdate: () => {
        if (proteinCountRef.current) {
          proteinCountRef.current.innerText = Math.floor(counterMetrics.protein).toString();
        }
        if (customerCountRef.current) {
          customerCountRef.current.innerText = Math.floor(counterMetrics.customers).toLocaleString();
        }
      },
      duration: 2.5,
      ease: "power3.out",
    });

    // ----------------------------------------------------
    // 2. HERO 3D Z-SPACE TUNNELING ON SCROLL
    // ----------------------------------------------------
    gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    })
    .to(heroRef.current, {
      scale: 1.35,
      opacity: 0,
      filter: "blur(15px)",
      z: 150,
      ease: "none"
    });

    // ----------------------------------------------------
    // 3. SECTION-TO-SECTION 3D INTERPOLATIONS
    // ----------------------------------------------------
    const interactiveSections = [categoriesRef, featuredRef, comparisonRef, testimonialsRef];
    
    interactiveSections.forEach((section) => {
      if (!section.current) return;

      // Entry Perspective Warping
      gsap.fromTo(section.current,
        { scale: 0.88, opacity: 0, rotationX: -8, transformPerspective: 1200 },
        {
          scale: 1,
          opacity: 1,
          rotationX: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section.current,
            start: "top 95%",
            end: "top 50%",
            scrub: 1,
          }
        }
      );

      // Deep Exit Blurring & Zooming
      gsap.to(section.current, {
        scale: 1.12,
        opacity: 0,
        filter: "blur(10px)",
        z: -50,
        ease: "power1.in",
        scrollTrigger: {
          trigger: section.current,
          start: "bottom 35%",
          end: "bottom top",
          scrub: true,
        }
      });
    });
  }, { scope: mainViewportRef });

  return (
    <div ref={mainViewportRef} className="bg-[#030303] text-white overflow-x-hidden antialiased select-none [perspective:1000px]">
      
      {/* 3D HERO CONTAINER */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden will-change-transform z-20">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-30 scale-105"
          src="/videos/hero.mp4"
          autoPlay muted loop playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#030303]" />
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-primary/10 rounded-full filter blur-[120px] animate-pulse pointer-events-none" />

        <div className="container relative z-10 py-32 text-center">
          <div className="flex justify-center mb-8 transform hover:scale-105 transition-transform duration-500">
            <Logo className="h-10 md:h-12" />
          </div>
          <p className="text-xs md:text-sm tracking-[0.6em] text-primary mb-5 font-black">SCIENCE IN MOTION</p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.95] uppercase">
            FUEL{" "}
            <span className="text-gradient-red block md:inline">
              <TypewriterText text="EVOLVED" speed={120} delay={400} />
            </span>
          </h1>
          <p className="mt-8 text-base md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Performance nutrition engineered for athletes who train with intent.
            Lab-tested, transparently dosed, made for physical evolution.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-base h-14 px-10 shadow-glow rounded-xl w-full sm:w-auto">
              <Link to="/products">Shop Catalog <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-10 border-white/20 text-white hover:bg-white/5 bg-transparent backdrop-blur-md rounded-xl w-full sm:w-auto">
              <Link to="/ingredients">Explore Science</Link>
            </Button>
          </div>
          <div className="mt-12 inline-flex items-center gap-3 text-sm text-neutral-400">
            <div className="flex -space-x-2">
              {[11, 47, 15, 32].map((i) => (
                <img key={i} src={`https://i.pravatar.cc/40?img=${i}`} className="h-8 w-8 rounded-full border-2 border-black" alt="" />
              ))}
            </div>
            <span><strong className="text-white font-bold">15,000+ Athletes</strong> trust Ergogenic</span>
          </div>
        </div>
      </section>

      {/* INFINITE TRUST RUNWAY */}
      <section className="bg-primary text-primary-foreground py-5 overflow-hidden border-y border-white/10 relative z-30 shadow-2xl">
        <div className="marquee gap-12 whitespace-nowrap text-xs font-black tracking-[0.25em] uppercase">
          {[...trustItems, ...trustItems, ...trustItems].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>{t}</span>
              <span className="opacity-40 text-sm">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ASYMMETRIC NATURAL CARD CATEGORIES */}
      <section ref={categoriesRef} className="py-32 relative z-20 will-change-transform">
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs tracking-[0.4em] text-primary font-bold bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full uppercase">BUILD YOUR STACK</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mt-6">Engineered for your mission</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c, i) => {
              const Icon = [Dumbbell, Zap, HeartPulse, Leaf][i] || Dumbbell;
              return (
                <Link
                  key={c.name}
                  to={`/products?cat=${c.name}`}
                  className="group relative bg-neutral-900/40 backdrop-blur-xl border border-white/5 hover:border-primary/30 p-8 block transition-all duration-500 shadow-xl"
                  style={{ 
                    borderRadius: i % 2 === 0 ? "32px 64px 32px 48px" : "48px 32px 64px 32px" 
                  }}
                >
                  <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/20 transition-all duration-700" />
                  <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-inner">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-8 text-2xl font-bold text-white tracking-tight">{c.name}</h3>
                  <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{c.description}</p>
                  <div className="mt-8 inline-flex items-center text-xs font-bold tracking-wider text-primary uppercase">
                    Explore Stack <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PREMIUM INVENTORY CONFIGURATIONS */}
      <section ref={featuredRef} className="py-32 bg-black/50 border-y border-white/5 relative z-20 will-change-transform">
        <div className="container">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-8">
            <div>
              <p className="text-xs tracking-[0.4em] text-primary font-bold uppercase">PREMIUM INVENTORY</p>
              <h2 className="text-4xl md:text-6xl font-black max-w-xl text-white tracking-tight mt-3">Top-rated formulations</h2>
            </div>
            <Button asChild variant="outline" className="border-white/10 bg-transparent hover:bg-white/5 text-white h-12 rounded-xl px-6">
              <Link to="/products">View all configurations <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((p) => (
              <div key={p.id} className="transform hover:scale-[1.02] transition-transform duration-500">
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SMOOTH COUNTER METRICS */}
      <section ref={statsRef} className="py-28 relative z-20 bg-[#060606]">
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { ref: proteinCountRef, val: "0", s: "g", l: "Protein per serving" },
            { ref: customerCountRef, val: "0", s: "+", l: "Verified Customers" },
            { val: "4.9", s: "/5", l: "Avg. Athlete rating", static: true },
            { val: "0", s: "%", l: "Amino spiking guarantee" },
          ].map((stat, i) => (
            <div key={i} className="border border-white/5 rounded-2xl p-8 bg-neutral-900/30 backdrop-blur-md text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="text-4xl md:text-6xl font-black text-gradient-red tracking-tighter">
                {stat.static ? (
                  <span>4.9</span>
                ) : (
                  <span ref={stat.ref}>{stat.val}</span>
                )}
                <span className="text-2xl md:text-3xl text-primary ml-0.5">{stat.s}</span>
              </div>
              <p className="mt-4 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-relaxed">{stat.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MATRIX COMPARISON GRID */}
      <section ref={comparisonRef} className="py-32 bg-black/40 border-y border-white/5 relative z-20 will-change-transform">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs tracking-[0.4em] text-primary font-bold uppercase">THE DIFFERENCE</p>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mt-4">Ergogenic vs The Rest</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-neutral-900/10 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="p-6 font-bold text-neutral-300 text-sm md:text-base">Feature Matrix</th>
                  <th className="p-6 font-bold text-primary text-sm md:text-base">Ergogenic</th>
                  <th className="p-6 font-bold text-neutral-500 text-sm md:text-base">Typical Brands</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {[
                  ["Transparent ingredient panel", true, false],
                  ["Clinical dosing on every active", true, false],
                  ["Zero amino spiking guarantee", true, false],
                  ["Independent third-party lab tested", true, false],
                  ["No proprietary blends", true, false],
                  ["FSSAI Approved", true, true],
                ].map(([feat, a, b], i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-neutral-200 font-medium">{feat as string}</td>
                    <td className="p-6">{a ? <CheckCircle2 className="h-5 w-5 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" /> : <X className="h-5 w-5 text-neutral-700" />}</td>
                    <td className="p-6">{b ? <CheckCircle2 className="h-5 w-5 text-neutral-500" /> : <X className="h-5 w-5 text-neutral-700" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* INGREDIENT TECH ARSENAL */}
      <section className="py-32 relative z-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-xs tracking-[0.4em] text-primary font-bold uppercase">BIO-ENGINEERING</p>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mt-4">The Tech Arsenal</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ingredients.map((ing) => (
              <div key={ing.name} className="bg-neutral-900/20 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary shadow-lg shadow-primary/5">
                    <ing.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-bold text-xl text-white tracking-tight">{ing.name}</h3>
                  <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{ing.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEXTIMONIALS SECTION - Fluid Organic Floating Layout */}
      <section ref={testimonialsRef} className="py-32 relative z-20 overflow-hidden will-change-transform bg-gradient-to-b from-[#030303] to-[#0a0203]">
        <div className="container mb-20 text-center">
          <span className="text-xs tracking-[0.4em] text-primary font-bold uppercase">ELITE REVIEWS</span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-4">Athlete Feedback</h2>
        </div>
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className="relative bg-neutral-900/60 backdrop-blur-xl border border-white/5 p-8 transition-all duration-500 group shadow-[0_30px_70px_rgba(0,0,0,0.5)] hover:border-primary/30"
                style={{ 
                  borderRadius: i % 3 === 0 ? "50% 45% 40% 55% / 40% 55% 45% 50%" : i % 3 === 1 ? "40% 55% 50% 45% / 55% 40% 55% 45%" : "55% 40% 45% 55% / 45% 50% 40% 55%",
                  boxShadow: "inset 0 0 20px rgba(255,255,255,0.02)"
                }}
              >
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/30" />
                  <div>
                    <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                      {t.name}
                      <span className="text-[9px] font-black uppercase bg-primary/20 text-primary px-1.5 py-0.5 rounded-sm tracking-widest">PRO</span>
                    </h4>
                    <p className="text-xs text-neutral-400">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 my-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-neutral-300 italic leading-relaxed">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THIRD-PARTY CERTIFICATIONS MARQUEE */}
      <section className="py-24 bg-neutral-950 border-y border-white/5 relative z-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { i: ShieldCheck, t: "Lab Tested Batch Matrix" },
              { i: CheckCircle2, t: "FSSAI Premium Certified" },
              { i: Beaker, t: "Independent Purity Verification" },
              { i: Sparkles, t: "Zero Spiking Guarantee" },
            ].map(({ i: Icon, t }, idx) => (
              <div key={idx} className="bg-neutral-900/20 border border-white/5 rounded-2xl p-6 text-center hover:bg-neutral-900/40 transition-colors">
                <Icon className="h-8 w-8 text-primary mx-auto drop-shadow-[0_0_10px_rgba(var(--primary),0.3)]" />
                <p className="mt-4 font-semibold text-neutral-200 text-sm tracking-wide">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLINICAL LAB RESEARCH SYNDICATE */}
      <section className="py-24 bg-black/40 border-b border-white/5 overflow-hidden relative z-20">
        <div className="container mb-12 text-center">
          <p className="text-xs tracking-[0.4em] text-primary font-bold uppercase">MEET OUR EXPERTS</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3">Minds Behind the Formulas</h2>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />
          <div className="marquee gap-5">
            {[...experts, ...experts].map((e, i) => (
              <div key={i} className="w-[320px] shrink-0 bg-neutral-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <img
                    src={`https://i.pravatar.cc/120?img=${[12, 47, 8, 32, 15, 44][i % 3]}`}
                    alt={e.name}
                    className="h-14 w-14 rounded-full ring-2 ring-primary/30 object-cover"
                  />
                  <div>
                    <p className="font-bold text-white text-base">{e.name}</p>
                    <p className="text-[10px] text-primary uppercase tracking-widest font-bold mt-0.5">{e.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-neutral-400 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALLOCATION MATRIX COUNTDOWN */}
      <section className="py-32 relative z-20 overflow-hidden bg-[#060001]">
        <div className="absolute inset-0 bg-radial-gradient from-primary/10 to-transparent pointer-events-none" />
        <div className="container relative text-center max-w-2xl mx-auto">
          <span className="text-xs tracking-[0.4em] text-primary font-bold uppercase">ALLOCATION LIMIT</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-4 tracking-tight">Batch pricing active</h2>
          <p className="mt-4 text-sm text-neutral-400">Secured allocations are closing shortly. Locked rates expire in:</p>
          <div className="mt-12 scale-105 md:scale-110">
            <CountdownTimer />
          </div>
          <Button asChild size="lg" className="mt-14 bg-primary hover:bg-primary/90 h-14 px-10 shadow-glow rounded-xl font-bold">
            <Link to="/products">Secure My Allotment</Link>
          </Button>
        </div>
      </section>

      {/* COLLAPSIBLE FAQ SYSTEM */}
      <section className="py-32 bg-black/60 border-t border-white/5 relative z-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] text-primary font-bold uppercase">SUPPORT DEPOT</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-3">FAQ</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: "Are your products safe and tested?", a: "Yes. Every batch is tested at independent third-party labs and is FSSAI approved. We publish lab reports transparently." },
              { q: "How should I take my supplements?", a: "Each product has detailed usage instructions on the label and product page. Most proteins are best post-workout with 200ml water or milk." },
              { q: "Can I stack multiple products together?", a: "Absolutely. Our most common stack is Super Whey + Pure Creatine + BCAA Recover. Visit the product pages for personalized stacking guides." },
              { q: "What is your shipping time?", a: "All orders ship within 24 hours. Standard delivery is 2-4 business days across India with free shipping over ₹999." },
              { q: "What's your return policy?", a: "Sealed products can be returned within 7 days of delivery for a full refund. Opened products are non-returnable for hygiene reasons." },
              { q: "Do you offer COD?", a: "Yes — UPI, all major cards, net banking and cash on delivery are supported across India." },
            ].map((f, i) => (
              <AccordionItem key={i} value={`f${i}`} className="bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-bold text-white hover:no-underline text-base py-5">{f.q}</AccordionTrigger>
                <AccordionContent className="text-neutral-400 text-sm leading-relaxed pb-5">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* INDUSTRIAL BRANDING PARTNERS */}
      <section className="py-20 border-t border-white/5 bg-[#030303] relative z-20">
        <div className="container">
          <p className="text-center text-xs tracking-[0.5em] text-neutral-600 font-bold mb-10 uppercase">TRUSTED BY NETWORK CORES</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((p) => (
              <div key={p} className="text-center text-neutral-600 font-black tracking-widest text-sm hover:text-white transition-colors duration-300">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVERTED TERMINATION CTA */}
      <section className="py-36 relative z-20 overflow-hidden bg-gradient-to-t from-black to-transparent">
        <div className="container relative text-center max-w-3xl">
          <Logo className="h-8 mx-auto mb-8 opacity-40" />
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase">
            Train harder. <span className="text-gradient-red block md:inline">Recover smarter.</span>
          </h2>
          <p className="mt-6 text-neutral-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Join 15,000+ performance athletes who demand clinical transparent dosing.
          </p>
          <Button asChild size="lg" className="mt-12 bg-primary hover:bg-primary/90 h-14 px-12 shadow-glow rounded-xl font-bold">
            <Link to="/products">Instant Access <ChevronRight className="ml-1 h-4 w-4" /></Link>
          </Button>
          <div className="mt-14 flex justify-center gap-8 text-xs text-neutral-500 font-bold tracking-widest uppercase flex-wrap">
            <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Free Shipping Over ₹999</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> 100% Lab Verified</span>
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Zero Amino Spiking</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;