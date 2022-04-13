import { useReducer, useEffect, useMemo } from "react";
import { getItemAsync, setItemAsync } from "expo-secure-store";

import { Platform, StyleSheet, LogBox, SafeAreaView } from "react-native";

import AuthContext from "./auth/AuthContext";

import Landing from "./screens/Landing";
import RegisterScreen from "./screens/auth/RegsiterScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./components/Header";

const App = () => {
  LogBox.ignoreLogs(["Overwriting fontFamily style attribute preprocessor"]);

  const Stack = createNativeStackNavigator();

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          const updateTokenAsync = async (token) => {
            if (Platform.OS === "web") {
              localStorage.setItem("userToken", token);
            } else {
              await setItemAsync("userToken", token);
            }
          };

          updateTokenAsync(action.token);

          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            user: action.user,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            user: action.user,
          };
        default:
          break;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      user: {},
      userToken: null,
    }
  );

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: "SIGN_IN", user: data.user });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        dispatch({ type: "SIGN_IN", user: data.user });
      },
    }),
    []
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await getItemAsync("userToken");
        console.log("token is: ", userToken);
      } catch (e) {
        console.log(e);
      }
    };

    bootstrapAsync();
  }, []);

  const screenOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        {/* <SafeAreaView style={styles.container}>
          <Header />
        </SafeAreaView> */}
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={screenOptions}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={screenOptions}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={screenOptions}
          />
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
});

export default App;
