// import { throwException } from "../lib/utils/throwing-exception";
// import { FileResponse } from "../types/types";

// export class ShelvesClient {
//   private http: {
//     fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
//   };
//   private baseUrl: string;
//   protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
//     undefined;

//   constructor(
//     baseUrl?: string,
//     http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
//   ) {
//     this.http = http ? http : (window as any);
//     this.baseUrl = baseUrl ?? "http://localhost:5169";
//   }

//   getUserShelves(userId: number): Promise<FileResponse> {
//     let url_ = this.baseUrl + "/api/Shelves/user/{userId}";
//     if (userId === undefined || userId === null)
//       throw new globalThis.Error("The parameter 'userId' must be defined.");
//     url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
//     url_ = url_.replace(/[?&]$/, "");

//     let options_: RequestInit = {
//       method: "GET",
//       headers: {
//         Accept: "application/octet-stream",
//       },
//     };

//     return this.http.fetch(url_, options_).then((_response: Response) => {
//       return this.processGetUserShelves(_response);
//     });
//   }

//   protected processGetUserShelves(response: Response): Promise<FileResponse> {
//     const status = response.status;
//     let _headers: any = {};
//     if (response.headers && response.headers.forEach) {
//       response.headers.forEach((v: any, k: any) => (_headers[k] = v));
//     }
//     if (status === 200 || status === 206) {
//       const contentDisposition = response.headers
//         ? response.headers.get("content-disposition")
//         : undefined;
//       let fileNameMatch = contentDisposition
//         ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(
//             contentDisposition
//           )
//         : undefined;
//       let fileName =
//         fileNameMatch && fileNameMatch.length > 1
//           ? fileNameMatch[3] || fileNameMatch[2]
//           : undefined;
//       if (fileName) {
//         fileName = decodeURIComponent(fileName);
//       } else {
//         fileNameMatch = contentDisposition
//           ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition)
//           : undefined;
//         fileName =
//           fileNameMatch && fileNameMatch.length > 1
//             ? fileNameMatch[1]
//             : undefined;
//       }
//       return response.blob().then((blob) => {
//         return {
//           fileName: fileName,
//           data: blob,
//           status: status,
//           headers: _headers,
//         };
//       });
//     } else if (status !== 200 && status !== 204) {
//       return response.text().then((_responseText) => {
//         return throwException(
//           "An unexpected server error occurred.",
//           status,
//           _responseText,
//           _headers
//         );
//       });
//     }
//     return Promise.resolve<FileResponse>(null as any);
//   }

//   getShelfBooks(
//     shelfId: number,
//     lastId: number | null | undefined,
//     limit: number | undefined
//   ): Promise<FileResponse> {
//     let url_ = this.baseUrl + "/api/Shelves/{shelfId}/books?";
//     if (shelfId === undefined || shelfId === null)
//       throw new globalThis.Error("The parameter 'shelfId' must be defined.");
//     url_ = url_.replace("{shelfId}", encodeURIComponent("" + shelfId));
//     if (lastId !== undefined && lastId !== null)
//       url_ += "lastId=" + encodeURIComponent("" + lastId) + "&";
//     if (limit === null)
//       throw new globalThis.Error("The parameter 'limit' cannot be null.");
//     else if (limit !== undefined)
//       url_ += "limit=" + encodeURIComponent("" + limit) + "&";
//     url_ = url_.replace(/[?&]$/, "");

//     let options_: RequestInit = {
//       method: "GET",
//       headers: {
//         Accept: "application/octet-stream",
//       },
//     };

//     return this.http.fetch(url_, options_).then((_response: Response) => {
//       return this.processGetShelfBooks(_response);
//     });
//   }

//   protected processGetShelfBooks(response: Response): Promise<FileResponse> {
//     const status = response.status;
//     let _headers: any = {};
//     if (response.headers && response.headers.forEach) {
//       response.headers.forEach((v: any, k: any) => (_headers[k] = v));
//     }
//     if (status === 200 || status === 206) {
//       const contentDisposition = response.headers
//         ? response.headers.get("content-disposition")
//         : undefined;
//       let fileNameMatch = contentDisposition
//         ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(
//             contentDisposition
//           )
//         : undefined;
//       let fileName =
//         fileNameMatch && fileNameMatch.length > 1
//           ? fileNameMatch[3] || fileNameMatch[2]
//           : undefined;
//       if (fileName) {
//         fileName = decodeURIComponent(fileName);
//       } else {
//         fileNameMatch = contentDisposition
//           ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition)
//           : undefined;
//         fileName =
//           fileNameMatch && fileNameMatch.length > 1
//             ? fileNameMatch[1]
//             : undefined;
//       }
//       return response.blob().then((blob) => {
//         return {
//           fileName: fileName,
//           data: blob,
//           status: status,
//           headers: _headers,
//         };
//       });
//     } else if (status !== 200 && status !== 204) {
//       return response.text().then((_responseText) => {
//         return throwException(
//           "An unexpected server error occurred.",
//           status,
//           _responseText,
//           _headers
//         );
//       });
//     }
//     return Promise.resolve<FileResponse>(null as any);
//   }

//   addBook(shelfId: number, bookId: number): Promise<FileResponse> {
//     let url_ = this.baseUrl + "/api/Shelves/{shelfId}/books/{bookId}";
//     if (shelfId === undefined || shelfId === null)
//       throw new globalThis.Error("The parameter 'shelfId' must be defined.");
//     url_ = url_.replace("{shelfId}", encodeURIComponent("" + shelfId));
//     if (bookId === undefined || bookId === null)
//       throw new globalThis.Error("The parameter 'bookId' must be defined.");
//     url_ = url_.replace("{bookId}", encodeURIComponent("" + bookId));
//     url_ = url_.replace(/[?&]$/, "");

//     let options_: RequestInit = {
//       method: "POST",
//       headers: {
//         Accept: "application/octet-stream",
//       },
//     };

//     return this.http.fetch(url_, options_).then((_response: Response) => {
//       return this.processAddBook(_response);
//     });
//   }

//   protected processAddBook(response: Response): Promise<FileResponse> {
//     const status = response.status;
//     let _headers: any = {};
//     if (response.headers && response.headers.forEach) {
//       response.headers.forEach((v: any, k: any) => (_headers[k] = v));
//     }
//     if (status === 200 || status === 206) {
//       const contentDisposition = response.headers
//         ? response.headers.get("content-disposition")
//         : undefined;
//       let fileNameMatch = contentDisposition
//         ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(
//             contentDisposition
//           )
//         : undefined;
//       let fileName =
//         fileNameMatch && fileNameMatch.length > 1
//           ? fileNameMatch[3] || fileNameMatch[2]
//           : undefined;
//       if (fileName) {
//         fileName = decodeURIComponent(fileName);
//       } else {
//         fileNameMatch = contentDisposition
//           ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition)
//           : undefined;
//         fileName =
//           fileNameMatch && fileNameMatch.length > 1
//             ? fileNameMatch[1]
//             : undefined;
//       }
//       return response.blob().then((blob) => {
//         return {
//           fileName: fileName,
//           data: blob,
//           status: status,
//           headers: _headers,
//         };
//       });
//     } else if (status !== 200 && status !== 204) {
//       return response.text().then((_responseText) => {
//         return throwException(
//           "An unexpected server error occurred.",
//           status,
//           _responseText,
//           _headers
//         );
//       });
//     }
//     return Promise.resolve<FileResponse>(null as any);
//   }

//   removeBook(shelfId: number, bookId: number): Promise<FileResponse> {
//     let url_ = this.baseUrl + "/api/Shelves/{shelfId}/books/{bookId}";
//     if (shelfId === undefined || shelfId === null)
//       throw new globalThis.Error("The parameter 'shelfId' must be defined.");
//     url_ = url_.replace("{shelfId}", encodeURIComponent("" + shelfId));
//     if (bookId === undefined || bookId === null)
//       throw new globalThis.Error("The parameter 'bookId' must be defined.");
//     url_ = url_.replace("{bookId}", encodeURIComponent("" + bookId));
//     url_ = url_.replace(/[?&]$/, "");

//     let options_: RequestInit = {
//       method: "DELETE",
//       headers: {
//         Accept: "application/octet-stream",
//       },
//     };

//     return this.http.fetch(url_, options_).then((_response: Response) => {
//       return this.processRemoveBook(_response);
//     });
//   }

//   protected processRemoveBook(response: Response): Promise<FileResponse> {
//     const status = response.status;
//     let _headers: any = {};
//     if (response.headers && response.headers.forEach) {
//       response.headers.forEach((v: any, k: any) => (_headers[k] = v));
//     }
//     if (status === 200 || status === 206) {
//       const contentDisposition = response.headers
//         ? response.headers.get("content-disposition")
//         : undefined;
//       let fileNameMatch = contentDisposition
//         ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(
//             contentDisposition
//           )
//         : undefined;
//       let fileName =
//         fileNameMatch && fileNameMatch.length > 1
//           ? fileNameMatch[3] || fileNameMatch[2]
//           : undefined;
//       if (fileName) {
//         fileName = decodeURIComponent(fileName);
//       } else {
//         fileNameMatch = contentDisposition
//           ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition)
//           : undefined;
//         fileName =
//           fileNameMatch && fileNameMatch.length > 1
//             ? fileNameMatch[1]
//             : undefined;
//       }
//       return response.blob().then((blob) => {
//         return {
//           fileName: fileName,
//           data: blob,
//           status: status,
//           headers: _headers,
//         };
//       });
//     } else if (status !== 200 && status !== 204) {
//       return response.text().then((_responseText) => {
//         return throwException(
//           "An unexpected server error occurred.",
//           status,
//           _responseText,
//           _headers
//         );
//       });
//     }
//     return Promise.resolve<FileResponse>(null as any);
//   }
// }

// export const shelvesClient = new ShelvesClient(
//   process.env.EXPO_PUBLIC_BASE_DEV_URL
// );

import { throwException } from "../lib/utils/throwing-exception";
import { BookListItem, PagedResult } from "../types/types";

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
    shelfId: number,
    lastId: number | null | undefined,
    limit: number | undefined
  ): Promise<PagedResult<BookListItem>> {
    let url_ = `${this.baseUrl}/api/Shelves/${encodeURIComponent(
      shelfId
    )}/books?`;

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
        Accept: "application/json", // <-- ВАЖНО!
      },
    };

    return this.http
      .fetch(url_, options_)
      .then((response) =>
        this.processJsonResponse<PagedResult<BookListItem>>(response)
      );
  }

  /** Парсим JSON (аналогично BooksClient) */
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
}

export const shelvesClient = new ShelvesClient(
  process.env.EXPO_PUBLIC_BASE_DEV_URL
);
