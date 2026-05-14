"use client";

import { useState } from "react";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { Post, Todo, User } from "@/src/types";
import { useGetUserActivity } from "@/src/hooks/useGetUserActivity";
import { DetailSkeleton } from "@/src/components/skeletons/DetailSkeleton";
import { UserProfileCard } from "@/src/components/users/detail/UserProfile";
import { Button } from "@/src/components/ui/Button";
import { PostItemCard } from "@/src/components/users/detail/PostItemCard";
import { TodoItemCard } from "@/src/components/users/detail/ToDoItemCard";

const INITIAL_SHOW = 5;

export function UserDetailContainer({ user }: { user: User }) {
  const { data, isLoading, isError } = useGetUserActivity(user.id);
  
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [showAllTodos, setShowAllTodos] = useState(false);

  if (isLoading) return <DetailSkeleton />;

  const posts: Post[] = data?.posts ?? [];
  const todos: Todo[] = data?.todos ?? [];
  const displayedPosts = showAllPosts ? posts : posts.slice(0, INITIAL_SHOW);
  const displayedTodos = showAllTodos ? todos : todos.slice(0, INITIAL_SHOW);
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-10">
      <Link href="/users" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group">
        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Daftar Pengguna
      </Link>

      <UserProfileCard 
        user={user} 
        postsCount={posts.length} 
        completedCount={completedCount} 
        pendingCount={pendingCount} 
      />

      {isError && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-center text-red-400">
          Gagal memuat data aktivitas. Silakan refresh halaman.
        </div>
      )}

      {posts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold text-slate-100">
              Aktivitas Post <span className="text-sm font-normal text-slate-500 ml-2">({posts.length})</span>
            </h2>
            {posts.length > INITIAL_SHOW && (
              <Button variant="ghost" size="sm" onClick={() => setShowAllPosts(!showAllPosts)}>
                {showAllPosts ? "Tampilkan Sedikit" : "Lihat Semua"}
              </Button>
            )}
          </div>
          <div className="grid gap-3">
            {displayedPosts.map((post) => (
              <PostItemCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {todos.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold text-slate-100">
              Daftar Tugas <span className="text-sm font-normal text-slate-500 ml-2">({todos.length})</span>
            </h2>
            {todos.length > INITIAL_SHOW && (
              <Button variant="ghost" size="sm" onClick={() => setShowAllTodos(!showAllTodos)}>
                {showAllTodos ? "Tampilkan Sedikit" : "Lihat Semua"}
              </Button>
            )}
          </div>
          <div className="grid gap-3">
            {displayedTodos.map((todo) => (
              <TodoItemCard key={todo.id} todo={todo} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}