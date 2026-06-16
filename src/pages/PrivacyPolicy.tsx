import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-blue-50/50 py-16 md:py-24 px-4 font-sans text-slate-800 antialiased">
      <div className="max-w-4xl mx-auto">
        {/* Simple Breadcrumb / Back Link */}
        <Link to="/" className="text-sm text-blue-600 hover:text-blue-800 font-bold tracking-wide mb-8 inline-block">
          &larr; Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8 md:p-14 space-y-10">
          
          <header className="border-b border-blue-50 pb-8 space-y-4">
            <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
              Privacy Policy
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              Bulk Powders Nutraceuticals Private Limited ("Company," "we," "our," or "us") is committed to protecting your privacy and handling your personal data responsibly in accordance with applicable laws, including the Digital Personal Data Protection Act, 2023 (India).
            </p>
          </header>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Information We Collect</h2>
            <p>We may collect:</p>
            <ul className="list-disc pl-5 space-y-2 font-medium">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing and shipping address</li>
              <li>Payment details (processed through secure payment providers)</li>
              <li>IP address</li>
              <li>Browser information</li>
              <li>Device information</li>
              <li>Website usage data</li>
            </ul>
          </section>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Purpose of Collection</h2>
            <p>We collect personal information to:</p>
            <ul className="list-disc pl-5 space-y-2 font-medium">
              <li>Process and fulfill orders</li>
              <li>Provide customer support</li>
              <li>Improve website functionality</li>
              <li>Communicate order updates</li>
              <li>Send promotional communications (with consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Data Sharing</h2>
            <p>We do not sell personal information. Information may be shared with:</p>
            <ul className="list-disc pl-5 space-y-2 font-medium">
              <li>Shipping and logistics providers</li>
              <li>Payment processors</li>
              <li>Technology service providers</li>
              <li>Regulatory authorities where legally required</li>
            </ul>
          </section>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Cookies</h2>
            <p className="font-medium">Our website may use cookies and similar technologies to improve user experience and website performance.</p>
          </section>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Data Security</h2>
            <p className="font-medium">We implement reasonable administrative, technical, and physical safeguards to protect personal information.</p>
          </section>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">User Rights</h2>
            <p>You may request:</p>
            <ul className="list-disc pl-5 space-y-2 font-medium">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Withdrawal of consent</li>
              <li>Deletion of personal information, subject to legal obligations</li>
            </ul>
          </section>

          <section className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Contact & Updates</h2>
            <p className="font-medium">For privacy-related concerns, contact: <strong>Bulk Powders Nutraceuticals Private Limited</strong><br />Phone: +91 82880 01279</p>
            <p className="font-medium mt-4"><strong>Updates:</strong> We reserve the right to update this Privacy Policy at any time.</p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;