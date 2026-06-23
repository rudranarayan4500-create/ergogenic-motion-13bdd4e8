import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { PageHero } from "@/components/PageHero";
import { useAuth } from "@/hooks/useAuth";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";

const genCaptcha = () => {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { q: `${a} + ${b}`, a: a + b };
};

export default function AdminLogin() {
  // Hardcoded email and password for local testing
  const [loginId, setLoginId] = useState("info@ergogenic-nutrition.com");
  const [password, setPassword] = useState("egro-admin@!1244");
  const [showPassword, setShowPassword] = useState(false);
  
  const [captcha, setCaptcha] = useState(genCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  
  const [secret, setSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  
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
      if (!user) {
        const isEmail = loginId.includes('@');
        const authPayload = isEmail 
          ? { email: loginId, password } 
          : { phone: loginId, password };

        const { error } = await supabase.auth.signInWithPassword(authPayload);
        if (error) throw error;
      }
      
      const { data: ok, error: e2 } = await supabase.rpc("verify_admin_secret", { _code: secret });
      if (e2) throw e2;
      if (!ok) throw new Error("Invalid secret code");

      const uid = (await supabase.auth.getUser()).data.user?.id;
      const { data: roleRow } = await supabase.from("user_roles").select("role").eq("user_id", uid!).eq("role", "admin").maybeSingle();
      if (!roleRow) {
        const { data: claimed } = await supabase.rpc("claim_admin", { _code: secret });
        if (!claimed) throw new Error("This account is not authorized as admin.");
      }
      
      toast({ title: "Welcome, admin" });
      nav("/admin");
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
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-semibold">Admin Access</span>
            </div>
            
            <div>
              <Label>Email or Phone Number</Label>
              <Input 
                required 
                type="text" 
                value={loginId} 
                onChange={(e) => setLoginId(e.target.value)} 
                placeholder="Enter the Email"
                className="mt-1.5 bg-background border-white/15" 
              />
            </div>
            
            <div>
              <Label>Password</Label>
              <div className="relative mt-1.5">
                <Input 
                  required 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="bg-background border-white/15 pr-10" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div>
              <Label>Captcha: what is {captcha.q}?</Label>
              <Input required value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} className="mt-1.5 bg-background border-white/15" />
            </div>
            
            <div>
              <Label>Secret code</Label>
              <div className="relative mt-1.5">
                <Input 
                  required 
                  type={showSecret ? "text" : "password"} 
                  value={secret} 
                  onChange={(e) => setSecret(e.target.value)} 
                  className="bg-background border-white/15 pr-10" 
                  placeholder="Default: ERGO-ADMIN-2026" 
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <Button disabled={busy} type="submit" className="w-full bg-primary hover:bg-primary/90">
              {busy ? "Verifying…" : "Enter admin panel"}
            </Button>
            
            <p className="text-xs text-white/40">First sign-in with the secret code claims the admin role for that account. Change the secret in Admin → Settings afterwards.</p>
          </form>
        </div>
      </section>
    </>
  );
}