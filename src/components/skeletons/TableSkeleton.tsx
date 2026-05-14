export function TableSkeleton() {
  return (
    <div
      className="w-full animate-pulse"
      role="status"
      aria-label="Memuat data pengguna..."
    >
      {/* Filter bar skeleton */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="skeleton h-10 flex-1" />
        <div className="skeleton h-10 w-36" />
        <div className="skeleton h-10 w-36" />
      </div>

      {/* Table skeleton */}
      <div className="rounded-2xl border border-slate-700/50 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800/80 px-6 py-4 grid grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-4 rounded" />
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: 5 }).map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="px-6 py-4 grid grid-cols-6 gap-4 border-t border-slate-700/30"
          >
            <div className="skeleton h-4 col-span-1 rounded" />
            <div className="skeleton h-4 col-span-2 rounded" />
            <div className="skeleton h-4 col-span-1 rounded" />
            <div className="skeleton h-6 w-16 rounded-full" />
            <div className="flex gap-1">
              <div className="skeleton h-6 w-12 rounded-full" />
              <div className="skeleton h-6 w-12 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only">Memuat data pengguna...</span>
    </div>
  );
}
