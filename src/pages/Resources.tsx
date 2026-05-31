import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Search,
  TrendingUp,
  Flame,
  Dumbbell,
  Brain,
  HeartPulse,
  ChevronRight,
  Star,
  PlayCircle,
  Bookmark,
  Share2,
  Eye,
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
import { Input } from "@/components/ui/input";

import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

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

const featuredArticles: Article[] = [
  {
    id: "1",
    slug: "muscle-growth-blueprint",
    title: "The Ultimate Muscle Growth Blueprint",
    category: "Muscle Building",
    tags: ["hypertrophy", "whey", "training"],
    read_time: "12 min read",
    cover_url:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1400&auto=format&fit=crop",
    excerpt:
      "Evidence-based hypertrophy training, recovery optimization and supplementation strategies.",
    body:
      "Building muscle requires progressive overload, sufficient protein intake and recovery consistency.\n\nAim for 10–20 weekly hard sets per muscle group.\n\nSleep quality directly impacts testosterone, recovery and performance.\n\nWhey isolate post-workout accelerates muscle protein synthesis and supports lean tissue growth.",
  },
  {
    id: "2",
    slug: "preworkout-science",
    title: "Science-Based Pre Workout Stack",
    category: "Performance",
    tags: ["caffeine", "pump", "energy"],
    read_time: "8 min read",
    cover_url:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1400&auto=format&fit=crop",
    excerpt:
      "Learn how elite athletes structure their pre-training supplementation for maximum output.",
    body:
      "Caffeine remains the most researched ergogenic aid.\n\nL-Citrulline enhances nitric oxide and blood flow.\n\nBeta-Alanine improves high intensity performance by buffering acidity.",
  },
];

const latestArticles: Article[] = [
  {
    id: "3",
    slug: "protein-timing",
    title: "How To Time Your Protein Intake",
    category: "Nutrition",
    tags: ["protein"],
    read_time: "6 min read",
    cover_url:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1400&auto=format&fit=crop",
    excerpt:
      "Optimize recovery and muscle growth through strategic protein timing.",
    body:
      "Protein timing isn't magic — but distribution matters.\n\nConsume 25–40g high-quality protein across 3–5 meals daily.",
  },
  {
    id: "4",
    slug: "fat-loss-guide",
    title: "Athlete Fat Loss Without Losing Strength",
    category: "Fat Loss",
    tags: ["cutting", "diet"],
    read_time: "9 min read",
    cover_url:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1400&auto=format&fit=crop",
    excerpt:
      "Maintain strength, preserve muscle and improve conditioning during a cut.",
    body:
      "Moderate calorie deficits outperform aggressive dieting.\n\nKeep protein high and resistance training intense.",
  },
  {
    id: "5",
    slug: "sleep-recovery",
    title: "Recovery Starts With Better Sleep",
    category: "Recovery",
    tags: ["sleep", "recovery"],
    read_time: "7 min read",
    cover_url:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1400&auto=format&fit=crop",
    excerpt:
      "Poor sleep sabotages recovery, hormones and performance adaptation.",
    body:
      "Aim for 7–9 hours quality sleep.\n\nRecovery is where adaptation actually happens.",
  },
];

const quickTopics = [
  {
    title: "Muscle Gain",
    icon: Dumbbell,
  },
  {
    title: "Fat Loss",
    icon: Flame,
  },
  {
    title: "Recovery",
    icon: HeartPulse,
  },
  {
    title: "Performance",
    icon: TrendingUp,
  },
  {
    title: "Mindset",
    icon: Brain,
  },
];

const stats = [
  { label: "Articles Published", value: "150+" },
  { label: "Monthly Readers", value: "85K+" },
  { label: "Research Sources", value: "300+" },
  { label: "Expert Contributors", value: "18" },
];

const Resources = () => {
  const [list, setList] = useState<Article[]>([]);
  const [open, setOpen] = useState<Article | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data?.length) {
          setList(data as Article[]);
        } else {
          setList([...featuredArticles, ...latestArticles]);
        }
      });
  }, []);

  const filtered = useMemo(() => {
    return list.filter((a) => {
      const q = search.toLowerCase();

      return (
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [list, search]);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:70px_70px]" />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] bg-primary/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] bg-red-500/10 blur-[100px] rounded-full" />
      </div>

      {/* HERO */}
      <PageHero
        eyebrow="Knowledge Hub"
        title="Elite Performance Resources"
        subtitle="Science-backed education for athletes, lifters and high performers."
      />

      {/* SEARCH */}
      <section className="relative z-10 -mt-10 pb-10">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-black/40 border border-white/10 backdrop-blur-xl rounded-3xl p-4 md:p-5 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />

                <Input
                  placeholder="Search articles, topics, supplements..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-11 bg-white/5 border-white/10 h-12 rounded-2xl text-white"
                />
              </div>

              <Button className="h-12 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-black font-bold">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK TOPICS */}
      <section className="relative z-10 py-10">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {quickTopics.map((topic, i) => (
              <ScrollReveal key={topic.title} delay={i * 60}>
                <button className="group flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-primary hover:text-black transition-all duration-300 hover:scale-105">
                  <topic.icon className="h-4 w-4" />
                  <span className="text-sm font-semibold">
                    {topic.title}
                  </span>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 py-16">
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 80}>
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center">
                <div className="text-4xl font-black text-primary">
                  {s.value}
                </div>

                <p className="mt-3 text-sm uppercase tracking-widest text-white/50">
                  {s.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="relative z-10 py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-primary tracking-[0.3em] uppercase text-xs mb-3">
                Featured Reads
              </p>

              <h2 className="text-4xl md:text-5xl font-black">
                Most Popular Articles
              </h2>
            </div>

            <Button
              variant="outline"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              View All
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredArticles.map((a, i) => (
              <ScrollReveal key={a.id} delay={i * 100}>
                <article
                  onClick={() => setOpen(a)}
                  className="group cursor-pointer relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/50 backdrop-blur-xl hover:border-primary/30 transition-all duration-500"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={a.cover_url || ""}
                      alt={a.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {a.tags?.map((t) => (
                        <Badge
                          key={t}
                          className="bg-primary/15 text-primary border border-primary/20"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="text-2xl font-black group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>

                    <p className="mt-4 text-white/65 leading-relaxed">
                      {a.excerpt}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-white/40 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {a.read_time}
                        </span>

                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          12.4K
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-primary font-semibold">
                        Read Article
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="relative z-10 py-20">
        <div className="container">
          <div className="mb-10">
            <p className="text-primary tracking-[0.3em] uppercase text-xs mb-3">
              Latest Articles
            </p>

            <h2 className="text-4xl md:text-5xl font-black">
              Fresh Knowledge Drops
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((a, i) => (
              <ScrollReveal key={a.id} delay={(i % 3) * 70}>
                <article
                  onClick={() => setOpen(a)}
                  className={cn(
                    "group cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_20px_80px_rgba(255,0,0,0.12)]"
                  )}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={a.cover_url || ""}
                      alt={a.title}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/60 text-white backdrop-blur-md border border-white/10">
                        {a.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <Clock className="h-3 w-3" />
                      {a.read_time}
                    </div>

                    <h3 className="mt-3 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {a.excerpt}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {a.tags?.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-white/5 border border-white/10 text-white/70"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-white/40">
                        <button className="hover:text-primary transition-colors">
                          <Bookmark className="h-4 w-4" />
                        </button>

                        <button className="hover:text-primary transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                        Read More
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative z-10 py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-primary/20 via-black to-black p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_30%)]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="text-primary uppercase tracking-[0.3em] text-xs mb-4">
                Weekly Performance Letter
              </p>

              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Get elite-level fitness insights every week
              </h2>

              <p className="mt-5 text-white/65 text-lg">
                Training science, supplement breakdowns, recovery strategies
                and athlete protocols directly to your inbox.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Input
                  placeholder="Enter your email"
                  className="h-14 bg-white/10 border-white/10 rounded-2xl"
                />

                <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-black font-black">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE MODAL */}
      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="bg-[#0a0a0a] border border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem]">
          {open && (
            <>
              <div className="aspect-[16/8] overflow-hidden rounded-2xl">
                <img
                  src={open.cover_url || ""}
                  alt={open.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <DialogHeader className="pt-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {open.tags?.map((t) => (
                    <Badge
                      key={t}
                      className="bg-primary/15 text-primary border border-primary/20"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                <DialogTitle className="text-3xl md:text-4xl font-black leading-tight">
                  {open.title}
                </DialogTitle>

                <DialogDescription className="flex items-center gap-5 text-white/50 pt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {open.read_time}
                  </span>

                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    18.2K Reads
                  </span>
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6 text-white/80 leading-8 text-[15px]">
                {open.body
                  .split(/\n+/)
                  .filter(Boolean)
                  .map((p, i) => (
                    <p
                      key={i}
                      className="animate-fade-in"
                      style={{
                        animationDelay: `${i * 80}ms`,
                      }}
                    >
                      {p}
                    </p>
                  ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-black font-bold">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Watch Related Video
                </Button>

                <Button
                  variant="outline"
                  className="border-white/10 bg-white/5 hover:bg-white/10"
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save Article
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;