import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { themeColors, sc, globalFonts } from "../styles/global-styles";
import { ButtonType1 } from "../components/buttons";
import { Header } from "../components/header";
import { FontAwesome5 } from "@expo/vector-icons";
import { ExerciseList } from "./subscreens/exerciselist";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { WorkoutContext } from "../components/workout-context";
import { today } from "../utilities/helpers";
import { color } from "react-native-reanimated";
import VimeoWebPage from "../components/vimeo-web-player";


export default TrackingScreen = ({ navigation }) => {

  var { dayWorkout } = React.useContext(WorkoutContext);

  var programName = dayWorkout.programName
  var level = dayWorkout.level
  var currentDay = dayWorkout.day
  var dayWorkoutPlan = dayWorkout.dayWorkoutPlan
  var exerciseList = dayWorkoutPlan.exercises
  var totalExercises = dayWorkoutPlan.exercises.length
  var totalSets = dayWorkoutPlan.exercises.reduce((a, c) => a + c.target.length, 0)
  var totalTime = String(dayWorkoutPlan.timeInMins)
  var targetBodyPart = dayWorkoutPlan.targetBodyPart
  var completed = dayWorkout.complete


  const [activeTab, setActiveTab] = React.useState(dayWorkoutPlan.dayIntroVideoEmbedString?'video':'summary')
  const [fullScreen, setFullScreen] = React.useState(false)

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} style="light" hidden={fullScreen}/>
      {!fullScreen?
      <Header
        backButton={true}
        onPress={() => navigation.goBack()}
        onPressMenu={() => navigation.openDrawer()}
      />:null}

      {/* if day video exists ============ */}
      {dayWorkoutPlan.dayIntroVideoEmbedString && !fullScreen?
      <View style={styles.topTabsContainer}>
        <TouchableOpacity 
        onPress={() => {setActiveTab('video')}}
        style={{...styles.tabWrapper, borderRightColor: themeColors.primary1, borderRightWidth: 0.25}}>
          <Text style={{...styles.tabText, color: activeTab === 'video'?themeColors.primary1:themeColors.tertiary1}}>
            Intro to the day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => {setActiveTab('summary')}}
        style={{...styles.tabWrapper, borderLeftColor: themeColors.primary1, borderLeftWidth: 0.25}}>
        <Text style={{...styles.tabText,color: activeTab === 'summary'?themeColors.primary1:themeColors.tertiary1}}>
            Workout Summary
          </Text>
        </TouchableOpacity>
      </View>
      :null}
      {/* ======== if day video exists */}

      {/* Video or summary ? ========= */}

      {activeTab === 'summary'?
      <View style={styles.trackingContainer}>
        <View style={styles.headingContainer}>
          <FontAwesome5 name="dumbbell" {...dumbbellIconStyling} />
          <Text style={styles.heading}>
            {programName +
              ": " +
              "Day " +
             currentDay 
              }
          </Text>
        </View>

        <View style={styles.subHeadingContainer}>
          <Text style={{...styles.subHeading, maxWidth: 210*sc}}>{`Goal ${'\n'}` + targetBodyPart}</Text>
          <Text style={{...styles.subHeading, textAlign:'right'}}>{`Level ${'\n'}` + level}</Text>
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
              <Text style={styles.durationUnit}>MIN</Text>
            </View>
          </View>
        </View>
        <View style={styles.line}></View>
      </View>
      :
      <VimeoWebPage embedString={dayWorkoutPlan.dayIntroVideoEmbedString} fullScreen={fullScreen} setFullScreen={setFullScreen}/>
      }

      {/* ======= video or summary */}

      

      <ButtonType1
        styling={styles.button}
        arrow={false}
        text={!completed?"TRACK NOW":'EDIT WORKOUT DATA'}
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

  topTabsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  tabWrapper:{
    flex: 1,
    backgroundColor: themeColors.tertiary2,
  },

  tabText:{
    padding: 5*sc,
    textAlign: 'center',
    fontFamily: globalFonts.primaryLight,
    color: themeColors.secondary1,
    fontSize: 12*sc,
    
  },

  trackingContainer: {
    backgroundColor: themeColors.tertiary2,
  },

  headingContainer: {
    flexDirection: "row",
    marginVertical: 5 * sc,
    padding: 13 * sc,
    paddingBottom: 4*sc,
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
    marginBottom: 8 * sc,
    paddingHorizontal: 35 * sc,
  },

  subHeading: {
    fontFamily: globalFonts.primaryMedium,
    color: themeColors.tertiary1,
    fontSize: 12 * sc,
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
    fontSize: 9 * sc,
    marginBottom: 5 * sc,
  },

  numberContainer: {
    flexGrow: 1,
    padding: 8 * sc,
    paddingHorizontal: 18 * sc,
    borderRadius: 10 * sc,
    backgroundColor: themeColors.primary2,
  },

  details: {
    fontFamily: globalFonts.primaryBold,
    fontSize: 20 * sc,
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
    alignSelf:'center',
    marginTop: 15 * sc,
  },

  buttonText: {
    fontSize: 12 * sc,
  },

  listContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 10 * sc,
  },
});
