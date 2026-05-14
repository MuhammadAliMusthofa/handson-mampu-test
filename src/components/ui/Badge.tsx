import { cn } from "@/src/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral" | "primary";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-green-500/15 text-green-400 ring-1 ring-green-500/30",
  warning: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30",
  danger:  "bg-red-500/15 text-red-400 ring-1 ring-red-500/30",
  info:    "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30",
  neutral: "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/30",
  primary: "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30",
};

export function Badge({ variant = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
