import { Platform, StyleSheet } from "react-native";
import {
  sc,
  themeColors,
  globalFonts,
  windowWidth,
  windowHeight,
} from "./global-styles";

export const formPageStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: themeColors.primary2,
  },
  headerGraphicsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  heading: {
    position: "absolute",
    top: 80 * sc,
    left: 30 * sc,
  },
  mainHeading: {
    fontFamily: globalFonts.primaryRegular,
    letterSpacing: 2 * sc,
    marginBottom: 5 * sc,
    fontSize: 28 * sc, //font size
    color: themeColors.secondary2,
    width: '60%',
  },
  subHeading: {
    fontFamily: globalFonts.primaryRegular,
    letterSpacing: 2 * sc,
    fontSize: 16 * sc, //font size
    opacity: 0.8,
    color: themeColors.secondary2,
  },
  contentContainer: {
    width: "90%",
    maxWidth: 400 * sc,
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    alignContent: "flex-end",
    marginBottom: 10 * sc,
  },

  formContainer: {
    flex: 1,
    padding: 10 * sc,
    width: "100%",
    alignSelf: "center",
    marginHorizontal: 20 * sc,
    justifyContent: "space-between",
    backgroundColor: themeColors.primary2,
    borderTopRightRadius: 15 * sc,
    borderTopLeftRadius: 15 * sc,
  },
  textInput: {
    backgroundColor: themeColors.tertiary2,
    marginVertical:5,
    borderWidth: 2 * sc,
    borderColor: "rgba(255, 76, 0, 0.4)",
    paddingVertical: Platform.OS === "ios" ? 8 * sc : 3 * sc,
    paddingHorizontal: 15 * sc,
    borderRadius: 20 * sc,
  },

  errorText: {
    fontFamily: globalFonts.primaryLight,
    textAlign: "center",
    fontSize: 12,
    marginTop: 4,
    color: 'red',
  },

  submitButton: {
    width: 200 * sc,
    marginTop: 10 * sc,
    alignSelf: "center",
  },
  footContainer: {
    flexDirection: "row",
    padding: 20 * sc,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themeColors.primary2,
    borderBottomRightRadius: 15 * sc,
    borderBottomLeftRadius: 15 * sc,
  },
  footText1: {
    fontFamily: globalFonts.primaryMedium,
    opacity: 0.7,
    color: themeColors.secondary1,
  },
  footText2: {
    fontFamily: globalFonts.primaryMedium,
    opacity: 0.7,
    marginLeft: 2 * sc,
    color: themeColors.primary1,
    fontFamily: globalFonts.primaryBold,
    paddingVertical: 5 * sc,
  },

  headerHeading: {
    fontFamily: globalFonts.primaryRegular,
    letterSpacing: 2 * sc,
    fontSize: 31 * sc, //font size
    color: themeColors.secondary2,
  },

  // gender page

  cardscontainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20 * sc,
  },

  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth * 0.4167,
    height: windowHeight * 0.28125,
    backgroundColor: themeColors.tertiary2,
    borderRadius: 10 * sc,
  },

  cardSelected: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth * 0.4167,
    height: windowHeight * 0.28125,
    backgroundColor: themeColors.tertiary1,
    borderRadius: 10 * sc,
    color: themeColors.secondary2,
  },

  genderTag: {
    fontFamily: globalFonts.primaryRegular,
    padding: 5 * sc,
    opacity: 0.6,
  },

  // height weight page ///////////////////////////////////////////

  dataContainer: {
    width: "100%",
    justifyContent: "flex-end",
  },

  dataTopContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
  },

  dataBottomContainer: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    // display:'none'
  },

  infoLeftContainer: {
    flex: 4.5,
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "center",
    backgroundColor: themeColors.primary2,
    marginBottom: 30 * sc,
    borderRadius: 15 * sc,
    paddingVertical: 10 * sc,
    marginHorizontal: 10 * sc,
  },

  infoRightContainer: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // display:'none'
  },

  subInfoLeftContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    marginVertical: 10 * sc,
  },

  weightContainer: {
    alignItems: "center",
  },

  hwTag: {
    fontFamily: globalFonts.primaryLight,
    opacity: 0.6,
  },

  hwValue: {
    fontFamily: globalFonts.primaryBold,
    fontSize: 30 * sc,
    opacity: 0.65,
  },

  weightSliderComponent: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 10 * sc,
  },
  weightSlider: {
    alignSelf: "center",
    width: 260 * sc,
    paddingVertical: 8 * sc,
  },

  hwManGraphics: {
    marginTop: 10,
  },
  heightSliderContainer: {
    zIndex: 100,
    transform: [{ rotate: "-90deg" }, { translateY: -110 * sc }],
    marginLeft: 40 * sc,
  },
  heightSlider: {
    width: 220 * sc,
    height: 40 * sc,
  },
});
