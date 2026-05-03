import { useState } from "react";
import { CreditCard, Smartphone, Truck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const [pay, setPay] = useState("upi");
  return (
    <>
      <PageHero eyebrow="Checkout" title="Complete your order" />
      <section className="py-16">
        <form
          className="container grid lg:grid-cols-3 gap-10"
          onSubmit={(e) => {
            e.preventDefault();
            toast({ title: "Order placed", description: "Thank you! A confirmation has been sent to your email." });
          }}
        >
          <div className="lg:col-span-2 space-y-8">
            <div className="p-7 bg-card border border-white/10 rounded-xl space-y-4">
              <h3 className="font-bold text-lg">Shipping Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>First Name</Label><Input required className="mt-1.5 bg-background border-white/15" /></div>
                <div><Label>Last Name</Label><Input required className="mt-1.5 bg-background border-white/15" /></div>
                <div><Label>Email</Label><Input required type="email" className="mt-1.5 bg-background border-white/15" /></div>
                <div><Label>Phone</Label><Input required className="mt-1.5 bg-background border-white/15" /></div>
                <div className="md:col-span-2"><Label>Address</Label><Input required className="mt-1.5 bg-background border-white/15" /></div>
                <div><Label>City</Label><Input required className="mt-1.5 bg-background border-white/15" /></div>
                <div><Label>Pincode</Label><Input required className="mt-1.5 bg-background border-white/15" /></div>
              </div>
            </div>
            <div className="p-7 bg-card border border-white/10 rounded-xl">
              <h3 className="font-bold text-lg mb-4">Payment Method</h3>
              <RadioGroup value={pay} onValueChange={setPay} className="space-y-3">
                {[
                  { v: "upi", l: "UPI", i: Smartphone },
                  { v: "card", l: "Credit / Debit Card", i: CreditCard },
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
              <div className="flex justify-between"><span className="text-white/60">Subtotal</span><span>₹6,398</span></div>
              <div className="flex justify-between"><span className="text-white/60">Shipping</span><span>FREE</span></div>
              <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-3 mt-3"><span>Total</span><span>₹6,398</span></div>
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 shadow-glow">Place Order</Button>
          </aside>
        </form>
      </section>
    </>
  );
};

export default Checkout;