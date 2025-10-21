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

  const languages = [
    "Русский",
    "Английский",
    "Французский",
    "Японский",
    "Китайский",
    "Испанский",
    "Немецкий",
  ];

  // Пример жанров с несколькими уровнями
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
      {/* Search bar */}
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

      {/* Trigger Button */}
      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <Text style={styles.buttonText}>Фильтры</Text>
      </TouchableOpacity>

      {/* Modal Drawer */}
      <Modal visible={open} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Фильтры</Text>

            <ScrollView style={styles.scrollArea}>
              {/* Languages */}
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

              {/* Genres (recursive tree) */}
              <FilterSection title="Жанры и поджанры">
                <GenreTree
                  tree={genres}
                  path=""
                  selected={selectedGenres}
                  onToggle={toggleGenre}
                />
              </FilterSection>

              {/* Rating */}
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

              {/* Years */}
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

            {/* Footer */}
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

            {/* Close Button */}
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

/* ------------------- Genre Tree (Recursive) ------------------- */
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

/* ------------------- Helper Components ------------------- */
const FilterSection = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
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

/* ------------------- Styles ------------------- */
const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  searchInput: { flex: 1, height: 40 },
  button: {
    backgroundColor: "#D32F2F",
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#D32F2F",
    marginBottom: 8,
  },
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

// import { Feather } from "@expo/vector-icons";
// import React, { useState } from "react";
// import {
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function BookFilters() {
//   const [open, setOpen] = useState(false);

//   const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
//   const [selectedGenres, setSelectedGenres] = useState<{
//     [key: string]: string;
//   }>({});
//   const [rating, setRating] = useState<number | null>(null);
//   const [selectedYear, setSelectedYear] = useState<string | null>(null);

//   // Пример языков
//   const languages = ["Русский", "Английский", "Французский", "Японский"];

//   // Пример древовидной структуры жанров
//   const genres = {
//     Фантастика: ["Научная", "Фэнтези", "Альтернативная история"],
//     Детектив: ["Классический", "Триллер", "Нуар"],
//     История: ["Древняя", "Средневековье", "Современность"],
//   };

//   const years = [
//     "<1900",
//     "1900–1950",
//     "1950–2000",
//     "2000–2010",
//     "2010–2020",
//     "2020+",
//   ];

//   const toggleLanguage = (lang: string) => {
//     setSelectedLanguages((prev) =>
//       prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
//     );
//   };

//   const toggleGenre = (genre: string, subgenre?: string) => {
//     const key = subgenre ? `${genre}/${subgenre}` : genre;
//     setSelectedGenres((prev) => {
//       const newSelection = { ...prev };
//       if (newSelection[key] === "+") newSelection[key] = "-";
//       else if (newSelection[key] === "-") delete newSelection[key];
//       else newSelection[key] = "+";
//       return newSelection;
//     });
//   };

//   const handleReset = () => {
//     setSelectedLanguages([]);
//     setSelectedGenres({});
//     setRating(null);
//     setSelectedYear(null);
//   };

//   const handleApply = () => {
//     setOpen(false);
//     console.log("Applied filters:", {
//       languages: selectedLanguages,
//       genres: selectedGenres,
//       rating,
//       year: selectedYear,
//     });
//   };

//   return (
//     <View>
//       {/* Trigger Button */}
//       <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
//         <Text style={styles.buttonText}>Фильтры</Text>
//       </TouchableOpacity>

//       {/* Modal Drawer */}
//       <Modal visible={open} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.title}>Фильтры</Text>

//             <ScrollView style={styles.scrollArea}>
//               {/* Languages */}
//               <FilterSection title="Языки">
//                 {languages.map((lang) => (
//                   <SelectableItem
//                     key={lang}
//                     label={lang}
//                     selected={selectedLanguages.includes(lang)}
//                     onPress={() => toggleLanguage(lang)}
//                   />
//                 ))}
//               </FilterSection>

//               {/* Genres */}
//               <FilterSection title="Жанры и поджанры">
//                 {Object.entries(genres).map(([genre, subgenres]) => (
//                   <View key={genre} style={styles.genreBlock}>
//                     <Text style={styles.genreTitle}>{genre}</Text>
//                     {subgenres.map((sub) => {
//                       const key = `${genre}/${sub}`;
//                       const state = selectedGenres[key];
//                       return (
//                         <SelectableItem
//                           key={sub}
//                           label={`${sub} ${
//                             state ? (state === "+" ? "(+)" : "(-)") : ""
//                           }`}
//                           onPress={() => toggleGenre(genre, sub)}
//                           state={state}
//                         />
//                       );
//                     })}
//                   </View>
//                 ))}
//               </FilterSection>

//               {/* Rating */}
//               <FilterSection title="Оценка">
//                 {[5, 4, 3, 2, 1].map((r) => (
//                   <SelectableItem
//                     key={r}
//                     label={`${r}★ и выше`}
//                     selected={rating === r}
//                     onPress={() => setRating(r)}
//                   />
//                 ))}
//               </FilterSection>

//               {/* Year */}
//               <FilterSection title="Год написания">
//                 {years.map((y) => (
//                   <SelectableItem
//                     key={y}
//                     label={y}
//                     selected={selectedYear === y}
//                     onPress={() => setSelectedYear(y)}
//                   />
//                 ))}
//               </FilterSection>
//             </ScrollView>

//             {/* Footer */}
//             <View style={styles.footer}>
//               <TouchableOpacity
//                 onPress={handleReset}
//                 style={[styles.footerButton, styles.resetButton]}
//               >
//                 <Text>Сбросить</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={handleApply}
//                 style={[styles.footerButton, styles.applyButton]}
//               >
//                 <Text style={{ color: "white" }}>Применить</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Close Button */}
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setOpen(false)}
//             >
//               <Feather name="x" size={24} color="#333" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// /* ------------------- Subcomponents ------------------- */
// const FilterSection = ({ title, children }: any) => (
//   <View style={styles.section}>
//     <Text style={styles.sectionTitle}>{title}</Text>
//     {children}
//   </View>
// );

// const SelectableItem = ({
//   label,
//   selected,
//   onPress,
//   state,
// }: {
//   label: string;
//   selected?: boolean;
//   onPress: () => void;
//   state?: string;
// }) => {
//   return (
//     <TouchableOpacity
//       style={[
//         styles.selectableItem,
//         selected && { backgroundColor: "#FCE4EC", borderColor: "#D32F2F" },
//       ]}
//       onPress={onPress}
//     >
//       <Text style={{ color: selected ? "#D32F2F" : "#333" }}>{label}</Text>
//     </TouchableOpacity>
//   );
// };

// /* ------------------- Styles ------------------- */
// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: "#D32F2F",
//     padding: 12,
//     borderRadius: 10,
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   buttonText: { color: "#fff", fontWeight: "600" },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingTop: 20,
//     maxHeight: "90%",
//     position: "relative",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   scrollArea: { paddingHorizontal: 20, paddingBottom: 10 },
//   section: { marginBottom: 20 },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#D32F2F",
//     marginBottom: 8,
//   },
//   genreBlock: { marginBottom: 12 },
//   genreTitle: { fontWeight: "600", marginBottom: 4, color: "#555" },
//   selectableItem: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     marginVertical: 4,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     borderTopWidth: 1,
//     borderColor: "#eee",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   footerButton: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   resetButton: { backgroundColor: "#eee", marginRight: 10 },
//   applyButton: { backgroundColor: "#D32F2F" },
//   closeButton: {
//     position: "absolute",
//     top: 10,
//     right: 20,
//   },
// });

// // // import { Text, View } from "react-native";

// // // export default function SearchScreen() {
// // //   return (
// // //     <View>
// // //       <Text>Search</Text>
// // //     </View>
// // //   );
// // // }
// // import React, { useState } from "react";
// // import {
// //   Modal,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from "react-native";

// // export interface Filters {
// //   authors: string[];
// //   genres: string[];
// //   years: string[];
// // }

// // interface FilterSheetProps {
// //   onApplayFilters: (filters: Filters) => void;
// // }

// // function FilterCheckbox({
// //   checked,
// //   onCheckedChange,
// //   label,
// // }: {
// //   checked: boolean;
// //   onCheckedChange: () => void;
// //   label: string;
// // }) {
// //   return (
// //     <TouchableOpacity
// //       style={styles.checkboxContainer}
// //       onPress={onCheckedChange}
// //     >
// //       <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
// //         {checked && <Text style={styles.checkMark}>+</Text>}
// //       </View>
// //       <Text style={styles.label}>{label}</Text>
// //     </TouchableOpacity>
// //   );
// // }

// // export default function FilterSheet() {
// //   const [open, setOpen] = useState(false);
// //   const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
// //   const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
// //   const [selectedYears, setSelectedYears] = useState<string[]>([]);

// //   const authors = [
// //     "Т. П. Григорьева",
// //     "А.Ф. Лосев",
// //     "А.А. Сванидзе",
// //     "Л.Н. Толстой",
// //     "Ф.М. Достоевский",
// //   ];
// //   const genres = [
// //     "Философия",
// //     "История",
// //     "Религия",
// //     "Художественная литература",
// //     "Научная литература",
// //   ];
// //   const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];
// //   const toggleItem = (
// //     item: string,
// //     list: string[],
// //     setList: React.Dispatch<React.SetStateAction<string[]>>
// //   ) => {
// //     setList((prev) =>
// //       prev.includes(item) ? prev.filter((i) => i != item) : [...prev, item]
// //     );
// //   };

// //   const handleApply = () => {
// //     setOpen(false);
// //   };
// //   const handleReset = () => {
// //     setSelectedAuthors([]);
// //     setSelectedGenres([]);
// //     setSelectedYears([]);
// //     setOpen(false);
// //   };
// //   return (
// //     <View>
// //       {/*Trigger Button */}
// //       <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
// //         <Text style={styles.buttonText}>Filters</Text>
// //       </TouchableOpacity>

// //       {/*Modal Drawer */}
// //       <Modal visible={open} animationType="slide" transparent>
// //         <View style={styles.modalOverlay}>
// //           <View style={styles.modalContent}>
// //             <Text style={styles.title}>Filters</Text>
// //             <ScrollView style={styles.scrollArea}>
// //               {/* Authors*/}
// //               <View style={styles.section}>
// //                 <Text style={styles.sectionTitle}>Authors</Text>
// //                 {authors.map((author) => (
// //                   <FilterCheckbox
// //                     key={author}
// //                     checked={selectedAuthors.includes(author)}
// //                     onCheckedChange={() =>
// //                       toggleItem(author, selectedAuthors, setSelectedAuthors)
// //                     }
// //                     label={author}
// //                   />
// //                 ))}
// //               </View>
// //               {/*Genres*/}
// //               <View style={styles.section}>
// //                 <Text style={styles.sectionTitle}>Genres</Text>
// //                 {genres.map((genre) => (
// //                   <FilterCheckbox
// //                     key={genre}
// //                     checked={selectedGenres.includes(genre)}
// //                     onCheckedChange={() =>
// //                       toggleItem(genre, selectedGenres, setSelectedGenres)
// //                     }
// //                     label={genre}
// //                   />
// //                 ))}
// //               </View>
// //               {/*Years */}
// //               <View style={styles.section}>
// //                 <Text style={styles.sectionTitle}>Year</Text>
// //                 {years.map((year) => (
// //                   <FilterCheckbox
// //                     key={year}
// //                     checked={selectedYears.includes(year)}
// //                     onCheckedChange={() =>
// //                       toggleItem(year, selectedYears, setSelectedYears)
// //                     }
// //                     label={year}
// //                   />
// //                 ))}
// //               </View>
// //             </ScrollView>
// //             {/*Footer*/}
// //             <View style={styles.footer}>
// //               <TouchableOpacity
// //                 onPress={() => handleReset()}
// //                 style={[styles.footerButton, styles.resetButton]}
// //               >
// //                 <Text>Reset</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity
// //                 onPress={() => handleApply()}
// //                 style={[styles.footerButton, styles.applyButton]}
// //               >
// //                 <Text style={{ color: "white" }}>Apply</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </View>
// //       </Modal>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   button: {
// //     padding: 10,
// //     backgroundColor: "#ddd",
// //     borderRadius: 5,
// //     alignItems: "center",
// //     margin: 10,
// //   },
// //   buttonText: { fontSize: 16 },
// //   modalOverlay: {
// //     flex: 1,
// //     backgroundColor: "rgba(0,0,0,0.5)",
// //     justifyContent: "flex-end",
// //   },
// //   modalContent: {
// //     backgroundColor: "white",
// //     maxHeight: "80%",
// //     borderTopLeftRadius: 15,
// //     borderTopRightRadius: 15,
// //   },
// //   title: { fontSize: 18, fontWeight: "bold", padding: 15 },
// //   scrollArea: { paddingHorizontal: 15 },
// //   section: { marginBottom: 20 },
// //   sectionTitle: { fontWeight: "600", marginBottom: 10 },
// //   checkboxContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginBottom: 8,
// //   },
// //   checkbox: {
// //     width: 20,
// //     height: 20,
// //     borderWidth: 1,
// //     borderColor: "#999",
// //     marginRight: 10,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   checkboxChecked: { backgroundColor: "#007bff", borderColor: "#007bff" },
// //   checkMark: { color: "white", fontWeight: "bold" },
// //   label: { fontSize: 16 },
// //   footer: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     padding: 15,
// //   },
// //   footerButton: {
// //     flex: 1,
// //     padding: 10,
// //     borderRadius: 5,
// //     alignItems: "center",
// //     marginHorizontal: 5,
// //   },
// //   resetButton: { borderWidth: 1, borderColor: "#999" },
// //   applyButton: { backgroundColor: "#007bff" },
// // });
