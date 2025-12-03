// src/hooks/useBookDetails.ts

import { useState, useEffect } from "react";
import { booksClient } from "../../api/booksApi";
import { BookDetails } from "../../types/types"; // Ваш интерфейс
import { useStore } from "../store/globalStore";

interface UseBookDetailsResult {
  data: BookDetails | null;
  isLoading: boolean;
  error: string | null;
  fetchBookDetails: (userId: number, bookId: number) => Promise<void>;
}

export const useBookDetails = (bookId: number | null): UseBookDetailsResult => {
  const [data, setData] = useState<BookDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useStore();

  const fetchBookDetails = async (userId: number, bookId: number) => {
    setIsLoading(true);
    setError(null);
    setData(null); // Сбрасываем старые данные перед новой загрузкой
    try {
      const result = await booksClient.getBookMetadata(userId, bookId);
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

  // useEffect(() => {
  //   if (bookId === null) {
  //     setData(null);
  //     return;
  //   }

  //   const fetchDetails = async () => {
  //     // if (!user) return;
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const result = await booksClient.getBookMetadata(4, bookId);
  //       if (result) {
  //         setData(result);
  //       } else {
  //         setError("Книга не найдена.");
  //         setData(null);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching book details:", err);
  //       setError("Не удалось загрузить полные данные книги.");
  //       setData(null);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchDetails();
  // }, [bookId]);

  return { data, isLoading, error, fetchBookDetails };
};
