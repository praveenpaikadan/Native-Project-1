import * as React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { globalFonts, sc, themeColors, globalShadows } from '../../styles/global-styles';
import { ElevatedCardTypeOne } from '../../components/cards'
import { FontAwesome5 } from '@expo/vector-icons';

const ExerciseCard = (props) => {
    return(
        <View style={cardStyles.cardConatiner}>
            <ElevatedCardTypeOne styling={cardStyles.card}>
            <View style={cardStyles.exerciseContainer}>
                <View style={cardStyles.idContainer}>
                    <Text style={cardStyles.idContent}>{props.id}</Text>
                </View>
                <Text style={cardStyles.exerciseName}>{props.exerciseName}</Text>
                <Image
                source={props.image1}
                style={cardStyles.image} />
                <Image
                source={props.image2}
                style={cardStyles.image} />
            </View>
        </ElevatedCardTypeOne>
        </View>
        
    );
}

const cardStyles = StyleSheet.create({
    cardConatiner:{
        flexDirection:'row',
        zIndex:1
    },
    card:{
        width:340*sc,
        height:100*sc,
        marginVertical:5*sc,
        backgroundColor:themeColors.primary2 ,
        justifyContent:'center',
        
  },

  exerciseContainer:{
        flexDirection:'row',
        alignItems:'center'
  },

  idContainer:{
      width:30*sc,
      height:30*sc,
      backgroundColor:themeColors.primary1,
      borderRadius:15*sc,
      justifyContent:'center',
      alignItems:'center',
      marginLeft:10*sc
  },

  idContent:{
      fontFamily:globalFonts.primaryBold,
      fontSize:25*sc,
      color:themeColors.secondary2
  },

  exerciseName:{
      fontFamily:globalFonts.primaryBold,
      fontSize:16*sc,
      marginHorizontal:10*sc
  },

  image:{
      width:75*sc,
      height:55*sc,
      marginRight:5*sc,
      borderRadius:10*sc
  },

  chevronContainer:{
      position:'absolute',
      justifyContent:'center'
      
  },
})

export const ExerciseList = () => {
    
    const List = [1,2,3,4,5,6,7,8,9];
    
    return(
        <FlatList
            showsVerticalScrollIndicator={false}
            data={List}
            renderItem={(itemData) => (
                <ExerciseCard
                id={itemData.item}
                exerciseName={'Dumbbell Step \n Ups'}
                image1={require('../../assets/images/Dumbbell-Step-Ups-1.jpg')}
                image2={require('../../assets/images/Dumbbell-Step-Ups-2.jpg')} 
                />
                
            )}
        /> 
    );
}