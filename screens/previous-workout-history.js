import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator,RefreshControl, FlatList, ImageBackground } from "react-native";
import { Header } from "../components/header";
import { globalFonts, sc, themeColors } from "../styles/global-styles";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Linking from 'expo-linking';
import { getCompleteWorkoutHistory } from "../utilities/data-center";
import { calculateCalories, convertMongooseDateString, getImageUrl } from "../utilities/helpers";
import { MessageBox1 } from "../components/message-box";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ElevatedCardTypeOne } from "../components/cards";
import { BASE_URL } from "../utilities/api";
import { AuthContext } from "../components/auth-context";

const ProgramCard = ({ id, heading, shortInfo, level, period, bgImage, startDate }) => {

    var {credentials} = React.useContext(AuthContext)
    var currWID = credentials.currentWorkout.workoutID
    var source = bgImage?{uri: bgImage, headers: {'X-Access-Token' : "authToken"}}:require('../assets/images/dead-lift.jpg')
    return (
      <ElevatedCardTypeOne styling={cardStyles.card}>
        <ImageBackground style={cardStyles.cardImage} source={source}>
          <View style={cardStyles.cardOverlay}>
            <Text style={cardStyles.subText}>{startDate?'Started on '+ convertMongooseDateString(startDate): null}</Text>
            <Text style={cardStyles.mainText}>{heading}</Text>
            <View style={cardStyles.detailsContainer}>
              <View style={cardStyles.detailsItemContainer}>
                <FontAwesome5 name="fire" {...cardIconStyling} />
                <Text style={cardStyles.subText}>{shortInfo}</Text>
              </View>
              <View style={cardStyles.detailsItemContainer}>
                <FontAwesome5 name="layer-group" {...cardIconStyling} />
                <Text style={cardStyles.subText}>{level}</Text>
              </View>
              <View style={cardStyles.detailsItemContainer}>
                <FontAwesome5 name="calendar" {...cardIconStyling} />
                <Text style={cardStyles.subText}>{period}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        {currWID === id?
            <View style={{position:'absolute', right:0, top: 0, backgroundColor: themeColors.primary1, padding: 5*sc, flexDirection:'row', alignItems:'center'}}>
                <FontAwesome5 name="star" size = {12*sc} color={'white'} />
                <Text style={{...cardStyles.subText, marginLeft: 5*sc}}>Active Workout</Text>

            </View>
        :null}
      </ElevatedCardTypeOne>
    );
  };
 

export default PreviousWorkoutHistory = ({navigation}) => {

    const [loading, setLoading] = React.useState(0)
    const [data, setData] = React.useState([])
    const [reloadSwich, setReloadSwitch] = React.useState(true)

    const mergeData = (data) => {
        var mergedHistory = []
        for(let i = 0; i<data.length; i++){
            for(let j = 0; j< data[i]['history'].length; j++ ){
                mergedHistory.push(data[i]['history'][j])
            }
        }
        return mergedHistory
    }

    const setReload = () => {
        setLoading(0)
        setReloadSwitch(!reloadSwich)
      }

    React.useEffect(() => {
  
      const setWdHistory = async () => {
        var localHistory = await AsyncStorage.getItem('completeWorkoutsHistory')
        if(localHistory){
          localHistory = JSON.parse(localHistory)
          setData(localHistory)
          setLoading(1)
          return localHistory
        }else{
          return null
        }
      } 
  
      setWdHistory()
      .then((localHistory) => {
        getCompleteWorkoutHistory()
        .then((response) => {
          switch (response.status) {
            case 200:
              if(JSON.stringify(response.data) !== JSON.stringify(localHistory)){
                setData(response.data)
                AsyncStorage.setItem('completeWorkoutsHistory', JSON.stringify(response.data))
                setLoading(1)
              }
              break;
            default:
              if(!localHistory){
                setLoading(-1)
              }
              break; 
            }
        })
      })
      
    }, [reloadSwich])

    var total = 0
  
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} />
        <Header backButton={true} onPress={() => {navigation.goBack()}} onPressMenu={() => navigation.openDrawer()} />
        <View style={styles.headingContainer}>

            <View style={styles.headingLeftBox}>
                <View style={{marginLeft: 10*sc}}>

                    <Text style={styles.headingText}>COMPLETE WORKOUT HISTORY</Text>
                    <Text style={styles.totalWorkouts}>TOTAL PROGRAMS TRACKED: {data.length}  </Text>
                    <Text style={styles.totalWorkouts}>TOTAL DAYS TRACKED: {mergeData(data).length}  </Text>
                    <Text style={styles.totalWorkouts}>TOTAL WORKOUTS TRACKED: {calculateCalories(mergeData(data), [])['workoutsTracked']}  </Text>
                </View>
            </View>

            <TouchableOpacity>
            </TouchableOpacity>

        </View>
        
        
        {loading === 1?

        <View style={styles.contentContainer}>

          {/* <View style={styles.topContainer}>
              
          </View> */}
  
          <View style={styles.bottomContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={<RefreshControl onRefresh={() => setReload(!reloadSwich)} />}
            renderItem={({item}) =>{ 
                console.log()
                if(item.program){
                    return (
                        <TouchableOpacity onPress={() => {navigation.navigate('WorkoutHistory', {data: item})}}>
                        <ProgramCard
                            id={item._id}
                            bgImage={item.program.images[0]?`${BASE_URL}/media/${item.program.images[0].filename}`:null}
                            heading={item.program.programName}
                            shortInfo={item.program.programName}
                            level={item.program.level}
                            period={`${item.program.daysPerWeek} days X ${item.program.durationWeeks} weeks`}
                            startDate = {item.startDate}
                        />
                    </TouchableOpacity>
                  )
                }else{
                    return (
                        <TouchableOpacity onPress={() => {navigation.navigate('WorkoutHistory', {data: item})}}>
                        <ProgramCard
                            id={item._id}
                            bgImage={null}
                            heading={'ID: '+item.programID + '(deleted)'}
                            shortInfo={'N/A'}
                            level={'N/A'}
                            period={`N/A`}
                            startDate = {item.startDate}
                        />
                    </TouchableOpacity>
                  )
                }
                }}
        />
          </View>  

          {/* <View style={styles.footerContainer}>
            
          </View>    */}
        </View>:

        (loading === 0?
        <View style={{flex:1, justifyContent: 'center', marginBottom: 100*sc}}>
          <ActivityIndicator style={{alignSelf: 'center', }}size={70} color={themeColors.primary1}/>
        </View>: 
         <View style={{flex:1, justifyContent: 'center', marginBottom: 100*sc}}>
          <MessageBox1
            setReload={() => {setLoading(0), setReloadSwitch(!reloadSwich)}} 
            message = 'Something Happened. Please check your internet'
          />
        </View>
        )
        }
      </View>
    );
  };


  const menuIconStyling = {
    color: themeColors.secondary2,
    size: 22 * sc,
  };
  
  const chevronIconStyling = {
    color: themeColors.primary1,
    size: 30 * sc,
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      backgroundColor: themeColors.tertiary2,
    },
    contentContainer: {
      flex: 1,
      width: "100%",
      backgroundColor: themeColors.tertiary2,
    },
  
    avatar:{
      width: 100 * sc,
      height: 100 * sc,
      borderRadius: 75 * sc,
      borderWidth: 3 * sc,
      borderColor: themeColors.primary2,
      overflow: 'hidden',
      marginRight: 10*sc
    },
  
    image: {
      alignSelf:'center',
      width: 100*sc,
      height: 100*sc
    },
  
    topContainer: {
      width: '100%',
      height: 120*sc,
      marginBottom: 10*sc,
      flexDirection: 'row',
      alignItems:'center',
      padding: 10*sc
    },
  
    bottomContainer: {
    marginVertical: 5*sc,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    },
  
    footerContainer: {
      width: '100%',
      padding: 20*sc
    },
  
    topRight:{
      justifyContent: 'center',
      flex:1,
      height: '100%'
    },  
  
    text1: {
      fontFamily: globalFonts.primaryMedium,
      fontSize: 25*sc,
      letterSpacing: 2*sc,
    },
  
    text2:{
      fontFamily: globalFonts.primaryLight,
       color: themeColors.primary1,
    },

    headingContainer: {
        backgroundColor: themeColors.tertiary1,
        flexDirection: 'row',
        width: "100%",
        paddingVertical: 10 * sc,
        justifyContent: "space-between",
        alignItems: "center",
    
      },
    
      headingRightBox:{
        marginRight: 10*sc
      },
    
      headingLeftBox:{
        marginLeft:10*sc,
        flexDirection:'row'
      },
    
      headingLeftIcon: {
        justifyContent:'center'
      },
    
      headingText: {
        fontFamily: globalFonts.primaryBold,
        color: themeColors.secondary2,
        fontSize: 16 * sc,
        letterSpacing: 1.2 * sc,
      },
    
      totalWorkouts: {
        fontFamily: globalFonts.primaryRegular,
        color: themeColors.secondary2,
        fontSize: 8 * sc,
        marginTop: 5 * sc,
        letterSpacing: 0.5 * sc,
      },
    
      listContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        marginTop: 10 * sc,
      },
    })

 // From program-list page

 const cardIconStyling = {
    size: 15 * sc,
    color: themeColors.primary1,
    style: { paddingRight: 3 * sc },
  };

  const cardStyles = StyleSheet.create({
    card: {
      width: 340 * sc,
      height: 130 * sc,
      marginVertical: 5 * sc,
    },
  
    cardImage: {
      width: "100%",
      height: "100%",
    },
  
    cardOverlay: {
      // backgroundColor: "rgba(0,0,0, 0.3)",
      width: "100%",
      height: "100%",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingHorizontal: 15 * sc,
    },
  
    mainText: {
      fontFamily: globalFonts.primaryMedium,
      fontSize: 25 * sc,
      marginTop: 5*sc,
      color: themeColors.secondary2,
      marginBottom: 10 * sc,
    //   ...globalShadows.orangeTextShadow1,
    },
  
    detailsContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignContent: "center",
      flexWrap: "wrap",
    },
  
    detailsItemContainer: {
      flexDirection: "row",
      marginHorizontal: 5 * sc,
      alignItems: "center",
      marginVertical: 3 * sc,
    },
  
    subText: {
      fontSize: 12*sc,
      fontFamily: globalFonts.primaryRegular,
      color: themeColors.secondary2,
    //   ...globalShadows.orangeTextShadow1,
    },
  });
  