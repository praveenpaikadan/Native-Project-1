import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { themeColors } from '../styles/global-styles';
import { FontAwesome } from '@expo/vector-icons';

//pass extra styling as styling={{style1:value,....}}

export const ButtonType1 = ({text, styling}) => (
    <View style={{
        display:'flex',
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:themeColors.primary1,
        borderRadius: 10,
        minWidth:250,
        ...styling
        }}>

        <TouchableOpacity>
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                padding:10,
                paddingBottom:12,
                paddingTop:12,
            }}>
                    
                <Text style={{
                    fontSize:30,
                    fontFamily: 'ubuntu-bold',
                    color:themeColors.secondary2,
                    paddingHorizontal:5,
                }}>{text}</Text>

                <FontAwesome name="chevron-right" size={34} color={themeColors.secondary2} />
            </View>
        </TouchableOpacity>
    </View>
)


