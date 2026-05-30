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

  // Map brochure fields with safe array fallbacks[cite: 1]
  const productIngredients = product.mainIngredients || [];
  const productBenefits = product.keyBenefits || [];
  const productFlavours = product.flavours || ["Standard Edition"];

  return (
    <div className="bg-black text-white min-h-screen selection:bg-primary selection:text-black">
      <section className="py-12 md:py-16 border-b border-neutral-900">
        <div className="container max-w-6xl mx-auto px-4">
          
          {/* Breadcrumb Navigation */}
          <nav className="text-xs text-neutral-500 mb-8 flex items-center gap-1.5 uppercase tracking-wider font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 text-neutral-600" />
            <Link to="/products" className="hover:text-primary transition-colors">Arsenal</Link>
            <ChevronRight className="h-3 w-3 text-neutral-600" />
            <span className="text-neutral-200 font-semibold">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Gallery Component */}
            <div className="w-full">
              <ProductGallery items={gallery} alt={product.name} />
            </div>

            {/* Product Meta Core Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs tracking-[0.3em] uppercase text-primary font-bold bg-primary/10 px-3 py-1 rounded inline-block">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none">
                  {product.name}
                </h1>
              </div>

              {/* Rating Overview */}
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-0.5 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                  <span className="ml-1.5 font-bold text-neutral-200">{product.rating}</span>
                </div>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-400 font-medium">{product.reviews} Verified Elite Reviews</span>
              </div>

              {/* Product Tagline Description */}
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed font-light">
                {product.tagline}
              </p>

              {/* Brochure Flavour Matrix Badge System[cite: 1] */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block">Available Flavours[cite: 1]</span>
                <div className="flex flex-wrap gap-2">
                  {productFlavours.map((flavour) => (
                    <span key={flavour} className="text-xs bg-neutral-900 border border-neutral-800 text-neutral-300 px-3 py-1.5 rounded-lg font-medium">
                      {flavour}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing Matrix */}
              <div className="flex items-baseline gap-4 pt-4 border-t border-neutral-900">
                <span className="text-4xl md:text-5xl font-black tracking-tight text-white">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-lg text-neutral-500 line-through font-medium">
                  ₹{product.mrp.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full uppercase tracking-wider">
                  Save {Math.round((1 - product.price / product.mrp) * 100)}%
                </span>
              </div>

              {/* Action Mechanics Grid */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center justify-between border border-neutral-800 bg-neutral-950 rounded-xl p-1 shrink-0 h-14">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))} 
                    className="p-3 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-mono font-bold text-base">{qty}</span>
                  <button 
                    onClick={() => setQty(qty + 1)} 
                    className="p-3 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <Button 
                  onClick={add} 
                  size="lg" 
                  className="bg-primary text-black hover:bg-primary/90 flex-1 font-bold uppercase tracking-wider text-xs h-14 rounded-xl shadow-xl shadow-primary/10"
                >
                  Add to Tactical Cart
                </Button>
              </div>

              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="w-full border-neutral-800 bg-transparent hover:bg-neutral-900 text-neutral-300 font-bold uppercase tracking-wider text-xs h-12 rounded-xl"
              >
                <Link to="/checkout">Instant Buy Now</Link>
              </Button>

              {/* Trust Features Block[cite: 1] */}
              <div className="grid grid-cols-3 gap-3 text-xs text-neutral-400 pt-6 border-t border-neutral-900">
                <div className="flex flex-col items-center text-center gap-2 p-4 bg-neutral-950 border border-neutral-900 rounded-xl">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="font-medium">Free Delivery Across India</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 p-4 bg-neutral-950 border border-neutral-900 rounded-xl">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="font-medium">Independent Lab Tested</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 p-4 bg-neutral-950 border border-neutral-900 rounded-xl">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">FSSAI Approved Nutraceutical</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Detail Specifications Tabs Section */}
      <section className="py-16 bg-neutral-950/40">
        <div className="container max-w-6xl mx-auto px-4 space-y-16">
          
          {/* Brochure Target Metrics & Benefits[cite: 1] */}
          {productBenefits.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Product Target Matrix[cite: 1]</h2>
              </div>
              <p className="text-neutral-400 text-sm max-w-3xl mb-6">
                Every Ergogenic Nutrition active component is dosed at clinical levels without proprietary blends[cite: 1]. Target goals include:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {productBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3.5 p-5 bg-neutral-900/50 border border-neutral-900 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-medium text-neutral-200 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Brochure Ingredients Array[cite: 1] */}
          {productIngredients.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FlaskConical className="h-5 w-5 text-primary" />
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Main Ingredients Profile[cite: 1]</h2>
              </div>
              <p className="text-neutral-400 text-sm max-w-3xl mb-6">
                Full catalog transparency breakdown for adult sports nutrition tracking profiles[cite: 1].
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {productIngredients.map((ingredient, idx) => (
                  <div key={ingredient} className="flex items-center justify-between p-5 bg-neutral-900/40 border border-neutral-900 rounded-xl hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="h-7 w-7 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-semibold text-sm text-neutral-200 truncate">{ingredient}</span>
                    </div>
                    <span className="text-xs text-primary font-mono bg-primary/5 border border-primary/10 px-2 py-0.5 rounded shrink-0 ml-2">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usage Protocol & Storage Configuration */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Truck className="h-5 w-5 text-primary" />
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Directions & Administration</h2>
            </div>
            <div className="p-6 md:p-8 bg-neutral-900/30 border border-neutral-900 rounded-2xl text-neutral-400 leading-relaxed text-sm">
              <p className="font-light">
                Mix accurately as required by your daily macros package or training volume guidelines.
              </p>
              <ul className="mt-6 grid sm:grid-cols-3 gap-4">
                <li className="p-4 bg-black/40 rounded-xl border border-neutral-900">
                  <strong className="text-primary block text-xs uppercase tracking-wider mb-1">Timing Routine</strong>
                  Consume before, during, or within 30 minutes post-workout depending on targeted formulation type.
                </li>
                <li className="p-4 bg-black/40 rounded-xl border border-neutral-900">
                  <strong className="text-primary block text-xs uppercase tracking-wider mb-1">Synergy Stacking</strong>
                  Can be cross-stacked safely with other Ergogenic series items to augment results[cite: 1].
                </li>
                <li className="p-4 bg-black/40 rounded-xl border border-neutral-900">
                  <strong className="text-primary block text-xs uppercase tracking-wider mb-1">Brochure Storage</strong>
                  Keep sealed in a secure cool environment. Protect from light moisture, heat, or child access[cite: 1].
                </li>
              </ul>
            </div>
          </div>

          {/* Product Reviews Integration */}
          <div className="pt-4">
            <div className="flex items-center gap-3 mb-8">
              <Star className="h-5 w-5 text-primary fill-primary" />
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Verified Performance Log</h2>
            </div>
            <ProductReviews slug={product.id} />
          </div>

        </div>
      </section>

      {/* Suggested Products Carousel / Grid */}
      <section className="py-16 bg-black border-t border-neutral-900">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-8">Complete Your Performance Stack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Sticky Buy Actions Panel */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-neutral-950/95 backdrop-blur border-t border-neutral-900 p-4 flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-bold">Total Price</span>
          <p className="font-black text-xl text-white">₹{product.price.toLocaleString()}</p>
        </div>
        <Button onClick={add} className="bg-primary text-black font-bold uppercase tracking-wider text-xs h-12 px-6 rounded-xl flex-1">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;