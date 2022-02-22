import * as React from 'react';
import { View, Text, StyleSheet, Image, FlatList, } from 'react-native';
import { globalFonts, sc, themeColors, globalShadows, globalStyles } from '../../styles/global-styles';
import { ElevatedCardTypeOne } from '../../components/cards'
import { Ionicons } from '@expo/vector-icons'; 
import { WorkoutContext } from '../../components/workout-context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { calculateCalories, format_target } from '../../utilities/helpers';
import {WorkoutCard} from '../../components/workout-card'
import { AuthContext } from '../../components/auth-context';
import { ButtonType1 } from '../../components/buttons';

export const HistoryList = (props) => {
    

    // Case - will receive data in props if an old worlout details have to be displayed.
    // ...This call wil be initiated  from the complete-workout-history page.

    var {workoutData} = React.useContext(WorkoutContext)
    const {credentials} = React.useContext(AuthContext)
    const List = workoutData?[...workoutData.history]:[]
    var currTotal = 0
    for(var i=0; i<List.length; i++){
        currTotal = currTotal + List[i].workout.length
    }
    const workoutTrackedInCurrent = React.useRef(currTotal)
    const listOfDays = List.map((item, index) => item.day)
    
    // Adding equivalent calories to Already done days <= commenting this out as the feature is temporarily disabled
    for(let i=0; i<List.length; i++){
        var stats = calculateCalories([List[i]], workoutData.calsPerRepList)  // calculateCalories will take array of history and reference list for calcualting calories.
        List[i]['calsBurned'] = stats['caloriesBurned']
        List[i]['workoutsTracked'] = stats['workoutsTracked']
    }

    // adding coming up workout list - making a similar object as that of historyc object to make minimum modification in history card component
    var first = true // to find currently active one
    workoutData.program.schedule.forEach((dayData, index) => {
        if(index+1 > workoutData.program.durationWeeks * workoutData.program.daysPerWeek){
            return 
        }
        if(!listOfDays.includes(dayData.day)){
            var dayObj = {}
            dayObj.day = dayData.day
            dayObj.dateCompleted = "01-01-1990"
            dayObj._id = dayData._id
            dayObj.workout = dayData.exercises.map((item, index) => {return {...item, reps: item.target, exerciseNumber: index+1}})
            dayObj.future = true
            dayObj.active = first 
            var stats = calculateCalories([dayObj], workoutData.calsPerRepList)  // calculateCalories will take array of history and reference list for calcualting calories.
            dayObj['calsBurned'] = stats['caloriesBurned']
            dayObj['workoutsTracked'] = stats['workoutsTracked']
            List.push(dayObj)
            first = false
        }
    });

    // Adding cals and total workouts to items to be done.



    // adding empty objects that are not yet assigned for coming days
    var totalDays = workoutData.program.durationWeeks * workoutData.program.daysPerWeek
    var unlockedDays = credentials.currentWorkout.unlockedDays

    for(let i = List.length; i < totalDays; i++){
        let currDay = i+1
        var dayObj = {}
        dayObj.day = currDay
        dayObj.empty = true
        dayObj.dateCompleted = "01-01-1990"
        dayObj.workout = []
        dayObj.future = true
        dayObj.active = false
        if(currDay>unlockedDays){
            dayObj.locked = true
            dayObj.planType = credentials.currentWorkout.planType
        }
        List.push(dayObj)
    }

    // adding targetBodyPart to the List items from program
    for(let i = 0; i < List.length; i++){
        var scheduleItem = workoutData.program.schedule.find((item) => item.day === List[i]['day'])
        if(scheduleItem!== undefined){
            List[i]['targetBodyPart'] = scheduleItem.targetBodyPart
        }
    }

    // If there is default value passed on for previous workouts
    var defaultData = undefined
    if(props.data){
        defaultData = props.data.history
        for(let i = 0; i < defaultData.length; i++){
            var scheduleItem = props.data.program.schedule.find((item) => item.day === defaultData[i]['day'])
            if(scheduleItem!== undefined){
                defaultData[i]['targetBodyPart'] = scheduleItem.targetBodyPart
            }
        }
        for(let i=0; i<defaultData.length; i++){
            var stats = calculateCalories([defaultData[i]], props.data.calsPerRepList)  // calculateCalories will take array of history and reference list for calcualting calories.
            defaultData[i]['calsBurned'] = stats['caloriesBurned']
            defaultData[i]['workoutsTracked'] = stats['workoutsTracked']
        }
    }

    const MONTHS =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    React.useEffect(() => {
        var total = 0
        if(props.data){
            for(var i=0; i<props.data.history.length; i++){
                total = total + props.data.history[i].workout.length
            }
        }else{
            // for(var i=0; i<List.length; i++){
            //     total = total + List[i].workout.length
            // }
            total = workoutTrackedInCurrent.current
        }
        props.setTotal(total)
    }, [List, defaultData])


    const [focus, setFocus] = React.useState(-1)
    return(
        <View>
        <FlatList
            style={{paddingHorizontal: 5*sc}}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            data={props.data?defaultData:List}
            keyExtractor={item => String(item.day)}
            renderItem={({item, index}) => {
                var dA = item['dateCompleted'].split('-') 
                return(
                    <View>
                    <TouchableWithoutFeedback onPress={() => {console.log(index);setFocus(focus === index?-1:index)}}> 
                     <WorkoutCard
                        day={item.day}
                        date={dA[0]}
                        month={MONTHS[Number(dA[1]) - 1]}
                        year={dA[2]}
                        programName={workoutData.program.programName}
                        muscles={item.targetBodyPart}
                        calories='TBD-calories' 
                        focus={focus===index}
                        data={item}
                        tick={item.future===true}
                        dot={item.future===true}
                        empty={item.empty===true}
                        locked={item.locked===true}
                        planType={item.planType}
                    />
                
                    </TouchableWithoutFeedback>
                    {focus===index && item.locked?<ButtonType1 
                        text = "RENEW SUBSCRIPTION NOW"
                        styling = {{width: '100%', borderTopRightRadius:0*sc,borderTopLeftRadius:0*sc, alignSelf:'center', marginBottom: 10*sc}}
                        textStyling={{fontSize: 13*sc}}
                        arrow = {false}
                        onClick = {() => {props.goToRenewPaymentPage()}}
                    />:null}
                    </View>
            )}}
        /> 
        </View>
    );
}
