import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

const Cart = () => {
  const [items, setItems] = useState(
    products.slice(0, 2).map((p) => ({ ...p, qty: 1 }))
  );
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 999 ? 0 : 49;
  const total = subtotal + shipping;

  const update = (id: string, delta: number) =>
    setItems((p) => p.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));

  return (
    <>
      <PageHero eyebrow="Cart" title="Your cart" />
      <section className="py-16">
        <div className="container grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 && (
              <div className="p-12 text-center bg-card border border-white/10 rounded-xl">
                <p className="text-white/70">Your cart is empty.</p>
                <Button asChild className="mt-5 bg-primary hover:bg-primary/90"><Link to="/products">Shop products</Link></Button>
              </div>
            )}
            {items.map((i) => (
              <div key={i.id} className="flex gap-4 p-4 bg-card border border-white/10 rounded-xl">
                <img src={i.image} alt={i.name} className="h-24 w-24 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-semibold">{i.name}</p>
                  <p className="text-xs text-white/60">{i.category}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center border border-white/15 rounded-lg">
                      <button onClick={() => update(i.id, -1)} className="px-2 py-1"><Minus className="h-3 w-3" /></button>
                      <span className="w-8 text-center text-sm">{i.qty}</span>
                      <button onClick={() => update(i.id, 1)} className="px-2 py-1"><Plus className="h-3 w-3" /></button>
                    </div>
                    <button onClick={() => remove(i.id)} className="text-white/50 hover:text-primary text-sm flex items-center gap-1"><Trash2 className="h-3 w-3" /> Remove</button>
                  </div>
                </div>
                <p className="font-bold">₹{(i.price * i.qty).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <aside className="bg-card border border-white/10 rounded-xl p-6 h-fit space-y-4">
            <h3 className="font-bold text-lg">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/60">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-white/60">Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
              <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-3 mt-3"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            </div>
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90"><Link to="/checkout">Checkout</Link></Button>
          </aside>
        </div>
      </section>
    </>
  );
};

export default Cart;