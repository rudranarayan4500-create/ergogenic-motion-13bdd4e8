import { useEffect, useState, type ImgHTMLAttributes } from "react";
import { ImageOff } from "lucide-react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "onError"> & {
  src?: string | null;
  fallbackLabel?: string;
  containerClassName?: string;
};

// Cache validation results per URL for this session so we don't re-check on every render
const urlStatus = new Map<string, "ok" | "bad">();

const isLikelyValidUrl = (u?: string | null): u is string => {
  if (!u || typeof u !== "string") return false;
  const s = u.trim();
  if (!s) return false;
  if (s === "/placeholder.svg") return false;
  if (!/^https?:\/\//i.test(s) && !s.startsWith("/") && !s.startsWith("data:")) return false;
  return true;
};

export const SafeImage = ({
  src,
  alt,
  className,
  fallbackLabel,
  containerClassName,
  ...rest
}: Props) => {
  const initialOk = isLikelyValidUrl(src) && urlStatus.get(src) !== "bad";
  const [broken, setBroken] = useState(!initialOk);

  useEffect(() => {
    setBroken(!(isLikelyValidUrl(src) && urlStatus.get(src) !== "bad"));
  }, [src]);

  if (broken || !isLikelyValidUrl(src)) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-slate-100 text-slate-400 text-[10px] font-mono uppercase tracking-widest ${containerClassName ?? className ?? ""}`}
        aria-label={alt}
        role="img"
      >
        <ImageOff className="h-6 w-6 opacity-60" />
        <span className="px-2 text-center line-clamp-2">{fallbackLabel ?? alt ?? "Image unavailable"}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onLoad={() => {
        if (src) urlStatus.set(src, "ok");
      }}
      onError={() => {
        if (src) urlStatus.set(src, "bad");
        setBroken(true);
      }}
      {...rest}
    />
  );
};

export default SafeImage;