// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
//   // ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// // import * as FileSystem from "react-native-fs";
// import { Asset } from "expo-asset";
// import WebView, { WebViewMessageEvent } from "react-native-webview";
// const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
// // import { parseStringPromise } from "xml2js";
// interface BookData {
//   title: string;
//   author: string;
// }
// interface BookText {
//   title: string;
//   content: string;
// }

// interface HtmlPaginatorProps {
//   htmlContent: string;
//   customCss?: string;
//   onPageChange?: (currentPage: number, totalPages: number) => void;
// }

// interface PageState {
//   currentPage: number;
//   totalPages: number;
// }

// const HtmlPaginator: React.FC<HtmlPaginatorProps> = ({
//   htmlContent,
//   customCss = "",
//   onPageChange,
// }) => {
//   const webViewRef = useRef<WebView>(null);
//   const [pageState, setPageState] = useState<PageState>({
//     currentPage: 0,
//     totalPages: 1,
//   });

//   // CSS для пагинации и стилизации
//   const paginationCSS = `
//     <style>
//     * {
//         box-sizing: border-box;
//         margin: 0;
//         padding: 0;
//       }

//       body {
//         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//         line-height: 1.6;
//         color: #333;
//         padding: 0;
//         margin: 0;
//         overflow-x: hidden;
//       }
//         .page-container {
//         width: 100vw;
//         height: 100vh;
//         padding: 20px;
//         overflow: hidden;
//         position: relative;
//       }

//       .page-content {
//         width: 100%;
//         height: 100%;
//         overflow: hidden;
//       }

//       /* Стили для основных HTML элементов */
//       h1, h2, h3, h4, h5, h6 {
//         margin-bottom: 16px;
//         line-height: 1.3;
//       }
//         p {
//         margin-bottom: 12px;
//       }

//       ul, ol {
//         margin-bottom: 12px;
//         padding-left: 24px;
//       }

//       li {
//         margin-bottom: 4px;
//       }

//       a {
//         color: #007AFF;
//         text-decoration: none;
//       }

//       img {
//         max-width: 100%;
//         height: auto;
//       }
//         table {
//         width: 100%;
//         border-collapse: collapse;
//         margin-bottom: 12px;
//       }

//       th, td {
//         border: 1px solid #ddd;
//         padding: 8px;
//         text-align: left;
//       }

//       th {
//         background-color: #f5f5f5;
//       }
//         blockquote {
//         border-left: 4px solid #ddd;
//         padding-left: 16px;
//         margin: 16px 0;
//         color: #666;
//       }

//       code {
//         background-color: #f5f5f5;
//         padding: 2px 4px;
//         border-radius: 3px;
//         font-family: 'Courier New', monospace;
//       }

//       pre {
//         background-color: #f5f5f5;
//         padding: 12px;
//         border-radius: 4px;
//         overflow-x: auto;
//         margin-bottom: 12px;
//       }
//         ${customCss}
//     </style>
//   `;
//   const injectedJavaScript = `
//     (function() {
//       let currentPage = 0;
//       let totalPages = 0;
//       let pageHeight = window.innerHeight;

//       function calculatePages() {
//         const content = document.getElementById('content');
//         if (!content) return;

//         const contentHeight = content.scrollHeight;
//         totalPages = Math.ceil(contentHeight / pageHeight);
//         pageHeight = window.innerHeight;

//         updatePagination();
//         window.ReactNativeWebView.postMessage(
//           JSON.stringify({ type: 'pageCount', totalPages: totalPages })
//         );
//       }
//         function scrollToPage(pageIndex) {
//         if (pageIndex < 0 || pageIndex >= totalPages) return;

//         currentPage = pageIndex;
//         const scrollTop = pageIndex * pageHeight;
//         window.scrollTo({ top: scrollTop, behavior: 'smooth' });

//         updatePagination();
//         window.ReactNativeWebView.postMessage(
//           JSON.stringify({ type: 'pageChange', currentPage: currentPage, totalPages: totalPages })
//         );
//       }

//       function updatePagination() {
//         const indicator = document.getElementById('page-indicator');
//         if (indicator) {
//           indicator.textContent = \`Страница \${currentPage + 1} из \${totalPages}\`;
//         }
//       }
//         // Инициализация
//       window.calculatePages = calculatePages;
//       window.scrollToPage = scrollToPage;

//       setTimeout(() => {
//         calculatePages();
//         // Скрываем индикатор через 3 секунды
//         setTimeout(() => {
//           const indicator = document.getElementById('page-indicator');
//           if (indicator) {
//             indicator.style.opacity = '0';
//           }
//         }, 3000);
//       }, 100);

//       // Обработчик изменения размера
//       window.addEventListener('resize', calculatePages);

//       // Предоставляем функции глобально
//       window.HtmlPaginator = {
//         scrollToPage,
//         calculatePages
//       };

//       true;
//     })();
//   `;
//   const htmlWithPagination = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
//         ${paginationCSS}
//       </head>
//       <body>
//         <div class="page-container">
//           <div id="content" class="page-content">
//             ${htmlContent}
//           </div>
//         </div>

//         <div id="page-indicator" style="
//         position: fixed;
//           top: 20px;
//           right: 20px;
//           background: rgba(0,0,0,0.7);
//           color: white;
//           padding: 8px 12px;
//           border-radius: 16px;
//           font-size: 14px;
//           z-index: 1000;
//           transition: opacity 0.3s;
//         ">Загрузка...</div>

//         <script>
//           ${injectedJavaScript}
//         </script>
//       </body>
//     </html>
//   `;
//   const handleMessage = useCallback(
//     (event: WebViewMessageEvent) => {
//       try {
//         const data = JSON.parse(event.nativeEvent.data);

//         switch (data.type) {
//           case "pageCount":
//             setPageState((prev) => ({
//               ...prev,
//               totalPages: data.totalPages,
//             }));
//             if (onPageChange) {
//               onPageChange(pageState.currentPage, data.totalPages);
//             }
//             break;
//           case "pageChange":
//             setPageState({
//               currentPage: data.currentPage,
//               totalPages: data.totalPages,
//             });
//             if (onPageChange) {
//               onPageChange(data.currentPage, data.totalPages);
//             }
//             break;

//           default:
//             break;
//         }
//       } catch (error) {
//         console.error("Error parsing WebView message:", error);
//       }
//     },
//     [onPageChange, pageState.currentPage]
//   );
//   const goToPage = useCallback(
//     (pageIndex: number) => {
//       if (pageIndex < 0 || pageIndex >= pageState.totalPages) return;

//       webViewRef.current?.injectJavaScript(`
//       window.scrollToPage(${pageIndex});
//     `);
//     },
//     [pageState.totalPages]
//   );

//   const goToNextPage = useCallback(() => {
//     if (pageState.currentPage < pageState.totalPages - 1) {
//       goToPage(pageState.currentPage + 1);
//     }
//   }, [pageState.currentPage, pageState.totalPages, goToPage]);

//   const goToPrevPage = useCallback(() => {
//     if (pageState.currentPage > 0) {
//       goToPage(pageState.currentPage - 1);
//     }
//   }, [pageState.currentPage, goToPage]);
//   const handleWebViewError = useCallback((syntheticEvent: any) => {
//     const { nativeEvent } = syntheticEvent;
//     console.error("WebView error:", nativeEvent);
//     Alert.alert("Ошибка", "Не удалось загрузить содержимое");
//   }, []);

//   return (
//     <View style={styles.container}>
//       <WebView
//         ref={webViewRef}
//         source={{ html: htmlWithPagination }}
//         style={styles.webview}
//         onMessage={handleMessage}
//         onError={handleWebViewError}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//         startInLoadingState={true}
//         scalesPageToFit={true}
//         // mixedContentMode="compatible"
//       />
//       <View style={styles.controls}>
//         <TouchableOpacity
//           style={[
//             styles.button,
//             pageState.currentPage === 0 && styles.disabledButton,
//           ]}
//           onPress={goToPrevPage}
//           disabled={pageState.currentPage === 0}
//         >
//           <Text style={styles.buttonText}>← Назад</Text>
//         </TouchableOpacity>

//         <Text style={styles.pageIndicator}>
//           {pageState.currentPage + 1} / {pageState.totalPages}
//         </Text>
//         <TouchableOpacity
//           style={[
//             styles.button,
//             pageState.currentPage >= pageState.totalPages - 1 &&
//               styles.disabledButton,
//           ]}
//           onPress={goToNextPage}
//           disabled={pageState.currentPage >= pageState.totalPages - 1}
//         >
//           <Text style={styles.buttonText}>Вперед →</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export async function parseStringPromise(xmlString: string): Promise<any> {
//   // Удаляем возможные BOM и пробелы
//   const cleaned = xmlString.replace(/^[\uFEFF\xEF\xBB\xBF]/, "").trim();

//   // Попробуем использовать DOMParser, если он есть (на Web)
//   // if (typeof DOMParser !== "undefined") {
//   //   const parser = new DOMParser();
//   //   const xml = parser.parseFromString(cleaned, "text/xml");
//   //   return xmlToJson(xml);
//   // }

//   // Если в RN, то используем простейший regex-парсер
//   return simpleXMLToJSON(cleaned);
// }

// function simpleXMLToJSON(xml: string): any {
//   const tagPattern = /<([^!?][^>\s]*)(.*?)>(.*?)<\/\1>/gs;
//   const result: any = {};

//   // Функция для рекурсивного разбора
//   const parseNode = (text: string): any => {
//     const matches = [...text.matchAll(tagPattern)];
//     if (matches.length === 0) return text.trim();

//     const obj: any = {};
//     for (const match of matches) {
//       const [, tagName, _attrs, inner] = match;
//       const parsed = parseNode(inner);
//       if (obj[tagName]) {
//         if (!Array.isArray(obj[tagName])) obj[tagName] = [obj[tagName]];
//         obj[tagName].push(parsed);
//       } else {
//         obj[tagName] = parsed;
//       }
//     }
//     return obj;
//   };

//   return parseNode(xml);
// }

// export default function ReaderScreen() {
//   const [bookData, setBookData] = useState<BookData | null>(null);
//   const [currentPosition, setCurrentPosition] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [chapters, setChapters] = useState<BookText[]>([]);
//   const scrollViewRef = useRef(null);

//   // Загрузка и парсинг FB2 файла
//   useEffect(() => {
//     loadBook();
//   }, []);
//   const htmlContent = `
//     <h1>Пример HTML документа</h1>
//     <p>Это полноценный HTML документ с различными элементами:</p>

//     <h2>Список</h2>
//     <ul>
//       <li>Элемент списка 1</li>
//       <li>Элемент списка 2</li>
//       <li>Элемент списка 3</li>
//     </ul>

//     <h2>Таблица</h2>
//     <table>
//       <tr>
//         <th>Заголовок 1</th>
//         <th>Заголовок 2</th>
//       </tr>
//       <tr>
//         <td>Данные 1</td>
//         <td>Данные 2</td>
//       </tr>
//     </table>

//     <h2>Код</h2>
//     <pre><code>function example() {
//   return "Hello World!";
// }</code></pre>

//     <p>Добавьте больше контента чтобы увидеть пагинацию...</p>
//   `;
//   const customCss = `
//     body {
//       font-size: 18px;
//       line-height: 1.8;
//     }

//     h1 {
//       color: #2c3e50;
//       border-bottom: 2px solid #3498db;
//       padding-bottom: 10px;
//     }

//     h2 {
//       color: #34495e;
//       margin-top: 24px;
//     }

//     .page-container {
//       padding: 24px;
//       background-color: #fafafa;
//     }
//   `;

//   const handlePageChange = (currentPage: number, totalPages: number) => {
//     console.log(
//       `Текущая страница: ${currentPage + 1}, Всего страниц: ${totalPages}`
//     );
//   };
//   const loadBook = async () => {
//     try {
//       // 1️⃣ Загружаем файл из assets
//       const asset = Asset.fromModule(
//         require("../../../assets/books/chapter_001.html")
//       );

//       await asset.downloadAsync();
//       const fileUri = asset.localUri || asset.uri;

//       // 2️⃣ Читаем содержимое файла как текст (UTF-8)
//       // const fb2Content = await FileSystem.readAsStringAsync(fileUri, {
//       //   encoding: FileSystem.EncodingType.UTF8,
//       // });

//       // // 3️⃣ Парсим XML
//       // const result = await parseStringPromise(fb2Content);

//       // // 4️⃣ Извлекаем метаданные
//       // const description = result.FictionBook?.description?.[0];
//       // const title =
//       //   description?.["title-info"]?.[0]?.["book-title"]?.[0] || "Без названия";
//       // const authorData =
//       //   description?.["title-info"]?.[0]?.author?.[0] || undefined;
//       // const authorName =
//       //   authorData?.["first-name"]?.[0] +
//       //     " " +
//       //     authorData?.["last-name"]?.[0] || "Неизвестный автор";

//       // // 5️⃣ Извлекаем текст (body/section)
//       // const body = result.FictionBook?.body?.[0];
//       // const sections = body?.section || [];
//       // const parsedChapters: BookText[] = sections.map((sec: any) => {
//       //   const title = sec.title?.[0]?.p?.[0] || "";
//       //   const paragraphs = (sec.p || [])
//       //     .map((p: any) => (typeof p === "string" ? p : p?._ || ""))
//       //     .filter((t: string) => t.trim().length > 0);

//       //   return {
//       //     title,
//       //     content: paragraphs.join("\n\n"),
//       //   };
//       // });

//       setBookData({ title: fileUri, author: fileUri });
//       // setChapters(parsedChapters);
//     } catch (error) {
//       console.error("Ошибка загрузки книги:", error);
//     }

//     // try {
//     //   // 1. Загрузка файла из assets
//     //   const filePath = `../../../assets/books/frolovBook.fb2`;
//     //   // 2. Чтение файла
//     //   const base64Content = await FileSystem.readAsStringAsync(
//     //     filePath,
//     //     "base64"
//     //   );
//     //   const binaryData = Buffer.from(base64Content, "base64").toString(
//     //     "binary"
//     //   );
//     //   // 3. Парсинг XML
//     //   const parser = new DOMParser();
//     //   const xmlDoc = parser.parseFromString(binaryData, "text/xml");
//     //   // 4. Извлечение заголовка и автора
//     //   const title =
//     //     xmlDoc.getElementsByTagName("book-title")[0]?.textContent ||
//     //     "Неизвестно";
//     //   const author =
//     //     xmlDoc.getElementsByTagName("author")[0]?.textContent || "Неизвестно";
//     //   // 5. Извлечение содержимого
//     //   const body = xmlDoc.getElementsByTagName("body")[0];
//     //   const sections = Array.from(body.getElementsByTagName("section"));
//     //   const parsedChapters = sections.map((section) => {
//     //     const title =
//     //       section.getElementsByTagName("title")[0]?.textContent || "";
//     //     const paragraphs = Array.from(section.getElementsByTagName("p"))
//     //       .map((p) => p.textContent)
//     //       .filter((text) => text.trim().length > 0);
//     //     return { title, content: paragraphs.join("\n\n") };
//     //   });
//     //   setBookData({ title, author });
//     //   setChapters(parsedChapters);
//     // } catch (error) {
//     //   console.error("Ошибка загрузки книги:", error);
//     // }
//   };

//   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
//     const scrollProgress =
//       contentOffset.y / (contentSize.height - layoutMeasurement.height);
//     setCurrentPosition(contentOffset.y);
//     setProgress(scrollProgress);
//   };

//   const handleSliderChange = (value: number) => {
//     if (scrollViewRef.current) {
//       const scrollHeight = chapters.length * Dimensions.get("window").height;
//       const scrollTo = value * scrollHeight;
//       // scrollViewRef.current.scrollTo({ y: scrollTo, animated: false });
//       setProgress(value);
//     }
//   };

//   if (!bookData) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator size="large" />
//         <Text>Загрузка книги...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Заголовок */}
//       {/* <View style={styles.header}>
//         <Text style={styles.title}>{bookData.title}</Text>
//         <Text style={styles.author}>{bookData.author}</Text>
//       </View>

//       <View style={styles.progressContainer}>
//         <Text style={styles.progressText}>
//           Прогресс: {Math.round(progress * 100)}%
//         </Text>
//         <Slider
//           style={styles.slider}
//           minimumValue={0}
//           maximumValue={1}
//           value={progress}
//           onValueChange={handleSliderChange}
//           minimumTrackTintColor="#1EB1FC"
//           maximumTrackTintColor="#000000"
//         />
//       </View> */}

//       {/* Содержимое книги */}
//       {/* <ScrollView
//         ref={scrollViewRef}
//         style={styles.contentContainer}
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//         showsVerticalScrollIndicator={false}
//       >
//         {chapters.map((chapter, index) => (
//           <View key={index} style={styles.chapterContainer}>
//             {chapter.title ? (
//               <Text style={styles.chapterTitle}>{chapter.title}</Text>
//             ) : null}
//             <Text style={styles.chapterContent}>{chapter.content}</Text>
//           </View>
//         ))}
//       </ScrollView> */}
//       <SafeAreaView style={{ flex: 1 }}>
//         <HtmlPaginator
//           htmlContent={htmlContent}
//           customCss={customCss}
//           onPageChange={handlePageChange}
//         />
//       </SafeAreaView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//     paddingTop: 50,
//   },
//   button: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: "#007AFF",
//     borderRadius: 8,
//     minWidth: 100,
//     alignItems: "center",
//   },
//   disabledButton: {
//     backgroundColor: "#cccccc",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   pageIndicator: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   header: {
//     alignItems: "center",
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E0E0E0",
//   },
//   webview: {
//     flex: 1,
//     width: screenWidth,
//   },
//   controls: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderTopColor: "#e0e0e0",
//     backgroundColor: "#f8f8f8",
//     minHeight: 60,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   author: {
//     fontSize: 16,
//     color: "#666",
//     marginTop: 5,
//   },
//   progressContainer: {
//     padding: 15,
//     backgroundColor: "#FFF",
//   },
//   progressText: {
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   slider: {
//     width: "100%",
//     height: 40,
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 15,
//   },
//   chapterContainer: {
//     marginBottom: 30,
//   },
//   chapterTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 15,
//     color: "#333",
//   },
//   chapterContent: {
//     fontSize: 16,
//     lineHeight: 24,
//     color: "#444",
//     textAlign: "justify",
//   },
// });

// export default FB2Reader;

import { EpubNode } from "@/scripts/types";
import { Reader, useReader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import Slider from "@react-native-community/slider";
import { Directory, File, Paths } from "expo-file-system";
import { useRouter } from "expo-router";
import { IconButton } from "react-native-paper";
import {
  ArrowLeft,
  Menu,
  Minimize,
  Settings,
  AArrowDown,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ImageSourcePropType,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const url = "http:/10.0.2.2:5202/api/Book/book.epub";

const dest = new Directory(Paths.cache, "files");

export default function ReaderScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const paths: ImageSourcePropType = require("../../../assets/images/book_1.png");
  const router = useRouter();
  const [epubData, setEpubData] = useState<EpubNode[]>([]);
  const [isBottomVisible, setIsBottomVisible] = useState(true);
  const [activePanel, setActivePanel] = useState<"none" | "settings" | "toc">(
    "none"
  );
  const [epubAsset, setEpubAsset] = useState<string | null>(null);
  const { goToLocation } = useReader();
  const {
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
    getCurrentLocation,
  } = useReader();
  const handleChangeBookmark = () => {
    const location = getCurrentLocation();

    if (!location) return;

    if (isBookmarked) {
      const bookmark = bookmarks.find(
        (item) =>
          item.location.start.cfi === location?.start.cfi &&
          item.location.end.cfi === location?.end.cfi
      );

      if (!bookmark) return;
      removeBookmark(bookmark);
    } else addBookmark(location);
  };
  useEffect(() => {
    const funcLoad = async () => {
      try {
        if (dest.exists) dest.delete();
        dest.create();
        const output = await File.downloadFileAsync(url, dest);
        console.log(output.exists);
        console.log(output.uri);
        const res = output.base64Sync();
        setEpubAsset(res);
      } catch (error) {
        console.error(error);
      }
    };
    funcLoad();
  }, []);
  // useEffect(() => {
  //   // setEpubData(bookData as EpubNode[]);
  // }, []);
  const bottomAnim = useRef(new Animated.Value(0)).current;
  // useEffect(() => {
  //   const loadBook = async () => {
  //     try {
  //       const base64 = await loadEpubAsBase64();
  //       setEpubAsset(base64);
  //     } catch (error) {
  //       console.error("Failed to load book:", error);
  //     } finally {
  //       // setLoading(false);
  //     }
  //   };

  //   loadBook();
  // }, []);

  if (epubAsset === null) {
    return <Text>Загрузка книги...</Text>;
  }
  const toggleBottom = () => {
    Animated.timing(bottomAnim, {
      toValue: isBottomVisible ? 100 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setIsBottomVisible(!isBottomVisible);
    setActivePanel("none");
  };

  const openPanel = (type: "settings" | "toc") => {
    if (activePanel === type) {
      setActivePanel("none");
    } else {
      setActivePanel(type);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*Header*/}
      {isBottomVisible && (
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#D32F2F" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title} numberOfLines={1}>
              Буддизм в Японии
            </Text>
            <Text style={styles.author} numberOfLines={1}>
              Т.П. Григорьева
            </Text>
          </View>
        </View>
      )}

      <Reader
        src={epubAsset}
        // src={epubAsset}
        fileSystem={useFileSystem}
        onAddBookmark={(bookmark) => {
          console.log(bookmark);
        }}
        onRemoveBookmark={(bookmark) =>
          console.log("onRemoveBookmark", bookmark)
        }
        onUpdateBookmark={(bookmark) =>
          console.log("onUpdateBookmark", bookmark)
        }
        onChangeBookmarks={(bookmarks) =>
          console.log("onChangeBookmarks", bookmarks)
        }
      />

      <View style={styles.containerBottom}>
        {/* <IconButton
          icon="arrow-left"
          size={22}
          onPress={() => navigation.goBack()}
        /> */}

        <View style={styles.actions}>
          <IconButton
            icon={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={20}
            animated
            onPress={handleChangeBookmark}
          />

          {/* <IconButton
            icon="format-list-bulleted-square"
            size={20}
            animated
            onPress={onOpenBookmarksList}
          /> */}
        </View>
      </View>
      {/* <ChronoReader /> */}
      {/* <PagedEpubViewer fragments={epubData} /> */}
      {/*
      <View style={styles.coverWrapper}>
        <TouchableOpacity
          onPress={() => {
            setIsBottomVisible(true);
          }}
        >
          <View style={styles.coverContainer}>
            <Image source={paths} style={styles.cover} resizeMode="contain" />
          </View>
        </TouchableOpacity>
      </View> */}
      {/*Bottom Controls*/}
      {/* {isBottomVisible && (
        <View style={styles.bottomControls}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={100}
            value={currentPage}
            onValueChange={(value) => setCurrentPage(Math.floor(value))}
            minimumTrackTintColor="#D32F2F"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#D32F2F"
          />
       
          <Text style={styles.pageColor}>{currentPage} из 100</Text>
       
          <View style={styles.toolbar}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                setActivePanel("toc");
              }}
            >
              <Menu size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Settings
                size={24}
                color="#666"
                onPress={() => {
                  setActivePanel("settings");
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Minimize
                size={24}
                color="#666"
                onPress={() => {
                  setIsBottomVisible(!isBottomVisible);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )} 
      */}

      {/* {activePanel === "settings" && (
        <Animated.View style={styles.panel}> */}
      {/* Settings panel*/}
      <Modal
        animationType="slide"
        visible={activePanel === "settings"}
        presentationStyle="fullScreen"
      >
        <Text style={styles.panelTitle}>Настройки шрифта</Text>
        <View style={styles.panelRow}>
          <TouchableOpacity style={styles.panelButton}>
            <Text style={styles.panelText}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton}>
            <Text style={styles.panelText}>A+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setActivePanel("none")}>
          <Text style={styles.closeText}>Закрыть</Text>
        </TouchableOpacity>
      </Modal>

      {/* </Animated.View>
      )} */}
      {/* TOC PANEL */}
      {/* {activePanel === "toc" && (
        <Animated.View style={styles.panel}> */}
      <Modal
        animationType="slide"
        visible={activePanel === "toc"}
        presentationStyle="fullScreen"
      >
        <Text style={styles.panelTitle}>Оглавление</Text>
        <TouchableOpacity style={styles.panelItem}>
          <Text>Введение</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelItem}>
          <Text>Глава 1. Зарождение буддизма</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelItem}>
          <Text>Глава 2. Распространение в Японии</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActivePanel("none")}>
          <Text style={styles.closeText}>Закрыть</Text>
        </TouchableOpacity>
      </Modal>

      {/* </Animated.View>
      )} */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  containerBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  iconButton: {
    padding: 8,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  author: {
    fontSize: 13,
    color: "#666",
  },
  panel: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
  },
  panelTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  panelRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  panelButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 8,
  },
  panelText: { fontSize: 16 },
  panelItem: { paddingVertical: 8 },
  closeText: { textAlign: "center", color: "#D32F2F", marginTop: 8 },
  coverWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 16,
  },
  coverContainer: {
    width: 280,
    maxHeight: 350,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    // overflow: "hidden",
    // elevation: 4,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // padding: 16,
  },
  cover: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 16,
  },
  bottomControls: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  pageColor: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 13,
    color: "#D32F2F",
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
});
