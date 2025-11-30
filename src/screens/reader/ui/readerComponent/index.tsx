import { Reader, useReader, Themes } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
// import { Directory, Paths } from "expo-file-system";
// import * as FileSystem from "expo-file-system/legacy";
import React, { useEffect, useRef, useState } from "react";
import { TableOfContents } from "@/src/screens/reader/ui/toc";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import "@/src/shared/i18n";
import { booksClient } from "@/src/shared/api/booksApi";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Bookmark,
  Location,
  Section,
} from "@epubjs-react-native/core/lib/typescript/types";
import {
  availableFonts,
  MAX_FONT_SIZE,
  MIN_FONT_SIZE,
  themes,
} from "@/src/shared/lib/constants/reader-theme";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ReaderHeader } from "@/src/screens/reader/ui/header";
import { ReaderFooter } from "@/src/screens/reader/ui/footer";
import { BookmarksList } from "@/src/screens/reader/ui/bookmarks";
import {
  AddBookmarkCommand,
  BookListItem,
  BookmarkDetails,
} from "@/src/shared/types/types";
import { BookService } from "@/src/shared/services/BookService";
import { useBookFile } from "@/src/shared/lib/hooks/use-books";
import * as FileSystem from "expo-file-system/legacy";
import { FileSystemService } from "@/src/shared/services/FileSystemService";
import { useStore } from "@/src/shared/lib/store/globalStore";
import { bookmarksClient } from "@/src/shared/api/bookmarksApi";
// import { useLocalSearchParams } from "expo-router";

// const dest = new Directory(Paths.cache, "files");
interface CSharpBookmark {
  Id: number; // Используем number для Id в TypeScript
  Mark: string; // Строка JSON: '{"location":"...", "section":...}'
  СreatedAt: Date; // На клиенте это может быть Date или строка ISO
}
interface MarkData {
  location: Location;
  section: Section;
}
// let dbm: Bookmark[] = [];

interface ReaderProps {
  onNavigate: () => void;
  // bookContent: string;
  bookId: number;
}

export const ReaderComponent = ({ onNavigate, bookId }: ReaderProps) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { currentBook } = useStore();
  const [booMarks, setBooMarks] = useState<Bookmark[]>([]);

  // const { file, fileName, loading } = useBookFile(bookId);

  // const { id } = useLocalSearchParams();

  const {
    theme,
    changeFontSize,
    changeFontFamily,
    changeTheme,
    goToLocation,
    currentLocation,
  } = useReader();

  const bookmarksListRef = useRef<BottomSheetModal>(null);
  const tableOfContentsRef = useRef<BottomSheetModal>(null);

  const [isFullScreen, setIsFullScreen] = useState(true);
  const [currentFontSize, setCurrentFontSize] = useState(16);
  const [currentFontFamily, setCurrentFontFamily] = useState(availableFonts[0]);
  useEffect(() => {
    if (!currentBook) return;
    async function loadBookmakrs() {
      const bookmarksFromDb: BookmarkDetails[] = await bookmarksClient.getAll(
        currentBook?.id || 1,
        1
      );
      const dbm = bookmarksFromDb.map((bm): Bookmark => {
        const markData: MarkData = JSON.parse(bm.mark);
        return {
          id: bm.id,
          location: markData.location,
          section: markData.section,
          text: bm.text,
        };
      });
      setBooMarks(dbm);
    }
    loadBookmakrs();
  }, []);
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

  const onNavigateBack = () => {
    booksClient.updateReadingProgress({
      userId: 1,
      bookId: bookId,
      readingProgress: currentLocation?.start.percentage ?? 0,
    });
    onNavigate();
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
  const [epubAsset, setEpubAsset] = useState<string | null>(null);
  // const blobToBase64 = (blob: Blob): Promise<string> =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onerror = reject;
  //     reader.onload = () => resolve(reader.result as string);
  //     reader.readAsDataURL(blob);
  //   });
  // useEffect(() => {
  //   // if (!file) return;
  //   // console.log("tutu");
  //   // const convert = async () => {
  //   //   const base64 = await blobToBase64(file);
  //   //   setEpubAsset(base64);
  //   // };

  //   // convert();
  //   if (!file) return;

  //   const saveAndOpen = async () => {
  //     try {
  //       // 1. Конвертируем Blob в Base64 (как и раньше)
  //       const dataUri = await blobToBase64(file);

  //       // 2. Очищаем от префикса, чтобы получить чистые данные для записи
  //       const pureBase64 = dataUri.split(",")[1];

  //       // 3. Формируем путь куда сохранить (например, в папку кэша или документов)
  //       // Генерируем имя файла (можно взять из headers, если передали, или просто random)
  //       const fileUri = FileSystem.documentDirectory + "temp_book.epub";

  //       // 4. Записываем файл на диск
  //       await FileSystem.writeAsStringAsync(fileUri, pureBase64, {
  //         encoding: FileSystem.EncodingType.Base64,
  //       });

  //       console.log("Книга сохранена по пути:", fileUri);

  //       // 5. Передаем путь к файлу (URI) в читалку
  //       // Многие читалки (например, epubjs-rn) отлично принимают URI
  //       setEpubAsset(fileUri);
  //     } catch (e) {
  //       console.error("Ошибка сохранения файла:", e);
  //     }
  //   };

  //   saveAndOpen();
  // }, [file]);
  useEffect(() => {
    const funcLoad = async () => {
      try {
        // const b: Book = {
        //   id: 1,
        //   title: "Буддизм в Японии",
        //   author: "Т.П. Григорьева",
        //   rating: 4.5,
        //   reviewCount: 10,
        //   pages: 704,
        //   year: 1993,
        //   description:
        //     "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
        //   imageUrl: require("@assets/images/book_1.png"),
        //   genres: [
        //     "Философия",
        //     "Культурология",
        //     "Религия",
        //     "Буддизм",
        //     "Восток",
        //     "Япония",
        //   ],
        //   imageBase64: "array64",
        // };

        const url = process.env.EXPO_PUBLIC_BASE_DEV_URL + "/api/Books/1/read";

        // const output = await BookService.saveToStorage(b, url);
        // await BookService.saveMeta(b);
        const output = await FileSystemService.downloadBookToStorage(
          "myepub",
          url
        );

        const res = await output.base64();
        console.log(output.uri);

        setEpubAsset(res);
      } catch (error) {
        console.error(error);
      }
    };
    funcLoad();
  }, []);

  if (epubAsset === null) {
    return <Text>Загрузка...</Text>;
  }

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
      <View
        style={{
          flex: 1,
        }}
      >
        <Reader
          src={epubAsset}
          fileSystem={useFileSystem}
          initialBookmarks={booMarks}
          onAddBookmark={async (bookmark) => {
            // console.log(bookmark);
            const addingBookmarkData = {
              location: bookmark.location,
              section: bookmark.section,
            };
            await bookmarksClient.add({
              userId: 1,
              bookId: currentBook?.id,
              mark: JSON.stringify(addingBookmarkData),
              text: bookmark.text,
            } as AddBookmarkCommand); //What if it did not save changes???
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
          defaultTheme={Themes.LIGHT}
          waitForLocationsReady
          onWebViewMessage={(message) => {
            if (message.type === "onCfiFromPercentage") {
              goToLocation(message.cfi);
            }
          }}
        />
      </View>
      <Pressable
        onPress={() => setIsFullScreen(!isFullScreen)}
        style={StyleSheet.absoluteFill}
      ></Pressable>
      {!isFullScreen && (
        <ReaderHeader
          author="Автор"
          title="Название книги"
          onNavigate={onNavigateBack}
        />
      )}
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
          onOpenTableOfContents={() => {
            tableOfContentsRef.current?.present();
            setIsFullScreen(!isFullScreen);
          }}
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
    </GestureHandlerRootView>
  );
};
