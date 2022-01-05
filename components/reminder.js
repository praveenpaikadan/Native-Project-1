import * as React from "react";
import { View, Text, StyleSheet, Image, ImageBackground, TouchableHighlight, TouchableOpacity } from "react-native";
import { globalFonts, sc, themeColors } from "../styles/global-styles";
import { calculateCalories } from "../utilities/helpers";
import { AuthContext } from "./auth-context";
import { WorkoutContext } from "./workout-context";
import { ProfilePhoto } from "./profile-photo";
import PaymentPage from "../screens/payment-page";

export default ReminderBox = ({navigation}) => {

    const {credentials} = React.useContext(AuthContext);
    const {workoutData} = React.useContext(WorkoutContext);
    const dateOfExpiry = "04-01-2021"
    const message  = `Your current subscription will expire on ${dateOfExpiry}. To renew your subscription tap here.`

    var paymentPayload = {}
    paymentPayload.programID = credentials.currentWorkout.programID
    paymentPayload.receiptID = credentials.currentWorkout.receiptID

    const pressHandler = () => {
        navigation.navigate('PaymentPage', {data: paymentPayload, type: 'renew'})
    }

    if(workoutData){
      var {workoutsTracked, caloriesBurned} = calculateCalories(workoutData.history, workoutData.calsPerRepList)
    }else{
      var workoutsTracked = 0
      var caloriesBurned = 0
    }
    
  
    const data = {
      name: credentials.name,
      gender: credentials.gender,
      workoutsTracked: workoutsTracked,
      caloriesBurned: caloriesBurned,
    };

    return (

    <TouchableOpacity style={styles.wrapper} onPress={pressHandler}>
        <Text style={styles.message}>{message}</Text>
    </TouchableOpacity>
 
    )
} 


const styles = StyleSheet.create({
   
    //////profile container
    wrapper: {
      width: 360*sc,
      height: 50 * sc,
      alignSelf:'center',
      backgroundColor: themeColors.tertiary3,
      marginBottom: 10*sc,
      justifyContent: 'center'
    },
    message: {
        fontFamily: globalFonts.primaryLight,
        fontSize: 12*sc,
        color: themeColors.primary1,
        textAlign: 'center',
        marginHorizontal: 10*sc
    }

  });