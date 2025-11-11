import { create } from "zustand";
import { Book } from "../../types/types";

interface SearchedBookState {
  searchResults: Book[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;

  searchBooks: (query: string, page?: number) => Promise<void>;
  loadMoreBooks: () => Promise<void>;
  clearSearch: () => void;
  setLoading: (loading: boolean) => void;
}

export const useSearchedBookStore = create<SearchedBookState>((set, get) => ({
  searchResults: [],
  searchQuery: "",
  currentPage: 1,
  totalPages: 0,
  hasMore: false,
  isLoading: false,
  error: null,

  searchBooks: async (query: string, page: number = 1) => {
    set({ isLoading: true });
    try {
      //const response = await api.searchBooks(query, page);
      //const books = response.data.books;
      // set({searchResults:page===1?books:[...get().searchResults, ...books],
      //     searchQuery:query,
      //     currentPage:page,
      //     totalPages:Response.data.totalPages,
      //     hasMore:page<Response.data.totalPages,
      //     isLoading:false,
      // });
    } catch (error) {
      // set({error:'Search error', isLoading:false});
    }
  },

  loadMoreBooks: async () => {
    // const {searchQuery, currentPage, hasMore}=get();
    // if(!hasMore)return;
    // await get().searchBooks(searchQuery, currentPage + 1);
  },
  clearSearch: () =>
    set({
      searchResults: [],
      searchQuery: "",
      currentPage: 1,
      totalPages: 0,
      hasMore: false,
      error: null,
    }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
