import { throwException } from "../lib/utils/throwing-exception";
import {
  FileResponse,
  LoginUserCommand,
  RegisterUserCommand,
} from "../types/types";

export class UsersClient {
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

  register(request: RegisterUserCommand): Promise<FileResponse> {
    let url_ = this.baseUrl + "/api/Users/register";
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
      return this.processRegister(_response);
    });
  }

  protected processRegister(response: Response): Promise<FileResponse> {
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

  login(request: LoginUserCommand): Promise<FileResponse> {
    let url_ = this.baseUrl + "/api/Users/login";
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
      return this.processLogin(_response);
    });
  }

  protected processLogin(response: Response): Promise<FileResponse> {
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

export const usersClient = new UsersClient(
  process.env.EXPO_PUBLIC_BASE_DEV_URL
);
