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
import { getAPIAllLocal, postBulkDayWorkout } from "./utilities/data-center";
import flash from './utilities/flash-message'
import { today } from "./utilities/helpers";

//Currently we are at day cjanging. The client is ok. It compare the complete status and dayCompeted and today () determine if the day is the same day or a different day. Next step is to bring this function the server. 

global.authToken 

export default function App() {

  // for showing loading screen
  const [appReady, setAppReady] = useState(false);
  
  // states that stores loacal data. All are loaded when app starts. 
  // The navigation flow happens according to the availablility of this data.
  // The app decides to show the signIn screen or signup screen when authtoken is 'null' based on this 
  const [loggedIn, setLoggedIn] = useState(false) 
  const [credentials, setCredentials] = useState(null)
  const [workoutData, setWorkoutData] = useState(null)
  const [dayWorkout, setDayWorkout] = useState(null)
  const [token, setToken] = useState(null)
  // const [pendingUploads, setPendingUploads] = useState(null)  // Boolean state to store if pendingData?
  var pendingUploadVar                  // Non state variable to store pending data

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

  const setObtainedLocalData = async (creds_temp, workoutdata_temp, token_temp,  dayWorkout_temp, pendingUploads_temp) => {
    setCredentials(JSON.parse(creds_temp));
    setWorkoutData(JSON.parse(workoutdata_temp))
    setToken(token_temp)
    setDayWorkout(JSON.parse(dayWorkout_temp))
    pendingUploadVar = JSON.parse(pendingUploads_temp)
  }

  const getLastDay = (wd) => {  // wd => workoutdata
    return wd.history[0]?  wd.history.map(item => item.day).reduce((max, val) => max > val ? max : val):  0
  }

  const isToday = (wd, day) => {
    var potDayWorkout = wd.history.find(obj => {return obj.day === day})
    var lastDateSaved = potDayWorkout?potDayWorkout.dateCompleted:false
    return lastDateSaved === today()? potDayWorkout: false
  }

  const makeDayWorkout = async(workoutData, dayWorkout) => {
    console.log('Making Day Workout')

    const dayWorkoutShape = (currentDay) => {
      var dayWorkoutPlan = workoutData.program.schedule.find(obj => {return obj.day === currentDay})
      var exerciseList = dayWorkoutPlan.exercises
      return{
      uploaded: false,
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
    }}

    var lastDaySaved = getLastDay(workoutData) 
    console.log('lastDaySaved is .................', lastDaySaved)
    var sameday = isToday(workoutData, lastDaySaved)

    if (dayWorkout === null){
      console.log('Day workout is null making new')
      if(sameday){
        await resetDayWorkout(sameday)
      }else{
        await resetDayWorkout(dayWorkoutShape(lastDaySaved+1))
      }
      
    }else if(dayWorkout.complete === true && dayWorkout.dateCompleted !== today()){
      await resetDayWorkout(dayWorkoutShape(dayWorkout.day + 1))
    }
  }


  // Handling Pending uploads

  const resetPendingUploads = async (data) => {
    if(data === null){
      await AsyncStorage.removeItem('pendingDayWorkouts')
      return
    }
    pendingUploadVar = data
    await AsyncStorage.setItem('pendingDayWorkouts', JSON.stringify(data))
  }

  const addToPending = async (data) => {
    var prev = pendingUploadVar?[...pendingUploadVar]:[]
    prev = prev.filter((item, index) => item.day !== data.day)  // to avoid duplicates
    prev.push(data)
    resetPendingUploads(prev)
  }

  const removeFromPending = (data) => {
    var prev = pendingUploadVar?[...pendingUploadVar]:[]
    prev = prev.filter((item, index) => item.day !== data.day)
    resetPendingUploads(prev)
  }

  const uploadPendingWorkout = () => {
    console.log('Uploading Pending')
    console.log('pendingUploadVar is ', pendingUploadVar)

    if (pendingUploadVar !== [] && pendingUploadVar !== null && pendingUploadVar !== '[]'){
      postBulkDayWorkout(pendingUploadVar)
      .then((response) => {
        console.log(response.status, response.data)
        switch (response.status) {
          case 200:
            flash('Succesfully uploaded pending workout', 'danger', time=4000)
            console.log('Sucesssfully uploaded pending')
            resetPendingUploads(null)
            break
          default:
            console.log('Failed to upload peeeeeeending data')
            break; 
          }
        })
      } 
    }

  const loadResources = async () => {
    // await AsyncStorage.removeItem('credentials')
    // await AsyncStorage.removeItem('workoutData')
    // await AsyncStorage.removeItem('authToken')
    // await AsyncStorage.removeItem('dayWorkout')
    // await AsyncStorage.removeItem('pendingDayWorkouts')

    try {
      const [creds_temp, workoutdata_temp, token_temp,  dayWorkout_temp, pendingUploads_temp, font, ] = await Promise.all([
        AsyncStorage.getItem("credentials"), 
        AsyncStorage.getItem("workoutData"),
        AsyncStorage.getItem("authToken"), 
        AsyncStorage.getItem("dayWorkout"), 
        AsyncStorage.getItem('pendingDayWorkouts'),
        Font.loadAsync({
          "ubuntu-light": require("./assets/fonts/Ubuntu-Light.ttf"),
          "ubuntu-regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
          "ubuntu-medium": require("./assets/fonts/Ubuntu-Medium.ttf"),
          "ubuntu-bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
        }),
      ])
      
      await setObtainedLocalData(creds_temp, workoutdata_temp, token_temp,  dayWorkout_temp, pendingUploads_temp)
      uploadPendingWorkout()

      console.log("credentials: " +  creds_temp + "\n")
      console.log("workoutData: " +  workoutdata_temp + "\n")
      console.log("dayWorkout: " + dayWorkout_temp + "\n")
      console.log("pendingUploads: " + pendingUploads_temp + "\n\n\n\n")



      // console.log("credentials: " +  credentials + "\n")
      // console.log("workoutData: " +  workoutData + "\n")
      // console.log("dayWorkout: " + dayWorkout + "\n")
      // console.log("pendingUploads: " + pendingUploads + "\n")
      

      if(!authToken){
        setLoggedIn(false)
        return
      }

      if(!creds_temp || !workoutdata_temp){
        loadingstarted = true
        var response = await getAPIAllLocal()
        switch (response.status) {
          case 200:
            // console.log(response.data)
            resetCredentials(response.data.credentials)
            resetWorkoutData(response.data.workoutData)
            makeDayWorkout(response.data.workoutData, null)
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
        console.log('Setting logged in basis of  local')
        setLoggedIn(true)
      }

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
            value={{ workoutData, resetWorkoutData, dayWorkout, resetDayWorkout, makeDayWorkout, addToPending, removeFromPending }}
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
