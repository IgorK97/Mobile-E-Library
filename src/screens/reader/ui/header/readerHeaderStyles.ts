import { StyleSheet } from "react-native";

export const useReaderHeaderStyles = () => {
  return StyleSheet.create({
    headerText: {
      flex: 1,
      marginLeft: 12,
    },
    title: {
      fontSize: 15,
      fontWeight: "600",
    },
    author: {
      fontSize: 13,
      color: "#666",
    },
    header: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      paddingTop: 50,
      paddingBottom: 10,
      alignItems: "center",
      zIndex: 10,
      justifyContent: "center",
      flexDirection: "row",
    },
    iconButton: {
      padding: 8,
    },
  });
};
