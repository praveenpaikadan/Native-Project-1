import { View, Text, StyleSheet, Modal } from "react-native";
import { themeColors, sc, globalFonts } from "../../styles/global-styles";
import { ButtonType1 } from "../../components/buttons";
import React from "react";

export const Alert = ({visible, message, yesHandler, noHandler}) => {

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>

          <View style={styles.headingContainer}>
            <Text style={styles.heading}>{message}</Text>
          </View>
          <View style={styles.line}></View>
        

            <View style={styles.row}>
              <ButtonType1
                styling={styles.button1}
                text={"YES"}
                arrow={false}
                textStyling={styles.buttonText1}
                onClick={() => yesHandler()}
              />
              <ButtonType1
                styling={styles.button1}
                text={"NO"}
                arrow={false}
                textStyling={styles.buttonText1}
                onClick={() => noHandler()}
              />
            </View>

            </View>
          </View>
    </Modal>
  );
};

const checkIconStyling = {
  color: themeColors.secondary2,
  size: 22 * sc,
};

const styles = StyleSheet.create({
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "90%",
    backgroundColor: themeColors.secondary2,
    padding: 20 * sc,
    borderRadius: 20*sc,
  },

  headingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30 * sc,
    marginBottom: 20*sc
  },

  heading: {
    textAlign:'center',
    fontFamily: globalFonts.primaryBold,
    color: themeColors.tertiary1,
    marginVertical: 10 * sc,
    // letterSpacing: 0.5 * sc,
    fontSize: 16 * sc,
    lineHeight: 23 * sc,
    paddingHorizontal: 5*sc,
  },


  line: {
    width: "100%",
    height: 5 * sc,
    backgroundColor: themeColors.primary2,
    marginBottom: 15 * sc,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
  },

  button: {
    marginHorizontal: 70 * sc,
    marginVertical: 10 * sc,
  },

  buttonText: {
    fontSize: 15 * sc,
  },
  button1: {
    marginHorizontal: 2 * sc,
    marginVertical: 10 * sc,
  },

  buttonText1: {
    fontSize: 12 * sc,
  },
});
