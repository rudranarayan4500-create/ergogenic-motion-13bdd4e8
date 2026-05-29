
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.verify_admin_secret(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.claim_admin(text) FROM PUBLIC, anon;
