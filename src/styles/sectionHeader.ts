import { StyleSheet } from "react-native";

export const useSectionHeaderStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    title: {
      color: "#D32F2F",
      fontSize: 18,
      fontWeight: "600",
    },
    buttonText: {
      color: "#D32F2F",
      fontSize: 14,
    },
  });
};
