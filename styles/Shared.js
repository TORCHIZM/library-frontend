import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputWithLabel: {
    width: "100%",
    backgroundColor: "#d4d4d4",
    padding: 12,
    borderRadius: 8,
  },

  inputWithIconContainer: {
    position: "relative",
    width: "100%",
    backgroundColor: "#d4d4d4",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  inputWithIconIcon: {
    position: "absolute",
    left: 12,
  },
  inputWithIcon: {
    paddingLeft: 24,
  },
});

export default styles;
