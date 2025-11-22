import { BookCard } from "@/src/entities/books";
import { selectionsClient } from "@/src/shared/api/selectionsApi";
import { commonStyles } from "@/src/shared/lib/constants/common";
import { Colors } from "@/src/shared/lib/constants/theme";
import { useSelectionData } from "@/src/shared/lib/hooks/use-selections";
import { BookListItem, PagedResult } from "@/src/shared/types/types";
import { AntDesign } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
  Text,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SelectionDataState {
  books: BookListItem[];
  isLoading: boolean;
  lastId: number | null;
  error: string | null;
  hasNext: boolean;
}

interface SelectionListViewProps {
  selectionId: number;
  title: string;
  onGoBack: () => void;
  onNavigateToBook: (id: number) => void;

  setCurrentBook: (book: BookListItem) => void;
}

const PAGE_SIZE = 10;

export const SelectionListView = ({
  selectionId,
  title,
  onGoBack,
  onNavigateToBook,
  setCurrentBook,
}: SelectionListViewProps) => {
  const { width } = useWindowDimensions();
  const color = useColorScheme();
  const numColumns = 2;
  const cardWidth = width / numColumns - 24;

  const initialDataState: SelectionDataState = {
    books: [],
    isLoading: true,
    error: null,
    hasNext: true,
    lastId: null,
  };

  const [booksCollectionState, setBooksCollectionState] =
    useState<SelectionDataState>(initialDataState);

  const { books, isLoading, error, hasNext, lastId } = booksCollectionState;

  const fetchData = useCallback(
    async (selectionId: number) => {
      if (!hasNext) return;

      setBooksCollectionState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        const result: PagedResult<BookListItem> =
          await selectionsClient.getBooks(selectionId, lastId, PAGE_SIZE);
        setBooksCollectionState((prev) => ({
          ...prev,
          books: [...prev.books, ...result.items],
          isLoading: false,
          error: null,
          hasNext: result.hasNext,
          lastId: result.lastId,
        }));
      } catch (e) {
        console.error(`Ошибка загрузки подборки ${selectionId}:`, e);
        setBooksCollectionState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Не удалось загрузить подборку",
        }));
      }
    },
    [hasNext, lastId]
  );

  const fetchNext = () => {
    // Проверяем, что не загружается и есть следующая страница
    if (!isLoading && hasNext) {
      fetchData(selectionId);
    }
  };

  const renderFooter = () => {
    if (!isLoading) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const navigateToBookHandler = (book: BookListItem) => {
    setCurrentBook(book);
    onNavigateToBook(book.id);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          color === "light" ? Colors.light.background : Colors.dark.background,
      }}
    >
      {/* Пользовательский заголовок с кнопкой "Назад" */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity onPress={onGoBack} style={{ paddingRight: 10 }}>
          {/* <AntDesign name="arrowleft" size={24} color={Colors[color].text} /> */}
          <Text>{"<"}</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            flex: 1,
          }}
        >
          {title}
        </Text>
      </View>

      {error && (
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      )}

      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={commonStyles.grid}
        columnWrapperStyle={commonStyles.gridRow}
        renderItem={({ item }) => (
          <View style={{ width: cardWidth }}>
            <BookCard
              bookInfo={item}
              onPress={() => navigateToBookHandler(item)}
            />
          </View>
        )}
        onEndReached={hasNext ? fetchNext : null}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};
