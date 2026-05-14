"use client";

import { useGetUserActivity } from "@/src/hooks/useGetUserActivity";
import { User } from "@/src/types";

export default function BasicUserDetail({ user }: { user: User }) {
  // Fetch aktivitas langsung di sini untuk versi awal
  const { data, isLoading, isError } = useGetUserActivity(user.id);

  if (isLoading) return <div className="p-4 text-slate-400">Loading aktivitas pengguna...</div>;
  if (isError) return <div className="p-4 text-red-400">Gagal memuat aktivitas.</div>;

  const posts = data?.posts ?? [];
  const todos = data?.todos ?? [];

  return (
    <div className="space-y-8 text-slate-200">
      {/* Profil Basic */}
      <section className="p-6 border border-slate-700 rounded-lg bg-slate-800/50">
        <h2 className="text-xl font-bold text-white mb-4">Profil User</h2>
        <p><strong>Nama:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Perusahaan:</strong> {user.company.name}</p>
      </section>

      {/* Posts Basic */}
      <section>
        <h2 className="text-lg font-bold text-white mb-3">Posts ({posts.length})</h2>
        <ul className="list-disc pl-5 space-y-3">
          {posts.slice(0, 5).map((post) => (
            <li key={post.id}>
              <strong className="capitalize">{post.title}</strong>
              <p className="text-sm text-slate-400">{post.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Todos Basic */}
      <section>
        <h2 className="text-lg font-bold text-white mb-3">Todos ({todos.length})</h2>
        <ul className="list-none space-y-2">
          {todos.slice(0, 5).map((todo) => (
            <li key={todo.id} className="flex gap-2">
              <span>{todo.completed ? "✅" : "⏳"}</span>
              <span className={todo.completed ? "line-through text-slate-500" : ""}>
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}