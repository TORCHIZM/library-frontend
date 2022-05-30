import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";
import AboutScreen from "./AboutScreen";
import QuotationScreen from "./QuotationScreen";

const Tab = createMaterialTopTabNavigator();

const Tabs = [
  {
    name: "Hakkında",
    component: AboutScreen,
  },
  {
    name: "Alıntılar",
    component: QuotationScreen,
  },
];

const TopBar = (props) => {
  return (
    <Tab.Navigator
      style={styles.navigator}
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "#000000",
        },
        tabBarStyle: {
          backgroundColor: "#F2F2F2",
        },
        tabBarContentContainerStyle: {
          flex: 1,
          height: "100%",
        },
      }}
    >
      {Tabs.map((tab) => {
        return (
          <Tab.Screen
            key="topbarScreen"
            name={tab.name}
            component={tab.component}
            initialParams={props}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default TopBar;
