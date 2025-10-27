import { BookCard } from "@/components/library/book-card";
import { SectionHeader } from "@/components/library/section-header";
import { Book } from "@/types/types";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import book1 from "../../../assets/images/book_1.png";
const books1: Book[] = [
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
    imageUrl: book1,
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
    imageUrl: require("../../../assets/images/book_1.png"),
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
const books2 = [
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
    imageUrl: require("../../../assets/images/book_1.png"),
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
    imageUrl: require("../../../assets/images/book_1.png"),
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
const books3 = [
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
    imageUrl: require("../../../assets/images/book_1.png"),
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
    imageUrl: require("../../../assets/images/book_1.png"),
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
export default function HomeScreen() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isReading, setIsReading] = useState(false);
  const router = useRouter();
  const { width } = useWindowDimensions();
  const numColumns = width < 500 ? 2 : 4;
  const cardWidth = width / numColumns - 24;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/*История культуры*/}
        <SectionHeader title="История культуры" />
        <FlatList
          data={books1}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.gridRow}
          renderItem={({ item }) => (
            <View style={{ width: cardWidth }}>
              <BookCard
                bookInfo={item}
                key={item.id}
                onPress={() => router.push("/book")}
              />
            </View>
          )}
        />

        {/* Экономическая история */}
        <SectionHeader title="Экономическая история" />
        <FlatList
          data={books2}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.gridRow}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={{ width: cardWidth }}>
              <BookCard
                bookInfo={item}
                key={item.id}
                onPress={() => router.push("/book")}
              />
            </View>
          )}
        />

        {/* История мира */}
        <SectionHeader title="История мира" />
        <FlatList
          data={books3}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.gridRow}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={{ width: cardWidth }}>
              <BookCard
                bookInfo={item}
                key={item.id}
                onPress={() => router.push("/book")}
              />
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  coverContentCenter: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  buddismLabel: {
    color: "#B8A566",
    fontSize: 10,
    marginBottom: 4,
  },
  buddismTitle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 18,
  },
  antiqueAuthor: {
    color: "#9FAABD",
    fontSize: 18,
    marginBottom: 4,
  },
  antiqueCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#C84545",
    marginBottom: 6,
  },
  antiqueTitle: {
    color: "#9FAABD",
    fontSize: 10,
    textAlign: "center",
    lineHeight: 12,
  },
  economyAuthor: {
    color: "#8B7355",
    fontSize: 9,
  },
  grid: {
    padding: 16,
    paddingBottom: 80,
  },
  gridRow: {
    justifyContent: "space-between",
  },
  economyTitle: {
    color: "#6B5540",
    fontSize: 11,
    textAlign: "center",
  },
  economySubtitle: {
    color: "#8B7355",
    fontSize: 8,
    marginTop: 4,
  },
  structTitle: {
    color: "#B8A890",
    fontSize: 9,
    textAlign: "center",
  },
  structSubtitle: {
    color: "#8B7A65",
    fontSize: 8,
    textAlign: "center",
  },
  worldTitle: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  worldSubtitle: {
    color: "#D4B896",
    fontSize: 8,
    textAlign: "center",
  },
  worldTitle2: {
    color: "#D4B896",
    fontSize: 12,
    textAlign: "center",
  },
  worldSubtitle2: {
    color: "#8B6545",
    fontSize: 9,
    textAlign: "center",
  },
});
