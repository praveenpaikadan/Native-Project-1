import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { globalFonts, themeColors, sc } from "../styles/global-styles";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { AgendaCalendar } from "../components/calendar";

export default BodyCalendar = ({ visible, closeMenu, active, setactive }) => {
  const [showItem, setShowItem] = useState({
    future: false,
    rest: false,
  });
  const pressHandler = () => {};
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={{ ...styles.overlay }}>
        <View style={styles.container}>

          <View style={styles.line}></View>
          <View style={styles.headingContainer}>
            <View style={styles.headingContent}>
              <FontAwesome5 name="calendar-alt" {...calendarIconStyling} />
              <Text style={styles.heading}>BODY CALENDAR</Text>
            </View>
            <TouchableOpacity onPress={closeMenu}>
              <AntDesign name="closecircle" {...closeIconStylingSmall} />
            </TouchableOpacity>
          </View>
          <AgendaCalendar />
        </View>
      </View>
    </Modal>
  );
};

const calendarIconStyling = {
  color: themeColors.secondary2,
  size: 20 * sc,
};

const calendarIconStylingSmall = {
  color: themeColors.tertiary1,
  size: 15 * sc,
};
const closeIconStylingSmall = {
  color: themeColors.primary2,
  size: 20 * sc,
};

const styles = StyleSheet.create({
  overlay: {
    width: "100%",
    height: "90%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    justifyContent: "flex-end",
    height: "100%",
  },

  line: {
    width: "100%",
    height: 5 * sc,
    backgroundColor: themeColors.primary1,
  },

  headingContainer: {
    flexDirection: "row",
    padding: 10 * sc,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: themeColors.tertiary1,
  },

  headingContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  heading: {
    fontFamily: globalFonts.primaryBold,
    color: themeColors.secondary2,
    paddingLeft: 10 * sc,
    fontSize: 18 * sc,
  },

  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5 * sc,
    backgroundColor: themeColors.primary1,
  },

  date: {
    color: themeColors.secondary2,
    fontFamily: globalFonts.primaryMedium,
  },

  viewButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  verticalLine: {
    width: 2 * sc,
    height: 20 * sc,
    backgroundColor: themeColors.tertiary1,
    marginRight: 5 * sc,
  },

  buttonText: {
    marginLeft: 5 * sc,
    color: themeColors.secondary2,
    fontFamily: globalFonts.primaryMedium,
  },

  childrenContainer: {
    backgroundColor: themeColors.secondary2,
  },
});
