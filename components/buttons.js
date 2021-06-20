import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { themeColors } from '../styles/global-styles';


export const ButtonType1 = ({text}) => (
    <TouchableOpacity>
        <View style={{
            width:'100%',
            backgroundColor:themeColors.primary1,
            borderRadius: 10
            }}>
            <Text style={{
                fontSize:30,
                fontFamily: 'ubuntu-bold',
                color:themeColors.secondary2,
                padding:10,
                paddingBottom:15,
                paddingTop:15,
                alignSelf:'center',
                justifyContent:'center',
            }}>{text}</Text>
        </View>
    </TouchableOpacity>
)


