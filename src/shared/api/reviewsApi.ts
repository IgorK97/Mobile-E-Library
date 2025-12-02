import {
  ReviewDetails,
  PagedResult,
  CreateReviewCommand,
  RateReviewCommand,
} from "../types/types";
import * as SecureStore from "expo-secure-store";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_DEV_URL + "/api/Reviews";

export class ReviewsApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    url: string,
    method: string = "GET",
    body?: any
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    let token;
    if (method === "POST") {
      token = await SecureStore.getItemAsync("token");
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      console.log(token);
    }
    console.log(url);

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}. Details: ${errorText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json() as Promise<T>;
    }

    // Если тело пустое (например, для POST, возвращающего Ok(reviewId) или Ok(result))
    // Возвращаем undefined или null, в зависимости от ожидаемого типа
    return response.status === 204 || response.status === 200
      ? (null as unknown as T)
      : (response.json() as Promise<T>);
  }

  public async getReviewsByBookId(
    bookId: number,
    lastId: number | null = null,
    limit: number = 20,
    userId: number | null
  ): Promise<PagedResult<ReviewDetails>> {
    let url = `${this.baseUrl}/${bookId}?limit=${limit}`;
    if (lastId) {
      url += `&lastId=${lastId}`;
    }
    if (userId) {
      url += `&userId=${userId}`;
    }
    return this.request<PagedResult<ReviewDetails>>(url);
  }

  public async createReview(command: CreateReviewCommand): Promise<number> {
    return this.request<number>(`${this.baseUrl}/api/Reviews`, "POST", command);
  }

  public async rateReview(request: RateReviewCommand): Promise<any> {
    return this.request<any>(
      `${this.baseUrl}/api/Reviews/rate`,
      "POST",
      request
    );
  }
}

export const reviewsClient = new ReviewsApiClient(
  process.env.EXPO_PUBLIC_BASE_DEV_URL
);
