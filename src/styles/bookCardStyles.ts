import { StyleSheet } from "react-native";

export const useBookCardStyles = () => {
  return StyleSheet.create({
    card: {
      width: "100%",
      marginTop: 2,
      marginBottom: 2,
    },
    coverContainer: {
      aspectRatio: 2 / 3,
      borderRadius: 10,
      overflow: "hidden",
      marginBottom: 8,
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
    },
    coverInner: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    },
    image: {
      width: "100%",
      borderRadius: 8,
    },
    favoriteButton: {
      position: "absolute",
      top: 8,
      right: 8,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "rgba(255,255,255,0.9)",
      justifyContent: "center",
      alignItems: "center",
    },
    bookTitle: {
      fontSize: 13,
      fontWeight: "500",
      marginBottom: 2,
      marginTop: 2,
    },
    bookAuthor: {
      fontSize: 11,
      color: "gray",
      marginTop: 2,
      marginBottom: 2,
    },
  });
};
