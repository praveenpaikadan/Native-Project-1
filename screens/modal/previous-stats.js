import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useRef} from 'react';
import { View, Text, FlatList, Modal,TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Switch} from "react-native";
import { Spinner1 } from '../../components/loading-spinner';
import { themeColors, sc, globalFonts } from '../../styles/global-styles';
import { FontAwesome5 } from "@expo/vector-icons";
import { ExerciseStatItemCard } from '../../components/exercise-stat-item-card';
import { MONTHS } from '../../utilities/constants';
import { convertdd_mm_yyyyStringToTime } from '../../utilities/helpers';
import { getCompleteWorkoutHistory } from '../../utilities/data-center';


export default PreviousStatsModel = ({visible, exercise, setVisible}) => {

    const styles = StyleSheet.create({
        overlay: {
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        },
      
        modalContainer: {
          width: "90%",
          backgroundColor: themeColors.secondary2,
          padding: 20 * sc,
          borderRadius: 20*sc,
          height: '80 %',
          paddingVertical: 30*sc
        },
      
        headingContainer: {
          justifyContent: "center",
          alignItems: "center",
          height: 30 * sc,
          marginBottom: 10*sc
        },
      
        heading: {
          fontFamily: globalFonts.primaryBold,
          color: themeColors.tertiary1,
          marginTop: 10 * sc,
          marginBottom: 5*sc,
          // letterSpacing: 0.5 * sc,
          fontSize: 18 * sc,
          lineHeight: 23 * sc,
          paddingHorizontal: 5*sc,
        },
      
        line: {
          width: "100%",
          height: 5 * sc,
          backgroundColor: themeColors.primary2,
          marginBottom: 15 * sc,
        },

        content:{
            fontFamily: globalFonts.primaryRegular,
            opacity: 0.7,
            paddingVertical: 5*sc
        },

        time:{
            fontFamily: globalFonts.primaryLight,
            opacity: 0.5,
            fontSize: 12
        },
      
        row: {
          flexDirection: "row",
          justifyContent: "center",
        },
      
        button: {
          marginHorizontal: 70 * sc,
          marginVertical: 10 * sc,
        },
      
        buttonText: {
          fontSize: 15 * sc,
        },
        button1: {
          marginHorizontal: 2 * sc,
          marginVertical: 10 * sc,
        },
      
        buttonText1: {
          fontSize: 12 * sc,
        },
      });

    const [loading, setLoading] = useState(true)
    const [subLoading, setSubLoading] = useState(false)
    const [error, setError] = useState(null)
    const [dataList, setDataList] = useState(null) // [{date, day, programName, reps, repetitionType}]
    const [focus, setFocus] = useState(-1)
    const componentRef = useRef(null)
    const [switchOn, setSwitchOn] = useState(false)
    const [statsFromPreviousPrograms, setStatsFromPreviousPrograms] = useState(null)
    const [currentStats, setCurrentStats] = useState(null)

    const setSubLoadingError = () => {
        setError('Failed to fetch stats from previous programs')
        setTimeout(() => {
            setError(null)
        }, 6000)
    }

    const makeDataListFromWorkoutData = (response, sort=true) => {
        var returnArray = []
        if(response){
            // var history = JSON.parse(response)['history']
            var history = response['history']
            if(history){
                for(let dayIndex=0; dayIndex<history.length; dayIndex++){
                    let workout = history[dayIndex].workout
                    let dateCompleted = history[dayIndex].dateCompleted
                    let day = history[dayIndex].day
                    for(let exerciseIndex = 0; exerciseIndex<workout.length; exerciseIndex ++){
                        if(workout[exerciseIndex].exercisID === exercise.exercisID){
                            returnArray.push({
                                id: workout[exerciseIndex]._id,
                                day: day, 
                                dateCompleted: dateCompleted, 
                                programName: response.program? response.program.programName:'Unknown Program' ,
                                reps: workout[exerciseIndex].reps,  
                                repetitionType: workout[exerciseIndex].repetitionType
                            })
                        }
                    }
                }
            }
        }

        // console.log(returnArray)
        if(sort && returnArray.length>1){
            returnArray = returnArray.sort(function(a,b){return convertdd_mm_yyyyStringToTime(b['dateCompleted']) - convertdd_mm_yyyyStringToTime(a['dateCompleted'])});
        }
        // console.log(returnArray) 
        return returnArray
    }
    
    
    const toggleSwitch = (value) => {
        setSwitchOn(value)
        const addPreviousToList = (localHistory) => {
            
            var newEntries = []
            for(let i=0; i<localHistory.length; i++){
                if(exercise.workoutID !== localHistory[i]._id){
                    console.log(localHistory[i]._id)
                    newEntries = newEntries.concat(makeDataListFromWorkoutData(localHistory[i], false))
                }
            }

            newEntries = newEntries.sort(function(a,b){return convertdd_mm_yyyyStringToTime(b['dateCompleted']) - convertdd_mm_yyyyStringToTime(a['dateCompleted'])});
            setStatsFromPreviousPrograms(newEntries)
            if(componentRef){
                var existing = [...dataList]
                var newData = existing.concat(newEntries)
                setDataList(newData)
                return newData
            }
        }

        if(value === true && !statsFromPreviousPrograms){
            setSubLoading(true)
            const setWdHistory = async () => {
                var localHistory = await AsyncStorage.getItem('completeWorkoutsHistory')
                if(localHistory){
                    localHistory = JSON.parse(localHistory)
                    addPreviousToList(localHistory)
                    setSubLoading(false)
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
                        AsyncStorage.setItem('completeWorkoutsHistory', JSON.stringify(response.data))
                        if(response.data){
                            localHistory = response.data
                            addPreviousToList(localHistory)
                            setSubLoading(false)
                            return localHistory
                        }else{
                          return null
                        }
                      }else{
                          return 
                      }

                      break;
                    default:
                      if(!localHistory){
        
                      }
                      break; 
                    }
                    if(!statsFromPreviousPrograms){
                        setSubLoadingError()
                    }
                    setSubLoading(false)
                })
              })

        }else if(value === true && statsFromPreviousPrograms){
            setDataList(currentStats.concat(statsFromPreviousPrograms))
        }else if(value === false){
            setDataList(currentStats)
        }
    }

    useEffect(() => {

        AsyncStorage.getItem('workoutData')
        .then(response => {
            var stats = makeDataListFromWorkoutData(JSON.parse(response))
            setDataList(stats)
            setCurrentStats(stats)
            setLoading(false)
        })
        .catch(error => {
            setError('Oops!! not able to find any data')
            setCurrentStats([])
            setLoading(false)
        })
        return () => {
            
        }
    }, [])
      
    return(
        <Modal ref={componentRef} transparent={true} visible={visible} animationType="fade">
            <View style={styles.overlay}>
            <View style={styles.modalContainer}>
                <View style={{position: 'absolute', right: 20*sc, top: 20*sc}}>
                    <TouchableOpacity style={{width: 30*sc, height: 30*sc, alignItems:'center', justifyContent: 'center'}} onPress={() => setVisible(false)}>
                        <FontAwesome5
                            name="window-close"
                            size={17*sc}
                            color={themeColors.primary1}
                        />    
                    </TouchableOpacity>
                </View>

                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>{exercise.exerciseName}</Text>
                    <Text style={styles.time}>Previous Stats</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'center', alignSelf:'center'}}>
                    <Switch
                        trackColor={{ false: themeColors.tertiary2, true: themeColors.tertiary2 }}
                        thumbColor={switchOn ? themeColors.primary1 : themeColors.primary2}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={switchOn}
                        disabled={loading}
                    />
                    <Text style={{fontSize: 12*sc, fontFamily: globalFonts.primaryLight}}>Gets stats from previous programs too</Text>
                </View>

                <View style={styles.line}></View>
                
            
                {loading?<Spinner1 />:
                    
                <FlatList
                    style={{paddingHorizontal: 5*sc}}
                    showsVerticalScrollIndicator={true}
                    data={dataList}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item, index}) => {
                    var dA = item['dateCompleted'].split('-') 
                    return(
                        <View>
                            <TouchableWithoutFeedback onPress={() => {console.log(index);setFocus(focus === index?-1:index)}}> 
                            <ExerciseStatItemCard
                                day={item.day}
                                date={dA[0]}
                                month={MONTHS[Number(dA[1]) - 1]}
                                year={dA[2]}
                                focus={focus===index}
                                data={item}
                            />
                        
                            </TouchableWithoutFeedback>
                        </View>
                    )}}
                /> }

                {subLoading?<Spinner1 />:null}
                {error?<Text style={{...styles.time, alignSelf:'center'}}>{error}</Text>:null}
            </View>
        </View>
    </Modal>
    )
}
