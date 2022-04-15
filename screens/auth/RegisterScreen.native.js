import { useContext, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import PrimaryButton from "../../components/PrimaryButton";
import OutlineButton from "../../components/OutlineButton";
import IconButton from "../../components/IconButton";

import logo from "../../assets/icon-64.png";

import { default as sharedStyles } from "../../styles/Shared";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Circle from "react-native-progress/Circle";

import { Controller, useForm } from "react-hook-form";

import patterns from "../../helpers/patterns";
import AuthContext from "../../auth/AuthContext";
import api from "../../helpers/api";
import { setItemAsync } from "expo-secure-store";
import { navigateWithReset } from "../../helpers/navigationHelper";

const RegisterScreen = () => {
  const image =
    "https://i.pinimg.com/564x/55/5a/15/555a150d6a8b5e225b2aef065bd62bba.jpg";
  const navigation = useNavigation();
  const { height } = Dimensions.get("window");
  const { signIn } = useContext(AuthContext);
  const [apiError, setApiError] = useState(undefined);
  const [isFetching, setIsFetching] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      rePassword: "",
      email: "",
      dobYear: "",
      dobMonth: "",
      dobDay: "",
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

    const day = data.dobDay.length === 1 ? `0${data.dobDay}` : data.dobDay;
    const month =
      data.dobMonth.length === 1 ? `0${data.dobMonth}` : data.dobMonth;
    const dob = `${data.dobYear}-${month}-${day}T00:00:00Z`;

    api
      .post("/user/register", {
        username: data.username,
        fullname: data.fullname,
        password: data.password,
        email: data.email,
        profileImage: image,
        dateOfBirth: dob,
        platform: Platform.OS,
      })
      .then((res) => {
        setIsFetching(false);
        setApiError(undefined);

        signIn({
          user: res.data.data.user,
          session: res.data.data.session,
        });

        const user = JSON.stringify(res.data.data.user);
        const session = JSON.stringify(res.data.data.session);

        setItemAsync("user", user);
        setItemAsync("session", session);

        return navigateWithReset(navigation, "RegisterConfirmation", {
          userId: res.data.data.user._id,
          email: res.data.data.user.email,
        });
      })
      .catch((err) => {
        setIsFetching(false);
        const response = JSON.parse(err.response.request._response);

        switch (response.data) {
          case "User already exists":
            return setApiError("Böyle bir kullanıcı zaten var");
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
        <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
          <View style={styles.header}>
            <IconButton icon="arrow-back" callback={handleGoBack} size={24} />
            <View style={styles.logo}>
              <Image style={styles.image} source={logo} />
            </View>
          </View>

          <View style={styles.cardHeader}>
            <Text style={styles.title}>Kayıt Ol</Text>
            <Text style={styles.text}>
              Kitapseverlerin arasına katıl ve okumaya başla.
            </Text>
          </View>

          <View style={styles.card}>
            {apiError && <Text style={styles.error}>{apiError}</Text>}

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Adınız ve soyadınız adı gerekli",
                },
                minLength: {
                  value: 6,
                  message: "6 karakterden az olamaz",
                },
                maxLength: {
                  value: 64,
                  message: "64 karakterden fazla olamaz",
                },
                pattern: {
                  value: patterns.stringWithSpace,
                  message: "İsminiz geçersiz karakterler içeriyor",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[sharedStyles.inputWithIconContainer, styles.input]}
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
                    placeholder="Adınız ve soyadınız"
                    style={sharedStyles.inputWithIcon}
                  />
                </View>
              )}
              name="fullname"
            />
            {errors.fullname && (
              <Text style={styles.fieldText}>{errors.fullname?.message}</Text>
            )}

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
                  style={[sharedStyles.inputWithIconContainer, styles.input]}
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
                  message: "E-posta alanı gerekli",
                },
                maxLength: {
                  value: 255,
                  message: "E-posta en fazla 255 karakter olabilir",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Geçersiz e-posta adresi",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[sharedStyles.inputWithIconContainer, styles.input]}
                >
                  <Ionicons
                    style={sharedStyles.inputWithIconIcon}
                    name="mail"
                    size={16}
                    color="gray"
                  />
                  <TextInput
                    onBlur={onBlur}
                    selectionColor="gray"
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="E-posta"
                    style={sharedStyles.inputWithIcon}
                  />
                </View>
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.fieldText}>{errors.email?.message}</Text>
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
                    /[0-9]/.test(value) ||
                    "Şifreniz en az bir sayı içermelidir",
                  hasSpecialChar: (value) =>
                    /[!@#$%^&*]/.test(value) ||
                    "Şifreniz !@#$%^&* özel karakterlerinden en az birini içermelidir",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[sharedStyles.inputWithIconContainer, styles.input]}
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
                    /[0-9]/.test(value) ||
                    "Şifreniz en az bir sayı içermelidir",
                  hasSpecialChar: (value) =>
                    /[!@#$%^&*]/.test(value) ||
                    "Şifreniz !@#$%^&* özel karakterlerinden en az birini içermelidir",
                  isEqual: (value) =>
                    value === getValues("password") ||
                    "Şifreleriniz birbiriyle uyuşmuyor",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[sharedStyles.inputWithIconContainer, styles.input]}
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
            <View style={styles.birthdayContainer}>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Doğum günü gerekli",
                  },
                  maxLength: {
                    value: 2,
                    message: "En fazla 2 karakter olabilir",
                  },
                  min: {
                    value: 1,
                    message: "Doğum günü en az 1 olabilir",
                  },
                  max: {
                    value: 31,
                    message: "Doğum tarihi en fazla 31 olabilir",
                  },
                  validate: {
                    isNumber: (value) =>
                      Number(value) || "Doğum tarihi sayılardan oluşmalıdır",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={[
                      sharedStyles.inputWithIconContainer,
                      styles.input,
                      styles.birthdayInput,
                    ]}
                  >
                    <MaterialIcons
                      style={sharedStyles.inputWithIconIcon}
                      name="cake"
                      size={16}
                      color="gray"
                    />
                    <TextInput
                      onBlur={onBlur}
                      selectionColor="gray"
                      onChangeText={(value) => onChange(value)}
                      style={sharedStyles.inputWithIcon}
                      placeholder="Gün"
                      value={value}
                      keyboardType={"number-pad"}
                    />
                  </View>
                )}
                name="dobDay"
              />
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Doğum ayı gerekli",
                  },
                  maxLength: {
                    value: 2,
                    message: "En fazla 2 karakter olabilir",
                  },
                  max: {
                    value: 12,
                    message: "Doğum ayı en fazla 12 olabilir",
                  },
                  validate: {
                    isNumber: (value) =>
                      Number(value) || "Doğum tarihi sayılardan oluşmalıdır",
                    isValid: (value) => {
                      const date = new Date();

                      const checkYear =
                        date.getFullYear() <= Number(getValues("dobYear"));

                      if (checkYear) {
                        const valid = date.getMonth() >= Number(value);
                        return valid ? true : "Geçerli bir doğum ayı giriniz";
                      }
                    },
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={[
                      sharedStyles.inputWithIconContainer,
                      styles.input,
                      styles.birthdayInput,
                    ]}
                  >
                    <TextInput
                      onBlur={onBlur}
                      selectionColor="gray"
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      placeholder="Ay"
                      keyboardType={"number-pad"}
                    />
                  </View>
                )}
                name="dobMonth"
              />
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Doğum yılı gerekli",
                  },
                  maxLength: {
                    value: 4,
                    message: "Doğum yılı en fazla 4 karakter olabilir",
                  },
                  min: {
                    value: 1940,
                    message: "Doğum yılı en az 1940 olabilir",
                  },
                  max: {
                    value: new Date().getFullYear(),
                    message: `Doğum yılı en fazla ${new Date().getFullYear()} olabilir`,
                  },
                  validate: {
                    isNumber: (value) =>
                      Number(value) || "Doğum yılı sayılardan oluşmalıdır",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={[
                      sharedStyles.inputWithIconContainer,
                      styles.input,
                      styles.birthdayInput,
                    ]}
                  >
                    <TextInput
                      onBlur={onBlur}
                      selectionColor="gray"
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      placeholder="Yıl"
                      keyboardType={"number-pad"}
                    />
                  </View>
                )}
                name="dobYear"
              />
            </View>
            {errors.dobDay && (
              <Text style={styles.fieldText}>{errors.dobDay?.message}</Text>
            )}
            {errors.dobMonth && (
              <Text style={styles.fieldText}>{errors.dobMonth?.message}</Text>
            )}
            {errors.dobYear && (
              <Text style={styles.fieldText}>{errors.dobYear?.message}</Text>
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
                "Kayıt Ol"
              )}
            </PrimaryButton>

            <View style={styles.bottomInfoView}>
              <Text>Kayıt olarak </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("PrivacyPolicy")}
              >
                <Text style={styles.blueText}>gizlilik sözleşmesi </Text>
              </TouchableOpacity>
              <Text>ve </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("UseOfTerms")}
              >
                <Text style={styles.blueText}>kullanım koşullarını </Text>
              </TouchableOpacity>
              <Text>kabul etmiş olursunuz</Text>
            </View>
          </View>

          <View style={styles.spacerContainer}>
            <View style={styles.spacer} />
            <Text style={styles.spacerText}>veya</Text>
            <View style={styles.spacer} />
          </View>

          <View style={styles.takeRemaining} />

          <OutlineButton
            style={styles.whiteButton}
            callback={() => handleNavigate("Login")}
          >
            Giriş Yap
          </OutlineButton>
        </ScrollView>
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
    justifyContent: "flex-start",
    paddingTop: 48,
  },
  header: {
    position: "relative",
    width: "100%",
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
  birthdayContainer: {
    flexDirection: "row",
    width: "92%",
    margin: 4,
  },
  birthdayInput: {
    flex: 1,
  },
  card: {
    width: "100%",
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
  whiteButton: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 32,
  },
  spacerContainer: {
    marginVertical: 16,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  spacer: {
    marginTop: 4,
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
  blueText: {
    color: "#7972E6",
  },
  bottomInfoView: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RegisterScreen;
