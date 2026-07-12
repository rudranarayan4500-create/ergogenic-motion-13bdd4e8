
-- 1. Remove exposed default from admin_settings.secret_code (schema no longer leaks the value)
ALTER TABLE public.admin_settings ALTER COLUMN secret_code DROP DEFAULT;

-- 2. Revoke EXECUTE on SECURITY DEFINER helper functions that are not called from client code
REVOKE EXECUTE ON FUNCTION public.claim_admin(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.verify_admin_secret(text) FROM PUBLIC, anon, authenticated;
-- has_role is retained: it is required by RLS policies and must remain executable

-- 3. Admin-only policies for the private product-imgs bucket
DROP POLICY IF EXISTS "product-imgs admin select" ON storage.objects;
DROP POLICY IF EXISTS "product-imgs admin insert" ON storage.objects;
DROP POLICY IF EXISTS "product-imgs admin update" ON storage.objects;
DROP POLICY IF EXISTS "product-imgs admin delete" ON storage.objects;

CREATE POLICY "product-imgs admin select" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'product-imgs' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "product-imgs admin insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-imgs' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "product-imgs admin update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'product-imgs' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'product-imgs' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "product-imgs admin delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'product-imgs' AND public.has_role(auth.uid(), 'admin'));

-- 4. Owner-scoped SELECT on review-photos so users can list their own uploads
-- (bucket stays public so existing direct URLs continue to render; paths are UUID-based).
DROP POLICY IF EXISTS "users list own review photos" ON storage.objects;
CREATE POLICY "users list own review photos" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'review-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
