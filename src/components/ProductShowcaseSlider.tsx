import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Slide = {
  productId: string;
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  bg: string;
  text: string;
  accent: string;
};

const slides: Slide[] = [
  {
    productId: "super-whey",
    image:
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-05 at 3.24.31 PM.jpeg",
    eyebrow: "PREMIUM WHEY",
    title: "Built For Lean Muscle",
    subtitle: "27g of clinically dosed, cold-processed whey per scoop. Zero amino spiking.",
    cta: "Shop Super Whey",
    bg: "bg-gradient-to-br from-[#eaf1ff] via-[#f6f9ff] to-white",
    text: "text-[#0a1b3d]",
    accent: "bg-[#1d4ed8] hover:bg-[#1e40af] text-white",
  },
  {
    productId: "ergo-viper-3",
    image:
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-09 142302.png",
    eyebrow: "HIGH VOLTAGE",
    title: "Train At Full Throttle",
    subtitle: "Viper-3 unleashes explosive energy, razor focus and skin-splitting pumps.",
    cta: "Shop Viper-3",
    bg: "bg-gradient-to-br from-[#0b1220] via-[#0d1a33] to-[#0a0f1f]",
    text: "text-white",
    accent: "!bg-[#1d4ed8] hover:!bg-[#1e40af] !text-white",
  },
  {
    productId: "ergo-lean-shot",
    image:
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-05 160514-2.png",
    eyebrow: "THERMOGENIC EDGE",
    title: "Burn Cleaner. Move Sharper.",
    subtitle: "Lean Shot fuels fat metabolism with sustained energy and crystal focus.",
    cta: "Shop Lean Shot",
    bg: "bg-gradient-to-br from-white via-[#f1f5ff] to-[#dbe7ff]",
    text: "text-[#0a1b3d]",
    accent: "bg-[#1d4ed8] hover:bg-[#1e40af] text-white",
  },
];

export const ProductShowcaseSlider = () => {
  const [i, setI] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % total), 6000);
    return () => clearInterval(id);
  }, [total]);

  const go = (n: number) => setI((n + total) % total);

  return (
    <section className="relative w-full overflow-hidden border-y border-border">
      <div className="relative h-[78vh] min-h-[560px] max-h-[820px]">
        {slides.map((s, idx) => (
          <Link
            to={`/products/${s.productId}`}
            key={s.productId}
            className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
              idx === i ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            } ${s.bg}`}
            aria-hidden={idx !== i}
          >
            <div className="container h-full grid md:grid-cols-2 items-center gap-8 py-12">
              <div className={`${s.text} order-2 md:order-1 max-w-xl`}>
                <p className="text-[11px] md:text-xs tracking-[0.5em] opacity-80 mb-4 animate-fade-in">
                  {s.eyebrow}
                </p>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight animate-fade-in">
                  {s.title}
                </h2>
                <p className="mt-5 text-base md:text-lg opacity-85 max-w-md animate-fade-in">
                  {s.subtitle}
                </p>
                <div className="mt-8 animate-fade-in">
                  <Button asChild size="lg" className={`${s.accent} h-12 px-8 text-base`}>
                    <span>
                      {s.cta} <ChevronRight className="ml-1 h-4 w-4 inline" />
                    </span>
                  </Button>
                </div>
              </div>
              <div className="order-1 md:order-2 relative h-[40vh] md:h-full flex items-center justify-center">
                <img
                  src={s.image}
                  alt={s.title}
                  className="max-h-full max-w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)] transition-transform duration-[1400ms] ease-out scale-100 hover:scale-[1.03]"
                  loading="eager"
                />
              </div>
            </div>
          </Link>
        ))}

        {/* Controls */}
        <button
          aria-label="Previous slide"
          onClick={() => go(i - 1)}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-background/70 hover:bg-background border border-border backdrop-blur grid place-items-center text-foreground transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => go(i + 1)}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-background/70 hover:bg-background border border-border backdrop-blur grid place-items-center text-foreground transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => go(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-10 bg-primary" : "w-5 bg-foreground/30 hover:bg-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSlider;