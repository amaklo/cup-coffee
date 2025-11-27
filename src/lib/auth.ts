// src/lib/auth.ts
export type User = {
  id: number;
  name: string;
  role: string;
};

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function login(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem("user");
}
