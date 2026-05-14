"use client";

import { Button } from "@/components/ui/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Kalau halamannya cuma 1 atau kosong, gak usah di-render
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2 mt-6" aria-label="Navigasi halaman">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Halaman sebelumnya"
      >
        Prev
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          aria-current={p === currentPage ? "page" : undefined}
          className={`size-9 rounded-xl text-sm font-medium transition-all ${
            p === currentPage
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
              : "text-slate-400 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          {p}
        </button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Halaman berikutnya"
      >
        Next
      </Button>
    </nav>
  );
}