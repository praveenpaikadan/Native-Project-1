import * as React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Platform } from 'react-native';
import { globalFonts, sc, themeColors, globalShadows, globalStyles } from '../styles/global-styles';
import { ElevatedCardTypeOne } from '../components/cards'
import { Ionicons } from '@expo/vector-icons'; 
import { format_target } from '../utilities/helpers';


export const ExerciseStatItemCard = (props) => {

    var focus = props.focus

    return(
        <View styling={!focus?cardStyles.card:cardStyles.focusedCard}>
        <View style={cardStyles.historyContainer}>

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

            <View style={cardStyles.textContainer}>
                <Text style={cardStyles.program}>{props.data.programName}: Day {props.day}</Text>
                {props.data.reps.map((item, index) => (<Text key={String(index)} style={cardStyles.calories}>{`Set ${index+1}: ${format_target(item, props.data.repetitionType)}`}</Text>))}
            </View>
            
        </View>
        <View style={cardStyles.line}></View>
        </View>
        
    )
}


const cardStyles = StyleSheet.create({
    cardConatiner:{
        zIndex:1
    },
    card:{
        // width:340*sc,
        marginVertical:5*sc,
        backgroundColor:themeColors.tertiary2,
        justifyContent:'flex-start',
    },

    line:{
        width: '100%',
        height: 2,
        backgroundColor:themeColors.primary1
        
    },

    iconContainer:{
        width: 50*sc,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-start'
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
        marginHorizontal:4*sc
    },

    tableText:{
        fontFamily: globalFonts.primaryLight, 
        paddingVertical:2*sc,
        fontSize: 13*sc,
        marginVertical: 5*sc,
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
        marginVertical: 5*sc,
        height:2,
        borderRadius: 1,
        backgroundColor: themeColors.tertiary2,
    }
})