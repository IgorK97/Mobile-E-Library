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

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Bookmark } from "@epubjs-react-native/core/lib/typescript/types";
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
import { Book } from "@/src/shared/types/types";
import { BookService } from "@/src/shared/services/BookService";
// import { useLocalSearchParams } from "expo-router";

// const dest = new Directory(Paths.cache, "files");
const dbm: Bookmark[] = [];

interface ReaderProps {
  onNavigate: () => void;
  // bookContent: string;
  bookId: number;
}

export const ReaderComponent = ({ onNavigate, bookId }: ReaderProps) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  // const { id } = useLocalSearchParams();

  const { theme, changeFontSize, changeFontFamily, changeTheme, goToLocation } =
    useReader();

  const bookmarksListRef = useRef<BottomSheetModal>(null);
  const tableOfContentsRef = useRef<BottomSheetModal>(null);

  const [isFullScreen, setIsFullScreen] = useState(true);
  const [currentFontSize, setCurrentFontSize] = useState(16);
  const [currentFontFamily, setCurrentFontFamily] = useState(availableFonts[0]);

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
  const [epubAsset, setEpubAsset] = useState<string | null>(null);
  useEffect(() => {
    const funcLoad = async () => {
      try {
        const b: Book = {
          id: 1,
          title: "Буддизм в Японии",
          author: "Т.П. Григорьева",
          rating: 4.5,
          reviewCount: 10,
          pages: 704,
          year: 1993,
          description:
            "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
          imageUrl: require("@assets/images/book_1.png"),
          genres: [
            "Философия",
            "Культурология",
            "Религия",
            "Буддизм",
            "Восток",
            "Япония",
          ],
          imageBase64: "array64",
        };

        const url =
          process.env.EXPO_PUBLIC_BASE_DEV_URL + "/api/Book/book.epub";

        const output = await BookService.saveToStorage(b, url);
        await BookService.saveMeta(b);
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
    return <Text>...</Text>;
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
          onNavigate={onNavigate}
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
