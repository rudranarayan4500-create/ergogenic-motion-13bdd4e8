
-- Reviews
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_slug text NOT NULL,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text,
  body text NOT NULL,
  approved boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone reads approved reviews" ON public.reviews FOR SELECT USING (approved = true OR auth.uid() = user_id OR has_role(auth.uid(),'admin'));
CREATE POLICY "verified buyers insert reviews" ON public.reviews FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM public.orders o
    JOIN public.order_items oi ON oi.order_id = o.id
    WHERE o.user_id = auth.uid() AND o.status IN ('paid','shipped','delivered') AND oi.product_slug = reviews.product_slug
  )
);
CREATE POLICY "users delete own reviews" ON public.reviews FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "admins manage reviews" ON public.reviews FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete reviews" ON public.reviews FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

-- Media library metadata
CREATE TABLE public.media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  path text NOT NULL,
  kind text NOT NULL DEFAULT 'image',
  size_bytes bigint,
  uploaded_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media_assets TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_assets TO authenticated;
GRANT ALL ON public.media_assets TO service_role;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone reads media" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "admins write media" ON public.media_assets FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete media" ON public.media_assets FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "media public read" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "admins upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND has_role(auth.uid(),'admin'));

-- Order admin notifications
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS seen_by_admin boolean NOT NULL DEFAULT false;
