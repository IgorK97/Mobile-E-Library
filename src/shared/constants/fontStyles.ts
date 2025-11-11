import { StyleSheet } from "react-native";
import { FontSizes } from "@/src/shared/lib/constants/theme";
import { useThemeColor } from "@/src/shared/lib/hooks/use-theme-color";
export const useTypography = () => {
  return StyleSheet.create({
    defaultTitle: {
      fontSize: 20,
      fontWeight: "600",
      textAlign: "center",
      marginBottom: 10,
    },
    giantTitle: {
      fontSize: 28,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 30,
    },
    headerTitle: {
      fontSize: 18,
      marginLeft: 8,
      color: useThemeColor({}, "headerTitleColor"),
    },
    sectionTitle: {
      fontSize: FontSizes.md,
      fontWeight: "600",
      color: useThemeColor({}, "hightlightedText"),
      marginBottom: 8,
      paddingHorizontal: 16,
    },
    tabText: {
      fontSize: FontSizes.sm,
    },
    tabTextSelected: {
      color: useThemeColor({}, "tabTextSelectedColor"),
    },
    subTitle: {
      fontSize: FontSizes.md,
      fontWeight: 600,
      color: useThemeColor({}, "text"),
    },
    errorText: {
      color: useThemeColor({}, "errorColor"),
      fontSize: 12,
      marginTop: 4,
    },
    inputText: {
      fontSize: 16,
    },
    rowText: {
      fontSize: FontSizes.md,
      color: useThemeColor({}, "text"),
    },
    label: { fontSize: 14, marginBottom: 6 },
    defaultButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  });
};
