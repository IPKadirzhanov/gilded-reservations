import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

const GlassCard = ({ children, className, hover = false, glow = false }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass-card p-6",
        hover && "hover-lift cursor-pointer",
        glow && "animate-glow-pulse",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
