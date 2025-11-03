import { create } from "zustand";

interface BookState {
  savedBooks: Record<number, string>; // id -> локальный путь
  cacheBooks: Record<number, string>; // id -> локальный путь (кэш)
  setSavedBook: (id: number, path: string) => void;
  setCachedBook: (id: number, path: string) => void;
  removeBook: (id: number) => void;
}

export const useBookStore = create<BookState>((set) => ({
  savedBooks: {},
  cacheBooks: {},

  setSavedBook: (id, path) =>
    set((state) => ({
      savedBooks: { ...state.savedBooks, [id]: path },
    })),

  setCachedBook: (id, path) =>
    set((state) => ({
      cacheBooks: { ...state.cacheBooks, [id]: path },
    })),

  removeBook: (id) =>
    set((state) => {
      const newSaved = { ...state.savedBooks };
      const newCache = { ...state.cacheBooks };
      delete newSaved[id];
      delete newCache[id];
      return { savedBooks: newSaved, cacheBooks: newCache };
    }),
}));
