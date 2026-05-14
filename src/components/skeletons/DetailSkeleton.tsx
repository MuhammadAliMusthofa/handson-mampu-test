export function DetailSkeleton() {
  return (
    <div
      className="max-w-4xl mx-auto space-y-6 animate-pulse"
      role="status"
      aria-label="Memuat detail pengguna..."
    >
      {/* Back link */}
      <div className="skeleton h-4 w-28 rounded" />

      {/* Profile card */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="skeleton size-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-6 w-1/3 rounded" />
            <div className="skeleton h-4 w-1/4 rounded" />
          </div>
        </div>
        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="skeleton h-3 w-16 rounded" />
              <div className="skeleton h-4 w-full rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Posts section */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-6 space-y-4">
        <div className="skeleton h-5 w-24 rounded" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-1.5 border-t border-slate-700/30 pt-3">
            <div className="skeleton h-4 w-2/3 rounded" />
            <div className="skeleton h-3 w-full rounded" />
          </div>
        ))}
      </div>

      {/* Todos section */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-6 space-y-3">
        <div className="skeleton h-5 w-20 rounded" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="skeleton size-5 rounded" />
            <div className="skeleton h-3 flex-1 rounded" />
          </div>
        ))}
      </div>

      <span className="sr-only">Memuat detail pengguna...</span>
    </div>
  );
}
