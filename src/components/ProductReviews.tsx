import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

type Review = { id: string; user_id: string; rating: number; title: string | null; body: string; created_at: string; approved: boolean };

export const ProductReviews = ({ slug }: { slug: string }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [canPost, setCanPost] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("reviews").select("*").eq("product_slug", slug).order("created_at", { ascending: false });
    setReviews((data ?? []) as Review[]);
  };

  useEffect(() => {
    load();
    if (!user) { setCanPost(false); return; }
    (async () => {
      const { data } = await supabase
        .from("order_items")
        .select("id, orders!inner(user_id, status)")
        .eq("product_slug", slug)
        .eq("orders.user_id", user.id)
        .in("orders.status", ["paid", "shipped", "delivered"])
        .limit(1);
      setCanPost((data?.length ?? 0) > 0);
    })();
  }, [slug, user]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      user_id: user.id, product_slug: slug, rating, title: title || null, body,
    });
    setSubmitting(false);
    if (error) { toast({ title: "Couldn't post", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Thanks for the review!" });
    setTitle(""); setBody(""); setRating(5);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="p-5 bg-card border border-white/10 rounded-lg">
        {!user && (
          <p className="text-sm text-white/70"><Link to="/auth" className="text-primary underline">Sign in</Link> to leave a review. Only verified buyers can post.</p>
        )}
        {user && !canPost && (
          <p className="text-sm text-white/70">Only customers who have purchased this product can review it.</p>
        )}
        {user && canPost && (
          <form onSubmit={submit} className="space-y-3">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((n) => (
                <button type="button" key={n} onClick={() => setRating(n)} aria-label={`${n} star${n>1?"s":""}`}>
                  <Star className={`h-6 w-6 ${n <= rating ? "fill-primary text-primary" : "text-white/30"} transition-transform hover:scale-110`} />
                </button>
              ))}
            </div>
            <Input placeholder="Review title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} className="bg-background border-white/15" />
            <Textarea required placeholder="Share your honest experience…" value={body} onChange={(e) => setBody(e.target.value)} maxLength={1500} className="bg-background border-white/15" rows={4} />
            <Button type="submit" disabled={submitting || !body.trim()} className="bg-primary hover:bg-primary/90">{submitting ? "Posting…" : "Post review"}</Button>
          </form>
        )}
      </div>

      {reviews.filter(r => r.approved).map((r) => (
        <div key={r.id} className="p-5 bg-card border border-white/10 rounded-lg animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-full bg-primary/20 grid place-items-center text-primary font-bold">{(r.user_id.slice(0,1)||"U").toUpperCase()}</div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Verified Buyer</p>
              <div className="flex">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className={`h-3 w-3 ${j < r.rating ? "fill-primary text-primary" : "text-white/20"}`} />)}</div>
            </div>
            <span className="text-xs text-white/40">{new Date(r.created_at).toLocaleDateString()}</span>
          </div>
          {r.title && <p className="font-semibold mb-1">{r.title}</p>}
          <p className="text-sm text-white/75 whitespace-pre-wrap">{r.body}</p>
        </div>
      ))}
      {!reviews.filter(r=>r.approved).length && <p className="text-sm text-white/40 text-center py-6">Be the first to review this product.</p>}
    </div>
  );
};