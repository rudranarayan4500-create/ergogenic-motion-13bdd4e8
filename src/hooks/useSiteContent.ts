import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type HeroContent = {
  eyebrow?: string;
  title: string;
  highlight: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export type SectionContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export const DEFAULTS = {
  hero: {
    eyebrow: "",
    title: "FUEL",
    highlight: "EVOLVED",
    subtitle:
      "Performance-focused nutrition engineered for your fitness goals. Transparently dosed, made for evolution.",
    ctaLabel: "Shop Now",
    ctaHref: "/products",
  } as HeroContent,
  section_products: {
    eyebrow: "BUILD YOUR STACK",
    title: "Engineered for every goal",
    subtitle: "Every product is formulated for real results. Explore our collection.",
  } as SectionContent,
  section_ingredients: {
    eyebrow: "TECH ARSENAL",
    title: "The science behind every scoop",
    subtitle: "A closer look at the key ingredients powering our formulations.",
  } as SectionContent,
};

export type SiteContentMap = typeof DEFAULTS;

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContentMap>(DEFAULTS);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("site_content").select("key,value");
      if (cancelled || !data) return;
      const next: any = { ...DEFAULTS };
      for (const row of data) {
        if (row.key in DEFAULTS) {
          next[row.key] = { ...(DEFAULTS as any)[row.key], ...(row.value as any) };
        }
      }
      setContent(next);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return content;
};