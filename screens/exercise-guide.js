import * as React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { KeyboardHideOnTouchOutside } from '../components/keyboard-responsive';
import { CreateAccountGraphics } from '../assets/svgs/svg-graphics';
import { ButtonType1 } from '../components/buttons';
import { appPageStyles } from '../styles/app-pages-styles';
import data from '../assets/data/data.json';
import { Header } from '../components/header';
import { TabMenu } from '../components/tab-menu';
import { ElevatedCardTypeOne } from '../components/cards'

const einstructions = data.exercise.eId1.instructions

export default ExerciseGuideScreen = () => (
    <View style={styles.container}>
        <Header />
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
        <ButtonType1 text={'Watch Now'} arrow={false} styling={styles.button} />
        <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeading}>Step by step instructions:</Text>
        </View>
        <ScrollView>
            <View style={styles.instructionsContainer}>
                
                {
                    einstructions.map((item, index) => {
                        return(
                        
                            <View style={styles.instructions}>
                                <Text>{index + 1 + '.' + ' '}</Text>
                                <Text style={styles.content}>{item}</Text>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    </View>
   


    
)

const styles = appPageStyles

