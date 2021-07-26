import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { globalFonts, sc, themeColors } from "../styles/global-styles";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../components/auth-context";

export default DrawerContent = (props) => {
  const { storedCredentials, setStoredCredentials } =
    React.useContext(AuthContext);

  const logout = () => {
    AsyncStorage.removeItem("Credentials")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <StatusBar style={"light"} />
      <DrawerContentScrollView>
        <View style={styles.userInfo}>
          <Image
            source={require("../assets/images/profile.jpg")}
            style={styles.profilePhoto}
          />
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Olivia Charlotte</Text>
            <View style={styles.heightWeightContainer}>
              <View style={styles.heightWeightTextContainer}>
                <Text style={styles.heightWeightText}>WEIGHT </Text>
                <Text style={styles.number}>55</Text>
                <Text style={styles.heightWeightText}>kg</Text>
              </View>
              <View style={styles.heightWeightTextContainer}>
                <Text style={styles.heightWeightText}>HEIGHT </Text>
                <Text style={styles.number}>168</Text>
                <Text style={styles.heightWeightText}>cm</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.line}></View>
        <View>
          <DrawerItem
            label="Home"
            labelStyle={styles.menuText}
            icon={() => <FontAwesome5 name="home" {...iconStyling} />}
            onPress={() => props.navigation.navigate("Home")}
          />
          <DrawerItem
            label="My Profile"
            labelStyle={styles.menuText}
            icon={() => <FontAwesome name="user" {...iconStyling} />}
            onPress={() => props.navigation.navigate("Profile")}
          />
          <DrawerItem
            label="Store"
            labelStyle={styles.menuText}
            icon={() => <FontAwesome5 name="shopping-bag" {...iconStyling} />}
            onPress={() => props.navigation.navigate("Store")}
          />
          <DrawerItem
            label="Track Now"
            labelStyle={styles.menuText}
            icon={() => (
              <FontAwesome5 name="dumbbell" {...dumbbellIconStyling} />
            )}
            onPress={() => props.navigation.navigate("TrackNow")}
          />
          <DrawerItem
            label="Notifications"
            labelStyle={styles.menuText}
            icon={() => <Ionicons name="notifications" {...iconStyling} />}
          />
          <DrawerItem
            label="Settings"
            labelStyle={styles.menuText}
            icon={() => <Ionicons name="ios-settings" {...iconStyling} />}
            onPress={() => props.navigation.navigate("EditProfile")}
          />
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity onPress={logout}>
        <View style={styles.logoutButton}>
          <Feather name="log-out" {...logoutIconStyling} />
          <Text>Sign Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const iconStyling = {
  size: 22 * sc,
  color: themeColors.tertiary2,
};
const dumbbellIconStyling = {
  size: 18 * sc,
  color: themeColors.tertiary2,
};
const logoutIconStyling = {
  size: 24 * sc,
  color: themeColors.primary1,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.tertiary1,
  },

  userInfo: {
    marginTop: 0 * sc,
    flexDirection: "row",
  },

  profilePhoto: {
    width: 100 * sc,
    height: 100 * sc,
    borderRadius: 50 * sc,
    marginHorizontal: 10 * sc,
  },

  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontFamily: globalFonts.primaryBold,
    color: themeColors.tertiary2,
    fontSize: 16 * sc,
    letterSpacing: 1 * sc,
    marginBottom: 10 * sc,
  },

  heightWeightContainer: {
    flexDirection: "row",
  },

  heightWeightTextContainer: {
    flexDirection: "row",
    backgroundColor: themeColors.tertiary2,
    marginHorizontal: 2 * sc,
    paddingHorizontal: 5 * sc,
    paddingVertical: 2 * sc,
    borderRadius: 10 * sc,
    justifyContent: "center",
    alignItems: "center",
  },

  heightWeightText: {
    fontFamily: globalFonts.primaryRegular,
    fontSize: 12 * sc,
  },

  number: {
    fontFamily: globalFonts.primaryMedium,
    fontSize: 12 * sc,
  },

  line: {
    width: "100%",
    backgroundColor: themeColors.tertiary2,
    height: 2 * sc,
    marginVertical: 10 * sc,
    marginTop: 20 * sc,
  },

  menuText: {
    fontFamily: globalFonts.primaryRegular,
    color: themeColors.tertiary2,
    fontSize: 20 * sc,
  },

  logoutButton: {
    flexDirection: "row",
    marginHorizontal: 10 * sc,
    marginBottom: 20 * sc,
    alignItems: "center",
    paddingVertical: 8 * sc,
    paddingHorizontal: 12 * sc,
    backgroundColor: themeColors.tertiary2,
    width: "35%",
    borderRadius: 5 * sc,
  },
});
