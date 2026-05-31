import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Bell } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { calculateShipping } from "@/lib/utils";

export const Cart = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBellRinging, setIsBellRinging] = useState(false); // Trigger handle for shaking notification matrix
  const { user, loading: authLoading } = useAuth();
  const nav = useNavigate();

  // Fetch real-time user cart contents from database schema collections
  const loadCart = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          id,
          qty,
          product_id,
          products (
            id,
            name,
            slug,
            price,
            image,
            category
          )
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      setItems(data ?? []);
    } catch (err: any) {
      toast({
        title: "Cart syncing failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        nav("/auth");
      } else {
        loadCart();
      }
    }
  }, [user, authLoading]);

  // Dynamic calculation tracking total item allocation instances loaded inside the matrix hook
  const totalItemCount = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.qty ?? 0), 0);
  }, [items]);

  // Micro-interaction keyframe automation engine trigger handle
  const triggerNotificationShake = () => {
    setIsBellRinging(true);
    setTimeout(() => setIsBellRinging(false), 600); // Matches the exact loop parameters of the wiggle keyframe
  };

  // Adjust database values for item counts via single row updates
  const updateQty = async (itemId: string, currentQty: number, delta: number) => {
    const targetQty = currentQty + delta;
    if (targetQty < 1) return;

    // Optimistic UI state update for immediate feedback
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, qty: targetQty } : item))
    );
    
    triggerNotificationShake(); // Execute visual feedback sequence

    try {
      const { error } = await supabase
        .from("cart_items")
        .update({ qty: targetQty })
        .eq("id", itemId);

      if (error) throw error;
    } catch (err: any) {
      // Revert back if backend fails
      loadCart();
      toast({
        title: "Database update error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  // Remove rows from cart collections globally
  const removeItem = async (itemId: string) => {
    // Optimistic UI drop
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    triggerNotificationShake();

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;
      toast({ title: "Item removed from allocation" });
    } catch (err: any) {
      loadCart();
      toast({
        title: "Failed to drop allocation",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  // Live order pricing calculators
  const subtotal = items.reduce((s, i) => s + (i.products?.price ?? 0) * i.qty, 0);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  if (authLoading || loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#030303] text-white">
        <p className="text-sm tracking-widest uppercase animate-pulse text-neutral-500">
          Syncing Inventory Vectors...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#030303] text-white min-h-screen relative overflow-x-hidden antialiased">
      
      {/* Dynamic Keyframe Injection Sheet for Notification Bell Mechanics */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cyber-bell-shake {
          0% { transform: rotate(0); }
          15% { transform: rotate(15deg); }
          30% { transform: rotate(-15deg); }
          45% { transform: rotate(10deg); }
          60% { transform: rotate(-10deg); }
          75% { transform: rotate(4deg); }
          85% { transform: rotate(-4deg); }
          100% { transform: rotate(0); }
        }
        .animate-cyber-shake {
          animation: cyber-bell-shake 0.55s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}} />

      {/* Floating System Stream Header Meta Bar */}
      <div className="w-full bg-neutral-950 border-b border-white/5 py-3 relative z-30">
        <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-neutral-500 font-bold uppercase">
            <Activity className="h-3.5 w-3.5 text-primary" /> Allocation Registry Node
          </div>
          
          {/* Dynamic Shaking Notification Module */}
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer group">
              <div className={cn(
                "p-2 bg-neutral-900 border border-white/5 rounded-xl transition-all duration-300 group-hover:border-primary/20",
                isBellRinging && "animate-cyber-shake border-primary text-primary bg-primary/5"
              )}>
                <Bell className={cn("h-4 w-4 text-neutral-400 group-hover:text-white transition-colors", isBellRinging && "text-primary")} />
              </div>
              
              {/* Count Indicator Metric Badge Layer */}
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1.5 bg-primary text-black font-mono font-black text-[10px] rounded-full flex items-center justify-center border-2 border-[#030303] shadow-lg shadow-primary/20 scale-100 transition-transform animate-[pop_0.3s_ease-out]">
                  {totalItemCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <PageHero eyebrow="Inventory Allocation" title="Your Cart Stack" />
      
      <section className="py-12 relative z-10">
        <div className="container max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-10">
          
          {/* MAIN LINE-ITEMS CELL CONTAINER */}
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="p-16 text-center bg-neutral-900/20 border border-white/5 rounded-2xl shadow-xl backdrop-blur-md">
                <ShoppingBag className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Your cart is entirely unallocated</h3>
                <p className="text-neutral-400 text-sm max-w-sm mx-auto mb-6">
                  You haven't queued up any formulation configurations for checkout processing yet.
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90 h-11 px-6 rounded-xl font-bold text-black uppercase tracking-wider text-xs">
                  <Link to="/products">Explore Catalog Inventory</Link>
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-5 bg-neutral-900/40 backdrop-blur-md border border-white/5 rounded-2xl items-center shadow-lg hover:border-white/10 transition-colors"
                >
                  <img 
                    src={item.products?.image} 
                    alt={item.products?.name} 
                    className="h-20 w-20 md:h-24 md:w-24 rounded-xl object-cover border border-white/5 bg-black/40 select-none pointer-events-none" 
                  />
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-lg text-white truncate tracking-tight uppercase leading-none">
                      {item.products?.name}
                    </p>
                    <p className="text-[10px] text-primary/80 font-black uppercase tracking-widest mt-1.5">
                      {item.products?.category}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-4 flex-wrap">
                      {/* STEPPER METRIC UPDATER */}
                      <div className="flex items-center border border-white/10 bg-black/20 rounded-xl h-9">
                        <button 
                          onClick={() => updateQty(item.id, item.qty, -1)} 
                          className="px-3 text-neutral-400 hover:text-white transition-colors"
                          disabled={item.qty <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-mono font-bold text-primary">
                          {item.qty}
                        </span>
                        <button 
                          onClick={() => updateQty(item.id, item.qty, 1)} 
                          className="px-3 text-neutral-400 hover:text-white transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* TRASH DISPOSAL BUTTON */}
                      <button 
                        onClick={() => removeItem(item.id)} 
                        className="text-neutral-500 hover:text-primary text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Drop Item
                      </button>
                    </div>
                  </div>

                  <div className="text-right pl-2 shrink-0">
                    <p className="font-black text-lg font-mono text-neutral-200">
                      ₹{((item.products?.price ?? 0) * item.qty).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-neutral-500 font-medium font-mono">
                      ₹{(item.products?.price ?? 0).toLocaleString()} / unit
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* SYSTEM ACCOUNT LEDGER / SUMMARY ASIDE PANEL */}
          {items.length > 0 && (
            <aside className="bg-neutral-900/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 h-fit space-y-6 shadow-2xl xl:sticky xl:top-24">
              <h3 className="font-bold text-xl tracking-tight border-b border-white/5 pb-3 uppercase">
                Allocation Ledger
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-medium">Subtotal Valuation</span>
                  <span className="font-mono text-neutral-200 font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-medium">Logistic Despatch Rate</span>
                  <span className="font-mono text-neutral-200">
                    {shipping === 0 ? (
                      <span className="text-primary font-black text-xs uppercase tracking-widest bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">FREE</span>
                    ) : (
                      `₹${shipping.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-black border-t border-white/10 pt-4 mt-4">
                  <span className="uppercase tracking-tight">Gross Balance</span>
                  <span className="font-mono text-primary font-black text-2xl">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Button 
                asChild 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-black font-black tracking-wide text-xs uppercase h-14 rounded-xl shadow-glow"
              >
                <Link to="/checkout" className="flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight className="h-4 w-4 text-black" />
                </Link>
              </Button>
              
              <p className="text-[10px] text-neutral-500 text-center leading-relaxed font-medium">
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