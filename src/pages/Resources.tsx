import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Calendar,
  User2,
  Sparkles,
} from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { supabase } from "@/integrations/supabase/client";

type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[] | null;
  read_time: string | null;
  excerpt: string | null;
  cover_url: string | null;
  body: string;
};

const fallback: Article[] = [
  {
    id: "f1",
    slug: "protein-timing",
    title: "How to Time Your Protein for Maximum Muscle Growth",
    category: "Supplement Usage",
    tags: ["protein", "muscle", "nutrition"],
    read_time: "6 min read",
    cover_url:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1400&auto=format&fit=crop",
    excerpt:
      "Learn how elite athletes structure protein intake for recovery, strength and lean muscle gain.",
    body:
      "Protein timing matters less than total daily intake, but it still plays a powerful role in recovery and muscle growth.\n\nAim for 1.6–2.2 g/kg bodyweight daily spread across 3–5 meals.\n\nPost-workout protein enhances muscle protein synthesis dramatically, especially when paired with carbohydrates.\n\nBefore sleep, slow-digesting proteins like casein sustain amino acid delivery overnight and improve recovery.",
  },

  {
    id: "f2",
    slug: "pre-workout-stack",
    title: "Building the Perfect Pre-Workout Stack",
    category: "Performance",
    tags: ["preworkout", "energy", "training"],
    read_time: "8 min read",
    cover_url:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1400&auto=format&fit=crop",
    excerpt:
      "The science-backed ingredients that improve pumps, strength, endurance and training intensity.",
    body:
      "Caffeine remains the most validated ergogenic aid in sports science.\n\nL-Citrulline improves nitric oxide production and blood flow while beta-alanine enhances endurance.\n\nAvoid underdosed proprietary blends and focus on clinically validated dosages.",
  },

  {
    id: "f3",
    slug: "macro-guide",
    title: "Macros Made Simple for Athletes",
    category: "Nutrition",
    tags: ["macros", "diet", "fatloss"],
    read_time: "10 min read",
    cover_url:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1400&auto=format&fit=crop",
    excerpt:
      "An easy breakdown of proteins, carbs and fats for cutting, bulking and performance.",
    body:
      "Protein supports muscle repair.\n\nCarbohydrates fuel training intensity.\n\nHealthy fats support hormones and recovery.\n\nBuild your nutrition around performance instead of trends.",
  },
];

const Resources = () => {
  const [list, setList] = useState<Article[]>([]);
  const [open, setOpen] = useState<Article | null>(null);

  useEffect(() => {
    supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setList(data?.length ? (data as Article[]) : fallback);
      });
  }, []);

  const featured = list[0];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* GRID BG */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[140px]" />

      <PageHero
        eyebrow="Resources"
        title="Performance Knowledge Hub"
        subtitle="Elite-level science, supplementation and training education built for serious athletes."
      />

      {/* FEATURED ARTICLE */}
      {featured && (
        <section className="relative z-10 container py-10">
          <ScrollReveal>
            <div
              onClick={() => setOpen(featured)}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />

              <img
                src={featured.cover_url || ""}
                alt={featured.title}
                className="h-[520px] w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                <Badge className="w-fit bg-primary text-black font-bold">
                  Featured Article
                </Badge>

                <h2 className="mt-5 text-4xl md:text-6xl font-black max-w-3xl leading-tight">
                  {featured.title}
                </h2>

                <p className="mt-4 text-white/75 max-w-2xl text-lg">
                  {featured.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/60">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {featured.read_time}
                  </span>

                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Updated Weekly
                  </span>

                  <span className="flex items-center gap-2">
                    <User2 className="h-4 w-4" />
                    Ergogenic Research Team
                  </span>
                </div>

                <Button className="mt-8 w-fit bg-primary hover:bg-primary/90 text-black font-bold">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ARTICLE GRID */}
      <section className="relative z-10 py-16">
        <div className="container">

          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-primary uppercase tracking-[0.3em] text-xs mb-2">
                Latest Research
              </p>

              <h2 className="text-3xl md:text-5xl font-black">
                Science-backed articles
              </h2>
            </div>

            <div className="hidden md:flex items-center gap-2 text-sm text-white/50">
              <Sparkles className="h-4 w-4 text-primary" />
              Updated continuously
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

            {list.map((a, i) => (
              <ScrollReveal key={a.id} delay={(i % 3) * 100}>

                <article
                  onClick={() => setOpen(a)}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111111]/80 backdrop-blur-xl hover:border-primary/30 transition-all duration-500 cursor-pointer hover:-translate-y-2"
                >

                  <div className="relative overflow-hidden">

                    <img
                      src={a.cover_url || ""}
                      alt={a.title}
                      className="h-[240px] w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <Badge className="absolute top-4 left-4 bg-primary text-black">
                      {a.category}
                    </Badge>
                  </div>

                  <div className="p-6">

                    <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>

                    <p className="mt-3 text-white/65 text-sm leading-relaxed">
                      {a.excerpt}
                    </p>

                    {!!a.tags?.length && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {a.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-white/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">

                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <Clock className="h-3 w-3" />
                        {a.read_time}
                      </div>

                      <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </div>

                    </div>
                  </div>
                </article>

              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLE MODAL */}
      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>

        <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0b0b0b] border border-white/10 text-white p-0">

          {open && (
            <>

              <div className="relative">

                <img
                  src={open.cover_url || ""}
                  alt={open.title}
                  className="h-[340px] w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 p-8">

                  <Badge className="bg-primary text-black font-bold">
                    {open.category}
                  </Badge>

                  <h1 className="mt-4 text-4xl md:text-5xl font-black max-w-3xl leading-tight">
                    {open.title}
                  </h1>

                  <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-white/70">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {open.read_time}
                    </span>

                    <span className="flex items-center gap-2">
                      <User2 className="h-4 w-4" />
                      Ergogenic Editorial
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-10">

                <div className="prose prose-invert prose-lg max-w-none">

                  {open.body
                    .split(/\n+/)
                    .filter(Boolean)
                    .map((p, i) => (
                      <p
                        key={i}
                        className="text-white/80 leading-8 text-[17px] mb-6"
                      >
                        {p}
                      </p>
                    ))}

                </div>

              </div>

            </>
          )}

        </DialogContent>

      </Dialog>
    </div>
  );
};

export default Resources;