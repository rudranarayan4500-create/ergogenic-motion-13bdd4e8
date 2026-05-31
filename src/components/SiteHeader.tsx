import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bell, LogOut, Menu, ShoppingBag, User, X } from "lucide-react"; // Removed Moon and Sun icons
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client"; // Removed useTheme hook import
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
  { to: "/products", label: "Products" },
  { to: "/ingredients", label: "Ingredients" },
  { to: "/gallery", label: "Gallery" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const [newOrders, setNewOrders] = useState(0);

  // Forced light mode styling by default since dark mode toggle is disabled
  const isDark = false; 

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isAdmin) { setNewOrders(0); return; }
    const load = async () => {
      const { count } = await supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("seen_by_admin", false);
      setNewOrders(count ?? 0);
    };
    load();
    const ch = supabase
      .channel("orders-admin-badge")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, load)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [isAdmin]);

  const bgClass = scrolled
    ? isDark
      ? "bg-[hsl(var(--ink))]/95 backdrop-blur-md border-b border-white/10"
      : "bg-white/95 backdrop-blur-md border-b border-blue-200"
    : isDark
      ? "bg-transparent"
      : "bg-transparent";

  const textClass = isDark ? "text-white/80 hover:text-white" : "text-gray-700 hover:text-gray-900";
  const iconClass = isDark ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-200";

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", bgClass)}>
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
                  isActive ? "text-primary" : textClass
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link to="/admin" className="relative hidden md:inline-flex items-center gap-1 text-xs font-semibold text-primary border border-primary/40 rounded-full px-3 py-1 hover:bg-primary/10 transition-colors">
              <Bell className="h-3 w-3" />
              Admin
              {newOrders > 0 && (
                <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-primary text-[10px] text-primary-foreground grid place-items-center animate-pulse">
                  {newOrders}
                </span>
              )}
            </Link>
          )}
          <Button asChild variant="ghost" size="icon" className={iconClass}>
            <Link to="/cart" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </Button>

          {/* Theme toggle button has been removed from here */}

          {user ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className={iconClass} aria-label="Sign out">
                  <LogOut className="h-5 w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className={cn("bg-card border", isDark ? "border-white/10" : "border-blue-200")}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
                  <AlertDialogDescription>You'll need to log back in to view orders, post reviews or access the admin panel.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className={isDark ? "border-white/15" : "border-blue-300"}>Stay signed in</AlertDialogCancel>
                  <AlertDialogAction className="bg-primary hover:bg-primary/90" onClick={() => signOut()}>Yes, sign out</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button asChild variant="ghost" size="icon" className={iconClass} aria-label="Sign in">
              <Link to="/auth"><User className="h-5 w-5" /></Link>
            </Button>
          )}
          <Button asChild className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/products">Shop Now</Link>
          </Button>
          <button
            className={`lg:hidden p-2 ${isDark ? "text-white" : "text-gray-700"}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className={cn("lg:hidden border-t animate-fade-in", isDark ? "bg-[hsl(var(--ink))] border-white/10" : "bg-white/50 border-blue-200")}>
          <nav className="container flex flex-col py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "py-3 text-base border-b transition-colors",
                    isActive ? "text-primary" : isDark ? "text-white/85 border-white/5" : "text-gray-700 border-gray-200"
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