import { StyleSheet, TextInput } from "react-native";

const InputWithLabel = ({
  onBlur,
  onChange,
  value,
  style,
  placeholder = "",
  password = false,
}) => {
  return (
    <TextInput
      onBlur={onBlur}
      onChangeText={onChange}
      selectionColor="gray"
      value={value}
      style={[styles.input, style]}
      secureTextEntry={password}
      placeholder={placeholder}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "#d4d4d4",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});

export default InputWithLabel;
