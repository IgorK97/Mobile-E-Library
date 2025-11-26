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
import { BookListByCategory } from "../BookListByCategory";

interface MyBooksProps {
  onNavigateToBook: (id: number) => void;
}

export const MyBooks = ({ onNavigateToBook }: MyBooksProps) => {
  const tabs = [
    { id: 1, label: "Избранное" },
    { id: 2, label: "Загруженные" },
    { id: -1, label: "История чтения" },
    { id: 0, label: "Прочитанные" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { width } = useWindowDimensions();
  const numColumns = width < 500 ? 2 : 4;
  const cardWidth = width / numColumns - 24;
  // const tabs = [
  //   { id: "favorites", label: "Избранное" },
  //   { id: "downloaded", label: "Загруженные" },
  //   { id: "reading", label: "История чтения" },
  //   { id: "read", label: "Прочитанные" },
  // ];
  //  const setCurrentBook = useStore((state) => state.setCurrentBook);
  const color = useColorScheme();
  const styles = useMyBooksStyles();
  const typography = useTypography();
  const { t } = useTranslation();
  const { setCurrentBook } = useStore();
  return (
    <View
      style={{
        ...commonStyles.defaultContainer,
        paddingVertical: 30,
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
              activeTab === tab.id && styles.tabButtonSelected,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                typography.tabText,
                activeTab === tab.id && typography.tabTextSelected,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BookListByCategory
        CategoryId={activeTab}
        onNavigateToBook={onNavigateToBook}
        setCurrentBook={setCurrentBook}
      />
    </View>
  );
};
