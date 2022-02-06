import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { themeColors, globalFonts, sc } from '../styles/global-styles';

export const Spinner1 = (props) => (
    <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
        backgroundColor: 'transparent',
        // height: '100%',
        width: '100%',
        ...props.style
    }}>
      <ActivityIndicator color={themeColors.primary1} size="large"/>
      <Text style={{
          marginTop: 10*sc,
          fontFamily: globalFonts.primaryLight,
          textAlign: 'center'
      }}>{props.text?props.text:'  Loading ...'}</Text>
    </View> 
  )

