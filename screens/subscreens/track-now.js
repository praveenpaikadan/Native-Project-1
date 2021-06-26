import * as React from 'react';
import { View,TextInput,Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { globalFonts, sc, themeColors } from '../../styles/global-styles';
import { ButtonType1 } from '../../components/buttons';
import { ElevatedCardTypeOne } from '../../components/cards'

export default TrackNowSubScreen = () => {

    return(
        <View style={styles.container}>
            
            <View style={styles.topBox}>
                <View>
                    <Text style={styles.topBoxTagText}>Next Workout</Text>
                    <View style={styles.triangle}/>
                </View>
                <Text style={styles.topBoxMainText}>Aboo Thahir’s Muscle gain program: Day 18 - Shoulders, Legs, Calves</Text>
                <ButtonType1 text={'TRACK NOW'} arrow={20*sc} styling={styles.trackNowButton} textStyling={styles.buttonTextStyling}/>
            </View>
            
            <View style={styles.bottomBox}>
                <ElevatedCardTypeOne styling={styles.card}>
                    <ImageBackground style={styles.cardImage} source={require('../../assets/images/diet-plan.jpg')}>
                    <View style={styles.cardOverlay}><Text style={styles.cardBannerText}>Your{'\n'} Diet {'\n'} Plan </Text></View>
                    </ImageBackground>
                </ElevatedCardTypeOne>

                <ElevatedCardTypeOne styling={styles.card}>
                    <ImageBackground style={styles.cardImage} source={require('../../assets/images/recipes.jpg')}>
                        <View style={styles.cardOverlay}><Text style={styles.cardBannerText}>Recipes</Text></View>   
                    </ImageBackground>
                </ElevatedCardTypeOne>
           </View> 

        </View>

        )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',

    },

    topBox:{
        width:'100%',
        justifyContent:'center',
        padding:6*sc,
        

    },
    bottomBox:{
        flex:6,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',

    },

    topBoxTagText:{
        fontSize:12*sc,
        alignSelf:'center',
        fontFamily:globalFonts.primaryLight,
        padding:4*sc,
        borderRadius:5*sc,
        backgroundColor:themeColors.tertiary3,
    },

    triangle:{
        alignSelf:'center',
        width: 0,
        height: 0,
        borderLeftWidth: 15*sc,
        borderRightWidth: 15*sc,
        borderTopWidth: 5*sc,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: themeColors.tertiary3,
        marginBottom:5*sc
    },

    topBoxMainText:{
        alignSelf:'center',
        fontFamily:globalFonts.primaryBold,
        fontSize:18*sc,
        paddingHorizontal:8*sc,
        opacity: 0.8,
        textAlign:'center',
        marginBottom:10*sc
    },

    trackNowButton:{
        height:40*sc,
        alignSelf:'center',
        width:160*sc

    },
    buttonTextStyling:{
        fontSize:20*sc
    },
    card:{
        height:200*sc,
        width:150,
        overflow:'hidden',
        justifyContent:'center',

        
    },
    cardImage:{
        width:'100%',
        height:'100%',
    },

    cardOverlay:{
        backgroundColor:'rgba(0,0,0,0.4)',
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    cardBannerText:{
        fontFamily:globalFonts.primaryBold,
        color:themeColors.primary2,
        fontSize:36*sc,
        textShadowColor: 'rgba(255, 51, 0, 0.4)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 50

    }

    
})