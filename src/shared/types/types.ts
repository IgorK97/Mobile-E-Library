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
