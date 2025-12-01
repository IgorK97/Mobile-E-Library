// api.ts
import * as SecureStore from "expo-secure-store";

const BASE_URL = `${process.env.EXPO_PUBLIC_BASE_DEV_URL}/api`;

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  token?: string;
  refreshToken?: string;
  data?: T;
}

async function request(
  url: string,
  options: RequestInit = {},
  retry: boolean = true
): Promise<Response> {
  const token = await SecureStore.getItemAsync("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  let response = await fetch(BASE_URL + url, {
    ...options,
    headers,
  });

  if (response.status === 401 && retry) {
    const refreshToken = await SecureStore.getItemAsync("refresh");
    if (!refreshToken) return response;

    const refreshResponse = await fetch(`${BASE_URL}/users/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshResponse.ok) return response;

    const refreshData = await refreshResponse.json();
    await SecureStore.setItemAsync("token", refreshData.token);

    return request(url, options, false);
  }

  return response;
}

export async function apiGet<T>(url: string): Promise<T> {
  const res = await request(url);
  return res.json();
}

export async function apiPost<T>(url: string, body: any): Promise<T> {
  const res = await request(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return res.json();
}
