import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Image as ImageIcon, Trash2, Upload, Link2 } from "lucide-react";

type Asset = { id: string; name: string; url: string; path: string; kind: string };

// Upload a single file to the media bucket and record it in media_assets. Returns public URL.
export const uploadMediaFile = async (f: File): Promise<string> => {
  const { data: u } = await supabase.auth.getUser();
  const uid = u.user?.id;
  const path = `${uid ?? "anon"}/${Date.now()}-${f.name.replace(/[^\w.-]+/g, "_")}`;
  const { error: upErr } = await supabase.storage.from("media").upload(path, f, { upsert: false, contentType: f.type });
  if (upErr) throw upErr;
  const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
  const kind = f.type.startsWith("video") ? "video" : "image";
  await supabase.from("media_assets").insert({ name: f.name, url: pub.publicUrl, path, kind, size_bytes: f.size, uploaded_by: uid ?? null });
  return pub.publicUrl;
};

export const MediaPicker = ({ value, onChange }: { value?: string; onChange: (url: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    try {
      const url = await uploadMediaFile(files[0]);
      onChange(url);
      toast({ title: "Image uploaded" });
    } catch (e: any) {
      toast({ title: "Upload failed", description: e.message, variant: "destructive" });
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <>
      <div className="space-y-2">
        <div className="flex gap-2 items-center flex-wrap">
          {value ? (
            <img src={value} alt="" className="h-12 w-12 object-cover rounded border border-zinc-200" />
          ) : (
            <div className="h-12 w-12 rounded border border-dashed border-zinc-300 grid place-items-center text-zinc-400">
              <ImageIcon className="h-4 w-4" />
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*,video/*" hidden onChange={(e) => handleFile(e.target.files)} />
          <Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => fileRef.current?.click()}>
            <Upload className="h-3.5 w-3.5 mr-1.5" /> {busy ? "Uploading…" : "Upload"}
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={() => setOpen(true)}>
            Library
          </Button>
          {value && <Button type="button" size="sm" variant="ghost" onClick={() => onChange("")}>Remove</Button>}
        </div>
        <div className="flex gap-2 items-center">
          <Link2 className="h-3.5 w-3.5 text-zinc-400" />
          <Input
            placeholder="Or paste image URL and press Enter"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && urlInput.trim()) {
                onChange(urlInput.trim());
                setUrlInput("");
              }
            }}
            className="h-8 text-xs"
          />
          {urlInput.trim() && (
            <Button type="button" size="sm" variant="secondary" onClick={() => { onChange(urlInput.trim()); setUrlInput(""); }}>
              Set
            </Button>
          )}
        </div>
      </div>
      <MediaLibrary
        open={open}
        onOpenChange={setOpen}
        onSelect={(url) => { onChange(url); setOpen(false); }}
      />
    </>
  );
};

export const MediaLibrary = ({
  open, onOpenChange, onSelect, embedded,
}: {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  onSelect?: (url: string) => void;
  embedded?: boolean;
}) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const { data } = await supabase.from("media_assets").select("*").order("created_at", { ascending: false });
    setAssets((data ?? []) as Asset[]);
  };

  useEffect(() => {
    if (embedded || open) load();
  }, [embedded, open]);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;
      for (const f of Array.from(files)) {
        const path = `${uid ?? "anon"}/${Date.now()}-${f.name.replace(/[^\w.-]+/g, "_")}`;
        const { error: upErr } = await supabase.storage.from("media").upload(path, f, { upsert: false, contentType: f.type });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("media").getPublicUrl(path);
        const kind = f.type.startsWith("video") ? "video" : "image";
        const { error: insErr } = await supabase.from("media_assets").insert({ name: f.name, url: pub.publicUrl, path, kind, size_bytes: f.size, uploaded_by: uid ?? null });
        if (insErr) throw insErr;
      }
      toast({ title: "Uploaded" });
      load();
    } catch (e: any) {
      toast({ title: "Upload failed", description: e.message, variant: "destructive" });
    } finally { setBusy(false); }
  };

  const remove = async (a: Asset) => {
    await supabase.storage.from("media").remove([a.path]);
    await supabase.from("media_assets").delete().eq("id", a.id);
    load();
  };

  const body = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/60">{assets.length} asset{assets.length === 1 ? "" : "s"}</p>
        <div>
          <input ref={inputRef} type="file" multiple accept="image/*,video/*" hidden onChange={(e) => upload(e.target.files)} />
          <Button type="button" size="sm" className="bg-primary hover:bg-primary/90" disabled={busy} onClick={() => inputRef.current?.click()}>
            <Upload className="h-4 w-4 mr-1.5" /> {busy ? "Uploading…" : "Upload"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto">
        {assets.map((a) => (
          <div key={a.id} className="group relative bg-background/40 border border-white/10 rounded-lg overflow-hidden">
            <button type="button" onClick={() => onSelect?.(a.url)} className="block w-full aspect-square bg-black">
              {a.kind === "video" ? (
                <video src={a.url} className="h-full w-full object-cover" muted />
              ) : (
                <img src={a.url} alt={a.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              )}
            </button>
            <div className="p-2 flex items-center justify-between">
              <span className="text-xs text-white/70 truncate flex-1" title={a.name}>{a.name}</span>
              <button type="button" onClick={() => remove(a)} className="text-white/50 hover:text-primary">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
        {!assets.length && <p className="col-span-full text-center text-white/40 text-sm py-10">Nothing here yet. Upload your first image or video.</p>}
      </div>
    </div>
  );

  if (embedded) return body;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-white/10 text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle>Media library</DialogTitle>
        </DialogHeader>
        {body}
      </DialogContent>
    </Dialog>
  );
};