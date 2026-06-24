import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { MediaLibrary, MediaPicker } from "@/components/MediaPicker";
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
} from "lucide-react";

const menu = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "products", label: "Add Product", icon: Package },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "media", label: "Media", icon: ImageIcon },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
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

  const loadAll = async () => {
    try {
      const [p, o, pr, m, s, rv] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
        supabase.from("products").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
        supabase.from("admin_settings").select("*").eq("id", 1).maybeSingle(),
        supabase.from("reviews").select("*").order("created_at", { ascending: false }),
      ]);
      
      if (p.error) console.error("Profiles error:", p.error.message);
      if (o.error) console.error("Orders error:", o.error.message);

      setProfiles(p.data ?? []);
      setOrders(o.data ?? []);
      setProducts(pr.data ?? []);
      setMessages(m.data ?? []);
      setReviews(rv.data ?? []);
      
      setNewOrderCount((o.data ?? []).filter((x: any) => !x.seen_by_admin).length);
      if (s.data) setSettings(s.data);
    } catch (err) {
      toast({ title: "Sync Error", description: "Could not load complete dashboard data.", variant: "destructive" });
    }
  };

  useEffect(() => { loadAll(); }, []);

  const markOrdersSeen = async () => {
    if (newOrderCount === 0) return;
    await supabase.from("orders").update({ seen_by_admin: true }).eq("seen_by_admin", false);
    setNewOrderCount(0);
  };

  const blockUser = async (id: string, blocked: boolean) => {
    const { error } = await supabase.from("profiles").update({ blocked }).eq("id", id);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else loadAll();
  };

  const makeAdmin = async (uid: string) => {
    // Inserts utilizing the custom app_role enum
    const { error } = await supabase.from("user_roles").insert({ user_id: uid, role: "admin" });
    if (error) {
        if (error.code === '23505') toast({ title: "Already Admin", description: "User already has an admin role." });
        else toast({ title: "Failed", description: error.message, variant: "destructive" });
    } else {
        toast({ title: "Role granted successfully" });
    }
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
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
    } else {
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

  const saveSettings = async () => {
    const { error } = await supabase.from("admin_settings").update({
      secret_code: settings.secret_code, 
      admin_email: settings.admin_email, 
      updated_at: new Date().toISOString(),
    }).eq("id", 1);
    
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else toast({ title: "Settings saved" });
  };

  const handleSignOut = async () => {
    localStorage.removeItem("admin_bypass");
    await signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-black p-4 text-white z-50">
        <h1 className="text-xl font-bold text-sky-400">Admin Panel</h1>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-72 bg-black text-white flex flex-col shadow-2xl md:shadow-none
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 border-b border-white/10 hidden md:block">
          <h1 className="text-3xl font-bold text-sky-400 tracking-tight">Admin Panel</h1>
          <p className="text-white/50 text-sm mt-1 uppercase tracking-wider font-semibold">Control Center</p>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                  if (item.id === "orders") markOrdersSeen();
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                    : "text-white/70 hover:bg-white/5 hover:text-sky-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className={isActive ? "text-white" : "text-white/60"} />
                  {item.label}
                </div>
                {item.id === "orders" && newOrderCount > 0 && (
                  <span className="h-5 min-w-5 px-1.5 rounded-full bg-red-500 text-[11px] font-bold text-white flex items-center justify-center animate-pulse">
                    {newOrderCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/10 text-white/70 hover:text-red-400 rounded-xl py-3 transition-colors duration-200 font-medium"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 w-full overflow-x-hidden">
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight capitalize">
            {activeTab.replace('-', ' ')}
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base">
            Manage your store, track performance, and analyze data.
          </p>
        </div>

        {activeTab === "dashboard" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { l: "Total Users", v: profiles.length },
              { l: "Total Orders", v: orders.length },
              { l: "Products", v: products.length },
              { l: "Messages", v: messages.length }
            ].map((s) => (
              <div key={s.l} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <p className="text-slate-500 text-sm font-medium">{s.l}</p>
                <h2 className="text-4xl font-bold text-sky-500 mt-2">{s.v}</h2>
              </div>
            ))}
          </div>
        )}

        {activeTab === "users" && (
          <Section>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-slate-500 text-left border-b border-slate-200">
                  <tr>
                    <th className="py-3 font-medium">Name</th>
                    <th className="py-3 font-medium">Email</th>
                    <th className="py-3 font-medium">Phone</th>
                    <th className="py-3 font-medium">Joined</th>
                    <th className="py-3 font-medium">Status</th>
                    <th className="py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map(p => (
                    <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 font-medium text-slate-900">{p.full_name || "—"}</td>
                      <td className="text-slate-600">{p.email}</td>
                      <td className="text-slate-600">{p.phone || "—"}</td>
                      <td className="text-slate-600">{new Date(p.created_at).toLocaleDateString()}</td>
                      <td>
                        {p.blocked ? <Badge variant="destructive">Blocked</Badge> : <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none shadow-none">Active</Badge>}
                      </td>
                      <td className="text-right space-x-2">
                        <Button size="sm" variant="outline" className="border-slate-200 text-slate-700" onClick={() => blockUser(p.id, !p.blocked)}>
                          {p.blocked ? "Unblock" : "Block"}
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-200 text-slate-700" onClick={() => makeAdmin(p.id)}>Make admin</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {activeTab === "orders" && (
          <Section>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-slate-500 text-left border-b border-slate-200">
                  <tr>
                    <th className="py-3 font-medium">Order ID</th>
                    <th className="py-3 font-medium">User</th>
                    <th className="py-3 font-medium">Total</th>
                    <th className="py-3 font-medium">Razorpay</th>
                    <th className="py-3 font-medium">Status</th>
                    <th className="py-3 font-medium">Date</th>
                    <th className="py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 font-mono text-xs text-slate-900">{o.id.slice(0,8)}</td>
                      <td className="font-mono text-xs text-slate-600">{o.user_id?.slice(0,8) ?? "guest"}</td>
                      <td className="font-medium text-slate-900">₹{Number(o.total).toLocaleString()}</td>
                      <td className="font-mono text-xs text-slate-500">{o.razorpay_payment_id || o.razorpay_order_id || "—"}</td>
                      <td>
                        <Badge variant={o.status === "paid" ? "default" : "secondary"} className={o.status === "paid" ? "bg-sky-500 hover:bg-sky-600" : ""}>
                          {o.status}
                        </Badge>
                      </td>
                      <td className="text-slate-600">{new Date(o.created_at).toLocaleDateString()}</td>
                      <td className="text-right">
                        <select 
                          value={o.status} 
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)} 
                          className="bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-700 focus:ring-sky-500 focus:border-sky-500 outline-none"
                        >
                          {["created","paid","shipped","delivered","cancelled"].map(s => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!orders.length && <p className="text-slate-400 text-sm py-6 text-center">No orders yet.</p>}
            </div>
          </Section>
        )}

        {activeTab === "products" && (
          <div className="max-w-2xl">
            <Section>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Add New Product</h3>
              <form onSubmit={saveProduct} className="space-y-4 text-sm">
                {["slug", "name", "tagline", "category"].map(k => (
                  <div key={k}>
                    <Label className="capitalize text-slate-700">{k}</Label>
                    <Input name={k} required={k === "slug" || k === "name" || k === "category"} className="mt-1 bg-white border-slate-200 text-slate-900" />
                  </div>
                ))}
                <div>
                  <Label className="text-slate-700">Image</Label>
                  <div className="mt-1">
                    <MediaPicker value={productImage} onChange={setProductImage} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-700">Price (₹)</Label>
                    <Input name="price" type="number" required className="mt-1 bg-white border-slate-200 text-slate-900" />
                  </div>
                  <div>
                    <Label className="text-slate-700">MRP (₹)</Label>
                    <Input name="mrp" type="number" className="mt-1 bg-white border-slate-200 text-slate-900" />
                  </div>
                </div>
                <div>
                  <Label className="text-slate-700">Description</Label>
                  <Textarea name="description" rows={4} className="mt-1 bg-white border-slate-200 text-slate-900" />
                </div>
                <Button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white w-full mt-2 py-6 text-md font-semibold">
                  Save Product
                </Button>
              </form>
            </Section>
          </div>
        )}

        {activeTab === "reviews" && (
          <Section>
            <div className="space-y-4">
              {reviews.map(r => (
                <div key={r.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="text-xs text-slate-400 font-medium">
                        {new Date(r.created_at).toLocaleString()} <span className="mx-2">•</span> <span className="text-sky-500">{r.product_slug}</span> <span className="mx-2">•</span> {r.rating}★
                      </div>
                      {r.title && <div className="font-bold text-slate-900 mt-1">{r.title}</div>}
                      <p className="text-sm text-slate-700 mt-2 whitespace-pre-wrap">{r.body}</p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge variant={r.approved ? "default" : "secondary"} className={r.approved ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none shadow-none" : ""}>
                        {r.approved ? "Approved" : "Hidden"}
                      </Badge>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="text-slate-500 hover:text-sky-600 hover:bg-sky-50" onClick={() => toggleReview(r.id, !r.approved)}>
                          {r.approved ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button size="icon" variant="ghost" className="text-slate-500 hover:text-red-600 hover:bg-red-50" onClick={() => deleteReview(r.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {!reviews.length && <p className="text-slate-400 text-sm py-6 text-center">No reviews yet.</p>}
            </div>
          </Section>
        )}

        {activeTab === "media" && (
          <Section>
            <MediaLibrary embedded />
          </Section>
        )}

        {activeTab === "messages" && (
          <Section>
            <div className="space-y-4">
              {messages.map(m => (
                <div key={m.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-slate-900">{m.name} <span className="text-slate-500 font-normal text-sm ml-2">{m.email}</span></div>
                      <div className="text-xs text-slate-400 mt-1">{new Date(m.created_at).toLocaleString()} {m.subject && `• ${m.subject}`}</div>
                    </div>
                    <Button size="icon" variant="ghost" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => deleteMessage(m.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-slate-700 mt-3 whitespace-pre-wrap">{m.message}</p>
                </div>
              ))}
              {!messages.length && <p className="text-slate-400 text-sm py-6 text-center">No messages yet.</p>}
            </div>
          </Section>
        )}

        {activeTab === "settings" && (
          <div className="max-w-md">
            <Section>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Admin Settings</h3>
              <div className="space-y-5">
                <div>
                  <Label className="text-slate-700">Admin Email (lock to one account)</Label>
                  <Input 
                    value={settings.admin_email || ""} 
                    onChange={(e) => setSettings({ ...settings, admin_email: e.target.value })} 
                    className="mt-1.5 bg-white border-slate-200 text-slate-900 focus-visible:ring-sky-500" 
                  />
                </div>
                <div>
                  <Label className="text-slate-700">Admin Secret Code</Label>
                  <Input 
                    value={settings.secret_code || ""} 
                    onChange={(e) => setSettings({ ...settings, secret_code: e.target.value })} 
                    className="mt-1.5 bg-white border-slate-200 text-slate-900 focus-visible:ring-sky-500" 
                  />
                </div>
                <Button onClick={saveSettings} className="bg-sky-500 hover:bg-sky-600 text-white w-full py-6 text-md font-semibold">
                  Save Settings
                </Button>
              </div>
            </Section>
          </div>
        )}
      </main>
    </div>
  );
}