import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, QrCode, CreditCard, Smartphone } from "lucide-react";
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

  useEffect(() => {
    (async () => {
      if (!items.length) { setPriced([]); return; }

      const identifiers = items.map((i) => i.slug);
      const uuids = identifiers.filter(id => id.length === 36 && id.includes('-'));
      const slugs = identifiers.filter(id => !uuids.includes(id));

      let dbItems: any[] = [];

      if (slugs.length > 0) {
        const { data } = await supabase.from("products").select("id,slug,name,price,image,in_stock,active").in("slug", slugs);
        if (data) dbItems = [...dbItems, ...data];
      }

      if (uuids.length > 0) {
        const { data } = await supabase.from("products").select("id,slug,name,price,image,in_stock,active").in("id", uuids);
        if (data) dbItems = [...dbItems, ...data];
      }

      const dbMap = new Map();
      dbItems.forEach(p => {
        dbMap.set(p.slug, p);
        dbMap.set(p.id, p);
      });

      const merged = items
        .map((i) => {
          const db = dbMap.get(i.slug);
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
      // Create Razorpay order + local order server-side (prices re-validated on the server)
      const { data: created, error: createErr } = await supabase.functions.invoke("razorpay-create-order", {
        body: {
          items: priced.map((i) => ({ slug: i.slug, qty: i.qty })),
          shipping,
        },
      });
      if (createErr) throw new Error(createErr.message || "Could not create order");
      if (!created?.razorpay_order_id) throw new Error(created?.error || "Order creation failed");

      const Razorpay = (window as any).Razorpay;
      if (!Razorpay) throw new Error("Razorpay SDK not loaded. Check your internet connection.");

      const options: Record<string, any> = {
        key: created.key_id,
        amount: created.amount,
        currency: created.currency,
        order_id: created.razorpay_order_id,
        name: "Ergogenic Nutrients",
        description: `Order #${String(created.local_order_id).slice(0, 8)}`,
        image: "/favicon.png",
        prefill: {
          name: `${shipping.first_name ?? ""} ${shipping.last_name ?? ""}`.trim(),
          email: shipping.email ?? user.email ?? "",
          contact: shipping.phone ?? "",
        },
        notes: { local_order_id: created.local_order_id },
        theme: { color: "#2563EB" },
        handler: async (resp: any) => {
          const { data: v, error: vErr } = await supabase.functions.invoke("razorpay-verify-payment", {
            body: {
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_signature: resp.razorpay_signature,
              local_order_id: created.local_order_id,
            },
          });
          if (vErr || !v?.ok) {
            toast({ title: "Verification failed", description: v?.error || vErr?.message || "Please contact support with your payment ID.", variant: "destructive" });
            setBusy(false);
            return;
          }
          setPaid(resp.razorpay_payment_id);
          setCart([]);
          toast({ title: "Payment successful", description: "Order confirmed." });
        },
        modal: {
          ondismiss: () => {
            setBusy(false);
            toast({ title: "Payment cancelled", description: "You closed the payment window.", variant: "destructive" });
          },
        },
      };

      // Method routing:
      //   - upi  → only UPI enabled. Razorpay auto-renders the "Scan QR"
      //            tab on desktop and the UPI ID / intent apps on mobile.
      //   - card → only card enabled.
      //   - all  → let Razorpay show every supported method.
      // COD is intentionally never offered.
      if (pay === "upi") {
        options.method = { upi: true };
      } else if (pay === "card") {
        options.method = { card: true };
      }

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
              <p className="text-xs text-gray-500 mb-5 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                Secure, encrypted checkout powered by Razorpay.
              </p>
              <RadioGroup value={pay} onValueChange={setPay} className="space-y-3">
                {[
                  {
                    v: "upi",
                    label: "UPI / QR Code",
                    sub: "GPay, PhonePe, Paytm, scanner",
                    icon: QrCode,
                  },
                  {
                    v: "card",
                    label: "Credit / Debit Card",
                    sub: "Visa, Mastercard, RuPay",
                    icon: CreditCard,
                  },
                  {
                    v: "all",
                    label: "All Payment Methods",
                    sub: "Net banking, wallets & more",
                    icon: Smartphone,
                  },
                ].map((o) => (
                  <Label
                    key={o.v}
                    className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                      pay === o.v
                        ? "border-blue-600 bg-blue-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-blue-300"
                    }`}
                  >
                    <RadioGroupItem value={o.v} />
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${pay === o.v ? "bg-blue-100" : "bg-gray-100"}`}>
                      <o.icon className={`h-5 w-5 ${pay === o.v ? "text-blue-600" : "text-gray-500"}`} />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${pay === o.v ? "text-blue-900" : "text-gray-800"}`}>{o.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{o.sub}</p>
                    </div>
                  </Label>
                ))}
              </RadioGroup>

              {pay === "upi" && (
                <div className="mt-5 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
                  <QrCode className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800 leading-relaxed">
                    After clicking Pay, Razorpay will show a <strong>QR code</strong> you can scan with any UPI app, or enter your UPI ID directly.
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="bg-white border-2 border-blue-500 shadow-sm rounded-xl p-6 h-fit space-y-4 lg:sticky lg:top-24">
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
            <Button disabled={busy || total <= 0} type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 shadow-sm text-white font-bold">
              {busy ? "Opening payment..." : `Pay ₹${total.toLocaleString()}`}
            </Button>
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5 mt-2">
              <ShieldCheck className="h-3.5 w-3.5" /> Order &amp; payment stored securely.
            </p>
          </aside>
        </form>
      </section>
    </div>
  );
};

export default Checkout;
