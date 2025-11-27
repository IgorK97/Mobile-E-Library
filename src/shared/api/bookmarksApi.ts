import { throwException } from "../lib/utils/throwing-exception";
import {
  AddBookmarkCommand,
  FileResponse,
  RemoveBookmarkCommand,
} from "../types/types";

export class BookmarksClient {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    this.http = http ? http : (window as any);
    this.baseUrl = baseUrl ?? "http://localhost:5169";
  }

  add(command: AddBookmarkCommand): Promise<boolean> {
    let url_ = `${this.baseUrl}/api/Bookmarks`;

    const content_ = JSON.stringify(command);

    let options_: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: content_,
    };

    console.log(options_);

    return this.http.fetch(url_, options_).then(async (response) => {
      if (response.ok) return true;
      // await this.processJsonResponse(response);
      return false;
    });
  }

  protected processAdd(response: Response): Promise<FileResponse> {
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

  remove(command: RemoveBookmarkCommand): Promise<FileResponse> {
    let url_ = this.baseUrl + "/api/Bookmarks";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(command);

    let options_: RequestInit = {
      body: content_,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/octet-stream",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processRemove(_response);
    });
  }

  protected processRemove(response: Response): Promise<FileResponse> {
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

  getAll(bookId: number, userId: number): Promise<FileResponse> {
    let url_ = this.baseUrl + "/api/Bookmarks/{bookId}/user/{userId}";
    if (bookId === undefined || bookId === null)
      throw new globalThis.Error("The parameter 'bookId' must be defined.");
    url_ = url_.replace("{bookId}", encodeURIComponent("" + bookId));
    if (userId === undefined || userId === null)
      throw new globalThis.Error("The parameter 'userId' must be defined.");
    url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/octet-stream",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processGetAll(_response);
    });
  }

  protected processGetAll(response: Response): Promise<FileResponse> {
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
}

export const bookmarksClient = new BookmarksClient(
  process.env.EXPO_PUBLIC_BASE_DEV_URL
);
