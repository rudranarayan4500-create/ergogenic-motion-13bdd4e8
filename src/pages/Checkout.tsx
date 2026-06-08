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
    const shipping: Record<string, string> = {};
    fd.forEach((v, k) => { shipping[k] = String(v); });
    try {
      const fakeRzpOrderId = `order_TEST_${Math.random().toString(36).slice(2, 12)}`;
      const { data: order, error } = await supabase.from("orders").insert({
        user_id: user.id, total, status: "created", razorpay_order_id: fakeRzpOrderId, shipping,
      }).select().single();
      if (error) throw error;

      await supabase.from("order_items").insert([
        { order_id: order.id, product_slug: "super-whey", name: "Super Whey", qty: 1, price: 4499 },
        { order_id: order.id, product_slug: "bcaa-recover", name: "BCAA Recover", qty: 1, price: 1899 },
      ]);

      if (pay === "cod") {
        await supabase.from("orders").update({ status: "placed" }).eq("id", order.id);
        setPaid(`COD-${order.id.slice(0, 8)}`);
        toast({ title: "Order placed", description: "Pay on delivery." });
        setBusy(false);
        return;
      }

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
        theme: { color: "#0F172A" },
        method: pay === "upi" ? { upi: true, card: false, netbanking: false, wallet: false } : undefined,
        handler: async (resp: any) => {
          await supabase.from("orders").update({
            status: "paid",
            razorpay_payment_id: resp.razorpay_payment_id,
          }).eq("id", order.id);
          setPaid(resp.razorpay_payment_id);
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
    <div className="bg-white text-slate-950 min-h-screen antialiased">
      <PageHero eyebrow="Confirmed" title="Payment successful" subtitle="Test-mode Razorpay payment captured and saved." />
      <section className="py-20 bg-white">
        <div className="container max-w-lg text-center space-y-4 mx-auto px-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm text-left">
            <ShieldCheck className="h-12 w-12 mx-auto text-slate-900 mb-4" />
            <p className="text-slate-500 text-center text-xs uppercase font-mono tracking-wider">Razorpay Payment ID</p>
            <p className="font-mono font-black text-slate-900 text-center text-sm bg-white border border-slate-200 rounded-xl p-3 mt-2 break-all">{paid}</p>
            <Button className="mt-6 w-full bg-slate-900 text-white hover:bg-slate-800 font-black uppercase tracking-wider text-xs h-12 rounded-xl" onClick={() => nav("/products")}>
              Continue shopping
            </Button>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="bg-white text-slate-900 min-h-screen antialiased selection:bg-slate-950 selection:text-white">
      <PageHero eyebrow="Checkout" title="Complete your order" />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <form className="grid grid-cols-1 lg:grid-cols-3 gap-10" onSubmit={placeOrder}>
            
            {/* Left Side fields panel container matrix */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Shipping Blocks */}
              <div className="p-7 bg-slate-50/60 border border-slate-200 rounded-2xl space-y-5 text-left shadow-sm">
                <h3 className="font-black text-lg uppercase tracking-tight text-slate-900">Shipping Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-700">First Name</Label>
                    <Input name="first_name" required className="mt-2 bg-white border-slate-900 text-slate-900 focus-visible:ring-slate-950 placeholder:text-slate-400 font-medium rounded-xl h-11 shadow-inner" />
                  </div>
                  <div>
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-700">Last Name</Label>
                    <Input name="last_name" required className="mt-2 bg-white border-slate-900 text-slate-900 focus-visible:ring-slate-950 placeholder:text-slate-400 font-medium rounded-xl h-11 shadow-inner" />
                  </div>
                  <div>
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-700">Email</Label>
                    <Input name="email" required type="email" defaultValue={user?.email ?? ""} className="mt-2 bg-white border-slate-900 text-slate-900 focus-visible:ring-slate-950 placeholder:text-slate-400 font-medium rounded-xl h-11 shadow-inner" />
                  </div>
                  <div>
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-700">Phone</Label>
                    <Input name="phone" required className="mt-2 bg-white border-slate-900 text-slate-900 focus-visible:ring-slate-950 placeholder:text-slate-400 font-medium rounded-xl h-11 shadow-inner" />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-700">Address</Label>
                    <Input name="address" required className="mt-2 bg-white border-slate-900 text-slate-900 focus-visible:ring-slate-950 placeholder:text-slate-400 font-medium rounded-xl h-11 shadow-inner" />
                  </div>
                  <div>
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-700">City</Label>
                    <Input name="city" required className="mt-2 bg-white border-slate-900 text-slate-900 focus-visible:ring-slate-950 placeholder:text-slate-400 font-medium rounded-xl h-11 shadow-inner" />
                  </div>
                  <div>
                    <Label className="text-xs font-black uppercase tracking-wider text-slate-700">Pincode</Label>
                    <Input name="pincode" required className="mt-2 bg-white border-slate-900 text-slate-900 focus-visible:ring-slate-950 placeholder:text-slate-400 font-medium rounded-xl h-11 shadow-inner" />
                  </div>
                </div>
              </div>

              {/* Payment Methods Choice Group */}
              <div className="p-7 bg-slate-50/60 border border-slate-200 rounded-2xl text-left shadow-sm">
                <h3 className="font-black text-lg uppercase tracking-tight text-slate-900 mb-1">Payment Method</h3>
                <p className="text-xs text-slate-500 mb-5 font-medium">Razorpay running in <span className="text-amber-600 font-black uppercase tracking-wide">TEST mode</span> — no real money is charged.</p>
                
                <RadioGroup value={pay} onValueChange={setPay} className="space-y-3">
                  {[
                    { v: "upi", l: "UPI", i: Smartphone },
                    { v: "card", l: "Card via Razorpay", i: CreditCard },
                    { v: "cod", l: "Cash on Delivery", i: Truck },
                  ].map((o) => (
                    <Label key={o.v} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${pay === o.v ? "border-slate-950 bg-slate-100 text-slate-950 font-bold" : "border-slate-300 text-slate-600 font-medium hover:bg-slate-50"}`}>
                      <RadioGroupItem value={o.v} className="accent-slate-950 border-slate-400" />
                      <o.i className="h-4 w-4 shrink-0 text-slate-900" />
                      <span className="text-sm">{o.l}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

            </div>

            {/* Right Side Order Sticky panel matrix elements display line */}
            <aside className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-fit space-y-5 text-left shadow-sm sticky top-24">
              <h3 className="font-black text-lg uppercase tracking-tight text-slate-900 border-b border-slate-200 pb-3">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between font-medium"><span className="text-slate-500">Subtotal</span><span className="font-mono text-slate-800">₹{total.toLocaleString()}</span></div>
                <div className="flex justify-between font-medium"><span className="text-slate-500">Shipping</span><span className="text-emerald-600 font-black text-xs uppercase tracking-wide">FREE</span></div>
                <div className="flex justify-between text-lg font-black border-t border-slate-200 pt-4 mt-4 text-slate-900"><span>Total</span><span className="font-mono">₹{total.toLocaleString()}</span></div>
              </div>
              
              <Button disabled={busy} type="submit" size="lg" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-wider text-xs h-14 rounded-xl shadow-md mt-2 transition-colors">
                {busy ? "Processing payment…" : "Pay with Razorpay (Test)"}
              </Button>
              
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium"><ShieldCheck className="h-3.5 w-3.5 text-slate-500 shrink-0" /> Order &amp; payment validation stored securely on server.</p>
            </aside>

          </form>
        </div>
      </section>
    </div>
  );
};

export default Checkout;