import * as React from 'react';
import { View, Text, Platform, ImageBackground, StyleSheet, StatusBar } from 'react-native';
import { sc, themeColors, globalFonts, } from '../styles/global-styles';
import { ButtonType1 } from '../components/buttons';
import data from '../assets/data/data.json';
import { Feather } from '@expo/vector-icons';
import { SubHeader } from '../components/subheader';
import { formPageStyles } from '../styles/form-pages-styles';
import { ElevatedCardTypeOne } from '../components/cards';

export const BuyNow = () => (
    
    <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <ImageBackground source={require('../assets/images/gym.jpg')} style={styles.container}>
            <View style={styles.overlay}>
                <SubHeader text={data.programs.pId1.programName.split('Aboo Thahir')} styling={styles.header} />
                <View style={styles.contentContainer}>
                    <Text style={heading}>Personal Trainer</Text>
                    <Text style={styles.about}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius cursus nibh mauris lorem duis magna dolor viverra gravida.</Text>
                    <View style={styles.cardContainer}>
                        <ElevatedCardTypeOne styling={styles.card}>
                            <View>
                                <Text>Complete Plan</Text>
                                <Text>Includes: Complete workout plan and Diet plan and nutriton.</Text>
                            </View>
                            <View>
                                
                                
                            </View>
                        </ElevatedCardTypeOne>
                        <ElevatedCardTypeOne styling={styles.card}>
                            <View>
                                <Text>Monthly</Text>
                                <Text>Includes: Workout plan for one month.</Text>
                            </View>
                            <View>
                                
                            </View>
                        </ElevatedCardTypeOne>
                    </View>
                    <ButtonType1 arrow={false} text={'Buy Now'}/>
                    <Text style={styles.footText}>Subscription Terms & Details</Text>
                    

                </View>
                

            </View>

        </ImageBackground>

    </View>
)

const heading = {...formPageStyles.mainHeading}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        
    },

    overlay:{
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.87)',
    },

    header:{
        ...Platform.select({
            ios:{
                marginTop:30*sc
                
            }
        })
        
    },

    contentContainer:{
        width:'100%',
        height:'100%',
        marginTop:50*sc,
        alignItems:'center',

    },

    about:{
        color:themeColors.secondary2,
        fontSize:14*sc,
        fontFamily:globalFonts.primaryRegular,
        marginVertical:10*sc,
        paddingRight:30*sc,
        paddingLeft:30*sc,
        textAlign:'center',
        lineHeight:20*sc,
        letterSpacing:1.2*sc
    },

    card:{
        justifyContent: 'center',
        width:320*sc,
        height:75*sc,
        backgroundColor:themeColors.secondary2,
        borderRadius:10*sc,
        margin:5*sc,
        
    },

    cardContainer:{
        marginVertical:35*sc
    },

    footText:{
        color:themeColors.secondary2,
        fontSize:14*sc,
        fontFamily:globalFonts.primaryRegular,
        paddingRight:30*sc,
        paddingLeft:30*sc,
        textAlign:'center',
        lineHeight:20*sc,
        letterSpacing:1.2*sc,
        marginTop:10*sc,
        marginBottom:30*sc
        
    }
})