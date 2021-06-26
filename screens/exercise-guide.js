import * as React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Platform } from 'react-native';
import { ButtonType1 } from '../components/buttons';
import data from '../assets/data/data.json';
import { Header } from '../components/header';
import { ElevatedCardTypeOne } from '../components/cards'
import { themeColors, sc, globalFonts, windowWidth, windowHeight, globalFontSize } from '../styles/global-styles';
const einstructions = data.exercise.eId1.instructions

export default ExerciseGuideScreen = () => (
    <View style={styles.container}>
        <Header />
        <View style={styles.contentContainer}>

            <View style={styles.headingContainer}>
                <Text style={styles.mainHeading}>{data.exercise.eId1.exersiceName}</Text>
                <View style={styles.cardContainer}>
                    <ElevatedCardTypeOne styling={styles.card}>
                        <Image source={require('../assets/images/fat-loss.jpg')} style={styles.image} />
                    </ElevatedCardTypeOne>
                    <ElevatedCardTypeOne styling={styles.card}>
                        <Image source={require('../assets/images/muscle-gain.jpg')} style={styles.image} />
                    </ElevatedCardTypeOne>
                </View>
            </View>

            <View style={styles.line}></View>

            <ButtonType1 play={32*sc} text={'Watch Now'} arrow={false} styling={styles.button} textStyling={styles.buttonText}
            />
            
            <View style={styles.subHeadingContainer}>
                <Text style={styles.subHeading}>Step by step instructions:</Text>
            </View>
            
            <View style={styles.instructionsContainer}>
                <ScrollView >
                    <View style={styles.instructionsScrollContainer}>
                        
                        {
                            einstructions.map((item, index) => {
                                return(
                                    <View key={index} style={styles.instructions}>
                                        <Text style={styles.content}>{index + 1 + '.' + ' '}</Text>
                                        <Text style={styles.content}>{item}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
                </View>
        </View>
    </View>    
)

const styles = StyleSheet.create({
    container: {
        width:'100%', 
        height:'100%', 
        backgroundColor:themeColors.secondary2,
        alignItems:'center'
    },

    contentContainer:{
        flex:1,
        width:'100%'
    },

    headingContainer:{
        alignItems:'center',
    },

    mainHeading:{
        fontFamily:globalFonts.primaryBold,
        fontSize:20*sc,    //font size
        opacity:0.8,
        color:themeColors.tertiary1,
        paddingVertical:5*sc
    },

    cardContainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        backgroundColor:themeColors.tertiary2,
        paddingVertical:5*sc,
        paddingHorizontal:5*sc,
        borderRadius:10*sc,
        
    },

    card:{
        alignItems:'center',
        justifyContent: 'center',
        width:150*sc,
        height:150*sc,
        backgroundColor:themeColors.secondary2,
        borderRadius:10*sc,
        margin:5*sc,
        overflow:'hidden',
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
    },

    button:{
        width:250*sc,
        alignSelf:'center',
        ...Platform.select({
                android:{
                    height:45*sc,
                }
        })
        
    },

    buttonText:{
        fontSize:25,
    },

    subHeadingContainer:{
        width:'100%',
        paddingVertical:10*sc,
        paddingHorizontal:10*sc,
        marginTop:10*sc,
        backgroundColor:themeColors.tertiary2
    },

    subHeading:{
        fontFamily:globalFonts.primaryBold,
        fontSize:15*sc,    //font size
        opacity:0.8,
        color:themeColors.tertiary1
    },

    instructionsContainer:{
        flex:1,
        marginHorizontal:2*sc,
        marginTop:10*sc,
        marginBottom:10*sc,

        
    },

    instructionsScrollContainer:{
      width:'100%',
      paddingLeft:6*sc,
      paddingRight:18*sc,
 
    },

    instructions:{
        flexDirection:'row',
        width:'100%',
        marginBottom:10*sc,
        
    },

    content:{
        fontFamily:globalFonts.primaryRegular,
        textAlign:'justify',
    }
})



