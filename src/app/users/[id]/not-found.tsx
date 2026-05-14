import Link from "next/link";
import { UserX, ArrowLeft } from "lucide-react";

export default function UserNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fade-in-up">
        <div className="mb-8 mx-auto size-24 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center">
          <UserX className="size-12 text-slate-500" aria-hidden="true" />
        </div>

        <h1 className="text-4xl font-bold text-slate-100 mb-3">404</h1>
        <h2 className="text-xl font-semibold text-slate-300 mb-3">
          Pengguna Tidak Ditemukan
        </h2>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          Pengguna dengan ID yang Anda cari tidak ada atau mungkin telah dihapus.
          Silakan kembali ke daftar pengguna.
        </p>

        <Link
          href="/users"
          id="link-back-to-users"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/25"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke Daftar Pengguna
        </Link>
      </div>
    </main>
  );
}
