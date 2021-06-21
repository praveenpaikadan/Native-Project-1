import * as React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { globalStyles, themeColors } from '../styles/global-styles';
import { SignInGraphics } from '../assets/svgs/svg-graphics';
import { ButtonType1 } from '../components/buttons';


export default SignInScreen = () => (
    
    <View style={styles.container}>
        <View style={styles.headerGraphicsContainer}>
            <SignInGraphics style={styles.graphics} />
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
                <ButtonType1 style={styles.submitButton} text={"SIGN IN"}/>
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
