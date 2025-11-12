import { BaseApi } from "./baseApi";
import { Book, BooksListResponse, BooksFilter } from "../types/types";

export class BooksApi extends BaseApi {
  private token: string | null = null;

  constructor(baseUrl: string, token?: string) {
    super(baseUrl);
    if (token) {
      this.token = token;
    }
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

  async getBookMetadata(bookId: string): Promise<Book> {
    return await this.request<Book>(`/books/${bookId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  async getBookEpub(bookId: string): Promise<Blob> {
    return await this.requestBlob(`/books/${bookId}/epub`, {
      headers: this.getAuthHeaders(),
    });
  }

  async getGenres(): Promise<string[]> {
    return await this.request<string[]>("/books/genres", {
      headers: this.getAuthHeaders(),
    });
  }
}
