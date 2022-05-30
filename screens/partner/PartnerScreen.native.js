import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";
import PartnerGiveBookScreen from "./PartnerGiveBookScreen.native";
import PartnerMainScreen from "./PartnerMainScreen.native";

const PartnerScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={PartnerMainScreen} />
        <Stack.Screen name="GiveBook" component={PartnerGiveBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PartnerScreen;
