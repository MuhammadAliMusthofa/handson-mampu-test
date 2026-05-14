export const BASE_URL = "https://jsonplaceholder.typicode.com";

// Sentralisasi endpoint seperti di proyek Anda
export const API_ENDPOINTS = {
  users: `${BASE_URL}/users`,
  posts: `${BASE_URL}/posts`,
  todos: `${BASE_URL}/todos`,
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

// Ini adalah "pengganti" axios instance kita untuk Next.js Server Components
export const fetchClient = {
  get: async <T>(url: string, config?: { params?: Record<string, any> }): Promise<T> => {
    let finalUrl = url;
    
    // Handle query params otomatis seperti axios ({ params: { userId: 1 } })
    if (config?.params) {
      const queryString = new URLSearchParams(
        Object.entries(config.params).map(([key, val]) => [key, String(val)])
      ).toString();
      finalUrl += `?${queryString}`;
    }

    // Native fetch Next.js (Dapat bonus ISR di sini!)
    const res = await fetch(finalUrl, {
      next: { revalidate: 60 }, 
    });

    if (!res.ok) {
      throw new ApiError(res.status, `API Error ${res.status}: ${finalUrl}`);
    }

    return res.json() as Promise<T>;
  },
};