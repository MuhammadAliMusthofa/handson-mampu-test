"use client";

import { useRouter } from "next/navigation";

import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { SortKey, SortOrder, UserWithActivity } from "@/src/types";
import { truncate } from "@/src/lib/utils";
import { Badge } from "../ui/Badge";

interface UserTableProps {
  users: UserWithActivity[];
  sort: SortKey;
  order: SortOrder;
  onSortChange: (key: SortKey) => void;
}

type SortableColumn = { key: SortKey; label: string; className?: string };

const COLUMNS: SortableColumn[] = [
  { key: "name", label: "Nama" },
];

function SortIcon({ active, order }: { active: boolean; order: SortOrder }) {
  if (!active) return <ChevronDown className="size-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" aria-hidden="true" />;
  return order === "asc" ? (
    <ChevronUp className="size-3.5 text-blue-400" aria-hidden="true" />
  ) : (
    <ChevronDown className="size-3.5 text-blue-400" aria-hidden="true" />
  );
}

export function UserTable({ users, sort, order, onSortChange }: UserTableProps) {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/users/${id}`);
  };

  const handleRowKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRowClick(id);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-700/50 overflow-hidden">
      <table
        className="w-full text-sm"
        aria-label="Daftar pengguna dengan aktivitas"
      >
        <caption className="sr-only">
          Tabel pengguna: menampilkan nama, email, website, total posts, dan status todos
        </caption>
        <thead>
          <tr className="bg-slate-800/90 border-b border-slate-700/50">
            <th
              scope="col"
              className="px-5 py-3.5 text-left"
              aria-sort={sort === "name" ? (order === "asc" ? "ascending" : "descending") : "none"}
            >
              <button
                onClick={() => onSortChange("name")}
                className="group flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                aria-label="Urutkan berdasarkan nama"
                id="th-sort-name"
              >
                Nama <SortIcon active={sort === "name"} order={order} />
              </button>
            </th>
            <th scope="col" className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Email
            </th>
            <th scope="col" className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Website
            </th>
            <th
              scope="col"
              className="px-5 py-3.5 text-center"
              aria-sort={sort === "totalPosts" ? (order === "asc" ? "ascending" : "descending") : "none"}
            >
              <button
                onClick={() => onSortChange("totalPosts")}
                className="group flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors cursor-pointer mx-auto"
                aria-label="Urutkan berdasarkan total posts"
                id="th-sort-posts"
              >
                Posts <SortIcon active={sort === "totalPosts"} order={order} />
              </button>
            </th>
            <th
              scope="col"
              className="px-5 py-3.5 text-center"
              aria-sort={sort === "pendingTodos" ? (order === "asc" ? "ascending" : "descending") : "none"}
            >
              <button
                onClick={() => onSortChange("pendingTodos")}
                className="group flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors cursor-pointer mx-auto"
                aria-label="Urutkan berdasarkan todos tertunda"
                id="th-sort-pending"
              >
                Todos <SortIcon active={sort === "pendingTodos"} order={order} />
              </button>
            </th>
            <th scope="col" className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span className="sr-only">Aksi</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr
              key={user.id}
              onClick={() => handleRowClick(user.id)}
              onKeyDown={(e) => handleRowKeyDown(e, user.id)}
              tabIndex={0}
              role="row"
              aria-label={`Buka detail ${user.name}`}
              className="border-t border-slate-700/30 hover:bg-slate-800/50 focus-visible:bg-slate-800/50 cursor-pointer transition-colors group animate-fade-in-up"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="size-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background: `hsl(${(user.id * 47) % 360}, 55%, 25%)`,
                      color: `hsl(${(user.id * 47) % 360}, 80%, 70%)`,
                    }}
                    aria-hidden="true"
                  >
                    {user.name.trim().split(/\s+/).map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-slate-100 group-hover:text-blue-400 transition-colors">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-500">@{user.username}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-slate-300">
                {truncate(user.email, 28)}
              </td>
              <td className="px-5 py-4">
                <span className="text-blue-400 hover:text-blue-300">
                  {user.website}
                </span>
              </td>
              <td className="px-5 py-4 text-center">
                <Badge variant="primary">{user.totalPosts} posts</Badge>
              </td>
              <td className="px-5 py-4 text-center">
                <div className="flex flex-row justify-center gap-2">
                  <Badge variant="success">{user.completedTodos}</Badge>
                  {user.pendingTodos > 0 && (
                    <Badge variant="warning"> {user.pendingTodos}</Badge>
                  )}
                </div>
              </td>
              <td className="px-5 py-4 text-slate-500 group-hover:text-blue-400 transition-colors" aria-hidden="true">
                <ChevronRight className="size-4 ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
