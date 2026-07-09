import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { addToCart } from "@/lib/cart";
import { toast } from "@/hooks/use-toast";

export const ProductCard = ({ p }: { p: Product }) => {
  const dynamicSlugRoute = p.slug || p.id;
  const outOfStock = (p as any).in_stock === false;

  return (
    <div className="group bg-card text-card-foreground rounded-xl overflow-hidden border border-border hover-lift flex flex-col justify-between">
      <div>
        <Link to={`/products/${dynamicSlugRoute}`} className="block aspect-[4/5] overflow-hidden bg-slate-50 border-b border-slate-100 relative flex items-center justify-center">
          {outOfStock && (
            <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded shadow">
              Out of stock
            </span>
          )}
          <img
            src={p.image}
            alt={p.name}
            className={`h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none ${outOfStock ? "opacity-50 grayscale" : ""}`}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80";
            }}
          />
        </Link>
        <div className="p-5 text-left space-y-1">
          <h3 className="font-black text-base tracking-tight text-slate-800 line-clamp-1">
            <Link to={`/products/${dynamicSlugRoute}`} className="hover:text-primary transition-colors">{p.name}</Link>
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed h-8">{p.tagline}</p>
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="text-left">
            <span className="text-base font-black text-slate-900 font-mono">₹{p.price.toLocaleString()}</span>
            <span className="ml-2 text-xs font-medium text-slate-400 line-through font-mono">₹{p.mrp.toLocaleString()}</span>
          </div>
          <Button
            size="sm"
            disabled={outOfStock}
            className="bg-slate-900 text-white hover:bg-slate-800 font-black uppercase tracking-wider text-[11px] rounded-lg px-4 h-9 shadow-sm disabled:bg-slate-300 disabled:cursor-not-allowed"
            onClick={(e) => {
              e.preventDefault();
              if (outOfStock) return;
              addToCart({ slug: dynamicSlugRoute, name: p.name, price: p.price, image: p.image });
              toast({ title: "Added to cart", description: p.name });
            }}
          >
            {outOfStock ? "Sold Out" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};