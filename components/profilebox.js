import * as React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { globalFonts, sc, themeColors } from "../styles/global-styles";
import { AuthContext } from "./auth-context";


export default ProfileBox = () => {

    const {credentials} = React.useContext(AuthContext);
    // const {dayWorkout, programOver, setProgramOver} = React.useContext(WorkoutContext);
  
    const data = {
      userId: 1,
      name: credentials.name,
      avatar: require("../assets/images/profile.jpg"),
      gender: credentials.gender,
      dob: "01-01-1986",
      height: 168,
      weight: 55,
      status: "active",
      subscription: "complete",
      workoutsTracked: 28,
      caloriesBurnt: 14000,
    };

    return (
        <ImageBackground
        source={require("../assets/images/dead-lift.jpg")}
        style={styles.profileWrapper}
      >
        <View style={styles.profileContainer}>
          <View style={styles.profilePhotoContainer}>
            <Image source={data.avatar} style={styles.profilePhoto} />
          </View>
          <View style={styles.profileDataContainer}>
            <View style={styles.profileDataRowContainer1}>
              <Text style={styles.profileName}>{data.name}</Text>
            </View>
            <View style={styles.profileDataRowContainer2}>
              <View style={styles.profileDataRowItem}>
                <Text style={styles.rowItemValue}>
                  {data.workoutsTracked}
                </Text>
                <Text style={styles.rowItemTag}>Workout Tracked</Text>
              </View>
              <View style={styles.profileDataRowItem}>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text style={styles.rowItemValue}>
                    {data.caloriesBurnt / 1000}
                  </Text>
                  <Text style={styles.rowItemTag}>kCal</Text>
                </View>
                <Text style={styles.rowItemTag}>Calories Burnt</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    )
} 


const styles = StyleSheet.create({
   
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