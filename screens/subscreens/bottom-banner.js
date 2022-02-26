import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight } from "react-native";
import { globalFonts, sc, themeColors } from "../../styles/global-styles";
import { ElevatedCardTypeOne } from "../../components/cards";
import { WorkoutContext } from "../../components/workout-context";
import { BASE_URL } from "../../utilities/api";
import { ButtonType1 } from "../../components/buttons";
import GeneralInfoModel from "../modal/general-info-model";


export default BottomBanner = ({ navigation }) => {

  const {dayWorkout} = React.useContext(WorkoutContext)

  const [instructionModalVisible, setInstructionModalVisible] = useState(false)

  return (

      <View style={styles.bottomBox}>

         {dayWorkout.programGeneralInstructions?<ButtonType1
              text={'Read General Instructions'}
              arrow={false}
              styling={styles.generalInstructionsButton}
              textStyling={styles.generalInstructionsButtonText}
              onClick={() => {setInstructionModalVisible(true)}}
          />:null}
          <View style={styles.cardsWrapper}>
            <ElevatedCardTypeOne styling={styles.card}>
              <TouchableHighlight onPress={() => {navigation.navigate('Root', {screen : 'DietPlan', params: { programID: dayWorkout.programID, day: dayWorkout.day}})}}>
              <ImageBackground
                style={styles.cardImage}
                source={require("../../assets/images/diet-plan.jpg")}
              >
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardBannerText}>
                    Your Diet Plan
                  </Text>
                </View>
              </ImageBackground>
              </TouchableHighlight>
            </ElevatedCardTypeOne>

            <ElevatedCardTypeOne styling={styles.card}>
              <TouchableHighlight onPress={() => {navigation.navigate('Root', {screen : 'WebPage', params: { heading: 'Recipes', url: BASE_URL+'/recipes' }})}}>
              <ImageBackground
                style={styles.cardImage}
                source={require("../../assets/images/recipes.jpg")}
              >
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardBannerText}>Recipes</Text>
                </View>
              </ImageBackground>
              </TouchableHighlight>
            </ElevatedCardTypeOne>
          </View>

          <GeneralInfoModel visible={instructionModalVisible} setVisible={setInstructionModalVisible} data={{heading: dayWorkout.programName, subHeading: 'General Instructions', content: dayWorkout.programGeneralInstructions}}/>
          
          </View>
      )
};
const styles = StyleSheet.create({

  bottomBox:{
    flex: 6
  },

  cardsWrapper: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  card: {
    maxHeight: 200 * sc,
    // width: 150 * sc,
    marginVertical: 10*sc,
    width: '45%',
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
    fontSize: 18 * sc,
    textShadowColor: "rgba(255, 51, 0, 0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 50,
  },

  generalInstructionsButton:{
    width: '92.5%',
    height: 25*sc,
    marginTop:9*sc,
    backgroundColor: themeColors.tertiary2,
    borderColor: themeColors.primary1,
    borderWidth: 1,
    alignSelf: 'center',
  },

  generalInstructionsButtonText:{
    fontSize: 10*sc,
    color: themeColors.primary1,
    fontFamily: globalFonts.primaryRegular,
  }




});
