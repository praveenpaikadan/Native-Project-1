import { StyleSheet } from "react-native"


export const themeColors = {
    primary1: '#FF4C00', //Orange
    primary2: '#E6E8EC', //white - grey
    secondary1: '#000',  //black
    secondary2: '#fff',  //white
    tertiary1: '#434343', //grey
    tertiary2: '#DFDEDE', //light grey
}

export const globalFonts = {

}

export const globalStyles = StyleSheet.create({
    container: {
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },

    formPageContainer:{
        flex:1,
        width:'100%',
    },

    formPageMainHeading:{
        fontFamily:'ubuntu-medium',
        letterSpacing:2,
        fontSize:34,    //font size
    },

    
    formPageSubHeading:{
        fontFamily:'ubuntu-bold',
        letterSpacing:2,
        fontSize:20,    //font size
        opacity:0.8,
    },

    formContainer:{
        flex:1,
        padding:15, 
        justifyContent:'space-between',
        marginLeft:15,
        marginRight:15,
        borderRadius:10,   
    },

    formPageFootContainer:{
        flexDirection:'row',
        padding:25,
        alignItems:'center',
        justifyContent:'center',
    },

    formPageFootText:{
        fontFamily:'ubuntu-regular',
        opacity:0.7,
    },
    formTextInput: {
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 5,
    },



});
