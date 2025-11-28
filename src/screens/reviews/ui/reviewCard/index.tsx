import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useReviewCardStyles } from "@/src/screens/reviews/ui/reviewCard/index.style";
interface ReviewCardProps {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  likes: number;
  dislikes: number;
}

export function ReviewCard({
  author,
  date,
  rating,
  text,
  likes,
  dislikes,
}: ReviewCardProps) {
  const [userLike, setUserLike] = useState<"like" | "dislike" | null>(null);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);
  const styles = useReviewCardStyles();
  const handleLike = () => {
    if (userLike === "like") {
      setUserLike(null);
      setLikeCount(likeCount - 1);
    } else {
      if (userLike === "dislike") setDislikeCount(dislikeCount - 1);
      setUserLike("like");
      setLikeCount(userLike === null ? likeCount + 1 : likeCount);
    }
  };

  const handleDislike = () => {
    if (userLike === "dislike") {
      setUserLike(null);
      setDislikeCount(dislikeCount - 1);
    } else {
      if (userLike === "like") setLikeCount(likeCount - 1);
      setUserLike("dislike");
      setDislikeCount(userLike === null ? dislikeCount + 1 : dislikeCount);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Feather
            key={star}
            name="star"
            size={16}
            color={star <= rating ? "#facc15" : "#d1d5db"} // yellow or gray
          />
        ))}
      </View>

      <View style={styles.header}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.date}>{date}</Text>
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
            color={userLike === "like" ? "#3b82f6" : "#6b7280"}
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
