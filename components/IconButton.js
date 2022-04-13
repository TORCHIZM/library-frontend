import { TouchableHighlight, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ icon, callback, style, size = 24, color = "white" }) => {
  const handlePress = () => {
    if (callback !== undefined) {
      callback();
    }
  };

  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={handlePress}
      style={[styles.button, style]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#7972EA",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IconButton;
