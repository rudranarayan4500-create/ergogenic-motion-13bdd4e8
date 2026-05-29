
-- Tighten contact_messages: no more WITH CHECK (true)
DROP POLICY IF EXISTS "anyone inserts message" ON public.contact_messages;
CREATE POLICY "anyone inserts valid message" ON public.contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(btrim(name)) BETWEEN 1 AND 120
    AND length(btrim(email)) BETWEEN 3 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(message)) BETWEEN 1 AND 5000
  );

-- Restrict trigger-only SECURITY DEFINER helpers
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
