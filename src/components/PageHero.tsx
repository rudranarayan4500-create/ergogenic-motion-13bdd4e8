import { useEffect } from "react";
import { Logo } from "./Logo";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export const PageHero = ({ eyebrow, title, subtitle }: PageHeroProps) => {
  // Forces the window to scroll smoothly/instantly to the top when this page section mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // "instant" ensures no jarring scrolling animation while the page transitions
    });
  }, [title]); // Triggered whenever the title changes (meaning you went to a new page)

  return (
    <section className="relative overflow-hidden bg-muted/30 border-b border-border">
      <div className="absolute inset-0 bg-grid-light opacity-60" />
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
          <p className="mt-5 max-w-2xl mx-auto text-muted-foreground text-base md:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
};