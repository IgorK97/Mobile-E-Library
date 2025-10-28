import { Book } from "@/src/types/types";
import { useRouter } from "expo-router";
import { ArrowLeft, Bookmark, Heart } from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import "@/src/i18n";
import { useBookStyles } from "@/src/styles/bookStyles";

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
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const styles = useBookStyles();
  const reaction = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => console.log("tutu"));
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={reaction}>
        <View style={styles.container}>
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
            <View style={styles.coverContainer}>
              <Image
                source={books[0].imageUrl}
                style={styles.cover}
                resizeMode="contain"
              />
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.textCenter}>
                <Text style={styles.author}>{books[0].author}</Text>
                <Text style={styles.title}>{books[0].title}</Text>
              </View>
              <Text style={styles.reviewText}>
                {books[0].reviewCount} {t("book.review_count")}
              </Text>
            </View>
            <Text style={styles.metaText}>
              {books[0].pages} {t("book.p")} | {books[0].year}
            </Text>

            <TouchableOpacity style={styles.readButton}>
              <Text
                onPress={() => router.push(`/book/reader`)}
                style={styles.readButtonText}
              >
                {t("book.read")}
              </Text>
            </TouchableOpacity>
            <View style={styles.aboutSection}>
              <Text style={styles.aboutTitle}>{t("book.about")}</Text>
              <Text style={styles.aboutText}>{books[0].description}</Text>
            </View>
            <View style={styles.genresSection}>
              <Text style={styles.sectionTitle}>{t("book.genres")}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.genresContainer}
              >
                {books[0].genres?.map((genre, index) => (
                  <TouchableOpacity key={index} style={styles.genreChip}>
                    <Text style={styles.genreText}>{genre}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity
              style={styles.reviewsButton}
              onPress={() => {
                router.push(`/book/reviews`);
              }}
            >
              <Text style={styles.reviewsButtonText}>
                {t("book.view_all_reviews")}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
