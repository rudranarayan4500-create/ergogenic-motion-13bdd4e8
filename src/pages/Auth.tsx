import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { PageHero } from "@/components/PageHero";
import { useAuth } from "@/hooks/useAuth";

const strongPass = (p: string) =>
  p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p) && /[^A-Za-z0-9]/.test(p);

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();
  const { user } = useAuth();

  useEffect(() => { if (user) nav("/"); }, [user, nav]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        if (!strongPass(password)) {
          toast({ title: "Weak password", description: "Min 8 chars, upper, lower, number, symbol.", variant: "destructive" });
          return;
        }
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin, data: { full_name: name, phone } },
        });
        if (error) throw error;
        toast({ title: "Welcome", description: "Account created." });
        nav("/");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        nav("/");
      }
    } catch (err: any) {
      toast({ title: "Auth failed", description: err.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) toast({ title: "Google sign-in failed", description: String(r.error), variant: "destructive" });
  };

  return (
    <>
      <PageHero eyebrow="Account" title={mode === "login" ? "Sign in" : "Create your account"} />
      <section className="py-16">
        <div className="container max-w-md">
          <form onSubmit={onSubmit} className="bg-card border border-white/10 rounded-xl p-8 space-y-4">
            {mode === "signup" && (
              <>
                <div><Label>Full name</Label><Input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 bg-background border-white/15" /></div>
                <div><Label>Phone</Label><Input required value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5 bg-background border-white/15" placeholder="+91…" /></div>
              </>
            )}
            <div><Label>Email</Label><Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 bg-background border-white/15" /></div>
            <div>
              <Label>Password</Label>
              <Input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 bg-background border-white/15" />
              {mode === "signup" && <p className="text-xs text-white/50 mt-1">Min 8 chars, with upper, lower, number & symbol.</p>}
            </div>
            <Button disabled={busy} type="submit" className="w-full bg-primary hover:bg-primary/90">{busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}</Button>
            <div className="relative my-3"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div><div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-white/50">or</span></div></div>
            <Button type="button" variant="outline" className="w-full border-white/15" onClick={google}>Continue with Google</Button>
            <p className="text-sm text-center text-white/60">
              {mode === "login" ? "No account?" : "Have an account?"}{" "}
              <button type="button" className="text-primary" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
                {mode === "login" ? "Create one" : "Sign in"}
              </button>
            </p>
            <p className="text-xs text-center text-white/40"><Link to="/admin-login">Admin sign in →</Link></p>
          </form>
        </div>
      </section>
    </>
  );
}