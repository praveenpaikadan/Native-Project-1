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
import { ExerciseCard } from "./subscreens/exerciselist";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { WorkoutContext } from "../components/workout-context";
import { WorkoutCompleteModal } from "./modal/workout-complete";
import { RepInput } from "../components/set-reps-time";
import { formatIntervel, format_target, today, makeMediaUrl } from "../utilities/helpers";
import { postDayWorkout, postDiscardWorkout } from "../utilities/data-center";
import flash from "../utilities/flash-message";
import { Alert } from "./modal/alert";
import PreviousStatsModel from "./modal/previous-stats"

// We got a single source of truth to set 'sets', ie. dayworkout. proceed from that.

const ExerciseComponent = ({navigation, item, index, setExerciseIndex, totalExercises, setShowWorkoutComplete}) => {
  const [firstFinish, setFirstFinish] = useState(true)
  const final = index === totalExercises - 1
  const [renderSwitch, setRenderSwitch] = useState(true)   // to force rerender input field on change of sets 
  const {dayWorkout, resetDayWorkout } = useContext(WorkoutContext)

  const [isFocussed, setIsFocussed] = useState(0);
  const Line = () => <View style={styles.line}></View>;

  const [prevStatsModelVisible, setPrevStatsModelVisible] = useState(false)
  const [loadStatsModel, setLoadStatsModel] = useState(false)
  // console.log('dayWorkout -> workout at Exercise component with index ' , index, ' is ', dayWorkout.workout[index])

  const scrollRef = useRef();

  // console.log(dayWorkout)

  useEffect(() => {
    scrollIndex();
  }, [isFocussed]);

  const scrollIndex = () => {
    scrollRef.current.scrollToIndex({
      animated: true,
      index: isFocussed,
    });
  };

  const handleSetChange = (val) => {
    setExerciseIndex(index)
    var sets = dayWorkout.workout[index].reps
    for (let i = 0; i < val; i++) {
      if(sets[i] == 0){
        return
      }
    }
    if (val < sets.length){
      setIsFocussed(val)
      setRenderSwitch(!renderSwitch)
    }else if(val === sets.length){
      if(index < totalExercises-1){
        if(firstFinish){
          setExerciseIndex(index+1)
          setFirstFinish(false)
        }
      }else{
        setShowWorkoutComplete(true)
      }
    }
  }

  const setSaveHandler = (val) => {
    console.log(index, isFocussed)
    var orgDayWorkout = {...dayWorkout}   
    orgDayWorkout.workout[index].reps[isFocussed] = val
    resetDayWorkout(orgDayWorkout)
    handleSetChange(isFocussed+1)
  }

  const handleDeleteSet = (setIndexToDelete) => {
    var orgDayWorkout = {...dayWorkout}
    var set = dayWorkout.workout[index].reps.filter((item, setIndex) => setIndex !== setIndexToDelete)
    var newSet = []
    for (let i = 0; i < dayWorkout.workout[index].reps.length; i++) {
      if(set[i]){
        newSet[i] = set[i]
      }else{
        newSet[i] = 0
      }
    } 
    orgDayWorkout.workout[index].reps = newSet
    resetDayWorkout(orgDayWorkout)    
  }


  const repetitionType = item.repetitionType 
  const exerciseIndex = index
  const type = item.repetitionType? (item.repetitionType === 'reps'? 0: (item.repetitionType==='seconds'?1:2)): null

  var image1 ={uri: makeMediaUrl('?by=ExId&id='+item.exerciseID+'&index=0', true)}
  var image2 = {uri: makeMediaUrl('?by=ExId&id='+item.exerciseID+'&index=1', true)}
  return(
  <View style={styles.scrollView}>
    <View style={styles.excersiceCardContainer}>
    {loadStatsModel?<PreviousStatsModel visible={prevStatsModelVisible} exercise={{...item, programName: dayWorkout.programName, workoutID: dayWorkout.workoutID}} setVisible={setPrevStatsModelVisible} />:null}
    <ExerciseCard
        targetSets={item.target.length > 0?"Target sets: " + String(item.target.length):null}
        activeOpacity={1}
        onPress={() => {}}
        id={index+1}
        exerciseName={item.exerciseName}
        image1={image1}
        image2={image2}
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
          <Text style={styles.timerText}> {formatIntervel(item.restInSec)}</Text>
        </View>
      </View>
    </View>
    <Line />
    
    <View>
      <FlatList
        ref={scrollRef}
        data={item.target}
        keyExtractor={(item, index) => String(index)}
        style={styles.setList}
        getItemLayout={(data, index) => ({
          length: styles.setContainer.height + 2,
          offset: (styles.setContainer.height + 2) * index,
          index,
        })}
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
                  {setComplete?
                <FontAwesome5
                name={'trash-alt'}
                {...deleteIconStyling} 
                onPress={() => {if(index === isFocussed){handleDeleteSet(index)}} }
              />:null  
                }
                </View>
              </TouchableWithoutFeedback>
              <Line />
              </>}
        }
      />
    </View>

    
    <View style={styles.footerContainer}>
      {!final?<View style={styles.swipeContainer}>
        <FontAwesome5
          name="long-arrow-alt-left"
          {...arrowIconStyling}
        />
        <Text style={styles.swipeText}>SWIPE FOR NEXT EXERCISE</Text>
        <FontAwesome5
          name="long-arrow-alt-right"
          {...arrowIconStyling}
        />
      </View>:<ButtonType1
                arrow={false}
                text={"MARK WORKOUT COMPLETE"}
                styling={{marginVertical:20*sc}}
                textStyling={{fontSize: 12*sc}}
                onClick={() => {setShowWorkoutComplete()}}
              />}
              
      <View style={styles.footerButtonContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ExerciseGuide", { exercise: item })
          }
        >
          <Text style={styles.footerButtonText}>EXERCISE GUIDE</Text>
        </TouchableOpacity>

        <View style={styles.hLine}></View>
        <TouchableOpacity
          onPress={() =>{
              setLoadStatsModel(true)
              setPrevStatsModelVisible(true)
            }
          }
        >
          <Text style={styles.footerButtonText}>PREVIOUS STATS</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)
}


export default ExerciseScreen = ({ navigation, route }) => {
  const [exerciseIndex, setExerciseIndex] =  useState(route.params.exerciseIndex);
  const {workoutData, resetWorkoutData,  dayWorkout, resetDayWorkout, makeDayWorkout, addToPending, removeFromPending } = useContext(WorkoutContext)
  var currentDay = dayWorkout.day
  var dayWorkoutPlan = workoutData.program.schedule.find(obj => {return obj.day === currentDay})  //obtainng targets from the original workoutData 
  var exerciseList = dayWorkoutPlan.exercises

  const [showWorkoutComplete, setShowWorkoutComplete] = useState(false);
  const [saving, setSaving] = useState(0)  // 0 for default, 2 for saving status, 1 for succesfull save -1 for failed
  const [discardAlert, setDiscardAlert ] = useState(false)
  const scrollRef = useRef();

  const [discarding, setDiscarding] = useState(0) // // 0 for default, 2 for saving status, 1 for succesfull save -1 for failed

  useEffect(() => {
    console.log('Rerendered')
    scrollIndex();
  }, [exerciseIndex]);

  const scrollIndex = () => {
    scrollRef.current.scrollToIndex({
      animated: true,
      index: exerciseIndex,
    });
  };

  const handleWorkoutDone = () => {
    setSaving(2)
    var orgDayWorkout = {...dayWorkout}
    orgDayWorkout.complete = true
    orgDayWorkout.dateCompleted = today()
    resetDayWorkout(orgDayWorkout)
    var orgWorkoutData = {...workoutData}
    orgWorkoutData.history =  orgWorkoutData.history.filter((item, index) => item.day !== orgDayWorkout.day) 
    orgWorkoutData.history.push(orgDayWorkout)
    resetWorkoutData(orgWorkoutData)
    postDayWorkout(orgDayWorkout)
    .then((response) => {
        console.log(response.status, response.data)
        switch (response.status) {
          case 200:
            flash(`Succesfully saved workout data`, 'success', 4000)
            removeFromPending(orgDayWorkout)
            setSaving(1)
            break;
          case 101:
            setSaving(-1)
            flash('Oops Something Happened!! Not able to upload workout data. Your workout data is saved will try to upload later. You can safely go back, try again or continue editing', 'danger', 10000)
            addToPending(orgDayWorkout)
            break;
          case 403: 
            setSaving(-1)
            flash('You are not logged in. Please Sign out and Sign in again', 'danger', 10000)
          default:
            setSaving(-1)
            if(response.data.message){
              flash(response.data.message, 'info')
            }
            addToPending(orgDayWorkout)
            break; 
          }
    })
  };

  const continueEditingHandler = () => {
    console.log('Continue.. editing')
    setSaving(0)
    setShowWorkoutComplete(false)
  }
  
  const handleGoToHome = () => {
    setSaving(0)
    navigation.navigate('Home')
  }

  const handleDiscardWorkout = () => {
    setShowWorkoutComplete(false)
    setDiscardAlert(true)
  }

  const handleConfirmDiscard = () => {
    setDiscarding(2)
    var reqBody = {toDel : 1, workoutID: dayWorkout.workoutID, day:dayWorkout.day}
    var orgWorkoutData = {...workoutData}
    orgWorkoutData.history =  orgWorkoutData.history.filter((item, index) => item.day !== dayWorkout.day) 
    resetWorkoutData(orgWorkoutData)
    makeDayWorkout(orgWorkoutData, null)
    postDiscardWorkout(reqBody)
    .then((response) => {
        console.log(response.status, response.data)
        switch (response.status) {
          case 200:
            flash(`Succesfully deleted today's workout`, 'success', 4000)
            removeFromPending(reqBody)
            setDiscarding(1)
            break;
          case 101:
            setDiscarding(-1)
            flash('Oops Something Happened!! Not able to sync workout data... please check your intenet', 'danger', 10000)
            addToPending(reqBody)
            break;
          default:
            setDiscarding(-1)
            if(response.data.message){
              
              flash(response.data.message, 'info')
            }
            addToPending(reqBody)
            break; 
          }
          setDiscardAlert(false)
          setSaving(0)
          navigation.navigate('Home')
    })
  }


  return (
    <View style={styles.container}>
      <StatusBar translucent={true} style="light" />
      <Header
        backButton={true}
        onPressMenu={() => navigation.openDrawer()}
        onPress={() => {
          navigation.navigate("Root", { screen: "TrackNow" });
        }}
      />
      <FlatList
        ref={scrollRef}
        keyExtractor={(item, index) => {return item._id}}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        data={exerciseList}
        
        getItemLayout={(data, index) => ({
          length: windowWidth,
          offset: windowWidth * index,
          index,
        })}
        renderItem={({item, index}) => <ExerciseComponent navigation={navigation} setExerciseIndex={setExerciseIndex} item={item} index={index} totalExercises={exerciseList.length} setShowWorkoutComplete={setShowWorkoutComplete}/>}
      />

      <WorkoutCompleteModal
        editing={dayWorkout.complete}
        saving={saving}
        discarding={discarding}
        visible={showWorkoutComplete}
        continueEditingHandler={continueEditingHandler}
        handleWorkoutDone={handleWorkoutDone}
        handleDiscardWorkout={handleDiscardWorkout}
        handleGoToHome={handleGoToHome}
        text={"WORKOUT DONE"}
      />

      <Alert 
        yesLoading={discarding === 2}
        visible={discardAlert}
        message={'Are you sure you want to discard today\'s workout ? '}
        yesHandler={handleConfirmDiscard}
        noHandler={() => {setDiscardAlert(false); setShowWorkoutComplete(true)} }
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

const deleteIconStyling = {
  color: 'red',
  size: 18 * sc,
}

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

  setList:{
    height:(45+2)*sc*3,
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  setText: {
    fontFamily: globalFonts.primaryBold,
    fontSize: 14 * sc,
    color: themeColors.tertiary1,
    marginLeft: 10 * sc,
  },

  setText1: {
    fontFamily: globalFonts.primaryBold,
    fontSize: 14 * sc,
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
