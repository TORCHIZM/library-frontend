import React from "react";
import { TouchableHighlight, Text, StyleSheet } from "react-native";

const PrimaryButton = ({ children, callback, style }) => {
  const handlePress = () => {
    if (callback !== undefined) {
      callback();
    }
  };

  return (
    <TouchableHighlight
      underlayColor={"#7169FF"}
      onPress={handlePress}
      style={[styles.button, style]}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: "#7972EA",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PrimaryButton;
