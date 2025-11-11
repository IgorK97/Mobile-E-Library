import { Themes, Theme } from "@epubjs-react-native/core";

export const MAX_FONT_SIZE = 32;
export const MIN_FONT_SIZE = 8;

// type ThemeKey = "LIGHT" | "DARK" | "SEPIA";

// export const themeKeyMap = new Map<Theme, ThemeKey>([
//   [Themes.LIGHT, "LIGHT"],
//   [Themes.DARK, "DARK"],
//   [Themes.SEPIA, "SEPIA"],
// ]);

export const availableFonts: string[] = [
  "Helvetica",
  "cursive",
  "serif",
  "monospace",
  "Georgia",
  "Times",
];

export const themes = Object.values(Themes);

export const contrast: { [key: string]: string } = {
  "#fff": "#333",
  "#333": "#fff",
  "#e8dcb8": "#333",
};

export const readerThemeColors = {
  LIGHT: {
    background: "rgba(244,244,244,1)",
    text: "rgba(20,20,20,1)",
    accent: "#1E88E5",
  },
  DARK: {
    background: "rgba(26,26,26,1)",
    text: "rgba(255,255,255,1)",
    accent: "#90CAF9",
  },
  SEPIA: {
    background: "rgba(241,232,215,1)",
    text: "rgba(60,40,20,1)",
    accent: "#B38B59",
  },
} as const;

export const resolveTheme = (currTheme: Theme) => {
  if (currTheme === Themes.DARK) return readerThemeColors["DARK"];
  if (currTheme === Themes.SEPIA) return readerThemeColors["SEPIA"];
  return readerThemeColors["LIGHT"];
};
