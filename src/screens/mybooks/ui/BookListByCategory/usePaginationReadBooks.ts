import { booksClient } from "@/src/shared/api/booksApi";
import { selectionsClient } from "@/src/shared/api/selectionsApi";
import { BookListItem, PagedResult } from "@/src/shared/types/types";
import { useState } from "react";

export interface SelectionDataState {
  books: BookListItem[];
  lastId: number | null;
  hasNext: boolean;
}

const initialDataState: SelectionDataState = {
  books: [],
  hasNext: true,
  lastId: null,
};

const usePaginationReadBooks = () => {
  const [initialLoader, setInitialLoader] = useState(true);
  const [books, setBooks] = useState(initialDataState.books);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNext, setHasNext] = useState(initialDataState.hasNext);
  const [lastId, setLastId] = useState<number | null>(initialDataState.lastId);

  const fetchReadBooks = async (
    userId: number,
    selectionId: number,
    lastId: number | null,
    limit = 10
  ) => {
    try {
      const result: PagedResult<BookListItem> = await booksClient.getReadBooks({
        UserId: userId,
        LastId: lastId,
        Limit: limit,
      });

      setBooks(lastId === null ? result.items : [...books, ...result.items]);
      setHasNext(result.hasNext);
      setLastId(result.lastId);
    } catch (e) {
      console.error("Error fetching books:", e);
      setHasNext(false);
    } finally {
      setInitialLoader(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const loadMoreReadBooks = (
    userId: number,
    selectionId: number,
    limit: number
  ) => {
    if (!loadingMore && hasNext) {
      setLoadingMore(true);
      fetchReadBooks(userId, 1, lastId, limit);
    }
  };

  const refresh = (userId: number, selectionId: number, limit: number) => {
    setRefreshing(true);
    setLastId(null);
    fetchReadBooks(userId, 1, null, limit);
  };
  return {
    books,
    initialLoader,
    refreshing,
    loadingMore,
    hasNext,
    lastId,
    fetchReadBooks,
    loadMoreReadBooks,
    refresh,
  };
};
export default usePaginationReadBooks;
