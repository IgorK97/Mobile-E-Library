import "@/src/shared/i18n";
import { BookDetails } from "@/src/screens/bookDetails";
import { router } from "expo-router";
import { Book } from "@/src/shared/types/types";

export default function BookDetailsScreen() {
  const navigateToReviews = (bookId: number) => {
    router.navigate({
      pathname: "/[id]/reviews",
      params: {
        id: bookId,
      },
    });
  };
  const navigateToBack = () => {
    router.back();
  };
  const navigateToRead = (bookId: number) => {
    router.navigate({
      pathname: "/[id]/reader",
      params: {
        id: bookId,
      },
    });
  };
  // const book: Book = {
  //   id: 1,
  //   title: "Буддизм в Японии",
  //   author: "Т.П. Григорьева",
  //   rating: 4.5,
  //   reviewCount: 10,
  //   pages: 704,
  //   year: 1993,
  //   description:
  //     "Монография является первой в отечественной литературе попыткой проследить пути становления японского буддизма и его влияние на культуру Японии.",
  //   imageUrl: require("@assets/images/book_1.png"),
  //   genres: [
  //     "Философия",
  //     "Культурология",
  //     "Религия",
  //     "Буддизм",
  //     "Восток",
  //     "Япония",
  //   ],
  //   imageBase64: "",
  // };
  return (
    <BookDetails
      // bookInfo={book}
      onNavigateToBack={navigateToBack}
      onNavigateToRead={navigateToRead}
      onNavigateToReviews={navigateToReviews}
    />
  );
}
