import * as React from "react";
import { View, TextInput, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { KeyboardHideOnTouchOutside } from "../components/keyboard-responsive";
import { SignInGraphics } from "../assets/svgs/svg-graphics";
import { ButtonType1 } from "../components/buttons";
import { formPageStyles } from "../styles/form-pages-styles";
import { sc, themeColors } from "../styles/global-styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../components/auth-context";
import { WorkoutContext } from "../components/workout-context";
import { getWorkoutData, loginUser } from "../utilities/data-center";
import flash from '../utilities/flash-message'


export default SignInScreen = ({navigation}) => {

  const {setLoggedIn, resetCredentials, uploadPendingWorkout} = React.useContext(AuthContext)
  const {resetWorkoutData, makeDayWorkout, downloadAndSetWorkoutData, setWorkoutDataLoaded} = React.useContext(WorkoutContext)
  const [errorMessage, setErrorMessage] = React.useState("");
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  React.useState(() => {
    uploadPendingWorkout()
  }, [])


  const emailChangeHandler = (value) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setUserInfo({ ...userInfo, email: value });
  };

  const passwordChangeHandler = (value) => {
    setUserInfo({ ...userInfo, password: value });
  };

  const buttonPressHandler = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(userInfo.email) === true || userInfo.password != '') {
      setErrorMessage(null);
    } else {
      setErrorMessage("Invalid Email/Password");
      return
    }

    setIsLoading(true)
    loginUser(userInfo)
    .then(async (response) => {
        switch (response.status) {
          case 200:
            await resetCredentials(response.data)
            var result = await downloadAndSetWorkoutData()
            if(result){
              setWorkoutDataLoaded(1)
            }else{
              setWorkoutDataLoaded(-1)
            }
            break;
          case 401:
            flash('Authentication failed. Check your credentials', 'danger', 10000)
            setIsLoading(false)
            break;
          case 101:
            flash('Oops Something Happened ...Please check your Internet and try again', 'danger', 10000)
            break;
          default:
            if(response.data.message){
              setIsLoading(false)
              flash(response.data.message, 'info')
            }
            break; 
          }
    })
    
  };

  return (
    <KeyboardHideOnTouchOutside>
      <View style={styles.container}>
        <View style={styles.headerGraphicsContainer}>
          <SignInGraphics style={{ width: "100%" }} />
          <View style={styles.heading}>
            <Text style={styles.mainHeading}>Welcome back !</Text>
            <Text style={styles.subHeading}>Start tracking your fitness</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
            {/* form component inside */}
            <Text style={styles.errorText}>{errorMessage}</Text>
            <TextInput
              placeholder="Email"
              style={{ ...styles.textInput, marginBottom: 15 * sc }}
              onChangeText={emailChangeHandler}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={passwordChangeHandler}
            />
            <ButtonType1
              styling={{ ...styles.submitButton }}
              arrow={isLoading ? false : true}
              disabled={isLoading ? true : false}
              text={"SIGN IN"}
              isLoading={isLoading}
              onClick={buttonPressHandler}
            />
          </View>

          <View style={styles.footContainer}>
            <Text style={styles.footText1}>Forgot Password? </Text>
            <Text
              style={styles.footText2}
              onPress={() => navigation.navigate("ResetPassword")}
            >
              Reset Password
            </Text>
            </View>
        </View>
      </View>
    </KeyboardHideOnTouchOutside>
  );
};

const styles = formPageStyles;
