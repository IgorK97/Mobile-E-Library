import { throwException } from "../lib/utils/throwing-exception";
import {
  BookListItem,
  FileResponse,
  PagedResult,
  SelectionDetails,
} from "../types/types";

export class SelectionsClient {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  // protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
  //   undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    this.http = http ? http : (window as any);
    this.baseUrl = baseUrl ?? "http://localhost:5169";
  }

  /**
   * Асинхронно получает список активных подборок.
   * Соответствует GET /api/Selections.
   */
  getSelections(): Promise<SelectionDetails[]> {
    // let url_ = this.baseUrl + "/api/Selections";
    // url_ = url_.replace(/[?&]$/, "");

    const url_ = `${this.baseUrl}/api/Selections`;

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processJsonResponse<SelectionDetails[]>(_response);
    });
  }

  getBooks(
    selectionId: number,
    lastId: number | null | undefined,
    limit: number | undefined
  ): Promise<PagedResult<BookListItem>> {
    let url_ = `${this.baseUrl}/api/Selections/${encodeURIComponent(
      selectionId
    )}/books?`;

    if (lastId !== null && lastId !== undefined) {
      url_ += `lastId=${encodeURIComponent(lastId)}&`;
    }
    if (limit !== undefined) {
      url_ += `limit=${encodeURIComponent(limit)}&`;
    }
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processJsonResponse<PagedResult<BookListItem>>(_response);
    });
  }

  protected async processJsonResponse<T>(response: Response): Promise<T> {
    const status = response.status;
    const headers: any = {};
    response.headers.forEach((v, k) => (headers[k] = v));

    if (status === 200) {
      //   if (response.headers.get("content-length") === "0") {
      //     return null as T;
      //   }
      return response.json() as Promise<T>;
    } else if (status >= 400) {
      const responseText = await response.text();
      return throwException(
        "An unexpected server error occurred.",
        status,
        responseText,
        headers
      );
    } else {
      // Неожиданный статус
      const responseText = await response.text();
      return throwException(
        "An unexpected server error occurred.",
        status,
        responseText,
        headers
      );
    }
  }
}

export const selectionsClient = new SelectionsClient(
  process.env.EXPO_PUBLIC_BASE_DEV_URL
);
