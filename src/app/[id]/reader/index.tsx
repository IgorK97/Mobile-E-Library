import "@/src/shared/i18n";
import { ReaderComponent } from "@/src/screens/reader";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Book } from "@/src/shared/types/types";
import { BookService } from "@/src/shared/services/BookService";
import { Text } from "react-native";

export default function ReaderScreen() {
  const handleNavigate = () => {
    router.back();
  };

  const { id } = useLocalSearchParams();
  const numericId = Number(id);
  if (isNaN(numericId) || numericId === 0)
    return <Text>Ошибка, попробуйте позже</Text>;

  return <ReaderComponent onNavigate={handleNavigate} bookId={numericId} />;
}
