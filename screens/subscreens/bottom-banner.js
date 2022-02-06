import * as React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight } from "react-native";
import { globalFonts, sc, themeColors } from "../../styles/global-styles";
import { ElevatedCardTypeOne } from "../../components/cards";
import { WorkoutContext } from "../../components/workout-context";
import { BASE_URL } from "../../utilities/api";


export default BottomBanner = ({ navigation }) => {

  const {dayWorkout} = React.useContext(WorkoutContext)

  return (

      <View style={styles.bottomBox}>
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
      )
};
const styles = StyleSheet.create({

  bottomBox: {
    flex: 6,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  card: {
    maxHeight: 200 * sc,
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


});
