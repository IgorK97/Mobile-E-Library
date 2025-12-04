import { BookCard } from "@/src/entities/books";
import { selectionsClient } from "@/src/shared/api/selectionsApi";
import { commonStyles } from "@/src/shared/lib/constants/common";
import { Colors } from "@/src/shared/lib/constants/theme";
import { BookListItem, PagedResult } from "@/src/shared/types/types";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import usePagination, {
  SelectionDataState,
} from "@/src/screens/library/ui/selectionListComponent/usePagination";
import { Activity } from "lucide-react-native";
import { useStore } from "@/src/shared/lib/store/globalStore";

interface SelectionListViewProps {
  selectionId: number;
  title: string;
  onGoBack: () => void;
  onNavigateToBook: (id: number) => void;
  setCurrentBook: (book: BookListItem) => void;
}

const PAGE_SIZE = 1;

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
  const { user } = useStore();

  const {
    books,
    refreshing,
    loadingMore,
    refresh,
    loadMore,
    fetchBooks,
    hasNext,
    lastId,
    initialLoader,
  } = usePagination();

  useEffect(() => {
    if (!user) return;
    fetchBooks(user.userId, selectionId, null, PAGE_SIZE);
  }, []);

  const renderFooter = () => {
    if (!loadingMore) return null;

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
  if (!user) return;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          color === "light" ? Colors.light.background : Colors.dark.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity onPress={onGoBack} style={{ paddingRight: 10 }}>
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
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refresh(user?.userId, selectionId, PAGE_SIZE)}
            />
          }
          onEndReached={() => loadMore(user.userId, selectionId, PAGE_SIZE)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
  );
};
