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
import { SetCompleteModal } from "./screens/modal/set-complete";
import { AgendaCalendar } from "./components/calendar";

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
  const [programOver, setProgramOver] = useState(false)

  // const [pendingUploads, setPendingUploads] = useState(null)  // Boolean state to store if pendingData?


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

  const setObtainedLocalData = async (creds_temp, workoutdata_temp, token_temp) => {
    setCredentials(JSON.parse(creds_temp));
    setWorkoutData(JSON.parse(workoutdata_temp))
    setToken(token_temp)
  }

  const dayWorkoutShape = (workoutData, currentDay) => {
    var dayWorkoutPlan = workoutData.program.schedule.find(obj => {return obj.day === currentDay})
    var exerciseList = dayWorkoutPlan.exercises
    return{
    day : currentDay,
    date : today(),
    workoutID: workoutData._id,
    programName: workoutData.program.programName,
    complete: false,
    level: workoutData.program.level,
    dayWorkoutPlan: dayWorkoutPlan,
    finalDay: currentDay === workoutData.program.schedule.length,
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

  const getLastDayDate = (wd) => {  // wd => workoutdata
    if (wd.history[0]){
      var day = wd.history.map(item => item.day).reduce((max, val) => max > val ? max : val)
      var date = wd.history.find(obj => obj.day === day).dateCompleted

      console.log(day, date)
      return {lastDaySaved: day, lastDateSaved: date}
    }
    return {lastDaySaved: 0, lastDateSaved: false}
  }

  const makeDayWorkout = async(workoutData, dayWorkout) => {
    console.log('Making Day Workout')
    var {lastDaySaved, lastDateSaved} = getLastDayDate(workoutData) 
    console.log('After calling the makeWorkout ', lastDateSaved,' ', lastDateSaved)
    console.log('lastDaySaved is .................', lastDaySaved)
    var finalDay = workoutData.program.schedule.length

    const isToday = () => {
      // console.log('wd in isToday is ', wd)    
      console.log('lastSaved date', lastDateSaved, 'today', today(), '  ', lastDateSaved === today())
      if (lastDateSaved === today() || lastDaySaved === finalDay){  // if it is same day or the final day return the original item from the workout history.
        var potDayWorkout = dayWorkoutShape(workoutData, lastDaySaved)
        var coreDayWorkout = workoutData.history.find(obj => {return obj.day === lastDaySaved})
        for (let i of Object.keys(coreDayWorkout)) {
          potDayWorkout[i] = coreDayWorkout[i]
        }
        potDayWorkout.complete = true
        return potDayWorkout
      }else{
        return false
      }
    }
    
    var newDayWorkout 
    
    if (dayWorkout === null){
      var sameday = lastDaySaved?isToday():false
      if(sameday){
        console.log('Day workout is null making new - Same day as that of last saved.')
        newDayWorkout = sameday
      }else{
        console.log('Day workout is null making new - New day after the last saved for day ', lastDaySaved+1)
        newDayWorkout = dayWorkoutShape(workoutData, lastDaySaved+1)
      }
   
    }else{
      if(dayWorkout.complete === true && dayWorkout.dateCompleted !== today()){
        if(finalDay > lastDaySaved){
          console.log('Day workout is present but new day, so making new after the last saved.')
          newDayWorkout = dayWorkoutShape(workoutData, finalDay <= dayWorkout.day?dayWorkout.day:dayWorkout.day + 1)
        }else{
          newDayWorkout = dayWorkout
        }
      }else{
        console.log('Day workout is present for today but not complete, so no changes made')
        newDayWorkout = dayWorkout
      }
    }

    resetDayWorkout(newDayWorkout)
  }
  // Handling Pending uploads

  const resetPendingUploads = async (data) => {
    if(data === null){
      await AsyncStorage.removeItem('pendingDayWorkouts')
      return
    }
    await AsyncStorage.setItem('pendingDayWorkouts', JSON.stringify(data))
  }

  const addToPending = async (data) => {
    var prev = await AsyncStorage.getItem('pendingDayWorkouts')
    var prev = prev?JSON.parse(prev):[]
    prev = prev.filter((item, index) => item.day !== data.day)  // to avoid duplicates
    prev.push(data)
    resetPendingUploads(prev)
  }

  const removeFromPending = async (data) => {
    var prev = await AsyncStorage.getItem('pendingDayWorkouts')
    if(!prev){return}
    var prev = JSON.parse(prev)
    prev = prev.filter((item, index) => item.day !== data.day)
    if(prev === []){AsyncStorage.removeItem('pendingDayWorkouts'); return}
    resetPendingUploads(prev)
  }

  const uploadPendingWorkout = async () => {
    var pendingUploadVar =  await AsyncStorage.getItem('pendingDayWorkouts')
    console.log('\npendingUploadVar: ', pendingUploadVar)
    pendingUploadVar = JSON.parse(pendingUploadVar)
    

    if ( ![undefined, [], null, 'null', '[]'].includes(pendingUploadVar)){
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
      
      await setObtainedLocalData(creds_temp, workoutdata_temp, token_temp)

      

      console.log("credentials: " +  creds_temp + "\n")
      console.log("workoutData: " +  workoutdata_temp + "\n")
      console.log("dayWorkout: " + dayWorkout_temp + "\n")



      // console.log("credentials: " +  credentials + "\n")
      // console.log("workoutData: " +  workoutData + "\n")
      // console.log("dayWorkout: " + dayWorkout + "\n")

    
      if(!authToken){
        setLoggedIn(false)
        return
      }

      uploadPendingWorkout()
      if(workoutdata_temp){
        console.log('Exeeeeeeeeeeeecu')
        await makeDayWorkout(JSON.parse(workoutdata_temp), JSON.parse(dayWorkout_temp))
      }

      if(!creds_temp || !workoutdata_temp){
        loadingstarted = true
        var response = await getAPIAllLocal()
        switch (response.status) {
          case 200:
            // console.log(response.data)
            await resetCredentials(response.data.credentials)
            await resetWorkoutData(response.data.workoutData)
            await makeDayWorkout(response.data.workoutData, null)
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

      // To be optimized
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
  
  // return <BodyCalendar/>

  if (appReady) {
    return (
        <AuthContext.Provider 
          value={{  uploadPendingWorkout, credentials, resetCredentials, loggedIn, setLoggedIn, token}}>
          <WorkoutContext.Provider
            value={{ workoutData, resetWorkoutData, dayWorkout, resetDayWorkout, makeDayWorkout, addToPending, removeFromPending, programOver, setProgramOver }}
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
