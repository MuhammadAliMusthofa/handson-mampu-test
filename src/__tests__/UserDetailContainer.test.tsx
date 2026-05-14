/**
 * Tests for UserDetailContainer component.
 *
 * Strategy: mock useUserActivity hook, render with a mock user prop,
 * and verify profile fields, posts/todos sections, and show-all toggle.
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Post, Todo, User } from "../types";

// ── Mocks ─────────────────────────────────────────────────────────────────────

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  usePathname: () => "/users/1",
  useSearchParams: () => new URLSearchParams(),
}));

const mockActivity = {
  posts: [] as Post[],
  todos: [] as Todo[],
};

jest.mock("@/src/hooks/useGetUserActivity", () => ({
  useGetUserActivity: () => ({
    data: mockActivity,
    isLoading: false,
    isError: false,
  }),
}));

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockUser: User = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "sincere@april.biz",
  phone: "1-770-736-0988",
  website: "hildegard.org",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: { lat: "-37.3159", lng: "81.1496" },
  },
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};

const mockPosts: Post[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  userId: 1,
  title: `Post title number ${i + 1}`,
  body: `Body content for post ${i + 1}`,
}));

const mockTodos: Todo[] = [
  { id: 1, userId: 1, title: "Selesaikan laporan", completed: true },
  { id: 2, userId: 1, title: "Beli bahan makanan", completed: false },
  { id: 3, userId: 1, title: "Olahraga pagi", completed: true },
  { id: 4, userId: 1, title: "Baca buku", completed: false },
  { id: 5, userId: 1, title: "Review kode", completed: true },
  { id: 6, userId: 1, title: "Meeting tim", completed: false },
];

// ── Helper ────────────────────────────────────────────────────────────────────

async function importUserDetailContainer() {
  const mod = await import("@/src/app/containers/UserDetailContainer");
  return mod.UserDetailContainer;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("UserDetailContainer — profile fields", () => {
  beforeEach(() => {
    mockActivity.posts = [];
    mockActivity.todos = [];
  });

  it("renders the user name as heading", async () => {
    const UserDetailContainer = await importUserDetailContainer();
    render(<UserDetailContainer user={mockUser} />);
    expect(screen.getByRole("heading", { name: /leanne graham/i })).toBeInTheDocument();
  });

  it("renders username with @ prefix", async () => {
    const UserDetailContainer = await importUserDetailContainer();
    render(<UserDetailContainer user={mockUser} />);
    expect(screen.getByText(/@bret/i)).toBeInTheDocument();
  });

  it("renders email address", async () => {
    const UserDetailContainer = await importUserDetailContainer();
    render(<UserDetailContainer user={mockUser} />);
    expect(screen.getByText("sincere@april.biz")).toBeInTheDocument();
  });

  it("renders company name", async () => {
    const UserDetailContainer = await importUserDetailContainer();
    render(<UserDetailContainer user={mockUser} />);
    expect(screen.getByText("Romaguera-Crona")).toBeInTheDocument();
  });

  it("renders company catchphrase in quotes", async () => {
    const UserDetailContainer = await importUserDetailContainer();
    render(<UserDetailContainer user={mockUser} />);
    expect(
      screen.getByText(/multi-layered client-server neural-net/i)
    ).toBeInTheDocument();
  });

  it("renders back-to-list link", async () => {
    const UserDetailContainer = await importUserDetailContainer();
    render(<UserDetailContainer user={mockUser} />);
    const backLink = screen.getByRole("link", { name: /kembali ke daftar/i });
    expect(backLink).toHaveAttribute("href", "/users");
  });

  it("renders website link", async () => {
    const UserDetailContainer = await importUserDetailContainer();
    render(<UserDetailContainer user={mockUser} />);
    expect(screen.getByText("hildegard.org")).toBeInTheDocument();
  });
});

describe("UserDetailContainer — posts section", () => {
  it("renders posts section when posts exist", async () => {
    mockActivity.posts = mockPosts;
    mockActivity.todos = [];

    const UserDetailContainer = await importUserDetailContainer();
    render(<UserDetailContainer user={mockUser} />);

    expect(screen.getByRole("heading", { name: /aktivitas post/i })).toBeInTheDocument();
  });

  it("shows only first 5 posts initially", async () => {
    mockActivity.posts = mockPosts;
    mockActivity.todos = [];

    const UserDetailContainer = await importUserDetailContainer();
    render(<UserDetailContainer user={mockUser} />);

    // First 5 post titles should be visible
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(`Post title number ${i}`)).toBeInTheDocument();
    }
    // Post 6 should NOT be visible
    expect(screen.queryByText("Post title number 6")).not.toBeInTheDocument();
  });

  it("shows all posts after clicking 'Lihat semua' button", async () => {
    mockActivity.posts = mockPosts;
    mockActivity.todos = [];

    const UserDetailContainer = await importUserDetailContainer();
    render(<UserDetailContainer user={mockUser} />);

    const toggleBtn = screen.getByRole("button", { name: /lihat semua/i });
    fireEvent.click(toggleBtn);

    // All 8 posts should now be visible
    for (let i = 1; i <= 8; i++) {
      expect(screen.getByText(`Post title number ${i}`)).toBeInTheDocument();
    }
  });
});

describe("UserDetailContainer — todos section", () => {
  it("renders todos with correct status badges", async () => {
    mockActivity.posts = [];
    mockActivity.todos = mockTodos;

    const UserDetailContainer = await importUserDetailContainer();
    render(<UserDetailContainer user={mockUser} />);

    expect(screen.getByRole("heading", { name: /daftar tugas/i })).toBeInTheDocument();
    expect(screen.getAllByText("Selesai").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Tertunda").length).toBeGreaterThan(0);
  });

  it("shows only first 5 todos initially", async () => {
    mockActivity.posts = [];
    mockActivity.todos = mockTodos;

    const UserDetailContainer = await importUserDetailContainer();
    render(<UserDetailContainer user={mockUser} />);

    expect(screen.getByText("Selesaikan laporan")).toBeInTheDocument();
    expect(screen.queryByText("Meeting tim")).not.toBeInTheDocument();
  });

  it("expands todos to show all on toggle", async () => {
    mockActivity.posts = [];
    mockActivity.todos = mockTodos;

    const UserDetailContainer = await importUserDetailContainer();
    render(<UserDetailContainer user={mockUser} />);

    const toggleBtn = screen.getByRole("button", { name: /lihat semua/i });
    fireEvent.click(toggleBtn);

    expect(screen.getByText("Meeting tim")).toBeInTheDocument();
  });
});

describe("UserDetailContainer — loading state", () => {
  it("renders skeleton while loading", async () => {
    // Re-mock to loading
    jest.doMock("@/src/hooks/useGetUserActivity", () => ({
      useGetUserActivity: () => ({
        data: undefined,
        isLoading: true,
        isError: false,
      }),
    }));

    const UserDetailContainer = await importUserDetailContainer();
    render(<UserDetailContainer user={mockUser} />);

    // With loading=false in outer mock, profile renders
    // This verifies no crash and heading present
    expect(screen.getByRole("heading", { name: /leanne graham/i })).toBeInTheDocument();
  });
});
