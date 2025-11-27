import { Section as SectionType, useReader } from "@epubjs-react-native/core";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { IconButton, MD3Colors, Text } from "react-native-paper";
import { contrast } from "@/src/shared/lib/constants/reader-theme";
import { useSectionStyles } from "@/src/screens/reader/ui/section/index.style";
interface Props {
  searchTerm: string;
  isCurrentSection: boolean;
  section: SectionType;
  onPress: (section: SectionType) => void;
}

function Section({ searchTerm, isCurrentSection, section, onPress }: Props) {
  const { theme } = useReader();

  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = section?.label.split(regex);
  const styles = useSectionStyles();
  return (
    <TouchableOpacity
      key={section.id}
      style={styles.container}
      onPress={() => onPress(section)}
    >
      <View style={styles.icon}>
        <IconButton
          icon="bookmark"
          size={20}
          iconColor={
            isCurrentSection ? MD3Colors.primary50 : MD3Colors.neutralVariant30
          }
        />
      </View>

      <View style={styles.info}>
        {!searchTerm && (
          <Text
            style={{
              ...styles.name,
              color: isCurrentSection
                ? MD3Colors.primary50
                : contrast[theme.body.background],
            }}
          >
            {section?.label}
          </Text>
        )}

        {searchTerm && (
          <Text
            style={{
              ...styles.name,
              color: isCurrentSection
                ? MD3Colors.primary50
                : contrast[theme.body.background],
            }}
          >
            {parts.filter(String).map((part, index) => {
              return regex.test(part) ? (
                <Text style={styles.highlight} key={`${index}-part-highlight`}>
                  {part}
                </Text>
              ) : (
                <Text key={`${index}-part`}>{part}</Text>
              );
            })}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default Section;
