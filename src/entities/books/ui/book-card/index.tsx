import { Book } from "@/src/shared/types/types";
import { Heart } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useBookCardStyles } from "@/src/entities/books/ui/book-card/bookCardStyles";
import {
  favColor,
  fillFavColor,
  fillUnfavColor,
  unfavColor,
} from "@/src/shared/lib/constants/theme";
interface BookCardProps {
  bookInfo: Book;
  onPress: () => void;
}

export const BookCard = ({ bookInfo, onPress }: BookCardProps) => {
  const [isFavorite, setIsFavorite] = useState(bookInfo.fav || false);
  const { width } = useWindowDimensions();
  const numColumns = width < 500 ? 2 : 4;
  const cardWidth = width / numColumns - 24;
  const styles = useBookCardStyles();
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[styles.cardImage, { width: cardWidth }]}
      >
        <Image
          source={bookInfo.imageUrl}
          style={styles.image}
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation?.();
            setIsFavorite(!isFavorite);
          }}
          style={styles.favoriteButton}
        >
          <Heart
            size={16}
            color={isFavorite ? favColor : unfavColor}
            fill={isFavorite ? fillFavColor : fillUnfavColor}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <Text style={styles.bookTitle}>{bookInfo.title}</Text>
      <Text style={styles.bookAuthor}>{bookInfo.author}</Text>
    </View>
  );
};
