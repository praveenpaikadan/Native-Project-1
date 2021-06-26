import * as React from 'react';
import { View,TextInput,Text, StyleSheet, Image, ImageBackground, FlatList } from 'react-native';
import { globalFonts, sc, themeColors, globalShadows } from '../../styles/global-styles';
import { ButtonType1 } from '../../components/buttons';
import { ElevatedCardTypeOne } from '../../components/cards'
import { FontAwesome5 } from '@expo/vector-icons';
import { back } from 'react-native/Libraries/Animated/src/Easing';

const ProgramCard = ({heading, shortInfo, level, period, bgImage}) => {

    return(
        <ElevatedCardTypeOne styling={cardStyles.card}>
            <ImageBackground style={cardStyles.cardImage} source={bgImage}>
                
                <View style={cardStyles.cardOverlay}>
                    <Text style={cardStyles.mainText}>{heading}</Text>
                    <View style={cardStyles.detailsContainer}>
                        <View style={cardStyles.detailsItemContainer}>
                            <FontAwesome5 name="fire" {...cardIconStyling} />
                            <Text style={cardStyles.subText}>{shortInfo}</Text>
                        </View>
                        <View style={cardStyles.detailsItemContainer}>
                            <FontAwesome5 name="layer-group" {...cardIconStyling} />
                            <Text style={cardStyles.subText}>{level}</Text>
                        </View>
                        <View style={cardStyles.detailsItemContainer}>
                            <FontAwesome5 name="calendar" {...cardIconStyling} />
                            <Text style={cardStyles.subText}>{period}</Text>
                        </View>
                    </View>
                </View>

            </ImageBackground>
        </ElevatedCardTypeOne>
    )
}

const cardIconStyling = {
    size: 15*sc,
    color: themeColors.primary1,
    style: {paddingRight:3*sc}
}


const cardStyles = StyleSheet.create({
    card:{
        width:340*sc,
        height:100*sc,
        marginVertical:5*sc,
        
  },

    cardImage:{
        width:'100%',
        height:'100%',
        
    },

    cardOverlay:{
        backgroundColor:'rgba(0,0,0, 0.3)',
        width:'100%',
        height:'100%',
        alignItems:'flex-start',
        justifyContent:'center',
        paddingHorizontal:15*sc

    },

    mainText:{
        fontFamily:globalFonts.primaryMedium,
        fontSize: 30*sc,
        color:themeColors.secondary2,
        marginBottom:10*sc,
        ...globalShadows.orangeTextShadow1

    },

    detailsContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignContent:'center',
        flexWrap:'wrap'
    },
    
    detailsItemContainer:{
        flexDirection:'row',
        marginHorizontal:5*sc,
        alignItems:'center',
        marginVertical:3*sc
    },


    subText:{
        fontFamily:globalFonts.primaryRegular,
        color:themeColors.secondary2,
        ...globalShadows.orangeTextShadow1

    },
})

export default ProgramList = () => {
    
    DATA = [1,2,3,4,5,6,7,8,9];

    return(
        <View style={styles.container}>
            <View style={styles.topBox}>
                <Text style={styles.pickText}>PICK YOUR PROGRAM</Text>
                <View style={styles.triangle}></View>
            </View>
            
            <View style={styles.bottomBox}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={DATA}
                        renderItem={() => (
                            <ProgramCard 
                                styles={styles.cardsContainer}
                                bgImage={require('../../assets/images/muscle-gain.jpg')}
                                heading={'Muscle Gain'}
                                shortInfo={'Muscle Gain'}
                                level={'Intermediate'}
                                period={'5/Weeks'}
                            
                            />    
                        )}  
                    />
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
        alignItems:'center',
        justifyContent:'center',
        paddingTop:6*sc,
        paddingHorizontal:8*sc,

    },

    pickText:{
        fontFamily:globalFonts.primaryMedium,
        opacity:0.7,
        fontSize:14*sc,
        color:themeColors.secondary2,
        backgroundColor:themeColors.tertiary1,
        paddingVertical:3*sc,
        paddingHorizontal:10*sc,
        borderRadius:10*sc
    },

    triangle:{
        opacity:0.7,
        width: 0,
        height: 0,
        borderLeftWidth: 15*sc,
        borderRightWidth: 15*sc,
        borderTopWidth: 5*sc,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: themeColors.tertiary1,
        marginBottom:5*sc
    },

    bottomBox:{
        flex:1,
        width:'100%',
        justifyContent:'center',
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

    topBoxMainText:{
        alignSelf:'center',
        fontFamily:globalFonts.primaryBold,
        fontSize:18*sc,
        paddingHorizontal:8*sc,
        opacity: 0.8,
        textAlign:'center'
    },

    cardsContainer:{
        width:'100%',
        height:'100%',
    }, 
})