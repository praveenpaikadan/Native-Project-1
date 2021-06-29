import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { themeColors, sc, globalFonts } from '../../styles/global-styles';
import { BodyCalendar } from '../../components/body-calendar';
import { ButtonType1 } from '../../components/buttons';

export const BodyCalendarFuture = () => {
    return (
        <BodyCalendar>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.textContainer}>
                        <FontAwesome name="dot-circle-o" size={24} color={themeColors.tertiary1} />
                        <Text style={styles.content}>ABOO THAHIR'S MUSCLE GAIN PROGRAM, DAY 18 - SHOULDERS, LEGS, CALVES</Text>
                    </View>
                    <View>
                        <ButtonType1 text={'VIEW'} styling={styles.button} arrow={false} textStyling={styles.buttonText} buttonPadding={styles.buttonPadding} />
                    </View>
                </View>
                
                <View style={styles.footLine}></View>
                
            </View>
        </BodyCalendar>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop:10*sc,
        padding:5*sc,
        height:100*sc,
        alignItems:'flex-start'
    },

    row:{
        flexDirection:'row',
    },

    textContainer:{
        alignItems:'center',
        flexDirection:'row',
        flex:2,
        alignItems:'center',
        paddingRight:5*sc,
        paddingLeft:5*sc
    },

    content:{
        marginHorizontal:10*sc,
        fontFamily:globalFonts.primaryLight,
        color:themeColors.tertiary1
    },

    buttonText:{
        fontSize:12*sc
    },

    buttonContainer:{
        flex:1
    },

    button:{
        height:35*sc,
        minWidth:90*sc,
        marginLeft:10*sc,
        backgroundColor:themeColors.tertiary1
        
    },

    footLine:{
        width:'100%',
        height:2*sc,
        backgroundColor:themeColors.tertiary2,
        marginTop:10*sc
    }
})