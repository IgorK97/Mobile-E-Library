// src/hooks/useBookDetails.ts

import { useState, useEffect } from "react";
import { booksClient } from "../../api/booksApi";
import { BookDetails } from "../../types/types"; // Ваш интерфейс

interface UseBookDetailsResult {
  data: BookDetails | null;
  isLoading: boolean;
  error: string | null;
}

export const useBookDetails = (bookId: number | null): UseBookDetailsResult => {
  const [data, setData] = useState<BookDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bookId === null) {
      setData(null);
      return;
    }

    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Используем исправленный клиент
        const result = await booksClient.getBookMetadata(bookId);
        if (result) {
          setData(result);
        } else {
          setError("Книга не найдена.");
          setData(null);
        }
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Не удалось загрузить полные данные книги.");
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [bookId]);

  return { data, isLoading, error };
};
