import * as React from 'react';
import { View,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Button,
    Keyboard, } from 'react-native';
import { globalStyles, themeColors } from '../styles/global-styles';
import { SignInGraphics } from '../assets/svgs/svg-graphics';
import { ButtonType1 } from '../components/buttons';


export default SignInScreen = () => (
    
   
        <View style={{width:'100%',height:'100%'}}>    
            <View style={styles.headerGraphicsContainer}>
                <SignInGraphics style={styles.graphics} />
                <View style={styles.heading}>
                    <Text style={styles.mainHeading}>Welcome Back !</Text>
                    <Text style={{...styles.subHeading, fontSize:14}}>Start tracking your fitness</Text>
                </View>
            </View>
        
            <View style={styles.container}>
                
                <View style={styles.formContainer}>
                    {/* form component inside */}
                    <TextInput placeholder="Username" style={styles.textInput} />
                    <TextInput placeholder="Password" style={styles.textInput} />
                    <ButtonType1 text={"SIGN IN"}/>
                </View>

                <View style={styles.footContainer}>
                    <Text style={styles.footText}>
                        Already have an account? 
                    </Text>
                    <Text style={{
                        ...styles.footText,
                        margin:2, 
                        color:themeColors.primary1,
                        fontWeight:'bold',
                        }}> Sign In</Text>
                </View>
            </View>
        </View>
);

const styles = StyleSheet.create({

    container:{
        ...globalStyles.formPageContainer,
        backgroundColor: themeColors.primary2,
    },
    
    headerGraphicsContainer:{
        zIndex:-1000,
        width:'100%', 
        height: 360,
        backgroundColor:themeColors.primary2
    },
    
    graphics:{
        width:'100%'
    },

    heading:{
        position:'absolute',
        top:60,
        left:0,
        padding:30,
    },

    mainHeading:{
        ...globalStyles.formPageMainHeading,
        color:themeColors.secondary2,
    },
    subHeading:{
        ...globalStyles.formPageSubHeading,
        color:themeColors.secondary2,
        marginTop:5,
    },

    formContainer:{
        ...globalStyles.formContainer,
        backgroundColor:themeColors.primary2,
    },

    footContainer:{
        ...globalStyles.formPageFootContainer
    },

    footText:{
        ...globalStyles.formPageFootText
    },
    textInput: {
        ...globalStyles.formTextInput,
      },
})
