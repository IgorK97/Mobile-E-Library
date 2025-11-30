// utils/bookmarkStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

// Ключ будет уникальным для каждой книги: "bookmarks_bookId"
const getStorageKey = (bookId: string | number) => `@bookmarks_${bookId}`;

export const saveBookmarkLocally = async (
  bookId: string | number,
  newBookmark: any
) => {
  try {
    const key = getStorageKey(bookId);

    const existingData = await AsyncStorage.getItem(key);
    let bookmarks = existingData ? JSON.parse(existingData) : [];

    const exists = bookmarks.some(
      (b: any) => b.location.start.cfi === newBookmark.location.start.cfi
    );

    if (!exists) {
      bookmarks.push(newBookmark);
      await AsyncStorage.setItem(key, JSON.stringify(bookmarks));
      console.log("Закладка сохранена локально");
    }
  } catch (error) {
    console.error("Ошибка сохранения локальной закладки:", error);
  }
};

export const getLocalBookmarks = async (bookId: string | number) => {
  try {
    const key = getStorageKey(bookId);
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Ошибка загрузки локальных закладок:", error);
    return [];
  }
};

export const removeBookmarkLocally = async (
  bookId: string | number,
  cfi: string
) => {
  try {
    const key = getStorageKey(bookId);
    const existingData = await AsyncStorage.getItem(key);
    if (existingData) {
      let bookmarks = JSON.parse(existingData);
      bookmarks = bookmarks.filter((b: any) => b.location.start.cfi !== cfi);
      await AsyncStorage.setItem(key, JSON.stringify(bookmarks));
    }
  } catch (error) {
    console.error("Ошибка удаления локальной закладки:", error);
  }
};
