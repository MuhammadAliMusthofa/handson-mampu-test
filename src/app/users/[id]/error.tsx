"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/src/components/ui/Button";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function UserDetailError({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error("[UserDetail Error]", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fade-in-up">
        <div className="mb-8 mx-auto size-24 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
          <AlertTriangle className="size-12 text-red-400" aria-hidden="true" />
        </div>

        <h1 className="text-xl font-bold text-slate-100 mb-2">
          Terjadi Kesalahan
        </h1>
        <p className="text-slate-400 text-sm mb-2 leading-relaxed">
          Gagal memuat halaman detail pengguna. Ini mungkin karena koneksi jaringan
          bermasalah atau server sedang tidak tersedia.
        </p>

        {error.message && (
          <p className="text-xs text-red-400/70 font-mono bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-6 text-left break-all">
            {error.message}
          </p>
        )}

        <div className="flex items-center justify-center gap-3">
          <Button
            variant="primary"
            onClick={reset}
            id="btn-retry"
            aria-label="Coba muat ulang halaman"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Coba Lagi
          </Button>

          <Link
            href="/users"
            id="link-back-from-error"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-600 text-slate-300 text-sm font-medium hover:border-slate-400 hover:text-white transition-colors"
          >
            Kembali ke Daftar
          </Link>
        </div>
      </div>
    </main>
  );
}
