// import { BookListItem } from "@/src/shared/types/types";
// import { useRouter, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  Download,
  CircleX,
  CircleFadingArrowUp,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import "@/src/shared/i18n";
import { useBookStyles } from "@/src/screens/library/ui/libraryComponent/index.style";
import {
  favColor,
  // unfavColor,
  fillFavColor,
  fillUnfavColor,
} from "@/src/shared/lib/constants/theme";
import { useStore } from "@/src/shared/lib/store/globalStore";
import { useBookDetails } from "@/src/shared/lib/hooks/use-book-details";
import { useReferenceData } from "@/src/shared/contexts/ReferenceDataProvider";
import { BookDetails } from "@/src/shared/types/types";
import { shelvesClient } from "@/src/shared/api/shelvesApi";
import {
  checkIfBookExists,
  deleteLocalBook,
  downloadAndSaveBook,
} from "@/src/shared/services/FileSystemService";
interface BookDetailsProps {
  onNavigateToReviews: (id: number) => void;
  onNavigateToRead: (id: number) => void;
  onNavigateToBack: () => void;
}

function getAuthorsString(
  authorRoleId: number,
  bookDetails: BookDetails
): string {
  // 1. Найти группу участников с ролью "Автор"
  const authorGroup = bookDetails.participants.find(
    (group) => group.role === authorRoleId
  );

  // 2. Проверить, найдена ли группа авторов, и есть ли в ней персоны
  if (!authorGroup || authorGroup.persons.length === 0) {
    return "Неизвестный автор"; // Возвращаем заглушку, если авторы не найдены
  }

  // 3. Извлечь имена (fullName) и объединить их в строку
  const authorNames = authorGroup.persons.map((person) => person.fullName);

  // 4. Объединить имена запятой и пробелом
  return authorNames.join(", ");
}

export const BookDetailsComponent = ({
  onNavigateToReviews,
  onNavigateToRead,
  onNavigateToBack,
}: // bookInfo,
BookDetailsProps) => {
  // const { id } = useLocalSearchParams();
  // console.log(id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const [isNewBookVersionAvailable, setIsNewBookVersionAvailable] =
    useState<boolean>(false);
  // const router = useRouter();
  const { t } = useTranslation();
  const styles = useBookStyles();
  const { currentBook, setCurrentBook } = useStore();
  const { shelves, user } = useStore();
  const FAVORITES_SHELF_ID = shelves?.find(
    (shelf) => shelf.shelfType === 1
  )?.id;
  const READ_SHELF_ID = shelves?.find((shelf) => shelf.shelfType === 2)?.id;

  const bookId = currentBook ? currentBook.id : null;

  // 💡 Используем хук для загрузки полных деталей
  const {
    data: fullBookDetails,
    isLoading,
    error,
    fetchBookDetails,
  } = useBookDetails(bookId);
  const [currentDetailedBook, setCurrentDetailedBook] =
    useState<BookDetails | null>(null);
  useEffect(() => {
    if (!user || !bookId) return;
    if (fullBookDetails) {
      setCurrentDetailedBook(fullBookDetails);
      setIsDownloaded(false);
    } else {
      fetchBookDetails(user.userId, bookId);
    }
    const checkBook = async () => {
      if (!fullBookDetails) return;
      const result = await checkIfBookExists(fullBookDetails.id);
      if (result !== null) setIsDownloaded(true);
    };
    checkBook();
  }, [fullBookDetails]);
  const { roles } = useReferenceData();

  const authorRoleId = roles.find((role) => role.name === "Автор")?.id ?? 1;

  // const bookInfo = fullBookDetails;

  console.log("I AM HERE", fullBookDetails);
  console.log(" I AM HERE V2", currentDetailedBook);
  console.log("BUBUBU", currentDetailedBook?.participants.length);

  currentDetailedBook?.participants.forEach((p) => {
    console.log("KUKUKU");
    console.log(p.role);
    p.persons.forEach((person) => console.log(person));
  });

  if (!currentDetailedBook)
    return <Text>Ошибка загрузки книги, попробуйте еще раз</Text>;
  console.log(currentDetailedBook);
  const authors: string = getAuthorsString(authorRoleId, currentDetailedBook);

  const toggleFavorite = async () => {
    if (!currentDetailedBook) return;
    if (!FAVORITES_SHELF_ID) return;

    const shelfId = FAVORITES_SHELF_ID; // избранное
    const bookId = currentDetailedBook.id;

    const isNowFavorite = !currentDetailedBook.isFavorite;

    // отправляем запрос
    const success = isNowFavorite
      ? await shelvesClient.addBookToShelf(shelfId, bookId)
      : await shelvesClient.removeBookFromShelf(shelfId, bookId);

    if (success) {
      // обновляем локально
      setCurrentDetailedBook({
        ...currentDetailedBook,
        isFavorite: isNowFavorite,
      });
    }
  };

  const toggleRead = async () => {
    if (!currentDetailedBook) return;
    if (!READ_SHELF_ID) return;

    const shelfId = READ_SHELF_ID; // прочитано
    const bookId = currentDetailedBook.id;

    const isNowRead = !currentDetailedBook.isRead;

    const success = isNowRead
      ? await shelvesClient.addBookToShelf(shelfId, bookId)
      : await shelvesClient.removeBookFromShelf(shelfId, bookId);

    if (success) {
      setCurrentDetailedBook({
        ...currentDetailedBook,
        isRead: isNowRead,
      });
    }
  };

  return (
    <View style={{ ...styles.container, paddingVertical: 20 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setCurrentBook(null);
            onNavigateToBack();
          }}
          style={styles.iconButton}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={async () => {
              if (!isDownloaded) {
                await downloadAndSaveBook(
                  currentDetailedBook.id,
                  `${process.env.EXPO_PUBLIC_BASE_DEV_URL}/api/Books/${currentDetailedBook.id}/read`
                );
              } else {
                deleteLocalBook(currentDetailedBook.id);
              }
              setIsDownloaded(!isDownloaded);
            }}
            style={styles.iconButton}
          >
            {!isDownloaded ? (
              <Download size={24} color={"#000"} fill="#fff" />
            ) : (
              <CircleX size={24} color={"#000"} />
            )}
          </TouchableOpacity>
          {isNewBookVersionAvailable && (
            <TouchableOpacity
              onPress={() =>
                setIsNewBookVersionAvailable(!isNewBookVersionAvailable)
              }
            >
              <CircleFadingArrowUp size={24} color={"#000"} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              toggleRead();
            }}
            style={styles.iconButton}
          >
            <Bookmark
              size={24}
              color={currentDetailedBook?.isRead ? favColor : "#000"}
              fill={"none"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleFavorite()}
            style={styles.iconButton}
          >
            <Heart
              size={24}
              color={currentDetailedBook?.isFavorite ? favColor : "#000"}
              fill={
                currentDetailedBook?.isFavorite ? fillFavColor : fillUnfavColor
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.coverContainer}>
          <Image
            source={{
              uri: currentDetailedBook.coverUri
                ? `${process.env.EXPO_PUBLIC_BASE_DEV_URL}/${currentDetailedBook.coverUri}`
                : undefined,
            }}
            style={styles.cover}
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.textCenter}>
            <Text style={styles.author}>{authors}</Text>
            <Text style={styles.title}>{currentDetailedBook.title}</Text>
          </View>
          <Text style={styles.reviewText}>
            {currentDetailedBook.reviewsCount} {t("book.review_count")}
          </Text>
        </View>
        <Text style={styles.metaText}>
          {currentDetailedBook.ratingsCount} {t("book.ratings_count")} |{" "}
          {currentDetailedBook.year}
        </Text>

        <TouchableOpacity
          style={styles.readButton}
          onPress={() => onNavigateToRead(currentDetailedBook.id)}
        >
          <Text style={styles.readButtonText}>{t("book.read")}</Text>
        </TouchableOpacity>
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>{t("book.about")}</Text>
          <Text style={styles.aboutText}>
            {currentDetailedBook.description}
          </Text>
        </View>
        <View style={styles.genresSection}>
          <Text style={styles.sectionTitle}>{t("book.themes")}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.genresContainer}
          >
            {currentDetailedBook.themes?.map((theme, index) => (
              <TouchableOpacity key={index} style={styles.genreChip}>
                <Text style={styles.genreText}>{theme.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.reviewsButton}
          onPress={() => {
            // router.push(`/book/reviews`);
            onNavigateToReviews(currentDetailedBook.id);
          }}
        >
          <Text style={styles.reviewsButtonText}>
            {t("book.view_all_reviews")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
