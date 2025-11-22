import { BookCard } from "@/src/entities/books";
import { BookListItem } from "@/src/shared/types/types";
// import { router } from "expo-router";
import { BookOpen } from "lucide-react-native";
import { useState } from "react";
import "@/src/shared/i18n";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useMyBooksStyles } from "@/src/screens/mybooks/ui/mybooksComponent/mybooksStyles";
import { useTypography } from "@/src/shared/lib/constants/fontStyles";
import { commonStyles } from "@/src/shared/lib/constants/common";
import { Colors } from "@/src/shared/lib/constants/theme";
import { useColorScheme } from "@/src/shared/lib/hooks/use-color-scheme";
import { useStore } from "@/src/shared/lib/store/globalStore";
// const books: BookListItem[] = [
//   {
//     id: 1,
//     title: "Буддизм в Японии",
//     // author: "Т.П. Григорьева",
//     rating: 4.5,
//     reviewCount: 10,
//     pages: 704,
//     year: 1993,
//     description:
//       "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
//     imageUrl: require("@assets/images/book_1.png"),
//     genres: [
//       "Философия",
//       "Культурология",
//       "Религия",
//       "Буддизм",
//       "Восток",
//       "Япония",
//     ],
//     imageBase64: "",
//   },
//   {
//     id: 2,
//     title: "Буддизм в Японии",
//     author: "Т.П. Григорьева",
//     rating: 4.5,
//     reviewCount: 10,
//     pages: 704,
//     year: 1993,
//     description:
//       "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
//     imageUrl: require("@assets/images/book_1.png"),
//     genres: [
//       "Философия",
//       "Культурология",
//       "Религия",
//       "Буддизм",
//       "Восток",
//       "Япония",
//     ],
//     imageBase64: "",
//   },
//   {
//     id: 3,
//     title: "Буддизм в Японии",
//     author: "Т.П. Григорьева",
//     rating: 4.5,
//     reviewCount: 10,
//     pages: 704,
//     year: 1993,
//     description:
//       "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
//     imageUrl: require("@assets/images/book_1.png"),
//     genres: [
//       "Философия",
//       "Культурология",
//       "Религия",
//       "Буддизм",
//       "Восток",
//       "Япония",
//     ],
//     imageBase64: "",
//   },
//   {
//     id: 4,
//     title: "Буддизм в Японии",
//     author: "Т.П. Григорьева",
//     rating: 4.5,
//     reviewCount: 10,
//     pages: 704,
//     year: 1993,
//     description:
//       "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
//     imageUrl: require("@assets/images/book_1.png"),
//     genres: [
//       "Философия",
//       "Культурология",
//       "Религия",
//       "Буддизм",
//       "Восток",
//       "Япония",
//     ],
//     imageBase64: "",
//   },
//   {
//     id: 5,
//     title: "Буддизм в Японии",
//     author: "Т.П. Григорьева",
//     rating: 4.5,
//     reviewCount: 10,
//     pages: 704,
//     year: 1993,
//     description:
//       "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
//     imageUrl: require("@assets/images/book_1.png"),
//     genres: [
//       "Философия",
//       "Культурология",
//       "Религия",
//       "Буддизм",
//       "Восток",
//       "Япония",
//     ],
//     imageBase64: "",
//   },
//   {
//     id: 6,
//     title: "Буддизм в Японии",
//     author: "Т.П. Григорьева",
//     rating: 4.5,
//     reviewCount: 10,
//     pages: 704,
//     year: 1993,
//     description:
//       "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
//     imageUrl: require("@assets/images/book_1.png"),
//     genres: [
//       "Философия",
//       "Культурология",
//       "Религия",
//       "Буддизм",
//       "Восток",
//       "Япония",
//     ],
//     imageBase64: "",
//   },
// ];

interface MyBooksProps {
  onNavigateToBook: (id: number) => void;
}

export const MyBooks = ({ onNavigateToBook }: MyBooksProps) => {
  const [activaTab, setActiveTab] = useState("favorites");
  const { width } = useWindowDimensions();
  const numColumns = width < 500 ? 2 : 4;
  const cardWidth = width / numColumns - 24;
  const tabs = [
    { id: "favorites", label: "Избранное" },
    { id: "downloaded", label: "Загруженные" },
    { id: "reading", label: "История чтения" },
    { id: "read", label: "Прочитанные" },
  ];
  const color = useColorScheme();
  const styles = useMyBooksStyles();
  const typography = useTypography();
  const { t } = useTranslation();
  const { setCurrentBook } = useStore();
  return (
    <View
      style={{
        ...commonStyles.defaultContainer,
        backgroundColor:
          color === "light" ? Colors.light.background : Colors.dark.background,
      }}
    >
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <BookOpen
            size={20}
            color={
              color === "light"
                ? Colors.light.background
                : Colors.dark.background
            }
          />
        </View>
        <Text style={typography.headerTitle}>{t("mybooks.my_books")}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activaTab === tab.id && styles.tabButtonSelected,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                typography.tabText,
                activaTab === tab.id && typography.tabTextSelected,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* <FlatList
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
              onPress={() =>
                // router.push({ pathname: "/[id]", params: { id: item.id } })
                {
                  setCurrentBook(item);
                  onNavigateToBook(item.id);
                }
              }
            />
          </View>
        )}
      /> */}
    </View>
  );
};
