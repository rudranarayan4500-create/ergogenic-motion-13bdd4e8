import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Contact = () => {
  const [busy, setBusy] = useState(false);
  const [cbBusy, setCbBusy] = useState(false);
  const [cbTime, setCbTime] = useState("Anytime");
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to our team" subtitle="Questions about products, orders or stacking advice — we usually reply within a few hours." />
      <section className="py-20">
        <div className="container grid lg:grid-cols-3 gap-10">
          <div className="space-y-6">
            {[
              { i: Phone, t: "Phone", d: "+91 82880 01279", s: "Mon-Sat, 10am – 7pm IST" },
              { i: Mail, t: "Email", d: "info@ergogenic-nutrition.com", s: "We reply within 24 hours" },
              { i: MapPin, t: "Address", d: "Bulk Powders Nutraceuticals Private Limited VILLAGE SOHIAN KALAN, FATEHGARH CHURIAN MAIN ROAD, TEHSIL MAJITHA, DISTRICT AMRITSAR, Punjab, India - 143601." },
            ].map((c) => (
              <div key={c.t} className="flex gap-4 p-5 bg-card border border-border rounded-xl">
                <div className="h-11 w-11 rounded-lg bg-primary/15 grid place-items-center text-primary shrink-0">
                  <c.i className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{c.t}</p>
                  <p className="text-foreground mt-1">{c.d}</p>
                  <p className="text-xs text-muted-foreground mt-1">{c.s}</p>
                </div>
              </div>
            ))}
          </div>
          <form
            className="lg:col-span-2 p-8 bg-card border border-border rounded-xl space-y-5"
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              const form = e.currentTarget;
              const fd = new FormData(form);
              const { error } = await supabase.from("contact_messages").insert({
                name: fd.get("name") as string,
                email: fd.get("email") as string,
                subject: fd.get("subject") as string,
                message: fd.get("message") as string,
              });
              setBusy(false);
              if (error) toast({ title: "Failed to send", description: error.message, variant: "destructive" });
              else { toast({ title: "Message sent", description: "We'll get back to you shortly." }); form.reset(); }
            }}
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <Label>Name</Label>
                <Input name="name" required className="mt-1.5 bg-background border-border" placeholder="Your name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input name="email" required type="email" className="mt-1.5 bg-background border-border" placeholder="you@email.com" />
              </div>
            </div>
            <div>
              <Label>Subject</Label>
              <Input name="subject" required className="mt-1.5 bg-background border-border" placeholder="How can we help?" />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea name="message" required rows={6} className="mt-1.5 bg-background border-border" placeholder="Tell us about your goal..." />
            </div>
            <Button disabled={busy} type="submit" size="lg" className="bg-primary hover:bg-primary/90 shadow-glow">{busy ? "Sending…" : "Send Message"}</Button>
          </form>
        </div>
      </section>

      {/* CALLBACK */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.4em] text-primary mb-3">CALLBACK</p>
            <h2 className="text-3xl md:text-4xl font-bold">Request a Callback</h2>
            <p className="mt-3 text-muted-foreground">Fill out the form below and our team will contact you shortly.</p>
          </div>
          <form
            className="p-8 bg-card border border-border rounded-xl space-y-5"
            onSubmit={async (e) => {
              e.preventDefault();
              setCbBusy(true);
              const form = e.currentTarget;
              const fd = new FormData(form);
              const { error } = await supabase.from("callbacks").insert({
                name: fd.get("name") as string,
                email: fd.get("email") as string,
                phone: fd.get("phone") as string,
                preferred_time: cbTime,
              });
              setCbBusy(false);
              if (error) toast({ title: "Couldn't request callback", description: error.message, variant: "destructive" });
              else { toast({ title: "Callback requested", description: "We'll reach out within your preferred window." }); form.reset(); }
            }}
          >
            <div>
              <Label>Full Name *</Label>
              <Input name="name" required className="mt-1.5" placeholder="John Doe" />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <Label>Email *</Label>
                <Input name="email" type="email" required className="mt-1.5" placeholder="gmail@example.com" />
              </div>
              <div>
                <Label>Phone Number *</Label>
                <Input name="phone" required className="mt-1.5" placeholder="Enter Your Phone Number" />
              </div>
            </div>
            <div>
              <Label>Preferred Time Window</Label>
              <Select value={cbTime} onValueChange={setCbTime}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Anytime">Anytime</SelectItem>
                  <SelectItem value="Morning (9am - 12pm)">Morning (9am - 12pm)</SelectItem>
                  <SelectItem value="Afternoon (12pm - 4pm)">Afternoon (12pm - 4pm)</SelectItem>
                  <SelectItem value="Evening (4pm - 7pm)">Evening (4pm - 7pm)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button disabled={cbBusy} type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 shadow-glow">
              {cbBusy ? "Submitting…" : "Request Callback"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;