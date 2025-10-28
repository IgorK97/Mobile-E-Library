import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/src/components/ui/themed-text";
import { ThemedView } from "@/src/components/ui/themed-view";
import "@/src/i18n";
import { useTranslation } from "react-i18next";

export default function ModalScreen() {
  const { t } = useTranslation();
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{t("not_found.title")}</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">{t("not_found.go_home")}</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
