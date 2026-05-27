import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { PageHero } from "@/components/PageHero";
import { useAuth } from "@/hooks/useAuth";
import { ShieldCheck } from "lucide-react";

const genCaptcha = () => {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { q: `${a} + ${b}`, a: a + b };
};

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState(genCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [secret, setSecret] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => { if (user && isAdmin) nav("/admin"); }, [user, isAdmin, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaInput, 10) !== captcha.a) {
      toast({ title: "Captcha incorrect", variant: "destructive" });
      setCaptcha(genCaptcha()); setCaptchaInput("");
      return;
    }
    setBusy(true);
    try {
      // Sign in (if not already)
      if (!user) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      // Verify secret on server (security definer fn)
      const { data: ok, error: e2 } = await supabase.rpc("verify_admin_secret", { _code: secret });
      if (e2) throw e2;
      if (!ok) throw new Error("Invalid secret code");

      // Check admin role; if none assigned yet, attempt claim
      const uid = (await supabase.auth.getUser()).data.user?.id;
      const { data: roleRow } = await supabase.from("user_roles").select("role").eq("user_id", uid!).eq("role", "admin").maybeSingle();
      if (!roleRow) {
        const { data: claimed } = await supabase.rpc("claim_admin", { _code: secret });
        if (!claimed) throw new Error("This account is not authorized as admin.");
      }
      toast({ title: "Welcome, admin" });
      nav("/admin");
      // soft reload role
      setTimeout(() => location.reload(), 200);
    } catch (err: any) {
      toast({ title: "Admin sign-in failed", description: err.message, variant: "destructive" });
      setCaptcha(genCaptcha()); setCaptchaInput("");
    } finally { setBusy(false); }
  };

  return (
    <>
      <PageHero eyebrow="Restricted" title="Admin sign in" subtitle="Username, password, captcha and secret code required." />
      <section className="py-16">
        <div className="container max-w-md">
          <form onSubmit={submit} className="bg-card border border-white/10 rounded-xl p-8 space-y-4">
            <div className="flex items-center gap-2 text-primary"><ShieldCheck className="h-5 w-5" /><span className="text-sm font-semibold">Admin Access</span></div>
            <div><Label>Email (username)</Label><Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 bg-background border-white/15" /></div>
            <div><Label>Password</Label><Input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 bg-background border-white/15" /></div>
            <div>
              <Label>Captcha: what is {captcha.q}?</Label>
              <Input required value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} className="mt-1.5 bg-background border-white/15" />
            </div>
            <div><Label>Secret code</Label><Input required type="password" value={secret} onChange={(e) => setSecret(e.target.value)} className="mt-1.5 bg-background border-white/15" placeholder="Default: ERGO-ADMIN-2026" /></div>
            <Button disabled={busy} type="submit" className="w-full bg-primary hover:bg-primary/90">{busy ? "Verifying…" : "Enter admin panel"}</Button>
            <p className="text-xs text-white/40">First sign-in with the secret code claims the admin role for that account. Change the secret in Admin → Settings afterwards.</p>
          </form>
        </div>
      </section>
    </>
  );
}