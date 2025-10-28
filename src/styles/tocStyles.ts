import { StyleSheet } from "react-native";

export const useTocStyles = () => {
  return StyleSheet.create({
    container: {
      width: "100%",
      flex: 1,
      paddingHorizontal: 20,
    },
    title: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    },
    input: {
      width: "100%",
      borderRadius: 10,
      fontSize: 16,
      lineHeight: 20,
      padding: 8,
      backgroundColor: "rgba(151, 151, 151, 0.25)",
    },
  });
};
