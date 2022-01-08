import * as React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { globalFonts, sc, themeColors } from "../styles/global-styles";

export default ReminderBox = ({message, pressHandler, danger}) => {
  const styles = StyleSheet.create({
    wrapper: {
      width: 360*sc,
      alignSelf:'center',
      backgroundColor: danger?'red':themeColors.tertiary3,
      marginBottom: 10*sc,
      justifyContent: 'center'
    },
    message: {
        fontFamily: globalFonts.primaryLight,
        fontSize: 12*sc,
        color: danger?'white':themeColors.primary1,
        textAlign: 'center',
        marginHorizontal: 10*sc,
        marginVertical: 10*sc
    }

  });

    return (
    <TouchableOpacity style={styles.wrapper} onPress={() => pressHandler()}>
        <Text style={styles.message}>{message}</Text>
    </TouchableOpacity>
    )
} 

