
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { themeColors, sc, globalFonts } from '../styles/global-styles';

export default function VimeoWebPage() {

  const [dynamicHeight, setDynamicHeight] = useState(150)
  var url = "https://www.youtube.com/watch?v=tYSrY4iPX6w"


  var html = `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <title>Personal Trainer</title>
  </head>
  <body style="margin:0; padding:0;">

    <script>
      var body = document.getElementsByTagName("body")[0];
      function outputsize() {
        window.ReactNativeWebView.postMessage(String(body.offsetHeight))
      }
      outputsize()
      new ResizeObserver(outputsize).observe(body)
    </script>

    <div style="padding:75% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/663959697?h=fdcc206bfe&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="sample-mp4-file"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
    
  </body>
  </html>`



  const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator color={themeColors.primary1} size="large"/>
      <Text style={styles.loadingText}>  Loading ...</Text>
    </View> 
  )

  const [loading, setLoading] = useState(true)

  return (
    <View style={{width: '100%', height: dynamicHeight, backgroundColor:'pink'}}>
        <WebView 
            source={{ html:html}}
            bounces={false}
            onMessage={(message) => {
              setDynamicHeight(Number(message.nativeEvent.data))
            }}
            onLoadEnd={() => {setLoading(false)}}
            scalesPageToFit={true}
            scrollEnabled={false}
            javaScriptEnabled={true}
            onNavigationStateChange={() => console.log('navigation state change')}
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
        alignItems: 'center',
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
