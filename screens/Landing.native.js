import { useNavigation } from "@react-navigation/native";
import { Text, View, Image, StyleSheet } from "react-native";

import OutlineButton from "../components/OutlineButton";
import PrimaryButton from "../components/PrimaryButton";

import logo from "../assets/icon.png";

const Landing = () => {
  const navigation = useNavigation();

  const handleNavigate = (page) => {
    navigation.navigate(page);
  };

  return (
    <View style={styles.container}>
      <View style={styles.purpleBackground}></View>
      <View style={styles.bottom}></View>

      <View style={styles.cardContainer}>
        <View style={styles.logo}>
          <Image style={styles.image} source={logo} />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Hoşgeldiniz!</Text>

          <Text style={styles.text}>
            Kitap kurtlarıyla sosyalleşebileceğiniz tek sanal ortam
          </Text>

          <PrimaryButton
            style={styles.button}
            callback={() => handleNavigate("Login")}
          >
            Giriş Yap
          </PrimaryButton>

          <View style={styles.spacerContainer}>
            <View style={styles.spacer} />
            <Text style={{ fontSize: 12 }}>veya</Text>
            <View style={styles.spacer} />
          </View>

          <OutlineButton
            style={styles.button}
            callback={() => handleNavigate("Register")}
          >
            Kayıt Ol
          </OutlineButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
  },
  purpleBackground: {
    flex: 1,
    paddingTop: 48,
    backgroundColor: "#7972E6",
    borderRadius: 32,
    width: "100%",
  },
  bottom: {
    flex: 1,
    backgroundColor: "lightgray",
    width: "100%",
  },
  cardContainer: {
    position: "absolute",
    width: "80%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    position: "relative",
    width: 128,
    height: 128,
    marginBottom: 64,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  image: {
    width: "80%",
    height: "50%",
  },
  card: {
    position: "relative",
    width: "100%",
    height: "60%",
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12,
  },
  text: {
    marginHorizontal: 34,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
  },
  button: {
    width: "90%",
    margin: 8,
    marginBottom: 0,
  },
  spacerContainer: {
    margin: 8,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  spacer: {
    marginTop: 4,
    marginHorizontal: 8,
    width: "40%",
    height: 2,
    backgroundColor: "#ededed",
    borderRadius: 4,
  },
});

export default Landing;
