import React from "react";
import {View, Text,TextInput, StyleSheet} from "react-native";
import {themeColors, globalFonts, sc} from "../styles/global-styles";
import { Fontisto } from "@expo/vector-icons";


// target = item.item.targetReps
// unit

export const KgRepsInput = ({target="8-12", unit = 'REPS', dataChangeHandler}) => {

    const [weight, setWeight] = React.useState(null)
    const [reps, setReps] = React.useState(null)

    return (
    <View style={styles.inputContainer}>
        <Text style={styles.inputHeading}>
          TARGET: {target} {unit}
        </Text>
        <View style={styles.quantityContainer}>
          <TextInput
            placeholder="--"
            placeholderTextColor={themeColors.primary1}
            style={styles.input}
            onChangeText={(value) => {setWeight(value); dataChangeHandler({weight: weight, reps: reps})}}
            keyboardType="numeric"
            maxLength={4}
          />
          <Text style={styles.unit}>KG</Text>
        </View>
        <View style={styles.inputCloseIconContainer}>
          <Fontisto name="close-a" {...closeIconStyling} />
        </View>

        <View style={styles.quantityContainer}>
          <TextInput
            placeholder="--"
            placeholderTextColor={themeColors.primary1}
            style={styles.input}
            onChangeText={(value) => {setReps(value); dataChangeHandler({weight: weight, reps: reps})}}
            keyboardType="numeric"
          />
          <Text style={styles.unit}>REPS</Text>
        </View>
      </View>
      )
}

// input , unit, 
const styles = StyleSheet.create({
  
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  
    inputHeading: {
      fontFamily: globalFonts.primaryMedium,
      color: themeColors.tertiary1,
    },
  
    quantityContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
  
    input: {
      paddingVertical: 3 * sc,
      paddingHorizontal: 10 * sc,
      borderRadius: 10 * sc,
      borderColor: themeColors.primary1,
      borderWidth: 2 * sc,
      fontFamily: globalFonts.primaryMedium,
      fontSize: 25 * sc,
      color: themeColors.primary1,
      marginTop: 8 * sc,
      marginHorizontal: 10 * sc,
      width: 85 * sc,
      textAlign: "center",
    },
  
    inputCloseIconContainer: {
      marginTop: -10 * sc,
    },
  
    unit: {
      fontFamily: globalFonts.primaryLight,
      fontSize: 12 * sc,
      color: themeColors.tertiary1,
      marginVertical: 1 * sc,
    },
  });
  
  const closeIconStyling = {
    color: themeColors.tertiary1,
    size: 25 * sc,
  };