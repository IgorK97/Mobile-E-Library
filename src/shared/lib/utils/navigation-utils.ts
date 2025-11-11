import { router } from "expo-router";

export const navigateToBook = (bookId: number) => {
  router.navigate({
    pathname: "/[id]",
    params: { id: bookId },
  });
};
