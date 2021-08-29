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
import { loginUser } from "../utilities/data-center";
import flash from '../utilities/flash-message'

export default SignInScreen = () => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const { storedCredentials, setStoredCredentials } =
    React.useContext(AuthContext);
  const { storedWorkoutData, setStoredWorkoutData } =
    React.useContext(WorkoutContext);

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

    const data = {
      userId: 1,
      programId: 1,
      programName: "Muscle gain program",
      day: 16,
      target: "Shoulders, Legs, Calves",
      goal: "Muscle Building",
      level: "Intermediate",
      totalSets: 29,
      totalWorkoutTime: "01:30",
      exerciselist: [
        {
          exerciseId: "1",
          exerciseName: "Dumbbell Step Ups",
          targetSets: 3,
          targetReps: "8 - 12",
          sets: [
            { set: "01", weight: "", reps: "" },
            { set: "02", weight: "", reps: "" },
            { set: "03", weight: "", reps: "" },
          ],
          rest: "00:45",
        },
        {
          exerciseId: "2",
          exerciseName: "Barbell Shrug",
          targetSets: 4,
          targetReps: "8 - 12",
          sets: [
            { set: "01", weight: "", reps: "" },
            { set: "02", weight: "", reps: "" },
            { set: "03", weight: "", reps: "" },
            { set: "04", weight: "", reps: "" },
          ],

          rest: "00:30",
        },
        {
          exerciseId: "3",
          exerciseName: "Leg Extensions",
          targetSets: 3,
          targetReps: "8 - 12",
          sets: [
            { set: "01", weight: "", reps: "" },
            { set: "02", weight: "", reps: "" },
            { set: "03", weight: "", reps: "" },
          ],
          rest: "00:45",
        },
        {
          exerciseId: "4",
          exerciseName: "Standing Calf Raise",
          targetSets: 3,
          targetReps: "8 - 12",
          sets: [
            { set: "01", weight: "", reps: "" },
            { set: "02", weight: "", reps: "" },
            { set: "03", weight: "", reps: "" },
          ],
          rest: "01:00",
        },
      ],
      image1: require("../assets/images/Dumbbell-Step-Ups-1.jpg"),
      image2: require("../assets/images/Dumbbell-Step-Ups-2.jpg"),
    };

    setIsLoading(true)
    loginUser(userInfo)
    .then((response) => {
        console.log(response.status, response.data)
        switch (response.status) {
          case 200:
            var user = response.data
            console.log(user)
            flash(`Hurray... ${user.name}, You are Logged In`, 'success', time=4000)
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

  const persistLogin = (credentials) => {
    AsyncStorage.setItem("Credentials", JSON.stringify(credentials))
      .then(() => {
        setStoredCredentials(credentials);
      })
      .catch((error) => console.log(error));
  };

  const persistWorkoutData = (workOutData) => {
    AsyncStorage.setItem("WorkoutData", JSON.stringify(workOutData))
      .then(() => {
        setStoredWorkoutData(workoutdata);
      })
      .catch((error) => console.log(error));
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
