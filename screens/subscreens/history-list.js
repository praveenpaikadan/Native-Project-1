import * as React from 'react';
import { View, Text, StyleSheet, Image, FlatList, } from 'react-native';
import { globalFonts, sc, themeColors, globalShadows, globalStyles } from '../../styles/global-styles';
import { ElevatedCardTypeOne } from '../../components/cards'
import { Ionicons } from '@expo/vector-icons'; 
import { WorkoutContext } from '../../components/workout-context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { format_target } from '../../utilities/helpers';
import { useEffect } from 'react/cjs/react.development';
import {WorkoutCard} from '../../components/workout-card'


export const HistoryList = (props) => {
    const {workoutData} = React.useContext(WorkoutContext)
    const List = workoutData?[...workoutData.history]:[]
    const listOfDays = List.map((item, index) => item.day)
    
    // adding coming up workout list - making a similar object as that of historyc object to make minimum modification in history card component
    var first = true // to find currently active one
    workoutData.program.schedule.forEach((dayData, index) => {
        if(!listOfDays.includes(dayData.day)){
            var dayObj = {}
            dayObj.day = dayData.day
            dayObj.dateCompleted = "01-01-1990"
            dayObj._id = dayData._id
            dayObj.workout = dayData.exercises.map((item, index) => {return {...item, reps: item.target, exerciseNumber: index+1}})
            dayObj.future = true
            dayObj.active = first 
            List.push(dayObj)
            first = false
        }
    });


    const MONTHS =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    useEffect(() => {
        var total = 0
        for(var i=0; i<List.length; i++){
            total = total + List[i].workout.length
        }
        props.setTotal(total)
    }, [workoutData])


    const [focus, setFocus] = React.useState(-1)
    return(
        <View>
        <FlatList
            showsVerticalScrollIndicator={false}
            data={List}
            keyExtractor={item => String(item.day)}
            renderItem={({item, index}) => {
                var dA = item['dateCompleted'].split('-') 
                return(
                    <TouchableWithoutFeedback onPress={() => {console.log(index);setFocus(focus === index?-1:index)}}> 
                     <WorkoutCard
                        day={item.day}
                        date={dA[0]}
                        month={MONTHS[Number(dA[1]) - 1]}
                        year={dA[2]}
                        programName={workoutData.program.programName}
                        muscles={'TBD-Target'}
                        calories='TBD-calories' 
                        focus={focus===index}
                        data={item}
                        tick={item.future===true}
                        dot={item.future===true}
                    />
                
                    </TouchableWithoutFeedback>
              
                   
            )}}
        /> 
        </View>
    );
}

const timerIconStyling = {
    color:themeColors.primary1,
    size:20*sc
}

const styles = StyleSheet.create({
    timerContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:themeColors.tertiary1,
        paddingHorizontal:4*sc,
        paddingVertical:2*sc,
        marginVertical:10*sc,
        marginHorizontal:80*sc
    },

    timerText:{
        fontFamily:globalFonts.primaryRegular,
        fontSize:12*sc,
        color:themeColors.secondary2
    },

    timeContainer:{
        backgroundColor:themeColors.tertiary2,
        paddingHorizontal:3*sc,
        paddingVertical:1*sc,

    },

})