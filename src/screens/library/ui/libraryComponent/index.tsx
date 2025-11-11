import { BookCard } from "@/src/entities/books";
import { SectionHeader } from "./../sectionHeader";
import { Book } from "@/src/shared/types/types";
// import { useRouter } from "expo-router";
import { FlatList, ScrollView, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "@/src/shared/i18n";
import { commonStyles } from "@/src/shared/lib/constants/common";
import { useColorScheme } from "@/src/shared/lib/hooks/use-color-scheme";
import { Colors } from "@/src/shared/lib/constants/theme";
import { useStore } from "@/src/shared/lib/store/globalStore";
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
    imageUrl: require("@assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
    imageBase64: "",
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
    imageUrl: require("@assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
    imageBase64: "",
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
    imageUrl: require("@assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
    imageBase64: "",
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
    imageUrl: require("@assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
    imageBase64: "",
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
    imageUrl: require("@assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
    imageBase64: "",
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
    imageUrl: require("@assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
    imageBase64: "",
  },
];

interface LibraryProps {
  onNavigateToBook: (id: number) => void;
}

export const Library = ({ onNavigateToBook }: LibraryProps) => {
  // const router = useRouter();
  const { width } = useWindowDimensions();
  const numColumns = 2;
  const cardWidth = width / numColumns - 24;
  const color = useColorScheme();
  const { setCurrentBook } = useStore();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          color === "light" ? Colors.light.background : Colors.dark.background,
      }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <SectionHeader title="История культуры" />
        <FlatList
          data={books1}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={commonStyles.grid}
          columnWrapperStyle={commonStyles.gridRow}
          renderItem={({ item }) => (
            <View style={{ width: cardWidth }}>
              <BookCard
                bookInfo={item}
                key={item.id}
                onPress={() => {
                  setCurrentBook(item);
                  onNavigateToBook(item.id);
                }}
              />
            </View>
          )}
        />

        <SectionHeader title="Экономическая история" />
        <FlatList
          data={books2}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={commonStyles.grid}
          columnWrapperStyle={commonStyles.gridRow}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={{ width: cardWidth }}>
              <BookCard
                bookInfo={item}
                key={item.id}
                onPress={() => {
                  setCurrentBook(item);
                  onNavigateToBook(item.id);
                }}
              />
            </View>
          )}
        />

        <SectionHeader title="История мира" />
        <FlatList
          data={books3}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={commonStyles.grid}
          columnWrapperStyle={commonStyles.gridRow}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={{ width: cardWidth }}>
              <BookCard
                bookInfo={item}
                key={item.id}
                onPress={() => {
                  setCurrentBook(item);
                  onNavigateToBook(item.id);
                }}
              />
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
