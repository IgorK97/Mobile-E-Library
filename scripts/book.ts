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
  genres: string[];
}
