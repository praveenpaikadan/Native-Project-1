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
import API from './utilities/api'
import { getAPIAllLocal } from "./utilities/data-center";
import flash from './utilities/flash-message'

global.authToken 

export default function App() {

  // for showing loading screen
  const [appReady, setAppReady] = useState(false);
  
  // states that stores loacal data. The are put in the wrapping context. All are loaded when app starts. 
  // The navigation flow happens according to the availablility of this data.
  
  // The app decides to show the signIn screen or signup screen when authtoken is 'null' based on this 
  const [loggedIn, setLoggedIn] = useState(false) 
  const [credentials, setCredentials] = useState(null)
  const [workoutData, setWorkoutData] = useState(null)
  const [dayWorkout, setDayWorkout] = useState(null)



  var loadingstarted = false

  const resetCredentials = async (data) => {
    try{
      await AsyncStorage.setItem('credentials', JSON.stringify(data))
      setCredentials(data)
      return data
    }catch(error){
      console.log('Unable to set Credentials' , error)
      return false
    }
  }

  const resetWorkoutData = async (data) => {
    try{
      await AsyncStorage.setItem('workoutData', JSON.stringify(data))
      setWorkoutData(data)
      return data
    }catch(error){
      console.log('Unable to set workoutData' , error)
      return false
    }
  }

  const loadResources = async () => {

    // await AsyncStorage.removeItem('credentials')
    // await AsyncStorage.removeItem('workoutData')
    // await AsyncStorage.removeItem('authToken')

    try {
      const [creds, workoutdata, font, token ] = await Promise.all([
        AsyncStorage.getItem("credentials"), 
        AsyncStorage.getItem("workoutData"),
        AsyncStorage.getItem("authToken"), 
        Font.loadAsync({
          "ubuntu-light": require("./assets/fonts/Ubuntu-Light.ttf"),
          "ubuntu-regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
          "ubuntu-medium": require("./assets/fonts/Ubuntu-Medium.ttf"),
          "ubuntu-bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
        }),
      ])

      console.log('before updation creds : ', JSON.parse(creds))
      console.log('before updation workout data : ', JSON.parse(workoutdata))

      if(!authToken){
        setLoggedIn(false)
        return
      }

      if(!creds){
        loadingstarted = true
        var response = await getAPIAllLocal()
        switch (response.status) {
          case 200:
            console.log(response.data)
            resetCredentials(response.data.credentials)
            resetWorkoutData(response.data.workoutData)
            setLoggedIn(true)
            break;
          case 401:
            flash('Authorization failed. Please sign in again', 'danger', time=10000)
            break;
          case 101:
            flash('Oops Something Happened ...Please check your Internet and try again', 'danger', time=10000)
            break;
          default:
            if(response.data.message){
              flash(response.data.message, 'info')
            }
            break; 
          }
      }else{
        setCredentials(JSON.parse(creds))
        setWorkoutData(JSON.parse(workoutData))
        setLoggedIn(true)
      }

    
      if(loadingstarted === false){
        console.log("Running usual update")
        getAPIAllLocal()
        .then((response) => {
          switch (response.status) {
            case 200:
              resetCredentials(response.data.credentials)
              resetWorkoutData(response.data.workoutData)
              setLoggedIn(true)
              console.log("Usual update over and success")
              break;
            case 401:
              flash('Authorization failed. Please sign in again', 'danger', time=10000)
              break;
            case 101:
              flash('Failed to communicate with server...', 'danger', time=10000)
              break;
            default:
              if(response.data.message){
                flash(response.data.message, 'info')
              }
              break; 
            }
        })
      }

    }catch(e){
      // TBD => Handle failures
      console.log(e)
    }
  }
   
  if (appReady) {
    return (
        <AuthContext.Provider value={{  credentials, resetCredentials, loggedIn, setLoggedIn}}>
          <WorkoutContext.Provider
            value={{ workoutData, resetWorkoutData }}
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

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
