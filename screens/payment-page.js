import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { themeColors, sc, globalFonts } from '../styles/global-styles';
import { BASE_URL } from '../utilities/api';

export default function PaymentPage({data}) {

  console.log(data)


  
  var payload = JSON.stringify({data})

  const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator color={themeColors.primary1} size="large"/>
      <Text style={styles.loadingText}>  Loading ...</Text>
    </View> 
  )


    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(null)

    useEffect(() => {
         AsyncStorage.getItem('authToken')
        .then((token) => {
        console.log("............ ", token)
          setToken(token)
          
        })
        .catch(() => {})
    }, [])

    if(!token){
      return <Spinner/>
    }
    
  return (
    <View style={{width: '100%', height: '100%', position: 'relative'}}>

        <WebView 
        style={styles.container}
        source={{ uri: BASE_URL + '/payment/payment-page', headers: {'x-access-token' : token, 'x-access-ver': payload}}}
        onMessage={(message) => {console.log(message)}}
        onLoadEnd={() => {setLoading(false)}}
        />    
        {loading?<Spinner />:null}
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
