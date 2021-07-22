import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { themeColors, sc, globalFonts } from '../../styles/global-styles';
import { ButtonType1 } from '../../components/buttons';
import { SetCompleteBadge } from '../../assets/svgs/svg-graphics';

export const SetCompleteModal = () => {
    return(
        <Modal transparent={true} visible>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.headingContainer}>
                        <FontAwesome name="check-circle" {...checkIconStyling} />
                        <Text style={styles.heading}>Exercise Complete</Text>
                    </View>
                    <View style={styles.badgeContainer}>
                        <Text style={styles.subHeading}>GREAT JOB</Text>
                        <SetCompleteBadge />
                        <Text style={styles.subHeading}>You Have Completed{'\n'}All Your Target Sets</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View>
                        <View style={styles.nextExerciseContainer}>
                            <Text style={styles.nextExerciseheading}>NEXT EXERCISE: </Text>
                            <Text style={styles.nextExerciseName}>Barbell Shoulder Press</Text>
                        </View>
                        
                        <ButtonType1 styling={styles.button} text={'NEXT EXERCISE'} arrow={false} textStyling={styles.buttonText} />
                    </View>
                </View>

            </View>
            
        </Modal>
            
        
    )
}

const checkIconStyling = {
    color:themeColors.secondary2,
    size:22*sc
}

const styles = StyleSheet.create({
    overlay:{
        width:'100%',
        height: '100%',
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center'
    },

    modalContainer:{
        width:'90%',
        backgroundColor:themeColors.secondary2,
        paddingBottom:20*sc
    },

    headingContainer:{
        flexDirection:'row',
        backgroundColor: themeColors.primary1,
        justifyContent:'center',
        alignItems:'center',
        height:30*sc,
    },

    heading:{
        fontFamily:globalFonts.primaryBold,
        color:themeColors.secondary2,
        marginLeft:10*sc
    },

    subHeading:{
        fontFamily:globalFonts.primaryBold,
        color:themeColors.tertiary1,
        marginVertical:10*sc,
        letterSpacing:1*sc,
        fontSize:16*sc,
        lineHeight:23*sc
    },

    badgeContainer:{
        alignItems:'center',
        marginVertical:10*sc
    },

    line:{
        width:'100%',
        height:5*sc,
        backgroundColor:themeColors.primary2,
        marginBottom:15*sc
    },

    nextExerciseContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10*sc
    },

    nextExerciseheading:{
        fontFamily:globalFonts.primaryBold,
        color:themeColors.tertiary1,
        letterSpacing:0.8*sc
    },

    nextExerciseName:{
        fontFamily:globalFonts.primaryRegular,
        color:themeColors.tertiary1,
        letterSpacing:0.8*sc
    },

    button:{
        marginHorizontal:30*sc
    },

    buttonText:{
        fontSize:18*sc
    },
})