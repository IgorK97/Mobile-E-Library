// src/shared/context/ReferenceDataProvider.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  RoleDetails,
  CachedRoles,
  ReferenceContextState,
} from "../types/types";
// Импортируйте вашу функцию API для получения ролей
// (замените на реальный вызов, например, axios)
import { fetchRolesFromApi } from "../api/references";

// --- КОНСТАНТЫ КЭШИРОВАНИЯ ---
const CACHE_KEY = "@chronolibris:roles";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 часа

// --- ИНИЦИАЛИЗАЦИЯ КОНТЕКСТА ---

const initialContextState: ReferenceContextState = {
  roles: [],
  isLoading: true,
  error: null,
};

// Создаем контекст для доступа к данным
const ReferenceContext = createContext<ReferenceContextState | undefined>(
  undefined
);

// Хук для упрощенного доступа к контексту
export const useReferenceData = () => {
  const context = useContext(ReferenceContext);
  if (context === undefined) {
    throw new Error(
      "useReferenceData must be used within a ReferenceDataProvider"
    );
  }
  return context;
};

// --- КОМПОНЕНТ ПРОВАЙДЕРА ---

interface ReferenceDataProviderProps {
  children: ReactNode;
}

export const ReferenceDataProvider: React.FC<ReferenceDataProviderProps> = ({
  children,
}) => {
  const [state, setState] =
    useState<ReferenceContextState>(initialContextState);

  // Логика загрузки и кэширования
  const loadRoles = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      let roles: RoleDetails[] = [];
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);

      if (cachedData) {
        const { roles: cachedRoles, timestamp }: CachedRoles =
          JSON.parse(cachedData);

        // Проверка TTL
        if (Date.now() - timestamp < CACHE_TTL_MS) {
          console.log("Using cached roles.");
          roles = cachedRoles;
        }
      }

      // Кэш устарел, отсутствует или TTL истек — загружаем с сервера
      if (roles.length === 0) {
        console.log("Fetching fresh roles from API.");
        const freshRoles = await fetchRolesFromApi(); // АПИ-вызов

        // Сохраняем в AsyncStorage
        const dataToSave: CachedRoles = {
          roles: freshRoles,
          timestamp: Date.now(),
        };
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(dataToSave));
        roles = freshRoles;
      }

      // Обновляем глобальное состояние
      setState((prev) => ({
        ...prev,
        roles,
        isLoading: false,
      }));
    } catch (e) {
      console.error("Failed to load or cache roles:", e);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to load reference data.",
      }));
    }
  };

  useEffect(() => {
    // Здесь мы загружаем данные при монтировании провайдера
    // (Позже сюда можно добавить проверку авторизации)
    loadRoles();
  }, []); // Зависимость [] гарантирует, что эффект сработает только один раз

  return (
    <ReferenceContext.Provider value={state}>
      {children}
    </ReferenceContext.Provider>
  );
};

