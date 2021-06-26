import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { View, StyleSheet, TextInput, Image, Text } from 'react-native';
import SplashScreen from './screens/splash-screen';
import GetStartedScreen from './screens/get-started';
import CreateAccountScreen from './screens/create-account';
import SignInScreen from './screens/sign-in';
import ForgotPasswordScreen from './screens/forgot-password';
import ResetPasswordScreen from './screens/reset-password';
import AuthScreen from './screens/auth-screen';
import { CreateAccountGraphics, ForgetPasswordGraphics } from './assets/svgs/svg-graphics';
import GenderScreen from './screens/gender-screen';
import { Header } from './components/header';
import { TabMenu } from './components/tab-menu';
import HeightWeightScreen from './screens/height-weight-screen';
import ExerciseGuideScreen from './screens/exercise-guide';
import ProgramDetails from './screens/program-details';
<<<<<<< HEAD
import HomePage from './screens/home-page';
=======
import BuyNow from './screens/buy-now';




>>>>>>> 7390188ebb35071b765c0543eeb1bc772720161f

const getFonts = () => Font.loadAsync({
  'ubuntu-light': require('./assets/fonts/Ubuntu-Light.ttf'),
  'ubuntu-regular': require('./assets/fonts/Ubuntu-Regular.ttf'),
  'ubuntu-medium': require('./assets/fonts/Ubuntu-Medium.ttf'),
  'ubuntu-bold': require('./assets/fonts/Ubuntu-Bold.ttf'),
});



export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    if(fontsLoaded){
         return(
             <View style={styles.appContainer}>

<<<<<<< HEAD
               {/* <ProgramDetails /> */}
=======
              
              
              <BuyNow />

              {/* <ProgramDetails /> */}
>>>>>>> 7390188ebb35071b765c0543eeb1bc772720161f

              {/* <ExerciseGuideScreen /> */}

              {/* <Header />         
              <TabMenu /> */}

              {/*<HeightWeightScreen />*/}
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

              
              <HomePage />


             </View>
         )
     } 
     else {
         return(
          <AppLoading 
              startAsync = {getFonts}
              onFinish ={() => setFontsLoaded(true)}
              onError={console.warn}
          />
         )
     }
  } 


const styles = StyleSheet.create({
  appContainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  }    
})
