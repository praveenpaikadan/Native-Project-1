import * as React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { ButtonType1 } from '../components/buttons';
import { appPageStyles } from '../styles/app-pages-styles';
import data from '../assets/data/data.json';
import { Header } from '../components/header';
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
        <ButtonType1 play={true} text={'Watch Now'} arrow={false} styling={styles.button} />
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

