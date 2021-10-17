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
import { today } from "./utilities/helpers";

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
  const [token, setToken] = useState(null)


  var loadingstarted = false

  const resetToken =  async (data) => {
    try{
      await AsyncStorage.setItem('authToken', JSON.stringify(data))
      setCredentials(data)
      return data
    }catch(error){
      console.log('Unable to set Token' , error)
      return false
    }
  }

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

  const resetDayWorkout = async (data) => {
    try{
      await AsyncStorage.setItem('dayWorkout', JSON.stringify(data))
      setDayWorkout(data)
      return data
    }catch(error){
      console.log('Unable to set dayWorkoutData' , error)
      return false
    }
  }

  const setObtainedLocalData = async (creds_temp, workoutdata_temp, token_temp,  dayWorkout_temp) => {
    setCredentials(JSON.parse(creds_temp));
    setWorkoutData(JSON.parse(workoutdata_temp))
    setToken(token_temp)
    setDayWorkout(JSON.parse(dayWorkout_temp))
  }

  const makeDayWorkout = async(workoutData, dayWorkout) => {

    var currentDay = workoutData.currentDay
    var dayWorkoutPlan = workoutData.program.schedule.find(obj => {return obj.day === currentDay})
    var exerciseList = dayWorkoutPlan.exercises

    var dayWorkoutShape = {
      day : currentDay,
      date : today(),
      workoutID: workoutData._id,
      complete: false,
      workout: exerciseList.map((exercise, index) => {
        return {
            exerciseNumber: index+1,
            exerciseName: exercise.exerciseName,
            exerciseID: exercise.exerciseID,
            reps: exercise.target.map(item => 0),
            repetitionType: exercise.repetitionType, 
        }
      }) 
    }

    if (dayWorkout === null){
      console.log('Day workout is null making new')
      var exerciseList = dayWorkoutPlan.exercises
      var currentDay = workoutData.currentDay
      await resetDayWorkout(dayWorkoutShape)
    }else if(dayWorkout.complete === true && dayWorkout.dateComplete !== today()){
      dayWorkout.day = dayWorkout.day+1
      dayWorkout.date = today()
      await resetDayWorkout(dayWorkout)
    }
  }

  const loadResources = async () => {

    // await AsyncStorage.removeItem('credentials')
    // await AsyncStorage.removeItem('workoutData')
    // await AsyncStorage.removeItem('authToken')
    // await AsyncStorage.removeItem('dayWorkout')

    try {
      const [creds_temp, workoutdata_temp, token_temp,  dayWorkout_temp, font, ] = await Promise.all([
        AsyncStorage.getItem("credentials"), 
        AsyncStorage.getItem("workoutData"),
        AsyncStorage.getItem("authToken"), 
        AsyncStorage.getItem("dayWorkout"), 
        Font.loadAsync({
          "ubuntu-light": require("./assets/fonts/Ubuntu-Light.ttf"),
          "ubuntu-regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
          "ubuntu-medium": require("./assets/fonts/Ubuntu-Medium.ttf"),
          "ubuntu-bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
        }),
      ])
      
      await setObtainedLocalData(creds_temp, workoutdata_temp, token_temp,  dayWorkout_temp)

      // console.log(creds_temp, '\n\n', workoutdata_temp, '\n\n', token_temp, '\n\n',  dayWorkout_temp )
    
      

      // console.log('before updation creds : ', JSON.parse(creds))
      // console.log('before updation workout data : ', JSON.parse(workoutdata))

      if(!authToken){
        setLoggedIn(false)
        return
      }

      if(!credentials){
        loadingstarted = true
        var response = await getAPIAllLocal()
        switch (response.status) {
          case 200:
            // console.log(response.data)
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

      console.log(workoutData)
      if(workoutdata_temp){
        await makeDayWorkout(JSON.parse(workoutdata_temp), JSON.parse(dayWorkout_temp))
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
        <AuthContext.Provider 
          value={{  credentials, resetCredentials, loggedIn, setLoggedIn, token}}>
          <WorkoutContext.Provider
            value={{ workoutData, resetWorkoutData, dayWorkout, resetDayWorkout }}
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
