import { throwException } from "../lib/utils/throwing-exception";
import { BookListItem, PagedResult, ShelfDetails } from "../types/types";

export class ShelvesClient {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    this.http = http ? http : (window as any);
    this.baseUrl = baseUrl ?? "http://localhost:5169";
  }

  /** ---------------------------
   *  Возвращает список книг полки (пагинация)
   *  --------------------------- */
  getShelfBooks(
    userId: number,
    shelfId: number,
    lastId: number | null | undefined,
    limit: number | undefined
  ): Promise<PagedResult<BookListItem>> {
    let url_ = `${this.baseUrl}/api/Shelves/${encodeURIComponent(
      shelfId
    )}/books?userId=${userId}&`;

    if (lastId !== null && lastId !== undefined) {
      url_ += `lastId=${encodeURIComponent(lastId)}&`;
    }
    if (limit !== undefined) {
      url_ += `limit=${encodeURIComponent(limit)}&`;
    }

    url_ = url_.replace(/[?&]$/, "");

    const options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.http
      .fetch(url_, options_)
      .then((response) =>
        this.processJsonResponse<PagedResult<BookListItem>>(response)
      );
  }

  protected async processJsonResponse<T>(response: Response): Promise<T> {
    const status = response.status;
    const headers: any = {};
    response.headers.forEach((v, k) => (headers[k] = v));

    if (status === 200) {
      return response.json() as Promise<T>;
    }

    const responseText = await response.text();
    return throwException(
      "An unexpected server error occurred.",
      status,
      responseText,
      headers
    );
  }
  addBookToShelf(shelfId: number, bookId: number): Promise<boolean> {
    const url_ = `${this.baseUrl}/api/Shelves/${shelfId}/books/${bookId}`;

    const options_: RequestInit = {
      method: "POST",
      headers: { Accept: "application/json" },
    };

    return this.http.fetch(url_, options_).then(async (response) => {
      if (response.ok) return true;
      await this.processJsonResponse(response);
      return false;
    });
  }

  removeBookFromShelf(shelfId: number, bookId: number): Promise<boolean> {
    const url_ = `${this.baseUrl}/api/Shelves/${shelfId}/books/${bookId}`;

    const options_: RequestInit = {
      method: "DELETE",
      headers: { Accept: "application/json" },
    };

    return this.http.fetch(url_, options_).then(async (response) => {
      if (response.ok) return true;
      await this.processJsonResponse(response);
      return false;
    });
  }
  getUserShelves(userId: number): Promise<ShelfDetails[]> {
    const url_ = `${this.baseUrl}/api/Shelves/user/${encodeURIComponent(
      userId
    )}`;

    const options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.http
      .fetch(url_, options_)
      .then((response) => this.processJsonResponse<ShelfDetails[]>(response));
  }
}

export const shelvesClient = new ShelvesClient(
  process.env.EXPO_PUBLIC_BASE_DEV_URL
);
