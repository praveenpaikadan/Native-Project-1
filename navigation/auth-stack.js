import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GetStartedScreen from "../screens/get-started";
import CreateAccount from "../screens/create-account";
import GenderScreen from "../screens/gender-screen";
import HeightWeightScreen from "../screens/height-weight-screen";
import HomePage from "../screens/home-page";
import SignIn from "../screens/sign-in";
import { AuthContext } from "../components/auth-context";
import { WorkoutContext } from "../components/workout-context";
import { NavigationContainer } from "@react-navigation/native";
import BodyCalendar from "../components/body-calendar";
import MyWorkouts from "../screens/modal/my-workouts";
import TrackingScreen from "../screens/tracking-screen";
import workoutHistory from "../screens/workout-history";
import ExerciseScreen from "../screens/exercise-screen";
import ShowExerciseList from "../screens/showexerciselist";
import programDetails from "../screens/program-details";
import BuyNow from "../screens/buy-now";
import DrawerContent from "./drawer-content";
import ProfileScreen from "../screens/profile-screen";
import EditProfileScreen from "../screens/edit-profile-screen";
import ExerciseGuideScreen from "../screens/exercise-guide";
import Store from "../screens/store";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// authToken and storedCredentials => logged in and authenticated Show home Page
// 

const Root = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="BodyCalendar" component={BodyCalendar} />
      <Stack.Screen name="Workout" component={MyWorkouts} />
      <Stack.Screen name="TrackNow" component={TrackingScreen} />
      <Stack.Screen name="WorkoutHistory" component={workoutHistory} />
      <Stack.Screen name="Exercise" component={ExerciseScreen} />
      <Stack.Screen name="ExerciseList" component={ShowExerciseList} />
      <Stack.Screen name="ProgramDetails" component={programDetails} />
      <Stack.Screen name="BuyNow" component={BuyNow} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Store" component={Store} />
      <Stack.Screen name="ExerciseGuide" component={ExerciseGuideScreen} />
    </Stack.Navigator>
  );
};

export const AuthStack = () => {

  return (
    <AuthContext.Consumer>

      {({ loggedIn}) => (

        <NavigationContainer>

          {
          
          loggedIn
          
          ? 
           
          (


            <Drawer.Navigator
              drawerType="slide"
              drawerPosition="right"
              headerMode="none"
              drawerContent={(props) => <DrawerContent {...props} />}
              drawerStyle={{ width: "85%" }}
            >
              <Drawer.Screen name="Root" component={Root} />
            </Drawer.Navigator>
              
          ) 
          
          : 
          
          (
            <Stack.Navigator headerMode="none" initialRouteName={"GetStarted"}>
              <Stack.Screen name="GetStarted" component={GetStartedScreen} />
              <Stack.Screen name="SignUp" component={CreateAccount} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="Gender" component={GenderScreen} />
              <Stack.Screen name="HeightWeight" component={HeightWeightScreen} />
            </Stack.Navigator>
          )
          
          } 

        </NavigationContainer>
      )}

    </AuthContext.Consumer>
  );
};
