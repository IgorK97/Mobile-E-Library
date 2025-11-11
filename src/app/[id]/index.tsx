import { Book } from "@/src/shared/types/types";
import { useRouter, useLocalSearchParams } from "expo-router";
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
  unfavColor,
  fillFavColor,
  fillUnfavColor,
} from "@/src/shared/constants/theme";
import { BookDetails } from "@/src/screens/book";
const books: Book[] = [
  {
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
    imageBase64: "",
  },
  {
    id: 2,
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
    imageBase64: "",
  },
  {
    id: 3,
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
    imageBase64: "",
  },
  {
    id: 4,
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
    imageBase64: "",
  },
  {
    id: 5,
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
    imageBase64: "",
  },
  {
    id: 6,
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
    imageBase64: "",
  },
];
// export default function BookDetailsScreen() {
//   const { id } = useLocalSearchParams();
//   console.log(id);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
//   const [isNewBookVersionAvailable, setIsNewBookVersionAvailable] =
//     useState<boolean>(false);
//   const router = useRouter();
//   const { t } = useTranslation();
//   const styles = useBookStyles();

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => router.back()}
//           style={styles.iconButton}
//         >
//           <ArrowLeft size={24} color="#000" />
//         </TouchableOpacity>
//         <View style={styles.headerIcons}>
//           <TouchableOpacity
//             onPress={() => setIsDownloaded(!isDownloaded)}
//             style={styles.iconButton}
//           >
//             {!isDownloaded ? (
//               <Download size={24} color={"#000"} fill="#fff" />
//             ) : (
//               <CircleX size={24} color={"#000"} />
//             )}
//           </TouchableOpacity>
//           {isNewBookVersionAvailable && (
//             <TouchableOpacity
//               onPress={() =>
//                 setIsNewBookVersionAvailable(!isNewBookVersionAvailable)
//               }
//             >
//               <CircleFadingArrowUp size={24} color={"#000"} />
//             </TouchableOpacity>
//           )}
//           <TouchableOpacity
//             onPress={() => setIsBookmarked(!isBookmarked)}
//             style={styles.iconButton}
//           >
//             <Bookmark
//               size={24}
//               color={isBookmarked ? favColor : "#000"}
//               fill={"none"}
//             />
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => setIsFavorite(!isFavorite)}
//             style={styles.iconButton}
//           >
//             <Heart
//               size={24}
//               color={isFavorite ? favColor : "#000"}
//               fill={isFavorite ? fillFavColor : fillUnfavColor}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.coverContainer}>
//           <Image
//             source={books[0].imageUrl}
//             style={styles.cover}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.infoContainer}>
//           <View style={styles.textCenter}>
//             <Text style={styles.author}>{books[0].author}</Text>
//             <Text style={styles.title}>{books[0].title}</Text>
//           </View>
//           <Text style={styles.reviewText}>
//             {books[0].reviewCount} {t("book.review_count")}
//           </Text>
//         </View>
//         <Text style={styles.metaText}>
//           {books[0].pages} {t("book.p")} | {books[0].year}
//         </Text>

//         <TouchableOpacity
//           style={styles.readButton}
//           onPress={() => router.push(`/book/reader`)}
//         >
//           <Text style={styles.readButtonText}>{t("book.read")}</Text>
//         </TouchableOpacity>
//         <View style={styles.aboutSection}>
//           <Text style={styles.aboutTitle}>{t("book.about")}</Text>
//           <Text style={styles.aboutText}>{books[0].description}</Text>
//         </View>
//         <View style={styles.genresSection}>
//           <Text style={styles.sectionTitle}>{t("book.genres")}</Text>
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.genresContainer}
//           >
//             {books[0].genres?.map((genre, index) => (
//               <TouchableOpacity key={index} style={styles.genreChip}>
//                 <Text style={styles.genreText}>{genre}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//         <TouchableOpacity
//           style={styles.reviewsButton}
//           onPress={() => {
//             router.push(`/book/reviews`);
//           }}
//         >
//           <Text style={styles.reviewsButtonText}>
//             {t("book.view_all_reviews")}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

export default function BookDetailsScreen() {
  return <BookDetails />;
}
