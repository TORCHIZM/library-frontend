import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <View>
          <Text>15</Text>
          <Text>Okunan Kitap</Text>
        </View>
        <View>
          <Text>30</Text>
          <Text>Takipçi</Text>
        </View>
        <View>
          <Text>20</Text>
          <Text>Takip Edilen</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default ProfileScreen;
