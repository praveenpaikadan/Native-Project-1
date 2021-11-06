import React, { useState } from "react";
import { StyleSheet, View, Text} from "react-native";
import { Header } from "../components/header";
import { ExerciseList } from "./subscreens/exerciselist";
import { StatusBar } from "expo-status-bar";
import { WorkoutCompleteModal } from "./modal/workout-complete";
import { sc } from "../styles/global-styles";

export default ShowExerciseList = ({ navigation, route }) => {
  const data = { ...route.params };
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} style="light" />

      <Header
        backButton={true}
        // onPress={() => setShowWorkoutComplete(true)}
        onPressMenu={() => navigation.openDrawer()}
      />
      <View style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          marginTop: 10 * sc,
        }}>
        <ExerciseList data={data.data}/>
      </View>
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
