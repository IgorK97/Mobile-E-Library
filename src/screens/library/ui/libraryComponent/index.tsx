import { BookCard } from "@/src/entities/books";
import { SectionHeader } from "./../sectionHeader";
import { BookListItem, PagedResult } from "@/src/shared/types/types";
import { selectionsClient } from "@/src/shared/api/selectionsApi";
// import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Text,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "@/src/shared/i18n";
import { commonStyles } from "@/src/shared/lib/constants/common";
import { useColorScheme } from "@/src/shared/lib/hooks/use-color-scheme";
import { Colors } from "@/src/shared/lib/constants/theme";
import { useStore } from "@/src/shared/lib/store/globalStore";
import { useEffect, useMemo, useState } from "react";

interface SelectionDataState {
  books: BookListItem[];
  isLoading: boolean;
  error: string | null;
}

interface LibraryProps {
  onNavigateToBook: (id: number) => void;
  onNavigateToList: (selectionId: number, title: string) => void;
}

interface ToggleListProps {
  title: string;
  books: BookListItem[];
  onNavigateToBook: (id: number) => void;
  onViewAll: () => void;
  cardWidth: number;
  numColumns: number;
}

const SelectionSection = ({
  title,
  books,
  onNavigateToBook,
  onViewAll,
  cardWidth,
  numColumns,
}: ToggleListProps) => {
  const displayBooks = books.slice(0, 6);
  if (displayBooks.length === 0) {
    return null;
  }
  return (
    <View>
      <SectionHeader title={title} onPress={onViewAll} />
      <FlatList
        data={displayBooks}
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
              onPress={() => onNavigateToBook(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
};

export const Library = ({
  onNavigateToBook,
  onNavigateToList,
}: LibraryProps) => {
  // const router = useRouter();
  const { width } = useWindowDimensions();
  const numColumns = 2;
  const cardWidth = width / numColumns - 24;
  const color = useColorScheme();
  const { setCurrentBook } = useStore();

  const selectionIds = useMemo(() => [1, 2, 3], []);

  const initialDataState: SelectionDataState = {
    books: [],
    isLoading: true,
    error: null,
  };

  const [historyCultureState, setHistoryCultureState] =
    useState<SelectionDataState>(initialDataState);
  const [historyEconomicsState, setHistoryEconomicsState] =
    useState<SelectionDataState>(initialDataState);
  const [worldHistoryState, setWorldHistoryState] =
    useState<SelectionDataState>(initialDataState);

  const selectionStates = useMemo(
    () => [
      { id: selectionIds[0], setState: setHistoryCultureState },
      { id: selectionIds[1], setState: setHistoryEconomicsState },
      { id: selectionIds[2], setState: setWorldHistoryState },
    ],
    [selectionIds]
  );

  useEffect(() => {
    const fetchData = async (
      selectionId: number,
      setState: React.Dispatch<React.SetStateAction<SelectionDataState>>
    ) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        // Вызываем асинхронный метод
        const result: PagedResult<BookListItem> =
          await selectionsClient.getBooks(selectionId, null, 10);
        setState({
          books: result.items, // Предполагаем, что книги лежат в result.books
          isLoading: false,
          error: null,
        });
      } catch (e) {
        console.error(`Ошибка загрузки подборки ${selectionId}:`, e);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Не удалось загрузить подборку",
        }));
      }
    };

    // Запускаем загрузку для каждой подборки
    selectionStates.forEach(({ id, setState }) => fetchData(id, setState));
  }, [selectionStates]); // Зависимости гарантируют, что эффект запустится только один раз

  const navigateToBookHandler = (book: BookListItem) => {
    setCurrentBook(book);
    onNavigateToBook(book.id);
  };

  const dataSections = [
    {
      id: selectionIds[0],
      title: "История культуры",
      data: historyCultureState,
    },
    {
      id: selectionIds[1],
      title: "Экономическая история",
      data: historyEconomicsState,
    },
    { id: selectionIds[2], title: "История мира", data: worldHistoryState },
  ];

  const anyLoading = dataSections.some((section) => section.data.isLoading);
  const allEmpty = dataSections.every(
    (section) => section.data.books.length === 0
  );

  if (anyLoading && allEmpty) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
        <Text>Загрузка подборок...</Text>
      </SafeAreaView>
    );
  }

  const anyError = dataSections.some((section) => section.data.error !== null);
  if (anyError) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: Colors.dark.text }}>
          Произошла ошибка при загрузке данных.
        </Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          color === "light" ? Colors.light.background : Colors.dark.background,
      }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {dataSections.map((section) => (
          <SelectionSection
            key={section.id}
            title={section.title}
            books={section.data.books}
            cardWidth={cardWidth}
            numColumns={numColumns}
            onViewAll={() => onNavigateToList(section.id, section.title)}
            onNavigateToBook={(id) => {
              // Находим полную информацию о книге, чтобы сохранить в стор
              const book = section.data.books.find((b) => b.id === id);
              if (book) {
                navigateToBookHandler(book);
              }
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
