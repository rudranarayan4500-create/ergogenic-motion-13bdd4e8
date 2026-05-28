import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CheckCircle2, ChevronRight, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { toast } from "@/hooks/use-toast";
import { ProductReviews } from "@/components/ProductReviews";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  if (!product) return <Navigate to="/products" replace />;
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);
  const images = [product.image, product.image, product.image];
  const [active, setActive] = useState(0);

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
            <div>
              <div className="bg-card rounded-xl overflow-hidden border border-white/10 aspect-square">
                <img src={images[active]} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${active === i ? "border-primary" : "border-white/10"}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
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

      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="benefits">
            <TabsList className="bg-card border border-white/10">
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="how">How to use</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="benefits" className="mt-6 grid md:grid-cols-2 gap-4">
              {product.benefits.map((b) => (
                <div key={b} className="flex items-start gap-3 p-5 bg-card border border-white/10 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="how" className="mt-6 p-6 bg-card border border-white/10 rounded-lg text-white/80 leading-relaxed">
              {product.howToUse}
            </TabsContent>
            <TabsContent value="ingredients" className="mt-6 p-6 bg-card border border-white/10 rounded-lg">
              <ul className="grid md:grid-cols-2 gap-3">
                {product.ingredients.map((i) => (
                  <li key={i} className="flex items-center gap-2 text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {i}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <ProductReviews slug={product.id} />
            </TabsContent>
          </Tabs>
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