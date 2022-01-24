import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
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
import { ImageGallery1 } from "../components/image-gallery";


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

  const [activeTab, setActiveTab] = React.useState(null)


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
    let componentExists = true
    var loadItems = () => {
      getExerciseFromLocal(exercise)
      .then((localEx) => {
        if(componentExists){
          setFetched(localEx)
          setLoading(localEx?false:true)
          if(localEx && localEx.videoEmbedString){
            setActiveTab('video')
          }else if(localEx && localEx.explainatoryImages){
            setActiveTab('images')
          }
        }
        getExerciseDatafromServer(exercise)
        .then((response) => {
          if(response){
            if(componentExists){
              setFetched(response.data)
              setLoading(false)
              saveToLocalExerciseStore(response.data)
              if(response.data && response.data.videoEmbedString){
                setActiveTab('video')
              }else if(response.data && response.data.explainatoryImages){
                setActiveTab('images')
              }
            }
          }else{
            if(localEx){
              if(componentExists){
                flashMessage('Showing cached exercise instructions. Please check internet..','info', 300)  
              }
            }
            if(componentExists){
              setLoading(false)
            }
          }
      }
    ) 
  })
  } 
  loadItems()
  return () => {componentExists = false}
    
  }, [reloadSwitch])

  if(loading){
    return( 
    <View style={styles.container}>
      <StatusBar translucent={true} hidden={fullScreen?true:false}/>
      <Header
        backButton={true}
        onPress={() => navigation.pop()}
        onPressMenu={() => navigation.openDrawer()}
      />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Spinner1 />
      </View>
    </View>)
  }

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

        {/* if day video exists ============ */}
      {fetched &&  fetched.videoEmbedString && fetched.explainatoryImages&& !fullScreen?
      <View style={styles.topTabsContainer}>
        <TouchableOpacity 
        onPress={() => {setActiveTab('video')}}
        style={{...styles.tabWrapper, borderRightColor: themeColors.primary1, borderRightWidth: 0.25}}>
          <Text style={{...styles.tabText, color: activeTab === 'video'?themeColors.primary1:themeColors.tertiary1}}>
            Video Instructions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => {setActiveTab('images')}}
        style={{...styles.tabWrapper, borderLeftColor: themeColors.primary1, borderLeftWidth: 0.25}}>
        <Text style={{...styles.tabText,color: activeTab === 'images'?themeColors.primary1:themeColors.tertiary1}}>
            Images
          </Text>
        </TouchableOpacity>
      </View>
      :null}

      {/* ======== if day video exists */}

        <View style={styles.headingContainer}>
          <View style={styles.cardContainer}>
            
          {/* {!loading?
            fetched.video[0]?
            <View style={{alignItems:'center', backgroundColor: 'yellow'}} >
              <VideoPlayer navigation={navigation} route={{params: {link: makeMediaUrl(fetched.video[0].filename, true), notFullScreen: true, width: 360*sc}}}/>
            </View>
            :null:
          null}   */}
          
  
          {fetched &&  activeTab==='video'?
            <VimeoWebPage embedString={fetched.videoEmbedString} fullScreen={fullScreen} setFullScreen={setFullScreen}/>
            :
            ( fetched && activeTab === 'images'?
            <ImageGallery1
              urlArray={fetched.explainatoryImages.split(',')}
              // width={'auto'}
              height={150*sc}
            />: 
            null)
          } 

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
          :<MessageBox1 setReload={() => {setReloadSwitch(!reloadSwitch)}} message={'Please check your internet..'}/>)
          
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

  topTabsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  tabWrapper:{
    flex: 1,
    backgroundColor: themeColors.tertiary2,
  },

  tabText:{
    padding: 5*sc,
    textAlign: 'center',
    fontFamily: globalFonts.primaryLight,
    color: themeColors.secondary1,
    fontSize: 12*sc,
    
  },

  cardContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: themeColors.tertiary2,
    // paddingVertical: 5 * sc,
    // borderRadius: 10 * sc,
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
