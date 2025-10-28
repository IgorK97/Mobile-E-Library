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
    hightlightedText: baseAppColor,
    background: baseBackgroundColor,
    containerBackground: baseBackgroundColor,
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    tabButtonSelected: baseAppColor,
    borderBottomColor: "#E0E0E0",
    iconBackground: baseAppColor,
    headerTitleColor: "#000",
    tabTextColor: "#666",
    tabTextSelectedColor: baseAppColor,
    userIcon: "#A855F7",
    chevronRight: "#9CA3AF",
    avatarPlaceholder: "#F3E8FF",
    buttonBackground: baseAppColor,
    buttonBorder: "#fff",
    label: "#555",
    errorColor: errorColor,
  },
  dark: {
    text: "#ECEDEE",
    subText: "#6B7280",
    hightlightedText: baseAppColor,
    background: "#151718",
    containerBackground: baseBackgroundColor,

    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    borderBottomColor: "#E0E0E0",
    iconBackground: baseBackgroundColor,
    tabTextSelectedColor: baseAppColor,
    headerTitleColor: "#fff",
    tabButtonSelected: "#fff",
    tabTextColor: "#fff",
    userIcon: "#A855F7",
    chevronRight: "#9CA3AF",
    avatarPlaceholder: "#F3E8FF",
    buttonBackground: baseAppColor,
    buttonBorder: "#fff",
    label: "#555",
    errorColor: errorColor,
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
