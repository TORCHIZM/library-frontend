import { useEffect, useState, useContext } from "react";

import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon, { Icons } from "../../../components/Icon";

import {
  Poppins_100Thin,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

import LoadingScreen from "../../LoadingScreen";
import { NavigationContainer } from "@react-navigation/native";
import TopBar from "./TopBar";
import AuthContext from "../../../auth/AuthContext";
import { getItemAsync } from "expo-secure-store";

const ProfileScreen = () => {
  const { signOut } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(async () => {
    let user = await getItemAsync("user");
    user = JSON.parse(user);
    console.log(user);
    setUsername(user.username);
    setProfileImage(user.profileImage);
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  const handleLogOut = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.username}>@{username}</Text>
          <TouchableOpacity onPress={handleLogOut}>
            <Icon type={Icons.FontAwesome} name={"cog"} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={[styles.padding, styles.header, styles.userfields]}>
          <Image
            style={styles.profileImage}
            source={{
              uri: profileImage,
            }}
          />
          <View style={styles.fieldContainer}>
            <View style={styles.field}>
              <Text style={styles.fieldTitle}>15</Text>
              <Text style={styles.fieldText}>Okunan Kitap</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldTitle}>100M</Text>
              <Text style={styles.fieldText}>Takipçi</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldTitle}>0</Text>
              <Text style={styles.fieldText}>Takip Edilen</Text>
            </View>
          </View>
        </View>
        <NavigationContainer independent={true}>
          <TopBar />
        </NavigationContainer>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  scrollview: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContentContainer: {
    paddingTop: 0,
    flex: 1,
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    padding: 16,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userfields: {
    marginBottom: 16,
  },
  username: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
  },
  profileImage: {
    width: 84,
    height: 84,
    borderRadius: 42,
    marginRight: 16,
  },
  fieldContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  field: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fieldText: {
    fontSize: 14,
  },
  padding: {
    paddingHorizontal: 16,
  },
});

export default ProfileScreen;
