import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import IconButton from "../../components/IconButton";

const PartnerMainScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.addNewContainer}>
        <IconButton
          callback={() => navigation.navigate("GiveBook")}
          color="black"
          size={24}
          icon="md-person-add"
          style={styles.addNewButton}
        />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Hoşgeldiniz, Tavşanlı kütüphanesi</Text>
        </View>
        <View style={styles.content}>
          <View>
            <Text>Bugün Beklenen Kitap</Text>
            <Text>10</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  addNewContainer: {
    position: "absolute",
    width: 64,
    height: 64,
    right: 30,
    bottom: 30,
    backgroundColor: "lightgray",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#171717",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 5,
  },
  addNewButton: {
    zIndex: 4,
  },
});

export default PartnerMainScreen;
