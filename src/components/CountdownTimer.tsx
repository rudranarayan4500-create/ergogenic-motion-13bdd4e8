import { useEffect, useState } from "react";

const target = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  d.setHours(23, 59, 59, 0);
  return d.getTime();
})();

export const CountdownTimer = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  const Box = ({ v, l }: { v: number; l: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-black/60 border border-white/10 rounded-lg w-20 h-20 grid place-items-center text-3xl font-bold tabular-nums">
        {String(v).padStart(2, "0")}
      </div>
      <span className="mt-2 text-xs uppercase tracking-widest text-white/60">{l}</span>
    </div>
  );
  return (
    <div className="flex gap-3 md:gap-4 justify-center">
      <Box v={days} l="Days" />
      <Box v={hours} l="Hrs" />
      <Box v={mins} l="Min" />
      <Box v={secs} l="Sec" />
    </div>
  );
};