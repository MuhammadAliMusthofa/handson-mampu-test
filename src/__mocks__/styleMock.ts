import { Post, Todo, User } from "../types";

export const mockUsers: User[] = [
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
      geo: { lat: "-37.3159", lng: "81.1496" },
    },
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
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
      geo: { lat: "-43.9509", lng: "-34.4618" },
    },
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
  },
];

export const mockPosts: Post[] = [
  { id: 1, userId: 1, title: "Post 1 User 1", body: "Body 1" },
  { id: 2, userId: 1, title: "Post 2 User 1", body: "Body 2" },
  { id: 3, userId: 2, title: "Post 1 User 2", body: "Body 3" },
];

export const mockTodos: Todo[] = [
  { id: 1, userId: 1, title: "Todo 1 User 1", completed: true },
  { id: 2, userId: 1, title: "Todo 2 User 1", completed: false },
  { id: 3, userId: 1, title: "Todo 3 User 1", completed: false },
  { id: 4, userId: 2, title: "Todo 1 User 2", completed: true },
  { id: 5, userId: 2, title: "Todo 2 User 2", completed: true },
];

export default {};
