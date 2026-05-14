"use client";

import { Todo } from "@/src/types";
import { useState } from "react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

const INITIAL_SHOW = 5;

function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`mt-0.5 size-5 rounded flex items-center justify-center shrink-0 text-xs ${todo.completed
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
          }`}
        aria-hidden="true"
      >
        {todo.completed ? "✓" : "⏳"}
      </span>
      <span
        className={`text-sm ${todo.completed ? "text-slate-400 line-through" : "text-slate-200"}`}
      >
        {todo.title}
      </span>
      <Badge
        variant={todo.completed ? "success" : "warning"}
        className="ml-auto shrink-0"
      >
        {todo.completed ? "Selesai" : "Tertunda"}
      </Badge>
    </div>
  );
}

interface UserTodosProps {
  todos: Todo[];
  completedCount: number;
  pendingCount: number;
}

export function UserTodos({ todos, completedCount, pendingCount }: UserTodosProps) {
  const [showAllTodos, setShowAllTodos] = useState(false);
  const displayedTodos = showAllTodos ? todos : todos.slice(0, INITIAL_SHOW);

  return (
    <section
      aria-labelledby="todos-heading"
      className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 id="todos-heading" className="text-base font-semibold text-slate-100">
          Todos
          <span className="ml-2 text-xs font-normal text-slate-500">
            ({completedCount} selesai / {pendingCount} tertunda)
          </span>
        </h2>
        {todos.length > INITIAL_SHOW && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAllTodos((v) => !v)}
            aria-expanded={showAllTodos}
          >
            {showAllTodos ? "Tampilkan lebih sedikit" : `Lihat semua ${todos.length}`}
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {displayedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </section>
  );
}