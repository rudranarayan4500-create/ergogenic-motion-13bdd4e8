import { PageHero } from "@/components/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Support = () => (
  <>
    <PageHero eyebrow="Support" title="Shipping, returns & policies" subtitle="Everything you need to know about ordering, delivery and support." />
    <section className="py-16">
      <div className="container max-w-3xl space-y-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Shipping</h2>
          <p className="text-white/75">All orders dispatch within 24 hours of confirmation. Standard delivery across India is 2–4 business days. Free shipping on orders above ₹999. Express delivery available at checkout.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Returns</h2>
          <p className="text-white/75">Sealed, unopened products can be returned within 7 days of delivery for a full refund. For hygiene reasons, opened or used products cannot be returned. Damaged-in-transit items are replaced free of charge — please share an unboxing photo within 48 hours.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Customer Support</h2>
          <p className="text-white/75">Our team is available Monday to Saturday, 10am to 7pm IST. Email support@ergogenic.in or call +91 98765 43210. We typically reply within a few hours.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">FAQ</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {[
              ["Do you ship internationally?", "Currently we ship across India. International shipping is coming soon."],
              ["Can I track my order?", "Yes — once dispatched you'll receive a tracking link via SMS and email."],
              ["What payment methods are supported?", "UPI (Scan QR, GPay, PhonePe, Paytm), all major credit/debit cards, net banking, and popular wallets. Cash on Delivery is not offered — all orders are prepaid."],
              ["Are your products vegetarian?", "Most of our protein products are made with whey from vegetarian sources. Check individual product pages for specifics."],
            ].map(([q, a], i) => (
              <AccordionItem key={i} value={`s${i}`} className="bg-card border border-white/10 rounded-xl px-5">
                <AccordionTrigger className="text-left">{q}</AccordionTrigger>
                <AccordionContent className="text-white/70">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  </>
);

export default Support;