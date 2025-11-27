import { BookListItem } from "@/src/shared/types/types";
import { Heart } from "lucide-react-native";
import React, { useState } from "react";
import {
  // Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useBookCardStyles } from "@/src/entities/books/ui/book-card/bookCardStyles";
import {
  favColor,
  fillFavColor,
  fillUnfavColor,
  unfavColor,
} from "@/src/shared/lib/constants/theme";
import { shelvesClient } from "@/src/shared/api/shelvesApi";
interface BookCardProps {
  bookInfo: BookListItem;
  onPress: () => void;
}

export const BookCard = ({ bookInfo, onPress }: BookCardProps) => {
  const [isFavorite, setIsFavorite] = useState(bookInfo.isFavorite);
  const { width } = useWindowDimensions();
  const numColumns = width < 500 ? 2 : 4;
  const cardWidth = width / numColumns - 24;
  const styles = useBookCardStyles();
  console.log(`${process.env.EXPO_PUBLIC_BASE_DEV_URL}/${bookInfo.coverUri}`);
  const toggleFavorite = async () => {
    let res = false;

    if (!isFavorite) res = await shelvesClient.addBookToShelf(1, bookInfo.id);
    // Временно захардкодил shelfId
    else res = await shelvesClient.removeBookFromShelf(1, bookInfo.id);

    if (res) setIsFavorite(!isFavorite);
  };
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        // style={[styles.cardImage, { width: cardWidth }]}
        style={{
          width: 100,
          height: 150,
          borderRadius: 8,
        }}
      >
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_BASE_DEV_URL}/${bookInfo.coverUri}`,
          }}
          style={{
            width: 100,
            height: 150,
            borderRadius: 8,
          }}
          // style={styles.image}
          // resizeMode="contain"
        />
        <TouchableOpacity
          onPress={async (e) => {
            e.stopPropagation?.();
            await toggleFavorite();
            // setIsFavorite(!isFavorite);
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
      {/* <Text style={styles.bookAuthor}>{bookInfo.author}</Text> */}
    </View>
  );
};
