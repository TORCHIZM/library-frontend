import { StyleSheet, ScrollView, View, Image, Text } from "react-native";

const BooksScreen = ({
  route: {
    params: { book },
  },
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.row}>
        <Text style={styles.key}>Sayfa</Text>
        <Text style={styles.value}>{book.pages}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.key}>Tür</Text>
        <Text style={styles.value}>tür buraya gelecek</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.value}>
          20. yüzyılın önde gelen psikiyatrlarından Viktor Frankl, otuzun
          üzerinde yabancı dile çevrilen ve bütün dünyada 12 milyondan fazla
          satan İnsanın Anlam Arayışı'nda, kurucusu olduğu logoterapinin
          ilkelerini, İkinci Dünya Savaşı sırasında bir toplama kampındaki
          deneyimleri eşliğinde anlatmaktadır. Okurlar, Frankl'ın tasvir ettiği
          toplama kampının, dünyayı daha büyük bir hapishane olarak kavramamızı
          sağlayacak parlak bir metafora dönüştüğünü fark edecektir. Gasset,
          Heidegger ve Sartre'dan aşina olduğumuz düşünceler ışığında, varoluşun
          çetin koşullarında "anlam"ı keşfetmemize yardım edecek süreci anlatan
          Frankl, "İnsanı insan yapan nedir?" sorusuna da yanıt vermeye
          çalışıyor. "Gerçekten ihtiyaç duyulan şey, yaşama yönelik
          tutumumuzdaki temel bir değişmeydi. Yaşamdan ne beklediğimizin
          gerçekten önemli olmadığını, asıl önemli olan şeyin yaşamın bizden ne
          beklediği olduğunu öğrenmemiz ve dahası umutsuz insanlara öğretmemiz
          gerekiyordu. Yaşamın anlamı hakkında sorular sormayı bırakmamız, bunun
          yerine kendimizi yaşam tarafından her gün, her saat sorgulanan
          birileri olarak düşünmemiz gerekirdi. Yanıtımızın konuşma ya da
          meditasyondan değil, doğru eylemden ve doğru yaşam biçiminden oluşması
          gerekiyordu. Nihai anlamda yaşam, sorunlara doğru çözümler bulmak ve
          her birey için kesintisiz olarak koyduğu görevleri yerine getirme
          sorumluluğunu almak anlamına gelir." (Tanıtım Bülteninden)
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    padding: 16,
  },
  key: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  value: {
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
    marginBottom: 16,
  },
});

export default BooksScreen;
