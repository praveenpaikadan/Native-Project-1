import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { themeColors, sc, globalFonts } from "../../styles/global-styles";
import { ButtonType1 } from "../../components/buttons";
import { WorkoutCompleteBadge } from "../../assets/svgs/svg-graphics";

export const WorkoutCompleteModal = ({
  visible,
  continueEditingHandler,
  handleDiscardWorkout,
  handleWorkoutDone,
  handleGoToHome,
  saving = 0,  // values are 0,2,1,-1 2 for undergoing process 
  text,
}) => {

var displayText 
const [dicard, setDiscard] = useState(false)

const discardWorkout = () => {
  saving 
}

if(saving === 0){displayText = 'Congratultion on Completing\nToday\'s Workout'}
else if(saving === 2){displayText = 'Please wait while saving your workout data'}
else if(saving === 1){displayText = 'Succesfully saved your workout..'}
else if(saving === -1){displayText = 'Oops.. something happened while saving your workout. Please try again..'}


  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>

          <View style={styles.headingContainer}>
            <FontAwesome name="check-circle" {...checkIconStyling} />
            <Text style={styles.heading}>Workout Complete</Text>
          </View>

          <View style={styles.badgeContainer}>
            <Text style={styles.subHeading}>GREAT JOB</Text>
            <WorkoutCompleteBadge />
            <Text style={styles.subHeading}>
              {displayText}
            </Text>
          </View>
          <View style={styles.line}></View>
          <View>

            <View style={styles.row}>
              <ButtonType1
                styling={styles.button1}
                text={"CONTINUE EDITING"}
                arrow={false}
                textStyling={styles.buttonText1}
                onClick={() => continueEditingHandler()}
              />
              <ButtonType1
                styling={styles.button1}
                text={"DISCARD WORKOUT"}
                arrow={false}
                textStyling={styles.buttonText1}
                onClick={discardWorkout}
              />
            </View>

            {saving !== 1?<ButtonType1
              styling={styles.button}
              text={'SAVE WORKOUT'}
              arrow={false}
              isLoading={saving === 2}
              textStyling={styles.buttonText}
              onClick={() => {handleWorkoutDone()}}
            />: <ButtonType1
            styling={styles.button}
            text={'GO TO HOME'}
            arrow={false}
            isLoading={saving === 2}
            textStyling={styles.buttonText}
            onClick={() => {handleGoToHome()}}
          />}

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
    paddingBottom: 20 * sc,
  },

  headingContainer: {
    flexDirection: "row",
    backgroundColor: themeColors.primary1,
    justifyContent: "center",
    alignItems: "center",
    height: 30 * sc,
  },

  heading: {
    fontFamily: globalFonts.primaryBold,
    color: themeColors.secondary2,
    marginLeft: 10 * sc,
  },

  subHeading: {
    textAlign:'center',
    fontFamily: globalFonts.primaryBold,
    color: themeColors.tertiary1,
    marginVertical: 10 * sc,
    letterSpacing: 1 * sc,
    fontSize: 16 * sc,
    lineHeight: 23 * sc,
  },

  badgeContainer: {
    alignItems: "center",
    marginVertical: 10 * sc,
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
