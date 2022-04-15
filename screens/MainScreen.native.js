import { useContext } from "react";
import { Button, View, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

import AuthContext from "../auth/AuthContext";
import { navigateWithReset } from "../helpers/navigationHelper";

const MainScreen = () => {
  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
    navigateWithReset(navigation, "Landing");
  };

  return (
    <View>
      <Text>Giriş başarılı</Text>
      <Button onPress={handleSignOut} title="Çıkış Yap">
        Çıkış yap
      </Button>
    </View>
  );
};

export default MainScreen;
