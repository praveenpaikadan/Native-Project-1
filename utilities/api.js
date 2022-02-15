// to be removed in production
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import flash from "./flash-message";

import Constants from "expo-constants";
const { manifest } = Constants;
const ap = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3567`)
  : `api.example.com`;
export const BASE_URL = `http://${ap}/api/v1`

// export const BASE_URL = `https://personal-training-app.herokuapp.com/api/v1`


const getAuthTokenFromLocal =  async() => {
  authToken = await AsyncStorage.getItem('authToken')
  console.log(authToken)
  return
}

const API = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  async config => {
      config.headers['X-Access-Token'] = await AsyncStorage.getItem('authToken')
      return config;
  },
  error => Promise.reject(error)
)
      
API.interceptors.response.use( async response => {
    if(response.headers['set-cookie']){
        console.log('Setting new token')
        var token = response.headers['set-cookie'][0].split(';')[0].split('connect.sid=s%3A')[1]
        try{
            await AsyncStorage.setItem('authToken', token) 
            authToken = token
        }catch(error){
            console.log('failed to store token')
        }
    }

    if(response.status === 403){
      console.log('Not logged in ........................')
      flash(`You are logged out. Please log in again`, 'success', 4000)
    }
    return response
})

getAuthTokenFromLocal()

export default API
