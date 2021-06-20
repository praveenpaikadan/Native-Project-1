import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles, themeColors } from '../styles/global-styles';
import { CreateAccountGraphics } from '../assets/svgs/svg-graphics';
import { ButtonType1 } from '../components/buttons';


export default CreateAccountScreen = () => (
    <View style={styles.container}>
        
        <View style={styles.headerGraphicsContainer}>
            <CreateAccountGraphics style={styles.graphics} />
            <View style={styles.heading}>
                <Text style={styles.mainHeading}>Create Account</Text>
                <Text style={styles.subHeading}>Welcome Onboard!</Text>
            </View>
        </View>

        <View style={styles.formContainer}>
            
            {/* form component inside */}
            
            <ButtonType1 text={"SIGN UP"}/>
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
);

const styles = StyleSheet.create({

    container:{
        ...globalStyles.formPageContainer,
        backgroundColor: themeColors.primary2,
    },
    
    headerGraphicsContainer:{
        width:'100%',  
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
        ...globalStyles.formContainer
    },

    footContainer:{
        ...globalStyles.formPageFootContainer
    },

    footText:{
        ...globalStyles.formPageFootText
    }

})
