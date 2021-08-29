import React, { useState, useEffect, useContext } from "react";
import { View, Text, Keyboard, ActivityIndicator } from "react-native";
import { KeyboardHideOnTouchOutside } from "../components/keyboard-responsive";

import { CreateAccountGraphics } from "../assets/svgs/svg-graphics";
import { ButtonType1 } from "../components/buttons";
import { formPageStyles } from "../styles/form-pages-styles";
import { HeightWeightManGraphics } from "../assets/svgs/svg-graphics";
import { sc, themeColors } from "../styles/global-styles";
import Slider from "@react-native-community/slider";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../components/auth-context";
import { postNewUserData } from "../utilities/data-center";
import flash from '../utilities/flash-message';

export default HeightWeightScreen = ({ navigation, route }) => {


  const [weight, setWeight] = useState(60);
  const [height, setHeight] = useState(160);
  const [displayStatus, setDisplayStatus] = useState("flex");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { storedCredentials, setStoredCredentials } = useContext(AuthContext);

  const minHeight = 120;
  const maxHeight = 220;

  const minWeight = 30;
  const maxWeight = 210;

  const data = { ...route.params };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setDisplayStatus("none"); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setDisplayStatus("flex"); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const buttonClickHandler = () => {

    var userData = {...route.params.userData, height: height, weight: weight}
    setIsLoading(true)
    postNewUserData(userData)
    .then((response) => {
        console.log(response.status, response.data)
        switch (response.status) {
          case 200:
            var user = response.data
            console.log(user)
            flash(`Hurray... ${user.name}, You have been registered, Start tracking your fitness`, 'success', time=4000)
            // navigation.navigate("Gender", {userData});
            break;
          case 409:
            flash(response.data.errorMessage, 'danger', time=10000)
            navigation.navigate("SignUp");
            break;
          case 101:
            flash('Oops Something Happened ...Please check your Internet and try again', 'danger', time=10000)
            break;
          default:
            if(response.data.message){
              flash(response.data.message, 'info')
            }
            break; 
          }
      setIsLoading(false)
    })

  };

  const persistLogin = (credentials) => {
    AsyncStorage.setItem("Credentials", JSON.stringify(credentials))
      .then(() => {
        setStoredCredentials(credentials);
      })
      .catch((error) => console.log(error));
  };

  return (
    <KeyboardHideOnTouchOutside>
      <View
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={styles.headerGraphicsContainer}>
            <CreateAccountGraphics style={{ width: "100%" }} />
            <View style={styles.heading}>
              <Text style={styles.mainHeading}>
                What is your{"\n"}Height and {"\n"}Weight ?
              </Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.dataContainer}>
              <View style={styles.dataTopContainer}>
                <View style={styles.infoLeftContainer}>
                  <View style={styles.subInfoLeftContainer}>
                    <Text style={styles.hwTag}>Your Weight</Text>
                    <Text style={styles.hwValue}>{weight} kg</Text>
                    {/* <View style={{flexDirection:'row'}}>
                                        <TextInput 
                                            style={styles.hwValue}
                                            value={String(weight)} 
                                            keyboardType='number-pad'
                                            onChange={() => {}}
                                        />
                                        <Text style={styles.hwValue}>{" "}kg</Text>
                                    </View> */}
                  </View>

                  <View style={styles.subInfoLeftContainer}>
                    <Text style={styles.hwTag}>Your Height</Text>
                    <Text style={styles.hwValue}>{height} cms</Text>
                  </View>
                </View>

                <View
                  style={{
                    ...styles.infoRightContainer,
                    display: displayStatus,
                  }}
                >
                  <HeightWeightManGraphics size={0.98 * sc} />
                  <View style={styles.heightSliderContainer}>
                    <Text style={styles.hwTag}>Set your Height :</Text>
                    <Slider
                      style={styles.heightSlider}
                      minimumValue={minHeight}
                      maximumValue={maxHeight}
                      minimumTrackTintColor={themeColors.primary1}
                      maximumTrackTintColor={themeColors.primary1}
                      thumbTintColor={themeColors.primary1}
                      step={1}
                      value={height}
                      onValueChange={(value) => {
                        setHeight(value);
                      }}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  ...styles.dataBottomContainer,
                  display: displayStatus,
                }}
              >
                <View style={{ ...styles.weightSliderComponent }}>
                  <Text style={styles.hwTag}>Set your weight :</Text>
                  {displayStatus == "none" ? (
                    <View></View>
                  ) : (
                    <Slider
                      style={styles.weightSlider}
                      minimumValue={minWeight}
                      maximumValue={maxWeight}
                      minimumTrackTintColor={themeColors.primary1}
                      maximumTrackTintColor={themeColors.primary1}
                      thumbTintColor={themeColors.primary1}
                      step={1}
                      value={weight}
                      onValueChange={(value) => {
                        setWeight(value);
                      }}
                    />
                  )}
                </View>
              </View>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
              <ButtonType1
                styling={styles.submitButton}
                arrow={isLoading ? false : true}
                text={
                  isLoading ? (
                    <ActivityIndicator
                      size="large"
                      color={themeColors.secondary2}
                    />
                  ) : (
                    "NEXT"
                  )
                }
                onClick={buttonClickHandler}
              />
            </View>

            {/* <View style={styles.footContainer}>

                    </View>   */}
          </View>
        </View>
      </View>
    </KeyboardHideOnTouchOutside>
  );
};

const styles = formPageStyles;
