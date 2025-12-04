import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useReviewCardStyles } from "@/src/screens/reviews/ui/reviewCard/index.style";
import { reviewsClient } from "@/src/shared/api/reviewsApi";
import { useStore } from "@/src/shared/lib/store/globalStore";

type UserRatingStatus = "like" | "dislike" | null;

interface ReviewCardProps {
  id: number;
  author: string;
  date: Date;
  rating: number;
  text: string;
  likes: number;
  dislikes: number;
  onRatingSuccess?: () => void;
  initialUserStatus: UserRatingStatus;
}

export function ReviewCard({
  author,
  date,
  rating,
  text,
  likes,
  dislikes,
  id,
  onRatingSuccess,
  initialUserStatus,
}: ReviewCardProps) {
  const [userLike, setUserLike] = useState<UserRatingStatus>(null);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);
  const styles = useReviewCardStyles();
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useStore();
  const ACTIVE_COLOR = "#dc2626";
  const INACTIVE_COLOR = "#6b7280";
  useEffect(() => {
    setUserLike(initialUserStatus);
  }, [initialUserStatus]);
  const sendRatingRequest = async (Score: number) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await reviewsClient.rateReview({
        reviewId: id,
        userId: user?.userId,
        score: Score,
      });

      onRatingSuccess?.();
    } catch (e) {
      console.error("Ошибка при отправке оценки:", e);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleLike = () => {
    let newStatus: UserRatingStatus;
    let isRequestLike: number;

    if (userLike === "like") {
      setLikeCount((c) => c - 1);
      newStatus = null;
      isRequestLike = 0;
    } else {
      if (userLike === "dislike") {
        setDislikeCount((c) => c - 1);
      }
      setLikeCount((c) => c + 1);
      newStatus = "like";
      isRequestLike = 1;
    }

    setUserLike(newStatus);
    sendRatingRequest(isRequestLike);
  };

  const handleDislike = () => {
    let newStatus: UserRatingStatus = null;
    let isRequestDislike: number;

    if (userLike === "dislike") {
      setDislikeCount((c) => c - 1);
      newStatus = null;
      isRequestDislike = 0;
    } else {
      if (userLike === "like") {
        setLikeCount((c) => c - 1);
      }
      setDislikeCount((c) => c + 1);
      newStatus = "dislike";
      isRequestDislike = -1;
    }

    setUserLike(newStatus);
    sendRatingRequest(isRequestDislike);
  };
  const strDate: string = date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",

    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    // timeZoneName: "short",
  });

  return (
    <View style={styles.card}>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Feather
            key={star}
            name="star"
            size={16}
            color={star <= rating ? "#facc15" : "#d1d5db"}
          />
        ))}
      </View>

      <View style={styles.header}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.date}>{strDate}</Text>
      </View>

      <Text style={styles.text}>{text}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, userLike === "like" && styles.active]}
          onPress={handleLike}
        >
          <Feather
            name="thumbs-up"
            size={16}
            color={userLike === "like" ? ACTIVE_COLOR : INACTIVE_COLOR}
          />
          <Text
            style={[
              styles.actionText,
              userLike === "like" && styles.activeText,
            ]}
          >
            {likeCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, userLike === "dislike" && styles.active]}
          onPress={handleDislike}
          disabled={isProcessing}
        >
          <Feather
            name="thumbs-down"
            size={16}
            color={userLike === "dislike" ? "#3b82f6" : "#6b7280"}
          />
          <Text
            style={[
              styles.actionText,
              userLike === "dislike" && styles.activeText,
            ]}
          >
            {dislikeCount}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
