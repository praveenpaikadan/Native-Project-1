import * as React from 'react';
import { View, Text, StyleSheet, Image, FlatList, } from 'react-native';
import { globalFonts, sc, themeColors, globalShadows, globalStyles } from '../../styles/global-styles';
import { ElevatedCardTypeOne } from '../../components/cards'
import { MaterialIcons } from '@expo/vector-icons';

export const HistoryCard = (props) => { 
    return(
        <View style={cardStyles.cardConatiner}>
            <ElevatedCardTypeOne styling={cardStyles.card}>
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
        width:340*sc,
        height:100*sc,
        marginVertical:5*sc,
        backgroundColor:themeColors.primary2 ,
        justifyContent:'center',
        
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

    
})

export const HistoryList = (props) => {
    
    const List = [1,2,3,4,5,6,7,8,9];
    
    return(
        <FlatList
            showsVerticalScrollIndicator={false}
            data={List}
            renderItem={(itemData) => (
                <View>
                    <HistoryCard
                    month={'JUN'}
                    date={itemData.item}
                    year='2021'
                    programName='Aboo Thahir’s Muscle Gain Program'
                    day='14'
                    muscles='Shoulders, Legs, Calves'
                    calories='500' />
                </View>
                
                
                
            )}
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