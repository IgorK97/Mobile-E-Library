import "@/src/shared/i18n";
import { MyBooksComponent } from "@/src/screens/mybooks";

export default function MyBooksScreen() {
  return <MyBooksComponent />;
  // const [activaTab, setActiveTab] = useState("favorites");
  // const { width } = useWindowDimensions();
  // const numColumns = width < 500 ? 2 : 4;
  // const cardWidth = width / numColumns - 24;
  // const tabs = [
  //   { id: "favorites", label: "Избранное" },
  //   { id: "downloaded", label: "Загруженные" },
  //   { id: "reading", label: "История чтения" },
  //   { id: "read", label: "Прочитанные" },
  // ];
  // const color = useColorScheme();
  // const styles = useMyBooksStyles();
  // const typography = useTypography();
  // const { t } = useTranslation();
  // return (
  //   <View
  //     style={{
  //       ...commonStyles.defaultContainer,
  //       backgroundColor:
  //         color === "light" ? Colors.light.background : Colors.dark.background,
  //     }}
  //   >
  //     <View style={styles.header}>
  //       <View style={styles.headerIcon}>
  //         <BookOpen
  //           size={20}
  //           color={
  //             color === "light"
  //               ? Colors.light.background
  //               : Colors.dark.background
  //           }
  //         />
  //       </View>
  //       <Text style={typography.headerTitle}>{t("mybooks.my_books")}</Text>
  //     </View>

  //     <ScrollView
  //       horizontal
  //       showsHorizontalScrollIndicator={false}
  //       style={styles.tabsContainer}
  //       contentContainerStyle={{ alignItems: "center" }}
  //     >
  //       {tabs.map((tab) => (
  //         <TouchableOpacity
  //           key={tab.id}
  //           style={[
  //             styles.tabButton,
  //             activaTab === tab.id && styles.tabButtonSelected,
  //           ]}
  //           onPress={() => setActiveTab(tab.id)}
  //         >
  //           <Text
  //             style={[
  //               typography.tabText,
  //               activaTab === tab.id && typography.tabTextSelected,
  //             ]}
  //           >
  //             {tab.label}
  //           </Text>
  //         </TouchableOpacity>
  //       ))}
  //     </ScrollView>

  //     <FlatList
  //       data={books}
  //       keyExtractor={(item) => item.id.toString()}
  //       numColumns={numColumns}
  //       contentContainerStyle={commonStyles.grid}
  //       columnWrapperStyle={commonStyles.gridRow}
  //       style={{ gap: 5, marginBottom: 5 }}
  //       renderItem={({ item }) => (
  //         <View style={{ width: cardWidth }}>
  //           <BookCard
  //             bookInfo={item}
  //             key={item.id}
  //             onPress={() =>
  //               router.push({ pathname: "/[id]", params: { id: item.id } })
  //             }
  //           />
  //         </View>
  //       )}
  //     />
  //   </View>
  // );
}
