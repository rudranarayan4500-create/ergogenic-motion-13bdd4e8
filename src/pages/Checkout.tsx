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

  // Revalidate every item's price against the DB
  useEffect(() => {
    (async () => {
      if (!items.length) { setPriced([]); return; }
      
      const identifiers = items.map((i) => i.slug);
      
      // FIX: Separate UUIDs from normal text slugs so Postgres doesn't throw an error
      const uuids = identifiers.filter(id => id.length === 36 && id.includes('-'));
      const slugs = identifiers.filter(id => !uuids.includes(id));

      let dbItems: any[] = [];

      // Fetch by text slug
      if (slugs.length > 0) {
        const { data } = await supabase.from("products").select("id,slug,name,price,image,in_stock,active").in("slug", slugs);
        if (data) dbItems = [...dbItems, ...data];
      }
      
      // Fetch by UUID
      if (uuids.length > 0) {
        const { data } = await supabase.from("products").select("id,slug,name,price,image,in_stock,active").in("id", uuids);
        if (data) dbItems = [...dbItems, ...data];
      }

      // Map both slug and ID so the cart item always finds its live DB match
      const dbMap = new Map();
      dbItems.forEach(p => {
        dbMap.set(p.slug, p);
        dbMap.set(p.id, p);
      });

      const merged = items
        .map((i) => {
          const db = dbMap.get(i.slug);
          if (!db || db.active === false || db.in_stock === false) return null;
          // strictly forces the live database price into the checkout
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
      // 1. Save the order to your Supabase SQL database first (Status: Created)
      const { data: order, error } = await supabase.from("orders").insert({
        user_id: user.id, 
        total, 
        status: "created", 
        shipping,
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

      // 2. Open Razorpay Window
      const Razorpay = (window as any).Razorpay;
      if (!Razorpay) throw new Error("Razorpay SDK not loaded. Check your internet connection.");
      
      const options = {
        // Your exact live key is added right here!
        key: "rzp_live_mrY8DTan2XlmdQ", 
        amount: total * 100, // Razorpay needs the amount in paise
        currency: "INR",
        name: "Ergogenic Nutrients",
        description: `Order #${order.id.slice(0, 8)}`,
        image: "/favicon.png",
        
        prefill: {
          name: `${shipping.first_name ?? ""} ${shipping.last_name ?? ""}`.trim(),
          email: shipping.email ?? user.email ?? "",
          contact: shipping.phone ?? "",
        },
        notes: { order_id: order.id }, // Passing your DB order ID in the notes
        theme: { color: "#2563EB" }, // Blue UI theme
        method: pay === "upi" ? { upi: true, card: false, netbanking: false, wallet: false } : undefined,
        
        handler: async (resp: any) => {
          // 3. Update your SQL database when payment succeeds
          await supabase.from("orders").update({
            status: "paid",
            razorpay_payment_id: resp.razorpay_payment_id,
          }).eq("id", order.id);
          
          setPaid(resp.razorpay_payment_id);
          setCart([]); // Clear the cart
          toast({ title: "Payment successful", description: `Order confirmed.` });
        },
        modal: {
          ondismiss: () => {
            setBusy(false);
            toast({ title: "Payment cancelled", description: "You closed the payment window.", variant: "destructive" });
          },
        },
      };
      
      const rzp = new Razorpay(options);
      rzp.on("payment.failed", (resp: any) => {
        setBusy(false);
        toast({ title: "Payment failed", description: resp.error?.description ?? "Transaction declined. Try again.", variant: "destructive" });
      });
      rzp.open();
    } catch (err: any) {
      toast({ title: "Checkout failed", description: err.message, variant: "destructive" });
      setBusy(false);
    }
  };

  if (paid) return (
    <div className="bg-white min-h-screen">
      <PageHero eyebrow="Confirmed" title="Payment successful" subtitle="Your payment has been securely captured and saved." />
      <section className="py-20"><div className="container max-w-lg text-center space-y-4">
        <div className="bg-white border-2 border-blue-500 rounded-xl p-8 shadow-sm">
          <ShieldCheck className="h-12 w-12 mx-auto text-blue-600" />
          <p className="text-gray-500 mt-3 text-sm">Transaction / Payment ID</p>
          <p className="font-mono text-gray-900 font-medium">{paid}</p>
          <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => nav("/products")}>Continue shopping</Button>
        </div>
      </div></section>
    </div>
  );

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <PageHero eyebrow="Checkout" title="Complete your order" />
      <section className="py-16">
        <form className="container grid lg:grid-cols-3 gap-10" onSubmit={placeOrder}>
          <div className="lg:col-span-2 space-y-8">
            <div className="p-7 bg-white border-2 border-blue-500 shadow-sm rounded-xl space-y-4">
              <h3 className="font-bold text-lg text-gray-900">Shipping Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label className="text-gray-700">First Name</Label><Input name="first_name" required className="mt-1.5 bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900" /></div>
                <div><Label className="text-gray-700">Last Name</Label><Input name="last_name" required className="mt-1.5 bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900" /></div>
                <div><Label className="text-gray-700">Email</Label><Input name="email" required type="email" defaultValue={user?.email ?? ""} className="mt-1.5 bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900" /></div>
                <div><Label className="text-gray-700">Phone</Label><Input name="phone" required className="mt-1.5 bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900" /></div>
                <div className="md:col-span-2"><Label className="text-gray-700">Address</Label><Input name="address" required className="mt-1.5 bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900" /></div>
                <div><Label className="text-gray-700">City</Label><Input name="city" required className="mt-1.5 bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900" /></div>
                <div><Label className="text-gray-700">Pincode</Label><Input name="pincode" required className="mt-1.5 bg-white border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900" /></div>
              </div>
            </div>
            <div className="p-7 bg-white border-2 border-blue-500 shadow-sm rounded-xl">
              <h3 className="font-bold text-lg mb-1 text-gray-900">Payment Method</h3>
              <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                Secure, encrypted checkout powered by Razorpay.
              </p>
              <RadioGroup value={pay} onValueChange={setPay} className="space-y-3">
                {[
                  { v: "upi", l: "UPI (GPay, PhonePe, Paytm)", i: Smartphone },
                  { v: "card", l: "Credit / Debit Card", i: CreditCard },
                ].map((o) => (
                  <Label key={o.v} className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${pay === o.v ? "border-blue-600 bg-blue-50 text-blue-900" : "border-blue-300 bg-white text-gray-700 hover:border-blue-400"}`}>
                    <RadioGroupItem value={o.v} />
                    <o.i className={`h-4 w-4 ${pay === o.v ? "text-blue-600" : "text-gray-500"}`} />
                    <span>{o.l}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </div>
          <aside className="bg-white border-2 border-blue-500 shadow-sm rounded-xl p-6 h-fit space-y-4">
            <h3 className="font-bold text-lg text-gray-900">Order Summary</h3>
            <div className="space-y-2 text-sm max-h-52 overflow-y-auto pr-1">
              {priced.length === 0 && <p className="text-gray-500 text-xs">Your cart is empty.</p>}
              {priced.map((i) => (
                <div key={i.slug} className="flex justify-between gap-2 text-gray-800">
                  <span className="truncate">{i.name} × {i.qty}</span>
                  <span className="font-mono font-medium">₹{(i.price * i.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm text-gray-800">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-medium">₹{total.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="font-medium text-green-600">FREE</span></div>
              <div className="flex justify-between text-lg font-bold border-t border-blue-200 pt-3 mt-3 text-gray-900"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            </div>
            <Button disabled={busy || total <= 0} type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 shadow-sm text-white">{busy ? "Processing payment…" : `Pay ₹${total.toLocaleString()}`}</Button>
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5 mt-2"><ShieldCheck className="h-3.5 w-3.5" /> Order &amp; payment stored securely.</p>
          </aside>
        </form>
      </section>
    </div>
  );
};

export default Checkout;