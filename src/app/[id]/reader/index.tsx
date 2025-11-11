import "@/src/shared/i18n";
import { ReaderComponent } from "@/src/screens/reader";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Book } from "@/src/shared/types/types";
import { BookService } from "@/src/shared/services/BookService";
import { Text } from "react-native";

export default function ReaderScreen() {
  const handleNavigate = () => {
    router.back();
  };
  const [epubAsset, setEpubAsset] = useState<string | null>(null);
  useEffect(() => {
    const funcLoad = async () => {
      try {
        const b: Book = {
          id: 1,
          title: "Буддизм в Японии",
          author: "Т.П. Григорьева",
          rating: 4.5,
          reviewCount: 10,
          pages: 704,
          year: 1993,
          description:
            "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
          imageUrl: require("@assets/images/book_1.png"),
          genres: [
            "Философия",
            "Культурология",
            "Религия",
            "Буддизм",
            "Восток",
            "Япония",
          ],
          imageBase64: "array64",
        };

        const url =
          process.env.EXPO_PUBLIC_BASE_DEV_URL + "/api/Book/book.epub";

        const output = await BookService.saveToStorage(b, url);
        await BookService.saveMeta(b);
        const res = await output.base64();
        console.log(output.uri);

        setEpubAsset(res);
      } catch (error) {
        console.error(error);
      }
    };
    funcLoad();
  }, []);

  if (epubAsset === null) {
    return <Text>...</Text>;
  }
  return (
    <ReaderComponent onNavigate={handleNavigate} bookContent={epubAsset} />
  );
}
