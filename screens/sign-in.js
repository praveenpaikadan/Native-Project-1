import * as React from 'react';
import { View,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Keyboard, } from 'react-native';
import { globalStyles, themeColors } from '../styles/global-styles';
import { SignInGraphics } from '../assets/svgs/svg-graphics';
import { ButtonType1 } from '../components/buttons';


export default SignInScreen = () => (
    

    <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.container}>
                <View style={styles.headerGraphicsContainer}>
                    <SignInGraphics style={{width:'100%'}} />
                    <View style={styles.heading}>
                        <Text style={styles.mainHeading}>Welcome back !</Text>
                        <Text style={styles.subHeading}>Start tracking your fitness</Text>
                    </View>
                </View>

            
                <View style={styles.contentContainer}>
                    <View style={styles.formContainer}>
                        {/* form component inside */}
                        <TextInput placeholder="Email/Username" style={styles.textInput} />
                        <TextInput placeholder="Password" style={styles.textInput} />        
                        <ButtonType1 styling={{...styles.submitButton}} text={"SIGN IN"}/>
                    </View>

                    

                    <View style={styles.footContainer}>
                        <Text style={{
                            ...styles.footText,
                            color:themeColors.primary1,
                            
                            }}>
                            Forgot your Password ? 
                        </Text>
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
