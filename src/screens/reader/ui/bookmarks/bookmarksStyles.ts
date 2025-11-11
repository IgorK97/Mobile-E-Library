import { StyleSheet } from "react-native";

export const useBookmarksStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: "center",
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: 20,
    },
    bookmarkContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 10,
    },
    bookmarkInfo: {
      flexDirection: "row",
    },
    bookmarkInfoText: {
      width: "80%",
    },
    title: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    bookmarkIcon: {
      justifyContent: "center",
      alignItems: "center",
    },
    bookmarkLocationNumber: {
      marginTop: -12,
    },
    input: {
      width: "100%",
      height: 64,
      marginTop: 8,
      borderRadius: 10,
      fontSize: 16,
      lineHeight: 20,
      padding: 8,
      backgroundColor: "rgba(151, 151, 151, 0.25)",
    },
  });
};
