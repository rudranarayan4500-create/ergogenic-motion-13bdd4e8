import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { getCart, setCart, type CartItem } from "@/lib/cart";

const Checkout = () => {
  const [pay, setPay] = useState("upi");
  const [busy, setBusy] = useState(false);
  const [paid, setPaid] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [priced, setPriced] = useState<CartItem[]>([]);

  useEffect(() => { setItems(getCart()); }, []);

  // Revalidate every item's price against the DB (source of truth).
  useEffect(() => {
    (async () => {
      if (!items.length) { setPriced([]); return; }
      const slugs = items.map((i) => i.slug);
      const { data } = await supabase.from("products").select("slug,name,price,image,in_stock,active").in("slug", slugs);
      const bySlug = new Map((data ?? []).map((p: any) => [p.slug, p]));
      const merged = items
        .map((i) => {
          const db = bySlug.get(i.slug);
          if (!db || db.active === false || db.in_stock === false) return null;
          return { ...i, name: db.name ?? i.name, image: db.image ?? i.image, price: Number(db.price) };
        })
        .filter(Boolean) as CartItem[];
      setPriced(merged);
    })();
  }, [items]);

  const total = useMemo(
    () => priced.reduce((s, i) => s + (Number(i.price) || 0) * (Number(i.qty) || 0), 0),
    [priced]
  );

  useEffect(() => { if (!loading && !user) nav("/auth"); }, [user, loading, nav]);

  const placeOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    if (!priced.length || total <= 0) {
      toast({ title: "Cart is empty", description: "Add products before checking out.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const shipping: Record<string, string> = {};
    fd.forEach((v, k) => { shipping[k] = String(v); });
    try {
      const fakeRzpOrderId = `order_TEST_${Math.random().toString(36).slice(2, 12)}`;
      const { data: order, error } = await supabase.from("orders").insert({
        user_id: user.id, total, status: "created", razorpay_order_id: fakeRzpOrderId, shipping,
      }).select().single();
      if (error) throw error;

      await supabase.from("order_items").insert(
        priced.map((i) => ({
          order_id: order.id,
          product_slug: i.slug,
          name: i.name,
          qty: i.qty,
          price: i.price,
        }))
      );

      // Razorpay real test checkout
      const Razorpay = (window as any).Razorpay;
      if (!Razorpay) throw new Error("Razorpay SDK not loaded. Refresh and try again.");
      const options = {
        key: "rzp_test_1DP5mmOlF5G5ag", // public Razorpay TEST key
        amount: total * 100,
        currency: "INR",
        name: "Ergogenic Nutrients",
        description: `Order #${order.id.slice(0, 8)}`,
        image: "/favicon.png",
        prefill: {
          name: `${shipping.first_name ?? ""} ${shipping.last_name ?? ""}`.trim(),
          email: shipping.email ?? user.email ?? "",
          contact: shipping.phone ?? "",
        },
        notes: { order_id: order.id },
        theme: { color: "#E50914" },
        method: pay === "upi" ? { upi: true, card: false, netbanking: false, wallet: false } : undefined,
        handler: async (resp: any) => {
          await supabase.from("orders").update({
            status: "paid",
            razorpay_payment_id: resp.razorpay_payment_id,
          }).eq("id", order.id);
          setPaid(resp.razorpay_payment_id);
          setCart([]);
          toast({ title: "Payment successful (test mode)", description: `Order #${order.id.slice(0, 8)} confirmed.` });
        },
        modal: {
          ondismiss: () => {
            setBusy(false);
            toast({ title: "Payment cancelled", description: "You closed the checkout.", variant: "destructive" });
          },
        },
      };
      const rzp = new Razorpay(options);
      rzp.on("payment.failed", (resp: any) => {
        setBusy(false);
        toast({ title: "Payment failed", description: resp.error?.description ?? "Try again.", variant: "destructive" });
      });
      rzp.open();
    } catch (err: any) {
      toast({ title: "Checkout failed", description: err.message, variant: "destructive" });
      setBusy(false);
    }
  };

  if (paid) return (
    <>
      <PageHero eyebrow="Confirmed" title="Payment successful" subtitle="Test-mode Razorpay payment captured and saved." />
      <section className="py-20"><div className="container max-w-lg text-center space-y-4">
        <div className="bg-card border border-white/10 rounded-xl p-8">
          <ShieldCheck className="h-12 w-12 mx-auto text-primary" />
          <p className="text-white/60 mt-3 text-sm">Razorpay Payment ID</p>
          <p className="font-mono">{paid}</p>
          <Button className="mt-6 bg-primary hover:bg-primary/90" onClick={() => nav("/products")}>Continue shopping</Button>
        </div>
      </div></section>
    </>
  );

  return (
    <>
      <PageHero eyebrow="Checkout" title="Complete your order" />
      <section className="py-16">
        <form className="container grid lg:grid-cols-3 gap-10" onSubmit={placeOrder}>
          <div className="lg:col-span-2 space-y-8">
            <div className="p-7 bg-card border border-white/10 rounded-xl space-y-4">
              <h3 className="font-bold text-lg">Shipping Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>First Name</Label><Input name="first_name" required className="mt-1.5 bg-background border-white/15" /></div>
                <div><Label>Last Name</Label><Input name="last_name" required className="mt-1.5 bg-background border-white/15" /></div>
                <div><Label>Email</Label><Input name="email" required type="email" defaultValue={user?.email ?? ""} className="mt-1.5 bg-background border-white/15" /></div>
                <div><Label>Phone</Label><Input name="phone" required className="mt-1.5 bg-background border-white/15" /></div>
                <div className="md:col-span-2"><Label>Address</Label><Input name="address" required className="mt-1.5 bg-background border-white/15" /></div>
                <div><Label>City</Label><Input name="city" required className="mt-1.5 bg-background border-white/15" /></div>
                <div><Label>Pincode</Label><Input name="pincode" required className="mt-1.5 bg-background border-white/15" /></div>
              </div>
            </div>
            <div className="p-7 bg-card border border-white/10 rounded-xl">
              <h3 className="font-bold text-lg mb-1">Payment Method</h3>
              <p className="text-xs text-white/50 mb-4">Razorpay running in <span className="text-primary font-semibold">TEST mode</span> — no real money is charged.</p>
              <RadioGroup value={pay} onValueChange={setPay} className="space-y-3">
                {[
                  { v: "upi", l: "UPI (Razorpay test)", i: Smartphone },
                  { v: "card", l: "Card via Razorpay (test 4111 1111 1111 1111)", i: CreditCard },
                ].map((o) => (
                  <Label key={o.v} className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${pay === o.v ? "border-primary bg-primary/5" : "border-white/15"}`}>
                    <RadioGroupItem value={o.v} />
                    <o.i className="h-4 w-4" />
                    <span>{o.l}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </div>
          <aside className="bg-card border border-white/10 rounded-xl p-6 h-fit space-y-4">
            <h3 className="font-bold text-lg">Order Summary</h3>
            <div className="space-y-2 text-sm max-h-52 overflow-y-auto pr-1">
              {priced.length === 0 && <p className="text-white/50 text-xs">Your cart is empty.</p>}
              {priced.map((i) => (
                <div key={i.slug} className="flex justify-between gap-2">
                  <span className="text-white/70 truncate">{i.name} × {i.qty}</span>
                  <span className="font-mono">₹{(i.price * i.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/60">Subtotal</span><span>₹{total.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-white/60">Shipping</span><span>FREE</span></div>
              <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-3 mt-3"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            </div>
            <Button disabled={busy || total <= 0} type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 shadow-glow">{busy ? "Processing payment…" : `Pay ₹${total.toLocaleString()} with Razorpay`}</Button>
            <p className="text-xs text-white/40 flex items-center gap-1.5"><ShieldCheck className="h-3 w-3" /> Order &amp; payment stored securely on server.</p>
          </aside>
        </form>
      </section>
    </>
  );
};

export default Checkout;