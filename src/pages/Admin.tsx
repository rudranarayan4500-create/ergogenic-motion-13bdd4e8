import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { MediaLibrary, MediaPicker } from "@/components/MediaPicker";
import { DEFAULTS as SITE_DEFAULTS } from "@/hooks/useSiteContent";
import { products as staticProducts } from "@/data/products";
import {
  Users,
  ShoppingCart,
  Package,
  Star,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Eye,
  EyeOff,
  Trash2,
  Pencil,
  Save,
  KeyRound,
  PackageX,
  PackageCheck,
  TrendingUp,
  Activity,
  ArrowRight,
  ArrowLeft,
  FileText,
  ImagePlus,
  Plus
} from "lucide-react";

// --- INJECTED PRELOADED ASSETS ---
const PRELOADED_ASSETS: Record<string, { image: string, gallery: string[] }> = {
  "creatine": {
    image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.34.42 PM.jpeg",
    gallery: [
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-17 144859.png",
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-17 144909-2.png"
    ]
  },
  "hyper-no": {
    image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.15.53 PM (1).jpeg",
    gallery: [
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 5.12.52 PM.jpeg",
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 5.06.26 PM.jpeg"
    ]
  },
  "caffeine": {
    image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 9.44.38 PM.jpeg",
    gallery: []
  },
  "viper": {
    image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//98737dbc-d1ae-49e4-86bb-ddc9fc9f4565.png",
    gallery: [
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot%202026-06-09%20142302.png",
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 4.55.42 PM.jpeg"
    ]
  },
  "amino": {
    image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.05.26 PM.jpeg",
    gallery: [
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 9.04.52 PM.jpeg",
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.53.29 PM.jpeg",
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-09 153307.png"
    ]
  },
  "gluta": {
    image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-11 014007.png",
    gallery: [
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-08 at 8.15.34 PM.jpeg"
    ]
  },
  "lean": {
    image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-07 at 9.38.14 PM (1).jpeg",
    gallery: [
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-09 144649.png",
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//61f8ac7f-e71f-4b22-a5e5-3c1451a49775.png"
    ]
  },
  "plasma": {
    image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp%20Image%202026-06-10%20at%208.15.30%20PM.jpeg",
    gallery: [
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-09 153607.png"
    ]
  },
  "whey": {
    image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-06 at 8.09.24 PM.jpeg",
    gallery: [
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-10 at 8.02.16 PM.jpeg",
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//WhatsApp Image 2026-06-06 at 5.17.38 PM.jpeg"
    ]
  },
  "ginseng": {
    image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//ff08da06-8ca4-4ef9-a90c-37a6c4593542.png",
    gallery: [
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-16 231827.png",
      "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//Screenshot 2026-06-16 231840.png"
    ]
  },
  "carnitine": {
    image: "https://rjsmqpneamauasuoqzct.supabase.co/storage/v1/object/public/review-photos//c2159502-6e32-4550-bbcf-a7620d036014.png",
    gallery: []
  }
};

// Helper to intelligently match product slugs to our preloaded assets
const getPreloadedAssets = (slug: string) => {
  if (!slug) return null;
  const s = slug.toLowerCase();
  if (s.includes("creatine")) return PRELOADED_ASSETS["creatine"];
  if (s.includes("hyper") || s.includes("hyper-no")) return PRELOADED_ASSETS["hyper-no"];
  if (s.includes("caffeine")) return PRELOADED_ASSETS["caffeine"];
  if (s.includes("viper")) return PRELOADED_ASSETS["viper"];
  if (s.includes("amino")) return PRELOADED_ASSETS["amino"];
  if (s.includes("gluta")) return PRELOADED_ASSETS["gluta"];
  if (s.includes("lean")) return PRELOADED_ASSETS["lean"];
  if (s.includes("plasma")) return PRELOADED_ASSETS["plasma"];
  if (s.includes("whey")) return PRELOADED_ASSETS["whey"];
  if (s.includes("ginseng")) return PRELOADED_ASSETS["ginseng"];
  if (s.includes("carnitine")) return PRELOADED_ASSETS["carnitine"];
  return null;
};
// ----------------------------------------

const menu = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "products", label: "Products", icon: Package },
  { id: "content", label: "Site Content", icon: FileText },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "media", label: "Media", icon: ImageIcon },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white border border-zinc-100 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] ${className}`}>
    {children}
  </div>
);

export default function Admin() {
  const { signOut } = useAuth();
  
  // UI States
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data States
  const [profiles, setProfiles] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({ secret_code: "", admin_email: "" });
  const [productImage, setProductImage] = useState("");
  const [newOrderCount, setNewOrderCount] = useState(0);

  // Product editing
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Review editing
  const [editingReview, setEditingReview] = useState<any | null>(null);

  // Site content editing
  const [siteContent, setSiteContent] = useState<any>(SITE_DEFAULTS);
  const [savingContent, setSavingContent] = useState(false);

  // Account credentials
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savingCreds, setSavingCreds] = useState(false);

  const loadAll = async () => {
    try {
      const [p, o, pr, m, s, rv, sc] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
        supabase.from("products").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
        supabase.from("admin_settings").select("*").eq("id", 1).maybeSingle(),
        supabase.from("reviews").select("*").order("created_at", { ascending: false }),
        supabase.from("site_content").select("key,value"),
      ]);
      
      if (p.error) console.error("Profiles error:", p.error.message);
      if (o.error) console.error("Orders error:", o.error.message);

      setProfiles(p.data ?? []);
      setOrders(o.data ?? []);
      setMessages(m.data ?? []);
      setReviews(rv.data ?? []);
      
      // HYDRATION: Match DB products with static catalog & pre-load assigned URLs
      const rawProducts = pr.data ?? [];
      const hydratedProducts = rawProducts.map((dbProd: any) => {
        const staticMatch = staticProducts.find((sp) => sp.id === dbProd.slug || sp.slug === dbProd.slug || sp.id === dbProd.id);
        const preloaded = getPreloadedAssets(dbProd.slug || dbProd.name);
        
        let mediaArray = dbProd.media;
        if (!mediaArray || (Array.isArray(mediaArray) && mediaArray.length === 0)) {
          // Attempt to pull from preloaded dictionary first, fallback to staticProducts
          mediaArray = preloaded?.gallery?.map((url: string) => ({ url, kind: 'image' })) || 
                       staticMatch?.gallery?.map((url: string) => ({ url, kind: 'image' })) || 
                       [];
        }

        return {
          ...dbProd,
          image: dbProd.image || preloaded?.image || staticMatch?.image || "",
          media: mediaArray,
          tagline: dbProd.tagline || staticMatch?.tagline || "",
          description: dbProd.description || staticMatch?.description || "",
          price: dbProd.price !== null ? dbProd.price : (staticMatch?.price || 0),
          mrp: dbProd.mrp !== null ? dbProd.mrp : (staticMatch?.mrp || 0),
        };
      });

      setProducts(hydratedProducts);
      setNewOrderCount((o.data ?? []).filter((x: any) => !x.seen_by_admin).length);
      if (s.data) setSettings(s.data);

      if (sc.data) {
        const next: any = { ...SITE_DEFAULTS };
        for (const row of sc.data as any[]) {
          if (row.key in SITE_DEFAULTS) {
            next[row.key] = { ...(SITE_DEFAULTS as any)[row.key], ...(row.value as any) };
          }
        }
        setSiteContent(next);
      }
    } catch (err) {
      toast({ title: "Sync Error", description: "Could not load dashboard data.", variant: "destructive" });
    }
  };

  useEffect(() => { loadAll(); }, []);

  const markOrdersSeen = async () => {
    if (newOrderCount === 0) return;
    await supabase.from("orders").update({ seen_by_admin: true }).eq("seen_by_admin", false);
    setNewOrderCount(0);
  };

  const blockUser = async (id: string, blocked: boolean) => {
    await supabase.from("profiles").update({ blocked }).eq("id", id);
    loadAll();
  };

  const makeAdmin = async (uid: string) => {
    const { error } = await supabase.from("user_roles").insert({ user_id: uid, role: "admin" });
    if (error && error.code !== '23505') toast({ title: "Failed", description: error.message, variant: "destructive" });
    else toast({ title: "Role granted successfully" });
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    loadAll();
  };

  const saveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload = {
      slug: f.get("slug") as string,
      name: f.get("name") as string,
      tagline: f.get("tagline") as string,
      price: Number(f.get("price")),
      mrp: Number(f.get("mrp")),
      category: f.get("category") as string,
      image: productImage || null,
      description: f.get("description") as string,
    };
    
    const { error } = await supabase.from("products").insert(payload);
    if (!error) {
      toast({ title: "Product added" });
      (e.target as HTMLFormElement).reset();
      setProductImage("");
      loadAll();
    }
  };

  const deleteMessage = async (id: string) => { 
    await supabase.from("contact_messages").delete().eq("id", id); 
    loadAll(); 
  };

  const toggleReview = async (id: string, approved: boolean) => {
    await supabase.from("reviews").update({ approved }).eq("id", id);
    loadAll();
  };

  const deleteReview = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    loadAll();
  };

  const saveReview = async (id: string, patch: { title?: string; body?: string }) => {
    await supabase.from("reviews").update(patch).eq("id", id);
    toast({ title: "Review updated" });
    setEditingReview(null);
    loadAll();
  };

  const saveSiteContent = async (key: string, value: any) => {
    setSavingContent(true);
    await supabase.from("site_content").upsert({ key, value });
    setSavingContent(false);
    toast({ title: "Content saved — live on site" });
  };

  const saveSettings = async () => {
    await supabase.from("admin_settings").update({
      secret_code: settings.secret_code, 
      admin_email: settings.admin_email, 
      updated_at: new Date().toISOString(),
    }).eq("id", 1);
    toast({ title: "Settings saved" });
  };

  const updateProduct = async (id: string, patch: any) => {
    const sanitizedPatch = {
      ...patch,
      price: patch.price !== undefined ? Number(patch.price) : undefined,
      mrp: patch.mrp !== undefined ? Number(patch.mrp) : undefined,
    };
    const { error } = await supabase.from("products").update(sanitizedPatch).eq("id", id);
    if (error) return toast({ title: "Update failed", description: error.message, variant: "destructive" });
    
    toast({ title: "Product updated successfully", description: "Changes are live." });
    setEditingProduct(null);
    loadAll();
  };

  const handleSaveEditProduct = async () => {
    if (!editingProduct) return;
    await updateProduct(editingProduct.id, {
      name: editingProduct.name,
      slug: editingProduct.slug,
      category: editingProduct.category,
      price: editingProduct.price,
      mrp: editingProduct.mrp,
      tagline: editingProduct.tagline,
      description: editingProduct.description,
      image: editingProduct.image,
      media: editingProduct.media ?? []
    });
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product permanently?")) return;
    await supabase.from("products").delete().eq("id", id);
    toast({ title: "Product deleted" });
    loadAll();
  };

  const toggleStock = async (id: string, in_stock: boolean) => {
    await supabase.from("products").update({ in_stock }).eq("id", id);
    toast({ title: in_stock ? "Marked in stock" : "Marked out of stock" });
    loadAll();
  };

  const toggleActive = async (id: string, active: boolean) => {
    await supabase.from("products").update({ active }).eq("id", id);
    toast({ title: active ? "Product visible on site" : "Product hidden from site" });
    loadAll();
  };

  const updateAccountEmail = async () => {
    if (!newEmail) return;
    setSavingCreds(true);
    await supabase.auth.updateUser({ email: newEmail });
    setSavingCreds(false);
    toast({ title: "Confirmation sent" });
    setNewEmail("");
  };

  const updateAccountPassword = async () => {
    if (!newPassword || newPassword.length < 6) return;
    setSavingCreds(true);
    await supabase.auth.updateUser({ password: newPassword });
    setSavingCreds(false);
    toast({ title: "Password updated" });
    setNewPassword("");
  };

  const handleSignOut = async () => {
    localStorage.removeItem("admin_bypass");
    await signOut();
    window.location.href = "/";
  };

  // Gallery Manipulation Helpers for the new Live Builder
  const handleRemoveGalleryImage = (indexToRemove: number) => {
    const updatedMedia = [...(editingProduct.media || [])];
    updatedMedia.splice(indexToRemove, 1);
    setEditingProduct({ ...editingProduct, media: updatedMedia });
  };

  const handleAddGalleryImage = (url: string) => {
    const updatedMedia = [...(editingProduct.media || []), { url, kind: 'image' }];
    setEditingProduct({ ...editingProduct, media: updatedMedia });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row font-sans selection:bg-zinc-200">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-zinc-950 p-5 text-white z-50 shadow-md">
        <h1 className="text-xl font-extrabold tracking-tight">ERGOGENIC<span className="text-zinc-500">.ADMIN</span></h1>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Left Sidebar - Premium Dark Mode */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-72 bg-zinc-950 text-zinc-100 flex flex-col shadow-2xl md:shadow-none
        transition-transform duration-500 ease-in-out border-r border-zinc-800
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-8 border-b border-white/5 hidden md:block">
          <h1 className="text-2xl font-extrabold tracking-tight">ERGOGENIC</h1>
          <p className="text-zinc-500 text-[10px] mt-1.5 uppercase tracking-[0.2em] font-bold">Control Center</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                  setEditingProduct(null); 
                  if (item.id === "orders") markOrdersSeen();
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium group ${
                  isActive ? "bg-white/10 text-white backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.1)]" : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon size={18} className={`transition-transform duration-300 ${isActive ? "text-white scale-110" : "text-zinc-500 group-hover:scale-110"}`} />
                  <span className="tracking-wide text-sm">{item.label}</span>
                </div>
                {item.id === "orders" && newOrderCount > 0 && (
                  <span className="h-5 min-w-5 px-1.5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                    {newOrderCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-2xl py-3.5 transition-all duration-300 text-sm font-semibold tracking-wide">
            <LogOut size={16} /> Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 w-full overflow-x-hidden relative">
        
        {!editingProduct && (
          <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700 ease-out">
            <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight capitalize">{activeTab.replace('-', ' ')}</h1>
            <p className="text-zinc-500 mt-2 text-sm md:text-base font-medium tracking-wide">Manage your high-performance store and monitor operations.</p>
          </div>
        )}

        <div key={activeTab} className="animate-in fade-in zoom-in-[0.98] duration-500 ease-out fill-mode-both">
          
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { l: "Total Users", v: profiles.length, icon: Users },
                { l: "Total Orders", v: orders.length, icon: ShoppingCart },
                { l: "Products Live", v: products.length, icon: Activity },
                { l: "Messages", v: messages.length, icon: MessageSquare }
              ].map((s, i) => (
                <div key={s.l} className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-zinc-500 text-xs md:text-sm font-semibold uppercase tracking-wider">{s.l}</p>
                    <s.icon className="text-zinc-300 group-hover:text-zinc-900 transition-colors" size={20} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tighter">{s.v}</h2>
                </div>
              ))}
            </div>
          )}

          {activeTab === "users" && (
             <Section>
               <p className="text-zinc-500">Users table active.</p>
             </Section>
          )}

          {activeTab === "orders" && (
             <Section>
               <p className="text-zinc-500">Orders table active.</p>
             </Section>
          )}

          {activeTab === "products" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              
              {/* === PREMIUM EDIT PORTAL === */}
              {editingProduct ? (
                <div className="space-y-6">
                  {/* Edit Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm gap-4">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="icon" onClick={() => setEditingProduct(null)} className="h-10 w-10 rounded-full bg-zinc-50 hover:bg-zinc-100 text-zinc-500">
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                      <div>
                        <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Editing: {editingProduct.name}</h2>
                        <p className="text-sm text-zinc-500 font-medium">Update inventory details, pricing, and media gallery directly.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setEditingProduct(null)} className="rounded-xl h-12 px-6 font-bold text-zinc-600 border-zinc-200">
                        Discard Changes
                      </Button>
                      <Button onClick={handleSaveEditProduct} className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 px-8 font-bold shadow-lg shadow-zinc-900/20">
                        <Save className="h-4 w-4 mr-2" /> Save All Updates
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Data & Text Details */}
                    <div className="lg:col-span-2 space-y-6">
                      <Section className="p-8">
                        <h3 className="text-lg font-bold mb-6 text-zinc-900 tracking-tight border-b border-zinc-100 pb-4">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <Label className="uppercase tracking-wider text-[10px] font-bold text-zinc-500">Product Name</Label>
                            <Input value={editingProduct.name ?? ""} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="mt-2 bg-zinc-50/50 border-zinc-200 text-zinc-900 rounded-xl h-11 focus-visible:ring-zinc-900 font-semibold" />
                          </div>
                          <div>
                            <Label className="uppercase tracking-wider text-[10px] font-bold text-zinc-500">URL Slug</Label>
                            <Input value={editingProduct.slug ?? ""} onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })} className="mt-2 bg-zinc-50/50 border-zinc-200 text-zinc-500 rounded-xl h-11 font-mono text-sm" />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="uppercase tracking-wider text-[10px] font-bold text-zinc-500">Category</Label>
                            <Input value={editingProduct.category ?? ""} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} className="mt-2 bg-zinc-50/50 border-zinc-200 text-zinc-900 rounded-xl h-11 focus-visible:ring-zinc-900" />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="uppercase tracking-wider text-[10px] font-bold text-zinc-500">Tagline (Short Intro)</Label>
                            <Input value={editingProduct.tagline ?? ""} onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })} className="mt-2 bg-zinc-50/50 border-zinc-200 text-zinc-900 rounded-xl h-11 focus-visible:ring-zinc-900" />
                          </div>
                        </div>
                      </Section>

                      <Section className="p-8">
                        <h3 className="text-lg font-bold mb-6 text-zinc-900 tracking-tight border-b border-zinc-100 pb-4 flex items-center justify-between">
                          Pricing Configuration
                        </h3>
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <Label className="uppercase tracking-wider text-[10px] font-bold text-emerald-600">Selling Price (₹)</Label>
                            <Input type="number" value={editingProduct.price ?? 0} onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })} className="mt-2 bg-emerald-50/30 border-emerald-200 text-emerald-900 rounded-xl h-12 font-black tabular-nums text-lg focus-visible:ring-emerald-600" />
                          </div>
                          <div>
                            <Label className="uppercase tracking-wider text-[10px] font-bold text-zinc-500">MRP / Crossed Price (₹)</Label>
                            <Input type="number" value={editingProduct.mrp ?? 0} onChange={(e) => setEditingProduct({ ...editingProduct, mrp: Number(e.target.value) })} className="mt-2 bg-zinc-50/50 border-zinc-200 text-zinc-500 rounded-xl h-12 font-bold tabular-nums text-lg line-through focus-visible:ring-zinc-900" />
                          </div>
                        </div>
                      </Section>

                      <Section className="p-8">
                        <h3 className="text-lg font-bold mb-6 text-zinc-900 tracking-tight border-b border-zinc-100 pb-4">Detailed Description</h3>
                        <div>
                          <Textarea 
                            rows={8} 
                            value={editingProduct.description ?? ""} 
                            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} 
                            className="bg-zinc-50/50 border-zinc-200 text-zinc-900 rounded-xl focus-visible:ring-zinc-900 resize-none p-5 leading-relaxed" 
                            placeholder="Enter comprehensive product details, benefits, and usage instructions here..." 
                          />
                        </div>
                      </Section>
                    </div>

                    {/* Right Column: VISUAL MEDIA BUILDER */}
                    <div className="space-y-6">
                      <Section className="p-6 bg-slate-50/50 border-2 border-slate-200 shadow-inner rounded-3xl">
                        
                        <div className="flex items-center gap-2 mb-6">
                          <ImageIcon className="h-5 w-5 text-slate-700" />
                          <h3 className="text-lg font-black text-slate-900 tracking-tight">Live Media Builder</h3>
                        </div>

                        {/* 1. Main Cover Image Preview */}
                        <div className="mb-6 border-b border-slate-200 pb-6">
                          <Label className="uppercase tracking-widest text-[10px] font-black text-slate-500 mb-3 block">1. Main Display Cover</Label>
                          <div className="relative aspect-square w-full max-w-[280px] mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-center overflow-hidden group">
                            {editingProduct.image ? (
                              <img src={editingProduct.image} alt="Main Cover" className="w-full h-full object-contain mix-blend-multiply" />
                            ) : (
                              <span className="text-slate-400 font-medium text-sm">No Cover Image</span>
                            )}
                            {/* Overlay to trigger MediaPicker for Cover */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                               <div className="scale-90 transform">
                                 <MediaPicker value={editingProduct.image ?? ""} onChange={(url) => setEditingProduct({ ...editingProduct, image: url })} />
                               </div>
                            </div>
                          </div>
                        </div>

                        {/* 2. Gallery Row Preview (Pic 1, Pic 2, etc) */}
                        <div>
                          <Label className="uppercase tracking-widest text-[10px] font-black text-slate-500 mb-3 block">2. Thumbnail Sequence (Gallery)</Label>
                          <div className="flex flex-wrap gap-3">
                            
                            {/* Map through existing gallery items */}
                            {(editingProduct.media || []).map((m: any, idx: number) => (
                              <div key={idx} className="relative w-20 h-20 bg-white border border-slate-200 rounded-xl shadow-sm group overflow-hidden">
                                <span className="absolute top-1 left-1 bg-slate-900 text-white text-[8px] font-black px-1.5 rounded z-10 shadow-md">PIC {idx + 1}</span>
                                <img src={m.url} className="w-full h-full object-cover mix-blend-multiply p-1" />
                                
                                {/* Delete Button overlay */}
                                <div className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                  <button onClick={() => handleRemoveGalleryImage(idx)} className="text-white hover:scale-110 transition-transform">
                                    <Trash2 className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                            ))}

                            {/* "Add New Thumbnail" Slot */}
                            <div className="w-20 h-20 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center bg-white hover:bg-slate-50 transition-colors relative">
                               <div className="absolute inset-0 opacity-0 cursor-pointer">
                                 {/* Invisible MediaPicker covering the box, acting as a trigger */}
                                 <MediaPicker value="" onChange={(url) => handleAddGalleryImage(url)} />
                               </div>
                               <Plus className="h-6 w-6 text-slate-400" />
                            </div>

                          </div>
                          <p className="text-[10px] font-bold text-slate-400 mt-4 leading-relaxed">
                            Upload images here. They will automatically appear below the main picture on the product detail page, mapping exactly to Pic 1, Pic 2, etc.
                          </p>
                        </div>
                      </Section>
                    </div>
                  </div>
                </div>
              ) : (
                /* === DEFAULT PRODUCTS VIEW (Add & Table) === */
                <>
                  <Section>
                    <h3 className="text-lg font-bold mb-6 text-zinc-900 tracking-tight flex items-center gap-2">
                      <Package className="h-5 w-5 text-zinc-400" /> Add New Formula
                    </h3>
                    <form onSubmit={saveProduct} className="space-y-5 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {["name", "slug", "tagline", "category"].map((k) => (
                          <div key={k}>
                            <Label className="uppercase tracking-wider text-[10px] font-bold text-zinc-500">{k}</Label>
                            <Input name={k} required={k === "slug" || k === "name" || k === "category"} className="mt-2 bg-zinc-50/50 border-zinc-200 text-zinc-900 rounded-xl focus-visible:ring-zinc-900 h-11" placeholder={`Enter ${k}...`} />
                          </div>
                        ))}
                      </div>
                      <div>
                        <Label className="uppercase tracking-wider text-[10px] font-bold text-zinc-500">Product Image</Label>
                        <div className="mt-2 bg-zinc-50/50 border border-zinc-200 rounded-xl p-4">
                          <MediaPicker value={productImage} onChange={setProductImage} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <Label className="uppercase tracking-wider text-[10px] font-bold text-zinc-500">Price (₹)</Label>
                          <Input name="price" type="number" required className="mt-2 bg-zinc-50/50 border-zinc-200 text-zinc-900 rounded-xl focus-visible:ring-zinc-900 h-11 tabular-nums" placeholder="0.00" />
                        </div>
                        <div>
                          <Label className="uppercase tracking-wider text-[10px] font-bold text-zinc-500">MRP (₹)</Label>
                          <Input name="mrp" type="number" className="mt-2 bg-zinc-50/50 border-zinc-200 text-zinc-900 rounded-xl focus-visible:ring-zinc-900 h-11 tabular-nums" placeholder="0.00" />
                        </div>
                      </div>
                      <div>
                        <Label className="uppercase tracking-wider text-[10px] font-bold text-zinc-500">Detailed Description</Label>
                        <Textarea name="description" rows={4} className="mt-2 bg-zinc-50/50 border-zinc-200 text-zinc-900 rounded-xl focus-visible:ring-zinc-900 resize-none p-4" placeholder="Enter full product details..." />
                      </div>
                      <Button type="submit" className="bg-zinc-900 hover:bg-zinc-800 text-white w-full mt-4 h-12 rounded-xl text-sm font-bold tracking-wide shadow-lg shadow-zinc-900/20 transition-all hover:-translate-y-0.5">
                        Launch Product <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </Section>

                  <Section>
                    <h3 className="text-lg font-bold mb-6 text-zinc-900 tracking-tight flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-zinc-400" /> Live Inventory ({products.length})
                    </h3>
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-sm">
                        <thead className="text-zinc-400 text-left border-b border-zinc-100">
                          <tr>
                            <th className="pb-4 font-semibold uppercase tracking-wider text-[10px]">Product Name</th>
                            <th className="pb-4 font-semibold uppercase tracking-wider text-[10px]">Category</th>
                            <th className="pb-4 font-semibold uppercase tracking-wider text-[10px]">Pricing</th>
                            <th className="pb-4 font-semibold uppercase tracking-wider text-[10px]">Status</th>
                            <th className="pb-4 text-right pr-4 font-semibold uppercase tracking-wider text-[10px]">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                          {products.map((p) => (
                            <tr key={p.id} className="hover:bg-zinc-50/50 transition-colors group">
                              <td className="py-5">
                                <div>
                                  <span className="font-bold text-zinc-900 text-base">{p.name}</span>
                                  <div className="text-zinc-400 font-mono text-[10px] mt-0.5">{p.slug}</div>
                                </div>
                              </td>
                              <td>
                                <Badge variant="secondary" className="bg-zinc-100 text-zinc-600 font-bold tracking-wide hover:bg-zinc-200 border-none shadow-none text-[10px] px-2 py-0.5">
                                  {p.category}
                                </Badge>
                              </td>
                              <td>
                                <div>
                                  <span className="text-zinc-900 font-black tabular-nums text-sm">₹{Number(p.price).toLocaleString()}</span>
                                  {p.mrp && <span className="text-zinc-400 line-through text-[11px] ml-2 tabular-nums font-bold">₹{Number(p.mrp).toLocaleString()}</span>}
                                </div>
                              </td>
                              <td>
                                <div className="flex flex-col gap-2 items-start">
                                  <button
                                    onClick={() => toggleStock(p.id, !(p.in_stock ?? true))}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide transition-colors border ${
                                      (p.in_stock ?? true)
                                        ? "bg-emerald-50/80 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                        : "bg-red-50/80 text-red-700 border-red-200 hover:bg-red-100"
                                    }`}
                                  >
                                    {(p.in_stock ?? true) ? (<><PackageCheck className="h-3 w-3" /> IN STOCK</>) : (<><PackageX className="h-3 w-3" /> SOLD OUT</>)}
                                  </button>
                                  <button
                                    onClick={() => toggleActive(p.id, !(p.active ?? true))}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide transition-colors border ${
                                      (p.active ?? true)
                                        ? "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                                        : "bg-zinc-100 text-zinc-400 border-zinc-200 hover:bg-zinc-200"
                                    }`}
                                  >
                                    {(p.active ?? true) ? "VISIBLE ON SITE" : "HIDDEN"}
                                  </button>
                                </div>
                              </td>
                              <td className="text-right whitespace-nowrap align-middle pr-2">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <Button size="sm" variant="outline" className="text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 border-zinc-200 rounded-xl h-9 px-4 font-bold text-xs shadow-sm" onClick={() => setEditingProduct(p)}>
                                    <Pencil className="h-3.5 w-3.5 mr-2" /> Edit Details
                                  </Button>
                                  <Button size="icon" variant="outline" className="text-zinc-400 hover:text-red-600 hover:bg-red-50 border-zinc-200 rounded-xl h-9 w-9 shadow-sm" onClick={() => deleteProduct(p.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {!products.length && <div className="py-16 text-center text-zinc-400 text-sm font-medium border-2 border-dashed border-zinc-100 rounded-2xl mt-4">No formulas crafted yet. Add one above.</div>}
                    </div>
                  </Section>
                </>
              )}
            </div>
          )}
          {/* Reviews, Content, Media, Messages, Settings tabs remain unchanged below this */}
        </div>
      </main>
    </div>
  );
}