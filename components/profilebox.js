import * as React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { globalFonts, sc, themeColors } from "../styles/global-styles";
import { calculateCalories, calculateBMI } from "../utilities/helpers";
import { AuthContext } from "./auth-context";
import { WorkoutContext } from "./workout-context";
import { ProfilePhoto } from "./profile-photo";


export default ProfileBox = () => {

    const {credentials} = React.useContext(AuthContext);
    const {workoutData} = React.useContext(WorkoutContext);
    if(workoutData){
      var {workoutsTracked, caloriesBurned} = calculateCalories(workoutData.history, workoutData.calsPerRepList)
    }else{
      var workoutsTracked = 0
      var caloriesBurned = 0
    }

    const {value, condition} = calculateBMI(credentials.height, credentials.weight)
    
  
    const data = {
      name: credentials.name,
      gender: credentials.gender,
      workoutsTracked: workoutsTracked,
      caloriesBurned: caloriesBurned,
    };

    return (
      //   <ImageBackground
      //   source={require("../assets/images/dead-lift.jpg")}
      //   style={styles.profileWrapper}
      // >
      <View style={styles.profileWrapper}>

        <View style={styles.profileContainer}>
 
  
          <View style={styles.profilePhotoContainer}>
            <ProfilePhoto filename={credentials.profilePhoto?credentials.profilePhoto.filename:null} style={styles.profilePhoto}/>

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
              
              {/* <View style={styles.profileDataRowItem}>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text style={styles.rowItemValue}>
                    {data.caloriesBurned}
                  </Text>
                  <Text style={styles.rowItemTag}>kCal</Text>
                </View>
                <Text style={styles.rowItemTag}>Calories Burned</Text>
              </View> */}

              <View style={styles.profileDataRowItem}>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text style={styles.rowItemValue}>
                    {value}
                  </Text>
                  <Text style={styles.rowItemTag}></Text>
                </View>
                <Text style={styles.rowItemTag}>{`BMI - ${condition.toLowerCase()}`}</Text>
              </View>

            </View>
          </View>
        </View>
        </View>
      // </ImageBackground>
    )
} 


const styles = StyleSheet.create({
   
    //////profile container
    profileWrapper: {
      width: "100%",
      height: 100 * sc,
    },
  
    profileContainer: {
      flexDirection: "row",
      margin: 10 * sc,
      alignSelf: "center",
      borderRadius: 5* sc,
      overflow: "hidden",
    },
  
    profilePhotoContainer: {
      backgroundColor: themeColors.tertiary3,
      // flex: 1,
      marginRight: 2 * sc,
      width: 100*sc,
      height: "100%",
    },
    
    profilePhoto: {
      width: 100*sc,
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
      fontFamily: globalFonts.primaryRegular,
      color: themeColors.secondary1,
      opacity: 0.7,
      fontSize: 16 * sc,
      paddingLeft: 8 * sc,
    },
  
    rowItemValue: {
      // flex:1,
      fontSize: 16 * sc,
      fontFamily: globalFonts.primaryRegular,
      color: themeColors.secondary1,
      opacity: 0.7,
    },
  
    rowItemTag: {
      fontFamily: globalFonts.primaryLight,
      fontSize: 10 * sc,
      padding: 3 * sc,
    },
  
    //////data container
    dataContainer: {
      flex: 1,
      width: "100%",
    },
  });