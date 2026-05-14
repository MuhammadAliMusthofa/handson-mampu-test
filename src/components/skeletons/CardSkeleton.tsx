export function CardSkeleton() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse"
      role="status"
      aria-label="Memuat daftar pengguna..."
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-5 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="skeleton size-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-2/3 rounded" />
              <div className="skeleton h-3 w-1/2 rounded" />
            </div>
          </div>
          <div className="skeleton h-3 w-full rounded" />
          <div className="flex gap-2">
            <div className="skeleton h-6 w-16 rounded-full" />
            <div className="skeleton h-6 w-16 rounded-full" />
            <div className="skeleton h-6 w-16 rounded-full" />
          </div>
        </div>
      ))}
      <span className="sr-only">Memuat daftar pengguna...</span>
    </div>
  );
}
