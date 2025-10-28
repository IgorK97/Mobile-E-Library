import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSectionHeaderStyles } from "@/src/styles/sectionHeader";
import { useTranslation } from "react-i18next";
import "@/src/i18n";
interface SectionHeaderProps {
  title: string;
  onPress?: () => void;
}

export function SectionHeader({ title, onPress }: SectionHeaderProps) {
  const styles = useSectionHeaderStyles();
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonText}>{t("sect_header.all")}</Text>
      </TouchableOpacity>
    </View>
  );
}
