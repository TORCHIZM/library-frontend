import React from "react";
import { TouchableHighlight, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight>
      <View style={styles.nav}>
        <Text
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Landing");
          }}
        >
          Home
        </Text>
        <Text
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          Login
        </Text>
        <Text
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Register
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "center",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
});

export default Header;
