import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export const IntroOverlay = () => {
  const [show, setShow] = useState(() => !sessionStorage.getItem("en_intro_seen"));
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!show) return;
    const t1 = setTimeout(() => setFadeOut(true), 1800);
    const t2 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("en_intro_seen", "1");
    }, 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[hsl(var(--ink))] transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="animate-fade-in-soft">
        <Logo className="h-16 md:h-20" />
      </div>
      <p className="mt-6 text-sm tracking-[0.4em] text-white/70 animate-fade-in">
        SCIENCE IN MOTION
      </p>
    </div>
  );
};