import { ImageSourcePropType } from "react-native";

export interface Book {
  id: number;
  title: string;
  author: string;
  rating: number;
  reviewCount: number;
  pages: number;
  year: number;
  description: string;
  imageUrl: ImageSourcePropType;
  imageBase64: string;
  genres: string[];
  fav?: boolean;
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
  books: Book[];
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
