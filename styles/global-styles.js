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
    primaryLight:'ubuntu-light',
    primaryRegular:'ubuntu-regular',
    primaryMedium:'ubuntu-medium',
    primaryBold:'ubuntu-bold',
}

export const globalFontSize = { 
    content: 12
    
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
        fontFamily:globalFonts.primaryRegular,
        letterSpacing:2,
        fontSize:34,    //font size
    },

    
    formPageSubHeading:{
        fontFamily:globalFonts.primaryBold,
        letterSpacing:2,
        fontSize:16,    //font size
        opacity:0.8,
    },

    formContainer:{
        flex:1,
        padding:10, 
        justifyContent:'space-between',
        borderTopRightRadius:15,
        borderTopLeftRadius:15,
        backgroundColor:themeColors.primary2, 
    },

    formPageFootContainer:{
        flexDirection:'row',
        padding:25,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:themeColors.primary2
    },

    formPageFootText:{
        fontFamily:globalFonts.primaryMedium,
        opacity:0.7,
    },

    formTextInput: {
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 10,
        marginTop: 10,
    },

    formSubmitButton:{
        marginTop:15,
        marginTop: 10,
        flex:2
    }

});
