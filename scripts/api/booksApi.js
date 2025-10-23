import { getToken } from "../utils/secure-store";

const API_URL = "https://localhost:5000/api";

export async function fetchBooks() {
  const token = await getToken();

  const response = await fetch(`${API_URL}/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Ошибка загрузки книг");

  return await response.json();
}
