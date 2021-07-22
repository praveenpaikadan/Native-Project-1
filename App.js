import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { View, StyleSheet, TextInput, Image, Text } from "react-native";
import SplashScreen from "./screens/splash-screen";
import GetStartedScreen from "./screens/get-started";
import CreateAccountScreen from "./screens/create-account";
import SignInScreen from "./screens/sign-in";
import ForgotPasswordScreen from "./screens/forgot-password";
import ResetPasswordScreen from "./screens/reset-password";
import AuthScreen from "./screens/auth-screen";
import {
  CreateAccountGraphics,
  ForgetPasswordGraphics,
} from "./assets/svgs/svg-graphics";
import GenderScreen from "./screens/gender-screen";
import { Header } from "./components/header";
import { TabMenu } from "./components/tab-menu";
import HeightWeightScreen from "./screens/height-weight-screen";
import ExerciseGuideScreen from "./screens/exercise-guide";
import ProgramDetails from "./screens/program-details";
import { BodyCalendar } from "./components/body-calendar";
import HomePage from "./screens/home-page";
import BuyNow from "./screens/buy-now";
import { BodyCalendarCurrent } from "./screens/modal/body-calender-current";
import { BodyCalendarOld } from "./screens/modal/body-calender-old";
import { BodyCalendarRest } from "./screens/modal/body-calendar-rest";
import { BodyCalendarFuture } from "./screens/modal/body-calendar-future";
import { MyWorkouts } from "./screens/modal/my-workouts";
import TrackingScreen from "./screens/tracking-screen";
import ExerciseScreen from "./screens/exercise-screen";
import ShowExerciseList from "./screens/showexerciselist";
import { SetCompleteModal } from "./screens/modal/set-complete";
import { WorkoutCompleteModal } from "./screens/modal/workout-complete";
import { HistoryCard } from "./screens/subscreens/history-list";
import workoutHistory from "./screens/workout-history";
import ProfileScreen from "./screens/profile-screen";
import EditProfileScreen from "./screens/edit-profile-screen";
import { EditProfileModal } from "./screens/modal/edit-profile";
import { AuthStack } from "./navigation/auth-stack";
import { AuthContext } from "./components/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getFonts = () => {
  Font.loadAsync({
    "ubuntu-light": require("./assets/fonts/Ubuntu-Light.ttf"),
    "ubuntu-regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
    "ubuntu-medium": require("./assets/fonts/Ubuntu-Medium.ttf"),
    "ubuntu-bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <View style={styles.appContainer}>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>

        {/* <EditProfileModal /> */}
        {/* <EditProfileScreen /> */}

        {/* <ProfileScreen /> */}
        {/* <WorkoutHistory /> */}
        {/* <HistoryCard /> */}
        {/* <WorkoutCompleteModal /> */}
        {/* <SetCompleteModal />  */}
        {/* <ShowExerciseList /> */}
        {/* <ExerciseScreen /> */}

        {/* <TrackingScreen /> */}

        {/* <BuyNow /> */}

        {/* <ProgramDetails /> */}

        {/* <ExerciseGuideScreen /> */}

        {/* <Header /> */}
        {/* <BodyCalendarCurrent /> */}
        {/* <BodyCalendarFuture /> */}
        {/* <BodyCalendarOld /> */}
        {/* <BodyCalendarRest /> */}
        {/* <MyWorkouts /> */}

        {/* <TabMenu /> */}

        {/* <HeightWeightScreen /> */}
        {/* <GenderScreen /> */}
        {/* <SplashScreen /> */}

        {/* <CreateAccountScreen /> */}

        {/* <SignInScreen /> */}

        {/* <ForgotPasswordScreen /> */}

        {/* <ResetPasswordScreen /> */}

        {/* <AuthScreen 
                key='CreateAccountScreen'
                graphics={<CreateAccountGraphics style={{width:'100%'}} />}
                fields={['Full Name','Email', 'Password', 'Confirm Password']}
                buttonText='SIGN UP'
                mainHeading='Create Account'
                subHeadings={['Welcome Onboard!']}
                footText1='Already have an account?'
                footText2='Sign In'
              /> */}

        {/* <GenderScreen /> */}

        {/* <HomePage /> */}
      </View>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: "center",
  },
});
