import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../components/header';
import { ExerciseList } from './subscreens/exerciselist';

export default ShowExerciseList = () => {
    return(
        <View style={styles.container}>
            <Header />
            <View style={{flex:1}}>
                <ExerciseList timer={true} />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        alignItems:'center',
        height:'100%'
    }
})