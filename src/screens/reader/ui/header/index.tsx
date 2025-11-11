import { router } from "expo-router";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

import { useReader } from "@epubjs-react-native/core";
import { resolveTheme } from "@/src/shared/lib/constants/reader-theme";
import { ArrowLeft } from "lucide-react-native";
import { useReaderHeaderStyles } from "@/src/screens/reader/ui/header/readerHeaderStyles";

interface Props {
  author: string;
  title: string;
}

export function ReaderHeader({ author, title }: Props) {
  const { theme } = useReader();
  const colors = resolveTheme(theme);
  const styles = useReaderHeaderStyles();
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
