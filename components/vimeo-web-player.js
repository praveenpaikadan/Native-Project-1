
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, View, Text, Animated, Dimensions, Modal, BackHandler } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { themeColors, sc, globalFonts } from '../styles/global-styles';
import { ButtonType1 } from './buttons';

export default function VimeoWebPage({embedString, fullScreen, setFullScreen, secondButton}) {

  // second button : {text : 'abc', action : () => {}}

  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  
  // const [dynamicHeight, setDynamicHeight] = useState(screenWidth)
  const [dynamicHeight, setDynamicHeight] = useState(250)
  const [dynamicWidth, setDynamicWidth] = useState(screenHeight)
  const [backgroundColor, setBackgroundColor] = useState('white')
  // console.log({screenWidth: screenWidth, screenHeight: screenHeight})

  const webViewRef = useRef();

 
  useEffect(() => {
    const backAction = () => {
      if(fullScreen){
        setFullScreen(false)
        return true
      }else{
        return false
      }
      
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();

  })



  var html = `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <title>Personal Trainer</title>
  </head>
  <style>

  *{
    box-sizing: border-box;
  }

  .messageText{
    display:block;
    color: white;
    margin: auto;
    font-size: 12px;
    width:100%;
    font-weight: 100;
    vertical-align: middle;
    text-align: center;
    padding-top: 80px;
    padding-bottom: 80px;
  }

  iframe{
    width: 100%;
  }
  </style>

  <body style="margin:0; padding:0; background-color: black;">
    <div>
    ${embedString}
    <div>

    <script>
      var body = document.getElementsByTagName("div")[0];
      function outputsize() {
        window.ReactNativeWebView.postMessage(JSON.stringify({height: body.offsetHeight, width: body.offsetWidth}))
      }
      outputsize()
      new ResizeObserver(outputsize).observe(body);

      function isInternetConnected(){
        return navigator.onLine; 
      }

      function checkAndHandleInternetConnectivity() {
        if(!isInternetConnected()){
          // body.innerHTML = ${"<h1 class=${'messageText'}>No network. Tap to try again</h1>"};
          body.innerHTML = '<h1 class="messageText">No network. Tap to try again</h1>';
          body.addEventListener("click", () => {
            window.ReactNativeWebView.postMessage(JSON.stringify({rerender: 1}))
          });
        }
      }

      checkAndHandleInternetConnectivity()

    </script>

  </body>
  </html>`


  const handleDivSizeChange = (data) => {
    if(!webViewRef){
      return
    }
    setBackgroundColor('black')
    if(data.height > screenWidth && fullScreen){
      setDynamicWidth(data.width*screenWidth/data.height)
    }else{
      setDynamicHeight(data.height)
    }
  }

  const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator color={themeColors.primary1} size="large"/>
      <Text style={styles.loadingText}>  Loading ...</Text>
    </View> 
  )


  const nonFsStyle = {
    outer: {width: '100%', height: dynamicHeight + 27*sc, backgroundColor: backgroundColor},
    inner: {width: '100%', height: dynamicHeight, backgroundColor: backgroundColor},
    subInner: {width: '100%', height: dynamicHeight, backgroundColor: backgroundColor}
  }

  const fsStyle = {
    outer: {top: 0, left: 0, width: screenWidth, height: screenHeight},
    inner: {backgroundColor: backgroundColor, height: '100%', justifyContent:'center', alignItems:'center'},
    subInner: {
      backgroundColor: backgroundColor,
      width: dynamicWidth>screenHeight? screenHeight: dynamicWidth,
      height: dynamicHeight>screenWidth? screenWidth: dynamicHeight,
      transform:[{rotateZ:'-90deg'}],
    }
  }

  const goFullScreen = () => {
    setFullScreen(true)
  }

  const [loading, setLoading] = useState(true)
  const [exitButtonVisible, setExitButtonVisible] = useState(false)

  const timerRef = useRef(null);
  const handleExitButtonVisible = () => {
    console.log('taped')
    setExitButtonVisible(!exitButtonVisible)
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setExitButtonVisible(false)
    }, 3000)
  }

  const ExitFSButton = () => {
    var height = 30*sc
    
    return(
    <View style={{position:'absolute', opacity: 0.6, left: 0, top: screenHeight/2, transform: [{translateY: -height/2}, {rotateZ: '-90deg'}]}} >

      <ButtonType1 
        text={'Exit Full Screen'}
        textStyling={{fontSize: 10*sc}}
        styling={{height: height, minWidth: 0}}
        subContainerStyling={{padding: 10*sc, paddingTop: 10*sc, paddingBottom: 10*sc, alignSelf: 'center'}}
        arrow={false}
        onClick={() => {setFullScreen(false)}}
      />
    </View>
  )}


  return (
    <View style={!fullScreen?nonFsStyle.outer: fsStyle.outer}>
      <View style={!fullScreen?nonFsStyle.inner:fsStyle.inner}>
      <View style={!fullScreen?nonFsStyle.subInner:fsStyle.subInner}>
          <WebView 
              ref={(ref) => webViewRef.current = ref}
              onTouchEnd={() => {handleExitButtonVisible()}}
              source={{ html:html}}
              bounces={false}
              onMessage={(message) => {
                var data = JSON.parse(message.nativeEvent.data)
                console.log(data)
                if(data.rerender === 1){
                  webViewRef.current.reload();
                }
                if(data.height !== undefined && data.width !== undefined){
                  handleDivSizeChange(data)
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
        {fullScreen && exitButtonVisible?<ExitFSButton />: null}
      </View>
      <View style={styles.buttonContainer}>
      <View style={styles.singleButton}>
        <ButtonType1 
          text={"Go Fullscreen"}
          styling={{width:'100%', borderRadius:0}}
          textStyling={{fontSize: 10*sc}}
          arrow={false}
          small={20*sc}
          subContainerStyling={{paddingBottom:4*sc,paddingTop:4*sc}}
          onClick={() => {goFullScreen()}}
        />
      </View>
      {secondButton?<View style={styles.singleButton}>
        <ButtonType1 
          text={secondButton.text}
          styling={{width:'100%', borderRadius:0, marginLeft: 1*sc}}
          textStyling={{fontSize: 10*sc}}
          arrow={false}
          small={20*sc}
          subContainerStyling={{paddingBottom:4*sc,paddingTop:4*sc}}
          onClick={() => {secondButton.action()}}
        />
      </View>:null}
      </View>
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
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    singleButton: {
      flex: 1,
    }
}); 
