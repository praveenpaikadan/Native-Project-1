import React, { useState } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import GetStartedScreen from "../screens/get-started";
import CreateAccount from "../screens/create-account";
import GenderScreen from "../screens/gender-screen";
import HeightWeightScreen from "../screens/height-weight-screen";
import HomePage from "../screens/home-page";
import SignIn from "../screens/sign-in";
import { AuthContext } from "../components/auth-context";

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="SignUp" component={CreateAccount} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Gender" component={GenderScreen} />
      <Stack.Screen name="HeightWeight" component={HeightWeightScreen} />
      <Stack.Screen name="Home" component={HomePage} />
    </Stack.Navigator>
  );
};
