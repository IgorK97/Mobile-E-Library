import { Reader, useReader, Themes } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { Directory, File, Paths } from "expo-file-system";
import React, { useEffect, useRef, useState } from "react";
import { TableOfContents } from "@/src/components/toc/table-of-contents";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import "@/src/i18n";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Bookmark } from "@epubjs-react-native/core/lib/typescript/types";
import {
  availableFonts,
  MAX_FONT_SIZE,
  MIN_FONT_SIZE,
  themes,
} from "@/src/constants/reader-theme";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ReaderHeader } from "@/src/components/reader/reader-header";
import { ReaderFooter } from "@/src/components/reader/reader-footer";
import { BookmarksList } from "@/src/components/bookmarks/bookmark-list";

const url = process.env.EXPO_PUBLIC_API_BASE_DEV_URL + "/api/Book/book.epub";

const dest = new Directory(Paths.cache, "files");
const dbm: Bookmark[] = [];
export default function ReaderScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { theme, changeFontSize, changeFontFamily, changeTheme, goToLocation } =
    useReader();

  const bookmarksListRef = useRef<BottomSheetModal>(null);
  const tableOfContentsRef = useRef<BottomSheetModal>(null);

  const [isFullScreen, setIsFullScreen] = useState(true);
  const [currentFontSize, setCurrentFontSize] = useState(16);
  const [currentFontFamily, setCurrentFontFamily] = useState(availableFonts[0]);

  // const doubleTap = Gesture.Tap()
  //   .numberOfTaps(2)
  //   .onStart(() => {
  //     console.log("I am here~~~");
  //     setIsFullScreen(!isFullScreen);
  //     // console.log(isFullScreen);
  //   });

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
      {!isFullScreen && <ReaderHeader author="Автор" title="Название книги" />}
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
}
