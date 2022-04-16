import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import PrimaryButton from "../../components/PrimaryButton";
import IconButton from "../../components/IconButton";
import TextButton from "../../components/TextButton";

import logo from "../../assets/icon-64.png";

import { default as sharedStyles } from "../../styles/Shared";
import { Ionicons } from "@expo/vector-icons";
import Circle from "react-native-progress/Circle";

import { Controller, useForm } from "react-hook-form";

import api from "../../helpers/api";
import { navigateWithReset } from "../../helpers/navigationHelper";
import OutlineButton from "../../components/OutlineButton";

const ForgotPasswordConfirmationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { height } = Dimensions.get("window");

  const [apiError, setApiError] = useState(undefined);
  const [isFetching, setIsFetching] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
      password: "",
      rePassword: "",
    },
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const onSubmit = (data) => {
    setIsFetching(true);

    api
      .post("/user/forgot-password-confirm", {
        code: Number(data.code),
        password: data.password,
      })
      .then((res) => {
        setIsFetching(false);
        setApiError(undefined);

        return navigateWithReset(navigation, "Login");
      })
      .catch((err) => {
        setIsFetching(false);
        const response = JSON.parse(err.response.request._response);

        switch (response.data) {
          case "User not found":
            return setApiError("Böyle bir kullanıcı bulunamadı");
          case "Confirmation not found":
            return setApiError("Onay kaydı bulunamadı.");
          case "Wrong code":
            return setApiError("Kod doğrulanamadı");
          case "Code expired":
            return setApiError("Kodun süresi dolmuş");
          case "Your password cannot be the same as the old password":
            return setApiError("Şifreniz eski şifrenizle aynı olamaz");
          case "An error has been occurred":
            return setApiError("Bilinmeyen bir hata meydana geldi");
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
          {navigation.canGoBack() && (
            <IconButton icon="arrow-back" callback={handleGoBack} size={24} />
          )}
          <View style={styles.blank} />
          <View style={styles.logo}>
            <Image style={styles.image} source={logo} />
          </View>
        </View>

        <View style={styles.cardHeader}>
          <Text style={styles.title}>Kaydınızı Tamamlayın</Text>
          <Text style={styles.text}>
            Mail adresinize gelen aktivasyon kodunu giriniz
          </Text>
        </View>

        <View style={styles.card}>
          {apiError && <Text style={styles.error}>{apiError}</Text>}

          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Kod alanı gerekli",
              },
              maxLength: {
                value: 6,
                message: "Kod en fazla 6 karakter olabilir",
              },
              validate: {
                isNumber: (value) =>
                  Number(value) || "Kod sadece sayılardan oluşmalı",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[sharedStyles.inputWithIconContainer, styles.input]}>
                <Ionicons
                  style={sharedStyles.inputWithIconIcon}
                  name="keypad"
                  size={16}
                  color="gray"
                />
                <TextInput
                  onBlur={onBlur}
                  selectionColor="gray"
                  onChangeText={(value) => onChange(value)}
                  style={sharedStyles.inputWithIcon}
                  placeholder="Kod"
                  value={value}
                  keyboardType={"number-pad"}
                />
              </View>
            )}
            name="code"
          />
          {errors.code && (
            <Text style={styles.fieldText}>{errors.code?.message}</Text>
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
              <View style={[sharedStyles.inputWithIconContainer, styles.input]}>
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
                isEqual: (value) =>
                  value === getValues("password") ||
                  "Şifreleriniz birbiriyle uyuşmuyor",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[sharedStyles.inputWithIconContainer, styles.input]}>
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
                  placeholder="Tekrar Şifre"
                  value={value}
                  secureTextEntry
                />
              </View>
            )}
            name="rePassword"
          />
          {errors.rePassword && (
            <Text style={styles.fieldText}>{errors.rePassword?.message}</Text>
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
              "Kodu Onayla"
            )}
          </PrimaryButton>
          <View style={styles.takeRemaining} />
        </View>

        <TextButton
          style={styles.textButton}
          callback={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.didntReceiveCode}>Kod almadım</Text>
        </TextButton>

        <View style={styles.takeRemaining} />

        <OutlineButton
          style={styles.whiteButton}
          callback={() => navigation.navigate("Login")}
        >
          Giriş Yap
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
    paddingTop: 48,
    paddingBottom: 32,
  },
  header: {
    position: "relative",
    width: "90%",
    alignItems: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  blank: {
    width: "100%",
    height: 48,
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
    marginTop: 16,
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
  didntReceiveCode: {
    color: "#7972E6",
  },
  textButtonContent: {
    color: "#7972E6",
    fontWeight: "bold",
    textAlign: "center",
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

export default ForgotPasswordConfirmationScreen;
