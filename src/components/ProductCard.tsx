import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { addToCart } from "@/lib/cart";
import { toast } from "@/hooks/use-toast";

export const ProductCard = ({ p }: { p: Product }) => (
  <div className="group bg-card text-card-foreground rounded-xl overflow-hidden border border-white/10 hover-lift">
    <Link to={`/products/${p.id}`} className="block aspect-[4/5] overflow-hidden bg-black">
      <img
        src={p.image}
        alt={p.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </Link>
    <div className="p-5">
      <div className="flex items-center gap-1 text-xs text-primary mb-1">
        <Star className="h-3 w-3 fill-primary" />
        <span>{p.rating} ({p.reviews})</span>
      </div>
      <h3 className="font-semibold text-lg leading-tight">
        <Link to={`/products/${p.id}`} className="hover:text-primary transition-colors">{p.name}</Link>
      </h3>
      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.tagline}</p>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold">₹{p.price.toLocaleString()}</span>
          <span className="ml-2 text-xs text-muted-foreground line-through">₹{p.mrp.toLocaleString()}</span>
        </div>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90"
          onClick={(e) => {
            e.preventDefault();
            addToCart({ slug: p.slug || p.id, name: p.name, price: p.price, image: p.image });
            toast({ title: "Added to cart", description: p.name });
          }}
        >
          Add
        </Button>
      </div>
    </div>
  </div>
);