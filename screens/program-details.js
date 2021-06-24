import * as React from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { sc, themeColors, globalFonts } from '../styles/global-styles';
import { ButtonType1 } from '../components/buttons';
import data from '../assets/data/data.json';
import { Feather } from '@expo/vector-icons';

const duration = data.programs.pId1.duration.slice(0, 1)

export default ProgramDetails = () => (
    <View style={styles.programDetailsContainer}>
        <View style={styles.backgroudImageContainer}>
            <ImageBackground source={require('../assets/images/muscle-gain.jpg')} style={styles.image}>
                <View style={styles.overlay}>
                    <View style={styles.headerContainer}>
                        <Feather name="chevron-left" {...backIconStyling} color="white" />
                        <View style={styles.textContainer}>
                            <Text style={styles.headerHeading}>{data.programs.pId1.programName.split('Aboo Thahir')}</Text>
                        </View>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.smallHeading}>{data.programs.pId1.level}, {duration} Week Program</Text>
                        <ButtonType1 text={'Join Now'} arrow={false} styling={styles.button} textStyling={styles.buttonText}/>
                        <Text style={styles.smallHeading}>Category: {data.programs.pId1.goal}</Text>
                        <Text style={styles.smallHeading}>Days Per Week: {data.programs.pId1.days}</Text>
                        <Text style={styles.smallHeading}>Equipment: {data.programs.pId1.equipment}</Text>
                    </View> 
                </View>
            </ImageBackground>
        </View>
        <ScrollView style={styles.descriptionContainer}>
            <Text style={styles.content}>{data.programs.pId1.description}</Text>
        </ScrollView>
    </View>
    
)


const backIconStyling = {
        size: 30*sc,
        color:themeColors.secondary2
}
const styles = StyleSheet.create({
    programDetailsContainer:{
        width:'100%',
        height:'100%',
        marginTop:40*sc,
    },

    image:{
        width:'100%',
        height:'100%',
    },

    backgroudImageContainer:{
        flex:1,
        
    },

    overlay:{
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.5)',
        
    },

    headerContainer:{
        backgroundColor:'rgba(67,67,67,0.5)',
        flexDirection:'row',
        padding:10*sc,
        paddingRight:35*sc,
        alignItems:'center'
    },

    textContainer:{
        flex:1,
    },

    headerHeading:{
        textAlign:'center',
        fontSize:20*sc,
        fontFamily:globalFonts.primaryMedium,
        color:themeColors.secondary2,
    },

    contentContainer:{
        alignItems:'center',
        paddingVertical:10*sc,
        
    },

    smallHeading:{
        color:themeColors.secondary2,
        fontSize:14*sc,
        fontFamily:globalFonts.primaryMedium,
        marginVertical:13*sc
        

    },

    button:{
        minWidth:200*sc,
    },

    buttonText:{
        fontSize:20*sc
    },

    descriptionContainer:{
        flex:1,
        padding:15*sc
    },

    content:{
        color:themeColors.tertiary1,
        fontFamily:globalFonts.primaryRegular,
        fontSize:16*sc,
        textAlign:'justify',
        lineHeight:30*sc,
    },
})