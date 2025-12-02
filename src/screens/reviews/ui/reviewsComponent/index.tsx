import React, { useEffect, useState } from "react";
import {
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ReviewCard } from "./../reviewCard";
import Feather from "@expo/vector-icons/Feather";
import { useTranslation } from "react-i18next";
import "@/src/shared/i18n";
import { useReviewStyles } from "@/src/screens/reviews/ui/reviewsComponent/index.style";
// import { router } from "expo-router";
import { Star } from "lucide-react-native";
import { useStore } from "@/src/shared/lib/store/globalStore";
import usePaginationReviews from "../../hooks/usePaginationReviews";
import { reviewsClient } from "@/src/shared/api/reviewsApi";

// interface Review {
//   id: string;
//   author: string;
//   date: string;
//   rating: number;
//   text: string;
//   likes: number;
//   dislikes: number;
// }

// const mockReviews: Review[] = [
//   {
//     id: "1",
//     author: "Анастасия",
//     date: "21 февраля 2018",
//     rating: 5,
//     text: "Потрясающая книга! очень интересно изложена материал об истории буддизма в Японии",
//     likes: 10,
//     dislikes: 0,
//   },
//   {
//     id: "2",
//     author: "Евгений",
//     date: "12 марта 2019",
//     rating: 4,
//     text: "Книга интересная, но местами факты изложены слишком сухо и кратко",
//     likes: 5,
//     dislikes: 1,
//   },
//   {
//     id: "3",
//     author: "Мария",
//     date: "5 июня 2020",
//     rating: 5,
//     text: "Прекрасное исследование японской культуры и религии. Очень рекомендую!",
//     likes: 15,
//     dislikes: 0,
//   },
//   {
//     id: "4",
//     author: "Дмитрий",
//     date: "18 января 2021",
//     rating: 3,
//     text: "Неплохая книга, но ожидал большего. Некоторые темы раскрыты поверхностно.",
//     likes: 3,
//     dislikes: 2,
//   },
//   {
//     id: "5",
//     author: "Ольга",
//     date: "30 сентября 2022",
//     rating: 5,
//     text: "Замечательная работа автора! Много нового узнала о буддизме и его влиянии на японское общество.",
//     likes: 8,
//     dislikes: 0,
//   },
// ];

interface ReviewsProps {
  onNavigate: () => void;
}

export const Reviews = ({ onNavigate }: ReviewsProps) => {
  // const [sortBy, setSortBy] = useState("highest");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");
  const [newRating, setNewRating] = useState(0);
  const { t } = useTranslation();
  const {
    reviews,
    initialLoader,
    loadingMore,
    hasNext,
    lastId,
    fetchReviews,
    loadMoreReviews,
    refresh,
  } = usePaginationReviews();
  useEffect(() => {
    // Начальная загрузка отзывов для данной книги
    if (!currentBook || !user) return;
    fetchReviews(currentBook?.id, null, 10, user.userId);
  }, []); // Зависимость от bookId
  // const sortedReviews = [...mockReviews].sort((a, b) => {
  //   if (sortBy === "highest") return b.rating - a.rating;
  //   return a.rating - b.rating;
  // });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!currentBook || !user) return;

    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 500; // Грузим, когда до конца осталось 500 пикселей

    if (isCloseToBottom && hasNext && !loadingMore) {
      loadMoreReviews(currentBook?.id, 10, user.userId);
    }
  };
  const handleSendReview = async () => {
    if (newReviewText.trim() === "" || newRating === 0 || !user) return;

    try {
      // 🚨 Вызов API для создания отзыва
      await reviewsClient.createReview({
        bookId: currentBook?.id,
        // Title: 'New Review Title', // Если требуется заголовок, добавьте его в форму
        description: newReviewText,
        score: newRating,
        title: "name",
        userId: user?.userId,
        userName: user?.firstName,

        // UserId: userId, // UserID может быть добавлен на сервере через JWT
      });

      // Сброс полей
      setNewReviewText("");
      setNewRating(0);
      setIsModalVisible(false);

      // Обновление списка отзывов (запуск полного рефреша)
      refresh(currentBook?.id!, 10, user.userId);
    } catch (e) {
      console.error("Failed to send review:", e);
      // Здесь можно показать пользователю уведомление об ошибке
    }
  };
  const { user, currentBook } = useStore();

  const styles = useReviewStyles();
  // const handleSendReview = () => {
  //   if (newReview.trim() === "" || newRating === 0) return;
  //   // console.log("Отзыв отправлен:", newReview, "Рейтинг:", newRating);
  //   setNewReview("");
  //   setNewRating(0);
  //   setIsModalVisible(false);
  // };

  return (
    <View
      style={{ ...styles.container, paddingVertical: 30, paddingBottom: 10 }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => onNavigate()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("reviews.title")}</Text>
      </View>

      {/* <View style={styles.sortBar}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortBy(sortBy === "highest" ? "lowest" : "highest")}
        >
          <Feather name="chevron-down" size={16} color="#000" />
          <Text style={styles.sortText}>
            {sortBy === "highest"
              ? t("reviews.filter_high")
              : t("reviews.filter_low")}
          </Text>
        </TouchableOpacity>
      </View> */}

      <ScrollView contentContainerStyle={styles.reviewList}>
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            id={review.id}
            author={review.userName}
            date={new Date(review.createdAt)}
            rating={review.score}
            text={review.text}
            likes={review.likesCount}
            dislikes={review.dislikesCount}
            initialUserStatus={
              review.userVote === true
                ? "like"
                : review.userVote === false
                ? "dislike"
                : null
            }
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addButtonText}>{t("reviews.write")}</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t("reviews.new")}</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Feather name="x" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setNewRating(star)}>
                  <Star
                    size={28}
                    color={star <= newRating ? "#FFD700" : "#CCC"}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.input}
              placeholder={t("reviews.ph")}
              placeholderTextColor="#999"
              multiline
              value={newReviewText}
              onChangeText={setNewReviewText}
            />

            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendReview}
            >
              <Text style={styles.sendButtonText}>{t("reviews.send")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
