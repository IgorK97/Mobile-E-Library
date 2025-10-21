// import { Text, View } from "react-native";

// export default function SearchScreen() {
//   return (
//     <View>
//       <Text>Search</Text>
//     </View>
//   );
// }
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface Filters {
  authors: string[];
  genres: string[];
  years: string[];
}

interface FilterSheetProps {
  onApplayFilters: (filters: Filters) => void;
}

function FilterCheckbox({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  onCheckedChange: () => void;
  label: string;
}) {
  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={onCheckedChange}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkMark}>+</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function FilterSheet() {
  const [open, setOpen] = useState(false);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  const authors = [
    "Т. П. Григорьева",
    "А.Ф. Лосев",
    "А.А. Сванидзе",
    "Л.Н. Толстой",
    "Ф.М. Достоевский",
  ];
  const genres = [
    "Философия",
    "История",
    "Религия",
    "Художественная литература",
    "Научная литература",
  ];
  const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];
  const toggleItem = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i != item) : [...prev, item]
    );
  };

  const handleApply = () => {
    setOpen(false);
  };
  const handleReset = () => {
    setSelectedAuthors([]);
    setSelectedGenres([]);
    setSelectedYears([]);
    setOpen(false);
  };
  return (
    <View>
      {/*Trigger Button */}
      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <Text style={styles.buttonText}>Filters</Text>
      </TouchableOpacity>

      {/*Modal Drawer */}
      <Modal visible={open} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Filters</Text>
            <ScrollView style={styles.scrollArea}>
              {/* Authors*/}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Authors</Text>
                {authors.map((author) => (
                  <FilterCheckbox
                    key={author}
                    checked={selectedAuthors.includes(author)}
                    onCheckedChange={() =>
                      toggleItem(author, selectedAuthors, setSelectedAuthors)
                    }
                    label={author}
                  />
                ))}
              </View>
              {/*Genres*/}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Genres</Text>
                {genres.map((genre) => (
                  <FilterCheckbox
                    key={genre}
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={() =>
                      toggleItem(genre, selectedGenres, setSelectedGenres)
                    }
                    label={genre}
                  />
                ))}
              </View>
              {/*Years */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Year</Text>
                {years.map((year) => (
                  <FilterCheckbox
                    key={year}
                    checked={selectedYears.includes(year)}
                    onCheckedChange={() =>
                      toggleItem(year, selectedYears, setSelectedYears)
                    }
                    label={year}
                  />
                ))}
              </View>
            </ScrollView>
            {/*Footer*/}
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => handleReset()}
                style={[styles.footerButton, styles.resetButton]}
              >
                <Text>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleApply()}
                style={[styles.footerButton, styles.applyButton]}
              >
                <Text style={{ color: "white" }}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  buttonText: { fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    maxHeight: "80%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  title: { fontSize: 18, fontWeight: "bold", padding: 15 },
  scrollArea: { paddingHorizontal: 15 },
  section: { marginBottom: 20 },
  sectionTitle: { fontWeight: "600", marginBottom: 10 },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#999",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: { backgroundColor: "#007bff", borderColor: "#007bff" },
  checkMark: { color: "white", fontWeight: "bold" },
  label: { fontSize: 16 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  footerButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  resetButton: { borderWidth: 1, borderColor: "#999" },
  applyButton: { backgroundColor: "#007bff" },
});
