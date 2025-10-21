import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="reader/index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="reader" options={{ headerShown: false }} /> */}
      <Stack.Screen name="reviews/index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="book" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
