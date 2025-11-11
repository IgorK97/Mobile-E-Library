import "@/src/shared/i18n";
import { MyBooks } from "@/src/screens/mybooks";
import { navigateToBook } from "@/src/shared/lib/utils/navigation-utils";

export default function MyBooksScreen() {
  return <MyBooks onNavigateToBook={navigateToBook} />;
}
