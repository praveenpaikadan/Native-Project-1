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
import { getFullMediaUrlIfRelative } from "../utilities/helpers";
import VimeoWebPage from "../components/vimeo-web-player";


export default ProgramDetails = ({ navigation, route }) => {

  const {data} = route.params

  if(data.videos[0]){
    var video_link = `${BASE_URL}/media/${data.videos[0].filename}`
  }
  
  // console.log(data)
  // var imgSource = data.bgImage
  //         ?{uri: data.bgImage, headers: {'X-Access-Token': authToken}}
  //         :require('../assets/images/dead-lift.jpg')

  const backHandler = () => {
    navigation.goBack();
  };

  const [videoActive, setVideoActive]  = React.useState(false)
  const [fullScreen, setFullScreen] = React.useState(false);

  return(
    <View style={{flex: 1}}>
      <StatusBar translucent={true} />
      <View style={{ flex: 1}}>
        <View>
          <View style={styles.backgroudImageContainer}>
            <ImageBackground
            source={{uri: getFullMediaUrlIfRelative(data.coverImage)}}
            style={styles.image}
            >
              <View style={styles.overlay}>
            <SubHeader
              text={data.programName}
              onPress={backHandler}
              
            />


            <View style={styles.contentContainer}>
              
              {!videoActive?<React.Fragment>
                {data.videos[0]? <ButtonType1
                    text={"Watch Introduction"}
                    play={30}
                    arrow={false}
                    styling={styles.vbutton}
                    textStyling={styles.vbuttonText}
                    onClick={() => {navigation.navigate('VideoPlayer', {link: video_link})}}
                  />
                  :<></>
                }
                <ScrollView style={{height: 155*sc}} contentContainerStyle={{ justifyContent: 'center', paddingTop: 10*sc, paddingTop: 10*sc}}>
                  <Text style={styles.smallHeading}>
                    Category: {data.category}
                  </Text>

                  <Text style={styles.smallHeading}>
                    Program Duration: {data.durationWeeks}
                  </Text>

                  <Text style={styles.smallHeading}>
                    Days Per Week: {data.daysPerWeek}
                  </Text>

                  <Text style={styles.smallHeading}>
                    Equipments Required: {data.equipments.join(', ')  }
                  </Text>
                </ScrollView >
                
              </React.Fragment>
              : <VimeoWebPage embedString={data.videoEmbedString} fullScreen={fullScreen} setFullScreen={setFullScreen}/>

              }
              
              <ButtonType1
                text={"Join Now"}
                arrow={false}
                styling={styles.button}
                textStyling={styles.buttonText}
                onClick={() => navigation.navigate("BuyNow", {data: data})}
              />
            </View>

          </View>

              </ImageBackground>

          </View>
        </View>
          <View style={{flex: 1}}>
            <ScrollView style={{height: '100%'}}>
              <Text style={styles.content}>{data.goal}</Text>
            </ScrollView>
          </View>
      </View>
  </View>

  )
}

const styles = StyleSheet.create({
  programDetailsContainer: {
    width: "100%",
    flex:1
  },

  image: {
    width: "100%",
    alignSelf:'center',
    // height: "100%",
  },

  backgroudImageContainer: {
    // flex: 1,
  },

  overlay: {
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
    marginVertical: 4 * sc,
    textAlign: 'center'
  },

  button: {
    // marginTop: 10*sc,
    minWidth: 200 * sc,
  },

  vbutton: {
    // width: 160 * sc,
    alignSelf: 'center',
    height: 40*sc
  },

  buttonText: {
    fontSize: 20 * sc,
  },

  vbuttonText: {
    fontSize: 17 * sc,
  },

  descriptionContainer: {
    backgroundColor: 'pink',
    flex: 1,
    padding: 15 * sc,
  },

  content: {
    color: themeColors.tertiary1,
    fontFamily: globalFonts.primaryRegular,
    fontSize: 13 * sc,
    textAlign: "justify",
    lineHeight: 30 * sc,
    paddingBottom: 20*sc,
    padding: 10*sc
  },
});
