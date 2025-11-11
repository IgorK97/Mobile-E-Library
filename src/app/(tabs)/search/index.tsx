import "@/src/shared/i18n";
import { Search } from "@/src/screens/search";
import { navigateToBook } from "@/src/shared/lib/utils/navigation-utils";

export default function SearchScreen() {
  return <Search onNavigateToBook={navigateToBook} />;
}
