CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content"
  ON public.site_content FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert site content"
  ON public.site_content FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site content"
  ON public.site_content FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site content"
  ON public.site_content FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER site_content_touch_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.site_content (key, value) VALUES
  ('hero', '{"eyebrow":"","title":"FUEL","highlight":"EVOLVED","subtitle":"Performance-focused nutrition engineered for your fitness goals. Transparently dosed, made for evolution.","ctaLabel":"Shop Now","ctaHref":"/products"}'::jsonb),
  ('section_products', '{"eyebrow":"BUILD YOUR STACK","title":"Engineered for every goal","subtitle":"Every product is formulated for real results. Explore our collection."}'::jsonb),
  ('section_ingredients', '{"eyebrow":"TECH ARSENAL","title":"The science behind every scoop","subtitle":"A closer look at the key ingredients powering our formulations."}'::jsonb)
ON CONFLICT (key) DO NOTHING;