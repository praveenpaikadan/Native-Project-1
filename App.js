import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './screens/splash-screen';
import GetStartedScreen from './screens/get-started';
import {globalStyles} from './styles/global-styles';

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
              <GetStartedScreen />
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
