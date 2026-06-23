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

export default function AdminLogin() {
  // Hardcoded credentials for quick access
  const [loginId, setLoginId] = useState("info@ergogenic-nutrition.com");
  const [password, setPassword] = useState("egro-admin@!1244");
  const [secret, setSecret] = useState("ERGO-ADMIN-2026");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [busy, setBusy] = useState(false);
  
  const nav = useNavigate();
  const { user, isAdmin } = useAuth();

  // Redirect if already authenticated
  useEffect(() => { 
    if ((user && isAdmin) || localStorage.getItem("admin_bypass") === "true") {
      nav("/admin"); 
    }
  }, [user, isAdmin, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    
    try {
      // 1. Authenticate user if not already logged in
      if (!user) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ 
          email: loginId, 
          password 
        });

        // If the user doesn't exist in Supabase yet, AUTO-CREATE THEM!
        if (signInError && signInError.message.includes("Invalid login credentials")) {
          if (loginId === "info@ergogenic-nutrition.com" && secret === "ERGO-ADMIN-2026") {
            const { error: signUpError } = await supabase.auth.signUp({ email: loginId, password });
            if (signUpError) throw signUpError;
            
            // Sign them in immediately after creating
            await supabase.auth.signInWithPassword({ email: loginId, password });
          } else {
            throw signInError;
          }
        } else if (signInError) {
          throw signInError;
        }
      }
      
      // 2. Fallback Frontend Bypass (Ensures you ALWAYS get in with these credentials)
      if (loginId === "info@ergogenic-nutrition.com" && password === "egro-admin@!1244" && secret === "ERGO-ADMIN-2026") {
        localStorage.setItem("admin_bypass", "true");
      }
      
      toast({ title: "Welcome, admin" });
      nav("/admin");
      
    } catch (err: any) {
      toast({ title: "Admin sign-in failed", description: err.message, variant: "destructive" });
    } finally { 
      setBusy(false); 
    }
  };

  return (
    <>
      <PageHero eyebrow="Restricted" title="Admin sign in" subtitle="Gmail, password, and secret code required." />
      <section className="py-16">
        <div className="container max-w-md">
          <form onSubmit={submit} className="bg-card border border-white/10 rounded-xl p-8 space-y-5 shadow-2xl">
            <div className="flex items-center gap-2 text-primary border-b border-white/10 pb-4">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-semibold">Admin Access</span>
            </div>
            
            <div>
              <Label>Email</Label>
              <Input 
                required 
                type="text" 
                value={loginId} 
                onChange={(e) => setLoginId(e.target.value)} 
                placeholder="Enter gmail"
                className="mt-1.5 bg-background border-white/15 h-11" 
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
                  placeholder="Enter password"
                  className="bg-background border-white/15 pr-10 h-11" 
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
              <Label>Secret Code</Label>
              <div className="relative mt-1.5">
                <Input 
                  required 
                  type={showSecret ? "text" : "password"} 
                  value={secret} 
                  onChange={(e) => setSecret(e.target.value)} 
                  placeholder="Enter code"
                  className="bg-background border-white/15 pr-10 h-11" 
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
            
            <Button disabled={busy} type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 mt-2 text-white font-semibold">
              {busy ? "Verifying…" : "Enter admin panel"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}