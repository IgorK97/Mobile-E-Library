import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/src/components/ui/haptic-tab";
import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import "@/src/i18n";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      {/* <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      /> */}
      <Tabs.Screen
        name="library/index"
        options={{
          title: "Главное",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: "Поиск",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mybooks/index"
        options={{
          title: "Мои книги",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="bookmark" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Профиль",
          tabBarIcon: ({ color }) => (
            <AntDesign size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
