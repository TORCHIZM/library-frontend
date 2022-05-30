import { TouchableHighlight, StyleSheet, Text } from "react-native";

const OutlineButton = ({ children, callback, style, textColor }) => {
  const handlePress = () => {
    if (callback !== undefined) {
      callback();
    }
  };

  return (
    <TouchableHighlight
      underlayColor={"#F5F5FF"}
      onPress={handlePress}
      style={[styles.button, style]}
    >
      <Text
        style={[
          styles.text,
          textColor === undefined ? styles.textColor : { color: textColor },
        ]}
      >
        {children}
      </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#7972EA",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#7972EA",
    fontSize: 16,
    fontWeight: "bold",
  },
  textColor: {
    color: "#7972EA",
  },
});

export default OutlineButton;
