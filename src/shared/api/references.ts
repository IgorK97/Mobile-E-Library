// src/shared/api/references.ts

import { RoleDetails } from "../types/types";

// Базовый URL вашего бэкенда.
const API_BASE_URL = `${process.env.EXPO_PUBLIC_BASE_DEV_URL}/api`;

/**
 * Получает справочник ролей (авторы, редакторы и т.д.) с сервера, используя нативный fetch.
 * @returns Промис со списком RoleDetails.
 */
export const fetchRolesFromApi = async (): Promise<RoleDetails[]> => {
  const url = `${API_BASE_URL}/References/roles`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP Error! Status: ${response.status}. Details: ${errorText}`
      );
    }

    const data: RoleDetails[] = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Error fetching roles:", error.message);
    } else {
      console.error("Unknown error fetching roles:", error);
    }
    return [];
  }
};
