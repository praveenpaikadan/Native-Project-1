import { StyleSheet } from "react-native";
import { Dimensions, PixelRatio } from "react-native";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
const pixelRatio = PixelRatio.get()
// const pixelRatio = 3

const getScalingFactor = () => {
  let sc = windowWidth / 360
  sc = sc * 6.5/(9.5-pixelRatio)
  return sc
}

export const sc = getScalingFactor() ;


export const themeColors = {
  primary1: "#FF4C00", //Orange
  primary2: "#E6E8EC", //white - grey
  secondary1: "#000", //black
  secondary2: "#fff", //white
  tertiary1: "#434343", //grey
  tertiary2: "#DFDEDE", //light grey
  tertiary3: "#C4C4C4", //medium grey
};

export const globalFonts = {
  primaryLight: "ubuntu-light",
  primaryRegular: "ubuntu-regular",
  primaryMedium: "ubuntu-medium",
  primaryBold: "ubuntu-bold",
};

export const globalFontSize = {
  content: 12 * sc,
};

export const globalShadows = {
  orangeTextShadow1: {
    textShadowColor: "rgba(255, 51, 0, 0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 50,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
