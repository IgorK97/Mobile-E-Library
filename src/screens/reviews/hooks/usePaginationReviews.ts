import { useState } from "react";
// Импорт API клиента для отзывов (предполагаем, что вы его импортировали)
import { ReviewsApiClient } from "@/src/shared/api/reviewsApi";
// Импорт общих типов
import { PagedResult, ReviewDetails } from "@/src/shared/types/types";

// Создаем инстанс клиента (замените на ваш фактический путь)
const reviewsClient = new ReviewsApiClient();

/**
 * 📚 Состояние данных для пагинации отзывов.
 */
export interface ReviewDataState {
  reviews: ReviewDetails[]; // Изменено с books на reviews
  lastId: number | null;
  hasNext: boolean;
}

const initialDataState: ReviewDataState = {
  reviews: [],
  hasNext: true,
  lastId: null,
};

/**
 * Хук для пагинации отзывов к конкретной книге по курсору (lastId).
 * @returns Состояние загрузки, данные отзывов и функции управления пагинацией.
 */
const usePaginationReviews = () => {
  const [initialLoader, setInitialLoader] = useState(true);
  // Используем reviews вместо books
  const [reviews, setReviews] = useState(initialDataState.reviews);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNext, setHasNext] = useState(initialDataState.hasNext);
  const [lastId, setLastId] = useState<number | null>(initialDataState.lastId);

  /**
   * 📲 Основная функция для загрузки отзывов.
   * @param bookId ID книги, для которой ищутся отзывы.
   * @param currentLastId ID последнего элемента из предыдущего запроса.
   * @param limit Максимальное количество элементов на странице.
   */
  const fetchReviews = async (
    bookId: number, // Параметр bookId
    currentLastId: number | null,
    limit = 10,
    userId: number | null
  ) => {
    try {
      // 🚨 Используем reviewsClient.getReviewsByBookId (ваша функция API)
      const result: PagedResult<ReviewDetails> =
        await reviewsClient.getReviewsByBookId(
          bookId,
          currentLastId, // Используем currentLastId из аргументов
          limit,
          userId
        );

      // Если currentLastId === null, это первая загрузка или refresh, заменяем список.
      // Иначе — добавляем к существующему списку.
      setReviews(
        currentLastId === null ? result.items : [...reviews, ...result.items]
      );

      // Обновляем состояние пагинации
      setHasNext(result.hasNext);
      setLastId(result.lastId);
    } catch (e) {
      console.error("Error fetching reviews:", e);
      setHasNext(false);
    } finally {
      setInitialLoader(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  /**
   * ⬇️ Загрузка следующей страницы отзывов.
   * @param bookId ID книги.
   * @param limit Максимальное количество элементов на странице.
   */
  const loadMoreReviews = (
    bookId: number,
    limit: number,
    userId: number | null
  ) => {
    // Проверка, что уже не грузим и есть следующая страница
    if (!loadingMore && hasNext) {
      setLoadingMore(true);
      // Используем текущее состояние lastId
      fetchReviews(bookId, lastId, limit, userId);
    }
  };

  /**
   * 🔄 Обновление списка отзывов (сброс пагинации).
   * @param bookId ID книги.
   * @param limit Максимальное количество элементов на странице.
   */
  const refresh = (bookId: number, limit: number, userId: number | null) => {
    setRefreshing(true);
    setLastId(null);
    // Начинаем сброс с lastId = null
    fetchReviews(bookId, null, limit, userId);
  };

  return {
    reviews, // Возвращаем reviews вместо books
    initialLoader,
    refreshing,
    loadingMore,
    hasNext,
    lastId,
    fetchReviews,
    loadMoreReviews,
    refresh,
  };
};

export default usePaginationReviews;
