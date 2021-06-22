import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { themeColors } from '../styles/global-styles';
import { FontAwesome } from '@expo/vector-icons';
import { sc } from '../styles/global-styles'

// pass extra styling as styling={{style1:value,....}}
// pass arrow={false} to remove arrow

export const ButtonType1 = ({text, styling, textStyling, arrow=true}) => (
    <TouchableOpacity>
        <View style={{
            display:'flex',
            alignItems:'center',
            alignContent:'center',
            justifyContent:'center',
            backgroundColor:themeColors.primary1,
            borderRadius: 10*sc,
            minWidth:250*sc,
            ...styling
            }}>

        
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                padding:10*sc,
                paddingBottom:12*sc,
                paddingTop:12*sc,
            }}>
                    
                <Text style={{
                    fontSize:30*sc,
                    fontFamily: 'ubuntu-bold',
                    color:themeColors.secondary2,
                    paddingHorizontal:5*sc,
                    ...textStyling
                }}>{text}</Text>

                {arrow? <FontAwesome name="chevron-right" size={34*sc} color={themeColors.secondary2} />: <Text></Text>}

                
            </View>
        </View>
    </TouchableOpacity>
    
)


