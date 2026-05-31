import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

// Using explicit named export to fix the build error
export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [stage, setStage] = useState<"in" | "out">("in");
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathRef.current === location.pathname) {
      setDisplayedChildren(children);
      return;
    }

    setStage("out");

    const timer = setTimeout(() => {
      setDisplayedChildren(children);
      window.scrollTo({ top: 0, behavior: "instant" });
      setStage("in");
      prevPathRef.current = location.pathname;
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname, children]);

  return (
    <div className="grid grid-cols-1 grid-rows-1 overflow-hidden">
      <div
        className={`
          col-start-1 row-start-1
          transition-all ease-out duration-300
          motion-reduce:transition-none
          ${stage === "in" 
            ? "opacity-100 translate-y-0 filter blur-0" 
            : "opacity-0 -translate-y-2 filter blur-[2px]"
          }
        `}
      >
        {displayedChildren}
      </div>
    </div>
  );
};