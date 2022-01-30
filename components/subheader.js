import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { sc, themeColors, globalFonts } from "../styles/global-styles";
import { Feather } from "@expo/vector-icons";

export const SubHeader = ({ text, styling, onPress }) => (
  <View
    style={{
      backgroundColor: "rgba(67,67,67,0.5)",
      flexDirection: "row",
      padding: 10 * sc,
      paddingTop: 20*sc,
      paddingLeft: -35 * sc,
      alignItems: "center",
      ...styling,
    }}
  >
    <TouchableOpacity onPress={onPress}>
      <Feather name="chevron-left" {...backIconStyling} />
    </TouchableOpacity>

    <View style={styles.textContainer}>
      <Text style={styles.heading}>{text}</Text>
    </View>
  </View>
);

const backIconStyling = {
  size: 30 * sc,
  color: themeColors.secondary2,
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 20*sc,
  },

  textContainer: {
    flex: 1,
  },

  heading: {
    // marginTop: 20*sc,
    textAlign: "center",
    fontSize: 18 * sc,
    fontFamily: globalFonts.primaryMedium,
    color: themeColors.secondary2,
  },
});
