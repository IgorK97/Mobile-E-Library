import "@/src/shared/i18n";
import { Profile } from "@/src/screens/profile";
import { router } from "expo-router";

export default function ProfileScreen() {
  const handleNavigation = () => {
    router.navigate({
      pathname: "/auth",
    });
  };
  return <Profile onNavigate={handleNavigation} />;
}
