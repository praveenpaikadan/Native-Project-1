import { StyleSheet } from 'react-native';
import { sc, themeColors, globalFonts, windowWidth, windowHeight, } from './global-styles';

export const appPageStyles = StyleSheet.create({
    container: {
        width:'100%', 
        height:'100%', 
        backgroundColor:themeColors.secondary2,
        alignItems:'center'
    },

    card:{
        alignItems:'center',
        justifyContent: 'center',
        width:windowWidth*0.4,
        height:windowHeight*0.25,
        backgroundColor:themeColors.secondary2,
        borderRadius:10*sc,
        margin:5*sc
    },

    cardContainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:themeColors.tertiary2,
        paddingVertical:10*sc,
        paddingHorizontal:10*sc,
        borderRadius:10*sc,
        marginTop: 10*sc
    },

    mainHeading:{
        fontFamily:globalFonts.primaryBold,
        fontSize:20*sc,    //font size
        opacity:0.8,
        color:themeColors.tertiary1
    },

    headingContainer:{
        alignItems:'center',
        marginTop: 10*sc
    },

    line:{
        height:5*sc,
        width:'100%',
        backgroundColor:themeColors.primary1,
        marginTop:5*sc,
        marginBottom:10*sc,
    },

    image:{
        width:'100%',
        height:'100%',
        borderRadius:10*sc,
    },

    button:{
        minWidth:300*sc,
    },

    subHeadingContainer:{
        width:'100%',
        paddingVertical:10*sc,
        paddingHorizontal:10*sc,
        marginTop:10*sc,
        backgroundColor:themeColors.tertiary2
    },

    instructionsContainer:{
        marginLeft:10*sc,
        width:'89%',
        marginTop:5*sc
    },

    instructions:{
        flexDirection:'row',
        marginTop:5*sc,
        
    },

    subHeading:{
        fontFamily:globalFonts.primaryBold,
        fontSize:15*sc,    //font size
        opacity:0.8,
        color:themeColors.tertiary1
    },

    content:{
        textAlign:'justify'
    },

    
})