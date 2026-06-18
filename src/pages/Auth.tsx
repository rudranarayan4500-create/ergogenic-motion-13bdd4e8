import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { PageHero } from "@/components/PageHero";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Shield, Check, X, RefreshCw, Mail, Lock, User, Phone, MapPin } from "lucide-react";

const COUNTRY_CODES = [
  { c: "+91", n: "India" }, { c: "+1", n: "USA / Canada" }, { c: "+44", n: "United Kingdom" },
  { c: "+61", n: "Australia" }, { c: "+971", n: "UAE" }, { c: "+65", n: "Singapore" },
  { c: "+49", n: "Germany" }, { c: "+33", n: "France" }, { c: "+81", n: "Japan" },
  { c: "+86", n: "China" }, { c: "+92", n: "Pakistan" }, { c: "+880", n: "Bangladesh" },
  { c: "+27", n: "South Africa" }, { c: "+55", n: "Brazil" }, { c: "+7", n: "Russia" },
  { c: "+39", n: "Italy" }, { c: "+34", n: "Spain" }, { c: "+966", n: "Saudi Arabia" },
];

const genCaptcha = () => {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { q: `${a} + ${b}`, a: a + b };
};

const pwChecks = (p: string) => ({
  len: p.length >= 8,
  up: /[A-Z]/.test(p),
  low: /[a-z]/.test(p),
  num: /\d/.test(p),
  sym: /[^A-Za-z0-9]/.test(p),
});

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("India");
  const [captcha, setCaptcha] = useState(genCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();
  const { user } = useAuth();

  useEffect(() => { 
    if (user) nav("/"); 
  }, [user, nav]);

  const checks = useMemo(() => pwChecks(password), [password]);
  const pwStrong = Object.values(checks).every(Boolean);
  const pwScore = Object.values(checks).filter(Boolean).length;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(captchaInput, 10) !== captcha.a) {
      toast({ title: "Captcha incorrect", description: `Solve: ${captcha.q}`, variant: "destructive" });
      setCaptcha(genCaptcha()); 
      setCaptchaInput("");
      return;
    }
    
    setBusy(true);
    
    try {
      if (mode === "signup") {
        if (!pwStrong) {
          toast({ title: "Weak password", description: "Meet all strength rules.", variant: "destructive" });
          setBusy(false);
          return;
        }
        if (password !== confirm) {
          toast({ title: "Passwords don't match", variant: "destructive" });
          setBusy(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email, 
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              full_name: name, 
              phone: `${countryCode} ${phone}`, 
              country_code: countryCode,
              address, 
              city, 
              state: stateName, 
              pincode, 
              country,
            },
          },
        });

        if (error) throw error;

        // If auto-confirm is on, we'll get an immediate session
        if (data?.session) {
          toast({ title: "Welcome to Ergogenic", description: "Account created successfully." });
          nav("/");
          return;
        }

        // If email confirmation is required, handle cleanly instead of letting sign-in crash the thread
        try {
          const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
          if (signInErr) throw signInErr;
          
          toast({ title: "Welcome to Ergogenic", description: "Account created successfully." });
          nav("/");
        } catch {
          toast({ 
            title: "Account verification sent", 
            description: "Please check your inbox to confirm your email before signing in." 
          });
          setMode("login");
        }
        
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (/confirm/i.test(error.message)) {
            throw new Error("Email not confirmed yet. Please verify your email inbox.");
          }
          throw error;
        }
        nav("/");
      }
    } catch (err: any) {
      let errMsg = err.message || "An unexpected network error occurred.";
      if (errMsg === "Failed to fetch") {
        errMsg = "Could not connect to authentication servers. Please check your internet connection or disable ad-blockers.";
      }
      
      toast({ title: "Auth failed", description: errMsg, variant: "destructive" });
      setCaptcha(genCaptcha()); 
      setCaptchaInput("");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    try {
      setBusy(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });
      if (error) throw error;
    } catch (err: any) {
      toast({ 
        title: "Google sign-in failed", 
        description: err.message || "Network request failed.", 
        variant: "destructive" 
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Account"
        title={mode === "login" ? "Welcome back, athlete" : "Join Ergogenic Nutrients"}
        subtitle={mode === "login" ? "Sign in to track orders, manage shipping and unlock member pricing." : "Create your account — fast checkout, saved address, exclusive drops."}
      />
      <section className="py-12 md:py-16 relative overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container max-w-lg relative mx-auto">
          
          {/* Tabs - Fixed Text Color */}
          <div className="grid grid-cols-2 p-1 bg-card border border-border rounded-full mb-8 max-w-sm mx-auto">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`py-2.5 rounded-full text-[13px] sm:text-sm font-semibold transition-all ${
                  mode === m ? "bg-primary text-primary-foreground shadow-glow" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {m === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="bg-card/80 backdrop-blur border border-border rounded-2xl p-6 sm:p-8 md:p-10 space-y-5 shadow-2xl">
            
            {/* Google - Fixed Hover Blanking */}
            <Button disabled={busy} type="button" variant="outline" className="w-full h-12 gap-3" onClick={google}>
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span className="truncate">{busy ? "Connecting..." : "Continue with Google"}</span>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground uppercase tracking-wider">or with email</span></div>
            </div>

            {mode === "signup" && (
              <div>
                <Label className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />Full name</Label>
                <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="mt-1.5 h-11 bg-background border-input text-base sm:text-sm" />
              </div>
            )}

            <div>
              <Label className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />Email address</Label>
              <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="mt-1.5 h-11 bg-background border-input text-base sm:text-sm" />
            </div>

            {mode === "signup" && (
              <div>
                <Label className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />Phone number</Label>
                <div className="mt-1.5 flex gap-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-[100px] sm:w-32 h-11 bg-background border-input shrink-0 text-base sm:text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent className="max-h-72">
                      {COUNTRY_CODES.map((c) => (
                        <SelectItem key={c.c} value={c.c}>{c.c} {c.n}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="Enter your 10-digit number" className="flex-1 h-11 bg-background border-input text-base sm:text-sm" />
                </div>
              </div>
            )}

            <div>
              <Label className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" />Password</Label>
              <div className="relative mt-1.5">
                <Input required type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={mode === "signup" ? "Create a strong password" : "Enter your password"} className="h-11 bg-background border-input pr-10 text-base sm:text-sm" />
                <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {mode === "signup" && password && (
                <>
                  <div className="mt-2.5 flex gap-1">
                    {[0,1,2,3,4].map((i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full ${i < pwScore ? (pwScore <= 2 ? "bg-destructive" : pwScore <= 4 ? "bg-yellow-500" : "bg-green-500") : "bg-muted"}`} />
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] sm:text-xs">
                    {[
                      { ok: checks.len, l: "8+ characters" },
                      { ok: checks.up, l: "Uppercase letter" },
                      { ok: checks.low, l: "Lowercase letter" },
                      { ok: checks.num, l: "Number" },
                      { ok: checks.sym, l: "Symbol (!@#…)" },
                    ].map((r) => (
                      <div key={r.l} className={`flex items-center gap-1.5 ${r.ok ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                        {r.ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />} {r.l}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {mode === "signup" && (
              <div>
                <Label className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" />Confirm password</Label>
                <Input required type={showPw ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Re-enter your password" className="mt-1.5 h-11 bg-background border-input text-base sm:text-sm" />
                {confirm && (
                  <p className={`text-xs mt-1.5 flex items-center gap-1 ${password === confirm ? "text-green-600 dark:text-green-400" : "text-destructive"}`}>
                    {password === confirm ? <><Check className="h-3.5 w-3.5" />Passwords match</> : <><X className="h-3.5 w-3.5" />Passwords do not match</>}
                  </p>
                )}
              </div>
            )}

            {mode === "signup" && (
              <div className="space-y-4 pt-4 mt-2 border-t border-border">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                  <MapPin className="h-4 w-4 text-primary" />Shipping address
                </div>
                <div>
                  <Label>Street address</Label>
                  <Input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House no, street, locality" className="mt-1.5 h-11 bg-background border-input text-base sm:text-sm" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><Label>City</Label><Input required value={city} placeholder="Enter city" onChange={(e) => setCity(e.target.value)} className="mt-1.5 h-11 bg-background border-input text-base sm:text-sm" /></div>
                  <div><Label>State</Label><Input required value={stateName} placeholder="Enter state" onChange={(e) => setStateName(e.target.value)} className="mt-1.5 h-11 bg-background border-input text-base sm:text-sm" /></div>
                  <div><Label>Pincode</Label><Input required value={pincode} placeholder="Enter 6-digit code" onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))} className="mt-1.5 h-11 bg-background border-input text-base sm:text-sm" /></div>
                  <div><Label>Country</Label><Input required value={country} placeholder="Enter country" onChange={(e) => setCountry(e.target.value)} className="mt-1.5 h-11 bg-background border-input text-base sm:text-sm" /></div>
                </div>
              </div>
            )}

            {/* Captcha block */}
            <div className="pt-4 mt-2 border-t border-border">
              <Label className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-primary" />Security check</Label>
              <div className="mt-1.5 flex flex-wrap gap-2 items-center">
                <div className="select-none h-11 px-3 sm:px-4 flex items-center justify-center font-mono font-bold text-base sm:text-lg bg-primary/10 text-foreground border border-primary/20 rounded-md tracking-widest shrink-0">
                  {captcha.q} = ?
                </div>
                <button type="button" onClick={() => { setCaptcha(genCaptcha()); setCaptchaInput(""); }} className="h-11 w-11 shrink-0 flex items-center justify-center border border-border rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Refresh">
                  <RefreshCw className="h-4 w-4" />
                </button>
                <Input required type="number" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} placeholder="Answer" className="flex-1 min-w-[120px] h-11 bg-background border-input text-base sm:text-sm" />
              </div>
            </div>

            <Button disabled={busy} type="submit" size="lg" className="w-full h-12 mt-2 bg-primary hover:bg-primary/90 shadow-glow text-base font-semibold">
              {busy ? "Please wait…" : mode === "login" ? "Sign in securely" : "Create my account"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}