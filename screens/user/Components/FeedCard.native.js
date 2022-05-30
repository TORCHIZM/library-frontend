import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import timeSince from "../../../helpers/timeHelper";

const FeedCard = ({ content, author, time, isLiked, likeCount, createdAt }) => {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likeCount);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      return setLiked(false);
    }

    setLikes(likes + 1);
    return setLiked(true);
  };

  const formatDate = () => {
    const date = new Date(createdAt);
    return timeSince(date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.profile} source={{ uri: author.profileImage }} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.author}>{author.fullName}</Text>
          <Text style={styles.date}>@{author.username}</Text>
          <View style={styles.circle} />
          <Text style={styles.date}>{formatDate()}</Text>
        </View>
        <Text style={styles.contentText}>{content}</Text>
        {/* <View style={styles.actions}>
          <View style={styles.action}>
            <EvilIcons name="comment" size={24} color="black" />
            <Text style={styles.actionCount}>0</Text>
          </View>
          <View style={styles.action}>
            <EvilIcons name="retweet" size={24} color="black" />
          </View>
          <TouchableOpacity onPress={handleLike}>
            <View style={styles.action}>
              {liked ? (
                <Ionicons name="heart-sharp" size={24} color="red" />
              ) : (
                <Ionicons name="heart-outline" size={24} color="black" />
              )}
              <Text style={styles.actionCount}>{likes}</Text>
            </View>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: "row",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  content: {
    marginLeft: 8,
    flexDirection: "column",
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profile: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  author: {
    fontSize: 16,
    marginRight: 4,
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 8,
    backgroundColor: "gray",
  },
  date: {
    fontSize: 16,
    color: "gray",
  },
  contentText: {
    marginTop: 4,
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 32,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionCount: {
    marginLeft: 8,
    fontSize: 18,
  },
});

export default FeedCard;
