import { StyleSheet } from "react-native";

export const useSectionStyles = () => {
  return StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    icon: {
      justifyContent: "center",
      alignItems: "center",
    },
    info: {
      width: "85%",
    },
    chapter: { marginBottom: 2 },
    name: { fontStyle: "italic" },
    highlight: { backgroundColor: "yellow" },
  });
};
