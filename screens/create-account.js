import * as React from 'react';
import { View,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Keyboard, } from 'react-native';
import { globalStyles, themeColors, globalFonts } from '../styles/global-styles';
import { CreateAccountGraphics } from '../assets/svgs/svg-graphics';
import { ButtonType1 } from '../components/buttons';


export default CreateAccountScreen = () => (
    

    <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
            <View style={styles.container}>
                <View style={styles.headerGraphicsContainer}>
                    <CreateAccountGraphics style={styles.graphics}/>
                    <View style={styles.heading}>
                        <Text style={styles.mainHeading}>Create Account</Text>
                        <Text style={styles.subHeading}>Welcome Onboard!</Text>
                    </View>
                </View>

            
                <View style={styles.contentContainer}>
                    <View style={styles.formContainer}>
                        {/* form component inside */}
                        <TextInput placeholder="Full Name" style={styles.textInput} />
                        <TextInput placeholder="Email" style={styles.textInput} />
                        <TextInput placeholder="Password" style={styles.textInput} />        
                        <TextInput placeholder="Confirm Password" style={styles.textInput} />
                        <ButtonType1 styling={styles.submitButton} text={"SIGN UP"}/>
                    </View>

                   
                    <View style={styles.footContainer}>
                        <Text style={styles.footText}>
                            Already have an account? 
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
        ...globalStyles.formPageContainer,
    },
    headerGraphicsContainer:{
        ...globalStyles.headerGraphicsContainer,
    },
    
    heading:{
        ...globalStyles.formPageHeadingContainer
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
        ...globalStyles.formPageContentContainer
    },

    formContainer:{
        ...globalStyles.formContainer,
        
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
