import { Truck } from "lucide-react";
import { Link } from "react-router-dom";

const ShippingReturns = () => {
  return (
    <div className="min-h-screen bg-blue-50/50 py-16 md:py-24 px-4 font-sans text-slate-800 antialiased">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-sm text-blue-600 hover:text-blue-800 font-bold tracking-wide mb-8 inline-block">
          &larr; Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8 md:p-14 space-y-10">
          
          <header className="border-b border-blue-50 pb-8 space-y-4">
            <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Truck className="h-6 w-6" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
              Shipping & Returns
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed uppercase tracking-wider text-xs">
              Including Product Disclaimer
            </p>
          </header>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Shipping Policy</h2>
            <ul className="list-disc pl-5 space-y-2 font-medium">
              <li>Orders are generally processed within 1–3 business days.</li>
              <li>Delivery timelines may vary depending on destination and logistics provider.</li>
              <li>Shipping charges, if applicable, will be displayed during checkout.</li>
              <li>The Company shall not be responsible for delays caused by courier companies, natural disasters, strikes, or other events beyond our control.</li>
            </ul>
          </section>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Return & Refund Policy</h2>
            
            <h3 className="font-bold text-slate-800 mt-4">Returns</h3>
            <p>Returns may be accepted only under the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-2 font-medium">
              <li>Product received is damaged</li>
              <li>Product received is incorrect</li>
              <li>Product received is expired</li>
            </ul>
            <p className="font-medium text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100 inline-block mt-2">
              Claims must be submitted within 48 hours of delivery with supporting photographs.
            </p>

            <h3 className="font-bold text-slate-800 mt-6">Non-Returnable Products</h3>
            <p>Returns shall not be accepted for:</p>
            <ul className="list-disc pl-5 space-y-2 font-medium">
              <li>Opened products</li>
              <li>Used products</li>
              <li>Products with tampered seals</li>
              <li>Change of mind purchases</li>
            </ul>

            <h3 className="font-bold text-slate-800 mt-6">Refunds</h3>
            <p className="font-medium">Approved refunds shall be processed within 7–14 business days through the original payment method.</p>
          </section>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base bg-blue-50/50 p-6 rounded-2xl border border-blue-100 mt-8">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Nutraceutical Product Disclaimer</h2>
            <p className="font-medium">
              The information provided on this website is intended for educational and informational purposes only. Our products are not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary.
            </p>
            <p className="font-medium">
              Customers should consult a qualified healthcare professional before using any dietary supplement, particularly if pregnant, nursing, taking medication, or suffering from any medical condition.
            </p>
            <p className="font-medium">
              Statements made regarding dietary supplements have not been evaluated by the Food Safety and Standards Authority of India (FSSAI), unless specifically stated otherwise. Keep products out of reach of children. Use products only as directed on the label.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ShippingReturns;