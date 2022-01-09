
import * as ScreenOrientation from 'expo-screen-orientation'
import { Dimensions, StyleSheet, BackHandler, ToastAndroid} from 'react-native'
import { Video } from 'expo-av'
import { setStatusBarHidden } from 'expo-status-bar'
import React, { useRef, useState, useContext } from 'react'
import VideoPlayer from 'expo-video-player'
import { AuthContext } from './auth-context'

export default VPlayer = ({ navigation, route }) => {

  var { link, notFullScreen } = route.params
  var {token } = useContext(AuthContext)
  var click = 0
  const [inFullscreen2, setInFullsreen2] = useState(false)
  const refVideo2 = useRef(null)
  const [width, setWidth] = React.useState(notFullScreen?360:Dimensions.get('window').width)
  const [height, setHeight] = React.useState(notFullScreen?200:Dimensions.get('window').height)
  
  React.useEffect(() => {

    const OrListner = ScreenOrientation.addOrientationChangeListener((listener) => {
        setWidth(Dimensions.get('window').width)
        setHeight(Dimensions.get('window').height)
      })

    return () => {ScreenOrientation.removeOrientationChangeListener(OrListner)}
  }, []);

  const handlebackButtonClick = async () => {
    var orientation = await ScreenOrientation.getOrientationAsync()
    
    if (orientation == 3){
      await ScreenOrientation.unlockAsync()
    }

    click = click + 1   
    if(click == 2){
      clearTimeout(timeout)
      await ScreenOrientation.unlockAsync()
      navigation.goBack()
      return
    }

    const timeout = setTimeout(function(){click = 0}, 2000)
    ToastAndroid.show("Press Again to go back...", ToastAndroid.BOTTOM);
    return false
  }

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handlebackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handlebackButtonClick);
    };
  }, []);


  return (
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: {
            uri: link,
            headers: {'X-Access-Token': token, accept: '*/*','accept-encoding': 'gzip, deflate, br',}
          },
        }}
        fullscreen={{
          inFullscreen: inFullscreen2,
          enterFullscreen: async () => {
            setStatusBarHidden(true, 'fade')
            setInFullsreen2(!inFullscreen2)
            var orientationEnter = await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
          },
          exitFullscreen: async () => {
            setStatusBarHidden(false, 'fade')
            setInFullsreen2(!inFullscreen2)
            var orientationExit = await ScreenOrientation.unlockAsync()
          },
        }}
        style={{
          videoBackgroundColor: 'black',
          height: height,
          width: width,
        }}

      />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  text: {
    marginTop: 36,
    marginBottom: 12,
  },
})
