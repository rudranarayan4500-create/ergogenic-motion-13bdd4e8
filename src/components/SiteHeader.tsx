import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LogOut, Menu, Moon, ShoppingBag, Sun, User, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/ingredients", label: "Ingredients" },
  { to: "/reviews", label: "Reviews" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") ||
        localStorage.getItem("theme") !== "light";
    }
    return true;
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[hsl(var(--ink))]/95 backdrop-blur-md border-b border-white/10 shadow-[0_2px_20px_hsl(0_0%_0%/0.5)]"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-8" />
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium tracking-wide transition-colors",
                  isActive ? "text-primary" : "text-white/80 hover:text-white"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link to="/admin" className="hidden md:inline text-xs font-semibold text-primary border border-primary/40 rounded-full px-3 py-1 hover:bg-primary/10">Admin</Link>
          )}
          <button
            onClick={() => setDark((v) => !v)}
            className="h-9 w-9 rounded-full border border-white/15 grid place-items-center text-white hover:border-primary hover:text-primary transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Link to="/cart" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </Button>
          {user ? (
            <Button onClick={() => signOut()} variant="ghost" size="icon" className="text-white hover:bg-white/10" aria-label="Sign out">
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/10" aria-label="Sign in">
              <Link to="/auth"><User className="h-5 w-5" /></Link>
            </Button>
          )}
          <Button asChild className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/products">Shop Now</Link>
          </Button>
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-[hsl(var(--ink))] border-t border-white/10 animate-fade-in">
          <nav className="container flex flex-col py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "py-3 text-base border-b border-white/5",
                    isActive ? "text-primary" : "text-white/85"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
