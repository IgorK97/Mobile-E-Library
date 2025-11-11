import "@/src/shared/i18n";
import { Auth } from "@/src/screens/auth";
import { router } from "expo-router";

export default function AuthScreen() {
  const handleNavigation = () => {
    router.navigate({
      pathname: "/(tabs)/library",
    });
  };
  return <Auth onNavigate={handleNavigation} />;
}
