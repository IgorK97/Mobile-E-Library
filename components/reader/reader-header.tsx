import { router } from "expo-router";
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

import { useReader, Themes } from "@epubjs-react-native/core";
import { readerThemeColors, resolveTheme } from "@/constants/reader-theme";
import { ArrowLeft } from "lucide-react-native";

interface Props {
  author: string;
  title: string;
}

export function ReaderHeader({ author, title }: Props) {
  const { theme } = useReader();
  const colors = resolveTheme(theme);
  return (
    <View
      style={{
        ...styles.header,
        backgroundColor: colors.background,
      }}
    >
      <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color="#D32F2F" />
      </TouchableOpacity>
      <View style={styles.headerText}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {author}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  author: {
    fontSize: 13,
    color: "#666",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: "center",
    zIndex: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  iconButton: {
    padding: 8,
  },
});
