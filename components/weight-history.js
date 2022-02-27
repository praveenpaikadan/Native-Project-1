import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { sc, globalFonts, themeColors} from '../styles/global-styles';
import { Dimensions } from 'react-native';
import {
    LineChart,
    ProgressChart
  } from "react-native-chart-kit";
import { MONTHS_LOWER } from '../utilities/constants';
import {ButtonType1} from '../components/buttons'
import { WorkoutContext } from './workout-context';


// params = message, setReload, reloadbutton 
export const WeightHistory = ({navigation, style, data}) => {

    const {dayWorkout} = useContext(WorkoutContext)

    // support function for generate weight data
    // returns an array of interpolated values between start item and end item, with end value and not start value
    

    const generateWeightData = (inpData) => {

        const returnLinearlyInterpolated = (startObj, endObj) => {
            // inputObject of form {date: ..., value: ... }
            var startDate = new Date(startObj.date).getTime()
            var startValue = startObj.weight
            var endDate = new Date(endObj.date).getTime()
            var endValue = endObj.weight
    
            var outputWithEnd = []
            var steps = ((endDate - startDate)/86400000)
    
            var increment = (endValue - startValue)/steps
            for(let i = 1;i <= steps; i++){
                outputWithEnd.push(Number((startValue + (increment*i)).toFixed(1))) 
            }
            return outputWithEnd
        }
        
        var filtered = []

        // collecting the last value updated ina day and removing erratic data forming a sanitised array of objects
        for(let i = 0; i< inpData.length; i++){
            var date = new Date(inpData[i].date).toLocaleDateString()
            var nextDate = i+1 < inpData.length? new Date(inpData[i+1].date).toLocaleDateString(): null;
            if((date !== nextDate) && inpData[i].weight <250 && inpData[i].weight > 30){  // filtering only the last weight updated in a day and removing erratic updates.
                var a = inpData[i]
                a.date = a.date.substring(0, 10)  // to remove hours and minute part from data
                // console.log('***********************************', a)
                filtered.push(a)
            }
        }

        var today = new Date().toISOString().substring(0, 10)
        
        //  adding todays date if its not the last date
        if(filtered[filtered.length -1].date !== today){
            let lastEntry = {date: today, weight: filtered[filtered.length -1].weight}
            filtered.push(lastEntry)
        }

        // console.log('Filtered Is', filtered)
        let finalData = {
            data: [filtered[0].weight], 
            startDate: filtered[0].date, 
            endDate:filtered[filtered.length-1].date
        }

        // console.log(filtered)
        
        for(let i=0; i < filtered.length-1; i++){
            // console.log(filtered[i], filtered[i+1] )
            var linearlyInterpolatedValues = returnLinearlyInterpolated(filtered[i], filtered[i+1]) 
            // console.log(linearlyInterpolatedValues)
            finalData.data.push(...linearlyInterpolatedValues)
        }

        return finalData
    } 

    var modifiedData = generateWeightData(data)  // will be of form {data: [], startDate: Date, endDate: Date}
    // console.log(modifiedData)
    var labels = modifiedData.data.map(() => "")
    labels[0] = new Date(modifiedData.startDate).getDate() +' '+ MONTHS_LOWER[new Date(modifiedData.startDate).getMonth()]
    labels[labels.length - 1] = new Date(modifiedData.endDate).getDate() +' '+ MONTHS_LOWER[new Date(modifiedData.startDate).getMonth()]


    // calculating total exercise done => Any exercise with atleast oe set done is considered done
    const [doneExCount, setDoneExCount] = useState(0)
    useEffect(() => {
        var _doneExCount = 0
        for(let i =0; i < dayWorkout.workout.length; i++ ){
            for(let j = 0; j <  dayWorkout.workout[i].reps.length ; j++){
                if(String(dayWorkout.workout[i].reps[j])[0] !== "0"){
                    _doneExCount = _doneExCount + 1;
                    break; 
                }
            }
        } 
        setDoneExCount(_doneExCount)
    }, [dayWorkout])
    

    // console.log(modifiedData)
    // console.log(data)
    return(

        <View style={{...styles.wrapper, ...style}}>
            <View style={{...styles.halfSide, justifyContent: 'center', alignItems: 'center', zIndex: 1, marginBottom: -10}}>
                <Text style={{...styles.workoutStatusLabel}}>Your weight profile</Text>
                <Text style={{...styles.weightMessage, opacity: data[1]?0:1}}>Updating your weight regularly will help your trainer to craft your workout and diet plan precisely</Text>
                <LineChart
                    withScrollableDot = {
                        true
                    }
                    
                    data={{
                    // labels: data.map((item, index) => {return (index === 0 || index === data.length -1) ? new Date(item.date).getDate() +' '+ MONTHS_LOWER[new Date(item.date).getMonth()]:""}),
                    labels: labels,
                    datasets: [
                        {
                        // data: data.map(item => item.weight)
                        data: modifiedData.data[0] && modifiedData.data[1]?modifiedData.data: [...modifiedData.data, ...modifiedData.data]
                        }
                    ]
                    }}
                    width={200} // from react-nativer
                    height={90}
                    // yAxisLabel=""
                    yAxisSuffix=" kg"
                    yAxisInterval={1} // optional, defaults to 1
                    horizontalLabelRotation={true}
                    chartConfig={{
                        backgroundColor: themeColors.secondary1,
                        backgroundGradientFrom: themeColors.tertiary2,
                        backgroundGradientTo: themeColors.tertiary2,
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => themeColors.primary1,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
    
                        propsForBackgroundLines: {
                            strokeWidth: 0
                        },

                        propsForDots: {
                            r: "0",
                            strokeWidth: "0",
                            stroke: "#ffa726"
                        },

                        propsForLabels: {
                            color: themeColors.secondary2, 
                            fontSize: 9*sc,
                            marginVertical: 0,
                            paddingTop: 0,
                            zIndex: 100,
                        },

                        propsForHorizontalLabels: {
                            x: 50
                        },

                        propsForVerticalLabels:{
                            y: 100,
                            // x: 1
                        },

                        linejoinType: 'round',
                        scrollableDotFill: themeColors.primary1,
                        scrollableDotRadius: 6,
 
                        scrollableDotStrokeColor: themeColors.primary2,
                        scrollableDotStrokeWidth: 2,

                        scrollableInfoViewStyle: {
                            justifyContent: 'center',
                            alignContent: 'center',
                            // backgroundColor: themeColors.primary1,
                            backgroundColor: 'transparent',
                            borderRadius: 2,
                            marginTop: 10,
                            marginLeft: 0,
                        },
                        
                        scrollableInfoTextStyle: {
                            fontSize: 10*sc,
                            fontFamily: globalFonts.primaryMedium,
                            color: themeColors.primary1,
                            marginHorizontal: 2,
                            flex: 1,
                            textAlign: 'center',
                            textShadowColor: 'white',
                        },

                        // scrollable tooltip
                        scrollableInfoTextDecorator: (value) => {return String(value?value + ' kg':'')},

                        scrollableInfoSize: {
                            width: 50*sc,
                            height: 15*sc,
                        },
                        
                        scrollableInfoOffset: 15,
                        // labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        // color: (opacity = 1) => `rgb(78, 135, 210, ${opacity})`,
                        // propsForBackgroundLines: {
                        //   strokeDasharray: '', // solid background lines with no dashes
                        //   strokeDashoffset: 15,
                        // },
                    }}

                    // withVerticalLabels={false}
                    withHorizontalLabels={false}
                    // withInnerLines={false}
                    // withOuterLines={false}
                    // withVerticalLines={false}
                    // withHorizontalLines={false}

                    // bezier
                    style={{
                        opacity: 0.8, 
                        // transform: [{translateX: -25}],
                        marginTop: 0,
                        marginRight: -6,
                        marginLeft: -50,
                        paddingBottom: 10         
                    }}
                    


                />
            </View>

            <View style={{...styles.halfSide, flexDirection: 'column', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{alignItems:'center'}}>
                        <ProgressChart
                            data={{labels: [], data: [doneExCount/dayWorkout.workout.length]}}
                            width={75}
                            height={60}
                            strokeWidth={8}
                            radius={23}
                            hideLegend={true}
                            chartConfig={{
                                
                                backgroundColor: themeColors.secondary1,
                                backgroundGradientFrom: themeColors.tertiary2,
                                backgroundGradientTo: themeColors.tertiary2,
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 76, 0 , ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                
                                style: {
                                borderRadius: 16
                                },
                                propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                                }
                            }}
                        />
                        <View style={styles.workoutStatusInsideLabelContainer} >
                            <Text style={styles.workoutStatusInsideLabel}>{`${doneExCount}/${dayWorkout.workout.length}\nexercises`}</Text>
                        </View>
                        <Text style={styles.workoutStatusLabel}>{`Today's \nWorkout Status`}</Text>
                    </View>
                    
                    <View style={{alignItems:'center'}}>
                        <ProgressChart
                            data={{labels: [], data: [dayWorkout.day/dayWorkout.totalProgramDays]}}
                            width={75}
                            height={60}
                            strokeWidth={8}
                            radius={23}
                            hideLegend={true}
                            chartConfig={{
                                
                                backgroundColor: themeColors.secondary1,
                                backgroundGradientFrom: themeColors.tertiary2,
                                backgroundGradientTo: themeColors.tertiary2,
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 76, 0 , ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                                }
                            }}
                        />
                        <View style={styles.workoutStatusInsideLabelContainer} >
                            <Text style={styles.workoutStatusInsideLabel}>{`${dayWorkout.day}/${dayWorkout.totalProgramDays}\ndays`}</Text>
                        </View>
                        <Text style={styles.workoutStatusLabel}>{`Overall \nProgram Status`}</Text>
                    </View>
                </View>

                <ButtonType1
                    text={'Update Weight '}
                    arrow={false}
                    styling={styles.updateWeightButton}
                    textStyling={styles.buttonTextStyling}
                    onClick={() => {navigation.navigate('EditProfile')}}
                />
                
            </View>
            
        </View>
    
        )
} 

const styles = StyleSheet.create({
    wrapper:{
        // backgroundColor: 'pink',
        display: 'flex',
        justifyContent:'space-evenly',
        alignItems:'center',
        // fontSize:30*sc,
        // maxWidth:360,
         width: '100%',
        // height:'70%',
        alignSelf:'center',
        flexDirection: 'row',
        marginTop: 10*sc,
        marginBottom: 2*sc,

    },

    halfSide: {
        width: '45%',
    },

    weightMessage: {
        position: 'absolute',
        fontFamily: globalFonts.primaryRegular,
        fontSize: 10*sc,
        width: '80%',
        textAlign: 'center',
        alignSelf: 'center',
        top: 22,
    },  

    text:{
        textAlign:'center',
        fontSize:15*sc,
        opacity:0.6,
        fontFamily: globalFonts.primaryLight,
        marginVertical:10*sc,
    },

    reload:{
        opacity: 0.6,
        paddingTop: 10*sc
    },

    workoutStatusLabel: {
        textAlign: 'center',
        fontFamily: globalFonts.primaryLight,
        fontSize: 10*sc
    },

    updateWeightButton:{
        width: 60*sc,
        height: 25*sc,
        marginTop:10*sc,
        backgroundColor: themeColors.tertiary2,
        borderColor: themeColors.primary1,
        borderWidth: 1,
        alignSelf: 'center',
        // opacity: 0.8, 

    },

    buttonTextStyling:{
        fontSize: 10*sc,
        color: themeColors.primary1,
        fontFamily: globalFonts.primaryRegular,
    },

    workoutStatusInsideLabelContainer:{
        position: 'absolute',
        // backgroundColor:'yellow',
        width: '100%',
        // margin: 'auto',
        top: 19*sc,
    },

    workoutStatusInsideLabel:{
        textAlign: 'center',
        fontFamily: globalFonts.primaryLight,
        fontSize: 8*sc,
        opacity: 0.5
    }

})