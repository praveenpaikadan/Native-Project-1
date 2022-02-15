import React, {useContext} from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { globalFonts, themeColors, sc } from "../../styles/global-styles";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { ButtonType1 } from "../../components/buttons";
import { useNavigation } from "@react-navigation/native";
import {TabMenu} from "../../components/tab-menu";
import { WorkoutContext } from "../../components/workout-context";
import flashMessage from "../../utilities/flash-message";

export default MyWorkouts = ({ visible, closeMenu, active, setactive }) => {
  
  const navigation = useNavigation();
  const { dayWorkout } = useContext(WorkoutContext)

  const todaysWorkoutHandler = () => {
    closeMenu();
    if(dayWorkout){
      navigation.navigate("TrackNow");
    }
    navigation.navigate("Home");
    flashMessage('You need to choose a program to start tracking your fitness', 'info')
  };

  const workoutHistoryHandler = () => {
    closeMenu();
    if(dayWorkout){
      navigation.navigate("WorkoutHistory");
    }
    navigation.navigate("Home");
    flashMessage('You need to choose a program to view workout plan', 'info')
  };

  return (
    <Modal transparent={true} visible={visible}>
      <View style={{ ...styles.overlay }}>
        <View style={styles.container}>
          <View style={styles.line}></View>
          <View style={styles.headingContainer}>
            <View style={styles.headingContent}>
              <FontAwesome5 name="dumbbell" {...dumbbellIconStyling} />
              <Text style={styles.heading}>MY WORKOUTS</Text>
            </View>
            <TouchableOpacity onPress={closeMenu}>
              <AntDesign name="closecircle" {...closeIconStylingSmall} />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <ButtonType1
              text={"TODAY'S WORKOUT"}
              arrow={false}
              styling={styles.button}
              textStyling={styles.buttonText}
              onClick={todaysWorkoutHandler}
            />
            <ButtonType1
              text={"WORKOUT PLAN"}
              arrow={false}
              styling={styles.button}
              textStyling={styles.buttonText}
              onClick={workoutHistoryHandler}
            />

          </View>
        </View>
      </View>
      <TabMenu style={{position: 'absolute', bottom: 0}} active={active} setactive={setactive}/>
    </Modal> 
  );
};

const dumbbellIconStyling = {
  color: themeColors.secondary2,
  size: 20 * sc,
};

const calendarIconStylingSmall = {
  color: themeColors.tertiary1,
  size: 15 * sc,
};
const closeIconStylingSmall = {
  color: themeColors.primary2,
  size: 20 * sc,
};

const styles = StyleSheet.create({
  overlay: {
    width: "100%",
    height: "90%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    justifyContent: "flex-end",
    height: "100%",
  },

  line: {
    width: "100%",
    height: 5 * sc,
    backgroundColor: themeColors.primary1,
  },

  headingContainer: {
    flexDirection: "row",
    padding: 10 * sc,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: themeColors.tertiary1,
  },

  headingContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  heading: {
    fontFamily: globalFonts.primaryBold,
    color: themeColors.secondary2,
    paddingLeft: 10 * sc,
    fontSize: 18 * sc,
  },

  buttonContainer: {
    backgroundColor: themeColors.secondary2,
    alignItems: "center",
    paddingVertical: 15 * sc,
  },

  button: {
    minWidth: 300 * sc,
    marginVertical: 10 * sc,
    backgroundColor: themeColors.secondary2,
    borderColor: themeColors.primary1,
    borderWidth: 3 * sc,
  },

  buttonText: {
    fontSize: 17 * sc,
    color: themeColors.primary1,
  },
});
