
DROP POLICY IF EXISTS "anyone reads review photos" ON storage.objects;
CREATE POLICY "admins list review photos" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'review-photos' AND has_role(auth.uid(), 'admin'::app_role));
