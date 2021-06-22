import * as React from 'react';
import {   View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard, } from 'react-native';

import { ButtonType1 } from '../components/buttons';
import { formPageStyles } from '../styles/form-pages-styles'

// Boiler plate componet for all authentication related screens - Experimental
// SignIn, CreateAccount, ResetAccount, ForgetPassword 


// <AuthScreen 
//     key='CreateAccountScreen'
//     graphics={<CreateAccountGraphics />}
//     fields={['Full Name','Email', 'Password', 'Confirm Password']}
//     buttonText='SIGN UP'
//     mainHeading='Create Account'
//     subHeadings={['Welcome Onboard!']}
//     footText1='Already have an account?'
//     footText2='Sign In'
// />

export default AuthScreen = ({graphics, fields, buttonText,  mainHeading, subHeadings, footText1, footText2}) => (

    

    <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.container}>
                <View style={styles.headerGraphicsContainer}>
                    {graphics}
                    <View style={styles.heading}>
                        <Text style={styles.mainHeading}>{mainHeading}</Text>
                        {subHeadings.map(subHeading => (
                            <Text key={subHeading} style={styles.subHeading}>{subHeading}</Text>    
                        ))}
                    </View>
                </View>



                <View style={styles.contentContainer}>
                    <View style={styles.formContainer}>
                        {/* form component inside */}
                        {fields.map(field => (
                            <TextInput key={field} placeholder={field} style={styles.textInput} />    
                        ))}
                        <ButtonType1 styling={styles.submitButton} text={buttonText}/>
                    </View>

                    <View style={styles.footContainer}>
                        <Text style={styles.footText1}>
                            {footText1} 
                        </Text>
                        <Text style={styles.footText2}>{footText2}</Text>
                    </View>     
                </View>

            </View>

        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

);

const styles = formPageStyles
