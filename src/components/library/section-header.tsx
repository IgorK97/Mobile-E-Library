import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSectionHeaderStyles } from "@/src/styles/sectionHeader";
interface SectionHeaderProps {
  title: string;
  onPress?: () => void;
}

export function SectionHeader({ title, onPress }: SectionHeaderProps) {
  const styles = useSectionHeaderStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonText}>Все</Text>
      </TouchableOpacity>
    </View>
  );
}
