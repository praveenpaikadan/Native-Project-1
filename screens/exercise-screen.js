import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import {
  themeColors,
  sc,
  globalFonts,
  windowWidth,
  windowHeight,
} from "../styles/global-styles";
import { ButtonType1 } from "../components/buttons";
import { Header } from "../components/header";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { ExerciseCard } from "./subscreens/exerciselist";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { WorkoutContext } from "../components/workout-context";
import { WorkoutCompleteModal } from "./modal/workout-complete";
import { RepInput } from "../components/set-reps-time";
import { format_target } from "../utilities/helpers";
import { set } from "react-native-reanimated";


// We got a single source of truth to set 'sets', ie. dayworkout. proceed from that.

const ExerciseComponent = ({item, index}) => {

  const [renderSwitch, setRenderSwitch] = useState(true)   // to force rerender input field on change of sets 
  const {dayWorkout, resetDayWorkout} = useContext(WorkoutContext)
  const [isFocussed, setIsFocussed] = useState(0);
  const Line = () => <View style={styles.line}></View>;

  const handleSetChange = (val) => {
    var sets = dayWorkout.workout[index].reps
    console.log(sets)
    for (let i = 0; i < val; i++) {
      if(sets[i] == 0){
        return
      }
    }
    if (val < sets.length){
      setIsFocussed(val)
      setRenderSwitch(!renderSwitch)
    }
  }

  const setSaveHandler = (val) => {
    var prevDayWorkout = {...dayWorkout}
    prevDayWorkout.workout[index].reps[isFocussed] = val
    resetDayWorkout(prevDayWorkout)
    handleSetChange(isFocussed+1)
  }

  const repetitionType = item.repetitionType 
  const exerciseIndex = index
  const type = item.repetitionType? (item.repetitionType === 'reps'? 0: (item.repetitionType==='seconds'?1:2)): null

  return(
  <View style={styles.scrollView}>
    <View style={styles.excersiceCardContainer}>
      <ExerciseCard
        activeOpacity={1}
        id={index + 1}
        exerciseName={item.exerciseName}
        image1={require("../assets/images/Dumbbell-Step-Ups-1.jpg")}
        image2={require("../assets/images/Dumbbell-Step-Ups-2.jpg")}
        exerciseNameStyling={styles.exerciseName}
        targetSets={`TARGET SETS: ${item.target.length}`}
      />
    </View>

    <View style={styles.subHeadingContainer}>
      <Text style={styles.subHeading}>
        {"Exercise " + (index + 1) + " - Set " + (Number(isFocussed)+1)}
      </Text>
    </View>

    <RepInput reRender={renderSwitch} dv={dayWorkout.workout[index].reps[isFocussed]} type={type} dataChangeHandler={setSaveHandler}/>
    
    <View style={{ alignItems: "center" }}>
      <View style={styles.timerContainer}>
        <MaterialIcons name="timer" {...timerIconStyling} />
        <Text style={styles.timerHeader}>REST BETWEEN SETS: </Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timerText}> {item.restInSec}</Text>
        </View>
      </View>
    </View>
    <Line />
    
    <View>
      <FlatList
        data={item.target}
        keyExtractor={(item, index) => String(index)}
        renderItem={                  
          ({item, index}) => {
              var setComplete = [0, '0', '--'].includes(dayWorkout.workout[exerciseIndex].reps[index])?false:true
              return <>
              <TouchableWithoutFeedback
                onPress={() => {handleSetChange(index)}}
              >
                <View
                  style={
                    isFocussed === index
                      ? styles.focussedSetContainer
                      : styles.setContainer
                  }
                >
                  <View style={styles.iconContainer}>
                    <FontAwesome5
                      name={setComplete? "check-circle": 'dot-circle'}
                      {...cirlceIconStyling} color={[0, '0', '--'].includes(dayWorkout.workout[exerciseIndex].reps[index])?themeColors.secondary1:'green'}
                    />
                    <Text style={styles.setText}>
                      SET {index+1}
                    </Text>
                  </View>
                  <Text style={styles.setText1}>
                    {[0, '0', '--'].includes(dayWorkout.workout[exerciseIndex].reps[index])?'TARGET: ' + format_target(item, repetitionType):format_target(dayWorkout.workout[exerciseIndex].reps[index], repetitionType)}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <Line />
              </>}
        }
      />
    </View>

    
    <View style={styles.footerContainer}>
      <View style={styles.swipeContainer}>
        <FontAwesome5
          name="long-arrow-alt-left"
          {...arrowIconStyling}
        />
        <Text style={styles.swipeText}>SWIPE FOR NEXT EXERCISE</Text>
        <FontAwesome5
          name="long-arrow-alt-right"
          {...arrowIconStyling}
        />
      </View>
      <View style={styles.footerButtonContainer}>
        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate("ExerciseGuide", { index: item.index })
          // }
        >
          <Text style={styles.footerButtonText}>EXERCISE GUIDE</Text>
        </TouchableOpacity>

        <View style={styles.hLine}></View>
        <Text style={styles.footerButtonText}>PREVIOUS STATS</Text>
      </View>
    </View>
  </View>
)
}


export default ExerciseScreen = ({ navigation, route }) => {
  const {exerciseIndex} =  route.params;
  const {workoutData, dayWorkout, resetDayWorkout } = useContext(WorkoutContext)
  var currentDay = workoutData.currentDay
  var dayWorkoutPlan = workoutData.program.schedule.find(obj => {return obj.day === currentDay})
  var exerciseList = dayWorkoutPlan.exercises

  const [showWorkoutComplete, setShowWorkoutComplete] = useState(false);

  const scrollRef = useRef();

  useEffect(() => {
    scrollIndex();
  }, [exerciseIndex]);

  const scrollIndex = () => {
    scrollRef.current.scrollToIndex({
      animated: false,
      index: exerciseIndex,
    });
  };

  // const setHandler = (sets, item) => {
  //   const setIndex = parseInt(isFocussed) - 1;
  //   const nextSetNumber = "0" + (parseInt(isFocussed) + 1);
  //   if (weight === "" || reps === "") {
  //     null;
  //     const sets =
  //       exerciseList[
  //         exerciseList.length - 1
  //       ].sets;
  //   } else if (
  //     sets.length == isFocussed &&
  //     exerciseList.length == item.index + 1
  //   ) {
  //     sets[setIndex].weight = weight;
  //     sets[setIndex].reps = reps;
  //     setShowWorkoutComplete(true);
  //   } else if (sets.length == isFocussed) {
  //     sets[setIndex].weight = weight;
  //     sets[setIndex].reps = reps;
  //     setWeight("");
  //     setReps("");
  //     scrollRef.current.scrollToIndex({
  //       animated: true,
  //       index: item.index + 1,
  //     });
  //   } else if (sets.length !== isFocussed) {
  //     sets[setIndex].weight = weight;
  //     sets[setIndex].reps = reps;
  //     setIsFocussed(nextSetNumber);
  //   }
  // };

  const swipeHandler = () => {
    setIsFocussed(0);
  };

  const editingHandler = () => {
    const sets =
      exerciseList[
        exerciseList.length - 1
      ].sets;
    sets[sets.length - 1].weight = "";
    sets[sets.length - 1].reps = "";
    setShowWorkoutComplete(false);
  };

  const workoutDoneHandler = () => {
    console.log();
    // Function to post the final data to the API
  };

  // const workoutData = (workoutData) => {
  //   AsyncStorage.setItem("WorkoutData", JSON.stringify(workoutData))
  //     .then(() => {
  //       setStoredWorkoutData(workoutData);
  //     })
  //     .catch((error) => console.log(error));
  // };




  return (
    <View style={styles.container}>
      <StatusBar translucent={true} style="light" />
      <Header
        backButton={true}
        backButtonText={true}
        onPressMenu={() => navigation.openDrawer()}
        // onPress={() => {
        //   navigation.navigate("ExerciseList", workoutData);
        //   setWeight("");
        //   setReps("");
        // }}
      />
      <FlatList
        ref={scrollRef}
        // onScroll={swipeHandler}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        data={exerciseList}
        keyExtractor={item => item._id}
        getItemLayout={(data, index) => ({
          length: windowWidth,
          offset: windowWidth * index,
          index,
        })}
        renderItem={({item, index}) => <ExerciseComponent item={item} index={index}/>}
      />

      <WorkoutCompleteModal
        visible={showWorkoutComplete}
        continueEditing={() => editingHandler()}
        workoutDone={workoutDoneHandler}
        text={"WORKOUT DONE"}
      />
    </View>
  );
};


const postCloseIconStyling = {
  color: themeColors.tertiary1,
  size: 15 * sc,
};
const timerIconStyling = {
  color: themeColors.primary1,
  size: 20 * sc,
};
const cirlceIconStyling = {
  color: themeColors.tertiary1,
  size: 22 * sc,
};
const checkIconStyling = {
  color: themeColors.primary1,
  size: 22 * sc,
};
const arrowIconStyling = {
  color: themeColors.tertiary1,
  size: 25 * sc,
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
  },

  excersiceCardContainer: {
    justifyContent: "center",
    paddingHorizontal: 10 * sc,
  },

  line: {
    height: 2 * sc,
    backgroundColor: themeColors.primary1,
  },

  exerciseName: {
    fontSize: 13 * sc,
  },

  cardContainer: {
    backgroundColor: themeColors.tertiary2,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 3 * sc,
  },

  subHeadingContainer: {
    height: 30 * sc,
    backgroundColor: themeColors.tertiary1,
    justifyContent: "center",
  },

  subHeading: {
    fontFamily: globalFonts.primaryBold,
    fontSize: 16 * sc,
    color: themeColors.secondary2,
    marginLeft: 20 * sc,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  inputHeading: {
    fontFamily: globalFonts.primaryMedium,
    color: themeColors.tertiary1,
  },

  quantityContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    paddingVertical: 3 * sc,
    paddingHorizontal: 10 * sc,
    borderRadius: 10 * sc,
    borderColor: themeColors.primary1,
    borderWidth: 2 * sc,
    fontFamily: globalFonts.primaryMedium,
    fontSize: 25 * sc,
    color: themeColors.primary1,
    marginTop: 8 * sc,
    marginHorizontal: 10 * sc,
    width: 85 * sc,
    textAlign: "center",
  },

  inputCloseIconContainer: {
    marginTop: -10 * sc,
  },

  unit: {
    fontFamily: globalFonts.primaryLight,
    fontSize: 12 * sc,
    color: themeColors.tertiary1,
    marginVertical: 1 * sc,
  },

  timerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeColors.tertiary1,
    paddingHorizontal: 4 * sc,
    paddingVertical: 2 * sc,
    marginVertical: 5 * sc,
  },

  timerHeader: {
    fontFamily: globalFonts.primaryRegular,
    fontSize: 12 * sc,
    color: themeColors.secondary2,
  },

  timerText: {
    fontFamily: globalFonts.primaryRegular,
    fontSize: 12 * sc,
    color: themeColors.tertiary1,
  },

  timeContainer: {
    backgroundColor: themeColors.tertiary2,
    paddingHorizontal: 3 * sc,
    paddingVertical: 1 * sc,
  },

  setContainer: {
    alignItems: "center",
  },

  setContainer: {
    paddingHorizontal: 24*sc,
    flexDirection: "row",
    height: 45 * sc,
    alignItems: "center",
    backgroundColor: themeColors.primary2,
    justifyContent: "space-between",
    opacity: 0.7
  },

  focussedSetContainer: {
    flexDirection: "row",
    paddingHorizontal: 24*sc,
    height: 45 * sc,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: themeColors.secondary2,
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  setText: {
    fontFamily: globalFonts.primaryBold,
    fontSize: 18 * sc,
    color: themeColors.tertiary1,
    marginLeft: 10 * sc,
  },

  setText1: {
    fontFamily: globalFonts.primaryBold,
    fontSize: 18 * sc,
    color: themeColors.tertiary1,
  },

  quantity: {
    fontFamily: globalFonts.primaryBold,
    fontSize: 22 * sc,
    color: themeColors.tertiary1,
  },

  postCloseIconContainer: {
    marginTop: 8 * sc,
  },

  footerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 25 * sc,
    position: "absolute",
    bottom: 0,
  },

  swipeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  swipeText: {
    fontFamily: globalFonts.primaryRegular,
    fontSize: 13 * sc,
    color: themeColors.tertiary1,
    letterSpacing: 1 * sc,
    marginHorizontal: 10 * sc,
  },

  footerButtonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20 * sc,

    borderColor: themeColors.tertiary2,
    borderTopWidth: 2 * sc,
  },

  footerButtonText: {
    fontFamily: globalFonts.primaryRegular,
    fontSize: 14 * sc,
    color: themeColors.tertiary1,
  },

  hLine: {
    width: 2 * sc,
    height: 35 * sc,
    backgroundColor: themeColors.tertiary2,
  },
});
