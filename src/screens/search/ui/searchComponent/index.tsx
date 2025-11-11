import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";

import "@/src/shared/i18n";

import { useSearchStyles } from "@/src/screens/search/ui/searchComponent/searchStyles";
import { useTypography } from "@/src/shared/lib/constants/fontStyles";

interface SearchProps {
  onNavigateToBook: (bookId: number) => void;
}

export const Search = ({ onNavigateToBook }: SearchProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const { t } = useTranslation();
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
          placeholder={t("search.ph")}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <Text style={typography.defaultButtonText}>{t("search.filters")}</Text>
      </TouchableOpacity>

      <Modal visible={open} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={typography.defaultTitle}>
              {t("search.title_filters")}
            </Text>

            <ScrollView style={styles.scrollArea}>
              <FilterSection
                title={t("search.title_lang_sect")}
                // styles={styles}
                // typography={typography}
              >
                {(showAllLanguages ? languages : languages.slice(0, 4)).map(
                  (lang) => (
                    <SelectableItem
                      // styles={styles}
                      // typography={typography}
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
                    {showAllLanguages ? t("search.hide") : t("search.show")}
                  </Text>
                </TouchableOpacity>
              </FilterSection>

              <FilterSection
                title={t("search.title_genre_sect")}
                // styles={styles}
                // typography={typography}
              >
                <GenreTree
                  tree={genres}
                  path=""
                  selected={selectedGenres}
                  onToggle={toggleGenre}
                />
              </FilterSection>

              <FilterSection
                title={t("search.title_mark")}
                // styles={styles}
                // typography={typography}
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <SelectableItem
                    // styles={styles}
                    // typography={typography}
                    key={r}
                    label={`${r}★ ${t("search.mark_label")}`}
                    selected={rating === r}
                    onPress={() => setRating(r)}
                  />
                ))}
              </FilterSection>

              <FilterSection
                title={t("search.title_year_sect")}
                // styles={styles}
                // typography={typography}
              >
                <View style={styles.yearRow}>
                  <TextInput
                    style={styles.yearInput}
                    placeholder={t("search.ph_from")}
                    keyboardType="numeric"
                    value={yearFrom}
                    onChangeText={setYearFrom}
                  />
                  <Text style={{ marginHorizontal: 8 }}>—</Text>
                  <TextInput
                    style={styles.yearInput}
                    placeholder={t("search.ph_to")}
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
                <Text>{t("search.reset")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleApply}
                style={[styles.footerButton, styles.applyButton]}
              >
                <Text style={{ color: "white" }}>{t("search.apply")}</Text>
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
};

interface GenreTreeProps {
  tree: { [key: string]: any };
  path: string;
  selected: { [key: string]: string };
  onToggle: (path: string) => void;
}

const GenreTree = ({ tree, path, selected, onToggle }: GenreTreeProps) => {
  return (
    <View style={{ marginLeft: path ? path.split("/").length * 12 : 0 }}>
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
          </View>
        );
      })}
    </View>
  );
};

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  // styles: ReturnType<typeof useSearchStyles>;
  // typography: ReturnType<typeof useTypography>;
}

const FilterSection = ({
  title,
  children,
}: // styles,
// typography,
FilterSectionProps) => {
  const styles = useSearchStyles();
  const typography = useTypography();
  return (
    <View style={styles.section}>
      <Text style={typography.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

const SelectableItem = ({
  label,
  selected,
  onPress,
}: // styles,
// typography,
{
  label: string;
  selected?: boolean;
  onPress: () => void;
  // styles: ReturnType<typeof useSearchStyles>;
  // typography: ReturnType<typeof useTypography>;
}) => {
  const styles = useSearchStyles();
  return (
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
};
