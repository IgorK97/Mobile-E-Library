import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import { ReviewCard } from "./ReviewCard"; // make sure this is adapted for React Native
import { ReviewCard } from "@/components/review-card";
// import { BottomNavigation } from "./BottomNavigation"; // make sure this is adapted for React Native
// import Icon from "react-native-vector-icons/Feather"; // Using Feather icons as substitute
import Feather from "@expo/vector-icons/Feather";
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

  const sortedReviews = [...mockReviews].sort((a, b) => {
    if (sortBy === "highest") return b.rating - a.rating;
    return a.rating - b.rating;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
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

      {/* Bottom navigation */}
      {/* <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
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
});
