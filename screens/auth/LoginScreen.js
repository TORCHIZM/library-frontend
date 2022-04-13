import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import logo from "../../assets/icon-64.png";
import PrimaryButton from "../../components/PrimaryButton";
import OutlineButton from "../../components/OutlineButton";
import IconButton from "../../components/IconButton";

import TextButton from "../../components/TextButton";
import { Controller, useForm } from "react-hook-form";

import { default as sharedStyles } from "../../styles/Shared";
import patterns from "../../helpers/patterns";

const LoginScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNavigate = (page) => {
    navigation.navigate(page);
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  const onSubmit = (data) => console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.purpleBackground}></View>
      <View style={styles.bottom}></View>

      <View style={styles.header}>
        <View style={styles.backContainer}>
          <IconButton icon="arrow-back" callback={handleGoBack} size={24} />
        </View>
        <View style={styles.logo}>
          <Image style={styles.image} source={logo} />
        </View>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>Giriş Yap</Text>
          <Text style={styles.text}>
            Kitapseverlerin arasına katıl ve okumaya başla.
          </Text>
        </View>

        <View style={styles.card}>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 6,
              maxLength: 32,
              pattern: patterns.string,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={[sharedStyles.inputWithLabel, styles.input]}
                placeholder="Kullanıcı adı"
              />
            )}
            name="username"
          />
          {errors.username && <Text>{errors.username?.message}</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                selectionColor="gray"
                onChangeText={(value) => onChange(value)}
                style={[sharedStyles.inputWithLabel, styles.input]}
                placeholder="Şifre"
                value={value}
                password={true}
              />
            )}
            name="password"
          />
          {errors.password && <Text>This is required.</Text>}

          <PrimaryButton
            style={styles.button}
            callback={handleSubmit(onSubmit)}
          >
            Giriş Yap
          </PrimaryButton>
          <TextButton
            style={styles.button}
            callback={() => handleNavigate("ForgotPassword")}
          >
            Şifreni mi unuttun?
          </TextButton>
        </View>

        <View style={styles.spacerContainer}>
          <View style={styles.spacer} />
          <Text style={{ fontSize: 13, color: "#a6a6a6", fontWeight: "bold" }}>
            veya
          </Text>
          <View style={styles.spacer} />
        </View>

        <OutlineButton
          style={styles.whiteButton}
          callback={() => handleNavigate("Register")}
        >
          Kayıt Ol
        </OutlineButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
  },
  purpleBackground: {
    flex: 0.6,
    backgroundColor: "#7972E6",
    borderRadius: 32,
    width: "100%",
  },
  bottom: {
    flex: 1,
    backgroundColor: "lightgray",
    width: "100%",
  },
  cardContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 64,
  },
  header: {
    position: "absolute",
    width: "90%",
    height: "10%",
    flexDirection: "row",
    top: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  backContainer: {
    position: "absolute",
    left: 0,
    top: 12,
  },
  logo: {
    position: "relative",
    backgroundColor: "white",
    height: "80%",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  image: {
    width: 32,
    height: 32,
  },
  cardHeader: {
    marginHorizontal: 16,
    marginBottom: 48,
    width: "85%",
    color: "white",
    textAlign: "left",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  card: {
    position: "relative",
    width: "90%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
  },
  text: {
    color: "white",
    marginTop: 16,
    fontSize: 14,
    marginRight: 96,
  },
  button: {
    width: "90%",
    margin: 8,
    marginBottom: 0,
  },
  whiteButton: {
    width: "90%",
    margin: 8,
    marginBottom: 0,
    backgroundColor: "white",
  },
  spacerContainer: {
    margin: 8,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  spacer: {
    marginTop: 4,
    marginHorizontal: 8,
    width: "40%",
    height: 2,
    backgroundColor: "#a6a6a6",
    borderRadius: 4,
  },
  input: {
    width: "90%",
    margin: 4,
  },
});

export default LoginScreen;
