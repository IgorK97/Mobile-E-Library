import React, { forwardRef, useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Bookmark, useReader } from "@epubjs-react-native/core";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Button, IconButton, MD3Colors, Text } from "react-native-paper";
import { contrast, resolveTheme } from "@/src/constants/reader-theme";
import { useBookmarksStyles } from "@/src/styles/bookmarksStyles";
interface Props {
  onClose: () => void;
}
export type Ref = BottomSheetModalMethods;

export const BookmarksList = forwardRef<Ref, Props>(({ onClose }, ref) => {
  const {
    bookmarks,
    removeBookmark,
    removeBookmarks,
    isBookmarked,
    updateBookmark,
    goToLocation,
    currentLocation,
    theme,
  } = useReader();

  const snapPoints = React.useMemo(() => ["50%", "75%"], []);
  const [note, setNote] = useState("");
  const [currentBookmark, setCurrentBookmark] = useState<Bookmark | null>(null);
  const colors = resolveTheme(theme);
  useEffect(() => {
    if (isBookmarked) {
      const bookmark = bookmarks.find(
        (item) =>
          item.location?.start.cfi === currentLocation?.start.cfi &&
          item.location?.end.cfi === currentLocation?.end.cfi
      );

      if (!bookmark) return;

      setCurrentBookmark(bookmark);
      setNote(bookmark.data?.note || "");
    }
  }, [
    bookmarks,
    currentLocation?.end.cfi,
    currentLocation?.start.cfi,
    isBookmarked,
  ]);
  const styles = useBookmarksStyles();
  return (
    // <View style={{ zIndex: 20 }}>
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        index={1}
        enablePanDownToClose
        snapPoints={snapPoints}
        handleStyle={{ backgroundColor: colors.background }}
      >
        <BottomSheetView
          style={{
            ...styles.contentContainer,
            backgroundColor: colors.background,
          }}
        >
          <View style={styles.title}>
            <Text
              variant="titleMedium"
              style={{ color: contrast[theme.body.background] }}
            >
              Bookmarks
            </Text>

            {bookmarks.length > 0 && (
              <Button
                mode="text"
                onPress={() => {
                  removeBookmarks();
                  onClose();
                }}
                textColor={contrast[theme.body.background]}
              >
                Clear All
              </Button>
            )}
          </View>

          {bookmarks.length === 0 && (
            <View style={styles.title}>
              <Text
                variant="bodyMedium"
                style={{
                  fontStyle: "italic",
                  color: contrast[theme.body.background],
                }}
              >
                No bookmarks...
              </Text>
            </View>
          )}

          {isBookmarked && (
            <View style={{ width: "100%" }}>
              <BottomSheetTextInput
                defaultValue={note}
                style={styles.input}
                multiline
                placeholder="Type an annotation here..."
                placeholderTextColor={contrast[theme.body.background]}
                onChangeText={(text) => setNote(text)}
              />

              <Button
                mode="text"
                style={{ alignSelf: "flex-end" }}
                onPress={() => updateBookmark(currentBookmark!.id, { note })}
                textColor={contrast[theme.body.background]}
              >
                Update Annotation
              </Button>
            </View>
          )}

          {bookmarks.map((bookmark) => (
            <View key={bookmark.id} style={styles.bookmarkContainer}>
              <TouchableOpacity
                style={[
                  styles.bookmarkInfo,
                  { backgroundColor: colors.background },
                ]}
                onPress={() => {
                  goToLocation(bookmark.location.start.cfi);
                  onClose();
                }}
              >
                <View style={styles.bookmarkIcon}>
                  <IconButton
                    icon="bookmark"
                    size={20}
                    iconColor={MD3Colors.neutral50}
                  />

                  <Text
                    style={{
                      ...styles.bookmarkLocationNumber,
                      color: contrast[theme.body.background],
                    }}
                    variant="labelSmall"
                  >
                    {bookmark.location.start.location}
                  </Text>
                </View>

                <View style={styles.bookmarkInfoText}>
                  <Text
                    numberOfLines={1}
                    style={{
                      marginBottom: 2,
                      color: contrast[theme.body.background],
                    }}
                  >
                    Chapter: {bookmark.section?.label}
                  </Text>

                  <Text
                    numberOfLines={2}
                    style={{
                      fontStyle: "italic",
                      color: contrast[theme.body.background],
                    }}
                  >
                    &quot;{bookmark.text}&quot;
                  </Text>
                </View>
              </TouchableOpacity>

              <IconButton
                icon="trash-can-outline"
                size={20}
                iconColor={MD3Colors.error50}
                onPress={() => {
                  removeBookmark(bookmark);
                  onClose();
                }}
              />
            </View>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

BookmarksList.displayName = "BookmarksList";
