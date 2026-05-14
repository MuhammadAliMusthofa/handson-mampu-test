"use client";

import { useQuery } from "@tanstack/react-query";
import { Post, Todo } from "../types";
import userService from "../services/user.service";


export function useGetUserActivity(userId: number) {
  return useQuery<{ posts: Post[]; todos: Todo[] }>({
    queryKey: ["get-user-activity", userId],
    queryFn: () => userService.getUserActivity(userId),
    staleTime: 60_000,
    enabled: !!userId,
  });
}