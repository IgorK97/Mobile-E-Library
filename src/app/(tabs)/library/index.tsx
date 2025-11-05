import "@/src/shared/i18n";
import { HomeComponent } from "@/src/screens/library";

export default function LibraryScreen() {
  return <HomeComponent />;
  // const router = useRouter();
  // const { width } = useWindowDimensions();
  // const numColumns = 2;
  // const cardWidth = width / numColumns - 24;
  // const color = useColorScheme();
  // return (
  //   <SafeAreaView
  //     style={{
  //       flex: 1,
  //       backgroundColor:
  //         color === "light" ? Colors.light.background : Colors.dark.background,
  //     }}
  //   >
  //     <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
  //       <SectionHeader title="История культуры" />
  //       <FlatList
  //         data={books1}
  //         scrollEnabled={false}
  //         keyExtractor={(item) => item.id.toString()}
  //         numColumns={numColumns}
  //         contentContainerStyle={commonStyles.grid}
  //         columnWrapperStyle={commonStyles.gridRow}
  //         renderItem={({ item }) => (
  //           <View style={{ width: cardWidth }}>
  //             <BookCard
  //               bookInfo={item}
  //               key={item.id}
  //               onPress={() =>
  //                 router.navigate({
  //                   pathname: "/[id]",
  //                   params: { id: 1 },
  //                 })
  //               }
  //             />
  //           </View>
  //         )}
  //       />

  //       <SectionHeader title="Экономическая история" />
  //       <FlatList
  //         data={books2}
  //         keyExtractor={(item) => item.id.toString()}
  //         numColumns={numColumns}
  //         contentContainerStyle={commonStyles.grid}
  //         columnWrapperStyle={commonStyles.gridRow}
  //         scrollEnabled={false}
  //         renderItem={({ item }) => (
  //           <View style={{ width: cardWidth }}>
  //             <BookCard
  //               bookInfo={item}
  //               key={item.id}
  //               onPress={() =>
  //                 router.navigate({
  //                   pathname: "/[id]",
  //                   params: { id: 1 },
  //                 })
  //               }
  //             />
  //           </View>
  //         )}
  //       />

  //       <SectionHeader title="История мира" />
  //       <FlatList
  //         data={books3}
  //         keyExtractor={(item) => item.id.toString()}
  //         numColumns={numColumns}
  //         contentContainerStyle={commonStyles.grid}
  //         columnWrapperStyle={commonStyles.gridRow}
  //         scrollEnabled={false}
  //         renderItem={({ item }) => (
  //           <View style={{ width: cardWidth }}>
  //             <BookCard
  //               bookInfo={item}
  //               key={item.id}
  //               onPress={() =>
  //                 router.navigate({
  //                   pathname: "/[id]",
  //                   params: { id: 1 },
  //                 })
  //               }
  //             />
  //           </View>
  //         )}
  //       />
  //     </ScrollView>
  //   </SafeAreaView>
  // );
}
