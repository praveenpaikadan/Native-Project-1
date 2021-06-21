import * as React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { themeColors, globalFonts } from '../styles/global-styles';
import { ButtonType1 } from '../components/buttons';

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
                <ButtonType1 style={styles.submitButton} text={buttonText}/>
            </View>

            <View style={styles.footContainer}>
                <Text style={styles.footText}>
                    {footText1} 
                </Text>
                <Text style={{
                    ...styles.footText,
                    margin:2, 
                    color:themeColors.primary1,
                    fontFamily:globalFonts.primaryBold,
                    }}>{footText2}</Text>
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
        fontFamily:globalFonts.primaryRegular,
        letterSpacing:2,
        fontSize:34,    //font size
        color:themeColors.secondary2

    },
    subHeading:{
        fontFamily:globalFonts.primaryRegular,
        letterSpacing:0.5,
        fontSize:16,    //font size
        opacity:0.8,
        color:themeColors.secondary2


    },
    contentContainer:{
        width:'100%',
        alignItems:'center',
        position:'absolute',
        bottom:0,

    },
    formContainer:{
        flex:1,
        padding:10, 
        justifyContent:'space-between',
        borderTopRightRadius:15,
        borderTopLeftRadius:15,
        backgroundColor:themeColors.primary2, 
        width:'95%',
        paddingHorizontal:20,

    },
    textInput:{
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 10,
        marginTop: 10,
    },
    submitButton:{
        marginTop:15,
        marginTop: 10,
        flex:2
    },
    footContainer:{
        flexDirection:'row',
        padding:25,
        width:'95%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:themeColors.primary2,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        marginBottom:10,

    },
    footText:{
        fontFamily:globalFonts.primaryMedium,
        opacity:0.7,
    }


})
