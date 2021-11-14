
import * as React from "react";
import {Image} from "react-native";
import { BASE_URL } from "../utilities/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./auth-context";


export const ProfilePhoto = ({filename, style, source}) => {

    const {credentials} = React.useContext(AuthContext)
    const [error, setError] = React.useState(false)
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
        <Image 
            onError = {() => setError(true)}
            source={(error || !credentials.profilePhoto) ?require("../assets/images/dp.png"):(source?source:{uri: BASE_URL +'/user/getprofilephoto/'+ credentials.profilePhoto.filename +  '?sid=' + auth})} 
            // source={{uri: BASE_URL +'/user/getprofilephoto/'+ filename +  '?sid=' + auth}}
            style={style} 
        />
    )
}