import type { Post, Todo, User, UserWithActivity } from "@/src/types";
import { API_ENDPOINTS, fetchClient } from "./api";

const userService = {
  // ─── Basic Fetchers (Mirip Axios Style) ──────────────────────────────────
  
  get: () => 
    fetchClient.get<User[]>(API_ENDPOINTS.users),
    
  getById: (id: number) => 
    fetchClient.get<User>(`${API_ENDPOINTS.users}/${id}`),
    
  getPosts: (userId?: number) => 
    fetchClient.get<Post[]>(API_ENDPOINTS.posts, userId ? { params: { userId } } : undefined),
    
  getTodos: (userId?: number) => 
    fetchClient.get<Todo[]>(API_ENDPOINTS.todos, userId ? { params: { userId } } : undefined),

  // ─── Composite Data (Logika Bisnis) ───────────────────────────────────────

  getUsersWithActivity: async (): Promise<UserWithActivity[]> => {
    const [users, posts, todos] = await Promise.all([
      userService.get(),
      userService.getPosts(),
      userService.getTodos(),
    ]);

    return users.map((user) => {
      const userPosts = posts.filter((p) => p.userId === user.id);
      const userTodos = todos.filter((t) => t.userId === user.id);
      const completedTodos = userTodos.filter((t) => t.completed).length;

      return {
        ...user,
        totalPosts: userPosts.length,
        completedTodos,
        pendingTodos: userTodos.length - completedTodos,
      };
    });
  },

  getUserActivity: async (userId: number): Promise<{ posts: Post[]; todos: Todo[] }> => {
    const [posts, todos] = await Promise.all([
      userService.getPosts(userId),
      userService.getTodos(userId),
    ]);

    return { posts, todos };
  },
};

export default userService;