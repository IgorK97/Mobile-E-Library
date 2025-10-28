import { BookCard } from "@/src/components/library/book-card";
import { Book } from "@/src/types/types";
import { router } from "expo-router";
import { BookOpen } from "lucide-react-native";
import { useState } from "react";
import "@/src/i18n";

import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { commonStyles } from "@/src/styles/common";
import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme";
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

export default function MyBooks() {
  const [activaTab, setActiveTab] = useState("favorites");
  const { width } = useWindowDimensions();
  const numColumns = width < 500 ? 2 : 4;
  const cardWidth = width / numColumns - 24;
  const tabs = [
    { id: "favorites", label: "Избранное" },
    { id: "downloaded", label: "Загруженные" },
    { id: "reading", label: "Читаю сейчас" },
    { id: "read", label: "Прочитанные" },
  ];
  const color = useColorScheme();
  return (
    <View
      style={{
        ...commonStyles.defaultContainer,
        backgroundColor:
          color === "light" ? Colors.light.background : Colors.dark.background,
      }}
    >
      <View
        style={{
          ...styles.header,
          borderBottomColor:
            color === "light"
              ? Colors.light.borderBottomColor
              : Colors.dark.borderBottomColor,
        }}
      >
        <View
          style={{
            ...styles.headerIcon,
            backgroundColor:
              color === "light"
                ? Colors.light.headerIcon.backgroundColor
                : Colors.dark.headerIcon.backgroundColor,
          }}
        >
          <BookOpen
            size={20}
            color={
              color === "light"
                ? Colors.light.background
                : Colors.dark.background
            }
          />
        </View>
        <Text
          style={{
            ...styles.headerTitle,
            color:
              color === "light"
                ? Colors.light.headerTitle.color
                : Colors.dark.headerTitle.color,
          }}
        >
          Мои книги
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          ...styles.tabsContainer,
          borderBottomColor:
            color === "light"
              ? Colors.light.borderBottomColor
              : Colors.dark.borderBottomColor,
        }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activaTab === tab.id && {
                borderBottomColor:
                  color === "light"
                    ? Colors.light.tabButtonSelected
                    : Colors.dark.background,
              },
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                activaTab === tab.id && {
                  color:
                    color === "light"
                      ? Colors.light.tabTextSelected.color
                      : Colors.dark.tabText.color,
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={commonStyles.grid}
        columnWrapperStyle={commonStyles.gridRow}
        style={{ gap: 5, marginBottom: 5 }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 8,
  },
  tabsContainer: {
    borderBottomWidth: 1,
    height: 50,
    flexGrow: 0,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 14,
  },
});
