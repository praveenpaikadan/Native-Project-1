import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "../components/header";
import { StatusBar } from "expo-status-bar";
import WebView from "react-native-webview";
import { Spinner1 } from "../components/loading-spinner";
import { themeColors } from "../styles/global-styles";


// general component to load any public webpages
export default WebPage = ({ navigation, route }) => {

  const [loading, setLoading] = React.useState(true)

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <Header title={route.params.heading || 'Personal Trainer'} backButton={true} onPress={() => {navigation.goBack()}} onPressMenu={() => navigation.openDrawer()} />
      
      <View style={{display: loading? 'flex':'none', alignItems: 'center', justifyContent:'center',...styles.contentContainer}}>
        <Spinner1 /> 
      </View>

      <View style={{display: loading? 'none':'flex', ...styles.contentContainer}}>
        <WebView 
            style={styles.container}
            source={{ uri: route.params.url }}
            onMessage={(message) => {console.log(message)}}
            onLoadEnd={() => {setLoading(false)}}
            scalesPageToFit={true}
            scrollEnabled={false}
            javaScriptEnabled={true}
        />    
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1,
        width: "100%",
      },
    
})



