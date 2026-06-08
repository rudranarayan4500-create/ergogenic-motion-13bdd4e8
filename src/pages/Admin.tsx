import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Trash2, Edit3, Check, X } from "lucide-react";
import { MediaLibrary, MediaPicker } from "@/components/MediaPicker";
import { MediaGalleryEditor } from "@/components/MediaGalleryEditor";
import { ArticleEditor } from "@/components/ArticleEditor";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Section = ({ children }: any) => (
  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">{children}</div>
);

export default function Admin() {
  const { signOut } = useAuth();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({ secret_code: "", admin_email: "" });
  const [productImage, setProductImage] = useState("");
  const [newOrderCount, setNewOrderCount] = useState(0);
  const [mediaProduct, setMediaProduct] = useState<any | null>(null);

  // Price Customization Tracking States
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editMrp, setEditMrp] = useState<number>(0);

  const loadAll = async () => {
    const [p, o, pr, m, s, rv] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      supabase.from("admin_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("reviews").select("*").order("created_at", { ascending: false }),
    ]);
    setProfiles(p.data ?? []); 
    setOrders(o.data ?? []); 
    setProducts(pr.data ?? []); 
    setMessages(m.data ?? []); 
    setReviews(rv.data ?? []);
    setNewOrderCount((o.data ?? []).filter((x: any) => !x.seen_by_admin).length);
    if (s.data) setSettings(s.data);
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
    const { error } = await supabase.from("user_roles").insert({ user_id: uid, role: "admin" });
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else toast({ title: "Role granted" });
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    loadAll();
  };

  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    loadAll();
  };

  const startPriceEdit = (p: any) => {
    setEditingProductId(p.id);
    setEditPrice(p.price);
    setEditMrp(p.mrp || p.price);
  };

  const saveCustomPrice = async (id: string) => {
    const { error } = await supabase
      .from("products")
      .update({ price: editPrice, mrp: editMrp })
      .eq("id", id);

    if (error) {
      toast({ title: "Failed to update price", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Price customized successfully" });
      setEditingProductId(null);
      loadAll();
    }
  };

  const saveProductMedia = async (media: any[]) => {
    if (!mediaProduct) return;
    const { error } = await supabase.from("products").update({ media }).eq("id", mediaProduct.id);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else { setMediaProduct({ ...mediaProduct, media }); loadAll(); }
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
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else { 
      toast({ title: "Product added successfully" }); 
      (e.target as HTMLFormElement).reset(); 
      setProductImage(""); 
      loadAll(); 
    }
  };

  const deleteMessage = async (id: string) => { await supabase.from("contact_messages").delete().eq("id", id); loadAll(); };

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
      secret_code: settings.secret_code, admin_email: settings.admin_email, updated_at: new Date().toISOString(),
    }).eq("id", 1);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else toast({ title: "Settings saved" });
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen antialiased selection:bg-slate-900 selection:text-white">
      <PageHero eyebrow="Admin" title="Control Center" subtitle="Manage users, orders, products, and adjust product custom price lines." />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-7xl space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1 w-full text-left">
              {[
                { l: "Users", v: profiles.length },
                { l: "Orders", v: orders.length },
                { l: "Products", v: products.length },
                { l: "Messages", v: messages.length }
              ].map(s => (
                <div key={s.l} className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{s.l}</div>
                  <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{s.v}</div>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={() => signOut().then(() => location.href = "/")} className="border-slate-900 text-slate-900 hover:bg-slate-50 font-black uppercase text-xs h-11 px-5 rounded-xl shrink-0">
              Sign out
            </Button>
          </div>

          <Tabs defaultValue="users" className="w-full text-left">
            <TabsList className="bg-slate-100 border border-slate-200 p-1 rounded-xl h-12">
              <TabsTrigger value="users" className="font-bold text-xs uppercase tracking-wider px-4">Users</TabsTrigger>
              <TabsTrigger value="orders" className="relative font-bold text-xs uppercase tracking-wider px-4" onClick={markOrdersSeen}>
                Orders
                {newOrderCount > 0 && <span className="ml-2 h-4 min-w-4 px-1.5 rounded-full bg-slate-900 text-[10px] text-white font-mono flex items-center justify-center font-black animate-pulse">{newOrderCount}</span>}
              </TabsTrigger>
              <TabsTrigger value="products" className="font-bold text-xs uppercase tracking-wider px-4">Products &amp; Prices</TabsTrigger>
              <TabsTrigger value="articles" className="font-bold text-xs uppercase tracking-wider px-4">Articles</TabsTrigger>
              <TabsTrigger value="reviews" className="font-bold text-xs uppercase tracking-wider px-4">Reviews</TabsTrigger>
              <TabsTrigger value="media" className="font-bold text-xs uppercase tracking-wider px-4">Media</TabsTrigger>
              <TabsTrigger value="messages" className="font-bold text-xs uppercase tracking-wider px-4">Messages</TabsTrigger>
              <TabsTrigger value="settings" className="font-bold text-xs uppercase tracking-wider px-4">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="pt-4"><Section>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-slate-400 text-left border-b border-slate-200 font-black uppercase tracking-wider text-xs">
                    <tr><th className="py-3">Name</th><th>Email</th><th>Phone</th><th>Joined</th><th>Status</th><th></th></tr>
                  </thead>
                  <tbody className="font-medium text-slate-700">
                    {profiles.map(p => (
                      <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 font-bold text-slate-900">{p.full_name || "—"}</td>
                        <td>{p.email}</td>
                        <td className="font-mono text-xs">{p.phone || "—"}</td>
                        <td className="font-mono text-xs">{new Date(p.created_at).toLocaleDateString()}</td>
                        <td>{p.blocked ? <Badge variant="destructive">Blocked</Badge> : <Badge className="bg-slate-900 text-white">Active</Badge>}</td>
                        <td className="text-right space-x-2">
                          <Button size="sm" variant="outline" className="border-slate-300 text-slate-800 rounded-lg text-xs font-bold" onClick={() => blockUser(p.id, !p.blocked)}>{p.blocked ? "Unblock" : "Block"}</Button>
                          <Button size="sm" variant="outline" className="border-slate-300 text-slate-800 rounded-lg text-xs font-bold" onClick={() => makeAdmin(p.id)}>Make admin</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section></TabsContent>

            <TabsContent value="orders" className="pt-4"><Section>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-slate-400 text-left border-b border-slate-200 font-black uppercase tracking-wider text-xs">
                    <tr><th className="py-3">Order</th><th>User</th><th>Total</th><th>Razorpay</th><th>Status</th><th>Date</th><th>Action</th></tr>
                  </thead>
                  <tbody className="font-medium text-slate-700">
                    {orders.map(o => (
                      <tr key={o.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 font-mono text-xs font-black text-slate-900">{o.id.slice(0,8)}</td>
                        <td className="font-mono text-xs text-slate-500">{o.user_id?.slice(0,8) ?? "guest"}</td>
                        <td className="font-mono font-bold text-slate-900">₹{Number(o.total).toLocaleString()}</td>
                        <td className="font-mono text-xs text-slate-500">{o.razorpay_payment_id || o.razorpay_order_id || "—"}</td>
                        <td><Badge className={o.status === "paid" || o.status === "delivered" ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-800"}>{o.status}</Badge></td>
                        <td className="font-mono text-xs">{new Date(o.created_at).toLocaleDateString()}</td>
                        <td className="text-right">
                          <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value)} className="bg-white border border-slate-300 text-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-bold focus:border-slate-900 focus:outline-none cursor-pointer">
                            {["created","paid","shipped","delivered","cancelled"].map(s => <option key={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!orders.length && <p className="text-slate-400 text-sm py-8 text-center font-bold">No orders logged inside data streams yet.</p>}
              </div>
            </Section></TabsContent>

            <TabsContent value="products" className="pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <Section>
                  <h3 className="font-black text-slate-900 uppercase tracking-tight text-base mb-4 border-b border-slate-200 pb-2">Add New Product</h3>
                  <form onSubmit={saveProduct} className="space-y-4 text-sm">
                    {["slug", "name", "tagline", "category"].map(k => (
                      <div key={k}>
                        <Label className="text-xs font-black uppercase tracking-wider text-slate-700 capitalize">{k}</Label>
                        <Input name={k} required={k==="slug"||k==="name"||k==="category"} className="mt-2 bg-white border-slate-900 text-slate-900 rounded-xl h-10 shadow-inner focus-visible:ring-slate-950" />
                      </div>
                    ))}
                    <div>
                      <Label className="text-xs font-black uppercase tracking-wider text-slate-700">Display Thumbnail</Label>
                      <div className="mt-2 bg-white rounded-xl border border-slate-300 p-1"><MediaPicker value={productImage} onChange={setProductImage} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-black uppercase tracking-wider text-slate-700">Price (₹)</Label>
                        <Input name="price" type="number" required className="mt-2 bg-white border-slate-900 text-slate-900 rounded-xl h-10 shadow-inner focus-visible:ring-slate-950" />
                      </div>
                      <div>
                        <Label className="text-xs font-black uppercase tracking-wider text-slate-700">MRP (₹)</Label>
                        <Input name="mrp" type="number" className="mt-2 bg-white border-slate-900 text-slate-900 rounded-xl h-10 shadow-inner focus-visible:ring-slate-950" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-black uppercase tracking-wider text-slate-700">Product Specifications Breakdown</Label>
                      <Textarea name="description" rows={3} className="mt-2 bg-white border-slate-900 text-slate-900 rounded-xl shadow-inner focus-visible:ring-slate-950 resize-none" />
                    </div>
                    <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800 w-full font-black uppercase tracking-wider text-xs h-11 rounded-xl shadow-md transition-colors">
                      Save &amp; Catalog Product
                    </Button>
                  </form>
                </Section>
                
                <div className="lg:col-span-2">
                  <Section>
                    <h3 className="font-black text-slate-900 uppercase tracking-tight text-base mb-4 border-b border-slate-200 pb-2">All Products Catalog &amp; Custom Prices ({products.length})</h3>
                    <div className="space-y-3">
                      {products.map(p => (
                        <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm gap-4 text-left">
                          <div className="space-y-1">
                            <div className="font-black text-slate-900 text-base">{p.name} <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase ml-1 tracking-wider">{p.category}</span></div>
                            <div className="text-xs font-mono font-bold text-slate-400">{p.slug}</div>
                            
                            {/* LIVE PRICE CONTROL DECK INTERFACE */}
                            {editingProductId === p.id ? (
                              <div className="flex items-center gap-2 pt-2 bg-slate-50 border border-slate-200 p-2.5 rounded-xl mt-1.5">
                                <div className="w-24">
                                  <Label className="text-[9px] font-black uppercase text-slate-500">Price (₹)</Label>
                                  <Input type="number" value={editPrice} onChange={(e) => setEditPrice(Number(e.target.value))} className="h-8 text-xs font-mono border-slate-400 bg-white" />
                                </div>
                                <div className="w-24">
                                  <Label className="text-[9px] font-black uppercase text-slate-500">MRP (₹)</Label>
                                  <Input type="number" value={editMrp} onChange={(e) => setEditMrp(Number(e.target.value))} className="h-8 text-xs font-mono border-slate-400 bg-white" />
                                </div>
                                <div className="flex items-end gap-1 h-full pt-4">
                                  <Button size="icon" className="h-8 w-8 bg-emerald-600 text-white hover:bg-emerald-700" onClick={() => saveCustomPrice(p.id)}><Check className="h-3.5 w-3.5" /></Button>
                                  <Button size="icon" variant="outline" className="h-8 w-8 border-slate-300 text-slate-600" onClick={() => setEditingProductId(null)}><X className="h-3.5 w-3.5" /></Button>
                                </div>
                              </div>
                            ) : (
                              <div className="text-sm font-mono pt-1 flex items-center gap-3">
                                <div><span className="text-slate-400 font-sans font-medium text-xs">Price:</span> <strong className="text-slate-900 font-black">₹{p.price.toLocaleString()}</strong></div>
                                <div><span className="text-slate-400 font-sans font-medium text-xs">MRP:</span> <span className="text-slate-400 line-through font-bold">₹{(p.mrp || p.price).toLocaleString()}</span></div>
                                <button onClick={() => startPriceEdit(p)} className="text-blue-600 hover:text-blue-700 text-xs font-black flex items-center gap-0.5 ml-1"><Edit3 className="h-3 w-3" /> Edit Price</button>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <Button size="sm" variant="outline" className="border-slate-300 text-slate-800 font-bold text-xs rounded-xl shadow-sm bg-white hover:bg-slate-50 h-9" onClick={() => setMediaProduct(p)}>
                              Gallery ({(p.media ?? []).length})
                            </Button>
                            <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-red-600 rounded-xl" onClick={() => deleteProduct(p.id)}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="articles" className="pt-4"><ArticleEditor /></TabsContent>

            <TabsContent value="reviews" className="pt-4"><Section>
              <div className="space-y-3">
                {reviews.map(r => (
                  <div key={r.id} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="text-xs font-mono font-bold text-slate-400">{new Date(r.created_at).toLocaleString()} · <span className="text-slate-900 font-sans font-black">{r.product_slug}</span> · <span className="text-amber-500 font-sans font-black">{r.rating}★</span></div>
                        {r.title && <div className="font-black text-slate-900 mt-1.5 text-sm">{r.title}</div>}
                        <p className="text-sm text-slate-600 mt-1 whitespace-pre-wrap font-medium">{r.body}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <Badge className={r.approved ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 border-slate-200"}>{r.approved ? "Approved" : "Hidden"}</Badge>
                        <div className="flex items-center gap-0.5">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-slate-900" onClick={() => toggleReview(r.id, !r.approved)}>{r.approved ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-600" onClick={() => deleteReview(r.id)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {!reviews.length && <p className="text-slate-400 text-sm py-8 text-center font-bold">No product consumer reviews published yet.</p>}
              </div>
            </Section></TabsContent>

            <TabsContent value="media" className="pt-4"><Section>
              <MediaLibrary embedded />
            </Section></TabsContent>

            <TabsContent value="messages" className="pt-4"><Section>
              <div className="space-y-3">
                {messages.map(m => (
                  <div key={m.id} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="font-black text-slate-900 text-sm">{m.name} <span className="text-slate-400 text-xs font-mono font-bold">· {m.email}</span></div>
                        <div className="text-xs font-mono font-bold text-slate-400 mt-0.5">{new Date(m.created_at).toLocaleString()} {m.subject && `· ${m.subject}`}</div>
                      </div>
                      <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-400 hover:text-red-600 rounded-xl" onClick={() => deleteMessage(m.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                    <p className="text-sm text-slate-600 mt-3 font-medium whitespace-pre-wrap border-t border-slate-100 pt-2.5">{m.message}</p>
                  </div>
                ))}
                {!messages.length && <p className="text-slate-400 text-sm py-8 text-center font-bold">No consumer inbox messages archived yet.</p>}
              </div>
            </Section></TabsContent>

            <TabsContent value="settings" className="pt-4"><Section>
              <div className="space-y-5 max-w-md text-left">
                <div>
                  <Label className="text-xs font-black uppercase tracking-wider text-slate-700">Admin email (lock to one account)</Label>
                  <Input value={settings.admin_email || ""} onChange={(e) => setSettings({ ...settings, admin_email: e.target.value })} className="mt-2 bg-white border-slate-900 text-slate-900 rounded-xl h-11 shadow-inner focus-visible:ring-slate-950" />
                </div>
                <div>
                  <Label className="text-xs font-black uppercase tracking-wider text-slate-700">Admin secret code</Label>
                  <Input value={settings.secret_code || ""} onChange={(e) => setSettings({ ...settings, secret_code: e.target.value })} className="mt-2 bg-white border-slate-900 text-slate-900 rounded-xl h-11 shadow-inner focus-visible:ring-slate-950" />
                </div>
                <Button onClick={saveSettings} className="bg-slate-900 text-white hover:bg-slate-800 font-black uppercase tracking-wider text-xs h-12 px-6 rounded-xl shadow-md transition-colors">
                  Save Gateway Settings
                </Button>
              </div>
            </Section></TabsContent>
          </Tabs>
        </div>
      </section>

      <Dialog open={!!mediaProduct} onOpenChange={(v) => !v && setMediaProduct(null)}>
        <DialogContent className="bg-white border border-slate-200 text-slate-900 max-w-2xl rounded-2xl">
          <DialogHeader><DialogTitle className="font-black text-lg uppercase tracking-tight text-slate-900">{mediaProduct?.name} — Gallery Ledger</DialogTitle></DialogHeader>
          {mediaProduct && (
            <MediaGalleryEditor value={mediaProduct.media ?? []} onChange={saveProductMedia} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}