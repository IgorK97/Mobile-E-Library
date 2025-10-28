import { StyleSheet } from "react-native";
import { useThemeColor } from "@/src/hooks/use-theme-color";

export const useProfileStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 10,
      backgroundColor: useThemeColor({}, "background"),
    },
    scrollContainer: {
      paddingBottom: 50,
      width: "100%",
      maxWidth: 480,
    },
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 16,
      paddingVertical: 20,
      borderBottomWidth: 1,
      backgroundColor: useThemeColor({}, "iconBackground"),
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    section: {
      paddingVertical: 16,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
    },
    modalContent: {
      flex: 1,
      paddingTop: 60,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    closeButton: {
      padding: 8,
    },

    placeholder: {
      width: 40,
    },
    scrollForm: {
      flex: 1,
      marginTop: 60,
    },
    avatarSection: {
      alignItems: "center",
      paddingVertical: 24,
      borderBottomWidth: 1,
    },
    avatarContainer: {
      position: "relative",
      marginBottom: 12,
    },
    modalAvatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    placeholderAvatar: {
      justifyContent: "center",
      alignItems: "center",
    },
    avatarEditButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: useThemeColor({}, "buttonBorder"),
      backgroundColor: useThemeColor({}, "buttonBackground"),
    },
    form: {
      padding: 16,
    },
    inputGroup: {
      marginBottom: 24,
    },
    label: {
      fontSize: 16,
      fontWeight: "500",
      color: "#374151",
      marginBottom: 8,
    },
    textInput: {
      borderWidth: 1,
      borderColor: "#d1d5db",
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: "#fff",
    },
    textArea: {
      height: 100,
      textAlignVertical: "top",
    },
    bottomActions: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: "#e5e7eb",
      backgroundColor: "#fff",
    },
    saveButtonBottom: {
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      borderColor: useThemeColor({}, "buttonBorder"),
      backgroundColor: useThemeColor({}, "buttonBackground"),
    },
  });
};
