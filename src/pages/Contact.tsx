import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to our team" subtitle="Questions about products, orders or stacking advice — we usually reply within a few hours." />
      <section className="py-20">
        <div className="container grid lg:grid-cols-3 gap-10">
          <div className="space-y-6">
            {[
              { i: Phone, t: "Phone", d: "+91 98765 43210", s: "Mon-Sat, 10am – 7pm IST" },
              { i: Mail, t: "Email", d: "support@ergogenic.in", s: "We reply within 24 hours" },
              { i: MapPin, t: "Address", d: "Sector 18, Gurugram, India", s: "HQ & Fulfilment Center" },
            ].map((c) => (
              <div key={c.t} className="flex gap-4 p-5 bg-card border border-white/10 rounded-xl">
                <div className="h-11 w-11 rounded-lg bg-primary/15 grid place-items-center text-primary shrink-0">
                  <c.i className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{c.t}</p>
                  <p className="text-white/85 mt-1">{c.d}</p>
                  <p className="text-xs text-white/50 mt-1">{c.s}</p>
                </div>
              </div>
            ))}
          </div>
          <form
            className="lg:col-span-2 p-8 bg-card border border-white/10 rounded-xl space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              toast({ title: "Message sent", description: "We'll get back to you shortly." });
              (e.target as HTMLFormElement).reset();
            }}
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <Label>Name</Label>
                <Input required className="mt-1.5 bg-background border-white/15" placeholder="Your name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input required type="email" className="mt-1.5 bg-background border-white/15" placeholder="you@email.com" />
              </div>
            </div>
            <div>
              <Label>Subject</Label>
              <Input required className="mt-1.5 bg-background border-white/15" placeholder="How can we help?" />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea required rows={6} className="mt-1.5 bg-background border-white/15" placeholder="Tell us about your goal..." />
            </div>
            <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 shadow-glow">Send Message</Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;