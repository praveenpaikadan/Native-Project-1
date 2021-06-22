import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { globalStyles, themeColors } from '../styles/global-styles';
import { formPageStyles } from '../styles/form-pages-styles';
import { Feather } from '@expo/vector-icons';


export const Header = () =>(
    
        <View style={styles.headerContainer}>
            <View style={styles.textContainer}>
                <Text style={formPageStyles.headerHeading}>Personal Trainer</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.menuContainer}>
                    <Feather  name="menu" size={35} color={themeColors.secondary2} />
                </TouchableOpacity>
            </View>
        </View>
    )


const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row',
        backgroundColor: themeColors.primary1,
        position: 'absolute',
        top: 0,
        left:0,
        width:'100%',
        paddingTop: 30,
        paddingBottom:10,
        paddingHorizontal:20,
        justifyContent:'space-between',
        alignItems:'center', 
    },

    textContainer:{
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    }



})