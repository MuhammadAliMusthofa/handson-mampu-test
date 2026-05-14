"use client";

import { useState } from "react";
import { PostItemCard } from "./PostItemCard"; 
import { Post } from "@/src/types";
import { Button } from "../../ui/Button";

const INITIAL_SHOW = 5;

export function UserPosts({ posts }: { posts: Post[] }) {
  const [showAllPosts, setShowAllPosts] = useState(false);
  const displayedPosts = showAllPosts ? posts : posts.slice(0, INITIAL_SHOW);

  return (
    <section className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-slate-100">
          Posts <span className="ml-2 text-xs font-normal text-slate-500">({posts.length} total)</span>
        </h2>
        {posts.length > INITIAL_SHOW && (
          <Button variant="ghost" size="sm" onClick={() => setShowAllPosts((v) => !v)}>
            {showAllPosts ? "Tampilkan lebih sedikit" : `Lihat semua ${posts.length}`}
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {displayedPosts.map((post) => (
          <PostItemCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}