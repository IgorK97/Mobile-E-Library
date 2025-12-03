import { create } from "zustand";
import {
  BookListItem,
  ShelfDetails,
  User,
  UserProfile,
} from "../../types/types";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfile } from "../../api/userApi";
import { shelvesClient } from "../../api/shelvesApi";

interface AppState {
  currentBook: BookListItem | null;
  user: UserProfile | null;
  shelves: ShelfDetails[] | null;
  init: () => Promise<void>;
  setCurrentBook: (book: BookListItem | null) => void;
  setUser: (user: UserProfile | null) => void;
  clearStore: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentBook: null,
      user: null,
      shelves: null,
      setCurrentBook: (book) => set({ currentBook: book }),

      setUser: (user) => set({ user }),

      clearStore: () => set({ currentBook: null, user: null }),
      init: async () => {
        try {
          const profile = await getProfile();
          set({ user: profile });
          const newShelves = await shelvesClient.getUserShelves(profile.userId);
          set({ shelves: newShelves });
        } catch (e) {
          set({ user: null });
          set({ shelves: null });
        }
      },
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
