import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../components/auth-context";
import { logoutUser } from "../utilities/data-center";
import flash from '../utilities/flash-message'
import { Alert } from "../screens/modal/alert";
import { ProfilePhoto } from "../components/profile-photo";

// params = message, setReload, reloadbutton 
export const Logout = (props) => {
    
  const [logoutWarn, setLogoutWarn] = React.useState(false)
  const {logOutLocal,  uploadPendingWorkout} = React.useContext(AuthContext)
  const handleSignOut = async () => {
    await uploadPendingWorkout()
    setLogoutWarn(true)
    logoutUser()
    logOutLocal()
  }
  
  return(
      <View style={props.style}>
      <TouchableOpacity onPress={() => setLogoutWarn(true)}>
          {props.children}
      </TouchableOpacity>

      <Alert 
          visible={logoutWarn} 
          message={'Are you sure to Sign Out ?'} 
          yesHandler={() => {handleSignOut()}} 
          noHandler={() => {setLogoutWarn(false)}}
          />
      </View>
  )} 