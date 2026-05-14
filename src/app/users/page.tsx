import { Suspense } from "react";
import type { Metadata } from "next";

import { UsersListContainer } from "../containers/UserListContainer";
import userService from "@/src/services/user.service";
import { MainHeader } from "@/src/components/users/MainHeader";
import { TableSkeleton } from "@/src/components/skeletons/TableSkeleton";

export const metadata: Metadata = {
  title: "Pengguna",
  description:
    "Jelajahi daftar 10 pengguna lengkap dengan sinyal aktivitas: total posts, todos selesai, dan todos tertunda.",
};

export default async function UsersPage() {
  const initialData = await userService.getUsersWithActivity();

  return (
    <main className="min-h-screen">
      <MainHeader totalUsers={initialData.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<TableSkeleton />}>
          <UsersListContainer initialData={initialData} />
        </Suspense>
      </div>
    </main>
  );
}