import {
  ScrollView,
  useColorScheme,
  useWindowDimensions,
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import usePaginationReadBooks from "./usePaginationReadBooks";
import { Colors } from "@/src/shared/lib/constants/theme";
import { commonStyles } from "@/src/shared/lib/constants/common";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookCard } from "@/src/entities/books";
import { BookListItem } from "@/src/shared/types/types";
import { useEffect } from "react";
import usePaginationShelfBooks from "./usePaginationShelfBooks";

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
  // const {
  //   books,
  //   refreshing,
  //   loadingMore,
  //   refresh,
  //   loadMoreReadBooks,
  //   fetchReadBooks,
  //   hasNext,
  //   lastId,
  //   initialLoader,
  // } = usePaginationReadBooks();

  const {
    books: readBooks,
    refreshing: readRefreshing,
    loadingMore: readLoadingMore,
    refresh: refreshReadBooks,
    loadMoreReadBooks,
    fetchReadBooks,
    hasNext: readHasNext,
    lastId: readLastId,
    initialLoader: readInitialLoader,
  } = usePaginationReadBooks();

  const {
    books: shelfBooks,
    refreshing: shelfRefreshing,
    loadingMore: shelfLoadingMore,
    refresh: refreshShelfBooks,
    loadMoreShelfBooks,
    fetchShelfBooks,
    hasNext: shelfHasNext,
    lastId: shelfLastId,
    initialLoader: shelfInitialLoader,
  } = usePaginationShelfBooks(CategoryId);

  const isReadHistory = CategoryId === -1;

  const finalBooks = isReadHistory ? readBooks : shelfBooks;
  const finalLoadMore = isReadHistory ? loadMoreReadBooks : loadMoreShelfBooks;
  const finalRefresh = isReadHistory ? refreshReadBooks : refreshShelfBooks;
  const finalFetch = isReadHistory ? fetchReadBooks : fetchShelfBooks;
  const finalInitialLoader = isReadHistory
    ? readInitialLoader
    : shelfInitialLoader;
  const finalRefreshing = isReadHistory ? readRefreshing : shelfRefreshing;
  const finalLoadingMore = isReadHistory ? readLoadingMore : shelfLoadingMore;

  useEffect(() => {
    if (CategoryId === -1) finalFetch(1, null, 10);
    else if (CategoryId !== 0) finalFetch(CategoryId, null, 10);
  }, [CategoryId]);
  const renderFooter = () => {
    if (!readLoadingMore) return null;

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
      {readInitialLoader ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
      ) : (
        <FlatList
          data={finalBooks}
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
              refreshing={readRefreshing}
              onRefresh={() => finalRefresh(1, 10)}
            />
          }
          onEndReached={() => finalLoadMore(1, 10)} // Вызываем fetchNext безусловно
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
  );
};
