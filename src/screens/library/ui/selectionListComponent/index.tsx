import { BookCard } from "@/src/entities/books";
import { commonStyles } from "@/src/shared/lib/constants/common";
import { Colors } from "@/src/shared/lib/constants/theme";
import { useSelectionData } from "@/src/shared/lib/hooks/use-selections";
import { BookListItem } from "@/src/shared/types/types";
import { AntDesign } from "@expo/vector-icons";
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

interface SelectionListViewProps {
  selectionId: number;
  title: string;
  onGoBack: () => void;
  onNavigateToBook: (id: number) => void;

  setCurrentBook: (book: BookListItem) => void;
}

export const SelectionListView = ({
  selectionId,
  title,
  onGoBack,
  onNavigateToBook,
  setCurrentBook,
}: SelectionListViewProps) => {
  const { books, isLoading, hasNext, error, fetchNext } = useSelectionData(
    selectionId,
    20
  );

  const { width } = useWindowDimensions();
  const color = useColorScheme();
  const numColumns = 2;
  const cardWidth = width / numColumns - 24;

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
