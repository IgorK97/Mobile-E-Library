import { shelvesClient } from "@/src/shared/api/shelvesApi";
import { BookListItem, PagedResult } from "@/src/shared/types/types";
import { useState } from "react";

export interface ShelfBooksDataState {
  books: BookListItem[];
  lastId: number | null;
  hasNext: boolean;
}

const initialDataState: ShelfBooksDataState = {
  books: [],
  hasNext: true,
  lastId: null,
};

const usePaginationShelvesBooks = (shelfId: number) => {
  const [initialLoader, setInitialLoader] = useState(true);
  const [books, setBooks] = useState(initialDataState.books);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNext, setHasNext] = useState(initialDataState.hasNext);
  const [lastId, setLastId] = useState<number | null>(initialDataState.lastId);

  const fetchShelfBooks = async (
    userId: number,
    shelfId: number,
    lastId: number | null,
    limit = 10
  ) => {
    try {
      const result: PagedResult<BookListItem> =
        await shelvesClient.getShelfBooks(userId, shelfId, lastId, limit);

      setBooks(lastId === null ? result.items : [...books, ...result.items]);
      setHasNext(result.hasNext);
      setLastId(result.lastId);
    } catch (e) {
      console.error("Error fetching shelf books:", e);
      setHasNext(false);
    } finally {
      setInitialLoader(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const loadMoreShelfBooks = (userId: number, limit: number) => {
    if (!loadingMore && hasNext) {
      setLoadingMore(true);
      fetchShelfBooks(userId, shelfId, lastId, limit);
    }
  };

  const refresh = (userId: number, limit: number) => {
    setRefreshing(true);
    setLastId(null);
    fetchShelfBooks(userId, shelfId, null, limit);
  };

  return {
    books,
    initialLoader,
    refreshing,
    loadingMore,
    hasNext,
    lastId,
    fetchShelfBooks,
    loadMoreShelfBooks,
    refresh,
  };
};

export default usePaginationShelvesBooks;
