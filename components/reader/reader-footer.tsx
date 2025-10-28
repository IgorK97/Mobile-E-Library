import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { useReader } from "@epubjs-react-native/core";
import { IconButton, MD3Colors, Text } from "react-native-paper";
import {
  MAX_FONT_SIZE,
  MIN_FONT_SIZE,
  resolveTheme,
} from "@/constants/reader-theme";

import Slider from "@react-native-community/slider";
import { useDebounceCallback } from "usehooks-ts";

interface Props {
  currentFontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  switchTheme: () => void;
  switchFontFamily: () => void;
  onOpenBookmarksList: () => void;
  onOpenTableOfContents: () => void;
}

export function ReaderFooter({
  currentFontSize,
  increaseFontSize,
  decreaseFontSize,
  switchTheme,
  switchFontFamily,
  onOpenBookmarksList,
  onOpenTableOfContents,
}: Props) {
  const [showSettings, setShowSettings] = useState(false);
  const {
    theme,
    bookmarks,
    addBookmark,
    removeBookmark,
    getCurrentLocation,
    isBookmarked,
    totalLocations,
    injectJavascript,
    currentLocation,
  } = useReader();
  // const [sliderValue, setSliderValue] = useState(
  //   (currentLocation?.start.percentage || 0) * 100
  // );
  const colors = resolveTheme(theme);

  const debounced = useDebounceCallback((percentage) => {
    injectJavascript(`
        try{
            const cfi = book.locations.cfiFromPercentage(${percentage}/100);
            window.ReactNativeWebView.postMessage(JSON.stringify({type:"onCfiFromPercentage", cfi})); true
        } catch(error){
            alert(error?.message);
        }`);
  }, 1000);
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
  return (
    <View
      style={{
        ...styles.footer,
        backgroundColor: colors?.background,
      }}
    >
      <Text variant="labelMedium" style={styles.currentPercentage}>
        Прогресс чтения:{" "}
        {((currentLocation?.start.percentage || 0) * 100).toFixed(0)}%
      </Text>
      <View style={styles.row}>
        <Text variant="labelMedium">0%</Text>

        <Slider
          style={styles.slider}
          disabled={totalLocations === 0}
          value={(currentLocation?.start.percentage || 0) * 100}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#c0c0c0"
          maximumTrackTintColor="#000000"
          step={1}
          thumbTintColor="#D32F2F"
          tapToSeek
          onValueChange={(percentage) => debounced(percentage)}
        />

        <Text variant="labelMedium">100%</Text>
      </View>
      <View style={styles.actions}>
        {showSettings && (
          <TouchableOpacity
            onPress={switchTheme}
            style={{
              ...styles.themeIcon,
              borderColor: MD3Colors.neutral50,
              backgroundColor: theme.body.background,
            }}
          />
        )}
        {showSettings && (
          <IconButton
            icon="format-font-size-increase"
            iconColor={MD3Colors.neutral50}
            size={20}
            onPress={increaseFontSize}
            disabled={currentFontSize === MAX_FONT_SIZE}
          />
        )}
        {showSettings && (
          <IconButton
            icon="format-font-size-decrease"
            iconColor={MD3Colors.neutral50}
            size={20}
            onPress={decreaseFontSize}
            disabled={currentFontSize === MIN_FONT_SIZE}
          />
        )}
        {showSettings && (
          <IconButton
            icon="format-font"
            iconColor={MD3Colors.neutral50}
            size={20}
            onPress={switchFontFamily}
          />
        )}

        {!showSettings && (
          <IconButton
            icon={isBookmarked ? "bookmark" : "bookmark-outline"}
            iconColor={MD3Colors.neutral50}
            size={20}
            animated
            onPress={handleChangeBookmark}
            onLongPress={onOpenBookmarksList}
          />
        )}
        {!showSettings && (
          <IconButton
            icon="format-list-bulleted-square"
            iconColor={MD3Colors.neutral50}
            size={20}
            onPress={onOpenTableOfContents}
          />
        )}
        <IconButton
          icon={showSettings ? "cog" : "cog-outline"}
          iconColor={MD3Colors.neutral50}
          size={20}
          onPress={() => setShowSettings((oldState) => !oldState)}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  row: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  slider: { width: "75%", height: 40 },
  themeIcon: {
    width: 24,
    height: 24,
    borderRadius: 32,
    borderWidth: 2,
    marginRight: 10,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  currentPercentage: {},
});
