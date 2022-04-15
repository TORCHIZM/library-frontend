import { useContext, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  Platform,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import PrimaryButton from "../../components/PrimaryButton";
import OutlineButton from "../../components/OutlineButton";
import IconButton from "../../components/IconButton";
import TextButton from "../../components/TextButton";

import logo from "../../assets/icon-64.png";

import { default as sharedStyles } from "../../styles/Shared";
import { Ionicons } from "@expo/vector-icons";
import Circle from "react-native-progress/Circle";

import { Controller, useForm } from "react-hook-form";

import patterns from "../../helpers/patterns";
import AuthContext from "../../auth/AuthContext";
import api from "../../helpers/api";
import { navigateWithReset } from "../../helpers/navigationHelper";
import { setItemAsync } from "expo-secure-store";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { height } = Dimensions.get("window");
  const { signIn } = useContext(AuthContext);
  const [apiError, setApiError] = useState(undefined);
  const [isFetching, setIsFetching] = useState(false);

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

  const onSubmit = (data) => {
    setIsFetching(true);

    api
      .post("/user/login", {
        username: data.username,
        password: data.password,
        platform: Platform.OS,
      })
      .then((res) => {
        setIsFetching(false);
        setApiError(undefined);

        signIn({
          user: res.data.data.user,
          session: res.data.data.session,
        });

        const userAsString = JSON.stringify(res.data.data.user);
        const sessionAsString = JSON.stringify(res.data.data.session);

        setItemAsync("user", userAsString);
        setItemAsync("session", sessionAsString);

        navigateWithReset(navigation, "Main");
      })
      .catch((err) => {
        setIsFetching(false);
        const response = JSON.parse(err.response.request._response);

        switch (response.data) {
          case "User not found":
            return setApiError("Kullanıcı adı veya şifre yanlış");
          case "Credentials not matching our records":
            return setApiError("Kullanıcı adı veya şifre yanlış");
          case "Your account is not verified yet":
            return setApiError(
              "Hesabınız henüz onaylanmamış mail adresinize gelen kod ile hesabınızı aktif edin"
            );
          case "An error has been occurred":
            return setApiError("Bilinmeyen bir hata meydana geldi");
          case "Sid token couldn't signed":
            return setApiError(
              "Oturum oluşturulamadı tekrar giriş yapmayı deneyin"
            );
          default:
            break;
        }
      });
  };

  return (
    <View style={[styles.container, { height: height }]}>
      <View style={styles.background}>
        <View style={styles.purpleBackground}></View>
        <View style={styles.bottom}></View>
      </View>

      <View style={[styles.cardContainer, { height: height }]}>
        <View style={styles.header}>
          <IconButton icon="arrow-back" callback={handleGoBack} size={24} />
          <View style={styles.logo}>
            <Image style={styles.image} source={logo} />
          </View>
        </View>

        <View style={styles.cardHeader}>
          <Text style={styles.title}>Giriş Yap</Text>
          <Text style={styles.text}>Hoşgeldiniz.</Text>
        </View>

        <View style={styles.card}>
          {apiError && <Text style={styles.error}>{apiError}</Text>}

          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Kullanıcı adı gerekli",
              },
              minLength: {
                value: 6,
                message: "6 karakterden az olamaz",
              },
              maxLength: {
                value: 32,
                message: "32 karakterden fazla olamaz",
              },
              pattern: {
                value: patterns.string,
                message: "Kullanıcı adınız geçersiz karakterler içeriyor",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={[sharedStyles.inputWithIconContainer, , styles.input]}
              >
                <Ionicons
                  style={sharedStyles.inputWithIconIcon}
                  name="person"
                  size={16}
                  color="gray"
                />
                <TextInput
                  onBlur={onBlur}
                  selectionColor="gray"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholder="Kullanıcı adı"
                  style={sharedStyles.inputWithIcon}
                />
              </View>
            )}
            name="username"
          />
          {errors.username && (
            <Text style={styles.fieldText}>{errors.username?.message}</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Şifre alanı gerekli",
              },
              minLength: {
                value: 6,
                message: "Şifre en az 6 karakter olmalı",
              },
              maxLength: {
                value: 255,
                message: "Şifre en fazla 255 karakter olmalı",
              },
              validate: {
                hasLowerLetter: (value) =>
                  /[a-z]/.test(value) ||
                  "Şifreniz en az bir küçük karakter içermelidir",
                hasUpperLetter: (value) =>
                  /[A-Z]/.test(value) ||
                  "Şifreniz en az bir büyük karakter içermelidir",
                hasNumber: (value) =>
                  /[0-9]/.test(value) || "Şifreniz en az bir sayı içermelidir",
                hasSpecialChar: (value) =>
                  /[!@#$%^&*]/.test(value) ||
                  "Şifreniz !@#$%^&* özel karakterlerinden en az birini içermelidir",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={[sharedStyles.inputWithIconContainer, , styles.input]}
              >
                <Ionicons
                  style={sharedStyles.inputWithIconIcon}
                  name="lock-closed"
                  size={16}
                  color="gray"
                />
                <TextInput
                  onBlur={onBlur}
                  selectionColor="gray"
                  onChangeText={(value) => onChange(value)}
                  style={sharedStyles.inputWithIcon}
                  placeholder="Şifre"
                  value={value}
                  secureTextEntry
                />
              </View>
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles.fieldText}>{errors.password?.message}</Text>
          )}

          <PrimaryButton
            style={styles.button}
            callback={handleSubmit(onSubmit)}
          >
            {isFetching ? (
              <Circle
                size={18}
                endAngle={0.5}
                color={"white"}
                indeterminate={true}
              />
            ) : (
              "Giriş Yap"
            )}
          </PrimaryButton>
          <View style={styles.takeRemaining} />
          <TextButton
            style={styles.textButton}
            callback={() => handleNavigate("ForgotPassword")}
          >
            Şifreni mi unuttun?
          </TextButton>
        </View>

        <View style={styles.spacerContainer}>
          <View style={styles.spacer} />
          <Text style={styles.spacerText}>veya</Text>
          <View style={styles.spacer} />
        </View>

        <View style={styles.takeRemaining} />

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
  background: {
    position: "absolute",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFE0F4",
  },
  purpleBackground: {
    flex: 0.6,
    backgroundColor: "#7972E6",
    borderRadius: 32,
    width: "100%",
  },
  bottom: {
    flex: 1,
    backgroundColor: "#DFE0F4",
    width: "100%",
  },
  cardContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 48,
  },
  header: {
    position: "relative",
    width: "90%",
    alignItems: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 8,
  },
  cardHeader: {
    paddingBottom: 48,
    width: "85%",
    color: "white",
    textAlign: "left",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 16,
    borderRadius: 16,
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
  fieldText: {
    color: "#D93D54",
    marginBottom: 8,
    width: "90%",
    textAlign: "left",
    paddingRight: 36,
  },
  button: {
    width: "90%",
    margin: 8,
    marginBottom: 0,
  },
  textButton: {
    width: "90%",
    margin: 8,
    marginBottom: 0,
  },
  whiteButton: {
    width: "90%",
    margin: 8,
    marginBottom: 0,
  },
  spacerContainer: {
    marginVertical: 16,
    marginHorizontal: 24,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  spacer: {
    marginTop: 4,
    marginHorizontal: 8,
    width: "37%",
    height: 2,
    backgroundColor: "#9e9e9e",
    borderRadius: 4,
  },
  spacerText: {
    fontSize: 13,
    color: "#9e9e9e",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  takeRemaining: {
    flexGrow: 1,
  },
  input: {
    width: "90%",
    margin: 4,
  },
  error: {
    fontWeight: "bold",
    fontSize: 16,
    width: "100%",
    color: "#D93D54",
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
});

export default LoginScreen;
