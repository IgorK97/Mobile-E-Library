import "@/src/shared/i18n";
import { Search } from "@/src/screens/search";
import { navigateToBook } from "@/src/shared/lib/utils/navigation-utils";
import { useStore } from "@/src/shared/lib/store/globalStore";

export default function SearchScreen() {
  const setCurrentBook = useStore((state) => state.setCurrentBook);
  return (
    <Search onNavigateToBook={navigateToBook} setCurrentBook={setCurrentBook} />
  );
}
