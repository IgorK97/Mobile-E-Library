/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform, StyleSheet } from "react-native";
const tintColorLight = "#D32F2F";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    subText: "#6B7280",
    highlightedText: "#D32F2F",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    tabButtonSelected: "#D32F2F",
    borderBottomColor: "#E0E0E0",
    headerIcon: {
      backgroundColor: "#D32F2F",
    },
    headerTitle: {
      color: "#000",
    },
    tabText: {
      color: "#666",
    },
    tabTextSelected: {
      color: "#D32F2F",
    },
    userIcon: "#A855F7",
    chevronRight: "#9CA3AF",
    avatarPlaceholder: "#F3E8FF",
    saveButton: {
      backgroundColor: "#D32F2F",
      borderColor: "#fff",
    },
  },
  dark: {
    text: "#ECEDEE",
    subText: "#6B7280",

    highlightedText: "#D32F2F",

    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    borderBottomColor: "#E0E0E0",
    headerIcon: {
      backgroundColor: "#fff",
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
      backgroundColor: "#D32F2F",
      borderColor: "#fff",
    },
  },
  default: {
    input: {
      backgroundColor: "#fff",
      borderColor: "#ddd",
    },
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
  title: {
    fontFamily: Fonts.sans,
    fontWeight: 700,
    fontSize: FontSizes.lg,
  },
  subtitle: {
    fontFamily: Fonts.sans,
    fontWeight: 500,
    fontSize: FontSizes.md,
  },
  body: {
    fontFamily: Fonts.sans,
    fontWeight: 400,
    fontSize: FontSizes.sm,
  },
  caption: {
    fontFamily: Fonts.sans,
    fontWeight: 400,
    fontSize: FontSizes.xs,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: "#D32F2F",
    marginBottom: 8,
  },
});
