import React from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "../components/header";
import { ExerciseList } from "./subscreens/exerciselist";
import { StatusBar } from "expo-status-bar";

export default ShowExerciseList = ({ navigation, route }) => {
  const data = { ...route.params };
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} style="light" />
      <Header
        backButton={true}
        onPress={() => navigation.popToTop()}
        onPressMenu={() => navigation.openDrawer()}
      />
      <View style={{ flex: 1 }}>
        <ExerciseList timer={true} data={data.exerciselist} />
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
