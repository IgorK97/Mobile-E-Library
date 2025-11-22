import { throwException } from "../lib/utils/throwing-exception";
import {
  CreateReviewCommand,
  FileResponse,
  RateReviewCommand,
} from "../types/types";

export class ReviewsClient {
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

  getReviews(
    bookId: number,
    lastId: number | null | undefined,
    limit: number | undefined
  ): Promise<FileResponse> {
    let url_ = this.baseUrl + "/api/Reviews/{bookId}?";
    if (bookId === undefined || bookId === null)
      throw new globalThis.Error("The parameter 'bookId' must be defined.");
    url_ = url_.replace("{bookId}", encodeURIComponent("" + bookId));
    if (lastId !== undefined && lastId !== null)
      url_ += "lastId=" + encodeURIComponent("" + lastId) + "&";
    if (limit === null)
      throw new globalThis.Error("The parameter 'limit' cannot be null.");
    else if (limit !== undefined)
      url_ += "limit=" + encodeURIComponent("" + limit) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/octet-stream",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processGetReviews(_response);
    });
  }

  protected processGetReviews(response: Response): Promise<FileResponse> {
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

  createReview(command: CreateReviewCommand): Promise<FileResponse> {
    let url_ = this.baseUrl + "/api/Reviews";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(command);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/octet-stream",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processCreateReview(_response);
    });
  }

  protected processCreateReview(response: Response): Promise<FileResponse> {
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

  rateReview(request: RateReviewCommand): Promise<FileResponse> {
    let url_ = this.baseUrl + "/api/Reviews/rate";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(request);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/octet-stream",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processRateReview(_response);
    });
  }

  protected processRateReview(response: Response): Promise<FileResponse> {
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

export const reviewsClient = new ReviewsClient(
  process.env.EXPO_PUBLIC_BASE_DEV_URL
);
