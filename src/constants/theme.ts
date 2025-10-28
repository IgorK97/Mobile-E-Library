/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform, StyleSheet } from "react-native";
const tintColorLight = "#D32F2F";
const tintColorDark = "#fff";
const errorColor = "#D32F2F";
const baseAppColor = "#D32F2F";
const baseBackgroundColor = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    subText: "#6B7280",
    highlightedText: baseAppColor,
    background: baseBackgroundColor,
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    tabButtonSelected: baseAppColor,
    borderBottomColor: "#E0E0E0",
    headerIcon: {
      backgroundColor: baseAppColor,
    },
    headerTitle: {
      color: "#000",
    },
    tabText: {
      color: "#666",
    },
    tabTextSelected: {
      color: baseAppColor,
    },
    userIcon: "#A855F7",
    chevronRight: "#9CA3AF",
    avatarPlaceholder: "#F3E8FF",
    saveButton: {
      backgroundColor: baseAppColor,
      borderColor: "#fff",
    },
    label: "#555",
  },
  dark: {
    text: "#ECEDEE",
    subText: "#6B7280",

    highlightedText: baseAppColor,

    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    borderBottomColor: "#E0E0E0",
    headerIcon: {
      backgroundColor: baseBackgroundColor,
    },
    headerTitle: {
      color: "#fff",
    },
    tabButtonSelected: "#fff",
    tabText: {
      color: "#fff",
    },
    userIcon: "#A855F7",
    chevronRight: "#9CA3AF",
    avatarPlaceholder: "#F3E8FF",
    saveButton: {
      backgroundColor: baseAppColor,
      borderColor: "#fff",
    },
    label: "#555",
  },
  default: {
    input: {
      backgroundColor: baseBackgroundColor,
      borderColor: "#ddd",
      color: "#000",
    },
    inputError: { borderColor: "#D32F2F" },
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
};

export const Typography = StyleSheet.create({
  defaultTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  giantTitle: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: baseAppColor,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  tabText: {
    fontSize: FontSizes.sm,
  },
  subTitle: {
    fontSize: FontSizes.md,
    fontWeight: 600,
  },
  errorText: {
    color: errorColor,
    fontSize: 12,
    marginTop: 4,
  },
  inputText: {
    fontSize: 16,
  },
  label: { fontSize: 14, marginBottom: 6 },
  defaultButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
