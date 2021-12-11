import React, {useState, useRef} from 'react';
import { View,TextInput,Text } from 'react-native';
import { KeyboardHideOnTouchOutside } from '../components/keyboard-responsive';
import { ResetPasswordGraphics } from '../assets/svgs/svg-graphics';
import { ButtonType1 } from '../components/buttons';
import { formPageStyles } from '../styles/form-pages-styles';
import { VerificationModal } from './modal/verify';
import { checkEmail, resetPassword } from '../utilities/data-center';
import flashMessage from '../utilities/flash-message';


export default ResetPasswordScreen = ({navigation}) => {

    const [code, setCode] = useState('')
    const [verified, setVerified] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState(null)
    const [firstSubmit, setFirstSubmit] = useState(true)
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const [validationMessage, setValidationMessage] = useState("")
    const [validationColor, setValidationColor] = useState(false)
    const [passwordOK, setPasswordOK] = useState(false)

    const passwordValidation = (value) => {
        const reg = /^(?=.*[A-Za-z])(?=.*?[0-9])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!reg.test(value)) {
          return false
        }
        return true 
      };

    const confirmPasswordValidation = (value) => {
        if (password != value) {
            return false
        }
        return true
        };

    const handleSubmit = () => {
        //check 3
        if(!passwordValidation(password)){
            setValidationMessage('Password should have at least 8 charecters with atleast 1 letter (a-z, A-Z) and 1 number (0-9) and 1 symbol (!@#$%^&*())')
            return
        }
    
        //check 4
        if(!confirmPasswordValidation(password2)){
            setValidationMessage("Passwords do not Match")
            return 
        }

        setIsLoading(true)
        resetPassword({email: email, password: password, code: code})
        .then((response) => {
            
            if(exist){
                setIsLoading(false)
                if(response.status === 200){
                    if(response.data.success){
                        flashMessage(response.data.message, 'success', 5000)
                        navigation.navigate("SignIn")
                    }else{
                        flashMessage(response.data.message, 'danger', 8000)
                        if(response.data.redirect){
                            setVerified(false)
                            setCode(null)
                            setName(null)
                            setPassword(null)
                            setPassword2(null)
                        }
                    }
                }else{
                    flashMessage('Something Happened.Please check your internet and try again', 'danger', 4000)
                }
            }
                
        })
        .catch((error) => {
            flashMessage('Something Happened.Please try again', 'danger', 4000)
        })

    }


    const handlePasswordChange = (password) => {
        setPassword(password.trim()); 
        if(passwordValidation(password)){
            setValidationColor(true)
            setValidationMessage('Password Looks fine !!!')
            setTimeout((() => {setValidationMessage(''); setValidationColor(false) }), 2000)
            setPasswordOK(true)  
        }else{
            setValidationMessage('Note that Password should have at least 8 charecters with atleast 1 letter (a-z, A-Z),1 number (0-9) and 1 symbol (!@#$%^&*())');
            setPasswordOK(false)
        }
    }

        
    const handleConfirmPasswordChange = (password2) => {
        setPassword2(password2.trim())
        if(confirmPasswordValidation(password2)){
        setValidationColor(true)
        setValidationMessage('Password Matches !!!')
        setTimeout((() => {setValidationMessage(''); setValidationColor(false) }), 2000)
        }
    }
     

    const exist = useRef(null)

    const handleSuccessfulVerification = (code) => {
        flashMessage('Email verified !!!', 'success', 8000)
        setVerified(true)
        setCode(code)
    }

    const sendCode = (fromModal) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === true) {
            setValidationMessage(null);
        } else {
            setValidationMessage("Invalid Email");
            return
        }


        if(!firstSubmit){
            if(fromModal){
                null
            }else{
                setModalVisible(true)
                return
            }
        }

        setIsLoading(true)
        setFirstSubmit(false)
        checkEmail({email: email, shouldExist: true})
        .then((response) => {
            if(response.status === 200){
                if(exist){
                    if(response.data.success){
                        setModalVisible(true)
                        setName(response.data.name)
                        setIsLoading(false)
                    }else{  
                        flashMessage('This email id is not registered. Please enter correct email id', 'danger', 8000)
                        setValidationMessage('Email Not registered')
                        setIsLoading(false)
                    }
                }
            }else{
                if(exist){
                    flashMessage('Something happened, we were not able to confirm your email. Check your internet and try again', 'danger', 8000)
                    setIsLoading(false)
                }
            }    
        })
        .catch((error) => {
            flashMessage('Something happened. Check your internet and try again', 'danger', 8000)
            setIsLoading(false)
        })
    }
    


    return(
    
        <KeyboardHideOnTouchOutside>
            <View style={styles.container}>
                <View style={styles.headerGraphicsContainer}>
                    <ResetPasswordGraphics style={{width:'100%'}} />
                    <View style={styles.heading}>
                        <Text style={styles.mainHeading}>Reset Password.</Text>
                        <Text style={styles.subHeading}>{verified?
                        `Hi ${name?name:'user'} !\nYou can proceed to reset your password`:
                        'We need your registered email Id\nto reset password.'}</Text>
                    </View>
                </View>

            
                <View style={styles.contentContainer}>

                    {!verified?
                    
                    <View style={styles.formContainer}>
                        <TextInput placeholder="Enter your Registered Email" style={styles.textInput} onChangeText={(value) => {setEmail(value);setFirstSubmit(true)}}/>
                        <Text style={styles.errorText} >{validationMessage}</Text>
                        <ButtonType1 
                        styling={styles.submitButton} 
                        text={"NEXT"}
                        isLoading={isLoading}
                        onClick={() => sendCode()}
                        disabled={isLoading}
                        />
                    </View>
                    
                    :

                    <View style={styles.formContainer}>
                        {/* form component inside */}
                        <TextInput
                        placeholder="Password"
                        style={styles.textInput}
                        secureTextEntry={true}
                        value={password}
                        onFocus = {() => {handlePasswordChange(password)}}
                        onChangeText={handlePasswordChange}
                        onBlur= {() =>{setValidationMessage("")}}
                        />
                        
                        <TextInput
                        placeholder="Confirm Password"
                        style={{...styles.textInput, opacity: passwordOK?1:0.5}}
                        editable={passwordOK}
                        value={password2}
                        onChangeText={handleConfirmPasswordChange}
                        onBlur={() => {if(password2 != "" && password !="" ){
                                if(!confirmPasswordValidation(password2)){setValidationMessage('Passwords not Matching')}}}}
                        />
                        <Text style={{...styles.errorText, color: validationColor?'#006400':'red'}}>{validationMessage}</Text>

                        <ButtonType1

                        styling={styles.submitButton}
                        text={"SUBMIT"}
                        arrow={false}
                        disabled={isLoading}
                        isLoading={isLoading}
                        onClick={() => handleSubmit()}
                        />
                    </View>

                    }
                    
                    <View style={styles.footContainer}>
                        <Text style={styles.footText1}>
                        </Text>
                        <Text 
                        onPress={() => navigation.navigate("SignIn")}
                        style={styles.footText2}> Sign In</Text>
                    </View>     
                </View>

                <VerificationModal 
                    visible={modalVisible}
                    setVisible={setModalVisible}
                    data={{email: email}}
                    resendCode={() => sendCode(true)}
                    infoMessage={`Hi ${name?name:'user'}, we have send a verication code to ${email}. Enter the code to reset password.`}
                    isLoading={isLoading}
                    navigation={navigation}
                    successHandler={handleSuccessfulVerification}
                    firstSubmit={firstSubmit}
                />
            </View>
        </KeyboardHideOnTouchOutside>
);}


const styles = formPageStyles