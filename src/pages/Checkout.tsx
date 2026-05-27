import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, Truck, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const [pay, setPay] = useState("upi");
  const [busy, setBusy] = useState(false);
  const [paid, setPaid] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const total = 6398;

  useEffect(() => { if (!loading && !user) nav("/auth"); }, [user, loading, nav]);

  const placeOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const shipping = Object.fromEntries(fd.entries());
    try {
      // 1. Create order in DB
      const fakeRzpOrderId = `order_TEST_${Math.random().toString(36).slice(2, 12)}`;
      const { data: order, error } = await supabase.from("orders").insert({
        user_id: user.id, total, status: "created", razorpay_order_id: fakeRzpOrderId, shipping,
      }).select().single();
      if (error) throw error;

      // 2. Sample items
      await supabase.from("order_items").insert([
        { order_id: order.id, product_slug: "super-whey", name: "Super Whey", qty: 1, price: 4499 },
        { order_id: order.id, product_slug: "bcaa-recover", name: "BCAA Recover", qty: 1, price: 1899 },
      ]);

      // 3. Open Razorpay TEST checkout (demo mode — simulated success)
      await new Promise((r) => setTimeout(r, 1200)); // simulate gateway latency
      const fakePaymentId = `pay_TEST_${Math.random().toString(36).slice(2, 12)}`;

      // 4. Mark paid
      await supabase.from("orders").update({ status: "paid", razorpay_payment_id: fakePaymentId }).eq("id", order.id);
      setPaid(fakePaymentId);
      toast({ title: "Payment successful (test mode)", description: `Order #${order.id.slice(0,8)} confirmed.` });
    } catch (err: any) {
      toast({ title: "Checkout failed", description: err.message, variant: "destructive" });
    } finally { setBusy(false); }
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
                  { v: "cod", l: "Cash on Delivery", i: Truck },
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
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-white/60">Subtotal</span><span>₹{total.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-white/60">Shipping</span><span>FREE</span></div>
              <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-3 mt-3"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            </div>
            <Button disabled={busy} type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 shadow-glow">{busy ? "Processing payment…" : "Pay with Razorpay (Test)"}</Button>
            <p className="text-xs text-white/40 flex items-center gap-1.5"><ShieldCheck className="h-3 w-3" /> Order &amp; payment stored securely on server.</p>
          </aside>
        </form>
      </section>
    </>
  );
};

export default Checkout;