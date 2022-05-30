import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PartnerGiveBookScreen = () => {
  return (
    <View style={styles.main}>
      <Text>kitap devret</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PartnerGiveBookScreen;
