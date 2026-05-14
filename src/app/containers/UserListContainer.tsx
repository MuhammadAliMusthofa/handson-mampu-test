"use client";

import userService from "@/src/services/user.service";
import { useQuery } from "@tanstack/react-query";

export default function UsersListContainer() {
  // Fetch langsung pakai hooks React Query dasar untuk commit awal
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users-basic-list"],
    queryFn: () => userService.getUsersWithActivity(),
  });

  if (isLoading) return <div className="p-4 text-slate-400">Loading data pengguna...</div>;
  if (isError) return <div className="p-4 text-red-400">Gagal mengambil data.</div>;
  if (!users || users.length === 0) return <div>Tidak ada data.</div>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse border border-slate-700 text-sm text-left">
        <thead className="bg-slate-800 text-slate-200">
          <tr>
            <th className="border border-slate-700 p-3">Nama</th>
            <th className="border border-slate-700 p-3">Email</th>
            <th className="border border-slate-700 p-3 text-center">Total Posts</th>
            <th className="border border-slate-700 p-3 text-center">Pending Todos</th>
            <th className="border border-slate-700 p-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-slate-300">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-800/50">
              <td className="border border-slate-700 p-3 font-medium">{user.name}</td>
              <td className="border border-slate-700 p-3">{user.email}</td>
              <td className="border border-slate-700 p-3 text-center">{user.totalPosts}</td>
              <td className="border border-slate-700 p-3 text-center">
                {user.pendingTodos > 0 ? (
                  <span className="text-amber-400">{user.pendingTodos} tertunda</span>
                ) : (
                  <span className="text-green-400">Selesai semua</span>
                )}
              </td>
              <td className="border border-slate-700 p-3 text-center">
                <a href={`/users/${user.id}`} className="text-blue-400 hover:underline">
                  Detail
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}