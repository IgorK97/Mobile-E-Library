import "@/src/shared/i18n";
import { ReaderComponent } from "@/src/screens/reader";
import { router } from "expo-router";

export default function ReaderScreen() {
  const handleNavigate = () => {
    router.back();
  };
  return <ReaderComponent onNavigate={handleNavigate} />;
}
