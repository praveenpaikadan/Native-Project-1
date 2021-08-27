import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { StyleSheet } from "react-native";
import { AuthStack } from "./navigation/auth-stack";
import { AuthContext } from "./components/auth-context";
import { WorkoutContext } from "./components/workout-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState(null);
  const [storedWorkoutData, setStoredWorkoutData] = useState(null);

  const loadResources = async () => {
  console.log('Starting async call')

    try {
      const [creds, workoutdata, font ] = await Promise.all([
        AsyncStorage.getItem("Credentials"), 
        AsyncStorage.getItem("WorkoutData"), 
        Font.loadAsync({
          "ubuntu-light": require("./assets/fonts/Ubuntu-Light.ttf"),
          "ubuntu-regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
          "ubuntu-medium": require("./assets/fonts/Ubuntu-Medium.ttf"),
          "ubuntu-bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
        })
      ])
      setStoredCredentials(JSON.parse(creds));
      console.log(storedCredentials)
      console.log(storedWorkoutData)
      setStoredWorkoutData(JSON.parse(workoutdata));
    }catch(e){
      console.log(e)
    }
  }
   
  if (appReady) {
    return (
        <AuthContext.Provider value={{ storedCredentials, setStoredCredentials }}>
          <WorkoutContext.Provider
            value={{ storedWorkoutData, setStoredWorkoutData }}
          >
            <AuthStack />
          </WorkoutContext.Provider>
        </AuthContext.Provider>
    );
  } else {
    return (
      <AppLoading
        startAsync={loadResources}
        onFinish={() => setTimeout(() => setAppReady(true), 500)}
        onError={console.warn}
      />
    );
  }
}

export const BASE_URL = "http://localhost:3567"

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
