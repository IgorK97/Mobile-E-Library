// api/AuthApi.ts
import { BaseApi } from "@/src/shared/api/baseApi";
import {
  LoginData,
  RegisterData,
  AuthResponse,
  User,
} from "@/src/shared/types/types";

export class AuthApi extends BaseApi {
  private token: string | null = null;
  private refreshToken: string | null = null;

  constructor(baseUrl: string) {
    super(baseUrl);
    this.loadTokens();
  }

  private async loadTokens() {
    // Загрузка токенов из SecureStore или AsyncStorage
    // Например, из Zustand store
  }

  private async saveTokens(token: string) {
    // Сохранение токенов
    this.token = token;
  }

  public setAuthToken(token: string) {
    this.token = token;
  }

  private getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {};

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    });

    await this.saveTokens(response.token);
    return response;
  }

  async register(registerData: RegisterData): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(registerData),
    });

    await this.saveTokens(response.token);
    return response;
  }

  async logout(): Promise<void> {
    await this.request("/auth/logout", {
      method: "POST",
      headers: this.getAuthHeaders(),
    });

    this.token = null;
    this.refreshToken = null;
    // Очистка из хранилища
  }

  async refreshAuth(): Promise<AuthResponse> {
    if (!this.refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await this.request<AuthResponse>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken: this.refreshToken }),
    });

    await this.saveTokens(response.token);
    return response;
  }

  async getCurrentUser(): Promise<User> {
    return await this.request<User>("/auth/me", {
      headers: this.getAuthHeaders(),
    });
  }
}
