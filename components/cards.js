import React from 'react';
import { StyleSheet, View } from 'react-native';
import { sc } from '../styles/global-styles'

export const ElevatedCardTypeOne = (props) =>(
    
        <View style={{...styles.card, ...props.styling, ...props.style}} onPress={props.onPress} >
                { props.children }
        </View>
    )


const styles = StyleSheet.create({
    card:{
        borderRadius:5*sc,
        elevation:5,
        shadowOffset: { width:5*sc, height: 5*sc},
        shadowColor:'#333',
        shadowOpacity:0.3,
        shadowRadius: 2*sc,
        overflow:'hidden',
    },

})