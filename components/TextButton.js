import React from "react";
import { TouchableHighlight, Text, StyleSheet } from "react-native";

const TextButton = ({ ref, disabled, children, callback, style }) => {
  const handlePress = () => {
    if (callback !== undefined) {
      callback();
    }
  };

  return (
    <TouchableHighlight
      ref={ref}
      disabled={disabled}
      underlayColor="transparent"
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
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#7972EA",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TextButton;
