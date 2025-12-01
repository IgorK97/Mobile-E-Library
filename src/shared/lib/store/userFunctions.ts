// functions.ts
import * as SecureStore from "expo-secure-store";
import { apiPost, apiGet, ApiResponse } from "../../api/usersApi";

export interface LoginResult {
  success: boolean;
  token?: string;
  refreshToken?: string;
  message?: string;
}

export interface RegistrationResult {
  success: boolean;
  token: string;
  message?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  familyName: string;
}

export async function register(data: {
  name: string;
  familyName: string;
  email: string;
  password: string;
}): Promise<RegistrationResult> {
  return await apiPost<RegistrationResult>("/users/register", data);
}

export async function login(
  email: string,
  password: string
): Promise<LoginResult> {
  const res = await apiPost<LoginResult>("/users/login", { email, password });

  if (res.success && res.token && res.refreshToken) {
    await SecureStore.setItemAsync("token", res.token);
    await SecureStore.setItemAsync("refresh", res.refreshToken);
  }

  return res;
}

export async function getProfile(): Promise<UserProfile> {
  return await apiGet<UserProfile>("/users/me");
}
