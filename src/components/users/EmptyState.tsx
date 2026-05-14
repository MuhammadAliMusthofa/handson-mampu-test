"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/Button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

export function EmptyState({
  title = "Tidak ada hasil ditemukan",
  description = "Coba ubah filter atau kata kunci pencarian Anda.",
  onReset,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up"
      role="status"
      aria-live="polite"
    >
      <div className="mb-6 relative">
        <div className="size-24 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center">
          <Search className="size-12 text-slate-500" aria-hidden="true" />
        </div>
        <div className="absolute -top-1 -right-1 size-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
          <span className="text-amber-400 text-xs">!</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-slate-200 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mb-6">{description}</p>

      {onReset && (
        <Button variant="outline" size="sm" onClick={onReset} id="btn-reset-filter">
          Reset Filter
        </Button>
      )}
    </div>
  );
}
