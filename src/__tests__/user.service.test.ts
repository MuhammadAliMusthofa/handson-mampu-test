import { mockPosts, mockTodos, mockUsers } from "../__mocks__/styleMock";
import { ApiError } from "../services/api";
import userService from "../services/user.service";
const { getUsersWithActivity, getById: getUserById, getUserActivity } = userService;



// ── Mock fetch ────────────────────────────────────────────────────────────────

const mockFetch = jest.fn();

beforeAll(() => {
  global.fetch = mockFetch;
});

// Helper to create a mock fetch response compatible with apiFetch() expectations
function mockOk<T>(data: T) {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(data),
  } as unknown as globalThis.Response);
}

function mockNotFound() {
  return Promise.resolve({
    ok: false,
    status: 404,
    json: () => Promise.resolve({ message: "Not Found" }),
  } as unknown as globalThis.Response);
}

beforeEach(() => {
  mockFetch.mockImplementation((url: RequestInfo | URL) => {
    const urlStr = url.toString();

    if (urlStr.includes("/posts?userId=1")) return mockOk(mockPosts.filter((p) => p.userId === 1));
    if (urlStr.includes("/posts?userId=2")) return mockOk(mockPosts.filter((p) => p.userId === 2));
    if (urlStr.includes("/todos?userId=1")) return mockOk(mockTodos.filter((t) => t.userId === 1));
    if (urlStr.includes("/todos?userId=2")) return mockOk(mockTodos.filter((t) => t.userId === 2));
    if (urlStr.match(/\/users\/1$/))        return mockOk(mockUsers[0]);
    if (urlStr.match(/\/users\/999$/))      return mockNotFound();
    if (urlStr.endsWith("/users"))          return mockOk(mockUsers);
    if (urlStr.endsWith("/posts"))          return mockOk(mockPosts);
    if (urlStr.endsWith("/todos"))          return mockOk(mockTodos);

    return mockNotFound();
  });
});


afterEach(() => {
  mockFetch.mockClear();
});


// ── Tests ─────────────────────────────────────────────────────────────────────

describe("getUsersWithActivity", () => {
  it("should return users enriched with correct activity signals", async () => {
    const result = await getUsersWithActivity();

    expect(result).toHaveLength(2);

    // User 1: 2 posts, 1 completed, 2 pending
    const user1 = result.find((u) => u.id === 1)!;
    expect(user1.totalPosts).toBe(2);
    expect(user1.completedTodos).toBe(1);
    expect(user1.pendingTodos).toBe(2);

    // User 2: 1 post, 2 completed, 0 pending
    const user2 = result.find((u) => u.id === 2)!;
    expect(user2.totalPosts).toBe(1);
    expect(user2.completedTodos).toBe(2);
    expect(user2.pendingTodos).toBe(0);
  });

  it("should preserve original user fields in the enriched result", async () => {
    const result = await getUsersWithActivity();
    const user1 = result.find((u) => u.id === 1)!;

    expect(user1.name).toBe("Leanne Graham");
    expect(user1.email).toBe("sincere@april.biz");
    expect(user1.company.name).toBe("Romaguera-Crona");
  });

  it("should parallelize posts and todos fetch (both called)", async () => {
    await getUsersWithActivity();
    const fetchCalls = mockFetch.mock.calls.map(
      (c: [string | URL]) => c[0].toString()
    );
    expect(fetchCalls.some((u: string) => u.endsWith("/posts"))).toBe(true);
    expect(fetchCalls.some((u: string) => u.endsWith("/todos"))).toBe(true);
    expect(fetchCalls.some((u: string) => u.endsWith("/users"))).toBe(true);
  });
});

describe("getUserById", () => {
  it("should return the user with matching id", async () => {
    const user = await getUserById(1);
    expect(user.id).toBe(1);
    expect(user.name).toBe("Leanne Graham");
  });

  it("should throw ApiError with status 404 for non-existent user", async () => {
    await expect(getUserById(999)).rejects.toThrow(ApiError);
    await expect(getUserById(999)).rejects.toMatchObject({ status: 404 });
  });
});

describe("getUserActivity", () => {
  it("should return posts and todos for the specified user", async () => {
    const { posts, todos } = await getUserActivity(1);

    expect(posts).toHaveLength(2);
    expect(todos).toHaveLength(3);
    expect(posts.every((p) => p.userId === 1)).toBe(true);
    expect(todos.every((t) => t.userId === 1)).toBe(true);
  });

  it("should reflect correct completed vs pending split", async () => {
    const { todos } = await getUserActivity(1);
    const completed = todos.filter((t) => t.completed).length;
    const pending = todos.filter((t) => !t.completed).length;

    expect(completed).toBe(1);
    expect(pending).toBe(2);
  });
});
