// src/shared/api/references.ts

import { RoleDetails } from "../types/types"; // Импортируем наш DTO

// Базовый URL вашего бэкенда.
const API_BASE_URL = "http://192.168.1.10:5000/api"; // Обновите на ваш реальный IP/домен

/**
 * Получает справочник ролей (авторы, редакторы и т.д.) с сервера, используя нативный fetch.
 * @returns Промис со списком RoleDetails.
 */
export const fetchRolesFromApi = async (): Promise<RoleDetails[]> => {
  // Маршрут: GET /api/References/roles
  const url = `${API_BASE_URL}/References/roles`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // Здесь вы можете добавить заголовки, например, для авторизации:
        // 'Authorization': `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });

    // 1. Проверяем, был ли HTTP-запрос успешным (статус 200-299)
    if (!response.ok) {
      // Если статус не 200, выбрасываем ошибку с HTTP-статусом
      const errorText = await response.text();
      throw new Error(
        `HTTP Error! Status: ${response.status}. Details: ${errorText}`
      );
    }

    // 2. Парсим тело ответа как JSON
    const data: RoleDetails[] = await response.json();

    return data;
  } catch (error) {
    // Логирование и обработка ошибок (сети, парсинга или HTTP)
    if (error instanceof Error) {
      console.error("API Error fetching roles:", error.message);
    } else {
      console.error("Unknown error fetching roles:", error);
    }

    // В случае любой ошибки возвращаем пустой массив
    return [];
  }
};
