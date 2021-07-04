import * as React from 'react';
import { StyleSheet, View, Text, ImageBackground, FlatList } from 'react-native';
import { globalStyles, themeColors, sc, globalFonts } from '../styles/global-styles';
import { ButtonType1 } from '../components/buttons';
import { Header } from '../components/header';
import { FontAwesome5 } from '@expo/vector-icons';


export default TrackingScreen = () => {
    return (
        <View style={styles.container}>
            <Header />
            <View>
                <View style={styles.headingContainer}>
                    <FontAwesome5 name="dumbbell" {...dumbbellIconStyling} />
                    <Text style={styles.heading}>Aboo Thahir’s Muscle Gain Program: Day 18 - Shoulders, Legs, Calves</Text>
                </View>
                <View>
                    <Text>Goal: Muscle Building</Text>
                    <Text>Level: Intermediate</Text>
                </View>
                <View>
                    <View>
                        <Text>TOTAL EXERCISES</Text>
                        <View>
                            <Text>18</Text>
                        </View>
                    </View>
                    <View>
                        <Text>TOTAL SETS</Text>
                        <View>
                            <Text>29</Text>
                        </View>
                    </View>
                    <View>
                        <Text>TOTAL WORKOUT TIME</Text>
                        <View>
                            <Text>01:30</Text>
                            <Text>HR    MIN</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.line}></View>
            <ButtonType1 />
            <FlatList>

            </FlatList>


        </View>

    )
}

const dumbbellIconStyling = {
    color: themeColors.primary1,
    size: 25*sc
}

const styles = StyleSheet.create({

    container: {
        width:'100%', 
        height:'100%', 
        backgroundColor:themeColors.tertiary2,
        justifyContent:'center',
        alignItems:'center'
    },

    headingContainer:{
        flexDirection:'row',
        marginVertical:10*sc,
        padding:13*sc,
        alignItems:'center'
    
    },

    heading:{
        fontFamily:globalFonts.primaryBold,
        fontSize:16*sc,
        marginHorizontal:10*sc,
        marginRight:15*sc
    }


})