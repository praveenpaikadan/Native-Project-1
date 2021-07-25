import * as React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { OrangeLogo1 } from "../assets/svgs/svg-logos";
import { themeColors, sc } from "../styles/global-styles";
import { ButtonType1 } from "../components/buttons";
import { AntDesign } from "@expo/vector-icons";

export default GetStartedScreen = ({ navigation }) => (
  <ImageBackground
    source={require("../assets/images/get-started.jpg")}
    style={{}}
  >
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.subHeading}>Invest In Your Health</Text>
        <Text style={styles.mainHeading}>Personal Trainer</Text>
      </View>
      <View style={styles.logoAndButtonContainer}>
        <OrangeLogo1 style={styles.logo} />

        <ButtonType1
          text={"GET STARTED"}
          styling={styles.button}
          onClick={() => navigation.push("SignUp")}
        />
      </View>
      <View style={styles.socialContainer}>
        <AntDesign name="instagram" size={36} color="#434343" />
        <AntDesign name="facebook-square" size={36} color="#434343" />
        <AntDesign name="youtube" size={36} color="#434343" />
      </View>
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "space-between",
    paddingTop: 50 * sc,
    opacity: 0.9,
    alignItems: "center",
  },

  headingContainer: {
    flex: 3,
  },

  logoAndButtonContainer: {
    flex: 4,
    width: 320 * sc,
    justifyContent: "space-evenly",
    alignContent: "center",
    paddingBottom: 25 * sc,
  },

  socialContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  subHeading: {
    fontFamily: "ubuntu-regular",
    alignSelf: "flex-end",
    color: themeColors.secondary2,
    fontSize: 17 * sc, // font size
  },

  mainHeading: {
    fontFamily: "ubuntu-regular",
    letterSpacing: 2 * sc,
    color: themeColors.primary1,
    fontSize: 42 * sc, // font size
    alignSelf: "center",
  },

  logo: {
    flexDirection: "row",
    flex: 1,
    alignSelf: "flex-start",
  },

  button: {
    width: "100%",
    maxWidth: 300,
    alignSelf: "center",
  },
});
