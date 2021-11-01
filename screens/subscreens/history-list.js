import * as React from 'react';
import { View, Text, StyleSheet, Image, FlatList, } from 'react-native';
import { globalFonts, sc, themeColors, globalShadows, globalStyles } from '../../styles/global-styles';
import { ElevatedCardTypeOne } from '../../components/cards'
import { MaterialIcons } from '@expo/vector-icons';
import { WorkoutContext } from '../../components/workout-context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { format_target } from '../../utilities/helpers';
import { useEffect } from 'react/cjs/react.development';




export const HistoryCard = (props) => { 
    var focus = props.focus
    var data = props.data
    return(
        <View style={cardStyles.cardConatiner}>
            <ElevatedCardTypeOne styling={!focus?cardStyles.card:cardStyles.focusedCard}>
                <View style={cardStyles.historyContainer}>
                    <View>
                        <View style={cardStyles.monthContainer}>
                            <View style={cardStyles.dot}></View>
                            <Text style={cardStyles.month}>{props.month}</Text>
                            <View style={cardStyles.dot}></View>
                        </View>
                        <View style={cardStyles.dateContainer}>
                            <Text style={cardStyles.date}>{props.date}</Text>
                            <Text style={cardStyles.year}>{props.year}</Text>
                        </View>
                    </View>
                    <View style={cardStyles.textContainer}>
                        <Text style={cardStyles.program}>{props.programName}:{'\n'}Day {props.day} - {props.muscles}</Text>
                        <Text style={cardStyles.calories}>Calories Burnt: {props.calories}Kcal</Text>
                    </View>
                </View>

                {focus?
                
                <View style={{paddingHorizontal: 10*sc}}>
                    <Text style={{paddingHorizontal: 10*sc, paddingVertical: 10*sc, fontFamily: globalFonts.primaryRegular}}>Details of workout : </Text>
                    <View style={cardStyles.line}></View>
                    {data.workout.map((exercise, index) => {
                        var sets = exercise.reps.filter(item =>item !== '0').map((rep, index) => <Text key={String(index)}style={{fontFamily: globalFonts.primaryLight}}>{'Set '+ (index+1) + ' : '+format_target(rep, exercise.repetitionType)}</Text>)
                        return(
                    <View key={String(index)}>
                    <View style={{flexDirection: 'row', paddingHorizontal: 20*sc, paddingVertical:2*sc}}>
                        <View style={{flex:1}}><Text style={{fontFamily: globalFonts.primaryLight}}>{exercise.exerciseNumber}</Text></View>
                        <View style={{flex:4}}><Text style={{fontFamily: globalFonts.primaryLight}}>{exercise.exerciseName}</Text></View>
                        <View style={{flex:4}}>{sets[0]?sets:<Text style={{fontFamily: globalFonts.primaryLight}}>Skipped</Text>}</View>
                    </View>
                    <View style={cardStyles.line}></View>
                    </View>
                )})}</View>

                :
                null}
                
            </ElevatedCardTypeOne> 
        </View>
        
    );
}

const cardStyles = StyleSheet.create({
    cardConatiner:{
        flexDirection:'row',
        zIndex:1
    },
    card:{
        paddingVertical: 10*sc,
        width:340*sc,
        marginVertical:5*sc,
        backgroundColor:themeColors.primary2 ,
        justifyContent:'flex-start',

    },

    focusedCard:{
        paddingVertical: 10*sc,
        width:340*sc,
        // height:200*sc,
        marginVertical:5*sc,
        backgroundColor:themeColors.primary2 ,
        justifyContent:'flex-start',
    },

    historyContainer:{
        flexDirection:'row',
        marginHorizontal:8*sc
    },

    monthContainer:{
        flexDirection:'row',
        backgroundColor:themeColors.tertiary1,
        padding:3*sc,
        justifyContent:'center',
        alignItems:'center'

    },

    dot:{
        backgroundColor:themeColors.secondary2,
        width:4*sc,
        height:4*sc,
        borderRadius:2*sc,
        marginBottom:10*sc,
        marginHorizontal:4*sc
    },

    month:{
        fontFamily:globalFonts.primaryBold,
        color:themeColors.secondary2
    },

    dateContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:themeColors.secondary2,
        paddingBottom:2*sc
    },

    date:{
        fontFamily:globalFonts.primaryBold,
        color:themeColors.primary1,
        fontSize:20*sc
    },

    year:{
        fontFamily:globalFonts.primaryRegular,
        color:themeColors.tertiary1,
        fontSize:13*sc
    },

    textContainer:{
        marginLeft:10*sc
    },

    program:{
        fontFamily:globalFonts.primaryBold,
        color:themeColors.tertiary1,
        fontSize:14*sc
    },

    calories:{
        fontFamily:globalFonts.primaryRegular,
        color:themeColors.tertiary1,
        letterSpacing:1*sc,
        textAlign:'center',
        marginTop:10*sc
    },

    line:{
        margin: 5*sc,
        height:2*sc,
        backgroundColor: themeColors.tertiary2,
    }

    
})

export const HistoryList = (props) => {
    const {workoutData} = React.useContext(WorkoutContext)
    const List = workoutData?workoutData.history:null
    const MONTHS =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    useEffect(() => {
        var total = 0
        for(var i=0; i<List.length; i++){
            total = total + List[i].workout.length
        }
        props.setTotal(total)
    }, [])


    const [focus, setFocus] = React.useState(-1)
    return(
        <FlatList
            showsVerticalScrollIndicator={false}
            data={List}
            keyExtractor={item => String(item.day)}
            renderItem={({item, index}) => {
                var dA = item['dateCompleted'].split('-') 
                return(
                    <TouchableWithoutFeedback onPress={() => {console.log(index);setFocus(focus === index?-1:index)}}> 
                     <HistoryCard
                        day={item.day}
                        date={dA[0]}
                        month={MONTHS[Number(dA[1]) - 1]}
                        year={dA[2]}
                        programName={workoutData.program.programName}
                        muscles={'TBD-Target'}
                        calories='TBD-calories' 
                        focus={focus===index}
                        data={item}
                    />
                
                    </TouchableWithoutFeedback>
              
                   
            )}}
        /> 
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