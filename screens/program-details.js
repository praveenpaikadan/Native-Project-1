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
import { getFullMediaUrlIfRelative } from "../utilities/helpers";
import VimeoWebPage from "../components/vimeo-web-player";


export default ProgramDetails = ({ navigation, route }) => {

  const {data} = route.params

  console.log(data)
  // if(data.videos[0]){
  //   var video_link = `${BASE_URL}/media/${data.videos[0].filename}`
  // }
  
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
      <StatusBar translucent={true} hidden={fullScreen} />
      <View style={{ flex: 1}}>
        <View>
          <View style={styles.backgroudImageContainer}>

          <ImageBackground
            source={{uri: getFullMediaUrlIfRelative(data.coverImage)}}
            style={styles.image}
            >
              <View style={styles.overlay}>
            {!fullScreen?<SubHeader
              text={data.programName}
              onPress={backHandler}
              styling={{backgroundColor: videoActive?themeColors.primary1:"rgba(67,67,67,0.5)"}}
            />:null}

          {!videoActive?
            <View style={styles.contentContainer}>
              <React.Fragment>
                {/* {data.videos[0]? <ButtonType1 */}
                {data.videoEmbedString? <ButtonType1
                    text={"Watch Introduction"}
                    play={50*sc}
                    arrow={false}
                    styling={styles.vbutton}
                    textStyling={styles.vbuttonText}
                    // onClick={() => {navigation.navigate('VideoPlayer', {link: video_link})}}
                    onClick={() => {setVideoActive(true)}}
                  />
                  :null
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
                    Equipments Required: {data.equipments.join(', ')}
                  </Text>
                </ScrollView >

                <ButtonType1
                  text={"Join Now"}
                  arrow={false}
                  styling={styles.button}
                  textStyling={styles.buttonText}
                  onClick={() => navigation.navigate("BuyNow", {data: data})}
                />
                
              </React.Fragment>

            </View>
            : 
            <View>
            <VimeoWebPage embedString={data.videoEmbedString} fullScreen={fullScreen} setFullScreen={setFullScreen} secondButton={{text: 'Exit Video', action: () => {setVideoActive(false)} }}/>
            </View>
          }
          </View>
        </ImageBackground>

          </View>
        </View>
          <View style={{flex: 1}}>
            <ScrollView style={{height: '100%'}}>
              <Text style={styles.content}>{data.goal}</Text>
            </ScrollView>
           {videoActive && !fullScreen?<ButtonType1
              text={"Join Now"}
              arrow={false}
              styling={{borderRadius: 0}}
              textStyling={styles.buttonText}
              onClick={() => navigation.navigate("BuyNow", {data: data})}
            />:null}
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
    marginTop: 10*sc,
    minWidth: 200 * sc,
  },

  vbutton: {
    // width: 160 * sc,
    alignSelf: 'center',
    height: 30*sc
  },

  buttonText: {
    fontSize: 15 * sc,
  },

  vbuttonText: {
    fontSize: 12 * sc,
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
