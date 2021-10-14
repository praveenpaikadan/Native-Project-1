import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { themeColors, sc, globalFonts } from "../styles/global-styles";
import { ButtonType1 } from "../components/buttons";
import { Header } from "../components/header";
import { FontAwesome5 } from "@expo/vector-icons";
import { ExerciseList } from "./subscreens/exerciselist";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { WorkoutContext } from "../components/workout-context";
import { today } from "../utilities/helpers";

export default TrackingScreen = ({ navigation }) => {


  var {workoutData, dayWorkout, resetDayWorkout} = React.useContext(WorkoutContext);
  var programName = workoutData.program.programName
  var level = workoutData.program.level
  var currentDay = workoutData.currentDay
  var dayWorkoutPlan = workoutData.program.schedule.find(obj => {return obj.day === currentDay})
  var exerciseList = dayWorkoutPlan.exercises
  var totalExercises = dayWorkoutPlan.exercises.length
  var totalSets = dayWorkoutPlan.exercises.reduce((a, c) => a + c.target.length, 0)
  var totalTime = "TBD"

  
  if (dayWorkout === null){
    var exerciseList = dayWorkoutPlan.exercises
    var currentDay = workoutData.currentDay
    resetDayWorkout({
      day : currentDay,
      date : today(),
      workout: exerciseList.map((exercise, index) => {
        return {
            exerciseNumber: index,
            exerciseName: exercise.exerciseName,
            exerciseID: exercise.exerciseID,
            reps: exercise.target.map(item => 0),
            repetitionType: exercise.repetitionType, 
        }
      }) 
    })
  }

  console.log(dayWorkout)
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} style="light" />
      <Header
        backButton={true}
        onPress={() => navigation.goBack()}
        onPressMenu={() => navigation.openDrawer()}
      />
      <View style={styles.trackingContainer}>
        <View style={styles.headingContainer}>
          <FontAwesome5 name="dumbbell" {...dumbbellIconStyling} />
          <Text style={styles.heading}>
            {programName +
              ": " +
              "Day " +
             currentDay +
              " -" +
              "Target-TBD"}
          </Text>
        </View>

        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeading}>{"Goal: " + "TBD"}</Text>
          <Text style={styles.subHeading}>{"Level: " + level}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeadingContainer}>
            <Text style={styles.detailsHeading}>TOTAL{"\n"}EXERCISES</Text>
            <View style={styles.numberContainer}>
              <Text style={styles.details}>
                {totalExercises}
              </Text>
            </View>
          </View>
          <View style={styles.detailsHeadingContainer}>
            <Text style={styles.detailsHeading}>TOTAL{"\n"}SETS</Text>
            <View style={styles.numberContainer}>
              <Text style={styles.details}>
                {totalSets}
              </Text>
            </View>
          </View>
          <View style={styles.detailsHeadingContainer}>
            <Text style={styles.detailsHeading}>TOTAL{"\n"}WORKOUT TIME</Text>
            <View style={styles.durationContainer}>
              <Text style={styles.duration}>
                {totalTime}
              </Text>
              <Text style={styles.durationUnit}>HR MIN</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.line}></View>

      <ButtonType1
        styling={styles.button}
        arrow={false}
        text={"TRACK NOW"}
        textStyling={styles.buttonText}
        onClick={() => {
          navigation.navigate("Exercise", {exerciseIndex : 0});
        }}
      />
      <View style={styles.listContainer}>
        <ExerciseList data={exerciseList} />
        <Feather name="chevrons-down" {...chevronIconStyling} />
      </View>
    </View>
  );
};

const dumbbellIconStyling = {
  color: themeColors.primary1,
  size: 25 * sc,
};

const chevronIconStyling = {
  color: themeColors.primary1,
  size: 30 * sc,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },

  trackingContainer: {
    backgroundColor: themeColors.tertiary2,
  },

  headingContainer: {
    flexDirection: "row",
    marginVertical: 10 * sc,
    padding: 13 * sc,
    alignItems: "center",
  },

  heading: {
    fontFamily: globalFonts.primaryBold,
    fontSize: 16 * sc,
    marginHorizontal: 10 * sc,
    marginRight: 15 * sc,
    width: 300 * sc,
  },

  subHeadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20 * sc,
    paddingHorizontal: 35 * sc,
  },

  subHeading: {
    fontFamily: globalFonts.primaryMedium,
    color: themeColors.tertiary1,
    fontSize: 14.5 * sc,
  },

  detailsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 30 * sc,
    backgroundColor: themeColors.secondary2,
    borderTopLeftRadius: 10 * sc,
    borderTopRightRadius: 10 * sc,
    paddingVertical: 10 * sc,
    paddingHorizontal: 10 * sc,
  },

  detailsHeadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20 * sc,
  },

  durationContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themeColors.primary2,
    padding: 6 * sc,
    paddingHorizontal: 13 * sc,
    borderRadius: 10 * sc,
  },

  detailsHeading: {
    textAlign: "center",
    fontFamily: globalFonts.primaryRegular,
    color: themeColors.tertiary1,
    fontSize: 10 * sc,
    marginBottom: 5 * sc,
  },

  numberContainer: {
    padding: 8 * sc,
    paddingHorizontal: 18 * sc,
    borderRadius: 10 * sc,
    backgroundColor: themeColors.primary2,
  },

  details: {
    fontFamily: globalFonts.primaryBold,
    fontSize: 25 * sc,
    color: themeColors.primary1,
  },

  duration: {
    fontFamily: globalFonts.primaryBold,
    fontSize: 18 * sc,
    color: themeColors.primary1,
  },

  durationUnit: {
    fontFamily: globalFonts.primaryLight,
    fontSize: 10 * sc,
    color: themeColors.tertiary1,
  },

  line: {
    width: "100%",
    height: 5 * sc,
    backgroundColor: themeColors.primary1,
  },

  button: {
    marginHorizontal: 30 * sc,
    marginTop: 15 * sc,
  },

  buttonText: {
    fontSize: 25 * sc,
  },

  listContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 10 * sc,
  },
});
