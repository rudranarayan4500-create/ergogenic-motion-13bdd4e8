import { Outlet } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { PageTransition } from "./PageTransition";

// Make sure it says "export const Layout" right here:
export const Layout = () => (
  <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
    <SiteHeader />
    <main className="flex-1 pt-16">
      <PageTransition>
        <Outlet />
      </PageTransition>
    </main>
    <SiteFooter />
  </div>
);