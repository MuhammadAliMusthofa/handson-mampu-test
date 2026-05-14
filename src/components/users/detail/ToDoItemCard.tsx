"use client";

import { Todo } from "@/src/types";
import { Check, Clock } from "lucide-react";
import { Badge } from "../../ui/Badge";

export function TodoItemCard({ todo }: { todo: Todo }) {
  return (
    <div 
      className={`flex items-center gap-3 rounded-xl border p-3.5 transition-all ${
        todo.completed 
          ? "bg-slate-900/40 border-slate-800/50 opacity-70" 
          : "bg-slate-800/60 border-slate-700/50 shadow-sm"
      }`}
    >
      <span
        className={`size-6 rounded-full flex items-center justify-center shrink-0 ${
          todo.completed
            ? "bg-green-500/20 text-green-500"
            : "bg-amber-500/20 text-amber-500 border border-amber-500/30"
        }`}
        aria-hidden="true"
      >
        {todo.completed ? (
          <Check className="size-4" strokeWidth={3} />
        ) : (
          <Clock className="size-3.5" strokeWidth={2.5} />
        )}
      </span>
      
      <span className={`text-sm font-medium flex-1 ${todo.completed ? "text-slate-500 line-through" : "text-slate-200"}`}>
        {todo.title}
      </span>
      
      <Badge
        variant={todo.completed ? "success" : "warning"}
        className="shrink-0"
      >
        {todo.completed ? "Selesai" : "Tertunda"}
      </Badge>
    </div>
  );
}