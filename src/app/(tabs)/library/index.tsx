import "@/src/shared/i18n";
import { Library, SelectionListView } from "@/src/screens/library";
import { navigateToBook } from "@/src/shared/lib/utils/navigation-utils";
import { useState } from "react";
import { useStore } from "@/src/shared/lib/store/globalStore";

interface ActiveListState {
  id: number;
  title: string;
}

export default function LibraryScreen() {
  const [activeSelection, setActiveSelection] =
    useState<ActiveListState | null>(null);

  const navigateToListHandler = (selectionId: number, title: string) => {
    // При переходе на полный список, устанавливаем ID и заголовок
    setActiveSelection({ id: selectionId, title: title });
  };

  // 💡 Функция для возврата к плитке
  const goBackToLibrary = () => {
    setActiveSelection(null);
  };
  const setCurrentBook = useStore((state) => state.setCurrentBook);
  if (activeSelection) {
    return (
      <SelectionListView
        selectionId={activeSelection.id}
        title={activeSelection.title}
        onGoBack={goBackToLibrary}
        onNavigateToBook={navigateToBook}
        // Передаем функцию из стора, чтобы обновить текущую книгу перед навигацией
        setCurrentBook={setCurrentBook}
      />
    );
  }
  return (
    <Library
      onNavigateToBook={navigateToBook}
      onNavigateToList={navigateToListHandler}
    />
  );
}
