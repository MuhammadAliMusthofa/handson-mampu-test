import { cn } from "@/src/lib/utils";
import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
  wrapperClassName?: string;
}

export function Input({
  label,
  icon,
  error,
  wrapperClassName,
  className,
  id,
  ...props
}: InputProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          {...props}
          className={cn(
            "w-full rounded-xl border border-slate-700 bg-slate-800/60",
            "text-slate-100 placeholder:text-slate-500",
            "text-sm py-2 pr-4",
            icon ? "pl-10" : "pl-4",
            "transition-colors duration-150",
            "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/50",
            className
          )}
        />
      </div>
      {error && (
        <p className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
