import { StyleSheet, ScrollView, View, Image, Text } from "react-native";

const Books = [
  {
    uri: "https://1k-cdn.com/resimler/kitaplar/1017507_eb1c5_1635875963.jpg",
    name: "Kimse Gerçek Değil",
    author: "Zeynep Sey",
    readTime: "10 sa. 53 dk.",
    pages: 384,
    quotation:
      "“Derler ki en iyi şifacı yaralı şifacıdır. Ve bütün şifacılar günün birinde yaralanmaya mahkûmdur…”",
  },
  {
    uri: "https://1k-cdn.com/k/resimler/kitaplar/553821_4bea8_1605982964.jpg",
    name: "Ölüler Konuşamaz",
    author: "Dilara Keskin",
    readTime: "14 sa. 3 dk.",
    pages: 496,
    quotation: "“Ölümle cebelleşiyorum, umarım kazanan o olur.”",
  },
  {
    uri: "https://1k-cdn.com/resimler/kitaplar/1017507_eb1c5_1635875963.jpg",
    name: "Kimse Gerçek Değil",
    author: "Zeynep Sey",
    readTime: "10 sa. 53 dk.",
    pages: 384,
    quotation: "“Ölümle cebelleşiyorum, umarım kazanan o olur.”",
  },
];

const BooksScreen = () => {
  return (
    <View style={styles.container}>
      {Books.map((book, index) => {
        return (
          <View key={index} style={styles.book}>
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
                <Text style={styles.title}>Tahmini Okuma Süresi</Text>
                <Text>
                  {book.readTime} ({book.pages} sayfa)
                </Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>En Beğenilen Alıntı</Text>
                <Text style={styles.quotation}>{book.quotation}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
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

export default BooksScreen;
