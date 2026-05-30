import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CheckCircle2, ChevronRight, FlaskConical, Minus, Plus, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { toast } from "@/hooks/use-toast";
import { ProductReviews } from "@/components/ProductReviews";
import { ProductGallery, type MediaItem } from "@/components/ProductGallery";
import { supabase } from "@/integrations/supabase/client";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [extraMedia, setExtraMedia] = useState<MediaItem[]>([]);
  useEffect(() => {
    if (!id) return;
    supabase.from("products").select("media").eq("slug", id).maybeSingle()
      .then(({ data }) => {
        const m = (data?.media as any[]) ?? [];
        setExtraMedia(m.filter((x) => x?.url).map((x) => ({ url: x.url, kind: x.kind })));
      });
  }, [id]);
  if (!product) return <Navigate to="/products" replace />;
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);
  const gallery: MediaItem[] = extraMedia.length
    ? extraMedia
    : [{ url: product.image, kind: "image" }];

  const add = () => toast({ title: "Added to cart", description: `${qty} × ${product.name}` });

  return (
    <>
      <section className="py-12 md:py-16 border-b border-white/10">
        <div className="container">
          <nav className="text-xs text-white/50 mb-6 flex items-center gap-1">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/products" className="hover:text-white">Products</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{product.name}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12">
            <ProductGallery items={gallery} alt={product.name} />
            <div>
              <p className="text-xs text-primary tracking-widest uppercase">{product.category}</p>
              <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">{product.name}</h1>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-white/60">{product.rating} · {product.reviews} reviews</span>
              </div>
              <p className="mt-5 text-white/75 leading-relaxed">{product.description}</p>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-4xl font-bold">₹{product.price.toLocaleString()}</span>
                <span className="text-white/50 line-through">₹{product.mrp.toLocaleString()}</span>
                <span className="text-primary text-sm font-semibold">
                  Save {Math.round((1 - product.price / product.mrp) * 100)}%
                </span>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center border border-white/15 rounded-lg">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-white/5"><Minus className="h-4 w-4" /></button>
                  <span className="w-10 text-center">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-white/5"><Plus className="h-4 w-4" /></button>
                </div>
                <Button onClick={add} size="lg" className="bg-primary hover:bg-primary/90 flex-1 shadow-glow">Add to Cart</Button>
              </div>
              <Button asChild variant="outline" size="lg" className="mt-3 w-full border-white/20 bg-transparent hover:bg-white/10">
                <Link to="/checkout">Buy Now</Link>
              </Button>
              <div className="mt-8 grid grid-cols-3 gap-3 text-xs text-white/65">
                <div className="flex flex-col items-center gap-1 p-3 border border-white/10 rounded-lg">
                  <Truck className="h-5 w-5 text-primary" />
                  Free Delivery
                </div>
                <div className="flex flex-col items-center gap-1 p-3 border border-white/10 rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Lab Tested
                </div>
                <div className="flex flex-col items-center gap-1 p-3 border border-white/10 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  FSSAI Approved
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 space-y-16">
        <div className="container space-y-16">
          {/* BENEFITS */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Benefits</h2>
            </div>
            <p className="text-white/70 max-w-3xl mb-6">Every active ingredient is dosed at clinically-validated levels — no fillers, no proprietary blends, no spiking. Here's exactly what this product gives you:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {product.benefits.map((b) => (
                <div key={b} className="flex items-start gap-3 p-5 bg-card border border-white/10 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* HOW TO USE */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Truck className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">How to use</h2>
            </div>
            <div className="p-6 md:p-8 bg-card border border-white/10 rounded-xl text-white/85 leading-relaxed text-base">
              <p>{product.howToUse}</p>
              <ul className="mt-5 grid sm:grid-cols-3 gap-4 text-sm">
                <li className="p-4 bg-background/40 rounded-lg border border-white/5"><strong className="text-primary block mb-1">Best timing</strong>Within 30 min post-training or first thing in the morning.</li>
                <li className="p-4 bg-background/40 rounded-lg border border-white/5"><strong className="text-primary block mb-1">Stack with</strong>Pure Creatine + BCAA Recover for full coverage.</li>
                <li className="p-4 bg-background/40 rounded-lg border border-white/5"><strong className="text-primary block mb-1">Storage</strong>Keep sealed in a cool, dry place. Use within 6 months of opening.</li>
              </ul>
            </div>
          </div>

          {/* INGREDIENTS */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FlaskConical className="h-6 w-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Ingredients (per portion)</h2>
            </div>
            <p className="text-white/70 max-w-3xl mb-6">Full transparency on what goes into one serving — and why each component matters for your training.</p>
            <div className="grid md:grid-cols-2 gap-3">
              {product.ingredients.map((ing, i) => (
                <div key={ing} className="flex items-center justify-between p-5 bg-card border border-white/10 rounded-lg hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="h-8 w-8 rounded-full bg-primary/15 text-primary text-xs font-bold grid place-items-center">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-medium">{ing}</span>
                  </div>
                  <span className="text-xs text-primary font-mono">{[27, 6.2, 5, 3.1, 2.4, 1.5, 0.8][i % 7]}g</span>
                </div>
              ))}
            </div>
          </div>

          {/* REVIEWS */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Star className="h-6 w-6 text-primary fill-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Verified Reviews</h2>
            </div>
            <ProductReviews slug={product.id} />
          </div>
        </div>
      </section>

      <section className="py-16 bg-black/40 border-t border-white/10">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">You may also like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* Sticky mobile buy now */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[hsl(var(--ink))]/95 backdrop-blur border-t border-white/10 p-3 flex gap-3">
        <div>
          <p className="text-xs text-white/60">Price</p>
          <p className="font-bold">₹{product.price.toLocaleString()}</p>
        </div>
        <Button onClick={add} className="flex-1 bg-primary hover:bg-primary/90">Add to Cart</Button>
      </div>
    </>
  );
};

export default ProductDetail;