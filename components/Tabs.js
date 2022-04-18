import { StyleSheet, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon, { Icons } from "./Icon";
import Colors from "../styles/Colors";

import MyBooksScreen from "../screens/user/MyBooksScreen";
import ProfileScreen from "../screens/user/Profile/ProfileScreen";
import FeedScreen from "../screens/user/FeedScreen";
import SearchScreen from "../screens/user/SearchScreen";

const Tab = createBottomTabNavigator();

const TabList = [
  {
    route: "MyProfile",
    label: "Profil",
    type: Icons.Ionicons,
    activeIcon: "person",
    inActiveIcon: "person-outline",
    component: ProfileScreen,
  },
  {
    route: "Feed",
    label: "Ana Sayfa",
    type: Icons.Ionicons,
    activeIcon: "grid",
    inActiveIcon: "grid-outline",
    component: FeedScreen,
  },
  {
    route: "Search",
    label: "Ara",
    type: Icons.Ionicons,
    activeIcon: "search",
    inActiveIcon: "search-outline",
    component: SearchScreen,
  },
  {
    route: "MyBooks",
    label: "Kitaplar",
    type: Icons.Ionicons,
    activeIcon: "bookmark",
    inActiveIcon: "bookmark-outline",
    component: MyBooksScreen,
  },
];

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <View style={styles.container}>
        <Icon
          type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? Colors.primary : Colors.primaryLite}
        />
      </View>
    </TouchableOpacity>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
      }}
    >
      {TabList.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Tabs;
