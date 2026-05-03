import { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export const TypewriterText = ({ text, className, speed = 80, delay = 0 }: TypewriterTextProps) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect();
          setTimeout(() => setStarted(true), delay);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};
