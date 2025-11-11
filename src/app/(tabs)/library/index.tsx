import "@/src/shared/i18n";
import { Library } from "@/src/screens/library";
import { navigateToBook } from "@/src/shared/lib/utils/navigation-utils";

export default function LibraryScreen() {
  return <Library onNavigateToBook={navigateToBook} />;
}
