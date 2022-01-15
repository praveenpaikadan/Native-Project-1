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
import VideoPlayer from "../components/video-player";
import VimeoWebPage from "../components/vimeo-web-player";
import AsyncStorage from "@react-native-async-storage/async-storage";
import flashMessage from "../utilities/flash-message";
import { Spinner1 } from "../components/loading-spinner";
import { MessageBox1 } from "../components/message-box";


const ImageCard = (props) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)

  const cardStyles = StyleSheet.create({

    
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: themeColors.tertiary2,
    paddingVertical: 10 * sc,
    borderRadius: 10 * sc,

  },

  card: {
    alignItems: "center",
    justifyContent: "center",
    width: 160 * sc,
    height: 140 * sc,
    backgroundColor: themeColors.secondary2,
    borderRadius: 10 * sc,
    marginVertical: 10 * sc,
    marginHorizontal: 5*sc,
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
  

  });

  return(
    <View style={{...styles.cardContainer, display:image1 && image2?'flex':'none'}} >
        <ElevatedCardTypeOne styling={cardStyles.card}>
          <Image 
            source={props.image1} 
            style={{...cardStyles.image, display:image1 && image2?'flex':'none'}}
            onLoad={() => {setImage1(true)}}
          />
          {/*placeholder*/}
          {/* <Image 
            style={{...cardStyles.image, display:image1?'none':'flex'}}
            source={require("../../assets/images/exercise-place-holder1.png")}
          /> */}
          </ElevatedCardTypeOne>
          
          <ElevatedCardTypeOne styling={cardStyles.card}>
          <Image 
            source={props.image2} 
            style={{...cardStyles.image, display:image1 && image2?'flex':'none'}}
            onLoad={() => {setImage2(true)}}
          />

          {/*placeholder*/}
          {/* <Image 
            style={{...cardStyles.image, display:image2?'none':'flex'}}
            source={require("../../assets/images/exercise-place-holder2.png")}
          /> */}
      </ElevatedCardTypeOne>

    </View>
  )
}


export default ExerciseGuideScreen = ({ navigation, route }) => {
  const {exercise} = route.params 
  const [loading, setLoading] = useState(true)
  const [fetched, setFetched] = useState(null)
  const { setLoggedIn } = useContext(AuthContext)
  const [reloadSwitch, setReloadSwitch] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)

  const getExerciseFromLocal = async (exercise) => {
    var response = await AsyncStorage.getItem('exerciseStore')
    if(response){
      var exercise = JSON.parse(response).find(item => item._id === exercise.exerciseID)
      if(exercise){
        return exercise
      }
    }
    return null
  }

  const saveToLocalExerciseStore = (exercise) => {
    AsyncStorage.getItem('exerciseStore')
    .then(res => {
      if(res){
        var localExArray = JSON.parse(res)
        var index = localExArray.findIndex(item => item._id === exercise._id)
        if(index !== -1){
          localExArray[index] = exercise
        }else{
          localExArray.push(exercise)
        }
      }else{
        var localExArray = [exercise]
      }
      AsyncStorage.setItem('exerciseStore', JSON.stringify(localExArray))
    })
  }


  const getExerciseDatafromServer = async (exercise) => {
    var response = await getExercise(exercise.exerciseID)
    switch (response.status) {
      case 200:
        return response
      default:
        return null
      }
  }


  useEffect( () => {
    getExerciseFromLocal(exercise)
    .then((localEx) => {
      setFetched(localEx)
      setLoading(localEx?false:true)
      getExerciseDatafromServer(exercise)
      .then((response) => {
        if(response){
          setFetched(response.data)
          setLoading(false)
          saveToLocalExerciseStore(response.data)
        }else{
          if(localEx){
            flashMessage('Showing cached exercise instructions. Please check internet..','info', 300)
          }
          setLoading(false)
        }
      }
    ) 
  })
    
  }, [reloadSwitch])



  return (
    <View style={styles.container}>
      <StatusBar translucent={true} hidden={fullScreen?true:false}/>
      {!fullScreen?
      <Header
        backButton={true}
        onPress={() => navigation.pop()}
        onPressMenu={() => navigation.openDrawer()}
      />
      :null}

      <View style={styles.contentContainer}>
        <View style={styles.headingContainer}>
          <View style={styles.cardContainer}>
            
          
          {/* {!loading?
            fetched.video[0]?
            <View style={{alignItems:'center', backgroundColor: 'yellow'}} >
              <VideoPlayer navigation={navigation} route={{params: {link: makeMediaUrl(fetched.video[0].filename, true), notFullScreen: true, width: 360*sc}}}/>
            </View>
            :null:
          null}   */}
          
          {!loading && fetched?

            (fetched.videoEmbedString?
            
            <VimeoWebPage embedString={fetched.videoEmbedString} fullScreen={fullScreen} setFullScreen={setFullScreen}/>
            
            :

      
            <ImageCard 
              image1={{uri: fetched.imageUrl1?fetched.imageUrl1: makeMediaUrl(fetched.images && fetched.images[0]?fetched.images[0].filename:'', true)}}
              image2={{uri: fetched.imageUrl2?fetched.imageUrl2: makeMediaUrl(fetched.images && fetched.images[1]?fetched.images[1].filename:'', true)}}
            />

            )

          :null}

          

          </View>

        </View>

        <Text style={styles.mainHeading}>
            {
              exercise.exerciseName
            }
          </Text>

        <View style={styles.line}></View>

{/*
        {!loading?
        fetched.video[0]?

        <ButtonType1
          play={20 * sc}
          text={"Watch Now"}
          arrow={false}
          styling={styles.button}
          textStyling={styles.buttonText}
          onClick={() => {navigation.navigate('VideoPlayer', {link: makeMediaUrl(fetched.video[0].filename, secured=true)})}}
        />

        :null:
        null}
*/}

        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeading}>Step by step instructions:</Text>
        </View>

        <View style={styles.instructionsContainer}>

          {/* {false? */}

        {!loading?


          (fetched?
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
          </ScrollView>
          :<MessageBox1 setReload={() => {setReloadSwitch(!reloadSwitch)}} message={'Pleae check your internet..'}/>)
          
          :
          <View style={{flex:1,justifyContent:'center', marginBottom: 30*sc}}><Spinner1 /></View>
          
          
          }
        
        
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
    alignSelf:'center',
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
    // paddingVertical: 5 * sc,
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
    alignSelf: "center",
    ...Platform.select({
      android: {
        height: 45 * sc,
      },
    }),
  },

  buttonText: {
    fontSize: 13,
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
