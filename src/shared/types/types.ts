import { ImageSourcePropType } from "react-native";

export interface BookListItem {
  id: number;
  title: string;
  coverUri: string | null;
  averageRating: number;
  ratingsCount: number;
  isFavorite: boolean;
  authors: string[];

  // id: number;
  // title: string;
  // author: string;
  // rating: number;
  // reviewCount: number;
  // pages: number;
  // year: number;
  // description: string;
  // imageUrl: ImageSourcePropType;
  // imageBase64: string;
  // genres: string[];
  // fav?: boolean;
}

export interface PersonDetails {
  id: number;
  fullName: string;
}

export interface BookPersonGroupDetails {
  role: number;
  // roleName: string;
  persons: PersonDetails[];
}

export interface RoleDetails {
  id: number;
  name: string;
}

export interface CachedRoles {
  roles: RoleDetails[];
  timestamp: number;
}

export interface ReferenceContextState {
  roles: RoleDetails[];
  isLoading: boolean;
  error: string | null;
}

export interface PublisherDetails {
  id: number;
  name: string;
}

export interface ThemeDeatils {
  id: number;
  name: string;
}

export interface BookDetails {
  id: number;
  title: string;
  year: number | null;
  description: string;
  isbn: string | null;
  averageRating: number;
  ratingsCount: number;
  reviewsCount: number;
  coverUri: string | null;
  isAvailable: boolean;
  isFavorite: boolean;
  isRead: boolean;
  publisher: PublisherDetails | null;
  country: string | null;
  language: string;
  participants: BookPersonGroupDetails[];
  themes: ThemeDeatils[];
}

export interface DownloadedBook {
  id: string;
  title: string;
  localPath: string;
  downloadedAt: string;
  lastOpenedAt?: string;
  progress?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface BooksListResponse {
  books: BookListItem[];
  total: number;
  page: number;
  hasMore: boolean;
}

export interface BooksFilter {
  includedGenres?: number[];
  excludedGenres?: number[];
  page?: number;
  limit?: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  code: number;
}

export interface Genre {
  id: number;
  name: string;
  genres?: Genre[];
}

export interface FileResponse {
  data: Blob;
  status: number;
  fileName?: string;
  headers?: { [name: string]: any };
}

export interface AddBookmarkCommand {
  bookId?: number;
  userId?: number;
  mark?: string;
}

export interface RemoveBookmarkCommand {
  bookmarkId?: number;
}

export class ApiException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

export interface RateReviewCommand {
  reviewId?: number;
  userId?: number;
  score?: number;
}

export interface CreateReviewCommand {
  bookId?: number;
  userId?: number;
  title?: string | undefined;
  description?: string | undefined;
  score?: number;
  userName?: string | undefined;
}

export interface RegisterUserCommand {
  name?: string;
  familyName?: string;
  email?: string;
  password?: string;
}

export interface LoginUserCommand {
  email?: string;
  password?: string;
}

export interface SelectionDetails {
  id: number;
  name: string;
  description: string;
}

export interface PagedResult<T> {
  items: T[];
  limit: number;
  hasNext: boolean;
  lastId: number | null;
}

export interface UpdateReadingProgressCommand {
  userId: number;
  bookId: number;
  readingProgress: number;
}

export interface GetReadBooksQuery {
  UserId: number;
  LastId: number | null;
  Limit: number;
}

export interface BookmarkDetails {
  id: number;
  mark: string;
  createdAt: Date;
}
