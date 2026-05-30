import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CircleCheck as CheckCircle2, ChevronRight, FlaskConical, Minus, Plus, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { toast } from "@/hooks/use-toast";
import { ProductReviews } from "@/components/ProductReviews";
import { ProductGallery, type MediaItem } from "@/components/ProductGallery";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "next-themes";

interface ScrollPosition {
  scale: number;
  translateY: number;
}

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [extraMedia, setExtraMedia] = useState<MediaItem[]>([]);
  const [scrollPositions, setScrollPositions] = useState<{ [key: number]: ScrollPosition }>({});
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (!id) return;
    supabase.from("products").select("media").eq("slug", id).maybeSingle()
      .then(({ data }) => {
        const m = (data?.media as any[]) ?? [];
        setExtraMedia(m.filter((x) => x?.url).map((x) => ({ url: x.url, kind: x.kind })));
      });
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll("[data-scroll-section]");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const index = parseInt(el.getAttribute("data-scroll-index") || "0", 10);
        const visibility = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
        setScrollPositions((prev) => ({
          ...prev,
          [index]: {
            scale: 0.95 + visibility * 0.1,
            translateY: -visibility * 20,
          },
        }));
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product) return <Navigate to="/products" replace />;

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);
  const gallery: MediaItem[] = extraMedia.length
    ? extraMedia
    : [{ url: product.image, kind: "image" }];

  const add = () => toast({ title: "Added to cart", description: `${qty} × ${product.name}` });

  const productIngredients = product.mainIngredients || [];
  const productBenefits = product.keyBenefits || [];
  const productFlavours = product.flavours || ["Standard Edition"];

  const baseClasses = isDark
    ? "bg-black text-white"
    : "bg-gradient-to-b from-white via-blue-50 to-white text-gray-900";

  const textClasses = isDark
    ? "text-neutral-400"
    : "text-gray-600";

  const cardClasses = isDark
    ? "bg-neutral-950 border-neutral-800"
    : "bg-white/80 border-blue-100";

  return (
    <div className={`${baseClasses} min-h-screen selection:bg-primary selection:text-white`}>
      {/* Hero Section */}
      <section className={`py-8 md:py-12 border-b ${isDark ? "border-neutral-900" : "border-blue-100"}`}>
        <div className="container max-w-6xl mx-auto px-4">
          <nav className={`text-xs mb-8 flex items-center gap-1.5 uppercase tracking-wider font-medium ${isDark ? "text-neutral-500" : "text-gray-500"}`}>
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/products" className="hover:text-primary transition-colors">Arsenal</Link>
            <ChevronRight className="h-3 w-3" />
            <span className={`font-semibold ${isDark ? "text-neutral-200" : "text-gray-800"}`}>{product.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            {/* Image - Left Side */}
            <div className="w-full lg:w-1/3 order-2 lg:order-1">
              <div className={`zoom-in rounded-2xl overflow-hidden ${isDark ? "bg-neutral-950" : "bg-white"} p-6 glow-card ${!isDark ? "light" : ""}`}>
                <ProductGallery items={gallery} alt={product.name} />
              </div>
            </div>

            {/* Text - Right Side */}
            <div className="w-full lg:w-2/3 order-1 lg:order-2 space-y-6 slide-up-text">
              <div className="space-y-3">
                <span className={`text-xs tracking-[0.3em] uppercase font-bold px-3 py-1 rounded inline-block ${isDark ? "text-primary bg-primary/10" : "text-blue-600 bg-blue-100"}`}>
                  {product.category}
                </span>
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none ${isDark ? "" : "text-gradient-red"}`}>
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className={`flex items-center gap-0.5 px-2 py-1 rounded border ${isDark ? "bg-neutral-900 border-neutral-800" : "bg-blue-50 border-blue-200"}`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                  <span className={`ml-1.5 font-bold ${isDark ? "text-neutral-200" : "text-gray-800"}`}>{product.rating}</span>
                </div>
                <span className={isDark ? "text-neutral-500" : "text-gray-400"}>·</span>
                <span className={`font-medium ${isDark ? "text-neutral-400" : "text-gray-600"}`}>{product.reviews} Verified Reviews</span>
              </div>

              <p className={`text-base md:text-lg leading-relaxed font-light ${textClasses}`}>
                {product.tagline}
              </p>

              <div className="space-y-2 pt-2">
                <span className={`text-[10px] uppercase font-bold tracking-widest block ${isDark ? "text-neutral-500" : "text-gray-500"}`}>Available Flavours</span>
                <div className="flex flex-wrap gap-2">
                  {productFlavours.map((flavour) => (
                    <span key={flavour} className={`text-xs px-3 py-1.5 rounded-lg font-medium border ${isDark ? "bg-neutral-900 border-neutral-800 text-neutral-300" : "bg-blue-50 border-blue-200 text-blue-900"}`}>
                      {flavour}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`flex items-baseline gap-4 pt-4 border-t ${isDark ? "border-neutral-900" : "border-blue-100"}`}>
                <span className="text-4xl md:text-5xl font-black tracking-tight text-primary">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className={`text-lg line-through font-medium ${isDark ? "text-neutral-500" : "text-gray-400"}`}>
                  ₹{product.mrp.toLocaleString()}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${isDark ? "text-primary bg-primary/10 border-primary/20" : "text-blue-600 bg-blue-100 border-blue-200"}`}>
                  Save {Math.round((1 - product.price / product.mrp) * 100)}%
                </span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <div className={`flex items-center justify-between border rounded-xl p-1 shrink-0 h-14 ${isDark ? "border-neutral-800 bg-neutral-950" : "border-blue-200 bg-blue-50"}`}>
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className={`p-3 rounded-lg transition-colors ${isDark ? "text-neutral-400 hover:text-white hover:bg-neutral-900" : "text-gray-600 hover:text-gray-900 hover:bg-blue-100"}`}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-mono font-bold text-base">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className={`p-3 rounded-lg transition-colors ${isDark ? "text-neutral-400 hover:text-white hover:bg-neutral-900" : "text-gray-600 hover:text-gray-900 hover:bg-blue-100"}`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button
                  onClick={add}
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 flex-1 font-bold uppercase tracking-wider text-xs h-14 rounded-xl shadow-xl shadow-primary/10"
                >
                  Add to Cart
                </Button>
              </div>

              <Button
                asChild
                variant="outline"
                size="lg"
                className={`w-full font-bold uppercase tracking-wider text-xs h-12 rounded-xl ${isDark ? "border-neutral-800 bg-transparent hover:bg-neutral-900 text-neutral-300" : "border-blue-300 bg-white hover:bg-blue-50 text-blue-900"}`}
              >
                <Link to="/checkout">Instant Buy Now</Link>
              </Button>

              <div className={`grid grid-cols-3 gap-3 text-xs pt-6 border-t ${isDark ? "text-neutral-400 border-neutral-900" : "text-gray-600 border-blue-100"}`}>
                <div className={`flex flex-col items-center text-center gap-2 p-4 border rounded-xl ${isDark ? "bg-neutral-950 border-neutral-900" : "bg-blue-50 border-blue-200"}`}>
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="font-medium">Free Delivery</span>
                </div>
                <div className={`flex flex-col items-center text-center gap-2 p-4 border rounded-xl ${isDark ? "bg-neutral-950 border-neutral-900" : "bg-blue-50 border-blue-200"}`}>
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="font-medium">Lab Tested</span>
                </div>
                <div className={`flex flex-col items-center text-center gap-2 p-4 border rounded-xl ${isDark ? "bg-neutral-950 border-neutral-900" : "bg-blue-50 border-blue-200"}`}>
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">FSSAI Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Sections - Alternating Layout */}
      <section className={`py-16 ${isDark ? "bg-neutral-950/40" : "bg-gradient-to-b from-blue-50/50 to-white"}`}>
        <div className="container max-w-6xl mx-auto px-4 space-y-20">

          {/* Benefits Section - Left Image, Right Text */}
          {productBenefits.length > 0 && (
            <div data-scroll-section data-scroll-index="0" className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className={`zoom-in rounded-3xl overflow-hidden p-8 glow-card ${!isDark ? "light" : ""}`}>
                <div className={`w-full h-96 rounded-2xl flex items-center justify-center text-4xl font-black ${isDark ? "bg-gradient-to-br from-primary/10 to-primary/5" : "bg-gradient-to-br from-blue-100 to-blue-50"}`}>
                  ✨
                </div>
              </div>
              <div className="slide-up-text space-y-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${isDark ? "" : "text-gradient-red"}`}>Key Benefits</h2>
                </div>
                <p className={`text-base leading-relaxed ${textClasses}`}>
                  Scientifically formulated for maximum performance. Every ingredient is dosed at clinical levels.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {productBenefits.map((benefit) => (
                    <div key={benefit} className={`flex items-center gap-3 p-4 rounded-xl border ${isDark ? "bg-neutral-900/50 border-neutral-800" : "bg-blue-50 border-blue-200"}`}>
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className={`font-medium text-sm ${isDark ? "text-neutral-200" : "text-gray-800"}`}>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Ingredients Section - Right Image, Left Text */}
          {productIngredients.length > 0 && (
            <div data-scroll-section data-scroll-index="1" className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="slide-up-text space-y-6 order-2 lg:order-1">
                <div className="flex items-center gap-3">
                  <FlaskConical className="h-6 w-6 text-primary" />
                  <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${isDark ? "" : "text-gradient-red"}`}>Active Ingredients</h2>
                </div>
                <p className={`text-base leading-relaxed ${textClasses}`}>
                  Full transparency of all ingredients used. No proprietary blends - just pure, effective nutrition.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {productIngredients.map((ingredient, idx) => (
                    <div key={ingredient} className={`flex items-center justify-between p-4 rounded-xl border hover:border-primary/50 transition-colors ${isDark ? "bg-neutral-900/40 border-neutral-800" : "bg-blue-50 border-blue-200"}`}>
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`h-7 w-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 ${isDark ? "bg-primary/10 border border-primary/20 text-primary" : "bg-blue-200 border border-blue-300 text-blue-900"}`}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className={`font-semibold text-sm truncate ${isDark ? "text-neutral-200" : "text-gray-800"}`}>{ingredient}</span>
                      </div>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded shrink-0 ml-2 ${isDark ? "text-primary bg-primary/5 border border-primary/10" : "text-blue-600 bg-blue-100 border border-blue-300"}`}>
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`zoom-in rounded-3xl overflow-hidden p-8 glow-card order-1 lg:order-2 ${!isDark ? "light" : ""}`}>
                <div className={`w-full h-96 rounded-2xl flex items-center justify-center text-4xl font-black ${isDark ? "bg-gradient-to-br from-primary/10 to-primary/5" : "bg-gradient-to-br from-blue-100 to-blue-50"}`}>
                  ⚗️
                </div>
              </div>
            </div>
          )}

          {/* Usage & Storage Section */}
          <div data-scroll-section data-scroll-index="2" className={`p-8 md:p-12 border rounded-2xl ${isDark ? "bg-neutral-900/30 border-neutral-800" : "bg-white/50 border-blue-200"}`}>
            <div className="flex items-center gap-3 mb-6">
              <Truck className="h-6 w-6 text-primary" />
              <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${isDark ? "" : "text-gradient-red"}`}>How to Use</h2>
            </div>
            <div className={`leading-relaxed text-base mb-8 ${textClasses}`}>
              <p className="font-light">
                Mix as needed based on your daily macros and training volume. Our formulation is versatile and can be used flexibly.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className={`p-6 rounded-xl border ${isDark ? "bg-black/40 border-neutral-800" : "bg-blue-50/50 border-blue-200"}`}>
                <strong className={`block text-xs uppercase tracking-wider mb-2 ${isDark ? "text-primary" : "text-blue-600"}`}>Timing</strong>
                <p className={`text-sm ${textClasses}`}>Pre, during, or within 30 minutes post-workout for optimal results.</p>
              </div>
              <div className={`p-6 rounded-xl border ${isDark ? "bg-black/40 border-neutral-800" : "bg-blue-50/50 border-blue-200"}`}>
                <strong className={`block text-xs uppercase tracking-wider mb-2 ${isDark ? "text-primary" : "text-blue-600"}`}>Stacking</strong>
                <p className={`text-sm ${textClasses}`}>Safely combine with other supplements for enhanced performance.</p>
              </div>
              <div className={`p-6 rounded-xl border ${isDark ? "bg-black/40 border-neutral-800" : "bg-blue-50/50 border-blue-200"}`}>
                <strong className={`block text-xs uppercase tracking-wider mb-2 ${isDark ? "text-primary" : "text-blue-600"}`}>Storage</strong>
                <p className={`text-sm ${textClasses}`}>Keep sealed in cool, dry place away from heat and moisture.</p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div data-scroll-section data-scroll-index="3">
            <div className="flex items-center gap-3 mb-8">
              <Star className="h-6 w-6 text-primary fill-primary" />
              <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${isDark ? "" : "text-gradient-red"}`}>User Reviews</h2>
            </div>
            <ProductReviews slug={product.id} />
          </div>

        </div>
      </section>

      {/* Related Products Section */}
      <section className={`py-16 border-t ${isDark ? "bg-black border-neutral-900" : "bg-white border-blue-100"}`}>
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight mb-8 ${isDark ? "" : "text-gradient-red"}`}>Complete Your Stack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Sticky Buy Panel */}
      <div className={`fixed bottom-0 inset-x-0 z-40 lg:hidden backdrop-blur border-t p-4 flex items-center justify-between gap-4 ${isDark ? "bg-neutral-950/95 border-neutral-900" : "bg-white/95 border-blue-100"}`}>
        <div>
          <span className={`text-[10px] uppercase tracking-widest block font-bold ${isDark ? "text-neutral-500" : "text-gray-500"}`}>Total Price</span>
          <p className={`font-black text-xl ${isDark ? "text-white" : "text-gray-900"}`}>₹{product.price.toLocaleString()}</p>
        </div>
        <Button onClick={add} className="bg-primary text-white font-bold uppercase tracking-wider text-xs h-12 px-6 rounded-xl flex-1">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;