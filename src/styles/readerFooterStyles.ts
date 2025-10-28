import { StyleSheet } from "react-native";

export const useReaderFooterStyles = () => {
  return StyleSheet.create({
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingVertical: 20,
      paddingHorizontal: 16,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
    },
    row: {
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "row",
    },
    slider: { width: "75%", height: 40 },
    themeIcon: {
      width: 24,
      height: 24,
      borderRadius: 32,
      borderWidth: 2,
      marginRight: 10,
    },
    actions: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    currentPercentage: {},
  });
};
