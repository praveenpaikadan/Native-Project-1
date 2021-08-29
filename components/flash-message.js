import { StyleSheet } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import { globalFonts, themeColors, sc } from "../styles/global-styles";

function flashMessage(message, type='info', time=3000, autoHide=true){
    var color = type == 'success'?'#469946':type == 'danger'?"#FF0000":type=='info'? themeColors.primary1: 'grey' 
    console.log("Hai")
    showMessage({
        message: message,
        type: type,
        duration: time,
        icon:'auto',
        statusBarHeight: 14,
        style:{...styles.container, backgroundColor: color},
        textStyle: styles.text,
        floating: true,
        autoHide: autoHide
      });
}

export default flashMessage

const styles = StyleSheet.create({
    container : {
        borderBottomLeftRadius:10, 
        borderBottomRightRadius:10, 
        backgroundColor:themeColors.primary1, 
        elevation:5*sc,
        shadowOffset: { width:10*sc, height: 10*sc},
        shadowColor:'#333',
        shadowOpacity:0.3,
        shadowRadius: 5*sc,
    },
    text: {
        fontFamily:globalFonts.primaryMedium, 
    }
})