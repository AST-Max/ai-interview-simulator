import api from "./api";

// NOTE: Backend not built yet. These functions call real endpoints,
// but will throw network errors until backend/routes/authRoutes.js exists.
// Swap USE_MOCK to false once backend is ready.
const USE_MOCK = true;

export async function loginUser(email, password) {
  if (USE_MOCK) {
    await fakeDelay();
    if (!email || !password) throw new Error("Email and password required");
    return { token: "mock-jwt-token", user: { name: "Test User", email } };
  }
  const res = await api.post("/auth/login", { email, password });
  return res.data;
}

export async function signupUser(name, email, password) {
  if (USE_MOCK) {
    await fakeDelay();
    return { token: "mock-jwt-token", user: { name, email } };
  }
  const res = await api.post("/auth/signup", { name, email, password });
  return res.data;
}

function fakeDelay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
