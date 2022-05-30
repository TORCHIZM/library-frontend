import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "../../styles/Colors";
import { useNavigation } from "@react-navigation/native";

const Books = [
  {
    id: 1,
    uri: "https://1k-cdn.com/resimler/kitaplar/1017507_eb1c5_1635875963.jpg",
    name: "Kimse Gerçek Değil",
    author: "Zeynep Sey",
    readTime: "10 sa 53 dk",
    readedTime: "2 sa 4 dk",
    pages: 384,
    readedPages: 200,
    remainingTime: "2 gün 5 saat",
    followers: 1561,
  },
  {
    id: 2,
    uri: "https://1k-cdn.com/k/resimler/kitaplar/553821_4bea8_1605982964.jpg",
    name: "Ölüler Konuşamaz",
    author: "Dilara Keskin",
    readTime: "14 sa 3 dk",
    readedTime: "10 sa 26 dk",
    pages: 496,
    readedPages: 50,
    remainingTime: "6 gün 1 saat",
    followers: 1553,
  },
  {
    id: 3,
    uri: "https://1k-cdn.com/resimler/kitaplar/1017507_eb1c5_1635875963.jpg",
    name: "Kimse Gerçek Değil",
    author: "Zeynep Sey",
    readTime: "10 sa 53 dk",
    readedTime: "10 sa 30 dk",
    pages: 384,
    readedPages: 10,
    remainingTime: "1 hafta 3 gün",
    followers: 32354,
  },
  {
    id: 4,
    uri: "https://1k-cdn.com/resimler/kitaplar/87436_84628_1573375673.jpg",
    name: "The Book of M",
    author: "Peng Shepherd",
    readTime: "13 sa 56 dk",
    readedTime: "13 sa 56 dk",
    pages: 492,
    readedPages: 0,
    remainingTime: "1 hafta 3 gün",
    followers: 125785,
  },
];

const MyBooksScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Okuduğum Kitaplar</Text>
      </View>
      <ScrollView style={styles.container}>
        {Books.map((book, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate("BookProfile", {
                  book: book,
                });
              }}
            >
              <View style={styles.book}>
                <Image
                  style={styles.bookImage}
                  resizeMode={"contain"}
                  source={{
                    uri: book.uri,
                  }}
                />
                <View style={styles.fields}>
                  <View style={styles.field}>
                    <Text style={styles.title}>{book.name}</Text>
                    <Text>{book.author}</Text>
                  </View>
                  <View style={styles.field}>
                    <Text style={styles.title}>Tahmini Kalan Okuma Süresi</Text>
                    <Text>
                      {book.readedTime} - {book.pages}/{book.readedPages} okunan
                    </Text>
                  </View>
                  <View style={styles.field}>
                    <Text style={styles.title}>Son teslim tarihi</Text>
                    <Text style={styles.quotation}>{book.remainingTime}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomColor: Colors.dark,
    borderBottomWidth: 0.8,
  },
  headerText: {
    fontSize: 22,
  },
  book: {
    padding: 16,
    flexDirection: "row",
    elevation: 1,
    shadowColor: "#171717",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  bookImage: {
    width: 100,
    height: 150,
  },
  fields: {
    marginHorizontal: 16,
  },
  field: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quotation: {
    width: 250,
  },
});

export default MyBooksScreen;
