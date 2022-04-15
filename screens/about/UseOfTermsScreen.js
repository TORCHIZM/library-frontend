import { StyleSheet, Text, View, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

import IconButton from "../../components/IconButton";

import logo from "../../assets/icon-64.png";

const UseOfTermsScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <View style={styles.background}>
        <View style={styles.purpleBackground}></View>
        <View style={styles.bottom}></View>
      </View>

      <View style={[styles.cardContainer]}>
        <View style={styles.header}>
          <IconButton icon="arrow-back" callback={handleGoBack} size={24} />
          <View style={styles.logo}>
            <Image style={styles.image} source={logo} />
          </View>
        </View>

        <View style={styles.cardHeader}>
          <Text style={styles.title}>Kullanım Koşulları</Text>
        </View>

        <Text style={styles.text}>1 - Yazılacak.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  purpleBackground: {
    flex: 0.3,
    backgroundColor: "#7972E6",
    borderRadius: 32,
    width: "100%",
  },
  bottom: {
    flex: 1,
    backgroundColor: "#DFE0F4",
    width: "100%",
  },
  cardContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 48,
  },
  header: {
    position: "relative",
    width: "90%",
    alignItems: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 8,
  },
  cardHeader: {
    paddingBottom: 48,
    width: "85%",
    color: "white",
    textAlign: "left",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
    marginTop: 24,
  },
  text: {
    color: "black",
    padding: 24,
    fontSize: 18,
  },
  fieldText: {
    color: "#D93D54",
    marginBottom: 8,
    width: "90%",
    textAlign: "left",
    paddingRight: 36,
  },
});

export default UseOfTermsScreen;
