import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-blue-50/50 py-16 md:py-24 px-4 font-sans text-slate-800 antialiased">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-sm text-blue-600 hover:text-blue-800 font-bold tracking-wide mb-8 inline-block">
          &larr; Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8 md:p-14 space-y-10">
          
          <header className="border-b border-blue-50 pb-8 space-y-4">
            <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <FileText className="h-6 w-6" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
              Terms & Conditions
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              By accessing or purchasing from our website, you agree to these Terms & Conditions.
            </p>
          </header>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Products</h2>
            <ul className="list-disc pl-5 space-y-2 font-medium">
              <li>All products are offered subject to availability.</li>
              <li>The Company reserves the right to modify product specifications, packaging, pricing, and availability without prior notice.</li>
            </ul>
          </section>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Orders</h2>
            <p>We reserve the right to:</p>
            <ul className="list-disc pl-5 space-y-2 font-medium">
              <li>Refuse any order</li>
              <li>Limit quantities purchased</li>
              <li>Cancel orders suspected of fraud or unauthorized activity</li>
            </ul>
          </section>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Pricing</h2>
            <p className="font-medium">
              Prices are subject to change without notice. Applicable taxes will be charged as required by law.
            </p>
          </section>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Intellectual Property</h2>
            <p className="font-medium">
              All content including logos, trademarks, images, product descriptions, and website content remains the exclusive property of Bulk Powders Nutraceuticals Private Limited.
            </p>
          </section>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Limitation of Liability</h2>
            <p className="font-medium">
              The Company shall not be liable for indirect, incidental, consequential, or special damages arising from the use of its products or website.
            </p>
          </section>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Governing Law</h2>
            <p className="font-medium">
              These Terms shall be governed by the laws of India. Courts located in Amritsar, Punjab shall have exclusive jurisdiction over disputes.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsConditions;