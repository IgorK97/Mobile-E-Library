import {
  ScrollView,
  useColorScheme,
  useWindowDimensions,
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import usePaginationReadBooks from "./usePagination";
import { Colors } from "@/src/shared/lib/constants/theme";
import { commonStyles } from "@/src/shared/lib/constants/common";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookCard } from "@/src/entities/books";
import { BookListItem } from "@/src/shared/types/types";
import { useEffect } from "react";

interface BookListByCategoryProps {
  CategoryId: number;
  onNavigateToBook: (id: number) => void;
  setCurrentBook: (book: BookListItem) => void;
}

export const BookListByCategory = ({
  CategoryId,
  setCurrentBook,
  onNavigateToBook,
}: BookListByCategoryProps) => {
  const { width } = useWindowDimensions();
  const numColumns = 2;
  const cardWidth = width / numColumns - 24;
  const color = useColorScheme();
  const navigateToBookHandler = (book: BookListItem) => {
    setCurrentBook(book);
    onNavigateToBook(book.id);
  };
  const {
    books,
    refreshing,
    loadingMore,
    refresh,
    loadMoreReadBooks,
    fetchReadBooks,
    hasNext,
    lastId,
    initialLoader,
  } = usePaginationReadBooks();

  useEffect(() => {
    fetchReadBooks(1, null, 10);
  }, []);
  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          color === "light" ? Colors.light.background : Colors.dark.background,
      }}
    >
      {initialLoader ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
      ) : (
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
          )} // Оборачиваем renderItem в useCallback
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refresh(1, 10)}
            />
          }
          onEndReached={() => loadMoreReadBooks(1, 10)} // Вызываем fetchNext безусловно
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
  );
};
