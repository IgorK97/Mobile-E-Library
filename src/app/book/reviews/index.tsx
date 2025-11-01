import React, { use, useState } from "react";
import {
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ReviewCard } from "@/src/components/reviews/review-card";
import Feather from "@expo/vector-icons/Feather";
import { useTranslation } from "react-i18next";
import "@/src/shared/i18n";
import { useReviewStyles } from "@/src/styles/reviewStyles";
import { router } from "expo-router";
import { Star } from "lucide-react-native";
interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  likes: number;
  dislikes: number;
}

const mockReviews: Review[] = [
  {
    id: "1",
    author: "Анастасия",
    date: "21 февраля 2018",
    rating: 5,
    text: "Потрясающая книга! очень интересно изложена материал об истории буддизма в Японии",
    likes: 10,
    dislikes: 0,
  },
  {
    id: "2",
    author: "Евгений",
    date: "12 марта 2019",
    rating: 4,
    text: "Книга интересная, но местами факты изложены слишком сухо и кратко",
    likes: 5,
    dislikes: 1,
  },
  {
    id: "3",
    author: "Мария",
    date: "5 июня 2020",
    rating: 5,
    text: "Прекрасное исследование японской культуры и религии. Очень рекомендую!",
    likes: 15,
    dislikes: 0,
  },
  {
    id: "4",
    author: "Дмитрий",
    date: "18 января 2021",
    rating: 3,
    text: "Неплохая книга, но ожидал большего. Некоторые темы раскрыты поверхностно.",
    likes: 3,
    dislikes: 2,
  },
  {
    id: "5",
    author: "Ольга",
    date: "30 сентября 2022",
    rating: 5,
    text: "Замечательная работа автора! Много нового узнала о буддизме и его влиянии на японское общество.",
    likes: 8,
    dislikes: 0,
  },
];

export default function ReviewsScreen() {
  const [sortBy, setSortBy] = useState("highest");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const { t } = useTranslation();
  const sortedReviews = [...mockReviews].sort((a, b) => {
    if (sortBy === "highest") return b.rating - a.rating;
    return a.rating - b.rating;
  });
  const styles = useReviewStyles();
  const handleSendReview = () => {
    if (newReview.trim() === "" || newRating === 0) return;
    // console.log("Отзыв отправлен:", newReview, "Рейтинг:", newRating);
    setNewReview("");
    setNewRating(0);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("reviews.title")}</Text>
      </View>

      <View style={styles.sortBar}>
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
      </View>

      <ScrollView contentContainerStyle={styles.reviewList}>
        {sortedReviews.map((review) => (
          <ReviewCard
            key={review.id}
            id={review.id}
            author={review.author}
            date={review.date}
            rating={review.rating}
            text={review.text}
            likes={review.likes}
            dislikes={review.dislikes}
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
              value={newReview}
              onChangeText={setNewReview}
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
}
