import * as React from 'react';
import { View,TextInput,Text } from 'react-native';
import { KeyboardHideOnTouchOutside } from '../components/keyboard-responsive';

import { ForgetPasswordGraphics } from '../assets/svgs/svg-graphics';
import { ButtonType1 } from '../components/buttons';
import { formPageStyles } from '../styles/form-pages-styles';


export default ForgotPasswordScreen = () => (
    
        <KeyboardHideOnTouchOutside>

            <View style={styles.container}>
                <View style={styles.headerGraphicsContainer}>
                    <ForgetPasswordGraphics style={{width:'100%'}} />
                    <View style={styles.heading}>
                        <Text style={styles.mainHeading}>Forgot Password?</Text>
                        <Text style={styles.subHeading}>Don’t worry we’ll help you</Text>
                        <Text style={styles.subHeading}>reset your password</Text>
                    </View>
                </View>

            
                <View style={styles.contentContainer}>
                    <View style={styles.formContainer}>
                        {/* form component inside */}
                        <TextInput placeholder="Email" style={styles.textInput} />
                        <ButtonType1 styling={styles.submitButton} text={"CONFIRM"}/>
                    </View>
                    
                    <View style={styles.footContainer}>
                        <Text style={styles.footText1}>
                        </Text>
                        <Text style={styles.footText2}> Sign In</Text>
                    </View>     
                </View>

            </View>
                
        </KeyboardHideOnTouchOutside>
);


const styles = formPageStyles