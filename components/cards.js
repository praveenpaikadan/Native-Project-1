import React from 'react';
import { StyleSheet, View } from 'react-native';

export const ElevatedCardTypeOne = (props) =>(
    
        <View style={{...styles.card, ...props.styling}}>
                { props.children }
        </View>
    )


const styles = StyleSheet.create({
    card:{
        borderRadius:10,
        elevation:5,
        shadowOffset: { width:5, height: 5},
        shadowColor:'#333',
        shadowOpacity:0.3,
        shadowRadius: 2,
    },

})