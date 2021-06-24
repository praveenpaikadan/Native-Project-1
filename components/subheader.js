import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { sc, themeColors, globalFonts } from '../styles/global-styles';
import { Feather } from '@expo/vector-icons';


export const SubHeader = ({text}) => (
    <View style={styles.headerContainer}>
        <Feather name="chevron-left" {...backIconStyling} color="white" />
        <View style={styles.textContainer}>
            <Text style={styles.heading}>{text}</Text>
        </View>
    </View>

);

const backIconStyling = {
    size: 30*sc,
    color:themeColors.secondary2
}
const styles = StyleSheet.create({
    headerContainer:{
        backgroundColor:'rgba(67,67,67,0.5)',
        flexDirection:'row',
        padding:10*sc,
        paddingRight:35*sc,
        alignItems:'center'
    },

    textContainer:{
        flex:1,
    },

    heading:{
        textAlign:'center',
        fontSize:20*sc,
        fontFamily:globalFonts.primaryMedium,
        color:themeColors.secondary2,
    }
})








