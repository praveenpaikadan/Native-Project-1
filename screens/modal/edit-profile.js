import React from 'react';
import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { themeColors, sc, globalFonts } from '../../styles/global-styles';
import { ButtonType1 } from '../../components/buttons';

export const EditProfileModal = () => {
    return(
        <Modal transparent visible={true}>
            <View style={styles.overlay}>
                <View style={styles.container}> 
                    <Text style={styles.inputHeading}>Enter Your Name</Text>
                    <TextInput style={styles.input} value={'OLIVIA CHARLOTTE'} autoCapitalize={'characters'}/>
                    <View style={styles.buttonContainer}>
                        <ButtonType1 arrow={false} text={'UPDATE'} styling={styles.button} textStyling={styles.buttonText}/>
                        <ButtonType1 arrow={false} text={'CANCEL'} styling={styles.button} textStyling={styles.buttonText}/>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay:{
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center'
    },

    container:{
        width:'80%',
        height:'32%',
        backgroundColor:themeColors.tertiary2,
        borderRadius:20*sc,
        padding:30*sc,
        paddingVertical:40*sc,
        justifyContent:'center'
    },

    inputHeading:{
        fontFamily:globalFonts.primaryBold,
        color:themeColors.tertiary1,
        textTransform:'uppercase',
        marginLeft:10*sc
    },

    input:{
        padding:10*sc,
        backgroundColor:themeColors.secondary2,
        borderRadius:20*sc,
        marginVertical:10*sc,
        fontFamily:globalFonts.primaryRegular,
        color:themeColors.tertiary1,
    },

    buttonContainer:{
        justifyContent:'center',
        flexDirection:'row',
        marginHorizontal:100*sc,
       
        
    },

    button:{
        minWidth:100*sc,
        marginHorizontal:5*sc,
        marginTop:10*sc
    },

    buttonText:{
        fontSize:12*sc,
    },
})