import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "./Logo";

export const SiteFooter = () => {
  return (
    <footer className="bg-[hsl(var(--ink))] text-white/80 border-t border-white/10">
      <div className="container py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="h-9" />
          <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-xs">
            Ergogenic Nutrients is a performance-driven sports nutrition company. Lab-tested,
            transparently dosed, built for athletes who train with intent.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="h-9 w-9 rounded-full border border-white/15 grid place-items-center hover:border-primary hover:text-primary transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products?cat=Muscle" className="hover:text-primary">Muscle</Link></li>
            <li><Link to="/products?cat=Performance" className="hover:text-primary">Performance</Link></li>
            <li><Link to="/products?cat=Recovery" className="hover:text-primary">Recovery</Link></li>
            <li><Link to="/products?cat=Essentials" className="hover:text-primary">Essentials</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/ingredients" className="hover:text-primary">Ingredients</Link></li>
            <li><Link to="/reviews" className="hover:text-primary">Reviews</Link></li>
            <li><Link to="/resources" className="hover:text-primary">Resources</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/support" className="hover:text-primary">Shipping</Link></li>
            <li><Link to="/support" className="hover:text-primary">Returns</Link></li>
            <li><Link to="/support" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Customer Care</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-6 text-xs text-white/50 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Ergogenic Nutrients. All rights reserved.</p>
          <p>FSSAI Approved · Lab Tested · Made for Athletes</p>
        </div>
      </div>
    </footer>
  );
};