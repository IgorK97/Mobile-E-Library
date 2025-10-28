import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import { ReviewCard } from "./ReviewCard"; // make sure this is adapted for React Native
import { ReviewCard } from "@/components/reviews/review-card";
// import { BottomNavigation } from "./BottomNavigation"; // make sure this is adapted for React Native
// import Icon from "react-native-vector-icons/Feather"; // Using Feather icons as substitute
import Feather from "@expo/vector-icons/Feather";
import "@/i18n";

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

interface ReviewsScreenProps {
  onBack: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  bookTitle?: string;
}

export default function ReviewsScreen({
  onBack,
  activeTab,
  onTabChange,
  bookTitle = "Буддизм в Японии",
}: ReviewsScreenProps) {
  const [sortBy, setSortBy] = useState("highest");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const sortedReviews = [...mockReviews].sort((a, b) => {
    if (sortBy === "highest") return b.rating - a.rating;
    return a.rating - b.rating;
  });
  const handleSendReview = () => {
    if (newReview.trim() === "" || newRating === 0) return;
    // здесь можно добавить логику отправки на сервер
    console.log("Отзыв отправлен:", newReview, "Рейтинг:", newRating);
    setNewReview("");
    setNewRating(0);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Отзывы</Text>
      </View>

      {/* Sort bar */}
      <View style={styles.sortBar}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortBy(sortBy === "highest" ? "lowest" : "highest")}
        >
          <Feather name="chevron-down" size={16} color="#000" />
          <Text style={styles.sortText}>
            {sortBy === "highest"
              ? "Сначала с высокой оценкой"
              : "Сначала с низкой оценкой"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Reviews list */}
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
      {/* Bottom button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Написать отзыв</Text>
      </TouchableOpacity>
      {/* Modal for writing a review */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Новый отзыв</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Feather name="x" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            {/* Rating */}
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
            {/* Text input */}
            <TextInput
              style={styles.input}
              placeholder="Напишите ваш отзыв..."
              placeholderTextColor="#999"
              multiline
              value={newReview}
              onChangeText={setNewReview}
            />

            {/* Send button */}
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendReview}
            >
              <Text style={styles.sendButtonText}>Отправить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Bottom navigation */}
      {/* <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2", paddingVertical: 10 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: { marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  sortBar: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  sortButton: { flexDirection: "row", alignItems: "center", gap: 5 },
  sortText: { fontSize: 14 },
  reviewList: { paddingHorizontal: 15, paddingVertical: 10, paddingBottom: 80 },
  addButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 30,
    position: "absolute",
    bottom: 30,
    left: "10%",
    right: "10%",
    alignItems: "center",
    paddingVertical: 12,
    elevation: 3,
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: "50%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "600" },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    fontSize: 15,
    color: "#333",
  },
  sendButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  sendButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
