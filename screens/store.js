import * as React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { TabMenu } from "../components/tab-menu";
import { Header } from "../components/header";
import { globalFonts, sc, themeColors } from "../styles/global-styles";
import ProgramList from "./subscreens/program-list";
import TrackNowSubScreen from "./subscreens/track-now";
import { StatusBar } from "expo-status-bar";
import ProfileBox from "../components/profilebox";

export default Store = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <Header onPressMenu={() => navigation.openDrawer()} />

      <View style={styles.contentContainer}>
        <ProfileBox />

        <View style={styles.dataContainer}>
          {/* {status !== 200 ? ( */}
            {false? ( 
            <TrackNowSubScreen
              onClick={navigation.navigate("Root", { screen: "TrackNow" })}
            />
          ) : (
            <ProgramList
            navigation={navigation}
          />
          )}
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
