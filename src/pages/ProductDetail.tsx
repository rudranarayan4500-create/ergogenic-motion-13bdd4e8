import { useEffect, useRef, useState, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CircleCheck as CheckCircle2, ChevronRight, FlaskConical, Minus, Plus, ShieldCheck, Sparkles, Star, Truck, MessageSquare, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { toast } from "@/hooks/use-toast";
import { ProductReviews } from "@/components/ProductReviews";
import { ProductGallery, type MediaItem } from "@/components/ProductGallery";
import { supabase } from "@/integrations/supabase/client";
import { throttle } from "@/lib/utils";
import { addToCart } from "@/lib/cart";

interface ScrollPosition {
  scale: number;
  translateY: number;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [extraMedia, setExtraMedia] = useState<MediaItem[]>([]);
  const [, setScrollPositions] = useState<{ [key: number]: ScrollPosition }>({});
  const scrollHandlerRef = useRef<(() => void) | null>(null);

  // Safe validation anchor prioritizing matching slug structures before falling back on dynamic targets
  const product = useMemo(() => {
    const found = products.find((p) => p.id === id || p.slug === id);
    if (!found && id === "pure-creatine") {
      return {
        id: "pure-creatine",
        slug: "pure-creatine",
        name: "Pure Creatine Micronized",
        category: "Performance",
        rating: 4.9,
        reviews: 1750,
        price: 1299,
        mrp: 1599,
        tagline: "200-mesh pure micronized athletic phosphagen compound built to maximize systemic muscular cell hydration thresholds.",
        image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp%20Image%202026-05-31%20at%207.38.06%20PM.jpeg"
      };
    }
    return found;
  }, [id]);

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

    scrollHandlerRef.current = throttle(handleScroll, 30);
    window.addEventListener("scroll", scrollHandlerRef.current);
    return () => {
      if (scrollHandlerRef.current) {
        window.removeEventListener("scroll", scrollHandlerRef.current);
      }
    };
  }, []);

  // Multi-angle product picture deck integration matching your exact portfolio assets
  const gallery: MediaItem[] = useMemo(() => {
    if (extraMedia.length) return extraMedia;
    
    if (product?.id === "pure-creatine") {
      return [
        { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp%20Image%202026-05-31%20at%207.38.06%20PM.jpeg", kind: "image" },
        { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//d4210519-9c5a-4101-a064-84b90287c3c6-removebg-preview.png", kind: "image" },
        { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//d0fed463-4148-42f5-8d2a-594e5b48f021.png", kind: "image" }
      ];
    }
    
    if (!product) return [];
    const g = (product as any).gallery as string[] | undefined;
    if (g && g.length) return g.map((url) => ({ url, kind: "image" as const }));
    return [{ url: product.image, kind: "image" }];
  }, [extraMedia, product]);

  const reviewVideos = useMemo(() => gallery.filter(m => m?.kind === "video"), [gallery]);

  const productSnapshots = useMemo(() => {
    if (!product) return [];
    if (product.id === "pure-creatine") {
      return [
        { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp%20Image%202026-05-31%20at%207.38.06%20PM.jpeg", tag: "Pure Micronized Mesh" },
        { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//d0fed463-4148-42f5-8d2a-594e5b48f021.png", tag: "Seal Integrity Check" }
      ];
    }
    const g = (product as any).gallery as string[] | undefined;
    if (g && g.length > 1) {
      return g.slice(0, 3).map((url, i) => ({ url, tag: ["Front Angle", "Detail Shot", "Lifestyle"][i] || "Studio" }));
    }
    return [{ url: product.image, tag: "Front Angle Core" }];
  }, [product]);

  if (!product) return <Navigate to="/products" replace />;

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);
  const add = () => {
    addToCart(
      { slug: (product as any).slug || product.id, name: product.name, price: product.price, image: product.image },
      qty
    );
    toast({ title: "Added to cart", description: `${qty} × ${product.name}` });
  };

  const productIngredients = (product as any).mainIngredients || (product as any).ingredients || ["Micronized Pure Creatine Monohydrate"];
  const productBenefits = (product as any).keyBenefits || (product as any).benefits || ["ATP Regeneration Acceleration", "Intracellular Hydration Support", "Explosive Output Scaling"];
  const productFlavours = (product as any).flavours || ["Standard Edition"];

  const verificationComments = [
    { user: "RDSP_CyberSecurity", role: "Verified Lead", text: "HPLC test profile came back solid. Distribution homogeneity is exactly matching the clinical allocation charts.", timestamp: "2 hours ago" },
    { user: "Kalyan_B", role: "Beta Athlete", text: "Zero digestion bloat spikes even across extreme intra-workout load shifts. Pure amino allocation factor is real.", timestamp: "5 hours ago" },
    { user: "Khushi_Jalan", role: "Lab Analyst", text: "100% transparent matrix ledger verification cleared. No spikes or hidden proprietary shortcuts.", timestamp: "1 day ago" }
  ];

  return (
    <div className="bg-[#FFFFFF] text-slate-900 min-h-screen antialiased selection:bg-slate-900 selection:text-white">
      
      {/* Hero Section */}
      <section className="py-8 md:py-16 border-b border-slate-200 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          
          {/* Breadcrumbs Navigation */}
          <nav className="text-xs mb-8 flex items-center gap-1.5 uppercase tracking-[0.2em] font-bold text-slate-400">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <Link to="/products" className="hover:text-slate-900 transition-colors">Arsenal</Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-slate-600">{product.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            
            {/* Image Frame Canvas — Left Side */}
            <div className="w-full lg:w-5/12 order-2 lg:order-1">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 relative group overflow-hidden shadow-sm min-h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 rounded-full blur-3xl opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-20" style={{ background: "radial-gradient(circle, var(--primary) / 0.2, transparent 65%)" }} />
                <div className="w-full h-full object-contain max-h-[450px]">
                  <ProductGallery items={gallery} alt={product.name} />
                </div>
              </div>
            </div>

            {/* Product Meta Details — Right Side */}
            <div className="w-full lg:w-7/12 order-1 lg:order-2 space-y-6">
              <div className="space-y-3">
                <span className="text-xs tracking-[0.25em] uppercase font-black px-3 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded inline-block">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none text-slate-900">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-0.5 px-2.5 py-1 rounded-lg border bg-white border-slate-200 shadow-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  ))}
                  <span className="ml-1.5 font-mono font-black text-slate-900">{product.rating}</span>
                </div>
                <span className="text-slate-300">·</span>
                <span className="font-bold text-slate-500">{product.reviews} Verified Batch Reviews</span>
              </div>

              <p className="text-base md:text-lg leading-relaxed text-slate-600 font-medium max-w-2xl">
                {product.tagline}
              </p>

              {/* Flavor Options */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 block">Available Flavor Variations</span>
                <div className="flex flex-wrap gap-2">
                  {productFlavours.map((flavour) => (
                    <span key={flavour} className="text-xs px-3.5 py-1.5 rounded-xl font-bold border bg-slate-50 border-slate-200 text-slate-700 transition-colors hover:bg-slate-100">
                      {flavour}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing Blocks */}
              <div className="flex items-baseline gap-4 pt-4 border-t border-slate-200">
                <span className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 font-mono">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-lg line-through font-bold text-slate-400 font-mono">
                  ₹{product.mrp.toLocaleString()}
                </span>
                <span className="text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border text-emerald-700 bg-emerald-50 border-emerald-200">
                  Save {Math.round((1 - product.price / product.mrp) * 100)}%
                </span>
              </div>

              {/* Controls */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center justify-between border rounded-xl p-1 shrink-0 h-14 border-slate-200 bg-slate-50">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-colors">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-mono font-black text-base text-slate-900">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="p-3 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button onClick={add} size="lg" className="bg-slate-900 text-white hover:bg-slate-800 flex-1 font-black uppercase tracking-wider text-xs h-14 rounded-xl shadow-md">
                  Add to Cart
                </Button>
              </div>

              <Button asChild variant="outline" size="lg" className="w-full font-black uppercase tracking-wider text-xs h-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-all">
                <Link to="/checkout">Instant Buy Now</Link>
              </Button>

              {/* Logistics Badging Row */}
              <div className="grid grid-cols-3 gap-3 text-xs pt-6 border-t text-slate-600 border-slate-200">
                <div className="flex flex-col items-center text-center gap-2 p-4 border rounded-xl bg-slate-50 border-slate-200">
                  <Truck className="h-5 w-5 text-slate-800" />
                  <span className="font-bold uppercase tracking-wider text-[10px] text-slate-700">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 p-4 border rounded-xl bg-slate-50 border-slate-200">
                  <ShieldCheck className="h-5 w-5 text-slate-800" />
                  <span className="font-bold uppercase tracking-wider text-[10px] text-slate-700">Lab Verified</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 p-4 border rounded-xl bg-slate-50 border-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-slate-800" />
                  <span className="font-bold uppercase tracking-wider text-[10px] text-slate-700">FSSAI Approved</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Premium Analytical Detail Blocks */}
      <section className="py-20 bg-slate-50/50 relative">
        <div className="container max-w-6xl mx-auto px-4 space-y-24">

          {/* Key Benefits Section — Left Multi-Angle Photos Deck, Right Text & Commentary Feed */}
          {productBenefits.length > 0 && (
            <div data-scroll-section data-scroll-index="0" className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Multi-Angle Snapshot Grid */}
              <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
                <span className="text-[9px] uppercase tracking-widest font-black text-slate-800 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md block w-fit">
                  Multi-Angle Stack Formations
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {productSnapshots.map((pic, pIdx) => (
                    <div key={pIdx} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm relative group overflow-hidden flex flex-col items-center justify-between">
                      <div className="aspect-square w-full max-h-[140px] flex items-center justify-center p-2">
                        <img src={pic.url} alt={pic.tag} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 block text-center mt-2 border-t border-slate-100 pt-1.5 w-full">
                        {pic.tag}
                      </span>
                    </div>
                  ))}
                </div>
                
                {reviewVideos.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[9px] uppercase tracking-widest font-black text-slate-400 block">
                      Video Analysis Verification
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {reviewVideos.map((vid, vIdx) => (
                        <div key={vIdx} className="aspect-video bg-slate-900 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                          <video src={vid.url} controls muted loop autoPlay playsInline className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Key Benefits Text Parameters & Comments Ledger */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-slate-800" />
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900">Key Benefits</h2>
                  </div>
                  <p className="text-base leading-relaxed text-slate-500 font-medium">
                    Scientifically formulated for maximum performance profiles. Every compound inclusion is dosed matching verified active clinical parameters.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {productBenefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-3 p-4 rounded-xl border bg-white border-slate-200 shadow-sm transition-colors hover:border-slate-300">
                        <CheckCircle2 className="h-5 w-5 text-slate-800 shrink-0" />
                        <span className="font-bold text-sm text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Integrated Verified Hype Commentary Ledger Feed */}
                <div className="border-t border-slate-200 pt-6 space-y-4">
                  <h3 className="text-xs uppercase tracking-[0.25em] text-slate-400 font-black flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-slate-700" /> Batch Operational Commentary Log
                  </h3>
                  
                  <div className="space-y-3">
                    {verificationComments.map((comment, cIdx) => (
                      <div key={cIdx} className="bg-white border border-slate-200 rounded-xl p-4 space-y-1.5 hover:border-slate-300 transition-colors shadow-sm">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono text-slate-900 font-bold flex items-center gap-1">
                            <Flame className="h-3 w-3 text-amber-500 fill-amber-500" /> @{comment.user}
                          </span>
                          <div className="flex items-center gap-2 text-slate-400">
                            <span className="text-[9px] bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-bold">{comment.role}</span>
                            <span>{comment.timestamp}</span>
                          </div>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed font-medium">
                          "{comment.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Active Ingredients Section */}
          {productIngredients.length > 0 && (
            <div data-scroll-section data-scroll-index="1" className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
                <div className="flex items-center gap-3">
                  <FlaskConical className="h-6 w-6 text-slate-800" />
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900">Active Ingredients</h2>
                </div>
                <p className="text-base leading-relaxed text-slate-500 font-medium">
                  Full transparency parameters across all molecular compounds. Zero proprietary masking clusters — just pure, functional nutrition.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {productIngredients.map((ingredient, idx) => (
                    <div key={ingredient} className="flex items-center justify-between p-4 rounded-xl border bg-white border-slate-200 hover:border-slate-400 shadow-sm transition-all duration-300 group/item">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="h-7 w-7 rounded-lg text-xs font-mono font-black flex items-center justify-center shrink-0 bg-slate-100 border border-slate-200 text-slate-800 group-hover/item:bg-slate-900 group-hover/item:text-white transition-colors">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="font-bold text-sm truncate text-slate-700 group-hover/item:text-slate-900 transition-colors">{ingredient}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ml-2 text-slate-600 bg-slate-50 border border-slate-200">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm order-1 lg:order-2">
                <ProductGallery items={gallery.filter(m => m.kind === "image")} alt={`${product.name} packaging blueprint`} />
              </div>
            </div>
          )}

          {/* Administration Protocol */}
          <div data-scroll-section data-scroll-index="2" className="p-8 md:p-12 border rounded-2xl bg-white border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <Truck className="h-6 w-6 text-slate-800" />
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900">Administration Protocol</h2>
            </div>
            <div className="leading-relaxed text-base mb-8 text-slate-500 font-medium">
              <p>
                Mix allocations precisely calculated relative to your targeted baseline performance markers, macronutrient tracking maps, and ongoing mechanical load thresholds.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-xl border bg-slate-50 border-slate-200">
                <strong className="block text-xs uppercase tracking-[0.15em] mb-2 text-slate-800 font-black">Timing Sequence</strong>
                <p className="text-sm font-medium text-slate-600">Administer pre, intra, or within a 45-minute window post-workout for maximum synthesis response tracking.</p>
              </div>
              <div className="p-6 rounded-xl border bg-slate-50 border-slate-200">
                <strong className="block text-xs uppercase tracking-[0.15em] mb-2 text-slate-800 font-black">Matrix Stacking</strong>
                <p className="text-sm font-medium text-slate-600">Can be cleanly stacked alongside complementary single-agent allocations without risk of cross-compound degradation parameters.</p>
              </div>
              <div className="p-6 rounded-xl border bg-slate-50 border-slate-200">
                <strong className="block text-xs uppercase tracking-[0.15em] mb-2 text-slate-800 font-black">Storage Parameters</strong>
                <p className="text-sm font-medium text-slate-600">Keep container firmly sealed inside a cool, stabilized moisture-free tracking climate zone environment.</p>
              </div>
            </div>
          </div>

          {/* User Reviews */}
          <div data-scroll-section data-scroll-index="3" className="pt-4">
            <div className="flex items-center gap-3 mb-8">
              <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900">User Reviews Ledger</h2>
            </div>
            <ProductReviews slug={product.id} />
          </div>

        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 border-t border-slate-200 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8 text-slate-900">Complete Your Stack Configuration</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Buy Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden backdrop-blur-md border-t p-4 flex items-center justify-between gap-4 bg-white/90 border-slate-200 shadow-lg">
        <div>
          <span className="text-[10px] uppercase tracking-widest block font-bold text-slate-400">Allocation Price</span>
          <p className="font-black text-xl text-slate-900 font-mono">₹{product.price.toLocaleString()}</p>
        </div>
        <Button onClick={add} className="bg-slate-900 text-white font-black uppercase tracking-wider text-xs h-12 px-6 rounded-xl flex-1 shadow-sm">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;