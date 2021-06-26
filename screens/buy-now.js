import * as React from 'react';
import { View, Text, Platform, ImageBackground, StyleSheet, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { sc, themeColors, globalFonts, } from '../styles/global-styles';
import { ButtonType1 } from '../components/buttons';
import data from '../assets/data/data.json';
import { FontAwesome5 } from '@expo/vector-icons';
import { SubHeader } from '../components/subheader';
import { formPageStyles } from '../styles/form-pages-styles';


export default BuyNow = () => {
    const [complete, isComplete] = React.useState(false)
    const [monthly, isMonthly] = React.useState(false)

    const completeHandler = () => {
        isComplete(true),
        isMonthly(false)
    }
    const monthlyHandler = () => {
        isComplete(false),
        isMonthly(true)
    }

    return(
    <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <ImageBackground source={require('../assets/images/gym.jpg')} style={styles.container}>
            <View style={styles.overlay}>
                <SubHeader text={data.programs.pId1.programName.split('Aboo Thahir')} styling={styles.header} />
                <View style={styles.contentContainer}>
                    <Text style={heading}>Personal Trainer</Text>
                    <Text style={styles.about}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius cursus nibh mauris lorem duis magna dolor viverra gravida.</Text>
                    <View style={styles.cardContainer}>
                        <TouchableWithoutFeedback onPress={completeHandler}>
                            <View style={[
                                styles.card, 
                                {backgroundColor: complete? themeColors.tertiary1 : themeColors.tertiary2}]}>
                                <View style={styles.planContainer}>
                                    <Text style={[styles.planHeading, {color: complete? themeColors.secondary2 : themeColors.tertiary1 }]}>Complete Plan</Text>
                                    <Text style={[styles.planContent, {color: complete? themeColors.secondary2 : themeColors.tertiary1 }]}>Includes: Complete workout plan and Diet plan and nutriton.</Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <View style={styles.row}>
                                        <FontAwesome5 name="rupee-sign" {...rupeeIconStyling} />
                                        <Text style={[priceContent, {color: complete? themeColors.secondary2 : themeColors.tertiary1 }]}>2000.00</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <FontAwesome5 name="rupee-sign" {...smallrupeeIconStyling} />
                                        <Text style={[styles.priceContent1, {color: complete? themeColors.secondary2 : themeColors.tertiary1 }]}>167.67/week</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={monthlyHandler}>
                            <View style={[
                                styles.card, 
                                {backgroundColor: monthly? themeColors.tertiary1 : themeColors.tertiary2}]}>
                                <View style={styles.planContainer}>
                                    <Text style={[styles.planHeading, {color: monthly? themeColors.secondary2 : themeColors.tertiary1 }]}>Monthly</Text>
                                    <Text style={[styles.planContent, {color: monthly? themeColors.secondary2 : themeColors.tertiary1 }]}>Includes: Workout plan for one month.</Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <View style={styles.row}>
                                        <FontAwesome5 name="rupee-sign" {...rupeeIconStyling} />
                                        <Text style={[priceContent, {color: monthly? themeColors.secondary2 : themeColors.tertiary1 }]}>750.00</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <FontAwesome5 name="rupee-sign" {...smallrupeeIconStyling } />
                                        <Text style={[styles.priceContent1, {color: monthly? themeColors.secondary2 : themeColors.tertiary1 }]}>187.50/week</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <ButtonType1 arrow={false} text={'Buy Now'}/>
                    <Text style={styles.footText}>Subscription Terms & Details</Text>
                </View>
            </View>
        </ImageBackground>
    </View>
    )}


const rupeeIconStyling = {
    size: 22*sc,
    color: themeColors.secondary2,
}
const smallrupeeIconStyling = {
    size: 12*sc,
    color:themeColors.secondary2,
}
const heading = {...formPageStyles.mainHeading}

const priceContent = {
    color:themeColors.tertiary1,
    fontFamily:globalFonts.primaryRegular,
    marginLeft:5*sc,
    fontSize:20*sc,
}

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
        marginTop:40*sc,
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
        borderRadius:10*sc,
        elevation:2*sc,
        shadowOffset: { width:5*sc, height: 5*sc},
        shadowColor:'#333',
        shadowOpacity:0.3,
        shadowRadius: 2*sc,
        alignItems:'center',
        width:320*sc,
        height:90*sc,
        borderRadius:10*sc,
        margin:5*sc,
        flexDirection:'row',
        padding:10*sc,
    },

    cardContainer:{
        marginVertical:30*sc
    },

    footText:{
        color:themeColors.secondary2,
        fontSize:14*sc,
        fontFamily:globalFonts.primaryRegular,
        letterSpacing:1.2*sc,
        marginTop:10*sc,
        marginBottom:30*sc
    },

    row:{
        flexDirection:'row',
        marginVertical:5*sc
    },

    planContainer:{
        flex:2
    },

    planHeading:{
        ...formPageStyles.subHeading,
        fontFamily:globalFonts.primaryMedium

    },

    planContent:{
        fontSize:14*sc,
        fontFamily:globalFonts.primaryRegular,
        marginTop:5*sc
        
    },

    priceContainer:{
        flex:1,
        marginLeft:10*sc,
        color:themeColors.tertiary1,
        fontFamily:globalFonts.primaryRegular,
        

    },

    priceContent1:{
        ...priceContent,
        fontSize:12*sc,

    },

  
})