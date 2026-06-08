import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Bell, Activity } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { calculateShipping, cn } from "@/lib/utils";
import { getCart, updateQty as updateQtyLs, removeItem as removeItemLs, type CartItem } from "@/lib/cart";

export const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBellRinging, setIsBellRinging] = useState(false);

  const refresh = () => setItems(getCart());

  useEffect(() => {
    refresh();
    setLoading(false);
    const onChange = () => refresh();
    window.addEventListener("cart:change", onChange);
    window.addEventListener("cart:add", () => {
      setIsBellRinging(true);
      setTimeout(() => setIsBellRinging(false), 600);
    });
    return () => window.removeEventListener("cart:change", onChange);
  }, []);

  const totalItemCount = items.reduce((acc, item) => acc + (item.qty ?? 0), 0);

  const updateQty = (slug: string, currentQty: number, delta: number) => {
    const targetQty = currentQty + delta;
    if (targetQty < 1) return;
    updateQtyLs(slug, targetQty);
    setIsBellRinging(true);
    setTimeout(() => setIsBellRinging(false), 600);
    refresh();
  };

  const removeItem = (slug: string) => {
    removeItemLs(slug);
    refresh();
    toast({ title: "Item removed from cart" });
  };

  const subtotal = items.reduce((s, i) => s + (i.price ?? 0) * i.qty, 0);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white text-slate-900">
        <p className="text-sm tracking-widest uppercase animate-pulse text-slate-500 font-bold">
          Syncing Inventory Vectors...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900 min-h-screen relative overflow-x-hidden antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Dynamic Keyframe Injection Sheet for Notification Bell Mechanics */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes custom-bell-shake {
          0% { transform: rotate(0); }
          15% { transform: rotate(15deg); }
          30% { transform: rotate(-15deg); }
          45% { transform: rotate(10deg); }
          60% { transform: rotate(-10deg); }
          75% { transform: rotate(4deg); }
          85% { transform: rotate(-4deg); }
          100% { transform: rotate(0); }
        }
        .animate-bell-shake {
          animation: custom-bell-shake 0.55s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}} />

      {/* Floating System Stream Header Meta Bar */}
      <div className="w-full bg-slate-50 border-b border-slate-200 py-3 relative z-30">
        <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-500 font-black uppercase">
            <Activity className="h-3.5 w-3.5 text-blue-600" /> Allocation Registry Node
          </div>
          
          {/* Dynamic Shaking Notification Module */}
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer group">
              <div className={cn(
                "p-2 bg-white border border-slate-200 rounded-xl transition-all duration-300 group-hover:border-blue-200 shadow-sm",
                isBellRinging && "animate-bell-shake border-blue-600 text-blue-600 bg-blue-50"
              )}>
                <Bell className={cn("h-4 w-4 text-slate-600 group-hover:text-blue-600 transition-colors", isBellRinging && "text-blue-600")} />
              </div>
              
              {/* Count Indicator Metric Badge Layer */}
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1.5 bg-blue-600 text-white font-mono font-black text-[10px] rounded-full flex items-center justify-center border-2 border-white shadow-md transition-transform animate-[pop_0.3s_ease-out]">
                  {totalItemCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <PageHero eyebrow="Inventory Allocation" title="Your Cart Stack" />
      
      <section className="py-12 relative z-10 bg-white">
        <div className="container max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* MAIN LINE-ITEMS CELL CONTAINER */}
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="p-16 text-center bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
                <ShoppingBag className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Your cart is entirely unallocated</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6 font-medium">
                  You haven't queued up any formulation configurations for checkout processing yet.
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 h-11 px-6 rounded-xl font-black text-white uppercase tracking-wider text-xs shadow-md">
                  <Link to="/products">Explore Catalog Inventory</Link>
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.slug} 
                  className="flex gap-4 p-5 bg-slate-50/60 border border-slate-200 rounded-2xl items-center shadow-sm hover:border-blue-200 hover:bg-slate-50 transition-all text-left"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-20 w-20 md:h-24 md:w-24 rounded-xl object-contain p-2 border border-slate-200 bg-white shadow-inner select-none pointer-events-none" 
                  />
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-base md:text-lg text-slate-900 truncate tracking-tight uppercase leading-none">
                      {item.name}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-5 flex-wrap">
                      {/* STEPPER METRIC UPDATER */}
                      <div className="flex items-center border border-slate-300 bg-white rounded-xl h-9 shadow-sm">
                        <button 
                          onClick={() => updateQty(item.slug, item.qty, -1)} 
                          className="px-3 text-slate-400 hover:text-slate-900 transition-colors"
                          disabled={item.qty <= 1}
                        >
                          <Minus className="h-3 w-3 stroke-[3]" />
                        </button>
                        <span className="w-8 text-center text-sm font-mono font-black text-blue-600">
                          {item.qty}
                        </span>
                        <button 
                          onClick={() => updateQty(item.slug, item.qty, 1)} 
                          className="px-3 text-slate-400 hover:text-slate-900 transition-colors"
                        >
                          <Plus className="h-3 w-3 stroke-[3]" />
                        </button>
                      </div>

                      {/* TRASH DISPOSAL BUTTON */}
                      <button 
                        onClick={() => removeItem(item.slug)} 
                        className="text-slate-400 hover:text-red-600 text-xs font-black tracking-wider uppercase flex items-center gap-1.5 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Drop Item
                      </button>
                    </div>
                  </div>

                  <div className="text-right pl-2 shrink-0">
                    <p className="font-black text-base md:text-lg font-mono text-slate-900">
                      ₹{((item.price ?? 0) * item.qty).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold font-mono">
                      ₹{(item.price ?? 0).toLocaleString()} / unit
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* SYSTEM ACCOUNT LEDGER / SUMMARY ASIDE PANEL */}
          {items.length > 0 && (
            <aside className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-fit space-y-6 shadow-sm xl:sticky xl:top-24 text-left">
              <h3 className="font-black text-lg tracking-tight border-b border-slate-200 pb-3 uppercase text-slate-900">
                Allocation Ledger
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Subtotal Valuation</span>
                  <span className="font-mono text-slate-900 font-black">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Logistic Despatch</span>
                  <span className="font-mono text-slate-900">
                    {shipping === 0 ? (
                      <span className="text-blue-700 font-black text-[10px] tracking-widest bg-blue-50 border border-blue-200 px-2 py-0.5 rounded uppercase">FREE</span>
                    ) : (
                      `₹${shipping.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-black border-t border-slate-200 pt-4 mt-4 text-slate-900">
                  <span className="uppercase tracking-tight">Gross Balance</span>
                  <span className="font-mono text-blue-600 font-black text-2xl">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Button 
                asChild 
                size="lg" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black tracking-wide text-xs uppercase h-14 rounded-xl shadow-md transition-colors"
              >
                <Link to="/checkout" className="flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight className="h-4 w-4 text-white stroke-[3]" />
                </Link>
              </Button>
              
              <p className="text-[10px] text-slate-400 text-center leading-relaxed font-bold">
                Taxes and transit routing nodes calculated dynamically at verification endpoint.
              </p>
            </aside>
          )}

        </div>
      </section>
    </div>
  );
};

export default Cart;