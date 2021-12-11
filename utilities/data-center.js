import axios from 'axios'
import API from './api'


const checkEmail = async (data) => { 
    try{
        const response = await API.post('checkemail', data)
        return response
    }catch(error){
        return error.response?error.response:{status: 101}
    }
}

const verifyEmail = async (data) => {
    try{
        const response = await API.post('verifyemail', data)
        return response
    }catch(error){
        return error.data?error.data:{status: 101}
    }
}

const resetPassword = async (data) => {
    try{
        const response = await API.post('resetpwd', data)
        return response
    }catch(error){
        return error.data?error.data:{status: 101}
    }
}

const postNewUserData = async (data) => {
    try{
        const response = await API.post('signup', data)
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

const loginUser = async (data) => {
    try{
        const response = await API.post('login', data)
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

const logoutUser = async () => {
    try{
        const response = await API.get('logout')
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

const getAPICredentials = async () => {
    try{
        const response = await API.get('user/data')
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

const getAPIAllLocal = async () => {
    try{
        const response = await API.get('user/updatelocal')
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

const getAPIAvailablePrograms = async () => {
    try{
        const response = await API.get('subscription/availableprograms')
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

const getAPIMedia = async (filename) => {
    try{
        const response = await API.get(`media/${filename}`)
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

const testSubscribe = async (subscriptionDatails) => {
    try{
        const response = await API.post('subscription/new', subscriptionDatails )
        return response
    }catch(error){
        // console.log(error)
        return error.response?error.response:{status: 101}
    }
}

const getWorkoutData = async (id) => {
    try{
        const response = await API.get('workoutdata')
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

const getExercise = async (id) => {
    try{
        const response = await API.get('workoutdata/exercise/'+id)
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}



const postDayWorkout = async (data) => {
    try{
        const response = await API.post('workoutdata/push', {dayWorkoutData: data})
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
} 


const postDiscardWorkout = async (data) => {
    try{
        const response = await API.post('workoutdata/delete-day', {data}) // data => {workoutId: <value>, day: <value>}
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
} 


const postBulkDayWorkout = async (data) => {

    console.log({bulkDayWorkoutData: data})
    try{
        const response = await API.post('workoutdata/bulk', {bulkDayWorkoutData: data})
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
} 

const postEditProfile = async (data) => {

    try{
        const response = await API.post('user/editprofile', data)
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
} 

const postProfilePhoto = async (data) => {
    try{
        const response = await API.post('user/profilephoto', data)
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
} 


const getTrainerContact = async () => {
    try{
        const response = await API.get('general/contact')
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

const getCompleteDietPlan = async (programID) => {
    try{
        const response = await API.get('diet-plan/'+programID)
        return response
    }catch(error){
        // console.log(error.response)
        return error.response?error.response:{status: 101}
    }
}

export {
    checkEmail, 
    verifyEmail,
    logoutUser, 
    postNewUserData, 
    loginUser, 
    getAPICredentials, 
    getAPIAllLocal, 
    getAPIAvailablePrograms, 
    getAPIMedia, 
    testSubscribe, 
    getWorkoutData, 
    getExercise, 
    postDayWorkout,
    postDiscardWorkout, 
    postBulkDayWorkout, 
    postEditProfile,
    postProfilePhoto, 
    getTrainerContact,
    getCompleteDietPlan,
    resetPassword
}