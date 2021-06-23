import * as React from 'react';
import { View,TextInput,Text } from 'react-native';
import { KeyboardHideOnTouchOutside } from '../components/keyboard-responsive';

import { SignInGraphics } from '../assets/svgs/svg-graphics';
import { ButtonType1 } from '../components/buttons';
import { formPageStyles } from '../styles/form-pages-styles'


export default SignInScreen = () => (
    

    <KeyboardHideOnTouchOutside>
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
    
                            
                            }}>
                            Forgot your Password ? 
                        </Text>
                    </View>     
                </View>

            </View>
        </KeyboardHideOnTouchOutside>
);


const styles = formPageStyles