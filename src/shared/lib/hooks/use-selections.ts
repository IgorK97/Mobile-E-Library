import { useCallback, useEffect, useState } from "react";
import { BookListItem } from "../../types/types";
import { selectionsClient } from "../../api/selectionsApi";

export const useSelectionData = (
  selectionId: number,
  initialLimit: number = 10
) => {
  const [books, setBooks] = useState<BookListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [lastId, setIsLastId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(
    async (isInitial: boolean) => {
      if (isLoading || (!isInitial && !hasNext)) return;

      setIsLoading(true);
      setError(null);

      const currentLimit = isInitial ? initialLimit : 20;

      try {
        const response = await selectionsClient.getBooks(
          selectionId,
          isInitial ? null : lastId,
          currentLimit
        );

        const pagedResult = response;

        if (pagedResult && pagedResult.items) {
          setBooks((prev) =>
            isInitial ? pagedResult.items : [...prev, ...pagedResult.items]
          );
          setHasNext(pagedResult.hasNext);

          if (pagedResult.items.length > 0) {
            setIsLastId(pagedResult.lastId);
          }
        }
      } catch (e) {
        console.error(`Error fetching selection ${selectionId} books:`, e);
        setError("Failed to load books. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [selectionId, lastId, hasNext, isLoading, initialLimit]
  );

  const resetAndFetch = useCallback(() => {
    setBooks([]);
    setHasNext(true);
    setIsLastId(null);
    fetchBooks(true);
  }, [fetchBooks]);

  useEffect(() => {
    fetchBooks(true);
  }, [fetchBooks]);

  return {
    books,
    isLoading,
    hasNext,
    error,
    fetchNext: () => fetchBooks(false),
    resetAndFetch,
  };
};
