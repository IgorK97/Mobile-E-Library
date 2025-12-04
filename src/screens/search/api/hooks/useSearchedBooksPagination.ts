import { useState } from "react";
import { booksClient } from "@/src/shared/api/booksApi";
import { BookListItem, PagedResult } from "@/src/shared/types/types";

export interface SearchDataState {
  books: BookListItem[];
  lastId: number | null;
  hasNext: boolean;
}

const initialDataState: SearchDataState = {
  books: [],
  hasNext: false,
  lastId: null,
};

const useSearchPagination = () => {
  // Состояния для данных
  const [books, setBooks] = useState<BookListItem[]>(initialDataState.books);
  const [hasNext, setHasNext] = useState(initialDataState.hasNext);
  const [lastId, setLastId] = useState<number | null>(initialDataState.lastId);

  // Состояние текущего запроса (чтобы знать, что пагинировать)
  const [currentQuery, setCurrentQuery] = useState<string>("");

  // Состояния загрузки
  const [isSearching, setIsSearching] = useState(false); // Для первичного поиска (индикатор на весь экран или под строкой)
  const [loadingMore, setLoadingMore] = useState(false); // Для дозагрузки снизу
  const [refreshing, setRefreshing] = useState(false);
  /**
   * Основная функция получения данных
   */
  const fetchSearchedBooks = async (
    query: string,
    userId: number,
    lastIdParam: number | null,
    limit: number = 10
  ) => {
    try {
      const result: PagedResult<BookListItem> =
        await booksClient.getSearchedBooks(query, userId, lastIdParam, limit);

      setBooks((prev) =>
        lastIdParam === null ? result.items : [...prev, ...result.items]
      );

      setHasNext(result.hasNext);
      setLastId(result.lastId);
    } catch (e) {
      console.error("Error fetching searched books:", e);
      setHasNext(false);
    } finally {
      setIsSearching(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  /**
   * Начать новый поиск (вызывается при нажатии кнопки "Найти" или Enter)
   */
  const search = (query: string, userId: number, limit: number = 10) => {
    if (!query.trim()) {
      setBooks([]);
      setHasNext(false);
      setLastId(null);
      setCurrentQuery("");
      return;
    }

    setIsSearching(true);
    setLastId(null);
    setCurrentQuery(query);
    fetchSearchedBooks(query, userId, null, limit);
  };

  const loadMore = (userId: number, limit: number = 10) => {
    if (!loadingMore && hasNext && currentQuery) {
      setLoadingMore(true);
      fetchSearchedBooks(currentQuery, userId, lastId, limit);
    }
  };

  const refresh = (userId: number, limit: number = 10) => {
    if (currentQuery) {
      setRefreshing(true);
      setLastId(null);
      fetchSearchedBooks(currentQuery, userId, null, limit);
    }
  };

  return {
    books,
    refreshing,
    isSearching,
    loadingMore,
    hasNext,
    search,
    loadMore,
    refresh,
  };
};

export default useSearchPagination;
