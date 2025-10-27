import { ImageSourcePropType } from "react-native";
import { Bookmark } from "@epubjs-react-native/core";

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
  genres: string[];
}

export interface DownloadedBook {
  id: string;
  title: string;
  localPath: string;
  downloadedAt: string;
  lastOpenedAt?: string;
  progress?: number;
}
