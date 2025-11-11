// import { ApiError } from "../types/types";

export abstract class BaseApi {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: response.statusText,
        }));

        throw new ApiException({
          message: errorData.message || "API request failed",
          code: response.status,
          details: errorData,
        });
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiException) {
        throw error;
      }

      throw new ApiException({
        message: "Network error",
        code: 0,
        details: error,
      });
    }
  }

  protected async requestBlob(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Blob> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: {
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: response.statusText,
      }));

      throw new ApiException({
        message: errorData.message || "API request failed",
        code: response.status,
        details: errorData,
      });
    }

    return await response.blob();
  }
}
