import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white px-4 relative overflow-hidden">
      {/* Decorative clean background ambient glow */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0" />
      
      <div className="text-center max-w-md w-full space-y-6 relative z-10 p-8 bg-slate-50/50 border border-slate-200 rounded-3xl backdrop-blur-sm shadow-sm">
        <div className="mx-auto w-16 h-16 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm animate-pulse">
          <FileQuestion className="h-8 w-8 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-7xl font-black tracking-tighter text-slate-900 font-mono leading-none">
            404
          </h1>
          <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">
            Route Unallocated
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
            The destination layout path <code className="bg-white border border-slate-200 px-1.5 py-0.5 rounded font-mono text-xs text-blue-600 font-bold">{location.pathname}</code> does not exist within active directory parameters.
          </p>
        </div>

        <div className="pt-2">
          <Button asChild size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider text-xs h-12 rounded-xl shadow-md transition-colors">
            <Link to="/" className="flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4 stroke-[3]" /> Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;