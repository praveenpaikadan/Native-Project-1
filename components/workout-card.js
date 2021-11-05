import * as React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Platform } from 'react-native';
import { globalFonts, sc, themeColors, globalShadows, globalStyles } from '../styles/global-styles';
import { ElevatedCardTypeOne } from '../components/cards'
import { Ionicons } from '@expo/vector-icons'; 
import { format_target } from '../utilities/helpers';

export const WorkoutCard = (props) => { 
    var focus = props.focus
    var data = props.data
    var tick = props.tick
    var dot = props.dot
    return(
        <View style={cardStyles.cardConatiner}>
            <ElevatedCardTypeOne styling={!focus?cardStyles.card:cardStyles.focusedCard}>
                
                <View style={cardStyles.historyContainer}>
                    {!tick?
                    
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
                    :
                    (!dot
                        ?
                        <Ionicons name="checkmark-done-circle-sharp" size={40} color={themeColors.primary1} />
                        :
                        <Ionicons name="timer-outline" size={63*sc} color={themeColors.primary1} />
                    )
                    }
                    <View style={cardStyles.textContainer}>
                        <Text style={cardStyles.program}>{props.programName}:{'\n'}Day {props.day} - {props.muscles}</Text>
                        <Text style={cardStyles.calories}>{`${dot?'Equivalent Calories: ':'Calories burnt:'}` } {props.calories}Kcal</Text>
                    </View>
                </View>

                {focus?
                
                <View style={{paddingHorizontal: 10*sc}}>
                    <Text style={{paddingHorizontal: 10*sc, paddingVertical: 10*sc, fontFamily: globalFonts.primaryRegular}}>Details of workout : </Text>
                    <View style={cardStyles.line}></View>
                    {data.workout.map((exercise, index) => {
                        var sets = exercise.reps.filter(item =>item !== '0').map((rep, index) => <Text key={String(index)}style={{fontFamily: globalFonts.primaryLight}}>{`${dot?'Target Set ':'Set '}`+ (index+1) + ' : '+format_target(rep, exercise.repetitionType)}</Text>)
                        return(
                    <View key={String(index)}>
                    <View style={{flexDirection: 'row', paddingHorizontal: 5*sc, paddingVertical:2*sc}}>
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
            {/* <Text style={{zIndex: 1000, position: 'absolute', top: 5*sc, right: 8*sc, color: 'green', fontFamily: globalFonts.primaryLight,  fontSize: 12*sc, elevation: (Platform.OS === 'android') ? 25 : 0}}> Completed</Text> */}
           <View style={{
                zIndex: 1000, position: 'absolute', top: 0, right: 0,
                elevation: (Platform.OS === 'android') ? 80 : 0,
                width: 0,
                height: 0,
                borderTopWidth:60,
                borderLeftWidth: 60,
                // borderRightWidth: 60,
                borderBottomWidth: 0,
                borderStyle: 'solid',
                // backgroundColor: 'transparent',
                borderLeftColor: 'transparent',
                // borderRightColor: 'green',
                borderBottomColor: 'transparent',
                borderTopRightRadius: 10*sc,
                opacity:0.6,
                borderTopColor: !dot && !tick?'green':'transparent'
                }}>
            </View>          
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
        flexShrink:1,
        marginHorizontal:10*sc
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
        textAlign:'left',
        marginTop:10*sc
    },

    line:{
        margin: 5*sc,
        height:2*sc,
        backgroundColor: themeColors.tertiary2,
    }
})
