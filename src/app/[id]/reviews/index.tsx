import "@/src/shared/i18n";
import { Reviews } from "@/src/screens/reviews";
import { router } from "expo-router";

export default function ReviewsScreen() {
  const handleNavigate = () => {
    router.back();
  };
  return <Reviews onNavigate={handleNavigate} />;
}
