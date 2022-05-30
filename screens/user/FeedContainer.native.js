import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FeedScreen from "./FeedScreen";
import FeedPoster from "./FeedPoster";

const FeedContainer = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="FeedPoster" component={FeedPoster} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default FeedContainer;
