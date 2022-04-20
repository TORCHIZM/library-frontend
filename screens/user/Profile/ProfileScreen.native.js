import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
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

const ProfileScreen = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.username}>@torchizm</Text>
          <Icon type={Icons.FontAwesome} name={"cog"} size={24} />
        </View>
      </View>

      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={[styles.header, styles.userfields]}>
          <Image
            style={styles.profileImage}
            source={{
              uri: "https://pbs.twimg.com/profile_images/1461417562814697478/H8Nvvg4a_200x200.jpg",
            }}
          />
          <View style={styles.fieldContainer}>
            <View style={styles.field}>
              <Text style={styles.fieldTitle}>15</Text>
              <Text style={styles.fieldText}>Okunan Kitap</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldTitle}>300</Text>
              <Text style={styles.fieldText}>Takipçi</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldTitle}>250</Text>
              <Text style={styles.fieldText}>Takip Edilen</Text>
            </View>
          </View>
        </View>
        <TopBar />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  scrollview: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContentContainer: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 100,
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
});

export default ProfileScreen;
