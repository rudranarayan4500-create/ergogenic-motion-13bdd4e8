import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayed, setDisplayed] = useState(children);
  const [stage, setStage] = useState<"in" | "out">("in");

  useEffect(() => {
    setStage("out");
    const t = setTimeout(() => {
      setDisplayed(children);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      setStage("in");
    }, 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    setDisplayed(children);
  }, [children]);

  return (
    <div
      className={`transition-all duration-300 ${
        stage === "in" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {displayed}
    </div>
  );
};