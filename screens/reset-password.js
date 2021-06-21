import * as React from 'react';
import {View,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,} from 'react-native';
import { globalStyles, themeColors, globalFonts } from '../styles/global-styles';
import { ResetPasswordGraphics } from '../assets/svgs/svg-graphics';
import { ButtonType1 } from '../components/buttons';


export default ResetPasswordScreen = () => (
    
    <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.container}>
                <View style={styles.headerGraphicsContainer}>
                    <ResetPasswordGraphics style={{width:'100%'}} />
                    <View style={styles.heading}>
                        <Text style={styles.mainHeading}>Reset Password.</Text>
                        <Text style={styles.subHeading}>Your Identity have been verified.</Text>
                        <Text style={styles.subHeading}>Set your new password.</Text>
                    </View>
                </View>

            
                <View style={styles.contentContainer}>
                    <View style={styles.formContainer}>
                        {/* form component inside */}
                        <TextInput placeholder="New Password" style={styles.textInput} />
                        <TextInput placeholder="Confirm Password" style={styles.textInput} />
                        <ButtonType1 style={styles.submitButton} text={"SUBMIT"}/>
                    </View>

                    <View style={styles.footContainer}>
                        <Text style={styles.footText}>
                        </Text>
                        <Text style={{
                            ...styles.footText,
                            margin:2, 
                            color:themeColors.primary1,
                            fontFamily:globalFonts.primaryBold,
                            }}> Sign In</Text>
                    </View>     
                </View>
            </View>

        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
    container:{
        width:'100%', 
        height:'100%', 
        backgroundColor:themeColors.primary2,
    },
    headerGraphicsContainer:{
        position:'absolute',
        top:0,
        left:0,
    },
    heading:{
        position:'absolute',
        top:80,
        left:30,
    },
    mainHeading:{
        ...globalStyles.formPageMainHeading,
        color:themeColors.secondary2

    },
    subHeading:{
        ...globalStyles.formPageSubHeading,
        color:themeColors.secondary2


    },
    contentContainer:{
        width:'100%',
        alignItems:'center',
        position:'absolute',
        bottom:0,

    },
    formContainer:{
        ...globalStyles.formContainer,
        width:'95%',
        paddingHorizontal:20,

    },
    textInput:{
        ...globalStyles.formTextInput,
        

    },
    submitButton:{
        ...globalStyles.formSubmitButton
    },
    footContainer:{
        ...globalStyles.formPageFootContainer

    },
    footText:{
        ...globalStyles.formPageFootText

    }


})
