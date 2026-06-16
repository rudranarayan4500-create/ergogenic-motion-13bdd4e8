import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "./Logo";

export const SiteFooter = () => {
  return (
    <footer className="bg-background text-foreground/80 border-t border-border">
      <div className="container py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="h-9" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-xs">
            Ergogenic Nutrients is a performance-driven sports nutrition company. Lab-tested,
            transparently dosed, built for athletes who train with intent.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="h-9 w-9 rounded-full border border-border grid place-items-center hover:border-primary hover:text-primary transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-foreground font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products?cat=Muscle" className="hover:text-primary">Muscle</Link></li>
            <li><Link to="/products?cat=Performance" className="hover:text-primary">Performance</Link></li>
            <li><Link to="/products?cat=Recovery" className="hover:text-primary">Recovery</Link></li>
            <li><Link to="/products?cat=Essentials" className="hover:text-primary">Essentials</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-foreground font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-foreground font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shipping" className="hover:text-primary">Shipping & Returns</Link></li>
            <li><Link to="/support" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Customer Care</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-border">
        <div className="container py-6 text-xs text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Ergogenic Nutrients. All rights reserved.</p>
          <p>FSSAI Approved · Lab Tested · Made for Athletes</p>
        </div>
      </div>
    </footer>
  );
};