import * as React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight } from "react-native";
import { globalFonts, sc, themeColors } from "../../styles/global-styles";
import { ButtonType1 } from "../../components/buttons";
import { ElevatedCardTypeOne } from "../../components/cards";
import { WorkoutContext } from "../../components/workout-context";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";

export default TrackNowSubScreen = ({ navigation, onClick, program, programEnded=false, programName}) => {

  const {dayWorkout} = React.useContext(WorkoutContext)
  var completed = dayWorkout.complete
  // console.log(completed)


  return (
    <View style={styles.container}>
      {!programEnded?
      <View style={styles.topBox}>
        <View>
          <Text style={{...styles.topBoxTagText, 
            backgroundColor: completed?'green':themeColors.tertiary3,
            color: !completed?'black':'white', 
            }}>{!completed?'Next Workout':'You completed today\'s workout'}</Text>
          {!completed?<View style={styles.triangle} />:<View style={{height: 8*sc}}></View>}
        </View>
        <Text style={styles.topBoxMainText}>{program}</Text>
        <ButtonType1
          text={!completed?"TRACK NOW": 'VIEW WORKOUT'}
          arrow={!completed?20 * sc:false}
          styling={!completed?styles.trackNowButton:{width:210*sc, alignSelf: 'center'}}
          textStyling={styles.buttonTextStyling}
          onClick={onClick}
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

      <View style={styles.bottomBox}>
        <ElevatedCardTypeOne styling={programEnded? styles.smallcard:styles.card}>
          <TouchableHighlight onPress={() => {navigation.navigate('Root', {screen : 'DietPlan', params: { programID: dayWorkout.programID, day: dayWorkout.day}})}}>
          <ImageBackground
            style={styles.cardImage}
            source={require("../../assets/images/diet-plan.jpg")}
          >
            <View style={styles.cardOverlay}>
              <Text style={styles.cardBannerText}>
                Your{"\n"} Diet {"\n"} Plan{" "}
              </Text>
            </View>
          </ImageBackground>
          </TouchableHighlight>
        </ElevatedCardTypeOne>

        <ElevatedCardTypeOne styling={programEnded? styles.smallcard:styles.card}>
          <ImageBackground
            style={styles.cardImage}
            source={require("../../assets/images/recipes.jpg")}
          >
            <View style={styles.cardOverlay}>
              <Text style={styles.cardBannerText}>Recipes</Text>
            </View>
          </ImageBackground>
        </ElevatedCardTypeOne>
      </View>
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

  trackNowButton: {
    // height:40*sc,
    alignSelf: "center",
    width: 160 * sc,
  },
  buttonTextStyling: {
    fontSize: 20 * sc,
  },
  card: {
    height: 200 * sc,
    width: 150 * sc,
    overflow: "hidden",
    justifyContent: "center",
  },

  smallcard: {
    height: 150 * sc,
    width: 150 * sc,
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
    fontFamily: globalFonts.primaryBold,
    color: themeColors.primary2,
    fontSize: 36 * sc,
    textShadowColor: "rgba(255, 51, 0, 0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 50,
  },

  pickAnotherProgramText:{
    opacity: 0.6,
    fontFamily: globalFonts.primaryRegular,
    marginTop: 10*sc,
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
});
