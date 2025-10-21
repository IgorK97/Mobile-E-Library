import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

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
            // <IconSymbol size={28} name="house.fill" color={color} />
            // <Feather size={28} name="book" color={color} />
            <FontAwesome name="book" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: "Поиск",
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="magnifyingglass" color={color} />
            <Ionicons size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mybooks/index"
        options={{
          title: "Мои книги",
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="books.vertical.fill" color={color} />
            <FontAwesome size={28} name="bookmark" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Профиль",
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="person.fill" color={color} />
            <AntDesign size={28} name="user" color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="book"
        options={{
          href: null,
        }}
      /> */}
      {/* <Tabs.Screen
        name="book/reader/index"
        options={{
          href: null,
          title: "Читалка",
        }}
      />
      <Tabs.Screen
        name="book/reviews/index"
        options={{
          href: null,
          title: "Отзывы",
        }}
      /> */}
    </Tabs>
  );
}
