import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { themeColors, sc, globalFonts } from "../../styles/global-styles";
import { ButtonType1 } from "../../components/buttons";
import React, {useState, useEffect, useRef} from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { checkEmail, verifyEmail } from "../../utilities/data-center";

export const  VerificationModal = ({visible, infoMessage, setVisible, data, resendCode, isLoading, successHandler, firstSubmit}) => {

    // isLoading is true when code is being send.

var timeDeley = 15 // time delay between codes

const [code, setCode] = useState('')
const [resendCodeTimer, setResendCodeTimer] = useState(timeDeley)
const [resetTimer, setResetTimer] = useState(true)
const [verifying, setVerifying] = useState(false)
const [message, setMessage] = useState('')

const exist = useRef(null)

const setFadingmessage = (message, time=2000) => {
    setMessage(message)
        setTimeout(() => {
            setMessage('')
        }, time)
}

const verifyCode = () => {
    if(code.length !== 6){
        setFadingmessage('Invalid Code')
        return
    }else{
        setVerifying(true)
        verifyEmail({email: data.email, code: String(code)})
        .then((response) =>{
            if(exist){
                if(response.status !== 200){
                    setFadingmessage('Something Happened, please check your internet and try again.', 10000)
                    setVerifying(false)
                }else{
                    var result = response.data.verified
                    if(result === 0){
                        setMessage('Code Expired. We have send a new code.')
                        resendCode()
                        setVerifying(false)
                    }else if (result === -1){
                        setMessage('Verification Failed. Please enter the correct code')
                        setVerifying(false)
                    }else if(result === 1){
                        setMessage('Verification Succesfull')
                        setVerifying(false)
                        setVisible(false)
                        successHandler(code)
                    }
                }
            }
           
        })
    }
}

useEffect(() => {
    if(exist){
        setCode('')
        setMessage('')
        setResetTimer(!resetTimer)
    }
}, [firstSubmit])

useEffect(() => {
    let time = timeDeley
    var interval = setInterval(() => {
        if(time >= 0){
            setResendCodeTimer(time)
            time= time - 1
        }else{
            clearInterval(interval)
            return
        }
    }, 1000)

    return () => {clearInterval(interval)}
}, [resetTimer])

  return (
    <Modal animationType='fade' transparent={true} visible={visible}>
      <View style={{...styles.overlay}}>
        <View style={styles.modalContainer}>
            <View style={{position: 'absolute', right: 20*sc, top: 15*sc}}>
                <TouchableOpacity style={{width: 30*sc, height: 30*sc, alignItems:'center', justifyContent: 'center'}} onPress={() => setVisible(false)}>
                    <FontAwesome5
                        name="window-close"
                        size={17*sc}
                        color={themeColors.primary1}
                    />    
                </TouchableOpacity>
            </View>

            <View style={styles.headingContainer}>
                <Text style={styles.heading}>{'Verification'}</Text>
            </View>
            <Text style={styles.text}>{infoMessage?infoMessage:`Please enter the verification code send to \n${data.email}`}</Text>
            <View style={styles.line}></View>
            <TextInput 
                dis
                value={code} 
                onChangeText={(value) => setCode(value)} 
                style={styles.codeInput}
                maxLength={6}
                keyboardType='number-pad'
                editable={!verifying}
                />
         
            <View style={styles.column}>
              <ButtonType1
                styling={styles.button1}
                isLoading={verifying}
                disabled={verifying}
                text={"Verify"}
                arrow={false}
                textStyling={styles.buttonText1}
                onClick={() => (verifyCode())}
                activityIndicatorSize={15*sc}
              />

            {message !== ''?<Text style={{...styles.text, fontSize:12*sc}}>{message}</Text>:null}

             {resendCodeTimer === 0?
             <TouchableOpacity
                disabled={isLoading}
                onPress={() => {
                    resendCode(true);  // fromModal = true
                    setResetTimer(!resetTimer)
                    setTimeout(() => {
                    })}}>
                  {<Text style={styles.resendCodeActive}>{!isLoading?'Resend code':'Sending ...'}</Text>}
              </TouchableOpacity>:
              <Text style={styles.resendCodeInactive}>{`Didn't receive code? Resend code in ${resendCodeTimer} seconds`}</Text>
              }
              
              {/* <ButtonType1
                styling={styles.button1}
                text={"NO"}
                arrow={false}
                textStyling={styles.buttonText1}
                onClick={() => noHandler()}
                disabled={yesLoading}
              /> */}
            </View>

            </View>
          </View>
    </Modal>
  );
};

const checkIconStyling = {
  color: themeColors.secondary2,
  size: 22 * sc,
};

const styles = StyleSheet.create({
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },


  modalContainer: {
    width: "90%",
    backgroundColor: themeColors.secondary2,
    padding: 20 * sc,
    borderRadius: 20*sc,
  },

  headingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 20 * sc,
    marginBottom: 10*sc
  },

  heading: {
    textAlign:'center',
    fontFamily: globalFonts.primaryBold,
    color: themeColors.tertiary1,
    marginVertical: 10 * sc,
    // letterSpacing: 0.5 * sc,
    fontSize: 16 * sc,
    lineHeight: 23 * sc,
    paddingHorizontal: 5*sc,
  },


  line: {
    width: "100%",
    height: 5 * sc,
    backgroundColor: themeColors.primary2,
    marginBottom: 15 * sc,
  },

  column: {
    alignItems:'center',
},

  button: {
    marginHorizontal: 70 * sc,
    marginVertical: 10 * sc,
  },

  buttonText: {
    fontSize: 15 * sc,
  },
  button1: {
    marginHorizontal: 2 * sc,
    width: 150*sc,
    marginVertical: 10 * sc,
  },

  buttonText1: {
    fontSize: 15 * sc,
  },
  text:{
    fontFamily:globalFonts.primaryLight,
    color:themeColors.tertiary1,
    marginVertical:5*sc,
    textAlign: 'center',
    letterSpacing:0.1*sc,
    fontSize:12*sc,
},
codeInput: {
    borderColor: themeColors.primary1,
    borderWidth: 2*sc,
    borderRadius: 15*sc,
    padding: 3*sc,
    width: 180*sc,
    alignSelf: 'center',
    paddingHorizontal: 20*sc,
    letterSpacing: 15*sc,
    textAlign:'center',
    
},
resendCodeActive:{
    marginTop: 6*sc,
        textAlign: 'center',
        opacity: 0.8,
        fontSize: 12*sc,
        fontFamily: globalFonts.primaryRegular,
    },

    resendCodeInactive:{
        marginTop: 6*sc,
        textAlign: 'center',
        opacity: 0.4,
        fontSize: 12*sc,
        fontFamily: globalFonts.primaryRegular,
}
});
