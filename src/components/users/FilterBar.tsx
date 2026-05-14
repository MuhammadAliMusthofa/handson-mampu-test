"use client";


import { FilterKey, SortKey, SortOrder } from "@/src/types";
import { Search, ChevronDown, ArrowDownAZ, ArrowUpZA, X } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface FilterBarProps {
  search: string;
  filter: FilterKey;
  sort: SortKey;
  order: SortOrder;
  onSearchChange: (v: string) => void;
  onFilterChange: (v: FilterKey) => void;
  onSortChange: (key: SortKey) => void;
  onOrderToggle: () => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "name", label: "Nama" },
  { value: "pendingTodos", label: "Todo Tertunda" },
  { value: "totalPosts", label: "Total Posts" },
];

const FILTER_OPTIONS: { value: FilterKey; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "pendingTodos", label: "Ada Todo Tertunda" },
];

export function FilterBar({
  search,
  filter,
  sort,
  order,
  onSearchChange,
  onFilterChange,
  onSortChange,
  onOrderToggle,
  onReset,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  const hasActiveFilter = search !== "" || filter !== "all";

  return (
    <div className="space-y-3 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          id="search-users"
          type="search"
          placeholder="Cari nama atau email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          wrapperClassName="flex-1"
          icon={<Search className="size-4" aria-hidden="true" />}
          aria-label="Cari pengguna berdasarkan nama atau email"
        />

        <div className="relative">
          <label htmlFor="filter-users" className="sr-only">Filter pengguna</label>
          <select
            id="filter-users"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value as FilterKey)}
            className="h-full rounded-xl border border-slate-700 bg-slate-800/60 text-slate-100 text-sm py-2 pl-4 pr-8 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 appearance-none cursor-pointer min-w-[160px]"
          >
            {FILTER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" aria-hidden="true">
            <ChevronDown className="size-4" />
          </span>
        </div>

        <div className="relative">
          <label htmlFor="sort-users" className="sr-only">Urutkan pengguna</label>
          <select
            id="sort-users"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="h-full rounded-xl border border-slate-700 bg-slate-800/60 text-slate-100 text-sm py-2 pl-4 pr-8 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 appearance-none cursor-pointer min-w-[160px]"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                Urutkan: {o.label}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" aria-hidden="true">
            <ChevronDown className="size-4" />
          </span>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={onOrderToggle}
          aria-label={`Urutan saat ini: ${order === "asc" ? "A–Z / Terkecil" : "Z–A / Terbesar"}. Klik untuk membalik.`}
          id="btn-toggle-order"
          className="shrink-0"
        >
          {order === "asc" ? (
            <ArrowDownAZ className="size-4" aria-hidden="true" />
          ) : (
            <ArrowUpZA className="size-4" aria-hidden="true" />
          )}
          {order === "asc" ? "A–Z" : "Z–A"}
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400" aria-live="polite" aria-atomic="true">
          Menampilkan{" "}
          <span className="font-semibold text-slate-200">{filteredCount}</span>
          {" "}dari{" "}
          <span className="font-semibold text-slate-200">{totalCount}</span>
          {" "}pengguna
        </p>

        {hasActiveFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            id="btn-clear-filters"
            aria-label="Hapus semua filter aktif"
          >
            <X className="size-3.5" aria-hidden="true" />
            Hapus Filter
          </Button>
        )}
      </div>
    </div>
  );
}
