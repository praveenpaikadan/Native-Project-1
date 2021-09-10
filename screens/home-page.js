import * as React from "react";
import { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { TabMenu } from "../components/tab-menu";
import { Header } from "../components/header";
import { globalFonts, sc, themeColors } from "../styles/global-styles";
import ProgramList from "./subscreens/program-list";
import TrackNowSubScreen from "./subscreens/track-now";
import { AuthContext } from "../components/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { WorkoutContext } from "../components/workout-context";

const data = {
  userId: 1,
  name: "Olivia Charlotte",
  avatar: require("../assets/images/profile.jpg"),
  gender: "Female",
  dob: "01-01-1986",
  height: 168,
  weigth: 55,
  status: "active",
  subscription: "complete",
  workoutsTracked: 28,
  caloriesBurnt: 14000,
};

export default HomePage = ({ navigation, route }) => {

  const {workoutData} = React.useContext(WorkoutContext);
  
  // const workoutData = {
  //     userId: 1,
  //     programId: 1,
  //     programName: "Muscle gain program",
  //     day: 16,
  //     target: "Shoulders, Legs, Calves",
  //     goal: "Muscle Building",
  //     level: "Intermediate",
  //     totalSets: 29,
  //     totalWorkoutTime: "01:30",
  //     exerciselist: [
  //       {
  //         exerciseId: "1",
  //         exerciseName: "Dumbbell Step Ups",
  //         targetSets: 3,
  //         targetReps: "8 - 12",
  //         sets: [
  //           { set: "01", weight: "", reps: "" },
  //           { set: "02", weight: "", reps: "" },
  //           { set: "03", weight: "", reps: "" },
  //         ],
  //         rest: "00:45",
  //       },
  //       {
  //         exerciseId: "2",
  //         exerciseName: "Barbell Shrug",
  //         targetSets: 4,
  //         targetReps: "8 - 12",
  //         sets: [
  //           { set: "01", weight: "", reps: "" },
  //           { set: "02", weight: "", reps: "" },
  //           { set: "03", weight: "", reps: "" },
  //           { set: "04", weight: "", reps: "" },
  //         ],

  //         rest: "00:30",
  //       },
  //       {
  //         exerciseId: "3",
  //         exerciseName: "Leg Extensions",
  //         targetSets: 3,
  //         targetReps: "8 - 12",
  //         sets: [
  //           { set: "01", weight: "", reps: "" },
  //           { set: "02", weight: "", reps: "" },
  //           { set: "03", weight: "", reps: "" },
  //         ],
  //         rest: "00:45",
  //       },
  //       {
  //         exerciseId: "4",
  //         exerciseName: "Standing Calf Raise",
  //         targetSets: 3,
  //         targetReps: "8 - 12",
  //         sets: [
  //           { set: "01", weight: "", reps: "" },
  //           { set: "02", weight: "", reps: "" },
  //           { set: "03", weight: "", reps: "" },
  //         ],
  //         rest: "01:00",
  //       },
  //     ],
  //     image1: require("../assets/images/Dumbbell-Step-Ups-1.jpg"),
  //     image2: require("../assets/images/Dumbbell-Step-Ups-2.jpg"),
  //   };

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={true} />
      <Header onPressMenu={() => navigation.openDrawer()} />
      <View style={styles.contentContainer}>
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

        <View style={styles.dataContainer}>
        
            {workoutData ? (
            <TrackNowSubScreen
              program={
                workoutData.programName +
                ": Day " +
                workoutData.day +
                " " +
                workoutData.target
              }
              onClick={() =>
                navigation.navigate("Root", { screen: "TrackNow" }, data.userId)
              }
            />
          ) : (
            <ProgramList
              onPress={() =>
                navigation.navigate("Root", {
                  screen: "ProgramDetails",
                })
              }
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
