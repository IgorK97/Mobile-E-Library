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
import { Colors, Typography } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme.web";

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

  const color = useColorScheme();

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
      <View style={[styles.searchBar, Colors.default.input]}>
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

      <TouchableOpacity
        style={[
          styles.button,
          color === "light" ? Colors.light.saveButton : Colors.dark.saveButton,
        ]}
        onPress={() => setOpen(true)}
      >
        <Text style={styles.buttonText}>Фильтры</Text>
      </TouchableOpacity>

      <Modal visible={open} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Фильтры</Text>

            <ScrollView style={styles.scrollArea}>
              <FilterSection title="Языки">
                {(showAllLanguages ? languages : languages.slice(0, 4)).map(
                  (lang) => (
                    <SelectableItem
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

              <FilterSection title="Жанры и поджанры">
                <GenreTree
                  tree={genres}
                  path=""
                  selected={selectedGenres}
                  onToggle={toggleGenre}
                />
              </FilterSection>

              <FilterSection title="Оценка">
                {[5, 4, 3, 2, 1].map((r) => (
                  <SelectableItem
                    key={r}
                    label={`${r}★ и выше`}
                    selected={rating === r}
                    onPress={() => setRating(r)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Год написания">
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

const FilterSection = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={Typography.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const SelectableItem = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress: () => void;
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

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 10 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 8,
  },
  searchInput: { flex: 1, height: 40 },
  button: {
    // backgroundColor: "#D32F2F",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: "90%",
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  scrollArea: { paddingHorizontal: 20, paddingBottom: 10 },
  section: { marginBottom: 20 },

  selectableItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
  },
  yearRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  yearInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  footerButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  resetButton: { backgroundColor: "#eee", marginRight: 10 },
  applyButton: { backgroundColor: "#D32F2F" },
  closeButton: { position: "absolute", top: 10, right: 20 },
});
