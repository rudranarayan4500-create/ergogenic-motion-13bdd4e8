import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { MediaPicker } from "@/components/MediaPicker";

type Article = {
  id?: string; slug: string; title: string; category: string; tags: string[];
  read_time: string; excerpt: string; cover_url: string; body: string; published: boolean;
};

const empty: Article = { slug: "", title: "", category: "General", tags: [], read_time: "5 min read", excerpt: "", cover_url: "", body: "", published: false };
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);

export const ArticleEditor = () => {
  const [list, setList] = useState<Article[]>([]);
  const [draft, setDraft] = useState<Article>(empty);
  const [tagInput, setTagInput] = useState("");

  const load = async () => {
    const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    setList((data ?? []) as Article[]);
  };
  useEffect(() => { load(); }, []);

  const edit = (a: Article) => { setDraft({ ...a, tags: a.tags ?? [] }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const reset = () => setDraft(empty);

  const save = async () => {
    if (!draft.title || !draft.body) { toast({ title: "Title and body are required", variant: "destructive" }); return; }
    const slug = draft.slug || slugify(draft.title);
    const payload = { ...draft, slug };
    const { error } = draft.id
      ? await supabase.from("articles").update(payload).eq("id", draft.id)
      : await supabase.from("articles").insert(payload);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else { toast({ title: draft.id ? "Article updated" : "Article created" }); reset(); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    await supabase.from("articles").delete().eq("id", id);
    load();
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (!t || draft.tags.includes(t)) return;
    setDraft({ ...draft, tags: [...draft.tags, t] });
    setTagInput("");
  };

  return (
    <div className="grid lg:grid-cols-5 gap-4">
      <div className="lg:col-span-3 bg-card border border-white/10 rounded-xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">{draft.id ? "Edit article" : "New article"}</h3>
          {draft.id && <Button size="sm" variant="ghost" onClick={reset}><X className="h-4 w-4 mr-1" /> New</Button>}
        </div>
        <div><Label>Title</Label><Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value, slug: draft.id ? draft.slug : slugify(e.target.value) })} className="mt-1 bg-background border-white/15" /></div>
        <div className="grid grid-cols-2 gap-2">
          <div><Label>Slug</Label><Input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: slugify(e.target.value) })} className="mt-1 bg-background border-white/15" /></div>
          <div><Label>Category</Label><Input value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className="mt-1 bg-background border-white/15" /></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div><Label>Read time</Label><Input value={draft.read_time} onChange={(e) => setDraft({ ...draft, read_time: e.target.value })} placeholder="6 min read" className="mt-1 bg-background border-white/15" /></div>
          <div><Label>Cover image</Label><div className="mt-1"><MediaPicker value={draft.cover_url} onChange={(u) => setDraft({ ...draft, cover_url: u })} /></div></div>
        </div>
        <div>
          <Label>Tags</Label>
          <div className="flex gap-2 mt-1">
            <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="press Enter to add" className="bg-background border-white/15" />
            <Button type="button" size="icon" variant="outline" className="border-white/15" onClick={addTag}><Plus className="h-4 w-4" /></Button>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {draft.tags.map((t) => (
              <Badge key={t} variant="secondary" className="gap-1">{t}
                <button onClick={() => setDraft({ ...draft, tags: draft.tags.filter((x) => x !== t) })}><X className="h-3 w-3" /></button>
              </Badge>
            ))}
          </div>
        </div>
        <div><Label>Excerpt</Label><Textarea rows={2} value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} className="mt-1 bg-background border-white/15" /></div>
        <div><Label>Body (one paragraph per line)</Label><Textarea rows={10} value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} className="mt-1 bg-background border-white/15 font-mono text-sm" /></div>
        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 text-sm"><Switch checked={draft.published} onCheckedChange={(v) => setDraft({ ...draft, published: v })} /> Published</label>
          <Button onClick={save} className="bg-primary hover:bg-primary/90">{draft.id ? "Update" : "Create"}</Button>
        </div>
      </div>
      <div className="lg:col-span-2 bg-card border border-white/10 rounded-xl p-6">
        <h3 className="font-bold mb-3">All articles ({list.length})</h3>
        <div className="space-y-2 max-h-[70vh] overflow-y-auto">
          {list.map((a) => (
            <div key={a.id} className="p-3 bg-background/40 border border-white/5 rounded-lg">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm truncate">{a.title}</div>
                  <div className="text-xs text-white/40 truncate">{a.category} · {a.read_time} · {a.published ? "Published" : "Draft"}</div>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => edit(a)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(a.id!)}><Trash2 className="h-3.5 w-3.5 text-primary" /></Button>
                </div>
              </div>
            </div>
          ))}
          {!list.length && <p className="text-white/40 text-sm py-6 text-center">No articles yet. Create your first.</p>}
        </div>
      </div>
    </div>
  );
};
