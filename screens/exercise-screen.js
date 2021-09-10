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
import { KgRepsInput } from "../components/set-reps-time";

export default ExerciseScreen = ({ navigation, route }) => {
  const data = { ...route.params };
  const index = data.index === undefined ? 0 : data.index;
  const storedWorkoutData = useContext(WorkoutContext);
  // const workoutData = storedWorkoutData.storedWorkoutData;

  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [isFocussed, setIsFocussed] = useState("01");
  const [showWorkoutComplete, setShowWorkoutComplete] = useState(false);
  const [workoutData, setWorkoutdata] = useState(
    storedWorkoutData.storedWorkoutData
  );

  const scrollRef = useRef();

  useEffect(() => {
    scrollIndex();
  }, [data.index]);

  const onChangeWeight = (value) => {
    setWeight(value);
  };

  const onChangeReps = (value) => {
    setReps(value);
  };

  const scrollIndex = () => {
    scrollRef.current.scrollToIndex({
      animated: false,
      index: index,
    });
  };

  const setHandler = (sets, item) => {
    const setIndex = parseInt(isFocussed) - 1;
    const nextSetNumber = "0" + (parseInt(isFocussed) + 1);
    if (weight === "" || reps === "") {
      null;
      const sets =
        storedWorkoutData.storedWorkoutData.exerciselist[
          storedWorkoutData.storedWorkoutData.exerciselist.length - 1
        ].sets;
    } else if (
      sets.length == isFocussed &&
      workoutData.exerciselist.length == item.index + 1
    ) {
      sets[setIndex].weight = weight;
      sets[setIndex].reps = reps;
      setShowWorkoutComplete(true);
    } else if (sets.length == isFocussed) {
      sets[setIndex].weight = weight;
      sets[setIndex].reps = reps;
      setWeight("");
      setReps("");
      scrollRef.current.scrollToIndex({
        animated: true,
        index: item.index + 1,
      });
    } else if (sets.length !== isFocussed) {
      sets[setIndex].weight = weight;
      sets[setIndex].reps = reps;
      setIsFocussed(nextSetNumber);
    }
  };

  const swipeHandler = () => {
    setIsFocussed("01");
    setWeight("");
    setReps("");
  };

  const editingHandler = () => {
    const sets =
      storedWorkoutData.storedWorkoutData.exerciselist[
        storedWorkoutData.storedWorkoutData.exerciselist.length - 1
      ].sets;
    sets[sets.length - 1].weight = "";
    sets[sets.length - 1].reps = "";
    setShowWorkoutComplete(false);
  };

  const workoutDoneHandler = () => {
    console.log(storedWorkoutData.storedWorkoutData);
    // Function to post the final data to the API
  };

  // const workoutData = (workoutData) => {
  //   AsyncStorage.setItem("WorkoutData", JSON.stringify(workoutData))
  //     .then(() => {
  //       setStoredWorkoutData(workoutData);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const Line = () => <View style={styles.line}></View>;

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} style="light" />
      <Header
        backButton={true}
        backButtonText={true}
        onPressMenu={() => navigation.openDrawer()}
        onPress={() => {
          navigation.navigate("ExerciseList", workoutData);
          setWeight("");
          setReps("");
        }}
      />
      <FlatList
        ref={scrollRef}
        onScroll={swipeHandler}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        data={workoutData.exerciselist}
        keyExtractor={(item, index) => item.exerciseId}
        getItemLayout={(data, index) => ({
          length: windowWidth,
          offset: windowWidth * index,
          index,
        })}
        renderItem={(item) => (
          <View style={styles.scrollView}>
            <View style={styles.excersiceCardContainer}>
              <ExerciseCard
                activeOpacity={1}
                id={item.index + 1}
                exerciseName={item.item.exerciseName}
                image1={require("../assets/images/Dumbbell-Step-Ups-1.jpg")}
                image2={require("../assets/images/Dumbbell-Step-Ups-2.jpg")}
                exerciseNameStyling={styles.exerciseName}
                targetSets={`TARGET SETS: ${item.item.targetSets}`}
              />
            </View>
            <View style={styles.subHeadingContainer}>
              <Text style={styles.subHeading}>
                {"Exercise " + (item.index + 1) + " - Set " + isFocussed}
              </Text>
            </View>

            <KgRepsInput dataChangeHandler={() => {return}}/>
            
            <View style={styles.buttonContainer}>
              <ButtonType1
                arrow={false}
                text={"SAVE SET"}
                styling={styles.button}
                textStyling={styles.buttonText}
                onClick={() => setHandler(item.item.sets, item)}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <View style={styles.timerContainer}>
                <MaterialIcons name="timer" {...timerIconStyling} />
                <Text style={styles.timerHeader}>REST BETWEEN SETS: </Text>
                <View style={styles.timeContainer}>
                  <Text style={styles.timerText}> {item.item.rest}</Text>
                </View>
              </View>
            </View>
            <Line />
            <View>
              <FlatList
                data={item.item.sets}
                keyExtractor={(item, index) => item.set}
                renderItem={(itemData) =>
                  itemData.item.weight === "" || itemData.item.reps === "" ? (
                    <>
                      <TouchableWithoutFeedback
                        onPress={() => setIsFocussed(itemData.item.set)}
                      >
                        <View
                          style={
                            isFocussed === itemData.item.set
                              ? styles.focussedSetContainer
                              : styles.setContainer
                          }
                        >
                          <View style={styles.iconContainer}>
                            <FontAwesome5
                              name="dot-circle"
                              {...cirlceIconStyling}
                            />
                            <Text style={styles.setText}>
                              SET {itemData.item.set}
                            </Text>
                          </View>
                          <Text style={styles.setText1}>
                            TARGET REPS: {item.item.targetReps}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <Line />
                    </>
                  ) : (
                    <>
                      <TouchableWithoutFeedback
                        onPress={() => setIsFocussed(itemData.item.set)}
                      >
                        <View
                          style={
                            isFocussed === itemData.item.set
                              ? styles.focussedSetContainer
                              : styles.setContainer
                          }
                        >
                          <View style={styles.iconContainer}>
                            <FontAwesome
                              name="check-circle"
                              {...checkIconStyling}
                            />
                            <Text style={styles.setText}>
                              SET {itemData.item.set}
                            </Text>
                          </View>
                          <View style={styles.quantityContainer}>
                            <Text style={styles.quantity}>
                              {itemData.item.weight}
                            </Text>
                            <Text style={styles.unit}>KILOGRAMS</Text>
                          </View>
                          <View style={styles.postCloseIconContainer}>
                            <Fontisto
                              name="close-a"
                              {...postCloseIconStyling}
                            />
                          </View>

                          <View style={styles.quantityContainer}>
                            <Text style={styles.quantity}>
                              {itemData.item.reps}
                            </Text>
                            <Text style={styles.unit}>REPS</Text>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                      <Line />
                    </>
                  )
                }
                keyExtractor={(item) => item.set}
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
                  onPress={() =>
                    navigation.navigate("ExerciseGuide", { index: item.index })
                  }
                >
                  <Text style={styles.footerButtonText}>EXERCISE GUIDE</Text>
                </TouchableOpacity>

                <View style={styles.hLine}></View>
                <Text style={styles.footerButtonText}>PREVIOUS STATS</Text>
              </View>
            </View>
          </View>
        )}
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

  buttonContainer: {
    alignItems: "center",
  },

  button: {
    paddingHorizontal: 50 * sc,
    marginVertical: 5 * sc,
  },

  buttonText: {
    fontSize: 20 * sc,
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
    flexDirection: "row",
    height: 45 * sc,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: themeColors.primary2,
  },
  focussedSetContainer: {
    flexDirection: "row",
    height: 45 * sc,
    alignItems: "center",
    justifyContent: "space-evenly",
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
