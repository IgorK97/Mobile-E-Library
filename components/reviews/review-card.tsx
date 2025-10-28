import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

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
      {/* Star rating */}
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

      {/* Author and date */}
      <View style={styles.header}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      {/* Review text */}
      <Text style={styles.text}>{text}</Text>

      {/* Like/Dislike buttons */}
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 5,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  author: {
    fontWeight: "500",
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: "#6b7280",
  },
  text: {
    fontSize: 14,
    color: "#111827",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    gap: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#6b7280",
  },
  active: {},
  activeText: {
    color: "#3b82f6",
  },
});
