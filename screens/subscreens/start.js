import * as React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight } from "react-native";
import { globalFonts, sc, themeColors } from "../../styles/global-styles";
import { ButtonType1 } from "../../components/buttons";
import { ElevatedCardTypeOne } from "../../components/cards";
import { WorkoutContext } from "../../components/workout-context";
import { AuthContext } from "../../components/auth-context";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { postInitiateWorkout } from "../../utilities/data-center";
import flashMessage from "../../utilities/flash-message";
import BottomBanner from "./bottom-banner";

export default StartSubScreen = ({ navigation, onClick, program, programEnded=false, programName}) => {

  const {dayWorkout, downloadAndSetWorkoutData} = React.useContext(WorkoutContext)
  const {credentials} = React.useContext(AuthContext)
  var programDetails = dayWorkout.programDetails
  var completed = dayWorkout.complete
  // console.log(completed)

  const [isLoading, setIsLoading] = React.useState(false)

  const handleStartTracking = () => {
    setIsLoading(true)
    postInitiateWorkout({workoutID: dayWorkout.workoutID })
    .then((response) => {
      if(response.data.status === 1){
        downloadAndSetWorkoutData()
        .then((response) => {
          if(!response){
            flashMessage('Something Happened. Please Check your internet and try again ...', 'danger')
            setIsLoading(false)    
          }
        })
        .catch(() => {
            flashMessage('Something Happened. Please Check your internet and try again ...', 'danger')
            setIsLoading(false)
        })
      }else{
        flashMessage('Something Happened. Please Check your internet and try again ...', 'danger')
        setIsLoading(false)
      }
      
    })
    .catch(() => {
      flashMessage('Something Happened. Please Check your internet and try again ...', 'danger')
        setIsLoading(false)
    })
  }

  return (
    <View style={styles.container}>
      {!programEnded?
      <View style={styles.topBox}>
        <View>
          <Text style={{...styles.topBoxTagText, 
            backgroundColor: completed?'green':themeColors.tertiary3,
            color: !completed?'black':'white', 
            }}>Start tracking your fitness</Text>
          {!completed?<View style={styles.triangle} />:<View style={{height: 8*sc}}></View>}
        </View>
        <Text style={styles.topBoxMainText}>{programDetails.programName}</Text>
        <Text style={styles.messageText}>Hi {credentials.name}! Your program extends {programDetails.durationWeeks} weeks.
         The training period officially starts from the day you start tracking your fitness by pressing the button below. </Text>
         <Text style={styles.messageText}>
           You can go to the diet plan page for your customized diet plan. Please contact your trainer if you are not assigned a diet plan. 
         </Text>

         <Text style={styles.messageText}>
           Swipe from right to left to access different pages including contact trainer page. 
         </Text>

          {!(credentials.currentWorkout.planType === "Complete" || credentials.currentWorkout.planType === "complete")? 
            <Text style={styles.messageText}>
              You have chosen {credentials.currentWorkout.planType} plan type. So you will be prompted on {credentials.currentWorkout.planType} basis to renew subscription
          </Text>
          :null}


        <ButtonType1
          text={!completed?"START TRACKING NOW": 'VIEW WORKOUT'}
          isLoading={isLoading}
          activityIndicatorSize={20*sc}
          arrow={!completed?20 * sc:false}
          styling={{alignSelf: 'center'}}
          textStyling={styles.buttonTextStyling}
          onClick={() => {if(!isLoading){handleStartTracking()}}}
        />
      </View>
      :
      <View style={styles.topBox}>
        <View>
          <Text style={{...styles.topBoxTagText, 
            backgroundColor: 'green',
            color: 'white', 
            }}>{'Congratulations !!! You have completed the Program'}</Text>
          {!completed?<View style={styles.triangle} />:<View style={{height: 8*sc}}></View>}
        </View>
        <Text style={styles.topBoxMainText}>{'Completed: '+programName}</Text>
        <ButtonType1
          text={'VIEW WORKOUT HISTORY'}
          arrow={!completed?20 * sc:false}
          styling={{width:280*sc, alignSelf: 'center'}}
          textStyling={styles.buttonTextStyling}
          onClick={() => {navigation.navigate('Root', { screen: "WorkoutHistory" })}}
        />
        <TouchableOpacity onPress={() => {navigation.navigate('Root', { screen: "Store" })}}>
          <Text style={styles.pickAnotherProgramText}>Pick Another Program</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('Root', { screen: "Contact" })}}>
          <Text style={styles.pickAnotherProgramText}>Contact Trainer</Text>
        </TouchableOpacity>
        

      </View>
      }

      <BottomBanner navigation={navigation}/>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },

  topBox: {
    width: "100%",
    justifyContent: "center",
    padding: 6 * sc,
  },
  bottomBox: {
    flex: 6,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  topBoxTagText: {
    fontSize: 12 * sc,
    alignSelf: "center",
    fontFamily: globalFonts.primaryLight,
    padding: 4 * sc,
    borderRadius: 5 * sc,
    backgroundColor: themeColors.tertiary3,
  },

  triangle: {
    alignSelf: "center",
    width: 0,
    height: 0,
    borderLeftWidth: 15 * sc,
    borderRightWidth: 15 * sc,
    borderTopWidth: 5 * sc,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: themeColors.tertiary3,
    marginBottom: 5 * sc,
  },

  topBoxMainText: {
    alignSelf: "center",
    fontFamily: globalFonts.primaryBold,
    fontSize: 18 * sc,
    paddingHorizontal: 8 * sc,
    opacity: 0.8,
    textAlign: "center",
    marginBottom: 10 * sc,
  },

  messageText:{
    alignSelf: "center",
    fontFamily: globalFonts.primaryLight,
    fontSize: 12 * sc,
    paddingHorizontal: 8 * sc,
    opacity: 0.8,
    textAlign: "center",
    marginBottom: 10 * sc,
  },

  trackNowButton: {
    // height:40*sc,
    alignSelf: "center",
    width: 160 * sc,
  },
  buttonTextStyling: {
    fontSize: 15 * sc,
  },
  card: {
    // height: 200 * sc,
    // width: 150 * sc,
    marginVertical: 10*sc,
    width: '40%',
    overflow: "hidden",
    justifyContent: "center",
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  cardOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardBannerText: {
    alignItems:'center',
    textAlign:'center',
    fontFamily: globalFonts.primaryBold,
    color: themeColors.primary2,
    fontSize: 22 * sc,
    textShadowColor: "rgba(255, 51, 0, 0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 50,
  },

  pickAnotherProgramText:{
    fontSize: 13*sc,
    opacity: 0.6,
    fontFamily: globalFonts.primaryRegular,
    marginTop: 10*sc,
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
});
