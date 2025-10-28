import { saveToken, deleteToken, getToken } from "../utils/secure-store";

const API_URL = "https://localhost:5000/api";

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Ошибка авторизации");

  const data = await response.json();
  await saveToken(data.token);
  return data;
}

export async function logoutUser() {
  await deleteToken();
}

export async function getAuthToken() {
  return await getToken();
}
