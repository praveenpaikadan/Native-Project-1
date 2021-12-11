import * as React from "react";
import { View, TextInput, Text, Keyboard, ActivityIndicator } from "react-native";
import { KeyboardHideOnTouchOutside } from "../components/keyboard-responsive";
import { CreateAccountGraphics } from "../assets/svgs/svg-graphics";
import { ButtonType1 } from "../components/buttons";
import { formPageStyles } from "../styles/form-pages-styles";
import { checkEmail, postNewUserData } from "../utilities/data-center";
import flash from '../utilities/flash-message';
import { VerificationModal } from "./modal/verify";


export default CreateAccountScreen = ({ navigation }) => {

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [password2, setPassword2] = React.useState("")
  const [passwordOK, setPasswordOK] = React.useState(false)

  const [validationMessage, setValidationMessage] = React.useState("")
  const [validationColor, setValidationColor] = React.useState(false)

  const [isLoading, setIsLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false)
  
  const [firstSubmit, setFirstSubmit] = React.useState(true)

  const emailValidation = (value) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(value) !== true) {
      return false
    }
    return true
  };
  
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

  const handleSuccessfulVerification = (code) => {
    console.log('Verification Succesfull')
    let userData = {name: name, email: email, password: password, code: code}
    flash(`Hi ${name}, We need some more details to complete your registration`, 'success', time=4000)
    navigation.navigate("Gender", {userData});
  } 

  const buttonClickHandler = (fromModal=false) => {  

    if(!firstSubmit){
      if(fromModal){
        setModalVisible(true)
        return
      }else{
        null
      }
    }

    setName(name.trim())
    setEmail(email.trim())
    
    //check 1
    if(name == "" || email =="" || password == "" || password2 == ""){
      setValidationMessage('All fields are required')
      return
    }

    //check 2
    if(!emailValidation(email)){
      setValidationMessage('You have entered an invalid Email');
      return 
    }

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

    // once validation is over
    setValidationColor(false)
    setValidationMessage("")
    setIsLoading(true)

    checkEmail({user: name, email:email, })
    .then(res => {
      if(res.status == 409){
        flash(res.data.errorMessage, 'danger', time=10000)
        setValidationMessage('Try with a different Email.')
      }else if(res.status == 200){
        setFirstSubmit(false)
        setModalVisible(true)
      }else if(res.status === 101){
          flash('Oops Something Happened ...Please check your Internet', 'danger', time=10000)
          setIsLoading(false)
      }
      setIsLoading(false)
    })

    .catch(error =>{
      console.log(error)
    })
  };




  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  return (
    <KeyboardHideOnTouchOutside>
      <View style={styles.container}>
        <View style={styles.headerGraphicsContainer}>
          <CreateAccountGraphics style={styles.graphics} />
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
              value={name}
              onChangeText={(value) => {setName(value); setFirstSubmit(true)}}
            />

            <TextInput
              placeholder="Email"
              style={styles.textInput}
              keyboardType="email-address"
              value={email}
              onChangeText={(value) => {setEmail(value); setFirstSubmit(true)}}
            />
            
            
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
              text={"SIGN UP"}
              disabled={isLoading ? true : false}
              isLoading={isLoading}
              onClick={buttonClickHandler}
            />
          </View>

          {isKeyboardVisible?<></>:<View style={styles.footContainer}>
            <Text style={styles.footText1}>Already have an account?</Text>
            <Text
              style={styles.footText2}
              onPress={() => navigation.navigate("SignIn")}
            >
              Sign In
            </Text>
          </View>}
        </View>

        <VerificationModal 
            visible={modalVisible}
            setVisible={setModalVisible}
            data={{email: email, }}
            resendCode={() => buttonClickHandler()}
            isLoading={isLoading}
            navigation={navigation}
            successHandler={handleSuccessfulVerification}
            firstSubmit={firstSubmit}
            />
      </View>
    </KeyboardHideOnTouchOutside>
  );
};

const styles = formPageStyles;
