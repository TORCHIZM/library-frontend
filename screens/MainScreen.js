import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Button, View } from "react-native";
import { navigateWithReset } from "../helpers/navigationHelper";

const MainScreen = () => {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut();
    navigateWithReset(navigation, "Landing");
  };

  return (
    <View>
      <Text>Main.native</Text>
      <Button onPress={handleSignOut}>Çıkış yap</Button>
    </View>
  );
};

export default MainScreen;
