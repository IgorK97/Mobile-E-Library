import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "@/src/i18n";
import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme.web";
import { useSearchStyles } from "@/src/styles/searchStyles";
import { useTypography } from "@/src/styles/fontStyles";

export default function BookFilters() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  const [selectedGenres, setSelectedGenres] = useState<{
    [key: string]: string;
  }>({});
  const [rating, setRating] = useState<number | null>(null);
  const [yearFrom, setYearFrom] = useState<string>("");
  const [yearTo, setYearTo] = useState<string>("");

  const styles = useSearchStyles();
  const typography = useTypography();
  const languages = [
    "Русский",
    "Английский",
    "Французский",
    "Японский",
    "Китайский",
    "Испанский",
    "Немецкий",
  ];

  const genres = {
    Философия: {
      "Русская философия": {
        "19 век": null,
        "20 век": null,
      },
      "Древняя философия": {
        Античная: null,
        Восточная: null,
      },
    },
    История: {
      Древняя: null,
      Современность: null,
    },
    Экономика: {
      "История экономики России": {
        "19 век": null,
        "Советский период": null,
      },
      "История мировой экономики": null,
    },
  };

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const toggleGenre = (path: string) => {
    setSelectedGenres((prev) => {
      const newSelection = { ...prev };
      if (newSelection[path] === "+") newSelection[path] = "-";
      else if (newSelection[path] === "-") delete newSelection[path];
      else newSelection[path] = "+";
      return newSelection;
    });
  };

  const handleReset = () => {
    setSelectedLanguages([]);
    setSelectedGenres({});
    setRating(null);
    setYearFrom("");
    setYearTo("");
  };

  const handleApply = () => {
    setOpen(false);
    console.log("Filters applied:", {
      search,
      languages: selectedLanguages,
      genres: selectedGenres,
      rating,
      yearFrom,
      yearTo,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather
          name="search"
          size={20}
          color="#888"
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск книг..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <Text style={typography.defaultButtonText}>Фильтры</Text>
      </TouchableOpacity>

      <Modal visible={open} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={typography.defaultTitle}>Фильтры</Text>

            <ScrollView style={styles.scrollArea}>
              <FilterSection
                title="Языки"
                styles={styles}
                typography={typography}
              >
                {(showAllLanguages ? languages : languages.slice(0, 4)).map(
                  (lang) => (
                    <SelectableItem
                      styles={styles}
                      typography={typography}
                      key={lang}
                      label={lang}
                      selected={selectedLanguages.includes(lang)}
                      onPress={() => toggleLanguage(lang)}
                    />
                  )
                )}
                <TouchableOpacity
                  onPress={() => setShowAllLanguages(!showAllLanguages)}
                  style={{ marginTop: 5 }}
                >
                  <Text style={{ color: "#D32F2F", fontWeight: "500" }}>
                    {showAllLanguages ? "Скрыть" : "Показать все"}
                  </Text>
                </TouchableOpacity>
              </FilterSection>

              <FilterSection
                title="Жанры и поджанры"
                styles={styles}
                typography={typography}
              >
                <GenreTree
                  tree={genres}
                  path=""
                  selected={selectedGenres}
                  onToggle={toggleGenre}
                />
              </FilterSection>

              <FilterSection
                title="Оценка"
                styles={styles}
                typography={typography}
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <SelectableItem
                    styles={styles}
                    typography={typography}
                    key={r}
                    label={`${r}★ и выше`}
                    selected={rating === r}
                    onPress={() => setRating(r)}
                  />
                ))}
              </FilterSection>

              <FilterSection
                title="Год написания"
                styles={styles}
                typography={typography}
              >
                <View style={styles.yearRow}>
                  <TextInput
                    style={styles.yearInput}
                    placeholder="От"
                    keyboardType="numeric"
                    value={yearFrom}
                    onChangeText={setYearFrom}
                  />
                  <Text style={{ marginHorizontal: 8 }}>—</Text>
                  <TextInput
                    style={styles.yearInput}
                    placeholder="До"
                    keyboardType="numeric"
                    value={yearTo}
                    onChangeText={setYearTo}
                  />
                </View>
              </FilterSection>
            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity
                onPress={handleReset}
                style={[styles.footerButton, styles.resetButton]}
              >
                <Text>Сбросить</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleApply}
                style={[styles.footerButton, styles.applyButton]}
              >
                <Text style={{ color: "white" }}>Применить</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOpen(false)}
            >
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

interface GenreTreeProps {
  tree: { [key: string]: any };
  path: string;
  selected: { [key: string]: string };
  onToggle: (path: string) => void;
}

const GenreTree = ({ tree, path, selected, onToggle }: GenreTreeProps) => {
  return (
    <View style={{ marginLeft: path ? 12 : 0 }}>
      {Object.entries(tree).map(([key, value]) => {
        const fullPath = path ? `${path}/${key}` : key;
        const state = selected[fullPath];
        return (
          <View key={fullPath} style={{ marginVertical: 3 }}>
            <TouchableOpacity onPress={() => onToggle(fullPath)}>
              <Text
                style={{
                  color:
                    state === "+" ? "#D32F2F" : state === "-" ? "#555" : "#000",
                  fontWeight: state ? "600" : "400",
                }}
              >
                {key} {state ? (state === "+" ? "(+)" : "(-)") : ""}
              </Text>
            </TouchableOpacity>
            {value && (
              <GenreTree
                tree={value}
                path={fullPath}
                selected={selected}
                onToggle={onToggle}
              />
            )}
            {/* } */}
          </View>
        );
      })}
    </View>
  );
};

const FilterSection = (
  { title, children }: any,
  styles: ReturnType<typeof useSearchStyles>,
  typography: ReturnType<typeof useTypography>
) => (
  <View style={styles.section}>
    <Text style={typography.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const SelectableItem = ({
  label,
  selected,
  onPress,
  styles,
  typography,
}: {
  label: string;
  selected?: boolean;
  onPress: () => void;
  styles: ReturnType<typeof useSearchStyles>;
  typography: ReturnType<typeof useTypography>;
}) => (
  <TouchableOpacity
    style={[
      styles.selectableItem,
      selected && { backgroundColor: "#FCE4EC", borderColor: "#D32F2F" },
    ]}
    onPress={onPress}
  >
    <Text style={{ color: selected ? "#D32F2F" : "#333" }}>{label}</Text>
  </TouchableOpacity>
);
