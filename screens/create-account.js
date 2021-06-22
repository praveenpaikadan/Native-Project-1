import * as React from 'react';
import { View,
    KeyboardAvoidingView,
    TextInput,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Keyboard, } from 'react-native';
import { CreateAccountGraphics } from '../assets/svgs/svg-graphics';
import { ButtonType1 } from '../components/buttons';
import { formPageStyles } from '../styles/form-pages-styles'

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
                        <Text style={styles.footText1}>
                            Already have an account? 
                        </Text>
                        <Text style={styles.footText2}> 
                            Sign In
                        </Text>
                    </View>     
                </View>

            </View>

            
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
);

const styles = formPageStyles