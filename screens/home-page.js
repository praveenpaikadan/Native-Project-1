import * as React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { KeyboardHideOnTouchOutside } from "../components/keyboard-responsive";
import { ForgetPasswordGraphics } from "../assets/svgs/svg-graphics";
import { ButtonType1 } from "../components/buttons";
import { formPageStyles } from "../styles/form-pages-styles";
import { TabMenu } from "../components/tab-menu";
import { Header } from "../components/header";
import { globalFonts, sc, themeColors } from "../styles/global-styles";
import TrackNowSubScreen from "./subscreens/track-now";
import ProgramList from "./subscreens/program-list";
import { AuthContext } from "../components/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react/cjs/react.development";

export default HomePage = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Logout</Text>

      <View style={styles.contentContainer}>
        <ImageBackground
          source={require("../assets/images/dead-lift.jpg")}
          style={styles.profileWrapper}
        >
          <View style={styles.profileContainer}>
            <View style={styles.profilePhotoContainer}>
              <Image
                source={require("../assets/images/profile.jpg")}
                style={styles.profilePhoto}
              />
            </View>
            <View style={styles.profileDataContainer}>
              <View style={styles.profileDataRowContainer1}>
                <Text style={styles.profileName}>{"Olivia Charlotte"}</Text>
              </View>
              <View style={styles.profileDataRowContainer2}>
                <View style={styles.profileDataRowItem}>
                  <Text style={styles.rowItemValue}>{95}</Text>
                  <Text style={styles.rowItemTag}>Workout Tracked</Text>
                </View>
                <View style={styles.profileDataRowItem}>
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Text style={styles.rowItemValue}>{152}</Text>
                    <Text style={styles.rowItemTag}>kg</Text>
                  </View>
                  <Text style={styles.rowItemTag}>Weight Lifted</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.dataContainer}>
          {/* <TrackNowSubScreen /> */}
          <ProgramList />
        </View>
      </View>

      <TabMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: themeColors.tertiary2,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: themeColors.tertiary2,
  },

  //////profile container

  profileWrapper: {
    width: "100%",
    height: 120 * sc,
  },

  profileContainer: {
    flexDirection: "row",
    margin: 10 * sc,
    alignSelf: "center",
    borderRadius: 15 * sc,
    overflow: "hidden",
  },

  profilePhotoContainer: {
    flex: 1,
    marginRight: 2 * sc,
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
  },

  profileDataContainer: {
    flex: 2,
  },

  profileDataRowContainer1: {
    backgroundColor: themeColors.tertiary3,
    flex: 4,
    marginBottom: 1 * sc,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingRight: 15 * sc,
  },

  profileDataRowContainer2: {
    flex: 5,
    flexDirection: "row",
    marginTop: 1 * sc,
  },

  profileDataRowItem: {
    backgroundColor: themeColors.tertiary3,
    flex: 1,
    marginRight: 1 * sc,
    alignItems: "center",
    justifyContent: "center",
  },

  profileName: {
    fontFamily: globalFonts.primaryMedium,
    color: themeColors.secondary1,
    opacity: 0.7,
    fontSize: 18 * sc,
    paddingLeft: 8 * sc,
  },

  rowItemValue: {
    // flex:1,
    fontSize: 28 * sc,
    fontFamily: globalFonts.primaryMedium,
    color: themeColors.secondary1,
    opacity: 0.7,
  },

  rowItemTag: {
    fontFamily: globalFonts.primaryLight,
    fontSize: 12 * sc,
    padding: 3 * sc,
  },

  //////data container
  dataContainer: {
    flex: 1,
    width: "100%",
  },
});
