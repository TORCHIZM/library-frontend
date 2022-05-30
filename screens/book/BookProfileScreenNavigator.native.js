import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyBooksScreen from "../user/MyBooksScreen.native";
import BookProfileScreen from "./Profile/BookProfileScreen";

const Stack = createNativeStackNavigator();

const BookProfileScreenNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="List" component={MyBooksScreen} />
        <Stack.Screen name="BookProfile" component={BookProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BookProfileScreenNavigator;
