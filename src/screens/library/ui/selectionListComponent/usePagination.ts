import { selectionsClient } from "@/src/shared/api/selectionsApi";
import { BookListItem, PagedResult } from "@/src/shared/types/types";
import { useState } from "react";

export interface SelectionDataState {
  books: BookListItem[];
  //   isLoading: boolean;
  lastId: number | null;
  //   error: string | null;
  hasNext: boolean;
}

const initialDataState: SelectionDataState = {
  books: [],
  //   isLoading: true,
  //   error: null,
  hasNext: true,
  lastId: null,
};

const usePagination = () => {
  const [initialLoader, setInitialLoader] = useState(true);
  const [books, setBooks] = useState(initialDataState.books);
  //   const [totalResult, setTotalResult] = useState(initialDataState.totalResult);
  //   const [pageNo, setPageNo] = useState(initialData.pageNo);
  //   const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNext, setHasNext] = useState(initialDataState.hasNext);
  const [lastId, setLastId] = useState<number | null>(initialDataState.lastId);

  const fetchBooks = async (
    selectionId: number,
    lastId: number | null,
    limit = 10
  ) => {
    try {
      const result: PagedResult<BookListItem> = await selectionsClient.getBooks(
        selectionId,
        lastId,
        limit
      );

      setBooks(lastId === null ? result.items : [...books, ...result.items]);
      setHasNext(result.hasNext);
      setLastId(result.lastId);
    } catch (e) {
      console.error("Error fetching books:", e);
    } finally {
      setInitialLoader(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const loadMore = (selectionId: number, limit: number) => {
    if (!loadingMore && hasNext) {
      setLoadingMore(true);
      fetchBooks(selectionId, lastId, limit);
    }
  };

  const refresh = (selectionId: number, limit: number) => {
    setRefreshing(true);
    setLastId(null);
    fetchBooks(selectionId, null, limit);
  };
  return {
    books,
    initialLoader,
    refreshing,
    loadingMore,
    hasNext,
    lastId,
    fetchBooks,
    loadMore,
    refresh,
  };
};
export default usePagination;
