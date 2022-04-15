import { useReducer, useEffect, useMemo, useRef } from "react";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

import { LogBox } from "react-native";

import AuthContext from "./auth/AuthContext";

import LandingScreen from "./screens/LandingScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import RegisterConfirmationScreen from "./screens/auth/RegisterConfirmationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import MainScreen from "./screens/MainScreen";
import PrivacyPolicyScreen from "./screens/about/PrivacyPolicyScreen";
import UseOfTermsScreen from "./screens/about/UseOfTermsScreen";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { navigateWithReset } from "./helpers/navigationHelper";
import LoadingScreen from "./screens/LoadingScreen";

const App = () => {
  LogBox.ignoreLogs(["Overwriting fontFamily style attribute preprocessor"]);
  const navigation = useRef(null);
  const Stack = createNativeStackNavigator();

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_SESSION":
          const updateSessionAsync = async (session) => {
            await setItemAsync("session", session);
          };

          updateSessionAsync(action.session);

          return {
            ...prevState,
            session: action.session,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            user: action.user,
            session: action.session,
          };
        case "SIGN_OUT":
          const deleteUserAndSessionAsync = async () => {
            deleteItemAsync("user");
            deleteItemAsync("session");
          };

          deleteUserAndSessionAsync();

          return {
            ...prevState,
            isSignout: true,
            user: action.user,
            session: action.session,
          };
        case "ACTIVATE":
          const updateUserAsync = async (user) => {
            const userAsString = JSON.stringify(user);
            setItemAsync("user", userAsString);
          };

          const user = JSON.parse(prevState.user);

          const newUser = {
            _id: user._id,
            active: true,
            username: user.username,
            password: user.password,
            email: user.email,
            fullName: user.fullName,
            profileImage: user.profileImage,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };

          updateUserAsync(newUser);

          return {
            ...prevState,
            user: newUser,
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
        dispatch({ type: "SIGN_IN", user: data.user, session: data.session });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      activate: () => dispatch({ type: "ACTIVATE" }),
    }),
    []
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        let session = await getItemAsync("session");
        let user = await getItemAsync("user");

        if (
          session !== undefined &&
          session !== null &&
          user !== undefined &&
          user !== null
        ) {
          authContext.signIn({
            user: user,
            session: session,
          });

          user = JSON.parse(user);
          console.log(user.active);
          if (!user.active) {
            console.log("here");

            console.log(user);

            return navigation.current.navigate("RegisterConfirmation", {
              userId: user._id,
              email: user.email,
            });
          }

          return navigateWithReset(navigation.current, "Main");
        }

        return navigateWithReset(navigation.current, "Landing");
      } catch (e) {}
    };

    bootstrapAsync();
  }, []);

  const screenOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer ref={navigation}>
      <StatusBar barStyle="default" />
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={screenOptions}
          />

          <Stack.Screen
            name="Landing"
            component={LandingScreen}
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

          <Stack.Screen
            name="RegisterConfirmation"
            component={RegisterConfirmationScreen}
            options={screenOptions}
          />

          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={screenOptions}
          />

          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicyScreen}
            options={screenOptions}
          />
          <Stack.Screen
            name="UseOfTerms"
            component={UseOfTermsScreen}
            options={screenOptions}
          />
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default App;
