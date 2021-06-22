import * as React from 'react';
import { View,
    StyleSheet,
    Text,
    TouchableOpacity, } from 'react-native';
import { globalStyles, themeColors, globalFonts, windowHeight, windowWidth, } from '../styles/global-styles';
import { CreateAccountGraphics, GenderFemaleGraphics, GenderMaleGraphics, } from '../assets/svgs/svg-graphics';
import { ButtonType1 } from '../components/buttons';
import { ElevatedCardTypeOne } from '../components/cards';

export default GenderScreen = () => (
    

    <View
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        
        <View style={styles.container}>
            <View style={styles.headerGraphicsContainer}>
                <CreateAccountGraphics style={{width:'100%'}} />
                <View style={styles.headingContainer}>
                    <Text style={styles.mainHeading}>What is your {'\n'}Gender?</Text>
                    
                </View>
            </View>

        
            <View style={styles.contentContainer}>
                <View style={styles.cardscontainer}>

                    {
                        [   
                            ['Male', <GenderMaleGraphics size={'75%'}/>],
                            ['Female',<GenderFemaleGraphics size={'75%'}/>]
                        ].map(data => (
                            
                            <TouchableOpacity key={data[0]}>   
                                <ElevatedCardTypeOne styling={styles.card}>
                                    {data[1]}
                                    <Text style={{
                                        fontFamily:globalFonts.primaryRegular,
                                        padding:5,
                                        opacity:0.6
                                        }}>{data[0]}</Text>
                                </ElevatedCardTypeOne>
                            </TouchableOpacity>      
                            
                            )
                        )
                    }
                           

                </View>

                <View style={styles.formContainer}>
                    <ButtonType1 styling={styles.submitButton} text={"NEXT"}/>                
                </View>

                <View style={styles.footContainer}>

                </View>  


            </View>

        </View>

    </View>
);

const styles = StyleSheet.create({
    container:{
        ...globalStyles.formPageContainer
    },

    headerGraphicsContainer:{
        ...globalStyles.headerGraphicsContainer
    },

    headingContainer:{
        ...globalStyles.formPageHeadingContainer,
    },

    mainHeading:{
        ...globalStyles.formPageMainHeading,
        color:themeColors.secondary2
    },
    
    contentContainer:{
        ...globalStyles.formPageContentContainer

    },

    cardscontainer:{
        display:'flex',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:20
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
    
    formContainer:{
        ...globalStyles.formContainer,

    },
    submitButton:{
        ...globalStyles.formSubmitButton
    },
    footContainer:{
        ...globalStyles.formPageFootContainer

    },
    footText:{
        ...globalStyles.formPageFootText

    }


})