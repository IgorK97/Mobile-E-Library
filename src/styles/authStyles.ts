import { StyleSheet } from "react-native";
import { useThemeColor } from "@/src/hooks/use-theme-color";

export const useAuthStyles = () => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingVertical: 40,
    },
    inputContainer: {
      marginBottom: 18,
      backgroundColor: useThemeColor({}, "containerBackground"),
      borderColor: useThemeColor({}, "hightlightedText"),
      color: useThemeColor({}, "text"),
    },
    errorContainer: {
      borderColor: "#D32F2F",
    },

    input: {
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderColor: "#cb8bc4ff",
    },
    button: {
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: "center",
      marginTop: 10,
      borderColor: useThemeColor({}, "buttonBorder"),
      backgroundColor: useThemeColor({}, "buttonBackground"),
    },
    switchButton: { marginTop: 20 },
  });
};
