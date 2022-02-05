import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { themeColors, sc, globalFonts } from '../styles/global-styles';
import { BASE_URL } from '../utilities/api';

export default function PaymentPage({navigation, route}) {

  var data = route.params.data
  var type = route.params.type // new: for fresh, renew: for renewel

  var payload = {} 
  for(let i in data){
    if(i !== "description"){
      payload[i] = data[i]
    }
  }

  const handleGoToHomeAfterPayment = () => {
    console.log('go_to_home')
  }

  payload.type = type
  const [token, settoken] = useState(null)

  var payload = JSON.stringify(payload)

  const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator color={themeColors.primary1} size="large"/>
      <Text style={styles.loadingText}>  Loading ...</Text>
    </View> 
  )

  useState(() => {
    AsyncStorage.getItem('authToken')
    .then((token) => {
      settoken(token)
      setLoading(false)
    })
  }, [])
 
  const [loading, setLoading] = useState(true)

  if(loading){
    return <Spinner />
  }

  return (

    <View style={{width: '100%', height: '100%'}}>
        <WebView 
        style={styles.container}
        source={{ uri: BASE_URL + '/payment/payment-page', headers: {'x-access-token' : token, 'x-access-ver': payload}}}
        onMessage={(message) => {if(message.nativeEvent.data === "go_to_home"){handleGoToHomeAfterPayment()}}}
        onLoadEnd={() => {console.log('loading end');setLoading(false)}}
        scalesPageToFit={true}
        scrollEnabled={false}
        javaScriptEnabled={true}
        
        />    
        {/* {loading?<Spinner />:null} */}
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
    loadingText: {
      marginTop: 10*sc,
      fontFamily: globalFonts.primaryLight
    },
    activityContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: 'transparent',
      height: '100%',
      width: '100%'
    }
}); 
