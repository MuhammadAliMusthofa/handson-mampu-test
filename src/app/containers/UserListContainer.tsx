"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FilterKey, SortKey, UserWithActivity } from "@/src/types";
import { useUsersWithActivity } from "@/src/hooks/useGetAllUser";
import { FilterBar } from "@/src/components/users/FilterBar";
import { TableSkeleton } from "@/src/components/skeletons/TableSkeleton";
import { CardSkeleton } from "@/src/components/skeletons/CardSkeleton";
import { EmptyState } from "@/src/components/users/EmptyState";
import { UserTable } from "@/src/components/users/UserTable";
import { UserCardGrid } from "@/src/components/users/UserCardGrid";
import { Pagination } from "@/src/components/ui/Pagination";


interface UsersListContainerProps {
  initialData: UserWithActivity[];
}

export function UsersListContainer({ initialData }: UsersListContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [localSearch, setLocalSearch] = useState(searchParams.get("search") || "");
  const { data, isLoading, isError, error } = useUsersWithActivity(initialData);
  const { paginatedUsers = [], totalPages = 0, totalCount = 0, filteredCount = 0, params } = data || {};

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const current = new URLSearchParams(searchParams.toString());
      for (const [key, val] of Object.entries(updates)) {
        if (val === null || val === "") current.delete(key);
        else current.set(key, val);
      }
      if (!("page" in updates)) current.set("page", "1");
      router.replace(`${pathname}?${current.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== (searchParams.get("search") || "")) {
        updateParams({ search: localSearch || null });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, updateParams, searchParams]);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setLocalSearch("");
    }
  }, [searchParams]);

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center" role="alert">
        <p className="text-red-400 font-medium mb-1">Gagal memuat data pengguna</p>
        <p className="text-sm text-red-400/70">{error instanceof Error ? error.message : "Error jaringan"}</p>
      </div>
    );
  }

  return (
    <div>
      {params && (
        <FilterBar
          search={localSearch}
          filter={params.filter}
          sort={params.sort}
          order={params.order}
          onSearchChange={(v) => setLocalSearch(v)}
          onFilterChange={(v: FilterKey) => updateParams({ filter: v === "all" ? null : v })}
          onSortChange={(key: SortKey) => {
            if (params.sort === key) updateParams({ order: params.order === "asc" ? "desc" : "asc" });
            else updateParams({ sort: key, order: "asc" });
          }}
          onOrderToggle={() => updateParams({ order: params.order === "asc" ? "desc" : "asc" })}
          onReset={() => router.replace(pathname, { scroll: false })}
          totalCount={totalCount}
          filteredCount={filteredCount}
        />
      )}

      {isLoading ? (
        <>
          <div className="hidden md:block"><TableSkeleton /></div>
          <div className="md:hidden"><CardSkeleton /></div>
        </>
      ) : paginatedUsers.length === 0 ? (
        <EmptyState onReset={() => router.replace(pathname, { scroll: false })} />
      ) : (
        <>
          <div className="hidden md:block">
            <UserTable
              users={paginatedUsers}
              sort={params?.sort || "name"}
              order={params?.order || "asc"}
              onSortChange={(key: SortKey) => {
                if (params?.sort === key) updateParams({ order: params?.order === "asc" ? "desc" : "asc" });
                else updateParams({ sort: key, order: "asc" });
              }}
            />
          </div>
          <div className="md:hidden">
            <UserCardGrid users={paginatedUsers} />
          </div>

          <Pagination 
            currentPage={params?.page || 1} 
            totalPages={totalPages} 
            onPageChange={(page) => updateParams({ page: String(page) })} 
          />
        </>
      )}
    </div>
  );
}