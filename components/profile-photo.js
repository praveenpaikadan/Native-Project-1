
import * as React from "react";
import {Image} from "react-native";
import { BASE_URL } from "../utilities/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./keyboard-responsive";


export const ProfilePhoto = ({filename, style, source}) => {

    var [auth, setAuth] = React.useState(null)
    const fetchAuth = async () => {
        var token = await AsyncStorage.getItem('authToken')
        return token
      }
  
      React.useEffect(() => {
        fetchAuth()
        .then((auth) => {setAuth(auth)})
      }, [])

    if(!auth){
        return null
    }
    return(
        <Image source={!source?{uri: BASE_URL +'/user/getprofilephoto/'+ filename +  '?sid=' + auth}:{uri:source}} 
            style={style} 
        />
    )
}