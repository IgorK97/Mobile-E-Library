import { StyleSheet } from "react-native";
import { useThemeColor } from "@/src/shared/hooks/use-theme-color";

export const useMyBooksStyles = () => {
  return StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: useThemeColor({}, "borderBottomColor"),
    },
    headerIcon: {
      width: 32,
      height: 32,
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: useThemeColor({}, "iconBackground"),
    },

    tabsContainer: {
      borderBottomWidth: 1,
      height: 50,
      flexGrow: 0,
      borderBottomColor: useThemeColor({}, "borderBottomColor"),
    },
    tabButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },
    tabButtonSelected: {
      borderBottomColor: useThemeColor({}, "tabButtonSelected"),
    },
  });
};
