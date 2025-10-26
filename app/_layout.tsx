import { useColorScheme } from "@/hooks/use-color-scheme";
import { ReaderProvider } from "@epubjs-react-native/core";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ReaderProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="reader" options={{ headerShown: false }} /> */}
          <Stack.Screen name="auth/index" options={{ headerShown: false }} />
          <Stack.Screen name="book" options={{ headerShown: false }} />

          <Stack.Screen
            name="+not-found"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ReaderProvider>
  );
}
