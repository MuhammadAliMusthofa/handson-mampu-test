"use client";

import { useQuery } from "@tanstack/react-query";
import { User } from "../types";
import userService from "../services/user.service";


export function useGetDetailUser(id: number, initialData?: User) {
  return useQuery<User>({
    queryKey: ["get-detail-user", id],
    queryFn: () => userService.getById(id),
    staleTime: 60_000,
    initialData,
    enabled: !!id,
  });
}