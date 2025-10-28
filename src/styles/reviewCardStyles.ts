import { StyleSheet } from "react-native";

export const useReviewCardStyles = () => {
  return StyleSheet.create({
    card: {
      backgroundColor: "#fff",
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
      marginBottom: 5,
    },
    stars: {
      flexDirection: "row",
      marginBottom: 8,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    author: {
      fontWeight: "500",
      fontSize: 16,
    },
    date: {
      fontSize: 12,
      color: "#6b7280",
    },
    text: {
      fontSize: 14,
      color: "#111827",
      marginBottom: 10,
    },
    actions: {
      flexDirection: "row",
      gap: 20,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 20,
    },
    actionText: {
      marginLeft: 5,
      fontSize: 14,
      color: "#6b7280",
    },
    active: {},
    activeText: {
      color: "#3b82f6",
    },
  });
};
