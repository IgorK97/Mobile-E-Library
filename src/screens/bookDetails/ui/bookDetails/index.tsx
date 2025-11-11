import { Book } from "@/src/shared/types/types";
// import { useRouter, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  Download,
  CircleX,
  CircleFadingArrowUp,
} from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import "@/src/shared/i18n";
import { useBookStyles } from "@/src/screens/library/ui/libraryComponent/bookStyles";
import {
  favColor,
  // unfavColor,
  fillFavColor,
  fillUnfavColor,
} from "@/src/shared/lib/constants/theme";
import { useStore } from "@/src/shared/lib/store/globalStore";

interface BookDetailsProps {
  onNavigateToReviews: (id: number) => void;
  onNavigateToRead: (id: number) => void;
  onNavigateToBack: () => void;
  // bookInfo: Book;
}

export const BookDetails = ({
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
  const bookInfo = currentBook;
  if (!bookInfo) return <Text>Ошибка загрузки книги, попробуйте еще раз</Text>;
  return (
    <View style={styles.container}>
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
            onPress={() => setIsDownloaded(!isDownloaded)}
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
            onPress={() => setIsBookmarked(!isBookmarked)}
            style={styles.iconButton}
          >
            <Bookmark
              size={24}
              color={isBookmarked ? favColor : "#000"}
              fill={"none"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            style={styles.iconButton}
          >
            <Heart
              size={24}
              color={isFavorite ? favColor : "#000"}
              fill={isFavorite ? fillFavColor : fillUnfavColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.coverContainer}>
          <Image
            source={bookInfo.imageUrl}
            style={styles.cover}
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.textCenter}>
            <Text style={styles.author}>{bookInfo.author}</Text>
            <Text style={styles.title}>{bookInfo.title}</Text>
          </View>
          <Text style={styles.reviewText}>
            {bookInfo.reviewCount} {t("book.review_count")}
          </Text>
        </View>
        <Text style={styles.metaText}>
          {bookInfo.pages} {t("book.p")} | {bookInfo.year}
        </Text>

        <TouchableOpacity
          style={styles.readButton}
          onPress={() => onNavigateToRead(bookInfo.id)}
        >
          <Text style={styles.readButtonText}>{t("book.read")}</Text>
        </TouchableOpacity>
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>{t("book.about")}</Text>
          <Text style={styles.aboutText}>{bookInfo.description}</Text>
        </View>
        <View style={styles.genresSection}>
          <Text style={styles.sectionTitle}>{t("book.genres")}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.genresContainer}
          >
            {bookInfo.genres?.map((genre, index) => (
              <TouchableOpacity key={index} style={styles.genreChip}>
                <Text style={styles.genreText}>{genre}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.reviewsButton}
          onPress={() => {
            // router.push(`/book/reviews`);
            onNavigateToReviews(bookInfo.id);
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
