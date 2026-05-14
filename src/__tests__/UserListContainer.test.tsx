/**
 * Tests for UserListContainer component.
 *
 * Strategy: mock the useUsersWithActivity hook and next/navigation,
 * then render UserListContainer and verify filtering/search/empty-state behavior.
 */
import React from "react";
import { render, screen, fireEvent, within, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserWithActivity } from "../types";

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockReplace = jest.fn();
const mockPush = jest.fn();
const mockSearchParams = new URLSearchParams();
const mockUseUsersWithActivity = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace, push: mockPush }),
  usePathname: () => "/users",
  useSearchParams: () => mockSearchParams,
}));

jest.mock("@/src/hooks/useGetAllUser", () => ({
  useUsersWithActivity: (initialData: any) => mockUseUsersWithActivity(initialData),
}));

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockUsers: UserWithActivity[] = [
  {
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
      geo: { lat: "-37", lng: "81" },
    },
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered neural-net",
      bs: "harness e-markets",
    },
    totalPosts: 10,
    completedTodos: 5,
    pendingTodos: 5,
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "shanna@melissa.tv",
    phone: "010-692-6593",
    website: "anastasia.net",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: { lat: "-43", lng: "-34" },
    },
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize supply-chains",
    },
    totalPosts: 3,
    completedTodos: 8,
    pendingTodos: 0,
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "nathan@yesenia.net",
    phone: "1-463-123-4447",
    website: "ramiro.info",
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
      geo: { lat: "-68", lng: "36" },
    },
    company: {
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
    },
    totalPosts: 7,
    completedTodos: 4,
    pendingTodos: 6,
  },
];

// ── Lazy import after mocks ───────────────────────────────────────────────────

let UserListContainer: typeof import("@/src/app/containers/UserListContainer").UsersListContainer;

beforeAll(async () => {
  const mod = await import("@/src/app/containers/UserListContainer");
  UserListContainer = mod.UsersListContainer;
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("UserListContainer", () => {
  beforeEach(() => {
    mockReplace.mockClear();
    mockPush.mockClear();
    mockSearchParams.set("search", "");
    mockSearchParams.delete("filter");
    mockSearchParams.delete("sort");
    mockSearchParams.delete("order");
    mockSearchParams.delete("page");
    
    mockUseUsersWithActivity.mockReturnValue({
      data: {
        paginatedUsers: mockUsers,
        totalCount: mockUsers.length,
        filteredCount: mockUsers.length,
        totalPages: 1,
        params: { search: "", filter: "all", sort: "name", order: "asc", page: 1 },
      },
      isLoading: false,
      isError: false,
      error: null,
    });
  });

  it("renders all users when no filter is active", () => {
    render(<UserListContainer initialData={mockUsers} />);
    // Names appear in both desktop table and mobile card grid (hidden via CSS)
    expect(screen.getAllByText("Leanne Graham").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Ervin Howell").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Clementine Bauch").length).toBeGreaterThanOrEqual(1);
  });

  it("shows the correct total count in FilterBar", () => {
    render(<UserListContainer initialData={mockUsers} />);
    // The filter bar shows "Menampilkan X dari 3 pengguna" - check at least one "3" span exists
    const spans = screen.getAllByText(/3/i, { selector: "span.font-semibold" });
    expect(spans.length).toBeGreaterThanOrEqual(1);
  });

  it("search input updates URL params on change", () => {
    jest.useFakeTimers();
    render(<UserListContainer initialData={mockUsers} />);

    const searchInput = screen.getByPlaceholderText(/cari nama atau email/i);
    
    fireEvent.change(searchInput, { target: { value: "leanne" } });
    
    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(mockReplace).toHaveBeenCalled();
    const lastCall: string = mockReplace.mock.calls[mockReplace.mock.calls.length - 1][0];
    expect(lastCall).toContain("search=");
    jest.useRealTimers();
  });

  it("shows empty state when filter matches no users", () => {
    mockSearchParams.set("search", "nonexistentuser");
    mockUseUsersWithActivity.mockReturnValue({
      data: {
        paginatedUsers: [],
        totalCount: 0,
        filteredCount: 0,
        totalPages: 0,
        params: { search: "nonexistentuser", filter: "all", sort: "name", order: "asc", page: 1 },
      },
      isLoading: false,
      isError: false,
      error: null,
    });
    render(<UserListContainer initialData={mockUsers} />);
    expect(screen.getByText(/tidak ada hasil ditemukan/i)).toBeInTheDocument();
  });

  it("renders empty state component when filteredCount is 0", () => {
    mockUseUsersWithActivity.mockReturnValue({
      data: { paginatedUsers: [] },
      isLoading: false,
      isError: false,
      error: null,
    });
    render(<UserListContainer initialData={[]} />);
    expect(
      screen.getByText(/tidak ada hasil ditemukan/i)
    ).toBeInTheDocument();
  });

  it("renders reset filter button in empty state", () => {
    mockUseUsersWithActivity.mockReturnValue({
      data: { paginatedUsers: [] },
      isLoading: false,
      isError: false,
      error: null,
    });
    render(<UserListContainer initialData={[]} />);
    expect(screen.getByRole("button", { name: /reset filter/i })).toBeInTheDocument();
  });

  it("shows activity badges in the table", () => {
    render(<UserListContainer initialData={mockUsers} />);
    // Check for posts badge
    expect(screen.getAllByText(/posts/i).length).toBeGreaterThan(0);
    // Check for todos completed badge (selesai)
    expect(screen.getAllByText(/selesai/i).length).toBeGreaterThan(0);
  });

  it("shows users table when data is available", () => {
    render(<UserListContainer initialData={mockUsers} />);
    // Table should be rendered when data is present
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("shows error message when isError is true", () => {
    mockUseUsersWithActivity.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error("Fetch failed"),
    });
    render(<UserListContainer initialData={mockUsers} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/fetch failed/i)).toBeInTheDocument();
  });
});
