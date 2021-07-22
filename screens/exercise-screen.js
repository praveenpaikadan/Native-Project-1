import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { globalStyles, themeColors, sc, globalFonts } from '../styles/global-styles';
import { ButtonType1 } from '../components/buttons';
import { Header } from '../components/header';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ExerciseCard } from './subscreens/exerciselist';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Line = () => (
    <View style={styles.line}></View>
)

export default ExerciseScreen = () => {
    DATA = {
        targetSets:'03',
        targetReps:'8 - 12',
        exerciseName:'Dumbbell Step Ups',
        weight:'18',
        reps:'12',
        rest:'00:45'
    }
    const [weight, onChangeWeight] = useState(`${DATA.weight}`)
    const [reps, onChangeReps] = useState(`${DATA.reps}`)

    const PreSetContainer = () => (
        <View style={styles.preSetContainer}>
            <View style={styles.iconContainer}>
                <FontAwesome5 name="dot-circle" {...cirlceIconStyling} />
                <Text style={styles.setText}>SET 01</Text>
            </View>
            <Text style={styles.setText1}>TARGET REPS: {DATA.targetReps}</Text>
        </View>
    )
    const PostSetContainer = () => (
        <View style={styles.postSetContainer}>
            <View style={styles.iconContainer}>
                <FontAwesome name="check-circle" {...checkIconStyling} />
                <Text style={styles.setText}>SET 01</Text>
            </View>
            <View style={styles.quantityContainer}>
                <Text style={styles.quantity}>{weight}</Text>
                <Text style={styles.unit}>KILOGRAMS</Text>
            </View>
            <View style={styles.postCloseIconContainer}>
                <Fontisto name="close-a" {...postCloseIconStyling} />
            </View>
            
            <View style={styles.quantityContainer}>
                <Text style={styles.quantity}>{reps}</Text>
                <Text style={styles.unit}>REPS</Text>
            </View>     
        </View>
    )
    return(
        <View style={globalStyles.container}>
            <Header />
            <View style={styles.cardContainer}>
                <ExerciseCard
                    id={1}
                    exerciseName={DATA.exerciseName}
                    image1={require('../assets/images/Dumbbell-Step-Ups-1.jpg')}
                    image2={require('../assets/images/Dumbbell-Step-Ups-2.jpg')}
                    exerciseNameStyling={styles.exerciseName} 
                    targetSets={`TARGET SETS: ${DATA.targetSets}`}
                />
            </View>
            <View style={styles.subHeadingContainer}>
                <Text style={styles.subHeading}>Exercise 01 - Set 01</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputHeading}>TARGET: {DATA.targetReps} REPS</Text>
                <View style={styles.quantityContainer}>
                    <TextInput
                    style={styles.input}
                    onChange={onChangeWeight}
                    value={weight}
                    keyboardType='numeric' />
                    <Text style={styles.unit}>KG</Text>
                </View>
                <View style={styles.inputCloseIconContainer}>
                    <Fontisto name="close-a" {...closeIconStyling} />
                </View>
                
                <View style={styles.quantityContainer}>
                    <TextInput
                    style={styles.input}
                    onChange={onChangeReps}
                    value={reps}
                    keyboardType='numeric' />
                    <Text style={styles.unit}>REPS</Text>
                </View>            
            </View>
            <ButtonType1
            arrow={false}
            text={'SAVE SET'}
            styling={styles.button}
            textStyling={styles.buttonText} />
            <View style={styles.timerContainer}>
                <MaterialIcons name="timer" {...timerIconStyling} />
                <Text style={styles.timerText}>REST BETWEEN SETS: </Text>
                <View style={styles.timeContainer}>
                    <Text style={styles.timerText}> {DATA.rest}</Text>
                </View>
            </View>
            <Line />
            <View style={styles.setContainer}>
                <PreSetContainer />
                <PostSetContainer />
            </View>
            <Line />
            <View style={styles.setContainer}>
                <PreSetContainer />
                <PostSetContainer />
            </View>
            <Line />
            <View style={styles.setContainer}>
                <PreSetContainer />
                <PostSetContainer />
            </View>
            <Line />
            <View style={styles.setContainer}>
                <PreSetContainer />
                <PostSetContainer />
            </View>
            <Line />
            <View style={styles.footerContainer}>
                    <View style={styles.swipeContainer}>
                        <FontAwesome5 name="long-arrow-alt-left" {...arrowIconStyling} />
                        <Text style={styles.swipeText}>SWIPE FOR NEXT EXERCISE</Text>
                        <FontAwesome5 name="long-arrow-alt-right" {...arrowIconStyling} />
                    </View>
                    <View style={styles.footerButtonContainer}>
                        <Text style={styles.footerButtonText}>EXERCISE GUIDE</Text>
                        <View style={styles.hLine}></View>
                        <Text style={styles.footerButtonText}>PREVIOUS STATS</Text>
                    </View>

            </View>

        </View>
    );
}

const closeIconStyling = {
    color:themeColors.tertiary1,
    size:25*sc
}
const postCloseIconStyling = {
    color:themeColors.tertiary1,
    size:15*sc
}
const timerIconStyling = {
    color:themeColors.primary1,
    size:20*sc
}
const cirlceIconStyling = {
    color:themeColors.tertiary1,
    size:22*sc
}
const checkIconStyling = {
    color:themeColors.primary1,
    size:22*sc
}
const arrowIconStyling = {
    color:themeColors.tertiary1,
    size:25*sc
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        width:'100%',
        alignItems:'center'
        
    },

    line:{
        width:'100%',
        height:2*sc,
    backgroundColor:themeColors.primary1
    },
    
    exerciseName:{
        fontSize:13*sc
    },

    cardContainer:{
        backgroundColor:themeColors.tertiary2,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:3*sc
    },

    subHeadingContainer:{
        width:'100%',
        height:30*sc,
        backgroundColor:themeColors.tertiary1,
        justifyContent:'center'
    },

    subHeading:{
        fontFamily:globalFonts.primaryBold,
        fontSize:16*sc,
        color:themeColors.secondary2,
        marginLeft:20*sc
    },

    inputContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        paddingHorizontal:15*sc,
    },

    inputHeading:{
        fontFamily:globalFonts.primaryMedium,
        color:themeColors.tertiary1
    },

    quantityContainer:{
        justifyContent:'center',
        alignItems:'center'
    },

    input:{
        padding:3*sc,
        paddingHorizontal:15*sc,
        borderRadius:10*sc,
        borderColor:themeColors.primary1,
        borderWidth:2*sc,
        fontFamily:globalFonts.primaryRegular,
        fontSize:30*sc,
        color:themeColors.primary1,
        marginTop:8*sc
    },

    inputCloseIconContainer:{
        marginTop:-10*sc
    },

    unit:{
        fontFamily:globalFonts.primaryLight,
        fontSize:12*sc,
        color:themeColors.tertiary1,
        marginVertical:1*sc
    },

    button:{
        paddingHorizontal:50*sc,
        marginVertical:5*sc,
        
    },

    buttonText:{
        fontSize:20*sc,
    },

    timerContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:themeColors.tertiary1,
        paddingHorizontal:4*sc,
        paddingVertical:2*sc,
        marginVertical:10*sc
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

    setContainer:{
        width:'100%',
        alignItems:'center',
    },

    preSetContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        padding:10*sc,
        paddingHorizontal:30*sc,
        display:'none',
        
    },

    postSetContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        display:'flex',
        paddingHorizontal:30*sc,
        backgroundColor:themeColors.primary2
    },

    iconContainer:{
        flexDirection:'row',
        alignItems:'center',
    },

    setText:{
        fontFamily:globalFonts.primaryBold,
        fontSize:18*sc,
        color:themeColors.tertiary1,
        marginLeft:10*sc
    },

    setText1:{
        fontFamily:globalFonts.primaryBold,
        fontSize:18*sc,
        color:themeColors.tertiary1,
    },

    quantity:{
        fontFamily:globalFonts.primaryBold,
        fontSize:22*sc,
        color:themeColors.tertiary1
    },

    postCloseIconContainer:{
        marginTop:8*sc
    },

    footerContainer:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        marginTop:25*sc
    },

    swipeContainer:{
        flexDirection:'row',
        alignItems:'center'
    },

    swipeText:{
        fontFamily:globalFonts.primaryRegular,
        fontSize:13*sc,
        color:themeColors.tertiary1,
        letterSpacing:1*sc,
        marginHorizontal:10*sc
    },

    footerButtonContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        padding:5*sc,
        paddingHorizontal:20*sc,
        borderColor:themeColors.tertiary2,
        borderTopWidth:2*sc,
        marginTop:5*sc,
        marginBottom:8*sc,
    },

    footerButtonText:{
        fontFamily:globalFonts.primaryRegular,
        fontSize:14*sc,
        color:themeColors.tertiary1
    },

    hLine:{
        width:2*sc,
        height:20*sc,
        backgroundColor:themeColors.tertiary2
    },
    
})