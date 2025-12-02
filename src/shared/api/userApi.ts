// functions.ts
import * as SecureStore from "expo-secure-store";
import { apiPost, apiGet, ApiResponse } from "./baseApi";
import {
  ChangePasswordRequest,
  UpdateProfileRequest,
  UserProfile,
} from "../types/types";

export interface LoginResult {
  success: boolean;
  token?: string;
  refreshToken?: string;
  message?: string;
}

export interface RegistrationResult {
  success: boolean;
  token: string;
  refreshToken: string;
  message?: string;
}

// export interface UserProfile {
//   id: string;
//   email: string;
//   name: string;
//   familyName: string;
// }

export async function register(data: {
  name: string;
  familyName: string;
  email: string;
  password: string;
}): Promise<RegistrationResult> {
  const res = await apiPost<RegistrationResult>("/users/register", data);
  if (res.success && res.token && res.refreshToken) {
    await SecureStore.setItemAsync("token", res.token);
    await SecureStore.setItemAsync("refresh", res.refreshToken);
  }
  return res;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResult> {
  const res = await apiPost<LoginResult>("/users/login", { email, password });

  if (res.success && res.token && res.refreshToken) {
    await SecureStore.setItemAsync("token", res.token);
    console.log(res.token);
    await SecureStore.setItemAsync("refresh", res.refreshToken);
    console.log("TRU-LA-LA");
  }

  return res;
}

export async function getProfile(): Promise<UserProfile> {
  // return await apiGet<UserProfile>("/users/me");
  try {
    const res = await apiGet<UserProfile>("/users/me");
    console.log("BU-TRA-TU", res);
    await SecureStore.setItemAsync("profile", JSON.stringify(res));
    return res;
  } catch (e) {
    const cached = await SecureStore.getItemAsync("profile");
    if (cached) return JSON.parse(cached);
    throw e;
  }
}

export async function updateProfile(
  data: UpdateProfileRequest
): Promise<UserProfile> {
  // 🌟 Используем PUT для обновления существующего ресурса
  const res = await apiPost<UserProfile>("/users/profile", data);

  // if (res.success) {
  // 🌟 Обновляем кэш профиля
  await SecureStore.setItemAsync("profile", JSON.stringify(res));
  return res;
  // }
  // В случае ошибки, выбросим ошибку, чтобы компонент мог ее обработать
  // throw new Error(res.message || "Failed to update profile.");
}

export async function changePassword(
  data: ChangePasswordRequest
): Promise<void> {
  // 🌟 Используем POST или PUT для смены пароля
  const res = await apiPost<null>("/users/password", data);

  // if (res.success) {
  // return res;
  // }
  // throw new Error(res.message || "Failed to change password.");
}
