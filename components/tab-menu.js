import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  sc,
  globalFonts,
  globalFontSize,
  themeColors,
} from "../styles/global-styles";
import { FontAwesome5 } from "@expo/vector-icons";


export const TabMenu = (props) => {
  const { active, setactive} = props

  const homePress = () => {
    setactive({ home: true, calendar: false, workout: false });
  };
  const calendarPress = () => {
    setactive({ home: false, calendar: true, workout: false });
  };
  const workoutPress = () => {
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
    <View style={{...styles.container, ...props.style}}>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={homePress}>
          <View style={styles.menuContainer}>
            <FontAwesome5
              name="home"
              {...(active.home
                ? { ...activeMenuIconStyling }
                : { ...menuIconStyling })
              }
            />
            <Text style={styles.menuHeading}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={calendarPress}>
          <View style={{ ...styles.menuContainer, paddingLeft: 30 * sc }}>
            <FontAwesome5
              name="calendar-alt"
              {...(active.calendar
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
