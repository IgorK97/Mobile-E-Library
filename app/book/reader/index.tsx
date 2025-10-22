import Slider from "@react-native-community/slider";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import * as FileSystem from "react-native-fs";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
// import { parseStringPromise } from "xml2js";
interface BookData {
  title: string;
  author: string;
}
interface BookText {
  title: string;
  content: string;
}

export async function parseStringPromise(xmlString: string): Promise<any> {
  // Удаляем возможные BOM и пробелы
  const cleaned = xmlString.replace(/^[\uFEFF\xEF\xBB\xBF]/, "").trim();

  // Попробуем использовать DOMParser, если он есть (на Web)
  // if (typeof DOMParser !== "undefined") {
  //   const parser = new DOMParser();
  //   const xml = parser.parseFromString(cleaned, "text/xml");
  //   return xmlToJson(xml);
  // }

  // Если в RN, то используем простейший regex-парсер
  return simpleXMLToJSON(cleaned);
}

function simpleXMLToJSON(xml: string): any {
  const tagPattern = /<([^!?][^>\s]*)(.*?)>(.*?)<\/\1>/gs;
  const result: any = {};

  // Функция для рекурсивного разбора
  const parseNode = (text: string): any => {
    const matches = [...text.matchAll(tagPattern)];
    if (matches.length === 0) return text.trim();

    const obj: any = {};
    for (const match of matches) {
      const [, tagName, _attrs, inner] = match;
      const parsed = parseNode(inner);
      if (obj[tagName]) {
        if (!Array.isArray(obj[tagName])) obj[tagName] = [obj[tagName]];
        obj[tagName].push(parsed);
      } else {
        obj[tagName] = parsed;
      }
    }
    return obj;
  };

  return parseNode(xml);
}

export default function ReaderScreen() {
  const [bookData, setBookData] = useState<BookData>({ title: "", author: "" });
  const [currentPosition, setCurrentPosition] = useState(0);
  const [progress, setProgress] = useState(0);
  const [chapters, setChapters] = useState<BookText[]>([]);
  const scrollViewRef = useRef(null);

  // Загрузка и парсинг FB2 файла
  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {
    try {
      // 1️⃣ Загружаем файл из assets
      const asset =
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        Asset.fromModule(require("../../../assets/books/frolovBook.fb2"));

      await asset.downloadAsync();
      const fileUri = asset.localUri || asset.uri;

      // 2️⃣ Читаем содержимое файла как текст (UTF-8)
      const fb2Content = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // 3️⃣ Парсим XML
      const result = await parseStringPromise(fb2Content);

      // 4️⃣ Извлекаем метаданные
      const description = result.FictionBook?.description?.[0];
      const title =
        description?.["title-info"]?.[0]?.["book-title"]?.[0] || "Без названия";
      const authorData =
        description?.["title-info"]?.[0]?.author?.[0] || undefined;
      const authorName =
        authorData?.["first-name"]?.[0] +
          " " +
          authorData?.["last-name"]?.[0] || "Неизвестный автор";

      // 5️⃣ Извлекаем текст (body/section)
      const body = result.FictionBook?.body?.[0];
      const sections = body?.section || [];
      const parsedChapters: BookText[] = sections.map((sec: any) => {
        const title = sec.title?.[0]?.p?.[0] || "";
        const paragraphs = (sec.p || [])
          .map((p: any) => (typeof p === "string" ? p : p?._ || ""))
          .filter((t: string) => t.trim().length > 0);

        return {
          title,
          content: paragraphs.join("\n\n"),
        };
      });

      setBookData({ title, author: authorName });
      setChapters(parsedChapters);
    } catch (error) {
      console.error("Ошибка загрузки книги:", error);
    }

    // try {
    //   // 1. Загрузка файла из assets
    //   const filePath = `../../../assets/books/frolovBook.fb2`;
    //   // 2. Чтение файла
    //   const base64Content = await FileSystem.readAsStringAsync(
    //     filePath,
    //     "base64"
    //   );
    //   const binaryData = Buffer.from(base64Content, "base64").toString(
    //     "binary"
    //   );
    //   // 3. Парсинг XML
    //   const parser = new DOMParser();
    //   const xmlDoc = parser.parseFromString(binaryData, "text/xml");
    //   // 4. Извлечение заголовка и автора
    //   const title =
    //     xmlDoc.getElementsByTagName("book-title")[0]?.textContent ||
    //     "Неизвестно";
    //   const author =
    //     xmlDoc.getElementsByTagName("author")[0]?.textContent || "Неизвестно";
    //   // 5. Извлечение содержимого
    //   const body = xmlDoc.getElementsByTagName("body")[0];
    //   const sections = Array.from(body.getElementsByTagName("section"));
    //   const parsedChapters = sections.map((section) => {
    //     const title =
    //       section.getElementsByTagName("title")[0]?.textContent || "";
    //     const paragraphs = Array.from(section.getElementsByTagName("p"))
    //       .map((p) => p.textContent)
    //       .filter((text) => text.trim().length > 0);
    //     return { title, content: paragraphs.join("\n\n") };
    //   });
    //   setBookData({ title, author });
    //   setChapters(parsedChapters);
    // } catch (error) {
    //   console.error("Ошибка загрузки книги:", error);
    // }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollProgress =
      contentOffset.y / (contentSize.height - layoutMeasurement.height);
    setCurrentPosition(contentOffset.y);
    setProgress(scrollProgress);
  };

  const handleSliderChange = (value: number) => {
    if (scrollViewRef.current) {
      const scrollHeight = chapters.length * Dimensions.get("window").height;
      const scrollTo = value * scrollHeight;
      // scrollViewRef.current.scrollTo({ y: scrollTo, animated: false });
      setProgress(value);
    }
  };

  if (!bookData) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text>Загрузка книги...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <View style={styles.header}>
        <Text style={styles.title}>{bookData.title}</Text>
        <Text style={styles.author}>{bookData.author}</Text>
      </View>

      {/* Прогресс-бар */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Прогресс: {Math.round(progress * 100)}%
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={progress}
          onValueChange={handleSliderChange}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#000000"
        />
      </View>

      {/* Содержимое книги */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {chapters.map((chapter, index) => (
          <View key={index} style={styles.chapterContainer}>
            {chapter.title ? (
              <Text style={styles.chapterTitle}>{chapter.title}</Text>
            ) : null}
            <Text style={styles.chapterContent}>{chapter.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  author: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  progressContainer: {
    padding: 15,
    backgroundColor: "#FFF",
  },
  progressText: {
    textAlign: "center",
    marginBottom: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  chapterContainer: {
    marginBottom: 30,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  chapterContent: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    textAlign: "justify",
  },
});

// export default FB2Reader;

// import Slider from "@react-native-community/slider";
// import { useRouter } from "expo-router";
// import { ArrowLeft, Menu, Minimize, Settings } from "lucide-react-native";
// import React, { useRef, useState } from "react";
// import {
//   Animated,
//   Image,
//   ImageSourcePropType,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function ReaderScreen() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const paths: ImageSourcePropType = require("../../../assets/images/book_1.png");
//   const router = useRouter();

//   const [isBottomVisible, setIsBottomVisible] = useState(true);
//   const [activePanel, setActivePanel] = useState<"none" | "settings" | "toc">(
//     "none"
//   );

//   const bottomAnim = useRef(new Animated.Value(0)).current;

//   const toggleBottom = () => {
//     Animated.timing(bottomAnim, {
//       toValue: isBottomVisible ? 100 : 0,
//       duration: 250,
//       useNativeDriver: true,
//     }).start();
//     setIsBottomVisible(!isBottomVisible);
//     setActivePanel("none");
//   };

//   const openPanel = (type: "settings" | "toc") => {
//     if (activePanel === type) {
//       setActivePanel("none");
//     } else {
//       setActivePanel(type);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/*Header*/}
//       {isBottomVisible && (
//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.iconButton}
//             onPress={() => router.back()}
//           >
//             <ArrowLeft size={24} color="#D32F2F" />
//           </TouchableOpacity>
//           <View style={styles.headerText}>
//             <Text style={styles.title} numberOfLines={1}>
//               Буддизм в Японии
//             </Text>
//             <Text style={styles.author} numberOfLines={1}>
//               Т.П. Григорьева
//             </Text>
//           </View>
//         </View>
//       )}
//       {/*Book Cover*/}
//       <View style={styles.coverWrapper}>
//         <TouchableOpacity
//           onPress={() => {
//             setIsBottomVisible(true);
//           }}
//         >
//           <View style={styles.coverContainer}>
//             <Image source={paths} style={styles.cover} resizeMode="contain" />
//           </View>
//         </TouchableOpacity>
//       </View>
//       {/*Bottom Controls*/}
//       {isBottomVisible && (
//         <View style={styles.bottomControls}>
//           <Slider
//             style={styles.slider}
//             minimumValue={1}
//             maximumValue={100}
//             value={currentPage}
//             onValueChange={(value) => setCurrentPage(Math.floor(value))}
//             minimumTrackTintColor="#D32F2F"
//             maximumTrackTintColor="#E0E0E0"
//             thumbTintColor="#D32F2F"
//           />
//           {/*Page Counter*/}
//           <Text style={styles.pageColor}>{currentPage} из 100</Text>
//           {/*Toolbar*/}
//           <View style={styles.toolbar}>
//             <TouchableOpacity
//               style={styles.iconButton}
//               onPress={() => {
//                 setActivePanel("toc");
//               }}
//             >
//               <Menu size={24} color="#666" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.iconButton}>
//               <Settings
//                 size={24}
//                 color="#666"
//                 onPress={() => {
//                   setActivePanel("settings");
//                 }}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.iconButton}>
//               <Minimize
//                 size={24}
//                 color="#666"
//                 onPress={() => {
//                   setIsBottomVisible(!isBottomVisible);
//                 }}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {/* Settings panel*/}
//       {activePanel === "settings" && (
//         <Animated.View style={styles.panel}>
//           <Text style={styles.panelTitle}>Настройки шрифта</Text>
//           <View style={styles.panelRow}>
//             <TouchableOpacity style={styles.panelButton}>
//               <Text style={styles.panelText}>A-</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.panelButton}>
//               <Text style={styles.panelText}>A+</Text>
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity onPress={() => setActivePanel("none")}>
//             <Text style={styles.closeText}>Закрыть</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       )}
//       {/* TOC PANEL */}
//       {activePanel === "toc" && (
//         <Animated.View style={styles.panel}>
//           <Text style={styles.panelTitle}>Оглавление</Text>
//           <TouchableOpacity style={styles.panelItem}>
//             <Text>Введение</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.panelItem}>
//             <Text>Глава 1. Зарождение буддизма</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.panelItem}>
//             <Text>Глава 2. Распространение в Японии</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setActivePanel("none")}>
//             <Text style={styles.closeText}>Закрыть</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       )}
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   iconButton: {
//     padding: 8,
//   },
//   headerText: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   title: {
//     fontSize: 15,
//     fontWeight: "600",
//   },
//   author: {
//     fontSize: 13,
//     color: "#666",
//   },
//   panel: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     padding: 16,
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: -3 },
//     shadowRadius: 6,
//   },
//   panelTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
//   panelRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 10,
//   },
//   panelButton: {
//     backgroundColor: "#f0f0f0",
//     borderRadius: 8,
//     padding: 8,
//   },
//   panelText: { fontSize: 16 },
//   panelItem: { paddingVertical: 8 },
//   closeText: { textAlign: "center", color: "#D32F2F", marginTop: 8 },
//   coverWrapper: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     // padding: 16,
//   },
//   coverContainer: {
//     width: 280,
//     maxHeight: 350,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     // overflow: "hidden",
//     // elevation: 4,
//     // shadowColor: "#000",
//     // shadowOffset: { width: 0, height: 2 },
//     // shadowOpacity: 0.2,
//     // shadowRadius: 4,
//     // padding: 16,
//   },
//   cover: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 8,
//     // alignItems: "center",
//     // justifyContent: "center",
//     padding: 16,
//   },
//   bottomControls: {
//     backgroundColor: "#fff",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderTopColor: "#ccc",
//   },
//   slider: {
//     width: "100%",
//     height: 40,
//   },
//   pageColor: {
//     textAlign: "center",
//     marginVertical: 8,
//     fontSize: 13,
//     color: "#D32F2F",
//   },
//   toolbar: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     gap: 16,
//   },
// });
