import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { sc, themeColors, globalFonts } from "../styles/global-styles";
import { ButtonType1 } from "../components/buttons";
import { SubHeader } from "../components/subheader";
import { StatusBar } from "expo-status-bar";
import { BASE_URL } from "../utilities/api";


export default ProgramDetails = ({ navigation, route }) => {

  const {data} = route.params

  if(data.videos[0]){
    var video_link = `${BASE_URL}/media/${data.videos[0].filename}`
  }
  
  console.log(data)
  var imgSource = data.bgImage
          ?{uri: data.bgImage, headers: {'X-Access-Token': authToken}}
          :require('../assets/images/dead-lift.jpg')

  const backHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.programDetailsContainer}>
      <StatusBar translucent={true} />
      <View style={styles.backgroudImageContainer}>
        <ImageBackground
          source={imgSource}
          style={styles.image}
        >
          <View style={styles.overlay}>
            <SubHeader
              text={data.programName.split("Aboo Thahir")}
              onPress={backHandler}
            />

            <View style={styles.contentContainer}>
              <Text style={styles.smallHeading}>
                {data.durationWeeks} week program for {data.level} level.
              </Text>
              
             {data.videos[0]? <ButtonType1
                text={"Watch Video"}
                play={30}
                arrow={false}
                styling={styles.vbutton}
                textStyling={styles.vbuttonText}
                onClick={() => {navigation.navigate('VideoPlayer', {link: video_link})}}
              />
              :<></>
            }
              
              <Text style={styles.smallHeading}>
                Category: {'custom category'}
              </Text>
              <Text style={styles.smallHeading}>
                Days Per Week: {data.daysPerWeek}
              </Text>
              <Text style={styles.smallHeading}>
                Equipment: {data.equipments.join(', ')}
              </Text>
              
              <ButtonType1
                text={"Join Now"}
                arrow={false}
                styling={styles.button}
                textStyling={styles.buttonText}
                onClick={() => navigation.navigate("BuyNow", {data: data, bgImage :imgSource})}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      <ScrollView style={styles.descriptionContainer}>
        <Text style={styles.content}>{data.goal}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  programDetailsContainer: {
    width: "100%",
    height: "100%",
    marginTop: 40 * sc,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  backgroudImageContainer: {
    flex: 1,
  },

  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  contentContainer: {
    alignItems: "center",
    paddingVertical: 10 * sc,
    paddingHorizontal: 6*sc
  },

  smallHeading: {
    color: themeColors.secondary2,
    fontSize: 14 * sc,
    fontFamily: globalFonts.primaryMedium,
    marginVertical: 8 * sc,
  },

  button: {
    minWidth: 200 * sc,
  },

  vbutton: {
    width: 160 * sc,
    height: 40*sc
  },

  buttonText: {
    fontSize: 20 * sc,
  },

  vbuttonText: {
    fontSize: 17 * sc,
  },

  descriptionContainer: {
    flex: 1,
    padding: 15 * sc,
  },

  content: {
    color: themeColors.tertiary1,
    fontFamily: globalFonts.primaryRegular,
    fontSize: 16 * sc,
    textAlign: "justify",
    lineHeight: 30 * sc,
  },
});
