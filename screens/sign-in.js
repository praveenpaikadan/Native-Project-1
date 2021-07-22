import * as React from "react";
import { View, TextInput, Text } from "react-native";
import { KeyboardHideOnTouchOutside } from "../components/keyboard-responsive";

import { SignInGraphics } from "../assets/svgs/svg-graphics";
import { ButtonType1 } from "../components/buttons";
import { formPageStyles } from "../styles/form-pages-styles";
import { sc } from "../styles/global-styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../components/auth-context";

export default SignInScreen = ({ navigation, route }) => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [userInfo, setUserInfo] = React.useState({
    userName: "",
    password: "",
  });

  const emailChangeHandler = (value) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setUserInfo({ ...userInfo, userName: value });
    if (reg.test(value) === true) {
      null;
      setErrorMessage(null);
    } else {
      setErrorMessage("Inavalid Email/Password");
    }
  };
  const passwordChangeHandler = (value) => {
    const reg =
      /^(?=.*[A-Za-z])(?=.*?[0-9])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    setUserInfo({ ...userInfo, password: value });
    if (reg.test(value) === true) {
      null;
      setErrorMessage(null);
    } else {
      setErrorMessage("Inavalid Email/Password");
    }
  };

  const buttonPressHandler = () => {
    const url = "https://reqres.in/api/register";
    if (
      errorMessage === "Inavalid Email/Password" ||
      userInfo.userName === "" ||
      userInfo.password === ""
    ) {
      setErrorMessage("Please check credentials provided");
    } else {
      axios
        .post(url, {
          email: "eve.holt@reqres.in",
          password: "pistol",
        })
        .then((response) => {
          const result = {
            status: response.status,
            id: response.data.id,
            token: response.data.token,
          };
          console.log(result);
          if (result.status !== 200) {
            setErrorMessage("Please check your network and try again");
          } else {
            setErrorMessage("");
            navigation.navigate("Home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <KeyboardHideOnTouchOutside>
      <View style={styles.container}>
        <View style={styles.headerGraphicsContainer}>
          <SignInGraphics style={{ width: "100%" }} />
          <View style={styles.heading}>
            <Text style={styles.mainHeading}>Welcome back !</Text>
            <Text style={styles.subHeading}>Start tracking your fitness</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
            {/* form component inside */}
            <Text style={styles.errorText}>{errorMessage}</Text>
            <TextInput
              placeholder="Email"
              style={{ ...styles.textInput, marginBottom: 15 * sc }}
              onChangeText={emailChangeHandler}
            />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={passwordChangeHandler}
            />
            <ButtonType1
              styling={{ ...styles.submitButton }}
              text={"SIGN IN"}
              onClick={buttonPressHandler}
            />
          </View>

          <View style={styles.footContainer}>
            <Text style={{}}>Forgot your Password ?</Text>
          </View>
        </View>
      </View>
    </KeyboardHideOnTouchOutside>
  );
};

const styles = formPageStyles;
