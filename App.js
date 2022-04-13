import { useReducer, useEffect, useMemo } from "react";
import { getItemAsync, setItemAsync } from "expo-secure-store";

import {
  Platform,
  StyleSheet,
  LogBox,
  SafeAreaView,
  View,
  Text,
} from "react-native";

import AuthContext from "./auth/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { Navigate, Routes, Route, Link } from "react-router-native";

import Landing from "./screens/Landing";
import RegisterScreen from "./screens/auth/RegsiterScreen";
import LoginScreen from "./screens/auth/LoginScreen";

const App = () => {
  LogBox.ignoreLogs(["Overwriting fontFamily style attribute preprocessor"]);

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

  return (
    <BrowserRouter>
      <AuthContext.Provider value={authContext}>
        <SafeAreaView style={styles.container}>
          <View style={styles.nav}>
            <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
              <Text>Home</Text>
            </Link>
            <Link to="/login" underlayColor="#f0f4f7" style={styles.navItem}>
              <Text>Login</Text>
            </Link>
            <Link to="/register" underlayColor="#f0f4f7" style={styles.navItem}>
              <Text>Register</Text>
            </Link>
          </View>

          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </SafeAreaView>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
});

export default App;
