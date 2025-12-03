import { throwException } from "../lib/utils/throwing-exception";
import {
  BookListItem,
  FileResponse,
  GetReadBooksQuery,
  PagedResult,
  UpdateReadingProgressCommand,
} from "../types/types";
import { BookDetails } from "../types/types";
export class BooksClient {
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

  getBook(bookId: number): Promise<FileResponse> {
    let url_ = this.baseUrl + "/api/Books/{bookId}/read";
    if (bookId === undefined || bookId === null)
      throw new globalThis.Error("The parameter 'bookId' must be defined.");
    url_ = url_.replace("{bookId}", encodeURIComponent("" + bookId));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/octet-stream",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processGetBook(_response);
    });
  }

  protected processGetBook(response: Response): Promise<FileResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 200 || status === 206) {
      const contentDisposition = response.headers
        ? response.headers.get("content-disposition")
        : undefined;
      let fileNameMatch = contentDisposition
        ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(
            contentDisposition
          )
        : undefined;
      let fileName =
        fileNameMatch && fileNameMatch.length > 1
          ? fileNameMatch[3] || fileNameMatch[2]
          : undefined;
      if (fileName) {
        fileName = decodeURIComponent(fileName);
      } else {
        fileNameMatch = contentDisposition
          ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition)
          : undefined;
        fileName =
          fileNameMatch && fileNameMatch.length > 1
            ? fileNameMatch[1]
            : undefined;
      }
      return response.blob().then((blob) => {
        return {
          fileName: fileName,
          data: blob,
          status: status,
          headers: _headers,
        };
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<FileResponse>(null as any);
  }

  getReadBooks(query: GetReadBooksQuery): Promise<PagedResult<BookListItem>> {
    // let url_ = `${this.baseUrl}/api/Books/readbooks`;
    // const content_ = JSON.stringify(query);
    // console.log(content_);
    // let options_: RequestInit = {
    //   body: content_,
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // };

    const { UserId, LastId, Limit } = query;
    let url_ = `${this.baseUrl}/api/Books/readbooks?`;
    url_ += `userId=${encodeURIComponent(UserId)}&`;
    // 1. Формируем строку запроса из параметров
    if (LastId !== null && LastId !== undefined) {
      url_ += `lastId=${encodeURIComponent(LastId)}&`;
    }
    if (Limit !== undefined) {
      url_ += `limit=${encodeURIComponent(Limit)}&`;
    }
    url_ = url_.replace(/[?&]$/, "");
    console.log(url_);

    let options_: RequestInit = {
      method: "GET",
      headers: {

        Accept: "application/octet-stream",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processJsonResponseForReadBooks<PagedResult<BookListItem>>(
        _response
      );
    });
  }

  protected async processJsonResponseForReadBooks<T>(
    response: Response
  ): Promise<T> {
    const status = response.status;
    const headers: any = {};
    response.headers.forEach((v, k) => (headers[k] = v));

    if (status === 200) {
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
      const responseText = await response.text();
      return throwException(
        "An unexpected server error occurred.",
        status,
        responseText,
        headers
      );
    }
  }

  /**
   * Отправляет прогресс чтения на сервер.
   * Эндпоинт: POST /api/Books/{bookId}/progress
   */
  updateReadingProgress(command: UpdateReadingProgressCommand): Promise<void> {
    let url_ = this.baseUrl + "/api/Books/{bookId}/progress";

    if (command.bookId === undefined || command.bookId === null)
      throw new Error("The parameter 'command.bookId' must be defined.");

    url_ = url_.replace("{bookId}", encodeURIComponent("" + command.bookId));
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(command);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processUpdateReadingProgress(_response);
    });
  }

  protected async processUpdateReadingProgress(
    response: Response
  ): Promise<void> {
    const status = response.status;

    if (status === 200 || status === 204) {
      return;
    }

    const _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }

    const responseText = await response.text();
    return throwException(
      "An unexpected server error occurred.",
      status,
      responseText,
      _headers
    );
  }

  getBookMetadata(userId: number, bookId: number): Promise<BookDetails | null> {
    let url_ = `${this.baseUrl}/api/Books/${encodeURIComponent(bookId)}/info?`;
    url_ += `userId=${userId}`;
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processJsonResponse<BookDetails>(_response);
    });
  }
  protected async processJsonResponse<T>(response: Response): Promise<T> {
    const status = response.status;
    const headers: any = {};
    response.headers.forEach((v, k) => (headers[k] = v));

    if (status === 200) {
      if (response.headers.get("content-length") === "0") {
        return null as T;
      }
      return response.json() as Promise<T>;
    } else if (status === 204 || status === 404) {
      return null as T;
    } else if (status >= 400) {
      const responseText = await response.text();
      return throwException(
        "An unexpected server error occurred.",
        status,
        responseText,
        headers
      );
    }
    const responseText = await response.text();
    return throwException(
      "An unexpected server error occurred.",
      status,
      responseText,
      headers
    );
  }
}

export const booksClient = new BooksClient(
  process.env.EXPO_PUBLIC_BASE_DEV_URL
);
