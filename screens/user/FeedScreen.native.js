import { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import FeedCard from "./Components/FeedCard";

import api from "../../helpers/api";
import { useNavigation } from "@react-navigation/native";

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    api
      .get("/feed")
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((err) => {
        const response = JSON.parse(err.response.request._response);
        console.log(response.data);
      });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    api
      .get("/feed")
      .then((res) => {
        setPosts(res.data.data);
        setRefreshing(false);
      })
      .catch((err) => {
        const response = JSON.parse(err.response.request._response);
        console.log(response.data);
      });
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("FeedPoster")}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          selectionColor="gray"
          placeholder="Ne düşünüyorsunuz?"
          editable={false}
        />
      </TouchableOpacity>
      {posts.map((post, index) => {
        return (
          <FeedCard
            key={index}
            content={post.content}
            author={post.author}
            time={post.time}
            isLiked={post.isLiked}
            likeCount={post.likeCount}
            createdAt={post.createdAt}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "#d4d4d4",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  inputContainer: {
    marginHorizontal: 16,
  },
});

export default FeedScreen;
