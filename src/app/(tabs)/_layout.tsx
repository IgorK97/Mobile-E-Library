import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/src/shared/ui/haptic-tab";
import { Colors } from "@/src/shared/lib/constants/theme";
import { useColorScheme } from "@/src/shared/lib/hooks/use-color-scheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import "@/src/shared/i18n";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
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
          title: t("tabs.library"),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: t("tabs.search"),
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mybooks/index"
        options={{
          title: t("tabs.my_books"),
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="bookmark" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: t("tabs.profile"),
          tabBarIcon: ({ color }) => (
            <AntDesign size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
