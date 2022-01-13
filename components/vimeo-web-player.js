
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Animated, Dimensions, Modal } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { themeColors, sc, globalFonts } from '../styles/global-styles';
import { ButtonType1 } from './buttons';
import { Spinner1 } from './loading-spinner';

export default function VimeoWebPage({embedString}) {

  const [dynamicHeight, setDynamicHeight] = useState(0)


//   var html = `<!DOCTYPE html>
//   <html lang="en">
//   <head>
//   <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
//     <title>Personal Trainer</title>
//   </head>
//   <style>
//   iframe {
//     display:block;
//     width:100%;
//     max-height: ${300*sc}px;
// }

//   </style>
//   <body style="margin:0; padding:0;">

//     <script>
//       var body = document.getElementsByTagName("body")[0];
//       function outputsize() {
//         window.ReactNativeWebView.postMessage(String(body.offsetHeight))
//       }
//       outputsize()
//       new ResizeObserver(outputsize).observe(body)
//     </script>

//     ${embedString}
    
//   </body>
//   </html>`


  var html = `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <title>Personal Trainer</title>
  </head>
  <style>

  iframe {
    display:block;
    width:100%;
}

  </style>
  <body style="margin:0; padding:0;">

    <script>
      var body = document.getElementsByTagName("body")[0];
      function outputsize() {
        window.ReactNativeWebView.postMessage(String(body.offsetHeight))
      }
      outputsize()
      new ResizeObserver(outputsize).observe(body)
    </script>

    ${embedString}
    
  </body>
  </html>`

  const goFullScreen = () => {

  }

  const getScaleFactor = (dynamicHeight) => {
    let xScale = Dimensions.get('window').height/Dimensions.get('window').width
    let yScale = Dimensions.get('window').width/dynamicHeight
    return 1

    console.log(dynamicHeight, xScale, yScale)
    return xScale<yScale?xScale:yScale
  }

  const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator color={themeColors.primary1} size="large"/>
      <Text style={styles.loadingText}>  Loading ...</Text>
    </View> 
  )

  const [loading, setLoading] = useState(true)

  return (
  //   <View style={{width: '100%', height: dynamicHeight + 36*sc}}>
  //     <View style={{width: '100%', height: dynamicHeight}}>
  //         <WebView 
  //             source={{ html:html}}
  //             bounces={false}
  //             onMessage={(message) => {
  //               console.log(message.nativeEvent.data)
  //               // setDynamicHeight(Number(message.nativeEvent.data) < 300?Number(message.nativeEvent.data):300)

  //               setDynamicHeight(Number(message.nativeEvent.data))
  //             }}
  //             onLoadEnd={() => {setLoading(false)}}
  //             scalesPageToFit={true}
  //             scrollEnabled={false}
  //             javaScriptEnabled={true}
  //             onNavigationStateChange={() => console.log('navigation state change')}
  //         />    
  //         {loading && dynamicHeight > 40*sc?<Spinner />:null}
  //   </View>
  //   <ButtonType1 
  //     text={"Go Fullscreen"}
  //     styling={{width:'100%', borderRadius:0}}
  //     textStyling={{fontSize: 10*sc}}
  //     arrow={false}
  //     small={20*sc}
  //     subContainerStyling={{paddingBottom:8*sc,paddingTop:8*sc}}
  //     onPress={() => {goFullScreen()}}
  //     />
  // </View>


// ==============================

    <Modal transparent={true}>
      <View style={{backgroundColor: 'yellow', height: '100%', justifyContent:'center', alignItems:'center'}}>
      <View style={{
      height: Dimensions.get('window').width * getScaleFactor(dynamicHeight) , 
      width: dynamicHeight * getScaleFactor(dynamicHeight),
      // transform:[{rotateZ:'-90deg'}, {scale: getScaleFactor(dynamicHeight)}],
      transform:[{rotateZ:'-90deg'}],
      
      
      }}>
          <WebView 
              source={{ html:html}}
              bounces={false}
              onMessage={(message) => {
                console.log(message.nativeEvent.data)
                // setDynamicHeight(Number(message.nativeEvent.data) < 300?Number(message.nativeEvent.data):300)
                if(Number(message.nativeEvent.data)> dynamicHeight){
                  setDynamicHeight(Number(message.nativeEvent.data))
                }
              }}
              onLoadEnd={() => {setLoading(false)}}
              scalesPageToFit={true}
              scrollEnabled={false}
              javaScriptEnabled={true}
              onNavigationStateChange={() => console.log('navigation state change')}
          />    
          {loading && dynamicHeight > 40*sc?<Spinner />:null}
    </View>
    {/* <ButtonType1 
      text={"Go Fullscreen"}
      styling={{width:'100%', borderRadius:0}}
      textStyling={{fontSize: 10*sc}}
      arrow={false}
      small={20*sc}
      subContainerStyling={{paddingBottom:8*sc,paddingTop:8*sc}}
      onPress={() => {goFullScreen()}}
      /> */}
      </View>
  </Modal>

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
