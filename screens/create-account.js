import * as React from 'react';
import { View,TextInput,Text } from 'react-native';
import { KeyboardHideOnTouchOutside } from '../components/keyboard-responsive';
import { CreateAccountGraphics } from '../assets/svgs/svg-graphics';
import { ButtonType1 } from '../components/buttons';
import { formPageStyles } from '../styles/form-pages-styles'

export default CreateAccountScreen = ({navigation}) => {
    const [user, setUser] = React.useState({name: '', email: '', password: '' })
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [emailValidationMessage, setEmailValidationMessage] = React.useState('');
    const [passwordValidationMessage, setPasswordValidationMessage] = React.useState('');
    const [confirmPasswordValidationMessage, setConfirmPasswordValidationMessage] = React.useState('');
    const [requiredValidationMessage, setRequiredValidationMessage] = React.useState('');
    
    

    const nameChangeHandler = (value) =>{
            setUser({...user, name:value})
    }
    const emailChangeHandler = (value) =>{
            setUser({...user, email:value});
            emailValidation(value)
            
    }
    const passwordChangeHandler = (value) =>{
            setUser({...user, password:value});
            passwordValidation(value)
    }
    const confirmPasswordChangeHandler = (value) =>{
            setConfirmPassword(value);
            confirmPasswordValidation(value);
    }

    const emailValidation =() =>{
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(user.email) === true){
            null;
            setEmailValidationMessage(null)
        }else{
            setEmailValidationMessage('Inavalid Email')
        }
    }
    const passwordValidation =(value) =>{
        const reg = /^(?=.*[A-Za-z])(?=.*?[0-9])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (reg.test(value) === true){
            null;
            setPasswordValidationMessage(null)
        }else{
            setPasswordValidationMessage('Use 8 or more alphanumeric characters with at least one symbol')
        }
    }
    const confirmPasswordValidation =(value) =>{
        if (user.password != value){
            setConfirmPasswordValidationMessage('Passwords doesn\'t match')
           
        }else{
            null;
            setConfirmPasswordValidationMessage(null)
        }
    }

    const buttonClickHandler = () =>{
        if(
            user.name === '' ||
            user.email === '' ||
            user.password === '' ||
            confirmPassword === ''

            ){
                setRequiredValidationMessage('All fields required');
            }else if(
                emailValidationMessage != null ||
                passwordValidationMessage != null ||
                confirmPasswordValidationMessage != null
            ){
                setRequiredValidationMessage('Invalid Input. Please check your entries');
            }else{
                setRequiredValidationMessage(null);
                navigation.navigate('Gender', user);
            }
            console.log(user)
    }
    return(
    <KeyboardHideOnTouchOutside >
        
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
                        <TextInput 
                        placeholder="Full Name" 
                        style={styles.textInput}
                        value={user.name}
                        onChangeText={nameChangeHandler} />
                        <Text style={styles.errorText}>{emailValidationMessage}</Text>
                        <TextInput 
                        placeholder="Email" 
                        style={styles.textInput}
                        keyboardType='email-address'
                        value={user.email}
                        onChangeText={emailChangeHandler}
                        onEndEditing={emailValidation} />
                        <Text style={styles.errorText}>{passwordValidationMessage}</Text>
                        <TextInput 
                        placeholder="Password" 
                        style={styles.textInput}
                        secureTextEntry={true}
                        value={user.password}
                        onChangeText={passwordChangeHandler} />
                        <Text style={styles.errorText}>{confirmPasswordValidationMessage}</Text>        
                        <TextInput 
                        placeholder="Confirm Password" 
                        style={styles.textInput}
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={confirmPasswordChangeHandler} />
                        <Text style={styles.errorText}>{requiredValidationMessage}</Text>
                        <ButtonType1 styling={styles.submitButton} text={"SIGN UP"} onClick={buttonClickHandler}/>
                    </View>

                   
                    <View style={styles.footContainer}>
                        <Text style={styles.footText1}>
                            Already have an account? 
                        </Text>
                        <Text style={styles.footText2} onPress={() => navigation.navigate('SignIn')}> 
                            Sign In
                        </Text>
                    </View>     
                </View>

            </View>

        </KeyboardHideOnTouchOutside>
)}

const styles = formPageStyles