import { useState } from "react";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";

export type MediaItem = { url: string; kind?: "image" | "video" };

const detectKind = (m: MediaItem): "image" | "video" =>
  m.kind ?? (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(m.url) ? "video" : "image");

export const ProductGallery = ({ items, alt }: { items: MediaItem[]; alt: string }) => {
  const [i, setI] = useState(0);
  if (!items.length) return null;
  const active = items[i];
  const kind = detectKind(active);
  const go = (d: number) => setI((p) => (p + d + items.length) % items.length);

  return (
    <div>
      <div className="relative bg-card rounded-xl overflow-hidden border border-white/10 aspect-square group">
        {kind === "video" ? (
          <video key={active.url} src={active.url} controls className="h-full w-full object-cover bg-black" />
        ) : (
          <img key={active.url} src={active.url} alt={alt} className="h-full w-full object-cover animate-fade-in transition-transform duration-500 ease-out group-hover:scale-150 cursor-zoom-in" />
        )}
        {items.length > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 hover:bg-primary text-white grid place-items-center opacity-0 group-hover:opacity-100 transition">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => go(1)} aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 hover:bg-primary text-white grid place-items-center opacity-0 group-hover:opacity-100 transition">
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {items.map((_, idx) => (
                <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-primary" : "w-1.5 bg-white/40"}`} />
              ))}
            </div>
          </>
        )}
      </div>
      {items.length > 1 && (
        <div className="mt-4 grid grid-cols-5 sm:grid-cols-6 gap-2">
          {items.map((m, idx) => {
            const k = detectKind(m);
            return (
              <button key={idx} onClick={() => setI(idx)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${idx === i ? "border-primary shadow-glow" : "border-white/10 hover:border-white/30"}`}>
                {k === "video" ? (
                  <>
                    <video src={m.url} muted className="h-full w-full object-cover" />
                    <PlayCircle className="h-5 w-5 text-white absolute inset-0 m-auto drop-shadow" />
                  </>
                ) : (
                  <img src={m.url} alt="" className="h-full w-full object-cover" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
