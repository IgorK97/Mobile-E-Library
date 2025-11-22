import { create } from "zustand";
import { BookListItem, User } from "../../types/types";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppState {
  currentBook: BookListItem | null;
  user: User | null;

  setCurrentBook: (book: BookListItem | null) => void;
  setUser: (user: User | null) => void;
  clearStore: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentBook: null,
      user: null,

      setCurrentBook: (book) => set({ currentBook: book }),

      setUser: (user) => set({ user }),

      clearStore: () => set({ currentBook: null, user: null }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
