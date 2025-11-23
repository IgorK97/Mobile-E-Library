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

  // const [booksCollectionState, setBooksCollectionState] =
  //   useState<SelectionDataState>(initialDataState);

  // const { books, isLoading, error, hasNext, lastId } = booksCollectionState;

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

  // 1. Оборачиваем fetchData в useCallback
  // const fetchData = useCallback(async () => {
  //   // Вся логика проверки 'hasNext' и 'isLoading' должна быть в начале
  //   if (!hasNext || isLoading) {
  //     // Это предотвратит лишние запросы во время загрузки или если нет больше страниц
  //     return;
  //   }

  //   setBooksCollectionState((prev) => ({
  //     ...prev,
  //     // Устанавливаем isLoading в true только если hasNext = true
  //     // и мы не в процессе загрузки (проверено выше).
  //     isLoading: true,
  //     error: null,
  //   }));

  //   try {
  //     const result: PagedResult<BookListItem> = await selectionsClient.getBooks(
  //       selectionId,
  //       lastId, // Используем lastId из замыкания
  //       PAGE_SIZE
  //     );

  //     setBooksCollectionState((prev) => ({
  //       ...prev,
  //       books: [...prev.books, ...result.items],
  //       isLoading: false,
  //       error: null,
  //       hasNext: result.hasNext,
  //       lastId: result.lastId, // Обновляем lastId для следующего запроса
  //     }));
  //   } catch (e) {
  //     console.error(`Ошибка загрузки подборки ${selectionId}:`, e);
  //     setBooksCollectionState((prev) => ({
  //       ...prev,
  //       isLoading: false,
  //       error: "Не удалось загрузить подборку",
  //     }));
  //   }
  // }, [hasNext, lastId, selectionId, isLoading]); // Включаем все используемые состояния/пропсы

  // 2. Используем fetchData в useEffect для первичной загрузки
  // useEffect(() => {
  //   // При смене selectionId сбрасываем состояние
  //   setBooksCollectionState(initialDataState);

  //   // Вызываем первую загрузку.
  //   // Поскольку initialDataState устанавливает hasNext: true и isLoading: true,
  //   // нам нужно либо вызвать fetchData напрямую, либо убедиться,
  //   // что он сработает, несмотря на isLoading: true

  //   // **ВАЖНО:** Если initialDataState устанавливает isLoading: true,
  //   // а fetchData проверяет `if (!hasNext || isLoading) return;`, то первая загрузка не произойдет.
  //   // Изменим логику: первичный вызов должен игнорировать isLoading.

  //   // Мы можем создать отдельную функцию для начальной загрузки или
  //   // изменить initialDataState, чтобы isLoading был false,
  //   // а fetchData вызывался сразу. Но проще всего запустить загрузку здесь.

  //   // Запускаем загрузку, используя только что установленный initialDataState
  //   // ВАЖНО: fetchData, вызванная здесь, замкнет старые (initial) значения состояния.
  //   // Для первой загрузки можно использовать отдельный асинхронный блок.
  //   const initialFetch = async () => {
  //     try {
  //       const result: PagedResult<BookListItem> =
  //         await selectionsClient.getBooks(
  //           selectionId,
  //           null, // lastId для первого запроса всегда null
  //           PAGE_SIZE
  //         );

  //       setBooksCollectionState({
  //         books: result.items,
  //         isLoading: false,
  //         error: null,
  //         hasNext: result.hasNext,
  //         lastId: result.lastId,
  //       });
  //     } catch (e) {
  //       console.error(`Ошибка первичной загрузки подборки ${selectionId}:`, e);
  //       setBooksCollectionState((prev) => ({
  //         ...prev,
  //         isLoading: false,
  //         error: "Не удалось загрузить подборку при инициализации",
  //       }));
  //     }
  //   };

  //   initialFetch();
  // }, [selectionId]);

  // 3. Упрощаем fetchNext
  // const fetchNext = () => {
  //   fetchData(); // fetchData сам проверяет hasNext и isLoading
  // };

  useEffect(() => {
    fetchBooks(selectionId, null, PAGE_SIZE);
  }, []);

  const renderFooter = () => {
    // ... (без изменений)
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
          )} // Оборачиваем renderItem в useCallback
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refresh(selectionId, PAGE_SIZE)}
            />
          }
          onEndReached={() => loadMore(selectionId, PAGE_SIZE)} // Вызываем fetchNext безусловно
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
  );
};
