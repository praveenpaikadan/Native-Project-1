import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  sc,
  globalFonts,
  globalFontSize,
  themeColors,
} from "../styles/global-styles";
import { FontAwesome5 } from "@expo/vector-icons";
import MyWorkouts from "../screens/modal/my-workouts";
import BodyCalendar from "./body-calendar";

export const TabMenu = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false);
  const [active, setactive] = useState({
    home: true,
    calendar: false,
    workout: false,
  });

  const calendarCloseHandler = () => {
    setShowCalendar(false);
    setactive({ home: true, calendar: false, store: false, workout: false });
  };
  const workoutCloseHandler = () => {
    setShowWorkout(false);
    setactive({ home: true, calendar: false, store: false, workout: false });
  };

  const homePress = () => {
    setShowCalendar(false)
    setactive({ home: true, calendar: false, workout: false });
  };
  const calendarPress = () => {
    setShowCalendar(true);
    setactive({ home: false, calendar: true, workout: false });
  };
  const workoutPress = () => {
    setShowWorkout(true);
    setactive({ home: false, calendar: false, workout: true });
  };
  const activeMenuIconStyling = {
    color: themeColors.primary1,
    size: 25 * sc,
  };
  const menuIconStyling = {
    color: themeColors.tertiary1,
    size: 25 * sc,
  };


  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={homePress}>
          <View style={styles.menuContainer}>
            <FontAwesome5
              name="home"
              {...(active.home
                ? { ...activeMenuIconStyling }
                : { ...menuIconStyling })}
            />
            <Text style={styles.menuHeading}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={calendarPress}>
          <View style={{ ...styles.menuContainer, paddingLeft: 30 * sc }}>
            <FontAwesome5
              name="calendar-alt"
              {...(showCalendar
                ? { ...activeMenuIconStyling }
                : { ...menuIconStyling })}
            />
            <Text style={styles.menuHeading}>Body Calendar</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={workoutPress}>
          <View style={styles.menuContainer}>
            <FontAwesome5
              name="dumbbell"
              {...(active.workout
                ? { ...activeMenuIconStyling }
                : { ...menuIconStyling })}
              size={23 * sc}
            />
            <Text style={styles.menuHeading}>My Workouts</Text>
          </View>
        </TouchableOpacity>
      </View>
      <BodyCalendar visible={showCalendar} closeMenu={calendarCloseHandler} />
      <MyWorkouts visible={showWorkout} closeMenu={workoutCloseHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  tabContainer: {
    paddingVertical: 10 * sc,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10 * sc,
  },

  menuHeading: {
    paddingTop: 5 * sc,
    paddingHorizontal: 10 * sc,
    fontSize: globalFontSize.content,
    fontFamily: globalFonts.primaryMedium,
  },
});
