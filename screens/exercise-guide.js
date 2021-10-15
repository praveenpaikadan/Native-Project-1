import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import { ButtonType1 } from "../components/buttons";
import data from "../assets/data/data.json";
import { Header } from "../components/header";
import { ElevatedCardTypeOne } from "../components/cards";
import { themeColors, sc, globalFonts } from "../styles/global-styles";
import { StatusBar } from "expo-status-bar";
import { WorkoutContext } from "../components/workout-context";
import { AuthContext } from "../components/auth-context";
import { getExercise } from "../utilities/data-center";
import { makeMediaUrl } from "../utilities/helpers";

const einstructions = data.exercise.eId1.instructions;

export default ExerciseGuideScreen = ({ navigation, route }) => {
  const {exercise} = route.params 
  const [loading, setLoading] = useState(true)
  const [fetched, setFetched] = useState({})
  const { setLoggedIn } = useContext(AuthContext)

  const getExerciseDatafromServer = async () => {
    var response = await getExercise(exercise.exerciseID)
    switch (response.status) {
      case 200:
        setFetched(response.data)
        setLoading(false)
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
  }
  useEffect( () => {
    getExerciseDatafromServer()
    .then()
  }, [])



  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <Header
        backButton={true}
        onPress={() => navigation.pop()}
        onPressMenu={() => navigation.openDrawer()}
      />
      <View style={styles.contentContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.mainHeading}>
            {
              exercise.exerciseName
            }
          </Text>
          <View style={styles.cardContainer}>
            <ElevatedCardTypeOne styling={styles.card}>
              <Image
                source={require("../assets/images/fat-loss.jpg")}
                style={styles.image}
              />
            </ElevatedCardTypeOne>
            <ElevatedCardTypeOne styling={styles.card}>
              <Image
                source={require("../assets/images/muscle-gain.jpg")}
                style={styles.image}
              />
            </ElevatedCardTypeOne>
          </View>
        </View>

        <View style={styles.line}></View>


        {!loading?fetched.video[0]?<ButtonType1
          play={32 * sc}
          text={"Watch Now"}
          arrow={false}
          styling={styles.button}
          textStyling={styles.buttonText}
          onClick={() => {navigation.navigate('VideoPlayer', {link: makeMediaUrl(fetched.video[0].filename, secured=true)})}}
        />:null:null}

        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeading}>Step by step instructions:</Text>
        </View>

        <View style={styles.instructionsContainer}>

          {!loading?
          <ScrollView>
            <View style={styles.instructionsScrollContainer}>
              {console.log(fetched.equipments[0])}

              <Text style={{...styles.content,fontFamily: globalFonts.primaryBold}}>{!fetched.equipments[0]?'No Equipments Needed':'Equipments Needed:'}</Text>
              <View style={styles.equipmentContainer}>  
                <View style={{flexDirection: 'column'}}>
                  {fetched.equipments.map((equipment, index) => <Text style={styles.content} key={index}>{`     ${equipment}`}</Text>)}
                </View>
              </View>

              <Text style={{...styles.content, marginBottom: 10*sc, fontFamily: globalFonts.primaryBold}}>{'Detailed Instructions:'}</Text>
              {fetched.instructions.map((item, index) => {
                return (
                  <View key={index} style={styles.instructions}>
                    <Text style={styles.content}>{"  "+ item.step+ ". "+item.description}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>:<ActivityIndicator size={sc*76} color={themeColors.primary2} />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: themeColors.secondary2,
    alignItems: "center",
  },

  contentContainer: {
    flex: 1,
    width: "100%",
  },

  headingContainer: {
    alignItems: "center",
  },

  mainHeading: {
    fontFamily: globalFonts.primaryBold,
    fontSize: 20 * sc, //font size
    opacity: 0.8,
    color: themeColors.tertiary1,
    paddingVertical: 5 * sc,
  },

  cardContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: themeColors.tertiary2,
    paddingVertical: 5 * sc,
    paddingHorizontal: 5 * sc,
    borderRadius: 10 * sc,
  },

  card: {
    alignItems: "center",
    justifyContent: "center",
    width: 150 * sc,
    height: 150 * sc,
    backgroundColor: themeColors.secondary2,
    borderRadius: 10 * sc,
    margin: 5 * sc,
    overflow: "hidden",
  },

  line: {
    height: 5 * sc,
    width: "100%",
    backgroundColor: themeColors.primary1,
    marginTop: 5 * sc,
    marginBottom: 10 * sc,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  button: {
    width: 250 * sc,
    alignSelf: "center",
    ...Platform.select({
      android: {
        height: 45 * sc,
      },
    }),
  },

  buttonText: {
    fontSize: 25,
  },

  subHeadingContainer: {
    width: "100%",
    paddingVertical: 10 * sc,
    paddingHorizontal: 10 * sc,
    marginTop: 10 * sc,
    backgroundColor: themeColors.tertiary2,
  },

  subHeading: {
    fontFamily: globalFonts.primaryBold,
    fontSize: 15 * sc, //font size
    opacity: 0.8,
    color: themeColors.tertiary1,
  },

  equipmentContainer:{
    flex: 1,
    marginHorizontal: 2 * sc,
    marginTop: 5 * sc,
    marginBottom: 10 * sc,
  },

  instructionsContainer: {
    flex: 1,
    marginHorizontal: 2 * sc,
    marginTop: 10 * sc,
    marginBottom: 10 * sc,
  },

  instructionsScrollContainer: {
    width: "100%",
    paddingLeft: 6 * sc,
    paddingRight: 18 * sc,
  },

  instructions: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10 * sc,
  },

  content: {
    fontFamily: globalFonts.primaryRegular,
    fontSize:13*sc,
    textAlign: "justify",
  },
});
