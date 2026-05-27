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
import { Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Section = ({ children }: any) => <div className="bg-card border border-white/10 rounded-xl p-6">{children}</div>;

export default function Admin() {
  const { signOut } = useAuth();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({ secret_code: "", admin_email: "" });

  const loadAll = async () => {
    const [p, o, pr, m, s] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      supabase.from("admin_settings").select("*").eq("id", 1).maybeSingle(),
    ]);
    setProfiles(p.data ?? []); setOrders(o.data ?? []); setProducts(pr.data ?? []); setMessages(m.data ?? []);
    if (s.data) setSettings(s.data);
  };

  useEffect(() => { loadAll(); }, []);

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
      image: (f.get("image") as string) || null,
      description: f.get("description") as string,
    };
    const { error } = await supabase.from("products").insert(payload);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Product added" }); (e.target as HTMLFormElement).reset(); loadAll(); }
  };

  const deleteMessage = async (id: string) => { await supabase.from("contact_messages").delete().eq("id", id); loadAll(); };

  const saveSettings = async () => {
    const { error } = await supabase.from("admin_settings").update({
      secret_code: settings.secret_code, admin_email: settings.admin_email, updated_at: new Date().toISOString(),
    }).eq("id", 1);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else toast({ title: "Settings saved" });
  };

  return (
    <>
      <PageHero eyebrow="Admin" title="Control Center" subtitle="Manage users, orders, products and messages." />
      <section className="py-12">
        <div className="container space-y-6">
          <div className="flex justify-between items-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1 mr-4">
              {[{l:"Users",v:profiles.length},{l:"Orders",v:orders.length},{l:"Products",v:products.length},{l:"Messages",v:messages.length}].map(s => (
                <div key={s.l} className="bg-card border border-white/10 rounded-xl p-4"><div className="text-xs text-white/50">{s.l}</div><div className="text-2xl font-bold">{s.v}</div></div>
              ))}
            </div>
            <Button variant="outline" onClick={() => signOut().then(() => location.href = "/")} className="border-white/15">Sign out</Button>
          </div>

          <Tabs defaultValue="users">
            <TabsList className="bg-card border border-white/10">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="users"><Section>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-white/50 text-left border-b border-white/10"><tr><th className="py-2">Name</th><th>Email</th><th>Phone</th><th>Joined</th><th>Status</th><th></th></tr></thead>
                  <tbody>{profiles.map(p => (
                    <tr key={p.id} className="border-b border-white/5">
                      <td className="py-3">{p.full_name || "—"}</td><td>{p.email}</td><td>{p.phone || "—"}</td>
                      <td>{new Date(p.created_at).toLocaleDateString()}</td>
                      <td>{p.blocked ? <Badge variant="destructive">Blocked</Badge> : <Badge>Active</Badge>}</td>
                      <td className="text-right space-x-2">
                        <Button size="sm" variant="outline" className="border-white/15" onClick={() => blockUser(p.id, !p.blocked)}>{p.blocked ? "Unblock" : "Block"}</Button>
                        <Button size="sm" variant="outline" className="border-white/15" onClick={() => makeAdmin(p.id)}>Make admin</Button>
                      </td>
                    </tr>))}</tbody>
                </table>
              </div>
            </Section></TabsContent>

            <TabsContent value="orders"><Section>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-white/50 text-left border-b border-white/10"><tr><th className="py-2">Order</th><th>User</th><th>Total</th><th>Razorpay</th><th>Status</th><th>Date</th><th></th></tr></thead>
                  <tbody>{orders.map(o => (
                    <tr key={o.id} className="border-b border-white/5">
                      <td className="py-3 font-mono text-xs">{o.id.slice(0,8)}</td>
                      <td className="font-mono text-xs">{o.user_id?.slice(0,8) ?? "guest"}</td>
                      <td>₹{Number(o.total).toLocaleString()}</td>
                      <td className="font-mono text-xs">{o.razorpay_payment_id || o.razorpay_order_id || "—"}</td>
                      <td><Badge variant={o.status === "paid" ? "default" : "secondary"}>{o.status}</Badge></td>
                      <td>{new Date(o.created_at).toLocaleDateString()}</td>
                      <td className="text-right">
                        <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value)} className="bg-background border border-white/15 rounded px-2 py-1 text-xs">
                          {["created","paid","shipped","delivered","cancelled"].map(s => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>))}</tbody>
                </table>
                {!orders.length && <p className="text-white/40 text-sm py-6 text-center">No orders yet.</p>}
              </div>
            </Section></TabsContent>

            <TabsContent value="products"><div className="grid lg:grid-cols-3 gap-4">
              <Section>
                <h3 className="font-bold mb-3">Add product</h3>
                <form onSubmit={saveProduct} className="space-y-2 text-sm">
                  {["slug","name","tagline","category","image"].map(k => (
                    <div key={k}><Label className="capitalize">{k}</Label><Input name={k} required={k==="slug"||k==="name"||k==="category"} className="mt-1 bg-background border-white/15" /></div>
                  ))}
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label>Price</Label><Input name="price" type="number" required className="mt-1 bg-background border-white/15" /></div>
                    <div><Label>MRP</Label><Input name="mrp" type="number" className="mt-1 bg-background border-white/15" /></div>
                  </div>
                  <div><Label>Description</Label><Textarea name="description" rows={3} className="mt-1 bg-background border-white/15" /></div>
                  <Button type="submit" className="bg-primary hover:bg-primary/90 w-full">Save</Button>
                </form>
              </Section>
              <div className="lg:col-span-2"><Section>
                <h3 className="font-bold mb-3">All products ({products.length})</h3>
                <div className="space-y-2">
                  {products.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-background/40 border border-white/5 rounded-lg">
                      <div><div className="font-semibold">{p.name} <span className="text-xs text-white/40">/ {p.category}</span></div><div className="text-xs text-white/50">{p.slug} • ₹{p.price}</div></div>
                      <Button size="icon" variant="ghost" onClick={() => deleteProduct(p.id)}><Trash2 className="h-4 w-4 text-primary" /></Button>
                    </div>
                  ))}
                </div>
              </Section></div>
            </div></TabsContent>

            <TabsContent value="messages"><Section>
              <div className="space-y-3">
                {messages.map(m => (
                  <div key={m.id} className="p-4 bg-background/40 border border-white/5 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{m.name} <span className="text-white/40 text-xs">· {m.email}</span></div>
                        <div className="text-xs text-white/40">{new Date(m.created_at).toLocaleString()} {m.subject && `· ${m.subject}`}</div>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => deleteMessage(m.id)}><Trash2 className="h-4 w-4 text-primary" /></Button>
                    </div>
                    <p className="text-sm text-white/80 mt-2 whitespace-pre-wrap">{m.message}</p>
                  </div>
                ))}
                {!messages.length && <p className="text-white/40 text-sm py-6 text-center">No messages yet.</p>}
              </div>
            </Section></TabsContent>

            <TabsContent value="settings"><Section>
              <div className="space-y-4 max-w-md">
                <div><Label>Admin email (lock to one account)</Label><Input value={settings.admin_email || ""} onChange={(e) => setSettings({ ...settings, admin_email: e.target.value })} className="mt-1.5 bg-background border-white/15" /></div>
                <div><Label>Admin secret code</Label><Input value={settings.secret_code || ""} onChange={(e) => setSettings({ ...settings, secret_code: e.target.value })} className="mt-1.5 bg-background border-white/15" /></div>
                <Button onClick={saveSettings} className="bg-primary hover:bg-primary/90">Save settings</Button>
              </div>
            </Section></TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}