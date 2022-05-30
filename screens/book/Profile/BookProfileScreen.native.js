import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../styles/Colors";

import OutlineButton from "../../../components/OutlineButton";
import TopBar from "./Topbar.native";

const BookProfileScreen = ({
  route: {
    params: { book },
  },
}) => {
  const navigation = useNavigation();

  if (book === undefined) {
    navigation.navigate("List");
  }

  // useEffect(() => {
  //   const book = params.id;

  // }, [])

  return (
    <View>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              resizeMode="contain"
              style={styles.bookImage}
              source={{
                uri: book.uri,
              }}
            />
            <View style={styles.column}>
              <View style={styles.field}>
                <Text style={styles.title}>{book.name}</Text>
                <Text style={styles.author}>{book.author}</Text>
              </View>
              <OutlineButton style={styles.followButton} textColor="#000000">
                Takip Et
              </OutlineButton>
            </View>
          </View>
        </View>

        <NavigationContainer independent={true}>
          <TopBar book={book} />
        </NavigationContainer>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  author: {
    fontSize: 18,
  },
  bookImage: {
    width: 120,
    height: 170,
    borderRadius: 4,
    marginRight: 8,
  },
  field: {
    marginBottom: 8,
  },
  column: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
    flex: 1,
  },
  followButton: {
    width: "100%",
    height: 48,
    borderColor: "#000",
  },
  content: {
    padding: 16,
  },
  scrollContentContainer: {
    width: "100%",
    height: "100%",
  },
});

export default BookProfileScreen;
