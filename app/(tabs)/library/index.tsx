import { BookCard } from "@/components/book-card";
import { SectionHeader } from "@/components/section-header";
import { Book } from "@/scripts/book";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import book1 from "../../../assets/images/book_1.png";
const books1: Book[] = [
  {
    id: 1,
    title: "Буддизм в Японии",
    author: "Т.П. Григорьева",
    rating: 4.5,
    reviewCount: 10,
    pages: 704,
    year: 1993,
    description:
      "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
    imageUrl: book1,
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
  },
  {
    id: 2,
    title: "Буддизм в Японии",
    author: "Т.П. Григорьева",
    rating: 4.5,
    reviewCount: 10,
    pages: 704,
    year: 1993,
    description:
      "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
    imageUrl: require("../../../assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
  },
];
const books2 = [
  {
    id: 3,
    title: "Буддизм в Японии",
    author: "Т.П. Григорьева",
    rating: 4.5,
    reviewCount: 10,
    pages: 704,
    year: 1993,
    description:
      "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
    imageUrl: require("../../../assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
  },
  {
    id: 4,
    title: "Буддизм в Японии",
    author: "Т.П. Григорьева",
    rating: 4.5,
    reviewCount: 10,
    pages: 704,
    year: 1993,
    description:
      "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
    imageUrl: require("../../../assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
  },
];
const books3 = [
  {
    id: 5,
    title: "Буддизм в Японии",
    author: "Т.П. Григорьева",
    rating: 4.5,
    reviewCount: 10,
    pages: 704,
    year: 1993,
    description:
      "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
    imageUrl: require("../../../assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
  },
  {
    id: 6,
    title: "Буддизм в Японии",
    author: "Т.П. Григорьева",
    rating: 4.5,
    reviewCount: 10,
    pages: 704,
    year: 1993,
    description:
      "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
    imageUrl: require("../../../assets/images/book_1.png"),
    genres: [
      "Философия",
      "Культурология",
      "Религия",
      "Буддизм",
      "Восток",
      "Япония",
    ],
  },
];
export default function HomeScreen() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isReading, setIsReading] = useState(false);
  const router = useRouter();
  const { width } = useWindowDimensions();
  const numColumns = width < 500 ? 2 : 4;
  const cardWidth = width / numColumns - 24;
  // const books: Record<string, Book> = {
  //   buddism: {
  //     title: "Буддизм в Японии",
  //     author: "Т.П. Григорьева",
  //     coverColor: "#2C3E3A",
  //     coverContent: (
  //       <View style={styles.coverContentCenter}>
  //         {/* <Text style={styles.buddismLabel}>ЗОЛОТОЙ УЗОР ВРЕМЕНИ</Text> */}
  //         <Text style={styles.buddismTitle}>БУДДИЗМ{"\n"}В ЯПОНИИ</Text>
  //       </View>
  //     ),
  //     rating: 4.5,
  //     reviewCount: 10,
  //     pages: 704,
  //     year: 1993,
  //     imageUrl: "",
  //     genres: ["История", "Религия", "Культура"],
  //     description:
  //       "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
  //   },
  // };
  // if (isReading && selectedBook) {
  //   return (
  //     <ReaderScreen
  //       title={selectedBook.title}
  //       author={selectedBook.author}
  //       coverColor={selectedBook.coverColor}
  //       coverContent={selectedBook.coverContent}
  //       totalPages={selectedBook.pages}
  //       onBack={() => setIsReading(false)}
  //     />
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/*История культуры*/}
        <SectionHeader title="История культуры" />
        <FlatList
          data={books1}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.gridRow}
          renderItem={({ item }) => (
            <View style={{ width: cardWidth }}>
              <BookCard
                bookInfo={item}
                key={item.id}
                onPress={() => router.push("/book")}
              />
            </View>
          )}
        />
        {/* <View style={{flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    width:cardWidth}}>
     <BookCard
     
      bookInfo={books[0]}
      onPress={() => router.push("/(tabs)/library/[bookId]")}
    />
    <BookCard
      bookInfo={books[1]}
      onPress={() => router.push("/(tabs)/library/[bookId]")}
    />
  </View> */}
        {/* Экономическая история */}
        <SectionHeader title="Экономическая история" />
        <FlatList
          data={books2}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.gridRow}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={{ width: cardWidth }}>
              <BookCard
                bookInfo={item}
                key={item.id}
                onPress={() => router.push("/book")}
              />
            </View>
          )}
        />
        {/* <View style={styles.row}>
    <BookCard
      bookInfo={books[2]}
      onPress={() => router.push("/(tabs)/library/[bookId]")}
    />
    <BookCard
      bookInfo={books[3]}
      onPress={() => router.push("/(tabs)/library/[bookId]")}
    />
  </View> */}
        {/* История мира */}
        <SectionHeader title="История мира" />
        <FlatList
          data={books3}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.gridRow}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={{ width: cardWidth }}>
              <BookCard
                bookInfo={item}
                key={item.id}
                onPress={() => router.push("/book")}
              />
            </View>
          )}
        />
        {/* <View style={styles.row}>
    <BookCard
      bookInfo={books[4]}
      onPress={() => router.push("/(tabs)/library/[bookId]")}
    />
    <BookCard
      bookInfo={books[5]}
      onPress={() => router.push("/(tabs)/library/[bookId]")}
    />
  </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  coverContentCenter: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  buddismLabel: {
    color: "#B8A566",
    fontSize: 10,
    marginBottom: 4,
  },
  buddismTitle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 18,
  },
  antiqueAuthor: {
    color: "#9FAABD",
    fontSize: 18,
    marginBottom: 4,
  },
  antiqueCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#C84545",
    marginBottom: 6,
  },
  antiqueTitle: {
    color: "#9FAABD",
    fontSize: 10,
    textAlign: "center",
    lineHeight: 12,
  },
  economyAuthor: {
    color: "#8B7355",
    fontSize: 9,
  },
  grid: {
    padding: 16,
    paddingBottom: 80,
  },
  gridRow: {
    justifyContent: "space-between",
  },
  economyTitle: {
    color: "#6B5540",
    fontSize: 11,
    textAlign: "center",
  },
  economySubtitle: {
    color: "#8B7355",
    fontSize: 8,
    marginTop: 4,
  },
  structTitle: {
    color: "#B8A890",
    fontSize: 9,
    textAlign: "center",
  },
  structSubtitle: {
    color: "#8B7A65",
    fontSize: 8,
    textAlign: "center",
  },
  worldTitle: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  worldSubtitle: {
    color: "#D4B896",
    fontSize: 8,
    textAlign: "center",
  },
  worldTitle2: {
    color: "#D4B896",
    fontSize: 12,
    textAlign: "center",
  },
  worldSubtitle2: {
    color: "#8B6545",
    fontSize: 9,
    textAlign: "center",
  },
});
