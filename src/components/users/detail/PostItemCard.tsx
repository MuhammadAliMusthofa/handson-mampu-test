"use client";

import { useState } from "react";
import { MessageSquare, ChevronDown } from "lucide-react";
import { Post } from "@/src/types";

export function PostItemCard({ post }: { post: Post }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 transition-all hover:bg-slate-800/70 hover:border-slate-600">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left group flex items-start gap-3"
        aria-expanded={expanded}
      >
        <div className="mt-0.5 shrink-0 text-blue-400">
          <MessageSquare className="size-5" strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-200 group-hover:text-blue-300 transition-colors capitalize">
            {post.title}
          </p>
          <div className={`grid transition-all duration-300 ease-in-out ${expanded ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`}>
            <p className="text-sm text-slate-400 leading-relaxed overflow-hidden">
              {post.body}
            </p>
          </div>
        </div>
        <div className={`shrink-0 text-slate-500 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}>
          <ChevronDown className="size-5" strokeWidth={2} />
        </div>
      </button>
    </div>
  );
}