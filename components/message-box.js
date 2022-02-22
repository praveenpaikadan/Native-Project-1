import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { themeColors,sc, globalFonts} from '../styles/global-styles';
import { ButtonType1 } from './buttons';


// params = message, setReload, reloadbutton 
export const MessageBox1 = (props) => {
    return(
        (
            <View style={{...styles.messageBox, ...props.style}}>
                {props.children}
                <Text style={styles.text}>{props.message? props.message: 'Error' }</Text>
                
                {props.setReload?
                    props.reloadbutton?
                    <ButtonType1 
                    text='Retry'
                    onClick={() => props.setReload()}
                    arrow={false}
                    styling={{opacity: 0.9}}
                    textStyling={{fontSize: 15*sc}}

                    />:
                    <Ionicons style={styles.reload} name="reload-circle" size={50*sc} color={themeColors.primary1} onPress={() => props.setReload()}/>
                :<></>}
            </View>
            )
    )
} 

const styles = StyleSheet.create({
    messageBox:{
        // backgroundColor: 'pink',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        fontSize:30*sc,
        width:'80%', 
        height:'65%',
        alignSelf:'center'
    },

    text:{
        textAlign:'center',
        fontSize:15*sc,
        opacity:0.6,
        fontFamily: globalFonts.primaryLight,
        marginVertical:10*sc,
    },

    reload:{
        opacity: 0.6,
        paddingTop: 10*sc
    }

})