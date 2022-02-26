import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  globalFonts,
  globalStyles,
  sc,
  themeColors,
} from "../styles/global-styles";
import { formPageStyles } from "../styles/form-pages-styles";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export const Header = ({
  backButton,
  onPress,
  backButtonText,
  onPressMenu,
  title
}) => {

  const [backDisabled, setBackDisabled] = React.useState(false);

  return (
  <View style={styles.headerContainer}>
    {backButton ? (
    <TouchableOpacity disabled={backDisabled} onPress={() => {setBackDisabled(true);onPress()}} style={styles.backButtonContainer}>
      
        <FontAwesome5
          name="chevron-left"
          size={25}
          color={themeColors.secondary2}
        />
      
      {backButtonText ? <Text style={styles.backButtonText}>LIST</Text> : null}
    </TouchableOpacity>
    ) : null}
    <View style={styles.textContainer}>
      <Text style={styles.headerText}>{title?title:'GoGiFit'}</Text>
    </View>
    <View>
      <TouchableOpacity style={styles.menuContainer} onPress={onPressMenu}>
        <Feather name="menu" size={30 * sc} color={themeColors.secondary2} />
      </TouchableOpacity>
    </View>
  </View>
)};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    backgroundColor: themeColors.primary1,
    width: "100%",
    paddingTop: 30,
    paddingBottom: 7,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 22 * sc,
    fontFamily: globalFonts.primaryMedium,
    color: themeColors.secondary2,
    marginRight: -30*sc
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backButtonContainer: {
    flexDirection: "row",
    paddingHorizontal: 8 * sc,
    alignItems: "center",
    position: 'absolute',
    bottom: 8*sc,
    left: 10*sc
  },

  backButtonText: {
    fontFamily: globalFonts.primaryMedium,
    color: themeColors.secondary2,
    marginLeft: 3 * sc,
  },
});
