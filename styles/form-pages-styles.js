import { StyleSheet } from 'react-native';
import { sc, sch, themeColors, globalFonts, windowWidth, windowHeight, } from './global-styles'



export const formPageStyles = StyleSheet.create({
    container:{
        width:'100%', 
        height:'100%', 
        backgroundColor:themeColors.primary2,
    },
    headerGraphicsContainer:{
        position:'absolute',
        top:0,
        left:0,
    },
    
    heading:{
        position:'absolute',
        top:80*sc,
        left:30*sc,
    },
    mainHeading:{
        fontFamily:globalFonts.primaryRegular,
        letterSpacing:2*sc,
        marginBottom:5*sc,
        fontSize:34*sc,    //font size
        color:themeColors.secondary2

    },
    subHeading:{
        fontFamily:globalFonts.primaryRegular,
        letterSpacing:2*sc,
        fontSize:16*sc,    //font size
        opacity:0.8,
        color:themeColors.secondary2


    },
    contentContainer:{
        width:'90%',
        maxWidth: 400*sc,
        alignSelf:'center',
        alignItems:'center',
        position:'absolute',
        bottom:0,
        marginBottom:10*sc,
    },

    formContainer:{
        flex:1,
        padding:10*sc,
        width:'100%',
        alignSelf:'center',
        marginHorizontal:20*sc,
        justifyContent:'space-between',
        backgroundColor:themeColors.primary2, 
        borderTopRightRadius:15*sc,
        borderTopLeftRadius:15*sc,
        
    },
    textInput:{
        backgroundColor:themeColors.tertiary2,
        borderWidth: 2*sc,
        borderColor:'rgba(255, 76, 0, 0.4)',
        paddingVertical:3*sc,
        paddingHorizontal:15*sc,
        borderRadius:20*sc,
        marginVertical:5*sc,
        

    },
    submitButton:{
        width:200*sc,
        marginTop:10*sc,
        alignSelf:'center'
    },
    footContainer:{
        flexDirection:'row',
        padding:20*sc,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:themeColors.primary2,
        borderBottomRightRadius:15*sc,
        borderBottomLeftRadius:15*sc,

    },
    footText1:{
        fontFamily:globalFonts.primaryMedium,
        opacity:0.7,
        color:themeColors.secondary1,
    },
    footText2:{
        fontFamily:globalFonts.primaryMedium,
        opacity:0.7,

        marginLeft:2*sc, 
        color:themeColors.primary1,
        fontFamily:globalFonts.primaryBold,
    },

    
    cardscontainer:{
        display:'flex',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:20*sc
    },

    card:{
        display:'flex',
        alignItems:'center',
        justifyContent: 'center',
        width:windowWidth*0.4167,
        height:windowHeight*0.28125,
        backgroundColor:themeColors.tertiary2,
        borderRadius:10,
    },

    gendertag:{
        fontFamily:globalFonts.primaryRegular,
        padding:5*sc,
        opacity:0.6
    },

    headerHeading:{
        fontFamily:globalFonts.primaryRegular,
        letterSpacing:2*sc,
        fontSize:31*sc,    //font size
        color: themeColors.secondary2,
    },
    


})
