import * as React from 'react';
import { View,TextInput,Text } from 'react-native';
import { KeyboardHideOnTouchOutside } from '../components/keyboard-responsive';
import { ResetPasswordGraphics } from '../assets/svgs/svg-graphics';
import { ButtonType1 } from '../components/buttons';
import { formPageStyles } from '../styles/form-pages-styles';


export default ResetPasswordScreen = () => (
    
        <KeyboardHideOnTouchOutside>
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
                        <ButtonType1 styling={styles.submitButton} text={"RESET"}/>
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