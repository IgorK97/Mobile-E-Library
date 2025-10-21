import { Book } from "@/scripts/book";
import { useRouter } from "expo-router";
import { ArrowLeft, Bookmark, Heart } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const books: Book[] = [
  {
    id: 1,
    title: "Буддизм в Японии",
    author: "Т.П. Григорьева",
    rating: 4.5,
    reviewCount: 10,
    pages: 704,
    year: 1993,
    description:
      "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
    imageUrl: require("../../assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
  },
  {
    id: 2,
    title: "Буддизм в Японии",
    author: "Т.П. Григорьева",
    rating: 4.5,
    reviewCount: 10,
    pages: 704,
    year: 1993,
    description:
      "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
    imageUrl: require("../../assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
  },
  {
    id: 3,
    title: "Буддизм в Японии",
    author: "Т.П. Григорьева",
    rating: 4.5,
    reviewCount: 10,
    pages: 704,
    year: 1993,
    description:
      "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
    imageUrl: require("../../assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
  },
  {
    id: 4,
    title: "Буддизм в Японии",
    author: "Т.П. Григорьева",
    rating: 4.5,
    reviewCount: 10,
    pages: 704,
    year: 1993,
    description:
      "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
    imageUrl: require("../../assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
  },
  {
    id: 5,
    title: "Буддизм в Японии",
    author: "Т.П. Григорьева",
    rating: 4.5,
    reviewCount: 10,
    pages: 704,
    year: 1993,
    description:
      "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
    imageUrl: require("../../assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
  },
  {
    id: 6,
    title: "Буддизм в Японии",
    author: "Т.П. Григорьева",
    rating: 4.5,
    reviewCount: 10,
    pages: 704,
    year: 1993,
    description:
      "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
    imageUrl: require("../../assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
  },
];
export default function BookDetailsScreen() {
  // const { bookId } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => setIsBookmarked(!isBookmarked)}
            style={styles.iconButton}
          >
            <Bookmark
              size={24}
              color={isBookmarked ? "#D32F2F" : "#000"}
              fill={"none"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            style={styles.iconButton}
          >
            <Heart
              size={24}
              color={isFavorite ? "#D32F2F" : "#000"}
              fill={isFavorite ? "#D32F2F" : "none"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Book Cover and Info Section */}
        <View style={styles.coverContainer}>
          <Image
            source={books[0].imageUrl}
            style={styles.cover}
            resizeMode="contain"
          />
        </View>

        {/* Book Details Section */}
        <View style={styles.infoContainer}>
          <View style={styles.textCenter}>
            <Text style={styles.author}>{books[0].author}</Text>
            <Text style={styles.title}>{books[0].title}</Text>
          </View>
          <Text style={styles.reviewText}>{books[0].reviewCount} отзывов</Text>
        </View>
        {/*Pages & Year*/}
        <Text style={styles.metaText}>
          {books[0].pages} стр. | {books[0].year}
        </Text>

        {/* Read Button */}
        <TouchableOpacity style={styles.readButton}>
          <Text
            onPress={() => router.push(`/book/reader`)}
            style={styles.readButtonText}
          >
            Читать
          </Text>
        </TouchableOpacity>
        {/* About the Book Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>О книге</Text>
          <Text style={styles.aboutText}>{books[0].description}</Text>
        </View>
      </ScrollView>
    </View>

    // <View style={{ flex: 1, padding: 16 }}>
    //   <Text style={{ fontSize: 20 }}>Описание книги {bookId}</Text>
    //   <Text style={{ marginTop: 8 }}>
    //     Здесь будет описание выбранной книги.
    //   </Text>

    //   <Button title="Назад" onPress={() => router.back()} />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginLeft: 1,
    marginRight: 5,
    // justifyContent: "center",
    // alignItems: "center",
  },
  scrollContainer: {
    paddingBottom: 80,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconButton: {
    padding: 8,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  coverContainer: {
    alignItems: "center",
    marginBottom: 24,
    width: 150,
    height: 200,
    justifyContent: "center",
  },
  cover: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 16,
  },
  infoContainer: {
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  textCenter: {
    alignItems: "center",
    marginBottom: 12,
  },
  author: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginBottom: 4,
  },
  ratingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#800",
  },
  reviewText: {
    fontSize: 14,
    color: "#6B7280",
    alignItems: "center",
    justifyContent: "center",
  },
  metaText: {
    textAlign: "center",
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 16,
  },
  readButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 24,
    width: 120,
    justifyContent: "center",
  },
  readButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  aboutSection: {
    marginBottom: 24,
  },
  aboutTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000",
  },
  aboutText: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 18,
  },
});
