import { useContext } from "react";

import { NavigationContainer, useNavigation } from "@react-navigation/native";

import AuthContext from "../auth/AuthContext";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tabs from "../components/Tabs";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleSignOut = () => {
    console.log(signOut);
    signOut();
    navigation.navigate("Landing");
  };

  return (
    <NavigationContainer independent={true}>
      <Tabs />
    </NavigationContainer>
  );
};

export default MainScreen;
