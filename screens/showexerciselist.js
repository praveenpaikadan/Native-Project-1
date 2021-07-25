import React from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "../components/header";
import { ExerciseList } from "./subscreens/exerciselist";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/routers";
import { StatusBar } from "expo-status-bar";

export default ShowExerciseList = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <Header
        backButton={true}
        onPress={() => navigation.dispatch(StackActions.popToTop)}
      />
      <View style={{ flex: 1 }}>
        <ExerciseList timer={true} />
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
