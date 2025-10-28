import { StyleSheet } from "react-native";
export const useBookStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      marginLeft: 1,
      marginRight: 5,
    },
    scrollContainer: {
      paddingBottom: 80,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 5,
      marginRight: 5,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    iconButton: {
      padding: 8,
    },
    headerIcons: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    coverContainer: {
      alignItems: "center",
      marginBottom: 24,
      width: 150,
      height: 200,
      justifyContent: "center",
    },
    cover: {
      width: "100%",
      height: "100%",
      borderRadius: 8,
      padding: 16,
    },
    infoContainer: {
      paddingHorizontal: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    textCenter: {
      alignItems: "center",
      marginBottom: 12,
    },
    genresSection: {
      paddingHorizontal: 10,
      marginBottom: 24,
      height: 100,
    },
    genresContainer: {
      paddingBottom: 8,
    },
    genreChip: {
      backgroundColor: "#f8f8f8",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
      borderWidth: 1,
      borderColor: "#e0e0e0",
      height: 40,
    },
    genreText: {
      fontSize: 14,
      color: "#555",
      fontWeight: "500",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 12,
      color: "#333",
    },
    reviewsButton: {
      backgroundColor: "#f8f8f8",
      marginHorizontal: 20,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      marginBottom: 24,
      borderWidth: 1,
      borderColor: "#e0e0e0",
    },
    reviewsButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#D32F2F",
    },
    author: {
      fontSize: 13,
      color: "#6B7280",
      marginBottom: 4,
    },
    title: {
      fontSize: 20,
      fontWeight: "500",
      color: "#000",
    },
    ratingRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      marginBottom: 4,
    },
    ratingItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    ratingText: {
      fontSize: 14,
      color: "#800",
    },
    reviewText: {
      fontSize: 14,
      color: "#6B7280",
      alignItems: "center",
      justifyContent: "center",
    },
    metaText: {
      textAlign: "center",
      fontSize: 13,
      color: "#6B7280",
      marginBottom: 16,
    },
    readButton: {
      backgroundColor: "#D32F2F",
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: "center",
      marginBottom: 24,
      width: 120,
      justifyContent: "center",
    },
    readButtonText: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "500",
    },
    aboutSection: {
      marginBottom: 24,
      paddingHorizontal: 10,
    },
    aboutTitle: {
      fontSize: 18,
      marginBottom: 8,
      color: "#000",
      fontWeight: "500",
    },
    aboutText: {
      fontSize: 13,
      color: "#374151",
      lineHeight: 18,
    },
  });
};
