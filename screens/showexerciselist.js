import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "../components/header";
import { ExerciseList } from "./subscreens/exerciselist";
import { StatusBar } from "expo-status-bar";
import { WorkoutCompleteModal } from "./modal/workout-complete";

export default ShowExerciseList = ({ navigation, route }) => {
  const data = { ...route.params };
  const [showWorkoutComplete, setShowWorkoutComplete] = useState(false);

  const editingHandler = () => {
    setShowWorkoutComplete(false);
  };

  const workoutDoneHandler = () => {
    navigation.popToTop();
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} style="light" />
      <Header
        backButton={true}
        onPress={() => setShowWorkoutComplete(true)}
        onPressMenu={() => navigation.openDrawer()}
      />
      <View style={{ flex: 1 }}>
        <ExerciseList
          timer={true}
          data={data.exerciselist}
          onPress={(index) => navigation.navigate("Exercise", { index: index })}
        />
      </View>
      <WorkoutCompleteModal
        visible={showWorkoutComplete}
        continueEditing={() => editingHandler()}
        workoutDone={workoutDoneHandler}
        text={"DISCARD WORKOUT"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: "100%",
  },
});
