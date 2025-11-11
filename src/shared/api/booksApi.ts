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

  //   async getBooksList(filter: BooksFilter = {}): Promise<BooksListResponse> {
  //     const params = new URLSearchParams();

  //     if (filter.includedGenres) {
  //       filter.includedGenres.forEach((genre) =>
  //         params.append("includedGenres", String(genre))
  //       );
  //     }

  //     if (filter.excludedGenres) {
  //       filter.excludedGenres.forEach((genre) =>
  //         params.append("excludedGenres", String(genre))
  //       );
  //     }

  //     if (filter.page) {
  //       params.append("page", filter.page.toString());
  //     }

  //     if (filter.limit) {
  //       params.append("limit", filter.limit.toString());
  //     }

  //     const queryString = params.toString();
  //     const endpoint = `/books${queryString ? `?${queryString}` : ""}`;

  //     return await this.request<BooksListResponse>(endpoint, {
  //       headers: this.getAuthHeaders(),
  //     });
  //   }

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

  //   async searchBooks(
  //     query: string,
  //     filter?: Omit<BooksFilter, "searchQuery">
  //   ): Promise<BooksListResponse> {
  //     return await this.getBooksList({
  //       ...filter,
  //     });
  //   }
}
