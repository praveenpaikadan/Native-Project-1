import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { sc, globalFonts, globalFontSize, globalStyles, themeColors } from '../styles/global-styles';
import { FontAwesome5 } from '@expo/vector-icons';

export const TabMenu = () =>(
    <View style={styles.tabContainer}>
        <View style={styles.menuContainer}>
            <FontAwesome5 style={styles.menuIcon} name="calendar-alt" size={35*sc} color={themeColors.tertiary1} />
            <Text style={styles.menuHeading}>Body Calendar</Text>
            
        </View>
        <View style={styles.menuContainer}>
            <FontAwesome5 style={styles.menuIcon} name="shopping-bag" size={35*sc} color={themeColors.tertiary1} />
            <Text style={styles.menuHeading}>Store</Text>
        </View>
        <View style={styles.menuContainer}>
            <FontAwesome5 style={styles.menuIcon} name="dumbbell" size={33*sc} color={themeColors.tertiary1} />
            <Text style={styles.menuHeading}>My Workouts</Text>
        </View>

    </View>
)

const styles = StyleSheet.create({
    tabContainer:{
        position:'absolute',
        bottom:0,
        left:0,
        paddingVertical:10*sc,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',

    },

    menuContainer:{
        alignItems:'center',
        justifyContent:'center',
    },

    menuHeading:{
        paddingTop:5,
        fontSize:globalFontSize.content,
        fontFamily:globalFonts.primaryMedium,
    },
    



})