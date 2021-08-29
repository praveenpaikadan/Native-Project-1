import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { StyleSheet } from "react-native";
import { AuthStack } from "./navigation/auth-stack";
import { AuthContext } from "./components/auth-context";
import { WorkoutContext } from "./components/workout-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState(null);
  const [storedWorkoutData, setStoredWorkoutData] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [firstUser, setFirstUser] = useState(true);

  const resetAuthToken = async (newToken) => {
    try{
      await AsyncStorage.setItem('authToken', token)
      setAuthToken(newToken)
      return newToken
    }catch(error){
      console.log("Error happened whilw storing new token")
      return false
    }  
  } 

  const resetFirstUser = async (value) => {
    try{
      await AsyncStorage.setItem('firstUser', value)
      setFirstUser(value)
      return value
    }catch(error){
      console.log('Unable to set first user' , error)
      return false
    }
  }

  const resetStoredCredentials = async (data) => {
    try{
      await AsyncStorage.setItem('Credentials', data)
      setStoredCredentials(data)
      return data
    }catch(error){
      console.log('Unable to set Credentials' , error)
      return false
    }
  }

  const resetStoredWorkoutData = async (data) => {
    try{
      await AsyncStorage.setItem('WorkoutData', data)
      setStoredWorkoutData(data)
      return data
    }catch(error){
      console.log('Unable to set storedWorkoutData' , error)
      return false
    }
  }

  const loadResources = async () => {

    try {
      const [creds, workoutdata, authToken, firstUser, font ] = await Promise.all([
        AsyncStorage.getItem("Credentials"), 
        AsyncStorage.getItem("WorkoutData"), 
        AsyncStorage.getItem("authToken"),
        AsyncStorage.getItem("firstUser"),
        Font.loadAsync({
          "ubuntu-light": require("./assets/fonts/Ubuntu-Light.ttf"),
          "ubuntu-regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
          "ubuntu-medium": require("./assets/fonts/Ubuntu-Medium.ttf"),
          "ubuntu-bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
        }),
      ])

      setStoredCredentials(JSON.parse(creds));
      setStoredWorkoutData(JSON.parse(workoutdata));
      setAuthToken(authToken);
      setFirstUser((JSON.parse(firstUser)===null?true:false))
      console.log(authToken)
    }catch(e){
      console.log(e)
    }
  }
   
  if (appReady) {
    return (
        <AuthContext.Provider value={{ storedCredentials, resetStoredCredentials, authToken, resetAuthToken, firstUser, resetFirstUser }}>
          <WorkoutContext.Provider
            value={{ storedWorkoutData, resetStoredWorkoutData }}
          >
            <AuthStack />
            <FlashMessage position="top" />
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
