import { EpubNode } from "@/scripts/types";
import { Reader, useReader, Themes } from "@epubjs-react-native/core";
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
import { TableOfContents } from "@/components/table-of-contents";
import {
  Animated,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Bookmark,
  Location,
  Section,
  Toc,
} from "@epubjs-react-native/core/lib/typescript/types";
import {
  availableFonts,
  MAX_FONT_SIZE,
  MIN_FONT_SIZE,
  themes,
} from "@/scripts/utils/utils";
import { useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { ReaderHeader } from "@/components/reader-header";
import { ReaderFooter } from "@/components/reader-footer";
import { BookmarksList } from "@/components/bookmark-list";
const url = "http:/10.0.2.2:5202/api/Book/book.epub";

const dest = new Directory(Paths.cache, "files");
const dbm: Bookmark[] = [];
export default function ReaderScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const {
    theme,
    changeFontSize,
    changeFontFamily,
    changeTheme,
    goToLocation,
    addBookmark,
    removeBookmark,
    bookmarks,
    isBookmarked,
    getCurrentLocation,
  } = useReader();

  const bookmarksListRef = useRef<BottomSheetModal>(null);
  const tableOfContentsRef = useRef<BottomSheetModal>(null);

  const [isFullScreen, setIsFullScreen] = useState(true);
  const [currentFontSize, setCurrentFontSize] = useState(16);
  const [currentFontFamily, setCurrentFontFamily] = useState(availableFonts[0]);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      console.log("I am here~~~");
      setIsFullScreen(!isFullScreen);
      // console.log(isFullScreen);
    });

  const increaseFontSize = () => {
    if (currentFontSize < MAX_FONT_SIZE) {
      setCurrentFontSize(currentFontSize + 1);
      changeFontSize(`${currentFontSize + 1}px`);
    }
  };

  const decreaseFontSize = () => {
    if (currentFontSize > MIN_FONT_SIZE) {
      setCurrentFontSize(currentFontSize - 1);
      changeFontSize(`${currentFontSize - 1}px`);
    }
  };

  const switchTheme = () => {
    const index = Object.values(themes).indexOf(theme);
    const nextTheme =
      Object.values(themes)[(index + 1) % Object.values(themes).length];
    changeTheme(nextTheme);
  };

  const switchFontFamily = () => {
    const index = availableFonts.indexOf(currentFontFamily);
    const nextFontFamily = availableFonts[(index + 1) % availableFonts.length];

    setCurrentFontFamily(nextFontFamily);
    changeFontFamily(nextFontFamily);
  };

  const paths: ImageSourcePropType = require("../../../assets/images/book_1.png");
  const router = useRouter();
  const [epubData, setEpubData] = useState<EpubNode[]>([]);
  const [activePanel, setActivePanel] = useState<"none" | "settings" | "toc">(
    "none"
  );
  const [epubAsset, setEpubAsset] = useState<string | null>(null);

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

  const bottomAnim = useRef(new Animated.Value(0)).current;

  if (epubAsset === null) {
    return <Text>Загрузка книги...</Text>;
  }
  const toggleBottom = () => {
    Animated.timing(bottomAnim, {
      toValue: isFullScreen ? 100 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setIsFullScreen(!isFullScreen);
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
    <GestureHandlerRootView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: theme.body.background,
      }}
    >
      {/* <GestureDetector gesture={doubleTap}> */}
      {/* <View style={{ flex: 1, height: !isFullScreen ? height * 0.75 : height }}> */}
      {/* {!isFullScreen && (
        <ReaderHeader author="Т.П. Григорьева" title="Буддизм в Японии" />
      )} */}
      <View
        style={{
          flex: 1,
        }}
      >
        <Reader
          src={epubAsset}
          fileSystem={useFileSystem}
          initialBookmarks={dbm}
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
          width={width}
          // height={!isFullScreen ? height * 0.75 : height}
          defaultTheme={Themes.LIGHT}
          waitForLocationsReady
          // onDoubleTap={() => {
          //   setIsFullScreen(!isFullScreen);
          //   console.log("Hello~~~");
          // }}
        />
      </View>
      <Pressable
        onPress={() => setIsFullScreen(!isFullScreen)}
        style={StyleSheet.absoluteFill}
      ></Pressable>
      {!isFullScreen && <ReaderHeader author="Author" title="Title" />}
      {!isFullScreen && (
        <ReaderFooter
          currentFontSize={currentFontSize}
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
          switchTheme={switchTheme}
          switchFontFamily={switchFontFamily}
          onOpenBookmarksList={() => {
            bookmarksListRef.current?.present();
            setIsFullScreen(!isFullScreen);
          }}
          onOpenTableOfContents={() => tableOfContentsRef.current?.present()}
        />
      )}
      <BookmarksList
        ref={bookmarksListRef}
        onClose={() => bookmarksListRef.current?.dismiss()}
      />
      <TableOfContents
        ref={tableOfContentsRef}
        onClose={() => tableOfContentsRef.current?.dismiss()}
        onPressSection={(selectedSection) => {
          goToLocation(selectedSection.href.split("/")[1]);
          tableOfContentsRef.current?.dismiss();
        }}
      />
      {/* </GestureDetector> */}
    </GestureHandlerRootView>
  );
}
// return (
//     <SafeAreaView style={styles.container}>
//       {/*Header*/}
//       {isFullScreen && (
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

//       <Reader
//         src={epubAsset}
//         // src={epubAsset}
//         fileSystem={useFileSystem}
//         initialBookmarks={dbm}
//         onAddBookmark={(bookmark) => {
//           console.log(bookmark);
//         }}
//         onRemoveBookmark={(bookmark) =>
//           console.log("onRemoveBookmark", bookmark)
//         }
//         onUpdateBookmark={(bookmark) =>
//           console.log("onUpdateBookmark", bookmark)
//         }
//         onChangeBookmarks={(bookmarks) =>
//           console.log("onChangeBookmarks", bookmarks)
//         }
//       />

//       <View style={styles.containerBottom}>
//         {/* <IconButton
//           icon="arrow-left"
//           size={22}
//           onPress={() => navigation.goBack()}
//         /> */}

//         <View style={styles.actions}>
//           <IconButton
//             icon={isBookmarked ? "bookmark" : "bookmark-outline"}
//             size={20}
//             animated
//             onPress={handleChangeBookmark}
//           />

//           {/* <IconButton
//             icon="format-list-bulleted-square"
//             size={20}
//             animated
//             onPress={onOpenBookmarksList}
//           /> */}
//         </View>
//       </View>
//       {/* <ChronoReader /> */}
//       {/* <PagedEpubViewer fragments={epubData} /> */}
//       {/*
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
//       </View> */}
//       {/*Bottom Controls*/}
//       {/* {isBottomVisible && (
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

//           <Text style={styles.pageColor}>{currentPage} из 100</Text>

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
//       */}

//       {/* {activePanel === "settings" && (
//         <Animated.View style={styles.panel}> */}
//       {/* Settings panel*/}
//       <Modal
//         animationType="slide"
//         visible={activePanel === "settings"}
//         presentationStyle="fullScreen"
//       >
//         <Text style={styles.panelTitle}>Настройки шрифта</Text>
//         <View style={styles.panelRow}>
//           <TouchableOpacity style={styles.panelButton}>
//             <Text style={styles.panelText}>A-</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.panelButton}>
//             <Text style={styles.panelText}>A+</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity onPress={() => setActivePanel("none")}>
//           <Text style={styles.closeText}>Закрыть</Text>
//         </TouchableOpacity>
//       </Modal>

//       <Modal
//         animationType="slide"
//         visible={activePanel === "toc"}
//         presentationStyle="fullScreen"
//       >
//         <Text style={styles.panelTitle}>Оглавление</Text>
//         <TouchableOpacity style={styles.panelItem}>
//           <Text>Введение</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.panelItem}>
//           <Text>Глава 1. Зарождение буддизма</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.panelItem}>
//           <Text>Глава 2. Распространение в Японии</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setActivePanel("none")}>
//           <Text style={styles.closeText}>Закрыть</Text>
//         </TouchableOpacity>
//       </Modal>
//     </SafeAreaView>
//   );
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

  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
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
