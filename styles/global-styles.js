import { StyleSheet } from "react-native"
import { Dimensions } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;


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
        width:'100%', 
        height:'100%', 
        backgroundColor:themeColors.primary2,
    },

    headerGraphicsContainer:{
        position:'absolute',
        top:0,
        left:0,
    },

    formPageHeadingContainer:{
        position:'absolute',
        top:80,
        left:30,

    },

    formPageMainHeading:{
        fontFamily:globalFonts.primaryRegular,
        letterSpacing:2,
        marginBottom:5,
        fontSize:34,    //font size
    },

    
    formPageSubHeading:{
        fontFamily:globalFonts.primaryRegular,
        letterSpacing:2,
        fontSize:16,    //font size
        opacity:0.8,
    },

    formPageContentContainer:{
        width:'90%',
        maxWidth: 400,
        alignSelf:'center',
        alignItems:'center',
        position:'absolute',
        bottom:0,
        marginBottom:10,
    },

    formContainer:{
        flex:1,
        padding:10,
        width:'100%',
        alignSelf:'center',
        marginHorizontal:20,
        justifyContent:'space-between',
        backgroundColor:themeColors.primary2, 
        borderTopRightRadius:15,
        borderTopLeftRadius:15,
    },


    formPageFootContainer:{
        flexDirection:'row',
        padding:20,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:themeColors.primary2,
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
    },

    formPageFootText:{
        fontFamily:globalFonts.primaryMedium,
        opacity:0.7,

    },

    formTextInput: {
        backgroundColor:themeColors.tertiary2,
        borderWidth: 2,
        borderColor:'rgba(255, 76, 0, 0.4)',
        padding:3,
        paddingHorizontal:15,
        borderRadius:20,
        marginBottom: 5,
        marginTop: 5,
    },

    formSubmitButton:{
        width:200,
        marginTop:10,
        alignSelf:'center'
    }

});