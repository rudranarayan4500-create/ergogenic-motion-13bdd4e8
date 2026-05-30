
-- 1. review photo column
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS image_url text;

-- 2. callbacks table
CREATE TABLE IF NOT EXISTS public.callbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  preferred_time text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.callbacks TO anon, authenticated;
GRANT SELECT, DELETE ON public.callbacks TO authenticated;
GRANT ALL ON public.callbacks TO service_role;
ALTER TABLE public.callbacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone inserts callback" ON public.callbacks FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 120
  AND length(btrim(email)) BETWEEN 3 AND 200
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(phone)) BETWEEN 4 AND 30
);
CREATE POLICY "admins read callbacks" ON public.callbacks FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "admins delete callbacks" ON public.callbacks FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. review photos bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('review-photos', 'review-photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "anyone reads review photos" ON storage.objects FOR SELECT
USING (bucket_id = 'review-photos');
CREATE POLICY "auth users upload review photos" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'review-photos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "users delete own review photos" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'review-photos' AND (storage.foldername(name))[1] = auth.uid()::text);
