import Link from "next/link";

interface BreadCrumpDetailProps {
  userName: string;
}

export function BreadCrumpDetail({ userName }: BreadCrumpDetailProps) {
  return (
    <div className="border-b border-slate-700/50 bg-slate-900/60 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/users" className="text-slate-400 hover:text-slate-200 transition-colors">
                Users Directory
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-600">/</li>
            <li className="text-slate-200 font-medium truncate max-w-xs">
              {userName}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}