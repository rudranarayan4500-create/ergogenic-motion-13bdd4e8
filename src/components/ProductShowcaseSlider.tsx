"use client";

import Image from "next/image";
import Link from "next/link";

type Slide = {
  productId: string;
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  bg: string;
  text: string;
  accent: string;
};

const slides: Slide[] = [
  {
    productId: "ergo-aminoshot",
    image:
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos/7d6b3f9d-61aa-4dd2-baee-3d15bbd2327f.png",
    eyebrow: "300G INTRA-WORKOUT AMINO",
    title: "Built For Lean Muscle",
    subtitle:
      "Juicy Fruit Bubblegum • 300g intra-workout amino for endurance, hydration, and recovery.",
    cta: "Shop AminoShot",
    href: "https://ergogenicprotin.vercel.app/products/ergo-aminoshot",
    bg: "bg-gradient-to-br from-[#eaf1ff] via-[#f6f9ff] to-white",
    text: "text-[#0a1b3d]",
    accent: "bg-[#1d4ed8] hover:bg-[#1e40af] text-white",
  },

  {
    productId: "super-whey",
    image:
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos/WhatsApp%20Image%202026-06-05%20at%203.24.31%20PM.jpeg",
    eyebrow: "HIGH VOLTAGE PERFORMANCE",
    title: "Train At Full Throttle",
    subtitle:
      "Premium cold-processed whey protein engineered for rapid absorption and clean muscle growth.",
    cta: "Shop Super Whey",
    href: "https://ergogenicprotin.vercel.app/products/super-whey",
    bg: "bg-gradient-to-br from-[#0b1220] via-[#0d1a33] to-[#0a0f1f]",
    text: "text-white",
    accent: "bg-[#1d4ed8] hover:bg-[#1e40af] text-white",
  },

  {
    productId: "ergo-lean-shot",
    image:
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos/fa87092f-ed7a-4f2a-a943-2d5acf883b09.png",
    eyebrow: "THERMOGENIC EDGE",
    title: "Burn Cleaner. Move Sharper.",
    subtitle:
      "Lean Shot supports fat metabolism with smooth energy, sharper focus, and clean performance.",
    cta: "Shop Lean Shot",
    href: "https://ergogenicprotin.vercel.app/products/ergo-lean-shot",
    bg: "bg-gradient-to-br from-white via-[#f1f5ff] to-[#dbe7ff]",
    text: "text-[#0a1b3d]",
    accent: "bg-[#1d4ed8] hover:bg-[#1e40af] text-white",
  },
];

export default function HeroSlider() {
  return (
    <section className="w-full py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
        {slides.map((slide) => (
          <div
            key={slide.productId}
            className={`relative overflow-hidden rounded-3xl border border-white/10 p-8 shadow-2xl ${slide.bg}`}
          >
            {/* Content */}
            <div className={`relative z-10 ${slide.text}`}>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] opacity-70">
                {slide.eyebrow}
              </p>

              <h2 className="max-w-md text-4xl font-black leading-tight md:text-5xl">
                {slide.title}
              </h2>

              <p className="mt-4 max-w-md text-base leading-7 opacity-80">
                {slide.subtitle}
              </p>

              <Link href={slide.href}>
                <button
                  className={`mt-8 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${slide.accent}`}
                >
                  {slide.cta}
                </button>
              </Link>
            </div>

            {/* Product Image */}
            <div className="relative mt-10 flex items-center justify-center">
              <Image
                src={slide.image}
                alt={slide.title}
                width={500}
                height={500}
                className="h-auto w-full max-w-sm object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                priority
              />
            </div>

            {/* Glow Effect */}
            <div className="absolute -bottom-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
          </div>
        ))}
      </div>
    </section>
  );
}