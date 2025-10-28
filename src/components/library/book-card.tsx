import { Book } from "@/src/types/types";
import { Heart } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useBookCardStyles } from "@/src/styles/bookCardStyles";

interface BookCardProps {
  bookInfo: Book;
  onPress?: () => void;
}

export function BookCard({ bookInfo, onPress }: BookCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { width } = useWindowDimensions();
  const numColumns = width < 500 ? 2 : 4;
  const cardWidth = width / numColumns - 24;
  const styles = useBookCardStyles();
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          width: cardWidth,
          aspectRatio: 2 / 3,
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 8,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
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
            color={isFavorite ? "#D32F2F" : "#666"}
            fill={isFavorite ? "#D32F2F" : "none"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <Text style={styles.bookTitle}>{bookInfo.title}</Text>
      <Text style={styles.bookAuthor}>{bookInfo.author}</Text>
    </View>
  );
}
