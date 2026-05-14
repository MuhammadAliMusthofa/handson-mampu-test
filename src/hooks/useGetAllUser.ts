"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { FilterKey, SortKey, SortOrder, UserWithActivity } from "../types";
import { useDebounce } from "../lib/utils";
import userService from "../services/user.service";

const PAGE_SIZE = 5;

export function useUsersWithActivity(initialData?: UserWithActivity[]) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const filter = (searchParams.get("filter") as FilterKey) ?? "all";
  const sort = (searchParams.get("sort") as SortKey) ?? "name";
  const order = (searchParams.get("order") as SortOrder) ?? "asc";
  const page = Number(searchParams.get("page") ?? "1");

  const debouncedSearch = useDebounce(search, 0);

  return useQuery({
    queryKey: ["getAllUser", { debouncedSearch, filter, sort, order, page }],
    queryFn: () => userService.getUsersWithActivity(),
    staleTime: 60_000,
    initialData,
    select: (data) => {
      let result = [...data];

      if (debouncedSearch.trim()) {
        const q = debouncedSearch.toLowerCase();
        result = result.filter(
          (u) =>
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q)
        );
      }

      if (filter === "pendingTodos") {
        result = result.filter((u) => u.pendingTodos > 0);
      }

      result.sort((a, b) => {
        let cmp = 0;
        if (sort === "name") cmp = a.name.localeCompare(b.name);
        else if (sort === "pendingTodos") cmp = a.pendingTodos - b.pendingTodos;
        else if (sort === "totalPosts") cmp = a.totalPosts - b.totalPosts;

        return order === "asc" ? cmp : -cmp;
      });

      const totalCount = data.length;
      const filteredCount = result.length;
      const totalPages = Math.ceil(filteredCount / PAGE_SIZE);
      const paginatedUsers = result.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

      return {
        paginatedUsers,
        totalCount,
        filteredCount,
        totalPages,
        params: { search, filter, sort, order, page }
      };
    },
  });
}