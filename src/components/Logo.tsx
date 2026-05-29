import logo from "@/assets/logo-ergogenic.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => (
  <img
    src={logo}
    alt="Ergogenic Nutrients logo"
    className={cn("h-8 w-auto select-none object-contain", className)}
    draggable={false}
  />
);