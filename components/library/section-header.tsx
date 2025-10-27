import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SectionHeaderProps {
  title: string;
  onPress?: () => void;
}

export function SectionHeader({ title, onPress }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonText}>Все</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    color: "#D32F2F",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonText: {
    color: "#D32F2F",
    fontSize: 14,
  },
});
