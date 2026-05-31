
import {
  CheckCircle2,
  Dumbbell,
  ShieldCheck,
  Sparkles,
  FlaskConical,
  HeartPulse,
  Award,
  Users,
  ChevronRight,
  Star,
  Truck,
  Globe,
} from "lucide-react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { PageHero } from "@/components/PageHero";
import { Counter } from "@/components/Counter";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";

const certifications = [
  "Third-Party Lab Tested",
  "FSSAI Approved",
  "No Amino Spiking",
  "Transparent Labels",
  "Athlete Approved",
  "Clinically Dosed",
];

const ingredients = [
  {
    title: "Whey Protein Isolate",
    icon: Dumbbell,
    desc: "Fast-digesting premium protein engineered for lean muscle growth and rapid recovery.",
  },
  {
    title: "Creatine Monohydrate",
    icon: Sparkles,
    desc: "Clinically proven to increase strength, power output and training performance.",
  },
  {
    title: "L-Citrulline",
    icon: FlaskConical,
    desc: "Improves blood flow, nitric oxide production and muscular endurance.",
  },
  {
    title: "Electrolytes Blend",
    icon: HeartPulse,
    desc: "Hydration-focused minerals that support endurance and recovery.",
  },
];

const team = [
  {
    name: "Aarav Mehta",
    role: "Certified Strength Coach",
    img: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-05-31 at 8.13.03 PM.jpeg",
    desc: "Specializes in hypertrophy programming, advanced strength cycles and athlete performance optimization.",
  },
  {
    name: "Dr. Sarah Khan",
    role: "Sports Nutrition Scientist",
    img: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-05-31 at 8.15.32 PM.jpeg",
    desc: "Works on evidence-based supplementation and recovery systems for elite athletes.",
  },
  {
    name: "Ryan Brooks",
    role: "Performance Specialist",
    img: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-05-31 at 7.38.06 PM.jpeg",
    desc: "Focuses on explosive power training, endurance development and functional movement.",
  },
];

const reviews = [
  {
    name: "Rahul S.",
    role: "Powerlifter",
    text: "The cleanest whey I've used in years. Recovery and strength both improved dramatically.",
  },
  {
    name: "Neha P.",
    role: "CrossFit Athlete",
    text: "Finally a supplement brand that actually discloses every ingredient properly.",
  },
  {
    name: "Arjun K.",
    role: "Bodybuilder",
    text: "The pumps, energy and recovery are unreal. Ergogenic became my daily stack.",
  },
];

const About = () => {
  return (
    <div className="bg-[hsl(var(--ink))] text-white overflow-hidden">
      {/* HERO */}
      <PageHero
        eyebrow="About Ergogenic"
        title="Built for athletes who demand more"
        subtitle="Science-backed supplements engineered for real performance, recovery and transparency."
      />

      {/* STORY */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-grid-white/[0.03]" />

        <div className="container relative grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <p className="text-xs tracking-[0.4em] text-primary mb-4">
                OUR STORY
              </p>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                We built Ergogenic to fix the supplement industry.
              </h2>

              <p className="mt-6 text-white/75 leading-relaxed text-lg">
                Most supplement brands focus on marketing first and quality
                second. We decided to reverse that. Ergogenic was founded by
                athletes, coaches and researchers who were tired of hidden
                formulas, amino spiking and under-dosed ingredients.
              </p>

              <p className="mt-5 text-white/70 leading-relaxed">
                Every formula we create is transparently labeled, clinically
                dosed and independently tested for purity and performance.
                Because athletes deserve supplements they can actually trust.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  "Independent Lab Testing",
                  "Clinically Effective Doses",
                  "Transparent Ingredient Labels",
                  "No Proprietary Blends",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-white/85">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="relative">
              <div className="absolute -inset-5 bg-primary/20 blur-3xl rounded-full" />

              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
                src="https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//d0fed463-4148-42f5-8d2a-594e5b48f021.png"
                alt="Ergogenic Supplements"
                className="relative rounded-3xl border border-white/10 shadow-2xl object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 bg-black/40 border-y border-white/10">
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { v: 15000, s: "+", l: "Athletes Served" },
            { v: 250, s: "+", l: "Lab Tests Per Year" },
            { v: 24, s: "h", l: "Dispatch Speed" },
            { v: 100, s: "%", l: "Transparency" },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="bg-card border border-white/10 rounded-2xl p-8 text-center hover-lift">
                <div className="text-4xl md:text-5xl font-bold text-gradient-red">
                  <Counter to={item.v} suffix={item.s} />
                </div>

                <p className="mt-3 text-xs tracking-widest uppercase text-white/60">
                  {item.l}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">
              CERTIFIED QUALITY
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              Trusted at every level
            </h2>

            <p className="mt-5 text-white/65">
              From sourcing to manufacturing, every step is verified for purity,
              safety and effectiveness.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((item, i) => (
              <ScrollReveal key={item} delay={i * 70}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 hover:border-primary/40 transition-all">
                  <div className="absolute top-0 right-0 h-28 w-28 bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all" />

                  <div className="relative flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/15 grid place-items-center">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>

                    <h3 className="font-semibold text-lg">{item}</h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INGREDIENTS */}
      <section className="py-24 bg-black/40 border-y border-white/10">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">
              PERFORMANCE INGREDIENTS
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              Engineered with clinically backed compounds
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ingredients.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="group bg-card border border-white/10 rounded-2xl p-7 hover-lift">
                  <div className="h-14 w-14 rounded-xl bg-primary/15 grid place-items-center text-primary">
                    <item.icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-white/65 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM FLIP CARDS */}
      <section className="py-28 overflow-hidden">
        <div className="container">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">
              OUR EXPERT TEAM
            </p>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Built by professionals who live performance
            </h2>

            <p className="mt-6 text-white/65 text-lg">
              Our coaches, nutritionists and scientists work together to build
              supplements designed for real-world athletic performance.
            </p>
          </ScrollReveal>

          <div className="overflow-x-auto scrollbar-hide pb-6">
            <div className="flex gap-8 min-w-max px-2">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: 120 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.15,
                  }}
                  viewport={{ once: true }}
                  className="group perspective"
                >
                  <div className="relative h-[520px] w-[340px] duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                    
                    {/* FRONT */}
                    <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border border-white/10 bg-card shadow-2xl">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                      <div className="absolute bottom-0 left-0 p-7">
                        <p className="text-primary text-sm tracking-widest uppercase">
                          Ergogenic Expert
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                          {member.name}
                        </h3>

                        <p className="text-white/75 mt-2">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {/* BACK */}
                    <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-[#111] to-[#1d1d1d] p-8 flex flex-col justify-between">
                      <div>
                        <div className="h-20 w-20 rounded-2xl bg-primary/15 grid place-items-center">
                          <Dumbbell className="h-10 w-10 text-primary" />
                        </div>

                        <h3 className="mt-8 text-3xl font-bold">
                          {member.name}
                        </h3>

                        <p className="text-primary mt-2 font-medium">
                          {member.role}
                        </p>

                        <p className="mt-6 text-white/70 leading-relaxed">
                          {member.desc}
                        </p>
                      </div>

                      <div className="pt-8 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-white/40 uppercase tracking-widest">
                              Experience
                            </p>

                            <p className="font-semibold mt-1">
                              10+ Years
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-white/40 uppercase tracking-widest">
                              Specialty
                            </p>

                            <p className="font-semibold mt-1">
                              Elite Performance
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 bg-black/40 border-y border-white/10">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">
              ATHLETE REVIEWS
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              Trusted by serious athletes
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <ScrollReveal key={review.name} delay={i * 80}>
                <div className="bg-card border border-white/10 rounded-2xl p-7 hover-lift">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>

                  <p className="text-white/80 leading-relaxed">
                    "{review.text}"
                  </p>

                  <div className="mt-6">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-primary">
                      {review.role}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.25),transparent_60%)]" />

        <ScrollReveal className="container relative text-center max-w-3xl">
          <p className="text-xs tracking-[0.4em] text-primary mb-4">
            READY TO LEVEL UP?
          </p>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Fuel your performance with supplements built for results.
          </h2>

          <p className="mt-6 text-white/70 text-lg">
            Transparent formulas. Clinical doses. Zero compromises.
          </p>

          <Button
            asChild
            size="lg"
            className="mt-10 bg-primary hover:bg-primary/90 h-12 px-10 shadow-glow"
          >
            <Link to="/products">
              Explore Products
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default About;

