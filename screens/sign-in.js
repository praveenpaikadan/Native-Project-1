import * as React from "react";
import { View, TextInput, Text, ActivityIndicator } from "react-native";
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

  const {setLoggedIn, resetCredentials} = React.useContext(AuthContext)
  const {resetWorkoutData, makeDayWorkout} = React.useContext(WorkoutContext)
  const [errorMessage, setErrorMessage] = React.useState("");
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);


  const emailChangeHandler = (value) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setUserInfo({ ...userInfo, email: value });
  };

  const passwordChangeHandler = (value) => {
    setUserInfo({ ...userInfo, password: value });
  };

  const buttonPressHandler = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(userInfo.email) === true) {
      setErrorMessage(null);
    } else {
      setErrorMessage("Inavalid Email/Password");
      return
    }

    setIsLoading(true)
    loginUser(userInfo)
    .then((response) => {
        console.log(response.status, response.data)
        switch (response.status) {
          case 200:
            resetCredentials(response.data)
            .then(() => {
              getWorkoutData()
              .then((response) =>{ 
                if(response.data){

                  // console.log('workoutData received after signIn, ', response.data)
                  resetWorkoutData(response.data)
                  makeDayWorkout(response.data, null)
                }
              })})

            var user = response.data
            console.log(user)
            
            flash(`Welcome ${user.name}`, 'success', time=4000)
            setLoggedIn(true)
            break;
          case 401:
            flash('Authorization failed. Check your credentials', 'danger', time=10000)
            break;
          case 101:
            flash('Oops Something Happened ...Please check your Internet and try again', 'danger', time=10000)
            break;
          default:
            if(response.data.message){
              flash(response.data.message, 'info')
            }
            break; 
          }
      setIsLoading(false)
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
            <Text style={{}}>Forgot your Password ?</Text>
          </View>
        </View>
      </View>
    </KeyboardHideOnTouchOutside>
  );
};

const styles = formPageStyles;
