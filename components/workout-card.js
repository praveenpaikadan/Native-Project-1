import * as React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Platform } from 'react-native';
import { globalFonts, sc, themeColors, globalShadows, globalStyles } from '../styles/global-styles';
import { ElevatedCardTypeOne } from '../components/cards'
import { Ionicons } from '@expo/vector-icons'; 
import { format_target } from '../utilities/helpers';

const Shadow = ({dot, tick, active}) => {
    return(
        <View style={{
            zIndex: 150, position: 'absolute', top: 0, right: 0,
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
            borderTopColor: !dot && !tick?'green':(!active?'transparent': 'blue')
            }}>
            <Text style={{zIndex: 151, position: 'absolute', top: -45*sc, right: 0*sc, transform: [{rotateZ : '42deg'}], color: 'white', fontFamily: globalFonts.primaryBold,
            elevation: (Platform.OS === 'android') ? 81 : 0,}}>{!dot && !tick?'Done':(!active?'': 'Next')}</Text>
        </View> 
    )
}

export const WorkoutCard = (props) => { 

    var focus = props.focus
    var data = props.data
    var tick = props.tick
    var dot = props.dot
    var active = props.data.active

    // To display workout days that are locked

    if(props.locked){
        return(
        <View style={cardStyles.cardConatiner}>
            <ElevatedCardTypeOne styling={!focus?cardStyles.card:cardStyles.focusedCard}>
                <View style={cardStyles.historyContainer}>
                    <View style={cardStyles.iconContainer}>
                        <Ionicons name="lock-closed" size={40*sc} color={themeColors.primary1} />
                    </View>
                    <View style={cardStyles.textContainer}>
                        <Text style={cardStyles.program}>{props.programName}: Day {props.day}</Text>
                        <Text style={cardStyles.calories}>LOCKED</Text>
                    </View>
                </View>

                {focus?
                <View style={{paddingHorizontal: 10*sc}}>
                    <Text style={cardStyles.tableText}>
                        This item is not accessible. You have chosen a {props.planType} subscription. To view this, renew your subscription.
                        </Text>
                    <View style={cardStyles.line}></View>
                   </View>
                :
                null}
            </ElevatedCardTypeOne> 
            <Shadow dot={dot} tick={tick} active={active}/>
        </View>
        ) 
    }

    
    // To display workout days that are not assigned yet.

    else if(props.empty){
        return(
            <View style={cardStyles.cardConatiner}>
            <ElevatedCardTypeOne styling={!focus?cardStyles.card:cardStyles.focusedCard}>
                <View style={cardStyles.historyContainer}>
                    <View style={cardStyles.iconContainer}>
                        <Ionicons name="build" size={45*sc} color={themeColors.primary1} />
                    </View>
                    <View style={cardStyles.textContainer}>
                        <Text style={cardStyles.program}>{props.programName}: Day {props.day}</Text>
                        <Text style={cardStyles.calories}>NOT ASSINGNED YET</Text>
                    </View>
                </View>

                {focus?
                <View style={{paddingHorizontal: 10*sc}}>
                    <Text style={cardStyles.tableText}>
                        Your trainer has not yet assigned any workout for day {props.day} for you. 
                        New workouts will be assigned as you progress through the program, 
                        after reviewing how you cope with the program. Feel free to contact your trainer and discuss 
                        about how you are doing. This will help in fine tuning your fitness program.
                        </Text>
                    <View style={cardStyles.line}></View>
                   </View>
                :
                null}
            </ElevatedCardTypeOne> 
            <Shadow dot={dot} tick={tick} active={active}/>
        </View>
        ) 
    }

    // Display things with content and that are not locked.
 
    return(
        <View style={cardStyles.cardConatiner}>
            <ElevatedCardTypeOne styling={!focus?cardStyles.card:cardStyles.focusedCard}>
                
                <View style={cardStyles.historyContainer}>
        
                    {!tick?
                    <View style={cardStyles.iconContainer}>
                        <View style={{transform:[{scale: 0.85}]}}>
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
                    </View>
                    :
                    (!dot
                        ?
                        <View style={cardStyles.iconContainer}>
                            <Ionicons name="checkmark-done-circle-sharp" size={40*sc} color={themeColors.primary1} />
                        </View>
                        :
                        <View style={cardStyles.iconContainer}>
                            <Ionicons name="timer-outline" size={50*sc} color={themeColors.primary1} />
                        </View>
                    )
                    }
                    <View style={cardStyles.textContainer}>
                        <Text style={cardStyles.program}>{props.programName}:{'\n'}Day {props.day} - {props.muscles}</Text>
                        <Text style={cardStyles.calories}>{`${dot?'Equivalent Calories: ':'Calories burnt:'}` } {props.data.calsBurned}Kcal</Text>
                        <Text style={cardStyles.calories}>{'Total Exercises:' } {props.data.workoutsTracked}</Text>
                    </View>
                </View>

                {focus?
                
                <View style={{paddingHorizontal: 10*sc}}>
                    <Text style={{paddingHorizontal: 10*sc, paddingVertical: 10*sc, fontFamily: globalFonts.primaryRegular}}>Details of workout : </Text>
                    <View style={cardStyles.line}></View>
                    {data.workout.map((exercise, index) => {
                        var sets = exercise.reps.filter(item =>item !== '0').map((rep, index) => <Text key={String(index)} style={cardStyles.tableText}>{`${dot?'Target Set ':'Set '}`+ (index+1) + ' : '+format_target(rep, exercise.repetitionType)}</Text>)
                        return(
                    <View key={String(index)}>
                    <View style={{flexDirection: 'row', paddingHorizontal: 5*sc, paddingVertical:2*sc}}>
                        <View style={{flex:1}}><Text style={cardStyles.tableText}>{exercise.exerciseNumber}</Text></View>
                        <View style={{flex:7}}><Text style={cardStyles.tableText}>{exercise.exerciseName}</Text></View>
                        <View style={{flex:12}}>{sets[0]?sets:<Text style={cardStyles.tableText}>Skipped</Text>}</View>
                    </View>
                    <View style={cardStyles.line}></View>
                    </View>
                )})}</View>

                :
                null}
                
            </ElevatedCardTypeOne>      
            <Shadow dot={dot} tick={tick} active={active}/>  
        </View>
        
    );
}


const cardStyles = StyleSheet.create({
    cardConatiner:{
        zIndex:1
    },
    card:{
        paddingVertical: 10*sc,
        width:340*sc,
        marginVertical:5*sc,
        backgroundColor:themeColors.primary2 ,
        justifyContent:'flex-start',

    },

    iconContainer:{
        width: 50*sc,
        justifyContent:'center',
        alignItems:'center'
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

    tableText:{
        fontFamily: globalFonts.primaryLight, 
        paddingVertical:2*sc,
        fontSize: 13*sc,
        // marginVertical: 5*sc,
        lineHeight: 17*sc
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
        fontSize:14*sc,
        marginBottom: 5*sc
    },

    calories:{
        fontFamily:globalFonts.primaryRegular,
        fontSize: 12*sc,
        color:themeColors.tertiary1,
        letterSpacing:1*sc,
        textAlign:'left',
        marginTop:3*sc
    },

    line:{
        margin: 5*sc,
        height:2*sc,
        backgroundColor: themeColors.tertiary2,
    }
})
