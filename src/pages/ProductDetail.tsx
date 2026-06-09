import { useEffect, useRef, useState, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CircleCheck as CheckCircle2, ChevronRight, Minus, Plus, Star, ShieldCheck, Check, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { toast } from "@/hooks/use-toast";
import { type MediaItem } from "@/components/ProductGallery";
import { supabase } from "@/integrations/supabase/client";
import { throttle, cn } from "@/lib/utils";
import { addToCart } from "@/lib/cart";

interface ScrollPosition {
  scale: number;
  translateY: number;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [extraMedia, setExtraMedia] = useState<MediaItem[]>([]);
  const [dbProduct, setDbProduct] = useState<any | null>(null);
  const [, setScrollPositions] = useState<{ [key: number]: ScrollPosition }>({});
  const scrollHandlerRef = useRef<(() => void) | null>(null);
  
  // Track the currently active image index for the new Thumbnail Gallery layout
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image when navigating to a new product
  useEffect(() => {
    setActiveImageIndex(0);
    setQty(1);
  }, [id]);

  const product = useMemo(() => {
    const found = products.find((p) => p.id === id || p.slug === id);
    if (dbProduct) {
      const base: any = found ?? {
        id: dbProduct.slug, slug: dbProduct.slug,
        category: dbProduct.category,
        benefits: dbProduct.benefits ?? [],
        howToUse: dbProduct.how_to_use ?? "",
        ingredients: dbProduct.ingredients ?? [],
        gallery: undefined,
      };

      const normalName = (dbProduct.name || "").toLowerCase().trim();
      let targetedImage = dbProduct.image || base.image;

      if (normalName.includes("hyper no short") || normalName.includes("hyper-no")) {
        targetedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.15.53 PM (1).jpeg";
      } else if (normalName.includes("micro power") || normalName.includes("creatin")) {
        targetedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.34.42 PM.jpeg";
      } else if (normalName.includes("caffeine short") || normalName.includes("caffeine")) {
        targetedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-09 at 2.27.46 PM.jpeg";
      } else if (normalName.includes("super whey")) {
        targetedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-06 at 8.09.24 PM.jpeg";
      } else if (normalName.includes("plasma")) {
        targetedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 1.16.35 PM (1).jpeg";
      } else if (normalName.includes("glutashot") || normalName.includes("gluta shot")) {
        targetedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.15.26 PM.jpeg";
      } else if (normalName.includes("aminoshot") || normalName.includes("amino shot")) {
        targetedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.05.26 PM.jpeg";
      } else if (normalName.includes("lean shot") || normalName.includes("lean-shot")) {
        targetedImage = "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 9.38.14 PM (1).jpeg";
      }

      return {
        ...base,
        name: dbProduct.name ?? base.name,
        tagline: dbProduct.tagline ?? base.tagline ?? "",
        description: dbProduct.description ?? base.description ?? "",
        price: Number(dbProduct.price) || base.price,
        mrp: Number(dbProduct.mrp) || base.mrp,
        category: dbProduct.category || base.category,
        image: targetedImage,
        rating: Number(dbProduct.rating) || base.rating || 4.8,
        reviews: Number(dbProduct.reviews) || base.reviews || 0,
        benefits: (dbProduct.benefits?.length ? dbProduct.benefits : base.benefits) ?? [],
        ingredients: (dbProduct.ingredients?.length ? dbProduct.ingredients : base.ingredients) ?? [],
        howToUse: dbProduct.how_to_use || base.howToUse,
      };
    }
    
    if (!found && id === "micro-power-creatine") {
      return {
        id: "micro-power-creatine", slug: "micro-power-creatine", name: "Micro Power Creatin", category: "Fitness",
        rating: 4.9, reviews: 1750, price: 1299, mrp: 1599,
        tagline: "Pure micronized formulation designed to support explosive power and muscle hydration.",
        image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.34.42 PM.jpeg"
      };
    }
    return found;
  }, [id, dbProduct]);

  useEffect(() => {
    if (!id) return;
    supabase.from("products").select("*").eq("slug", id).maybeSingle()
      .then(({ data }) => {
        setDbProduct(data ?? null);
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
        setScrollPositions((prev) => ({ ...prev, [index]: { scale: 0.95 + visibility * 0.1, translateY: -visibility * 20 } }));
      });
    };
    scrollHandlerRef.current = throttle(handleScroll, 30);
    window.addEventListener("scroll", scrollHandlerRef.current);
    return () => { if (scrollHandlerRef.current) window.removeEventListener("scroll", scrollHandlerRef.current); };
  }, []);

  const gallery: MediaItem[] = useMemo(() => {
    if (extraMedia.length) return extraMedia.slice(0, 6);
    
    if (product) {
      const normalName = (product.name || "").toLowerCase().trim();
      
      if (normalName.includes("hyper no short") || normalName.includes("hyper-no")) {
        return [
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.15.53 PM (1).jpeg", kind: "image" },
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 5.12.52 PM.jpeg", kind: "image" },
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 5.06.26 PM.jpeg", kind: "image" }
        ];
      }
      if (normalName.includes("micro power") || product.id === "micro-power-creatine") {
        return [{ url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.34.42 PM.jpeg", kind: "image" }];
      }
      if (normalName.includes("caffeine short") || normalName.includes("caffeine")) {
        return [{ url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-09 at 2.27.46 PM.jpeg", kind: "image" }];
      }
      if (normalName.includes("super whey")) {
        return [
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-06 at 8.09.24 PM.jpeg", kind: "image" },
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-06 at 8.03.59 PM.jpeg", kind: "image" },
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-06 at 5.17.38 PM.jpeg", kind: "image" }
        ];
      }
      if (normalName.includes("viper 3") || normalName.includes("viper-3")) {
        return [
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//98737dbc-d1ae-49e4-86bb-ddc9fc9f4565.png", kind: "image" },
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot%202026-06-09%20142302.png", kind: "image" },
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.55.42 PM.jpeg", kind: "image" }
        ];
      }
      if (normalName.includes("plasma")) {
        return [
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 1.16.35 PM (1).jpeg", kind: "image" },
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-09 153607.png", kind: "image" }
        ];
      }
      if (normalName.includes("aminoshot") || normalName.includes("amino shot")) {
        return [
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.05.26 PM.jpeg", kind: "image" },
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 9.04.52 PM.jpeg", kind: "image" },
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.53.29 PM.jpeg", kind: "image" },
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-09 153307.png", kind: "image" }
        ];
      }
      if (normalName.includes("glutashot") || normalName.includes("gluta shot")) {
        return [
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.15.26 PM.jpeg", kind: "image" },
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.15.34 PM.jpeg", kind: "image" }
        ];
      }
      if (normalName.includes("lean shot") || normalName.includes("lean-shot")) {
        return [
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 9.38.14 PM (1).jpeg", kind: "image" },
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-09 144649.png", kind: "image" },
          { url: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//61f8ac7f-e71f-4b22-a5e5-3c1451a49775.png", kind: "image" }
        ];
      }
    }
    
    if (!product) return [];
    const g = (product as any).gallery as string[] | undefined;
    if (g && g.length) return g.slice(0, 6).map((url) => ({ url, kind: "image" as const }));
    return [{ url: product.image, kind: "image" }];
  }, [extraMedia, product]);

  // Make sure we never index out of bounds
  const currentMedia = gallery[activeImageIndex] || gallery[0] || { url: product?.image, kind: 'image' };

  if (!product) return <Navigate to="/products" replace />;

  const related = useMemo(() => {
    const hiddenCatalogItems = [
      "super whey 2kg", "plasma mass 3kg", "amino shot caplets", 
      "pure creatin", "pure creatine", "lean shot thermogenic",
      "bcaa recover", "glutamine x", "v-shot multivitamin", 
      "daily multi", "myogenetix concentrate", "ginseng extract"
    ];
    return products.filter((p) => {
      const isSelf = p.id === product.id;
      const cleanName = p.name ? String(p.name).toLowerCase().trim() : "";
      return !isSelf && !hiddenCatalogItems.includes(cleanName);
    }).slice(0, 4);
  }, [product.id]);

  const add = () => {
    addToCart({ slug: (product as any).slug || product.id, name: product.name, price: product.price, image: product.image }, qty);
    toast({ title: "Added to cart", description: `${qty} × ${product.name}` });
  };

  const productIngredients = (product as any).mainIngredients || (product as any).ingredients || ["Formula Specific Compounds"];
  const productBenefits = (product as any).keyBenefits || (product as any).benefits || ["Supports Performance Output", "Promotes Cellular Hydration", "Assists Structured Recovery"];
  const productFlavours = (product as any).flavours || ["Unflavored"];

  return (
    <div className="bg-[#FFFFFF] text-slate-900 min-h-screen antialiased selection:bg-slate-900 selection:text-white">
      
      {/* Dynamic Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200 py-4">
        <div className="container max-w-7xl mx-auto px-4">
          <nav className="text-[10px] flex items-center gap-1.5 uppercase tracking-widest font-black text-slate-400">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <Link to="/products" className="hover:text-slate-900 transition-colors">Products</Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-slate-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Product Section - High End E-commerce Layout */}
      <section className="py-12 md:py-16 relative overflow-hidden bg-white">
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
            {/* IMAGE GALLERY CANVAS — Left Side */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1 space-y-4">
              
              {/* Main Image Spotlight */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-10 relative overflow-hidden shadow-sm flex items-center justify-center aspect-[4/5] sm:aspect-square">
                {currentMedia.kind === "video" ? (
                  <video src={currentMedia.url} autoPlay loop muted playsInline className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <img
                    src={currentMedia.url}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply transition-all duration-500 hover:scale-[1.02]"
                  />
                )}
              </div>

              {/* Thumbnail Grid Below Main Image */}
              {gallery.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 pt-2">
                  {gallery.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        "aspect-square rounded-2xl border flex items-center justify-center p-2 transition-all duration-200 overflow-hidden bg-slate-50",
                        activeImageIndex === idx 
                          ? "border-slate-900 shadow-md ring-1 ring-slate-900 opacity-100" 
                          : "border-slate-200 hover:border-slate-400 opacity-60 hover:opacity-100"
                      )}
                    >
                      {item.kind === "video" ? (
                        <video src={item.url} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <img src={item.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PRODUCT META DETAILS — Right Side (Sticky Layout) */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2 lg:pl-6 space-y-8 lg:sticky lg:top-28 self-start">
              
              <div className="space-y-4 border-b border-slate-100 pb-8">
                {/* Rating Badge */}
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center gap-0.5 px-2 py-0.5 rounded border bg-amber-50 border-amber-200 shadow-sm">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  </div>
                  <span className="font-mono font-bold text-slate-500">{product.reviews} Reviews</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.95] text-slate-900">
                  {product.name}
                </h1>
                
                {/* Pricing Blocks */}
                <div className="flex items-baseline gap-4 pt-2">
                  <span className="text-4xl font-black tracking-tight text-slate-900 font-mono">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-lg line-through font-bold text-slate-400 font-mono">
                    ₹{product.mrp.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider border text-emerald-700 bg-emerald-50 border-emerald-200 transform -translate-y-1">
                    Save {product.mrp > product.price ? Math.round((1 - product.price / product.mrp) * 100) : 0}%
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Taxes included. Free shipping available.</p>
              </div>

              {/* Clinical Benefits Checklist */}
              <div className="space-y-3 pt-2">
                <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-lg mb-4">{product.tagline} {product.description}</p>
                {productBenefits.slice(0, 4).map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-sm font-bold text-slate-800">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Flavor Options Matrix */}
              <div className="space-y-3 pt-6 border-t border-slate-100">
                <span className="text-[10px] uppercase font-black tracking-[0.15em] text-slate-400 block">Select Flavour</span>
                <div className="flex flex-wrap gap-2.5">
                  {productFlavours.map((flavour, i) => (
                    <span key={flavour} className={cn(
                      "text-xs px-4 py-2.5 rounded-xl font-bold border transition-colors cursor-pointer select-none",
                      i === 0 ? "bg-slate-900 border-slate-900 text-white shadow-md" : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400"
                    )}>
                      {flavour}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add to Cart Control Deck */}
              <div className="pt-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Quantity */}
                  <div className="flex items-center justify-between border rounded-xl p-1 shrink-0 h-14 border-slate-300 bg-white w-full sm:w-32 shadow-sm">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-mono font-black text-base text-slate-900">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="p-3 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Add Button */}
                  <Button onClick={add} size="lg" className="bg-orange-600 hover:bg-orange-700 text-white flex-1 font-black uppercase tracking-widest text-xs h-14 rounded-xl shadow-lg shadow-orange-600/20 transition-all">
                    Add to Cart — ₹{(product.price * qty).toLocaleString()}
                  </Button>
                </div>
                
                {/* Checkout Button */}
                <Button asChild variant="outline" size="lg" className="w-full font-black uppercase tracking-wider text-xs h-14 rounded-xl border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-900 shadow-sm transition-all">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>

                <div className="flex items-center justify-center gap-2 pt-2 text-xs font-bold text-slate-500 bg-slate-50 py-3 rounded-xl border border-slate-200">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> Backed By Our 100% Purity Guarantee
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Info Sections Below */}
      <section className="py-20 bg-slate-50/50 relative border-t border-slate-200">
        <div className="container max-w-6xl mx-auto px-4 space-y-24">

          {/* Ingredients Breakdown */}
          {productIngredients.length > 0 && (
            <div data-scroll-section data-scroll-index="1" className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900">Ingredients Matrix</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {productIngredients.map((ingredient, idx) => (
                    <div key={ingredient} className="flex items-center justify-between p-4 rounded-xl border bg-white border-slate-200 shadow-sm transition-all duration-300 group/item">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="h-7 w-7 rounded-lg text-xs font-mono font-black flex items-center justify-center shrink-0 bg-slate-100 border border-slate-200 text-slate-800">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="font-bold text-sm truncate text-slate-700">{ingredient}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm order-1 lg:order-2 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Usage Protocol</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{product.howToUse || "Mix one serving with 250ml water and consume immediately."}</p>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Store in cool, dry environment.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 border-t border-slate-200 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8 text-slate-900 text-center">Frequently Bought With</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Buy Bottom Bar (Mobile Only) */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden backdrop-blur-xl border-t p-4 flex items-center justify-between gap-4 bg-white/90 border-slate-200 shadow-2xl pb-safe">
        <div>
          <span className="text-[10px] uppercase tracking-widest block font-bold text-slate-400">Total Price</span>
          <p className="font-black text-xl text-slate-900 font-mono">₹{(product.price * qty).toLocaleString()}</p>
        </div>
        <Button onClick={add} className="bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-wider text-xs h-12 px-8 rounded-xl shadow-md">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;