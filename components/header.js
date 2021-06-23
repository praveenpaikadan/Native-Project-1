import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { globalFonts, globalStyles, sc, themeColors } from '../styles/global-styles';
import { formPageStyles } from '../styles/form-pages-styles';
import { Feather } from '@expo/vector-icons';


export const Header = () =>(
    
        <View style={styles.headerContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.headerText}>Personal Trainer</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.menuContainer}>
                    <Feather name="menu" size={30*sc} color={themeColors.secondary2} />
                </TouchableOpacity>
            </View>
        </View>
    )


const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row',
        backgroundColor: themeColors.primary1,
        width:'100%',
        paddingTop: 30,
        paddingBottom:10,
        paddingHorizontal:20,
        alignItems:'center', 
    },
    headerText:{
        fontSize:30*sc,
        fontFamily:globalFonts.primaryMedium,
        color:themeColors.secondary2,
    },

    textContainer:{
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    }
})