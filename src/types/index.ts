// ─── Raw API Response Types ───────────────────────────────────────────────────

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

// ─── Enriched / Composed Types ────────────────────────────────────────────────

export interface ActivitySignal {
  totalPosts: number;
  completedTodos: number;
  pendingTodos: number;
}

export type UserWithActivity = User & ActivitySignal;

// ─── URL State / Filter Types ─────────────────────────────────────────────────

export type SortKey = "name" | "pendingTodos" | "totalPosts";
export type SortOrder = "asc" | "desc";
export type FilterKey = "all" | "pendingTodos";

export interface UsersFilterState {
  search: string;
  filter: FilterKey;
  sort: SortKey;
  order: SortOrder;
  page: number;
}
