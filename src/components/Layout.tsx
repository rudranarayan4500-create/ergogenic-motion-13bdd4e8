import { Outlet } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { PageTransition } from "./PageTransition";

export const Layout = () => (
  <div className="min-h-screen flex flex-col bg-[hsl(var(--ink))] text-white">
    <SiteHeader />
    <main className="flex-1 pt-16">
      <PageTransition>
        <Outlet />
      </PageTransition>
    </main>
    <SiteFooter />
  </div>
);