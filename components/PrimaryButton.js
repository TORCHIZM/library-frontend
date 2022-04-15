import React from "react";
import { TouchableHighlight, Text, View, StyleSheet } from "react-native";

const PrimaryButton = ({ children, callback, style }) => {
  const handlePress = () => {
    if (callback !== undefined) {
      callback();
    }
  };

  if (typeof children === "string") {
    return (
      <TouchableHighlight
        underlayColor={"#7169FF"}
        onPress={handlePress}
        style={[styles.button, style]}
      >
        <Text style={styles.text}>{children}</Text>
      </TouchableHighlight>
    );
  }

  return (
    <TouchableHighlight
      underlayColor={"#7169FF"}
      onPress={handlePress}
      style={[styles.button, style]}
    >
      <View>{children}</View>
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
