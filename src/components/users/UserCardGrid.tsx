"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { truncate } from "@/src/lib/utils";
import { Badge } from "../ui/Badge";
import { UserWithActivity } from "@/src/types";

interface UserCardGridProps {
  users: UserWithActivity[];
}

export function UserCardGrid({ users }: UserCardGridProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      aria-label="Daftar pengguna dalam format kartu"
    >
      {users.map((user, idx) => (
        <Link
          key={user.id}
          href={`/users/${user.id}`}
          className="group block rounded-2xl border border-slate-700/50 bg-slate-800/60 p-5 hover:border-blue-500/40 hover:bg-slate-800/90 transition-all duration-200 animate-fade-in-up focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
          style={{ animationDelay: `${idx * 50}ms` }}
          aria-label={`Buka detail ${user.name}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="size-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{
                background: `hsl(${(user.id * 47) % 360}, 55%, 25%)`,
                color: `hsl(${(user.id * 47) % 360}, 80%, 70%)`,
              }}
              aria-hidden="true"
            >
              {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors truncate">
                {user.name}
              </p>
              <p className="text-xs text-slate-500">@{user.username}</p>
            </div>
            <ChevronRight className="size-4 text-slate-600 group-hover:text-blue-400 transition-colors ml-auto shrink-0" aria-hidden="true" />
          </div>

          <p className="text-xs text-slate-400 mb-3 truncate" title={user.email}>
            <span className="text-slate-600 mr-1">✉</span>
            {truncate(user.email, 32)}
          </p>

          <p className="text-xs text-blue-400/80 mb-4 truncate">
            <span className="text-slate-600 mr-1">🌐</span>
            {user.website}
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">{user.totalPosts} posts</Badge>
            <Badge variant="success">{user.completedTodos} selesai</Badge>
            {user.pendingTodos > 0 && (
              <Badge variant="warning">{user.pendingTodos} tertunda</Badge>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
