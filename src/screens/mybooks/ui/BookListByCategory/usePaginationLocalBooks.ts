import { useState, useCallback, useEffect } from "react";
import {
  BookDetails,
  BookListItem,
  PagedResult,
} from "@/src/shared/types/types";
import { FileSystemService } from "@/src/shared/services/FileSystemService";

export interface LocalBooksDataState {
  books: BookDetails[];
  offset: number;
  hasNext: boolean;
}

const initialDataState: LocalBooksDataState = {
  books: [],
  offset: 0,
  hasNext: true,
};

/**
 * Хук для загрузки локально сохраненных книг с пагинацией.
 */
const usePaginationLocalBooks = (limit: number = 10) => {
  const [initialLoader, setInitialLoader] = useState(true);
  const [books, setBooks] = useState(initialDataState.books);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNext, setHasNext] = useState(initialDataState.hasNext);
  const [allBookIds, setAllBookIds] = useState<number[]>([]);
  const [offset, setOffset] = useState(initialDataState.offset);
  /**
   * Основная функция загрузки книг.
   * @param bookIdsToLoad - Массив ID книг, которые нужно загрузить в текущей порции.
   * @param isInitialLoad - Флаг, указывающий на сброс данных (Refresh).
   */

  const fetchLocalBooks = useCallback(
    async (bookIdsToLoad: number[], isInitialLoad: boolean) => {
      try {
        const bookPromises = bookIdsToLoad.map((id) =>
          FileSystemService.getLocalBookDetails(id)
        );
        const results = await Promise.all(bookPromises);
        const validBooks = results.filter((b): b is BookDetails => b !== null);
        setBooks((prevBooks) =>
          isInitialLoad ? validBooks : [...prevBooks, ...validBooks]
        );

        const nextOffset = isInitialLoad
          ? bookIdsToLoad.length
          : offset + bookIdsToLoad.length;
        setOffset(nextOffset);
        setHasNext(nextOffset < allBookIds.length);
      } catch (e) {
        console.error("Error fetching local books:", e);
        setHasNext(false);
      } finally {
        setInitialLoader(false);
        setLoadingMore(false);
        setRefreshing(false);
      }
    },
    [allBookIds.length, offset]
  );

  useEffect(() => {
    if (allBookIds.length > 0 && books.length === 0 && initialLoader) {
      const initialBatchIds = allBookIds.slice(0, limit);
      fetchLocalBooks(initialBatchIds, true);
    } else if (allBookIds.length === 0 && initialLoader) {
      setInitialLoader(false);
      setHasNext(false);
    }
  }, [allBookIds, initialLoader, books.length, fetchLocalBooks, limit]);

  const loadMoreLocalBooks = useCallback(() => {
    if (!loadingMore && hasNext) {
      setLoadingMore(true);
      const nextBatchIds = allBookIds.slice(offset, offset + limit);
      if (nextBatchIds.length > 0) {
        fetchLocalBooks(nextBatchIds, false);
      } else {
        setLoadingMore(false);
        setHasNext(false);
      }
    }
  }, [loadingMore, hasNext, allBookIds, offset, limit, fetchLocalBooks]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    setInitialLoader(true);
    setBooks([]);
    setOffset(0);
    setHasNext(true);

    const ids = await FileSystemService.getAllLocalBookIds();
    setAllBookIds(ids);

    const initialBatchIds = ids.slice(0, limit);
    if (initialBatchIds.length > 0) {
      await fetchLocalBooks(initialBatchIds, true);
    } else {
      setInitialLoader(false);
      setRefreshing(false);
      setHasNext(false);
    }
  }, [limit, fetchLocalBooks]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    books,
    initialLoader,
    refreshing,
    loadingMore,
    hasNext,
    refresh,
    loadMoreLocalBooks,
  };
};

export default usePaginationLocalBooks;
