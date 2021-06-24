import { StyleSheet } from "react-native"
import { Dimensions } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const sc = windowWidth/360

export const themeColors = {
    primary1: '#FF4C00', //Orange
    primary2: '#E6E8EC', //white - grey
    secondary1: '#000',  //black
    secondary2: '#fff',  //white
    tertiary1: '#434343', //grey
    tertiary2: '#DFDEDE', //light grey
    tertiary3:'#C4C4C4', //medium grey
}

export const globalFonts = {
    primaryLight:'ubuntu-light',
    primaryRegular:'ubuntu-regular',
    primaryMedium:'ubuntu-medium',
    primaryBold:'ubuntu-bold',
}

export const globalFontSize = { 
    content: 12*sc
}


export const globalStyles = StyleSheet.create({
    container: {
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    }
})