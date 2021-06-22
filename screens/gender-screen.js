import * as React from 'react';
import { View,
    StyleSheet,
    Text,
    TouchableOpacity, } from 'react-native';
import { globalStyles, themeColors, globalFonts, windowHeight, windowWidth, } from '../styles/global-styles';
import { CreateAccountGraphics, GenderFemaleGraphics, GenderMaleGraphics, } from '../assets/svgs/svg-graphics';
import { ButtonType1 } from '../components/buttons';
import { ElevatedCardTypeOne } from '../components/cards';
import { formPageStyles } from '../styles/form-pages-styles';

export default GenderScreen = () => (
    

    <View
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        
        <View style={styles.container}>
            <View style={styles.headerGraphicsContainer}>
                <CreateAccountGraphics style={{width:'100%'}} />
                <View style={styles.heading}>
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
                                    <Text style={styles.genderTag}>{data[0]}</Text>
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



const styles = formPageStyles