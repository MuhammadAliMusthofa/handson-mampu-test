interface MainHeaderProps {
  totalUsers: number;
}

export function MainHeader({ totalUsers }: MainHeaderProps) {
  return (
    <div className="border-b border-slate-700/50 bg-slate-900/60 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-100">
              Users Directory
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {totalUsers} pengguna ditemukan
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Sumber:</span>
            <span className="text-xs font-medium text-blue-400">JSONPlaceholder API</span>
          </div>
        </div>
      </div>
    </div>
  );
}