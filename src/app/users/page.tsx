import type { Metadata } from "next";

import UsersListContainer from "../containers/UserListContainer";

export const metadata: Metadata = {
  title: "Pengguna",
  description:
    "Jelajahi daftar 10 pengguna lengkap dengan sinyal aktivitas: total posts, todos selesai, dan todos tertunda.",
};

export default async function UsersPage() {

  return (
    <main className="min-h-screen">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <UsersListContainer  />
      </div>
    </main>
  );
}