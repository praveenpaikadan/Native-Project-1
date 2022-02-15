import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, View, Text, BackHandler } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { Header } from '../components/header';
import { Spinner1 } from '../components/loading-spinner';
import { SubHeader } from '../components/subheader';
import { WorkoutContext } from '../components/workout-context';
import { themeColors, sc, globalFonts } from '../styles/global-styles';
import { BASE_URL } from '../utilities/api';
import { Alert } from './modal/alert';

export default function PaymentPage({navigation, route}) {

  var data = route.params.data
  var type = route.params.type // new: for fresh, renew: for renewel

  const [warningOn, setWarningOn] = useState(false);
  const [paymentCompletePageReached, setPaymentCompletePageReached] = useState(false)
  const {downloadAndSetCredentialsAndWorkoutDataAfterSubscribe} = useContext(WorkoutContext)

  var payload = {} 
  for(let i in data){
    if(i !== "description"){
      payload[i] = data[i]
    }
  }



  const handleGoToHomeAfterPayment = () => {
    navigation.navigate('Home')
  }

  // back button press handler
  useEffect(() => {

    const backAction = () => {
        if(!paymentCompletePageReached){
          setWarningOn(true)
          return true
        }else{
          handleGoToHomeAfterPayment()
          return true
        }  
      }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();

  })


  payload.type = type
  const [token, settoken] = useState(null)

  var payload = JSON.stringify(payload)

  useState(() => {
    AsyncStorage.getItem('authToken')
    .then((token) => {
      settoken(token)
    })
  }, [])
 
  const [loading, setLoading] = useState(true)

  if(!token){
    return <View style={{display: loading? 'flex':'none', alignItems: 'center', justifyContent:'center',...styles.contentContainer}}>
    <Spinner1 text={'Please wait while \nloading your order details...'} /> 
  </View> 
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />

      <View style={{display: loading? 'flex':'none', alignItems: 'center', justifyContent:'center',...styles.contentContainer}}>
        <Spinner1 text={'Please wait while \nloading order details ..'} /> 
      </View>

      <View style={{display: loading? 'none':'flex', ...styles.contentContainer}}>
          <WebView 
          style={styles.container}
          source={{ uri: BASE_URL + '/payment/payment-page', headers: {'x-access-token' : token, 'x-access-ver': payload}}}
          onMessage={(message) => {
            if(message.nativeEvent.data === "go_to_home"){
              handleGoToHomeAfterPayment()
            }else if(message.nativeEvent.data === "payment_success"){
              setPaymentCompletePageReached(true)
              downloadAndSetCredentialsAndWorkoutDataAfterSubscribe()
            }
          }}
          onLoadEnd={() => {console.log('loading end');setLoading(false)}}
          scalesPageToFit={true}
          scrollEnabled={false}
          javaScriptEnabled={true}
          />    
      </View>

      <Alert 
        visible={warningOn} 
        message={'Are you sure to abort payment?'}
        yesHandler={() => {navigation.goBack()}}
        noHandler={() => {setWarningOn(false)}}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    contentContainer: {
      flex: 1,
      width: "100%",
    },
}); 
