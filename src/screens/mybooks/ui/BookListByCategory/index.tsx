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
import { useStore } from "@/src/shared/lib/store/globalStore";

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
  const { user, shelves } = useStore();
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

  // const FAVORITES_ID = shelves?.find(
  //   (shelf) => shelf.shelfType === 1
  // )?.id;
  // const READ_ID= shelves?.find(
  //   (shelf) => shelf.shelfType === 2
  // )?.id;
  const SHELF_ID = shelves?.find((shelf) => shelf.shelfType === CategoryId)?.id;

  useEffect(() => {
    if (!user) return;
    if (CategoryId === -1) finalFetch(user?.userId, 1, null, 10);
    else if (CategoryId !== 0 && SHELF_ID)
      finalFetch(user.userId, SHELF_ID, null, 10);
  }, [CategoryId]);
  const renderFooter = () => {
    if (!readLoadingMore) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };
  if (!user) return;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          color === "light" ? Colors.light.background : Colors.dark.background,
      }}
    >
      {finalInitialLoader ? (
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
          )}
          refreshControl={
            <RefreshControl
              refreshing={readRefreshing}
              onRefresh={() => finalRefresh(user.userId, 1, 10)}
            />
          }
          onEndReached={() => finalLoadMore(user.userId, 1, 10)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
  );
};
