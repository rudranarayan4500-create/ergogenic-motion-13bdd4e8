import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Bell,
  LogOut,
  Menu,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { cartCount } from "@/lib/cart";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/contact", label: "Contact Us" },
];

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { user, isAdmin, signOut } = useAuth();

  const [newOrders, setNewOrders] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const [bellShake, setBellShake] = useState(false);

  // SCROLL EFFECT
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // CART BADGE + SHAKE
  useEffect(() => {
    setCartItems(cartCount());
    const refresh = () => setCartItems(cartCount());
    const onAdd = () => {
      refresh();
      setBellShake(true);
      setTimeout(() => setBellShake(false), 700);
    };
    window.addEventListener("cart:change", refresh);
    window.addEventListener("cart:add", onAdd);
    return () => {
      window.removeEventListener("cart:change", refresh);
      window.removeEventListener("cart:add", onAdd);
    };
  }, []);

  // ADMIN BADGE
  useEffect(() => {
    if (!isAdmin) {
      setNewOrders(0);
      return;
    }

    const load = async () => {
      const { count } = await supabase
        .from("orders")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("seen_by_admin", false);

      setNewOrders(count ?? 0);
    };

    load();

    const ch = supabase
      .channel("orders-admin-badge")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        load
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ch);
    };
  }, [isAdmin]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/90 backdrop-blur-2xl border-b border-border shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
            : "bg-transparent border-transparent"
        )}
      >
        {/* GLOW */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500 pointer-events-none",
            scrolled
              ? "opacity-100"
              : "opacity-0"
          )}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />

          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-40 w-80 bg-primary/10 blur-[80px]" />
        </div>

        <div className="container relative flex h-[74px] items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            className="relative z-10 flex items-center gap-2"
          >
            <Logo className="h-9 transition-transform duration-300 hover:scale-105" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300",
                    isActive
                      ? "text-foreground"
                      : scrolled
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-foreground/90 hover:text-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-muted border border-border backdrop-blur-md" />
                    )}

                    <span className="relative z-10">
                      {l.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 relative z-10">
            {/* ADMIN */}
            {isAdmin && (
              <Link
                to="/admin"
                className="relative hidden md:flex items-center gap-2 px-4 h-10 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 transition-all duration-300"
              >
                <Bell className="h-4 w-4 text-primary" />

                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Admin
                </span>

                {newOrders > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary text-black text-[10px] font-black grid place-items-center animate-pulse">
                    {newOrders}
                  </span>
                )}
              </Link>
            )}

            {/* CART */}
            <Button
              asChild
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full transition-all duration-300 relative",
                scrolled
                  ? "hover:bg-muted text-foreground"
                  : "hover:bg-muted text-foreground"
              )}
            >
              <Link to="/cart">
                <span className="relative inline-flex">
                  <ShoppingBag
                    className={cn(
                      "h-5 w-5 transition-colors",
                      (bellShake || cartItems > 0) && "text-primary"
                    )}
                  />
                  {cartItems > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 rounded-full bg-primary text-primary-foreground text-[9px] font-black grid place-items-center border border-background">
                      {cartItems}
                    </span>
                  )}
                  {bellShake && (
                    <Bell className="absolute -top-3 -right-3 h-4 w-4 text-primary animate-bounce drop-shadow-[0_0_8px_hsl(217_91%_50%_/_0.9)]" />
                  )}
                </span>
              </Link>
            </Button>

            {/* USER */}
            {user ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-foreground hover:bg-muted"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-[#0b0b0b] border border-border text-foreground rounded-3xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-black">
                      Sign out?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-muted-foreground">
                      You’ll need to log back in to access
                      orders, reviews and admin features.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-border bg-muted/50 text-foreground hover:bg-muted">
                      Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                      onClick={() => signOut()}
                      className="bg-primary hover:bg-primary/90 text-black font-bold"
                    >
                      Sign Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="rounded-full text-foreground hover:bg-muted"
              >
                <Link to="/auth">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}

            {/* CTA */}
            <Button
              asChild
              className="hidden md:flex h-11 px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_30px_hsl(217_91%_50%_/_0.35)]"
            >
              <Link to="/products">
                Shop Now
              </Link>
            </Button>

            {/* MOBILE MENU */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden h-11 w-11 rounded-full flex items-center justify-center text-foreground hover:bg-muted transition-colors"
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-500",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />

        {/* PANEL */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[85%] max-w-[360px] bg-[#050505] border-l border-border p-6 transition-transform duration-500",
            open
              ? "translate-x-0"
              : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between mb-10">
            <Logo className="h-8" />

            <button
              onClick={() => setOpen(false)}
              className="h-10 w-10 rounded-full bg-muted/50 border border-border flex items-center justify-center text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-5 py-4 rounded-2xl text-base font-semibold transition-all duration-300",
                    isActive
                      ? "bg-primary text-black"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-10">
            <Button
              asChild
              className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-black font-bold"
            >
              <Link
                to="/products"
                onClick={() => setOpen(false)}
              >
                Shop Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};