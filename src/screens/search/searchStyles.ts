import { StyleSheet } from "react-native";
import { useThemeColor } from "@/src/shared/hooks/use-theme-color";
export const useSearchStyles = () => {
  return StyleSheet.create({
    container: { paddingHorizontal: 20, paddingVertical: 10 },
    searchBar: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginTop: 10,
      marginBottom: 8,
      backgroundColor: useThemeColor({}, "containerBackground"),
      borderColor: useThemeColor(
        { light: "#ddd", dark: "#ddd" },
        "borderBottomColor"
      ),
      color: useThemeColor({}, "text"),
    },
    searchInput: { flex: 1, height: 40 },
    button: {
      padding: 12,
      borderRadius: 10,
      alignItems: "center",
      borderColor: useThemeColor({}, "buttonBorder"),
      backgroundColor: useThemeColor({}, "buttonBackground"),
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 20,
      maxHeight: "90%",
      position: "relative",
    },

    scrollArea: { paddingHorizontal: 20, paddingBottom: 10 },
    section: { marginBottom: 20 },

    selectableItem: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginVertical: 4,
    },
    yearRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    yearInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 8,
      textAlign: "center",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderColor: "#eee",
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    footerButton: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 12,
      borderRadius: 8,
    },
    resetButton: { backgroundColor: "#eee", marginRight: 10 },
    applyButton: { backgroundColor: "#D32F2F" },
    closeButton: { position: "absolute", top: 10, right: 20 },
  });
};
