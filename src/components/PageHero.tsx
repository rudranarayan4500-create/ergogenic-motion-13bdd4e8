import { Logo } from "./Logo";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export const PageHero = ({ eyebrow, title, subtitle }: PageHeroProps) => (
  <section className="relative overflow-hidden bg-[hsl(var(--ink))] border-b border-white/10">
    <div className="absolute inset-0 bg-grid-dark opacity-60" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_60%)]" />
    <div className="container relative py-20 md:py-28 text-center">
      <div className="flex justify-center mb-6 opacity-80">
        <Logo className="h-7" />
      </div>
      {eyebrow && (
        <p className="text-xs tracking-[0.4em] text-primary uppercase mb-4">{eyebrow}</p>
      )}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
      {subtitle && (
        <p className="mt-5 max-w-2xl mx-auto text-white/70 text-base md:text-lg">{subtitle}</p>
      )}
    </div>
  </section>
);