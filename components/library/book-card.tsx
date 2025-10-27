import { Book } from "@/types/types";
import { Heart } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

interface BookCardProps {
  bookInfo: Book;
  onPress?: () => void;
}

export function BookCard({ bookInfo, onPress }: BookCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { width } = useWindowDimensions();
  const numColumns = width < 500 ? 2 : 4;
  const cardWidth = width / numColumns - 24;
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

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginTop: 2,
    marginBottom: 2,
  },
  coverContainer: {
    aspectRatio: 2 / 3,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  coverInner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: "100%",
    borderRadius: 8,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  bookTitle: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 2,
    marginTop: 2,
  },
  bookAuthor: {
    fontSize: 11,
    color: "gray",
    marginTop: 2,
    marginBottom: 2,
  },
});
