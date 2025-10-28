import { StyleSheet } from "react-native";
import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { useThemeColor } from "@/src/hooks/use-theme-color";

export const useReviewStyles = () => {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f2f2f2", paddingVertical: 10 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    backButton: { marginRight: 10 },
    headerTitle: { fontSize: 20, fontWeight: "bold" },
    sortBar: {
      backgroundColor: "#fff",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    sortButton: { flexDirection: "row", alignItems: "center", gap: 5 },
    sortText: { fontSize: 14 },
    reviewList: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      paddingBottom: 80,
    },
    addButton: {
      backgroundColor: "#D32F2F",
      borderRadius: 30,
      position: "absolute",
      bottom: 30,
      left: "10%",
      right: "10%",
      alignItems: "center",
      paddingVertical: 12,
      elevation: 3,
    },
    addButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "flex-end",
    },
    modalContainer: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      minHeight: "50%",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalTitle: { fontSize: 18, fontWeight: "600" },
    ratingRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 12,
      minHeight: 100,
      textAlignVertical: "top",
      fontSize: 15,
      color: "#333",
    },
    sendButton: {
      backgroundColor: "#D32F2F",
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: "center",
      marginTop: 20,
    },
    sendButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  });
};
