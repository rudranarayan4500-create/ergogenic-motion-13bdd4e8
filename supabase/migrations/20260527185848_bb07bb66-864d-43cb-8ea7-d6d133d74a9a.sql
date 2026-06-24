-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "admins view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  phone text,
  blocked boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "admins view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update all profiles" ON public.profiles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Admin settings (single row)
CREATE TABLE public.admin_settings (
  id int PRIMARY KEY DEFAULT 1,
  admin_email text,
  secret_code text NOT NULL DEFAULT 'ERGO-ADMIN-2026',
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT admin_settings_singleton CHECK (id = 1)
);
GRANT SELECT, UPDATE ON public.admin_settings TO authenticated;
GRANT ALL ON public.admin_settings TO service_role;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read settings" ON public.admin_settings FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update settings" ON public.admin_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
INSERT INTO public.admin_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

-- Verify admin secret
CREATE OR REPLACE FUNCTION public.verify_admin_secret(_code text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_settings WHERE id = 1 AND secret_code = _code)
$$;
GRANT EXECUTE ON FUNCTION public.verify_admin_secret(text) TO authenticated;

-- Claim-admin function
CREATE OR REPLACE FUNCTION public.claim_admin(_code text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _ok boolean;
  _email text;
  _caller_email text;
BEGIN
  IF auth.uid() IS NULL THEN RETURN false; END IF;
  SELECT (secret_code = _code), admin_email INTO _ok, _email FROM public.admin_settings WHERE id = 1;
  IF NOT _ok THEN RETURN false; END IF;
  SELECT email INTO _caller_email FROM auth.users WHERE id = auth.uid();
  IF _email IS NOT NULL AND lower(_email) <> lower(_caller_email) THEN RETURN false; END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (auth.uid(), 'admin') ON CONFLICT DO NOTHING;
  IF _email IS NULL THEN
    UPDATE public.admin_settings SET admin_email = _caller_email WHERE id = 1;
  END IF;
  RETURN true;
END $$;
GRANT EXECUTE ON FUNCTION public.claim_admin(text) TO authenticated;

-- Auto-create profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', NEW.phone, '')
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  RETURN NEW;
END $$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Products
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  tagline text,
  price numeric NOT NULL,
  mrp numeric,
  category text NOT NULL,
  image text,
  description text,
  benefits text[] DEFAULT '{}',
  how_to_use text,
  ingredients text[] DEFAULT '{}',
  rating numeric DEFAULT 4.8,
  reviews int DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone reads products" ON public.products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins write products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update products" ON public.products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete products" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Orders (Added seen_by_admin)
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  total numeric NOT NULL,
  status text NOT NULL DEFAULT 'created',
  seen_by_admin boolean DEFAULT false, 
  razorpay_order_id text,
  razorpay_payment_id text,
  shipping jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users view own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "users insert own orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "admins view all orders" ON public.orders FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update orders" ON public.orders FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Order Items
CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_slug text,
  name text NOT NULL,
  qty int NOT NULL,
  price numeric NOT NULL
);
GRANT SELECT, INSERT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users view own order items" ON public.order_items FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid())
);
CREATE POLICY "users insert own order items" ON public.order_items FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid())
);
CREATE POLICY "admins view all order items" ON public.order_items FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Contact messages
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone inserts message" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Reviews (Missing Table Added)
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_slug text REFERENCES public.products(slug) ON DELETE CASCADE,
  rating int NOT NULL,
  title text,
  body text,
  approved boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.reviews TO authenticated;
GRANT SELECT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone reads approved reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (approved = true);
CREATE POLICY "admins manage reviews" ON public.reviews FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Seed catalog
INSERT INTO public.products (slug,name,tagline,price,mrp,category,description,benefits,how_to_use,ingredients,rating,reviews) VALUES
('super-whey','Super Whey','27g premium whey protein blend',4499,5499,'Muscle','Cold-processed, instantized whey blend with 27g protein per scoop.',ARRAY['27g protein','6.2g BCAA','No amino spiking'],'1 scoop in 200ml water post workout.',ARRAY['Whey Isolate','Whey Concentrate','Cocoa'],4.9,2841),
('plasma-mass','Plasma Mass','High-calorie advanced gainer formula',3899,4699,'Muscle','Clean mass gainer with 60g complex carbs + 30g protein.',ARRAY['30g protein','60g carbs','MCT oil'],'2 scoops in 300ml milk.',ARRAY['Maltodextrin','Whey','Oat Flour'],4.8,1620),
('lean-shot','Lean Shot','Ultra potent fat burning formula',1899,2399,'Performance','Research-backed thermogenic with L-Carnitine + Green Tea.',ARRAY['Fat metabolism','Focus','Clean energy'],'1 scoop 20 min pre training.',ARRAY['L-Carnitine','Green Tea','Caffeine'],4.7,980),
('myogenetix-whey','Myogenetix Concentrate','Daily whey protein concentrate',2499,2999,'Essentials','Everyday whey concentrate, 24g protein per scoop.',ARRAY['24g protein','Smooth mix'],'1 scoop anytime.',ARRAY['Whey Concentrate','Cocoa'],4.8,1340),
('creatine-mono','Pure Creatine','Micronized creatine monohydrate',1299,1599,'Performance','100% pure micronized creatine.',ARRAY['5g per scoop','Micronized'],'1 scoop daily.',ARRAY['Creatine Monohydrate'],4.9,1750),
('bcaa-recover','BCAA Recover','Intra-workout amino fuel',1599,1999,'Recovery','7g BCAAs in 2:1:1 ratio + electrolytes.',ARRAY['7g BCAA','Electrolytes'],'1 scoop intra-workout.',ARRAY['Leucine','Isoleucine','Valine'],4.7,870),
('glutamine','Glutamine X','Pure L-Glutamine for recovery',1399,1799,'Recovery','5g L-Glutamine per serving.',ARRAY['Recovery','Immunity'],'1 scoop post workout.',ARRAY['L-Glutamine'],4.8,540),
('multi-vit','Daily Multi','Athlete multivitamin & minerals',899,1199,'Essentials','23 essential vitamins & minerals.',ARRAY['23 vitamins','Athlete formula'],'1 tablet daily.',ARRAY['Vitamins A-K','Zinc','Magnesium'],4.6,410);