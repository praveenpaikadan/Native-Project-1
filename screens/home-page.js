import * as React from "react";
import { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, ImageBackground, ActivityIndicator } from "react-native";
import { TabMenu } from "../components/tab-menu";
import { Header } from "../components/header";
import { globalFonts, sc, themeColors } from "../styles/global-styles";
import ProgramList from "./subscreens/program-list";
import TrackNowSubScreen from "./subscreens/track-now";
import { AuthContext } from "../components/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { WorkoutContext } from "../components/workout-context";
import ProfileBox from "../components/profilebox";
import BodyCalendar from "../components/body-calendar";
import MyWorkouts from "./modal/my-workouts";
import StartSubScreen from "./subscreens/start"
import ReminderBox from "../components/reminder"



export default HomePage = ({ navigation, route }) => {
  const {dayWorkout, programOver, setProgramOver, workoutDataLoaded} = React.useContext(WorkoutContext);
  const [loading, setLoading] = React.useState(true)
  
  const {credentials} = React.useContext(AuthContext)
  useEffect (() => {


  }, [dayWorkout])

  // Tab Menu management: 

  const [active, setactive] = React.useState({
    home: true,
    calendar: false,
    workout: false,
  });

  const calendarCloseHandler = () => {
    setactive({ home: true, calendar: false, store: false, workout: false });
  };
  const workoutCloseHandler = () => {
    setactive({ home: true, calendar: false, store: false, workout: false });
  };


  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={true} />
      <Header onPressMenu={() => navigation.openDrawer()} />
      <View style={styles.contentContainer}>
        <ProfileBox />
        {
        workoutDataLoaded === 1?

                <View style={styles.dataContainer}>
                  {![null, [], '', undefined].includes(dayWorkout)
                  ? 
                  (
                    !dayWorkout.started
                    ?
                    <StartSubScreen 
                      navigation={navigation}
                      programEnded = {dayWorkout.finalDay && dayWorkout.complete}
                      programName = {dayWorkout.programName}
                      program={dayWorkout.programName+ ": Day " +dayWorkout.day}
                      onClick={() => navigation.navigate("Root", { screen: "TrackNow" })}
                    />
                    :
                    <TrackNowSubScreen
                      navigation={navigation}
                      programEnded = {dayWorkout.finalDay && dayWorkout.complete}
                      programName = {dayWorkout.programName}
                      program={dayWorkout.programName+ ": Day " +dayWorkout.day}
                      onClick={() =>navigation.navigate("Root", { screen: "TrackNow" })}
                    />
                  ) 
                  : 
                  (
                    <ProgramList navigation={navigation}/>
                  )
                  }
                </View>

        :<View style={{...styles.dataContainer, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={themeColors.primary1} size={40*sc}/>
          <Text style={{fontFamily: globalFonts.primaryRegular, opacity: 0.4, marginTop: 10*sc}}>   Loading your workout...</Text>
          </View>

        }
      </View>
      <TabMenu active={active} setactive={setactive}/>
      <BodyCalendar active={active} setactive={setactive} visible={active.calendar} closeMenu={calendarCloseHandler} />
      <MyWorkouts active={active} setactive={setactive} visible={active.workout} closeMenu={workoutCloseHandler} />
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
