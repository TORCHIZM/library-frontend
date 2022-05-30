import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import Tabs from "../components/Tabs";
import FeedPoster from "./user/FeedPoster";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const MainScreen = () => {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Kitapp</Text>
        <Ionicons style={styles.icon} name="ios-menu" size={24} color="black" />
      </View>
      <NavigationContainer independent={true}>
        <Tabs navigation={navigation} />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 22,
  },
  icon: {
    marginTop: 4,
  },
  header: {
    alignItems: "center",
    marginHorizontal: 24,
    marginVertical: 12,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default MainScreen;
