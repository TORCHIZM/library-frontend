import { Image, View, StyleSheet } from "react-native";
import logo from "../assets/icon-256.png";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
  },
  image: {
    width: 128,
    height: 128,
  },
});

export default LoadingScreen;
