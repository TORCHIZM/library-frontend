import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState, useContext } from "react";

import api from "../../helpers/api";
import AuthContext from "../../auth/AuthContext";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const { signUp } = useContext(AuthContext);

  const register = () => {
    api
      .post("user", {
        username: username,
        fullname: fullname,
        password: password,
        email: email,
        profileImage:
          "https://i.pinimg.com/564x/55/5a/15/555a150d6a8b5e225b2aef065bd62bba.jpg",
        dateOfBirth: "1978-01-02T15:04:05Z",
      })
      .then((res) => {
        if (res.status === 200) {
          signUp(res.data.data);
        }
      })
      .catch((err) => {});
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Fullname"
        value={fullname}
        onChangeText={setFullname}
      />
      <Button title="Kayıt Ol" onPress={() => register()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default RegisterScreen;
