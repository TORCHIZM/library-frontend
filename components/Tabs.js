import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon, { Icons } from "./Icon";
import Colors from "../styles/Colors";

import ProfileScreen from "../screens/user/Profile/ProfileScreen";
import FeedContainer from "../screens/user/FeedContainer";
import SearchScreen from "../screens/user/SearchScreen";

import BookProfileScreenNavigator from "../screens/book/BookProfileScreenNavigator.native";
import { getItemAsync } from "expo-secure-store";
import PartnerScreen from "../screens/partner/PartnerScreen.native";

const Tab = createBottomTabNavigator();

const TabList = [
  {
    route: "Feed",
    label: "Ana Sayfa",
    type: Icons.Ionicons,
    activeIcon: "grid",
    inActiveIcon: "grid-outline",
    component: FeedContainer,
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
    route: "Partner",
    label: "Partner",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "tooltip-edit",
    inActiveIcon: "tooltip-edit-outline",
    component: PartnerScreen,
    requireRole: "6254a2c3328bd199abf63cd7",
  },
  {
    route: "MyBooks",
    label: "Kitaplar",
    type: Icons.Ionicons,
    activeIcon: "bookmark",
    inActiveIcon: "bookmark-outline",
    component: BookProfileScreenNavigator,
  },
  {
    route: "MyProfile",
    label: "Profil",
    image: "person",
    component: ProfileScreen,
  },
];

const TabButton = (props) => {
  const { item, onPress, accessibilityState, requireRole } = props;
  const focused = accessibilityState.selected;
  const [profileImage, setProfileImage] = useState("");

  useEffect(async () => {
    let user = await getItemAsync("user");
    user = JSON.parse(user);
    setProfileImage(user.profileImage);
  }, []);

  if (requireRole !== undefined && requireRole !== role) {
    return <></>;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <View style={styles.container}>
        {item.image ? (
          <Image
            style={focused ? styles.focusedImage : styles.image}
            source={{
              uri: profileImage,
            }}
          />
        ) : (
          <Icon
            type={item.type}
            name={focused ? item.activeIcon : item.inActiveIcon}
            color={focused ? Colors.dark : Colors.dark}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const Tabs = (props) => {
  const [role, setRole] = useState("");

  useEffect(async () => {
    let user = await getItemAsync("user");
    user = JSON.parse(user);
    setRole(user.role);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
        },
      }}
    >
      {TabList.map((item, index) => {
        if (item.requireRole !== undefined && item.requireRole !== role) {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <></>,
              }}
              {...props}
            />
          );
        }

        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
            {...props}
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
  image: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  focusedImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderColor: Colors.dark,
    borderWidth: 3,
  },
});

export default Tabs;
